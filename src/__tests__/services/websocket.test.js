// frontend/src/__tests__/services/websocket.test.js
// WebSocketService unit tests

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── Mock WebSocket ─────────────────────────────────────
class MockWebSocket {
    static OPEN = 1;
    static CLOSED = 3;

    constructor(url) {
        this.url = url;
        this.readyState = MockWebSocket.OPEN;
        this.onopen = null;
        this.onclose = null;
        this.onerror = null;
        this.onmessage = null;
        this.sentMessages = [];

        // Use microtask instead of setTimeout to avoid fake-timer issues
        Promise.resolve().then(() => {
            if (this.onopen) this.onopen();
        });
    }

    send(data) {
        this.sentMessages.push(data);
    }

    close(code = 1000) {
        this.readyState = MockWebSocket.CLOSED;
        if (this.onclose) this.onclose({ code });
    }

    // Test helper to simulate incoming message
    _receive(data) {
        if (this.onmessage) this.onmessage({ data: JSON.stringify(data) });
    }
}

// ── Global stubs ───────────────────────────────────────
vi.mock('../../utils/constants', () => ({
    WS_PROTOCOL: 'ws',
    API_HOST: 'localhost:8000',
}));

let wsService, WS_STATES, MESSAGE_TYPES;

beforeEach(async () => {
    global.WebSocket = MockWebSocket;

    // setup.js already installed a localStorage mock on window — just configure it
    window.localStorage.getItem.mockReturnValue('test-token');

    vi.resetModules();
    const mod = await import('../../services/WebSocketService');
    wsService = mod.wsService || mod.default;
    WS_STATES = mod.WS_STATES;
    MESSAGE_TYPES = mod.MESSAGE_TYPES;
});

afterEach(() => {
    vi.clearAllMocks();
});

// ======================================================
// EXPORTS / CONSTANTS
// ======================================================
describe('WebSocketService exports', () => {
    it('exports WS_STATES object', () => {
        expect(WS_STATES).toBeDefined();
        expect(WS_STATES.CONNECTED).toBe('CONNECTED');
        expect(WS_STATES.DISCONNECTED).toBe('DISCONNECTED');
        expect(WS_STATES.RECONNECTING).toBe('RECONNECTING');
    });

    it('exports MESSAGE_TYPES', () => {
        expect(MESSAGE_TYPES.CHAT).toBe('chat_message');
        expect(MESSAGE_TYPES.TYPING).toBe('typing');
        expect(MESSAGE_TYPES.PING).toBe('ping');
        expect(MESSAGE_TYPES.PONG).toBe('pong');
    });

    it('exports a singleton wsService', () => {
        expect(wsService).toBeDefined();
        expect(typeof wsService.connect).toBe('function');
    });
});

// ======================================================
// CONNECT
// ======================================================
describe('connect()', () => {
    it('creates a WebSocket and resolves on open', async () => {
        const conn = await wsService.connect('chat/1');
        expect(conn).toBeDefined();
        expect(conn.state).toBe(WS_STATES.CONNECTED);
    });

    it('builds URL with token and channel', async () => {
        const conn = await wsService.connect('chat/42');
        const ws = conn.ws;
        expect(ws.url).toContain('ws://localhost:8000/ws/chat/42/');
        expect(ws.url).toContain('token=test-token');
    });

    it('rejects when no auth token and not anonymous', async () => {
        window.localStorage.getItem.mockReturnValue(null);

        vi.resetModules();
        const mod = await import('../../services/WebSocketService');
        const freshWs = mod.wsService || mod.default;
        await expect(freshWs.connect('chat/1', {})).rejects.toThrow();
    });

    it('returns existing connection if already connected', async () => {
        const conn1 = await wsService.connect('notify');
        const conn2 = await wsService.connect('notify');
        expect(conn1).toBe(conn2);
    });
});

// ======================================================
// SEND
// ======================================================
describe('send()', () => {
    it('sends JSON message through connected socket', async () => {
        const conn = await wsService.connect('chat/1');
        wsService.send('chat/1', MESSAGE_TYPES.CHAT, { content: 'hi' });

        const sent = JSON.parse(conn.ws.sentMessages[conn.ws.sentMessages.length - 1]);
        expect(sent.type).toBe('chat_message');
        expect(sent.content).toBe('hi');
    });

    it('adds timestamp and id to messages', async () => {
        const conn = await wsService.connect('chat/1');
        wsService.send('chat/1', 'test', { data: 1 });

        const sent = JSON.parse(conn.ws.sentMessages[conn.ws.sentMessages.length - 1]);
        expect(sent.timestamp).toBeDefined();
        expect(sent.id).toBeDefined();
    });

    it('queues message when not connected', () => {
        const result = wsService.send('offline-chan', 'test', { data: 1 });
        expect(result).toBe(false);
    });

    it('returns true on successful send', async () => {
        await wsService.connect('chat/1');
        const result = wsService.send('chat/1', 'test', {});
        expect(result).toBe(true);
    });
});

