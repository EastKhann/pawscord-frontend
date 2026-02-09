import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pawscord.app',
  appName: 'Pawscord',
  webDir: 'build',
  server: {
    androidScheme: 'http', // Yerel testler için 'http' daha sorunsuzdur.
    cleartext: true,
    allowNavigation: [
      '192.168.68.53', // Senin IP adresini de izin verilenlere ekleyelim
      'pawscord.com',
      'accounts.google.com',
      'googleusercontent.com'
    ]
  },
  // 🔥 Service Worker'ı devre dışı bırak - LazyLoad sorunu için
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false  // ⚠️ Production: false olmalı!
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      // Web Client ID'n buraya:
      serverClientId: '774757987258-poa0elqqapnab8eud3tol3h2pilcqe71.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
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