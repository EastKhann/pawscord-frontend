import { Capacitor } from '@capacitor/core';

export const MY_LOCAL_IP = import.meta.env.VITE_LOCAL_IP || "192.168.68.53";
export const DJANGO_PORT = import.meta.env.VITE_DJANGO_PORT || "8888";

// 🔥 FIX: Electron tespitini güçlendir
export const isElectron = (() => {
    if (typeof window === 'undefined') return false;
    // Method 1: window.require check
    if (typeof window.require === 'function') return true;
    // Method 2: process.versions.electron check
    if (typeof process !== 'undefined' && process.versions && process.versions.electron) return true;
    // Method 3: userAgent check
    if (navigator.userAgent.toLowerCase().includes('electron')) return true;
    // Method 4: file:// protocol check (Electron loads from file://)
    if (window.location.protocol === 'file:') return true;
    return false;
})();
export const isNative = Capacitor.isNativePlatform();

export const API_URL_BASE_STRING = (() => {
    // 🔥 Production: API calls go to api.pawscord.com
    // Frontend is served from pawscord.com (R2 CDN)
    if (isNative || isElectron) return "https://api.pawscord.com";
    if (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('192.168.')) {
        return "https://api.pawscord.com";
    }
    return `http://${MY_LOCAL_IP}:${DJANGO_PORT}`;
})();

export const API_BASE_URL = `${API_URL_BASE_STRING}/api`;
export const ABSOLUTE_HOST_URL = API_URL_BASE_STRING;

// 🔥 ErrorBoundary gibi class component'ler import edemez, global'e koy
if (typeof window !== 'undefined') {
    window.__PAWSCORD_API_BASE__ = `${API_URL_BASE_STRING}/api`;
}

// 🔥 NEW: Media files için ayrı URL (her zaman production)
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_URL || (
    (isNative || isElectron || !window.location.hostname.includes('localhost'))
        ? "https://media.pawscord.com"
        : API_URL_BASE_STRING
);
export const CDN_BASE_URL = import.meta.env.VITE_CDN_URL || "https://cdn.pawscord.com";
export const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL || "https://www.pawscord.com";
export const WS_PROTOCOL = API_URL_BASE_STRING.startsWith('https') ? 'wss' : 'ws';
export const API_HOST = API_URL_BASE_STRING.replace(/^https?:\/\//, '');

export const URLS = {
    LOGIN: `${API_BASE_URL}/auth/login/`,
    REGISTER: `${API_BASE_URL}/auth/register/`,
    UPLOAD_FILE: `${API_BASE_URL}/messages/upload_file/`,
    MSG_HISTORY_ROOM: `${API_BASE_URL}/messages/history/room/`,
    MSG_HISTORY_DM: `${API_BASE_URL}/messages/history/dm/`,
    ROOM_LIST: `${API_BASE_URL}/rooms/list_with_categories/`,
    CONV_LIST: `${API_BASE_URL}/conversations/`,
    CREATE_CONV: `${API_BASE_URL}/conversations/find_or_create/`,
    ALL_USERS: `${API_BASE_URL}/users/list_all/`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/update_profile/`,
    DEFAULT_AVATARS: `${API_BASE_URL}/users/default_avatars/`,
    CHANGE_USERNAME: `${API_BASE_URL}/users/change_username/`,
    GIFS: `${API_BASE_URL}/gifs/list_local/`,
    DOWNLOAD: "https://api.pawscord.com/api/download/latest/"
};

export const GOOGLE_WEB_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "774757987258-poa0elqqapnab8eud3tol3h2pilcqe71.apps.googleusercontent.com";
export const VIDEO_ASPECT_RATIO = 16 / 9;

