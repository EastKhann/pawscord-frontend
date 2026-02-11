// frontend/src/config/api.js
// ==============================================
// 📡 API Configuration & URL Constants
// ==============================================
// Single source of truth: utils/apiEndpoints.js provides the base URL.
// This file re-exports it and adds App.js-specific constants.
// ==============================================

// Import base URL from the single source of truth
import { getApiBase, getMediaBase, API_BASE_URL as _API_BASE_URL } from '../utils/apiEndpoints';

const API_URL_BASE = getApiBase();

export const isElectron = typeof window !== 'undefined' && typeof window.require === 'function';
export const isNative = typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform();
export const isProductionBuild = import.meta.env.PROD || process.env.NODE_ENV === 'production';

// Re-export the centralized base URL (single source of truth)
export const API_URL_BASE_STRING = API_URL_BASE;

// Media dosyaları için ayrı URL (EXE/APK'da production URL kullan)
export const MEDIA_BASE_URL = (() => {
    if (isElectron || isNative) return "https://www.pawscord.com";
    return API_URL_BASE_STRING;
})();

export const API_BASE_URL = `${API_URL_BASE_STRING}/api`;
export const ABSOLUTE_HOST_URL = API_URL_BASE_STRING;
export const WS_PROTOCOL = API_URL_BASE_STRING.startsWith('https') ? 'wss' : 'ws';
export const API_HOST = API_URL_BASE_STRING.replace(/^https?:\/\//, '');

// URL Constants
export const LOGIN_URL = `${API_BASE_URL}/auth/login/`;
export const REGISTER_URL = `${API_BASE_URL}/auth/register/`;
export const UPLOAD_FILE_URL = `${API_BASE_URL}/messages/upload_file/`;
export const MESSAGE_HISTORY_ROOM_URL = `${API_BASE_URL}/messages/history/room/`;
export const MESSAGE_HISTORY_DM_URL = `${API_BASE_URL}/messages/history/dm/`;
export const ROOM_LIST_URL = `${API_BASE_URL}/rooms/list_with_categories/`;
export const CONVERSATION_LIST_URL = `${API_BASE_URL}/conversations/`;
export const GET_OR_CREATE_CONVERSATION_URL = `${API_BASE_URL}/conversations/find_or_create/`;
export const ALL_USERS_URL = `${API_BASE_URL}/users/list_all/`;
export const UPDATE_PROFILE_URL = `${API_BASE_URL}/users/update_profile/`;
export const DEFAULT_AVATARS_URL = `${API_BASE_URL}/users/default_avatars/`;
export const CHANGE_USERNAME_URL = `${API_BASE_URL}/users/change_username/`;
export const LOCAL_GIF_LIST_URL = `${API_BASE_URL}/gifs/list_local/`;

export const DRAFT_STORAGE_KEY = 'chat_drafts_v1';

// Utility functions
export const getTemporaryId = () => (Date.now() + Math.floor(Math.random() * 1000)).toString();

export const calculateFileHash = async (file) => {
    const SparkMD5 = (await import('spark-md5')).default;
    return new Promise((resolve, reject) => {
        const chunkSize = 2 * 1024 * 1024;
        const totalChunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            spark.append(e.target.result);
            currentChunk++;
            if (currentChunk < totalChunks) loadNextChunk();
            else resolve(spark.end());
        };
        fileReader.onerror = (err) => reject(err);
        function loadNextChunk() {
            const start = currentChunk * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            fileReader.readAsArrayBuffer(file.slice(start, end));
        }
        loadNextChunk();
    });
};
