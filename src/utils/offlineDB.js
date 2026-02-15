/**
 * offlineDB.js — IndexedDB offline cache layer (Faz 6)
 *
 * Provides persistent client-side storage for:
 *   - Messages (per room, with pagination support)
 *   - Servers & channels (structure cache)
 *   - Pending messages (offline send queue)
 *
 * Uses the `idb` library (Promise-based IndexedDB wrapper).
 */
import { openDB } from 'idb';

const DB_NAME = 'pawscord-offline';
const DB_VERSION = 1;

// ─── Database Setup ────────────────────────────────────────────────
let dbPromise = null;

function getDB() {
    if (!dbPromise) {
        dbPromise = openDB(DB_NAME, DB_VERSION, {
            upgrade(db) {
                // Messages store — indexed by room + timestamp for efficient queries
                if (!db.objectStoreNames.contains('messages')) {
                    const msgStore = db.createObjectStore('messages', { keyPath: 'id' });
                    msgStore.createIndex('by-room', 'roomId');
                    msgStore.createIndex('by-room-ts', ['roomId', 'timestamp']);
                }

                // Servers & channels cache
                if (!db.objectStoreNames.contains('servers')) {
                    db.createObjectStore('servers', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('channels')) {
                    const chStore = db.createObjectStore('channels', { keyPath: 'id' });
                    chStore.createIndex('by-server', 'serverId');
                }

                // Pending messages queue (offline send queue)
                if (!db.objectStoreNames.contains('pendingMessages')) {
                    const pmStore = db.createObjectStore('pendingMessages', {
                        keyPath: 'tempId',
                    });
                    pmStore.createIndex('by-room', 'roomId');
                }

                // User profile cache
                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'id' });
                }
            },
        });
    }
    return dbPromise;
}

// ─── Messages ──────────────────────────────────────────────────────

/**
 * Cache messages for a room.
 * @param {string|number} roomId
 * @param {Array} messages - Array of message objects (must have `id`, `timestamp`)
 */
export async function cacheMessages(roomId, messages) {
    try {
        const db = await getDB();
        const tx = db.transaction('messages', 'readwrite');
        const store = tx.objectStore('messages');
        for (const msg of messages) {
            await store.put({ ...msg, roomId: String(roomId) });
        }
        await tx.done;
    } catch (err) {
        console.warn('[offlineDB] cacheMessages error:', err);
    }
}

/**
 * Get cached messages for a room, ordered by timestamp descending.
 * @param {string|number} roomId
 * @param {number} [limit=50]
 * @returns {Promise<Array>}
 */
export async function getCachedMessages(roomId, limit = 50) {
    try {
        const db = await getDB();
        const tx = db.transaction('messages', 'readonly');
        const index = tx.objectStore('messages').index('by-room');
        const all = await index.getAll(String(roomId));
        // Sort descending by timestamp, take limit
        all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return all.slice(0, limit);
    } catch (err) {
        console.warn('[offlineDB] getCachedMessages error:', err);
        return [];
    }
}

/**
 * Evict old messages to keep DB size manageable.
 * Keeps the latest `keep` messages per room.
 */
export async function evictOldMessages(roomId, keep = 200) {
    try {
        const db = await getDB();
        const tx = db.transaction('messages', 'readwrite');
        const store = tx.objectStore('messages');
        const index = store.index('by-room');
        const all = await index.getAll(String(roomId));

        if (all.length <= keep) return;

        all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const toDelete = all.slice(keep);
        for (const msg of toDelete) {
            await store.delete(msg.id);
        }
        await tx.done;
    } catch (err) {
        console.warn('[offlineDB] evictOldMessages error:', err);
    }
}

// ─── Pending Messages (Offline Queue) ──────────────────────────────

/**
 * Enqueue a message to be sent when back online.
 * @param {object} msg - { roomId, content, tempId, ... }
 */
