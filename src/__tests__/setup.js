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

// Mock AudioContext (enhanced for VoiceContext tests)
const createMockAudioNode = () => ({
    connect: vi.fn().mockReturnThis(),
    disconnect: vi.fn(),
});
window.AudioContext = vi.fn().mockImplementation(() => ({
    createGain: () => ({
        ...createMockAudioNode(),
        gain: { value: 1, setTargetAtTime: vi.fn() }
    }),
    createAnalyser: () => ({
        ...createMockAudioNode(),
        fftSize: 256,
        frequencyBinCount: 128,
        smoothingTimeConstant: 0.8,
        getByteFrequencyData: vi.fn()
    }),
    createMediaStreamSource: vi.fn().mockReturnValue(createMockAudioNode()),
    createMediaStreamDestination: vi.fn().mockReturnValue({
        stream: new MediaStream(),
        ...createMockAudioNode()
    }),
    createBiquadFilter: () => ({
        ...createMockAudioNode(),
        type: '', frequency: { value: 0 }, Q: { value: 0 }, gain: { value: 0 }
    }),
    createDynamicsCompressor: () => ({
        ...createMockAudioNode(),
        threshold: { value: 0 }, knee: { value: 0 }, ratio: { value: 0 },
        attack: { value: 0 }, release: { value: 0 }
    }),
    createOscillator: () => ({
        ...createMockAudioNode(),
        type: '', frequency: { value: 0 }, start: vi.fn()
    }),
    createDelay: () => ({ ...createMockAudioNode(), delayTime: { value: 0 } }),
    createConvolver: () => ({ ...createMockAudioNode(), buffer: null }),
    createWaveShaper: () => ({ ...createMockAudioNode(), curve: null }),
    createBuffer: vi.fn().mockReturnValue({
        getChannelData: vi.fn().mockReturnValue(new Float32Array(48000))
    }),
    destination: {},
    sampleRate: 48000,
    currentTime: 0,
    state: 'running',
    suspend: vi.fn().mockResolvedValue(undefined),
    resume: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined)
}));
window.webkitAudioContext = window.AudioContext;

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