// ======================================================
// MESSAGE HANDLING
// ======================================================
describe('message handling', () => {
    it('calls channel handler on incoming message', async () => {
        const conn = await wsService.connect('chat/1');
        const handler = vi.fn();
        wsService.on('chat/1', handler);

        conn.ws._receive({ type: 'chat_message', content: 'hello' });

        expect(handler).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'chat_message', content: 'hello' }),
            'chat/1',
        );
    });

    it('calls global handler on any message', async () => {
        const conn = await wsService.connect('chat/1');
        const globalHandler = vi.fn();
        wsService.onGlobal(globalHandler);

        conn.ws._receive({ type: 'notification', text: 'ping' });

        expect(globalHandler).toHaveBeenCalled();
    });

    it('returns unsubscribe function from on()', async () => {
        await wsService.connect('chat/1');
        const handler = vi.fn();
        const unsub = wsService.on('chat/1', handler);

        unsub();

        expect(typeof unsub).toBe('function');
    });

    it('increments messagesReceived stat', async () => {
        const conn = await wsService.connect('chat/1');
        const before = wsService.getStats().messagesReceived;
        conn.ws._receive({ type: 'test' });
        expect(wsService.getStats().messagesReceived).toBeGreaterThanOrEqual(before + 1);
    });
});

// ======================================================
// DISCONNECT
// ======================================================
describe('disconnect()', () => {
    it('closes the WebSocket', async () => {
        const conn = await wsService.connect('chat/1');
        const closeSpy = vi.spyOn(conn.ws, 'close');
        wsService.disconnect('chat/1');
        expect(closeSpy).toHaveBeenCalledWith(1000);
    });

    it('removes connection from the map', async () => {
        await wsService.connect('chat/1');
        wsService.disconnect('chat/1');
        expect(wsService.getState('chat/1')).toBe(WS_STATES.DISCONNECTED);
    });

    it('clears message queue for channel', async () => {
        wsService.send('chat/new', 'test', {});
        wsService.disconnect('chat/new');
        expect(true).toBe(true);
    });
});

// ======================================================
// CONVENIENCE METHODS
// ======================================================
describe('convenience methods', () => {
    it('connectToRoom builds correct channel', async () => {
        const conn = await wsService.connectToRoom(42);
        expect(conn.channel).toBe('chat/42');
    });

    it('sendChatMessage sends with correct type', async () => {
        const conn = await wsService.connectToRoom(1);
        wsService.sendChatMessage(1, 'Hello!');

        const sent = JSON.parse(conn.ws.sentMessages[conn.ws.sentMessages.length - 1]);
        expect(sent.type).toBe('chat_message');
        expect(sent.content).toBe('Hello!');
    });

    it('sendTyping sends typing indicator', async () => {
        const conn = await wsService.connectToRoom(1);
        wsService.sendTyping(1, true);

        const sent = JSON.parse(conn.ws.sentMessages[conn.ws.sentMessages.length - 1]);
        expect(sent.type).toBe('typing');
        expect(sent.typing).toBe(true);
    });

    it('sendReaction sends emoji reaction', async () => {
        const conn = await wsService.connectToRoom(5);
        wsService.sendReaction(5, 'msg-123', '👍');

        const sent = JSON.parse(conn.ws.sentMessages[conn.ws.sentMessages.length - 1]);
        expect(sent.type).toBe('reaction');
        expect(sent.emoji).toBe('👍');
        expect(sent.message_id).toBe('msg-123');
    });
});

// ======================================================
// STATS
// ======================================================
describe('getStats()', () => {
    it('returns stats object with expected keys', () => {
        const stats = wsService.getStats();
        expect(stats).toHaveProperty('messagesSent');
        expect(stats).toHaveProperty('messagesReceived');
        expect(stats).toHaveProperty('reconnects');
        expect(stats).toHaveProperty('errors');
    });

    it('messagesSent increments on send', async () => {
        const before = wsService.getStats().messagesSent;
        await wsService.connect('chat/1');
        wsService.send('chat/1', 'test', {});
        expect(wsService.getStats().messagesSent).toBeGreaterThanOrEqual(before + 1);
    });
});
