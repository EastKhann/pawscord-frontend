import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pawscord.app',
  appName: 'Pawscord',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    cleartext: false,  // ✅ Production: HTTPS only, no cleartext
    allowNavigation: [
      'pawscord.com',
      'accounts.google.com',
      'googleusercontent.com'
    ]
  },
  // 🔥 Service Worker'ı devre dışı bırak - LazyLoad sorunu için
  android: {
    allowMixedContent: false,  // ✅ Production: false - HTTPS only
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      // Web Client ID'n buraya:
      serverClientId: '774757987258-poa0elqqapnab8eud3tol3h2pilcqe71.apps.googleusercontent.com',
      forceCodeForRefreshToken: false, // true iken Android'de idToken null dönebilir!
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#6366F1',
      sound: 'beep.wav',
    },
  },
};

export default config;