export async function enqueuePendingMessage(msg) {
    try {
        const db = await getDB();
        await db.put('pendingMessages', {
            ...msg,
            tempId: msg.tempId || `pending-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            createdAt: new Date().toISOString(),
        });
    } catch (err) {
        console.warn('[offlineDB] enqueuePendingMessage error:', err);
    }
}

/**
 * Get all pending messages (optionally for a specific room).
 * @param {string|number} [roomId]
 * @returns {Promise<Array>}
 */
export async function getPendingMessages(roomId) {
    try {
        const db = await getDB();
        if (roomId) {
            const index = db.transaction('pendingMessages', 'readonly')
                .objectStore('pendingMessages')
                .index('by-room');
            return await index.getAll(String(roomId));
        }
        return await db.getAll('pendingMessages');
    } catch (err) {
        console.warn('[offlineDB] getPendingMessages error:', err);
        return [];
    }
}

/**
 * Remove a pending message after it has been successfully sent.
 * @param {string} tempId
 */
export async function removePendingMessage(tempId) {
    try {
        const db = await getDB();
        await db.delete('pendingMessages', tempId);
    } catch (err) {
        console.warn('[offlineDB] removePendingMessage error:', err);
    }
}

// ─── Servers & Channels ────────────────────────────────────────────

/**
 * Cache server list.
 * @param {Array} servers
 */
export async function cacheServers(servers) {
    try {
        const db = await getDB();
        const tx = db.transaction('servers', 'readwrite');
        for (const s of servers) {
            await tx.store.put(s);
        }
        await tx.done;
    } catch (err) {
        console.warn('[offlineDB] cacheServers error:', err);
    }
}

/** @returns {Promise<Array>} */
export async function getCachedServers() {
    try {
        const db = await getDB();
        return await db.getAll('servers');
    } catch (err) {
        console.warn('[offlineDB] getCachedServers error:', err);
        return [];
    }
}

/**
 * Cache channels for a server.
 * @param {string|number} serverId
 * @param {Array} channels
 */
export async function cacheChannels(serverId, channels) {
    try {
        const db = await getDB();
        const tx = db.transaction('channels', 'readwrite');
        for (const ch of channels) {
            await tx.store.put({ ...ch, serverId: String(serverId) });
        }
        await tx.done;
    } catch (err) {
        console.warn('[offlineDB] cacheChannels error:', err);
    }
}

/** @param {string|number} serverId */
export async function getCachedChannels(serverId) {
    try {
        const db = await getDB();
        const index = db.transaction('channels', 'readonly')
            .objectStore('channels')
            .index('by-server');
        return await index.getAll(String(serverId));
    } catch (err) {
        console.warn('[offlineDB] getCachedChannels error:', err);
        return [];
    }
}

// ─── Users ─────────────────────────────────────────────────────────

export async function cacheUser(user) {
    try {
        const db = await getDB();
        await db.put('users', user);
    } catch (err) {
        console.warn('[offlineDB] cacheUser error:', err);
    }
}

export async function getCachedUser(userId) {
    try {
        const db = await getDB();
        return await db.get('users', userId);
    } catch (err) {
        return null;
    }
}

// ─── Flush Queue (send pending messages when online) ───────────────

/**
 * Attempt to send all pending messages via the provided sendFn.
 * @param {Function} sendFn - async (msg) => boolean  — returns true if sent successfully
 * @returns {Promise<number>} number of successfully sent messages
 */
export async function flushPendingMessages(sendFn) {
    const pending = await getPendingMessages();
    let sent = 0;
    for (const msg of pending) {
        try {
            const ok = await sendFn(msg);
            if (ok) {
                await removePendingMessage(msg.tempId);
                sent++;
            }
        } catch {
            // Stop on first failure (likely still offline)
            break;
        }
    }
    return sent;
}

// ─── Clear all offline data ────────────────────────────────────────

export async function clearOfflineData() {
    try {
        const db = await getDB();
        const stores = ['messages', 'servers', 'channels', 'pendingMessages', 'users'];
        for (const name of stores) {
            const tx = db.transaction(name, 'readwrite');
            await tx.store.clear();
            await tx.done;
        }
    } catch (err) {
        console.warn('[offlineDB] clearOfflineData error:', err);
    }
}
