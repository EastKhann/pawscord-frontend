// ==========================================
// Custom Hooks Type Definitions
// ==========================================

import { RefObject, Dispatch, SetStateAction } from 'react';

// useWebSocket
export interface WebSocketOptions {
    url: string;
    onMessage?: (data: unknown) => void;
    onOpen?: () => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (error: Event) => void;
    reconnect?: boolean;
    reconnectInterval?: number;
    maxRetries?: number;
    protocols?: string | string[];
}
export interface WebSocketReturn {
    sendMessage: (data: string | object) => void;
    lastMessage: MessageEvent | null;
    readyState: number;
    isConnected: boolean;
    reconnect: () => void;
    disconnect: () => void;
}
export declare function useWebSocket(options: WebSocketOptions): WebSocketReturn;

// useDebounce
export declare function useDebounce<T>(value: T, delay: number): T;

// useLocalStorage
export declare function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>];

// useInfiniteScroll
export interface InfiniteScrollOptions {
    threshold?: number;
    rootMargin?: string;
    enabled?: boolean;
}
export interface InfiniteScrollReturn {
    ref: RefObject<HTMLElement>;
    inView: boolean;
}
export declare function useInfiniteScroll(
    callback: () => void | Promise<void>,
    options?: InfiniteScrollOptions
): InfiniteScrollReturn;

// useClickOutside
export declare function useClickOutside(
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent | TouchEvent) => void,
    enabled?: boolean
): void;

// useMediaQuery
export declare function useMediaQuery(query: string): boolean;

// useOnlineStatus
export declare function useOnlineStatus(): boolean;

// useKeyPress
export declare function useKeyPress(targetKey: string, handler?: () => void): boolean;

// useFocusTrap
export interface FocusTrapOptions {
    enabled?: boolean;
    returnFocusOnDeactivate?: boolean;
    initialFocus?: RefObject<HTMLElement>;
}
export declare function useFocusTrap(
    containerRef: RefObject<HTMLElement>,
    options?: FocusTrapOptions
): void;

// useTheme
export interface ThemeReturn {
    theme: 'dark' | 'light' | 'amoled' | 'custom';
    setTheme: (theme: string) => void;
    toggleTheme: () => void;
    customColors: Record<string, string>;
    setCustomColor: (key: string, value: string) => void;
}
export declare function useTheme(): ThemeReturn;

// useNotifications
export interface NotificationReturn {
    notifications: Array<{
        id: string;
        type: string;
        message: string;
        read: boolean;
        created_at: string;
    }>;
    unreadCount: number;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    clearAll: () => void;
}
export declare function useNotifications(): NotificationReturn;

// useVoice
export interface VoiceReturn {
    isInVoiceChannel: boolean;
    currentChannel: { id: string; name: string } | null;
    isMuted: boolean;
    isDeafened: boolean;
    isSpeaking: boolean;
    participants: Array<{ id: string; username: string; isMuted: boolean; isSpeaking: boolean }>;
    joinChannel: (channelId: string) => Promise<void>;
    leaveChannel: () => void;
    toggleMute: () => void;
    toggleDeafen: () => void;
    setVolume: (userId: string, volume: number) => void;
}
export declare function useVoice(): VoiceReturn;

// useAuth
export interface AuthUser {
    id: string | number;
    username: string;
    email: string;
    avatar_url?: string;
    is_premium?: boolean;
    is_staff?: boolean;
}
export interface AuthReturn {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    register: (data: { username: string; email: string; password: string }) => Promise<void>;
    refreshToken: () => Promise<void>;
}
export declare function useAuth(): AuthReturn;
