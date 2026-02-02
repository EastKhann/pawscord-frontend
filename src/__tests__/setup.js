// frontend/src/__tests__/setup.js
// 🧪 Test Setup File

import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
}
window.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
}
window.ResizeObserver = MockResizeObserver;

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock sessionStorage
const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

// Mock fetch
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(''),
        blob: () => Promise.resolve(new Blob()),
    })
);

// Mock WebSocket
class MockWebSocket {
    constructor(url) {
        this.url = url;
        this.readyState = 0; // CONNECTING
        setTimeout(() => {
            this.readyState = 1; // OPEN
            if (this.onopen) this.onopen({});
        }, 0);
    }
    send(data) { }
    close() {
        this.readyState = 3; // CLOSED
        if (this.onclose) this.onclose({});
    }
}
window.WebSocket = MockWebSocket;

// Mock AudioContext
window.AudioContext = vi.fn().mockImplementation(() => ({
    createGain: () => ({
        connect: vi.fn(),
        gain: { value: 1 }
    }),
    createAnalyser: () => ({
        connect: vi.fn(),
        fftSize: 256,
        getByteFrequencyData: vi.fn()
    }),
    createMediaStreamSource: vi.fn(),
    destination: {},
    suspend: vi.fn(),
    resume: vi.fn(),
    close: vi.fn()
}));

// Mock navigator.mediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
    value: {
        getUserMedia: vi.fn().mockResolvedValue({
            getTracks: () => [],
            getAudioTracks: () => [],
            getVideoTracks: () => []
        }),
        enumerateDevices: vi.fn().mockResolvedValue([])
    }
});

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
    value: {
        writeText: vi.fn().mockResolvedValue(undefined),
        readText: vi.fn().mockResolvedValue('')
    }
});

// Suppress console errors in tests (optional)
// console.error = vi.fn();
// console.warn = vi.fn();

// Global test utilities
global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

console.log('🧪 Test setup complete!');
