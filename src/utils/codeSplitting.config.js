// frontend/src/utils/codeSplitting.config.js
// 🚀 Code Splitting Configuration - Route & Vendor Based

/**
 * Route-based code splitting configuration
 * Her route için ayrı bundle oluşturur
 */

// Route chunks
export const RouteChunks = {
  // Auth pages (bunlar pages/ altında)
  verifyEmail: () => import('../pages/VerifyEmailPage'),
  forgotPassword: () => import('../pages/ForgotPasswordPage'),
  resetPassword: () => import('../pages/ResetPasswordPage'),
  twoFactor: () => import('../pages/TwoFactorLoginPage'),

  // Main pages (bunlar src/ altında direkt)
  login: () => import('../LoginPage'),
  welcome: () => import('../WelcomeScreen'),

  // Admin
  analytics: () => import('../components/AdminAnalyticsPanel'),
  analyticsMain: () => import('../AnalyticsDashboard'),

  // Special features
  crypto: () => import('../CryptoChartModal'),
  cryptoDashboard: () => import('../CryptoDashboard'),
  englishLearn: () => import('../EnglishLearningPage'),
  englishHub: () => import('../EnglishHub'),
  kanban: () => import('../components/KanbanBoard'),

  // Premium
  premiumStore: () => import('../components/PremiumStoreModal'),
  themeStore: () => import('../components/ThemeStoreModal'),
  cryptoStore: () => import('../components/CryptoStoreModal'),
};

/**
 * Component-based lazy loading
 * On-demand modal ve component yükleme
 */
export const ComponentChunks = {
  // Modals (heavy)
  serverSettings: () => import('../components/ServerSettingsModal'),
  userProfile: () => import('../UserProfileModal'),
  imageModal: () => import('../ImageModal'),

  // Media
  gifPicker: () => import('../GifPicker'),
  stickerPicker: () => import('../StickerPicker'),
  soundboard: () => import('../components/SoundboardModal'),

  // Communication
  watchParty: () => import('../components/WatchPartyEnhanced'),
  cinema: () => import('../CinemaModal'),
  whiteboard: () => import('../components/WhiteboardModal'),

  // Tools
  poll: () => import('../components/PollCreateModal'),
  codeSnippet: () => import('../components/CodeSnippetModal'),
  messageTemplate: () => import('../components/MessageTemplateModal'),
};

/**
 * Preloading strategy
 * 🚀 Kullanıcı etkileşiminden ÖNCE en çok kullanılan chunk'ları yükle
 */
export const preloadCriticalChunks = () => {
  // En sık açılan bileşenler — hemen preload et (500ms sonra çağrılıyor)
  const criticalChunks = [
    ComponentChunks.userProfile,
    ComponentChunks.imageModal,
    ComponentChunks.serverSettings,
  ];
  criticalChunks.forEach(chunk => {
    try { chunk(); } catch (e) { /* ignore */ }
  });
};

/**
 * Prefetch strategy
 * Idle time'da gelecek chunks'ı prefetch et
 */
export const prefetchNextChunks = () => {
  const secondaryChunks = [
    ComponentChunks.gifPicker,
    ComponentChunks.stickerPicker,
    ComponentChunks.poll,
    ComponentChunks.codeSnippet,
  ];
  secondaryChunks.forEach(chunk => {
    try { chunk(); } catch (e) { /* ignore */ }
  });
};

export default {
  RouteChunks,
  ComponentChunks,
  preloadCriticalChunks,
  prefetchNextChunks
};


