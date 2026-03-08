// frontend/src/PinnedMessages.js
// 10/10 — Full-featured pinned messages panel with search, filter, jump-to, unpin, date grouping

import React, { useState, useMemo, useCallback } from 'react';
import Message from './Message';

/* ── helpers ──────────────────────────────────────────────── */
const formatDateGroup = (ts) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = (now - d) / 86400000;
    if (diff < 1) return 'Today';
    if (diff < 2) return 'Yesterday';
    if (diff < 7) return 'This Week';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const groupByDate = (msgs) => {
    const groups = {};
    msgs.forEach((m) => {
        const key = formatDateGroup(m.timestamp || m.created_at || m.pinned_at);
        if (!groups[key]) groups[key] = [];
        groups[key].push(m);
    });
    return groups;
};

/* ── component ────────────────────────────────────────────── */
const PinnedMessages = ({
    messages = [],
    onClose,
    onJumpToMessage,
    onUnpin,
    currentUser = '',
    isAdmin = false,
}) => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all | mine | others

    /* filtered + searched messages */
    const filtered = useMemo(() => {
        let list = messages;
        if (filter === 'mine') list = list.filter((m) => m.sender === currentUser || m.username === currentUser);
        if (filter === 'others') list = list.filter((m) => m.sender !== currentUser && m.username !== currentUser);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (m) =>
                    (m.content || '').toLowerCase().includes(q) ||
                    (m.sender || m.username || '').toLowerCase().includes(q)
            );
        }
        return list;
    }, [messages, filter, search, currentUser]);

    const groups = useMemo(() => groupByDate(filtered), [filtered]);

    const handleJump = useCallback(
        (msgId) => {
            if (onJumpToMessage) onJumpToMessage(msgId);
        },
        [onJumpToMessage]
    );

    const handleUnpin = useCallback(
        (msgId) => {
            if (onUnpin) onUnpin(msgId);
        },
        [onUnpin]
    );

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
                {/* ── header ── */}
                <div style={styles.header}>
                    <h2 style={styles.title}>📌 Pinned Messages ({messages.length})</h2>
                    <button style={styles.closeButton} onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>

                {/* ── toolbar: search + filter ── */}
                <div style={styles.toolbar}>
                    <input
                        style={styles.searchInput}
                        type="text"
                        placeholder="Search pinned messages..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div style={styles.filterRow}>
                        {['all', 'mine', 'others'].map((f) => (
                            <button
                                key={f}
                                style={{
                                    ...styles.filterBtn,
                                    ...(filter === f ? styles.filterBtnActive : {}),
                                }}
                                onClick={() => setFilter(f)}
                            >
                                {f === 'all' ? 'All' : f === 'mine' ? 'Mine' : 'Others'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── list ── */}
                <div style={styles.list}>
                    {filtered.length > 0 ? (
                        Object.entries(groups).map(([dateLabel, msgs]) => (
                            <div key={dateLabel}>
                                <div style={styles.dateGroup}>{dateLabel}</div>
                                {msgs.map((msg) => (
                                    <div key={msg.id} style={styles.pinnedItem}>
                                        <Message msg={msg} currentUser={currentUser} isAdmin={isAdmin} />
                                        <div style={styles.actions}>
                                            <button
                                                style={styles.jumpBtn}
                                                onClick={() => handleJump(msg.id)}
                                                title="Jump to message in context"
                                            >
                                                ↗ Jump
                                            </button>
                                            {(isAdmin ||
                                                msg.sender === currentUser ||
                                                msg.username === currentUser) && (
                                                    <button
                                                        style={styles.unpinBtn}
                                                        onClick={() => handleUnpin(msg.id)}
                                                        title="Unpin this message"
                                                    >
                                                        ✖ Unpin
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div style={styles.empty}>
                            <span style={styles.emptyIcon}>📌</span>
                            <p style={styles.emptyTitle}>
                                {search || filter !== 'all'
                                    ? 'No pinned messages match your filter'
                                    : 'No pinned messages yet'}
                            </p>
                            <p style={styles.emptyHint}>
                                {search || filter !== 'all'
                                    ? 'Try adjusting your search or filter.'
                                    : 'Right-click a message and select "Pin" to keep it visible here.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ── styles ───────────────────────────────────────────────── */
const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    },
    panel: {
        backgroundColor: '#17191c', color: '#fff', width: '90%', maxWidth: 520,
        height: '75%', display: 'flex', flexDirection: 'column',
        borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px', borderBottom: '1px solid #0e1222',
    },
    title: { margin: 0, fontSize: '1.1em', fontWeight: 600 },
    closeButton: {
        background: 'none', border: 'none', color: '#b5bac1',
        fontSize: '1.8em', cursor: 'pointer', lineHeight: 1,
    },
    toolbar: { padding: '10px 20px 6px', borderBottom: '1px solid #0e1222' },
    searchInput: {
        width: '100%', padding: '8px 12px', borderRadius: 4,
        border: '1px solid #2a2d33', backgroundColor: '#1e2024',
        color: '#ddd', fontSize: '0.9em', outline: 'none', boxSizing: 'border-box',
    },
    filterRow: { display: 'flex', gap: 6, marginTop: 8 },
    filterBtn: {
        flex: 1, padding: '5px 0', borderRadius: 4, border: 'none',
        backgroundColor: '#2a2d33', color: '#949ba4', cursor: 'pointer',
        fontSize: '0.82em', transition: 'all 0.15s',
    },
    filterBtnActive: { backgroundColor: '#5865f2', color: '#fff' },
    list: { flexGrow: 1, overflowY: 'auto', padding: '10px 20px' },
    dateGroup: {
        fontSize: '0.75em', fontWeight: 700, color: '#949ba4',
        textTransform: 'uppercase', letterSpacing: 0.5,
        padding: '12px 0 4px', borderBottom: '1px solid #1e2024', marginBottom: 6,
    },
    pinnedItem: {
        marginBottom: 10, border: '1px solid #182135',
        borderRadius: 6, position: 'relative',
    },
    actions: {
        display: 'flex', justifyContent: 'flex-end', gap: 6,
        padding: '0 10px 8px',
    },
    jumpBtn: {
        background: 'none', border: '1px solid #3a3f47', borderRadius: 4,
        color: '#5865f2', padding: '3px 10px', fontSize: '0.78em',
        cursor: 'pointer',
    },
    unpinBtn: {
        background: 'none', border: '1px solid #3a3f47', borderRadius: 4,
        color: '#ed4245', padding: '3px 10px', fontSize: '0.78em',
        cursor: 'pointer',
    },
    empty: { textAlign: 'center', padding: '40px 20px' },
    emptyIcon: { fontSize: '3em', display: 'block', marginBottom: 12, opacity: 0.5 },
    emptyTitle: { color: '#ddd', fontWeight: 600, margin: '0 0 6px' },
    emptyHint: { color: '#949ba4', fontSize: '0.88em', margin: 0 },
};

export default React.memo(PinnedMessages);

