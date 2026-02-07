// frontend/src/utils/codeSplitting.config.js
// 🚀 Code Splitting Configuration - Route & Vendor Based

/**
 * Route-based code splitting configuration
 * Her route için ayrı bundle oluşturur
 */

// Route chunks
export const RouteChunks = {
  // Auth pages (bunlar pages/ altında)
  verifyEmail: () => import(/* webpackChunkName: "auth" */ '../pages/VerifyEmailPage'),
  forgotPassword: () => import(/* webpackChunkName: "auth" */ '../pages/ForgotPasswordPage'),
  resetPassword: () => import(/* webpackChunkName: "auth" */ '../pages/ResetPasswordPage'),
  twoFactor: () => import(/* webpackChunkName: "auth" */ '../pages/TwoFactorLoginPage'),

  // Main pages (bunlar src/ altında direkt)
  login: () => import(/* webpackChunkName: "auth" */ '../LoginPage'),
  welcome: () => import(/* webpackChunkName: "home" */ '../WelcomeScreen'),

  // Admin
  analytics: () => import(/* webpackChunkName: "admin" */ '../components/AdminAnalyticsPanel'),
  analyticsMain: () => import(/* webpackChunkName: "admin" */ '../AnalyticsDashboard'),

  // Special features
  crypto: () => import(/* webpackChunkName: "features" */ '../CryptoChartModal'),
  cryptoDashboard: () => import(/* webpackChunkName: "features" */ '../CryptoDashboard'),
  englishLearn: () => import(/* webpackChunkName: "features" */ '../EnglishLearningPage'),
  englishHub: () => import(/* webpackChunkName: "features" */ '../EnglishHub'),
  kanban: () => import(/* webpackChunkName: "features" */ '../components/KanbanBoard'),

  // Premium
  premiumStore: () => import(/* webpackChunkName: "premium" */ '../components/PremiumStoreModal'),
  themeStore: () => import(/* webpackChunkName: "premium" */ '../components/ThemeStoreModal'),
  cryptoStore: () => import(/* webpackChunkName: "premium" */ '../components/CryptoStoreModal'),
};

/**
 * Component-based lazy loading
 * On-demand modal ve component yükleme
 */
export const ComponentChunks = {
  // Modals (heavy)
  serverSettings: () => import(/* webpackChunkName: "modals" */ '../components/ServerSettingsModal'),
  userProfile: () => import(/* webpackChunkName: "modals" */ '../UserProfileModal'),
  imageModal: () => import(/* webpackChunkName: "modals" */ '../ImageModal'),

  // Media
  gifPicker: () => import(/* webpackChunkName: "media" */ '../GifPicker'),
  stickerPicker: () => import(/* webpackChunkName: "media" */ '../StickerPicker'),
  soundboard: () => import(/* webpackChunkName: "media" */ '../components/SoundboardModal'),

  // Communication
  watchParty: () => import(/* webpackChunkName: "communication" */ '../components/WatchPartyEnhanced'),
  cinema: () => import(/* webpackChunkName: "communication" */ '../CinemaModal'),
  whiteboard: () => import(/* webpackChunkName: "communication" */ '../components/WhiteboardModal'),

  // Tools
  poll: () => import(/* webpackChunkName: "tools" */ '../components/PollCreateModal'),
  codeSnippet: () => import(/* webpackChunkName: "tools" */ '../components/CodeSnippetModal'),
  messageTemplate: () => import(/* webpackChunkName: "tools" */ '../components/MessageTemplateModal'),
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


