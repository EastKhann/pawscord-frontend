// frontend/src/contexts/index.js
// Central export for all React Contexts

// App-wide context → migrated to Zustand stores (useUIStore, useChatStore, useServerStore, useUserStore, useVoiceStore)
// AppContext.js deleted — all state now lives in /stores/

// Language/i18n context  
export { LanguageProvider, useLanguage } from './LanguageContext';

// Note: VoiceContext and AuthContext are in src/ root - consider moving them here later
// For now, import them from:
// - import { VoiceProvider, useVoice } from '../VoiceContext';
// - import { AuthProvider, useAuth } from '../AuthContext';
