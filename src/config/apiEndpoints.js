// frontend/src/config/apiEndpoints.js
// Re-export from utils/apiEndpoints for backward compatibility
// Some components import from config/apiEndpoints - this bridges both paths

export {
    API_BASE_URL,
    API_BASE,
    getApiBase,
    getMediaBase,
    ENDPOINTS
} from '../utils/apiEndpoints';

// Re-export everything from utils/apiEndpoints
export * from '../utils/apiEndpoints';
