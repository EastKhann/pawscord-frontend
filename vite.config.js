import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import fs from 'fs'

// � PurgeCSS for unused CSS removal in production
import purgecss from '@fullhuman/postcss-purgecss'

// 🔥 package.json'dan versiyonu dinamik oku (BOM-safe)
const rawPkg = fs.readFileSync('./package.json', 'utf-8')
const packageJson = JSON.parse(rawPkg.charCodeAt(0) === 0xFEFF ? rawPkg.slice(1) : rawPkg)
const APP_VERSION = packageJson.version

// https://vitejs.dev/config/
export default defineConfig({
  // 🧪 Test Configuration (Vitest)
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'src/__tests__/setup.js']
    }
  },
  // 🔥 FIX: Electron için relative path, web/CF Pages için '/'
  // VITE_ELECTRON=true ise './' kullan (file:// protokolü için)
  // VITE_BASE_PATH ile override edilebilir (CDN asset hosting için)
  // CF Pages: '/' (varsayılan) — CDN'e taşınan asset'ler için CDN URL set et
  base: process.env.VITE_ELECTRON === 'true'
    ? './'
    : (process.env.VITE_BASE_PATH || '/'),

  plugins: [
    // ⚡ React with automatic JSX runtime (React 19 default)
    react({
      jsxRuntime: 'automatic',
    }),

    // 📊 Bundle analyzer - generate stats.html after build
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // treemap, sunburst, network
    }),

    // 🔥 FIX: Cloudflare Pages routes CORS-mode requests to index.html instead of static assets.
    // Vite adds crossorigin to <link rel="stylesheet"> and <script type="module">, which causes
    // browsers to use Sec-Fetch-Mode: cors. Cloudflare Pages incorrectly serves index.html for these.
    // Removing crossorigin makes the browser use same-origin/no-cors mode instead of cors,
    // so Cloudflare serves the actual files. Safe: all assets are same-origin anyway.
    {
      name: 'remove-cloudflare-breaking-crossorigin',
      apply: 'build',
      transformIndexHtml(html) {
        // Remove crossorigin from CSS links (same-origin → no CORS needed)
        html = html.replace(/<link rel="stylesheet" crossorigin /g, '<link rel="stylesheet" ');
        // Remove crossorigin from module script entry (same-origin → dynamic imports use same-origin mode)
        html = html.replace(/<script type="module" crossorigin /g, '<script type="module" ');
        return html;
      }
    },

    // ⚡ PWA Support - SADECE web build için (Electron'da devre dışı)
    ...(process.env.VITE_ELECTRON !== 'true' ? [VitePWA({
      injectRegister: false,
      // 🔥 autoUpdate: Yeni deploy anında aktif olsun (chunk hatalarını önler)
      registerType: 'autoUpdate',
      workbox: {
        // 🔥 skipWaiting + clientsClaim: Yeni SW hemen devreye girsin
        skipWaiting: true,
        clientsClaim: true,
        // ⚠️ HTML precache'den ÇIKARILDI - stale index.html sorunu çözüldü
        // JS/CSS zaten hariç (hash'li, runtime'da yüklensin)
        globPatterns: ['**/*.{ico,png,svg,webp}'],
        // Büyük dosyaları precache'den hariç tut
        globIgnores: ['**/bot/*.png', '**/static/js/*.js', '**/static/css/*.css', '**/assets/js/*.js', '**/assets/css/*.css', '**/*.html'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
        // Eski cache'leri otomatik temizle
        cleanupOutdatedCaches: true,
        // 🔥 navigateFallback kapatıldı - index.html her zaman sunucudan alınacak
        navigateFallback: null,
        navigationPreload: false,
        runtimeCaching: [
          // 🔥 Hash'li JS/CSS dosyaları SW runtime cache'lenmiyor.
          // Stale HTML ile eski chunk hash'leri karışırsa browser/CDN doğrudan
          // doğru 200/404 cevabını almalı; SW yanlışlıkla index.html cache'lememeli.
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/ui-avatars\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'avatar-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              }
            }
          },
          {
            urlPattern: /\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 5 // 5 minutes
              },
              networkTimeoutSeconds: 10
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'logo192.webp', 'logo512.webp'],
      manifest: {
        name: 'Pawscord',
        short_name: 'Pawscord',
        description: 'Discord clone with voice chat',
        theme_color: '#5865F2',
        background_color: '#2b2d31',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'logo192.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any maskable'
          },
          {
            src: 'logo512.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable'
          }
        ]
      }
    })] : []),
  ],

  // 🔥 base artık en üstte tanımlı (CDN için)

  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@types': path.resolve(__dirname, './src/types'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, './node_modules/react/jsx-dev-runtime'),
    },
  },

  // Allow .js files with JSX (CRA compatibility) + TypeScript support
  // ⚡ drop: production build'de TÜM console.log ve debugger ifadelerini siler
  // tsx loader handles both TypeScript and JSX syntax for all source files
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
    keepNames: true,
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
      },
    },
  },

  // Build optimizations
  build: {
    // Output directory
    // VITE_OUT_DIR=dist for Cloudflare Pages, default 'build' for local/Electron
    outDir: process.env.VITE_OUT_DIR || 'build',

    // Cloudflare Pages is incorrectly serving some JS modulepreload requests as HTML.
    // Disable JS module preloads so dynamic imports fetch chunks directly.
    modulePreload: false,

    // Sourcemap (production'da false)
    sourcemap: false,

    // Chunk size warnings — raised to 1100 because dash.all.min (~1MB) and hls.js (~540KB)
    // are 3rd-party streaming libraries that cannot be split further. Feature chunks are
    // already split by manualChunks below so the app code itself stays lean.
    chunkSizeWarningLimit: 1100,

    // Rollup optimizations
    rollupOptions: {
      output: {
        // ⚡ OPTIMIZATION: Manual chunk splitting for better caching
        manualChunks: (id) => {
          // ⚡ OPTIMIZED: PrismLight ile sadece kayıtlı diller (~100KB)
          if (id.includes('react-syntax-highlighter')) {
            return 'syntax-core'; // Tüm syntax highlighter tek chunk'ta (~100KB)
          }

          // Existing manual chunks - fixed circular dependencies
          if (id.includes('node_modules')) {
            // 🔥 CRITICAL FIX: React core - React, ReactDOM, Scheduler AYNI CHUNK'TA OLMALI
            // SES/lockdown (MetaMask vb.) ile uyumluluk için
            if (
              id.includes('/react/') || id.includes('\\react\\') ||
              id.includes('/react-dom/') || id.includes('\\react-dom\\') ||
              id.includes('/scheduler/') || id.includes('\\scheduler\\')
            ) {
              // react-router, react-icons gibi paketleri hariç tut
              if (!id.includes('react-router') && !id.includes('react-icons') &&
                !id.includes('react-toastify') && !id.includes('react-color') &&
                !id.includes('react-chartjs') && !id.includes('react-player') &&
                !id.includes('react-window') && !id.includes('react-virtualized') &&
                !id.includes('react-syntax') && !id.includes('react-dnd') &&
                !id.includes('react-redux') && !id.includes('@reduxjs') &&
                !id.includes('@sentry') && !id.includes('@tiptap')) {
                return 'react-core'; // React + ReactDOM + Scheduler tek chunk'ta
              }
            }

            // React Router - separate to avoid circular deps with chart-vendor
            if (id.includes('react-router')) {
              return 'router-vendor';
            }

            // ⚡ Icons - Separate chunk for better caching (~200KB)
            if (id.includes('react-icons')) {
              return 'icons-vendor';
            }

            // Cloudflare Pages is intermittently serving some script-destination
            // chunk requests as HTML. Keep high-traffic shared/vendor modules on
            // the already-working main chunk instead of separate JS files.
            // UI libraries - Toastify, color picker
            // NOTE: renamed from 'main' to 'app-vendor' to bust CDN cache for old wrong-cached main-BNr3Bg49.js
            if (id.includes('react-toastify') || id.includes('react-color')) {
              return 'app-vendor';
            }

            // Redux/state libs that may be used app-wide
            // NOTE: renamed from 'main' to 'app-vendor' to bust CDN cache
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux') ||
              id.includes('reselect') || id.includes('immer') ||
              id.includes('use-sync-external-store')) {
              return 'app-vendor';
            }
            // Pure chart libs (only used by analytics/dashboard pages) - lazy
            if (id.includes('recharts') || id.includes('victory-vendor')) {
              return 'chart-vendor';
            }
            // chart.js + react wrapper (~150KB)
            if (id.includes('chart.js') || id.includes('react-chartjs')) {
              return 'chart-vendor';
            }

            // Media libraries
            if (id.includes('react-player') || id.includes('wavesurfer') || id.includes('qrcode')) {
              return 'media-vendor';
            }

            // Editor & DnD - Split to avoid circular dependencies
            if (id.includes('@tiptap')) {
              return 'editor-vendor';
            }
            if (id.includes('react-dnd') || id.includes('dnd-core') || id.includes('@dnd-kit')) {
              return 'dnd-vendor';
            }

            // Crypto & Security
            if (id.includes('crypto-js') || id.includes('spark-md5') || id.includes('jwt-decode')) {
              return 'main';
            }

            // Virtual scrolling
            if (id.includes('react-window') || id.includes('react-virtualized-auto-sizer')) {
              return 'perf-vendor';
            }

            // State management
            if (id.includes('zustand')) {
              return 'state-vendor';
            }

            // HTTP client — keep separate to avoid being absorbed into feature chunks
            if (id.includes('axios')) {
              return 'main';
            }

            // 📊 Sentry SDK (~1.8 MB!) — error monitoring, can load deferred
            // Putting in own chunk so it doesn't bloat the entry bundle
            if (id.includes('@sentry')) {
              return 'sentry-vendor';
            }

            // 🔥 Firebase SDK (FCM, messaging) — only needed for push notifications
            if (id.includes('firebase') || id.includes('@firebase')) {
              return 'firebase-vendor';
            }

            // 🌐 i18next runtime (translations are loaded on demand anyway)
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n-vendor';
            }
          }

          // ⚡ App-level chunk splitting for large feature modules
          if (id.includes('/src/')) {
            // Shared utilities — must be checked BEFORE feature chunks
            // to prevent Rollup from absorbing them into feature chunks (causing circular deps)
            if (id.includes('/utils/toast') || id.includes('/utils/constants') ||
              id.includes('/utils/apiEndpoints') || id.includes('/utils/confirmDialog') ||
              id.includes('/utils/authFetch') || id.includes('/utils/logger') ||
              id.includes('/utils/ThemeManager') ||
              id.includes('/hooks/useModalA11y') ||
              id.includes('AuthContext')) {
              return 'main';
            }

            // Voice feature (WebRTC, audio processing) — large, not always needed
            if (id.includes('/components/Voice') || id.includes('/hooks/useVoice') ||
              id.includes('/stores/useVoiceStore')) {
              return 'feature-voice';
            }
            // Admin & analytics — staff-only features
            if (id.includes('/components/Admin') || id.includes('/components/Analytics') ||
              id.includes('AnalyticsPanel') || id.includes('AnalyticsDashboard')) {
              return 'feature-admin';
            }
            // Premium & store — monetization features
            if (id.includes('Premium') || id.includes('StoreModal') || id.includes('CoinStore') ||
              id.includes('SubscriptionManager')) {
              return 'feature-premium';
            }
            // Moderation tools — moderator-only features
            if (id.includes('Moderation') || id.includes('RaidProtection') ||
              id.includes('SpamDetection') || id.includes('AutoMod')) {
              return 'feature-moderation';
            }
            // Crypto signals — chart-heavy, only for subscribed users
            if (id.includes('CryptoSignal') || id.includes('CryptoDashboard') ||
              id.includes('CryptoStore')) {
              return 'feature-crypto';
            }
            // English learning hub — grammar quiz data is large
            if (id.includes('EnglishHub') || id.includes('GrammarQuiz') ||
              id.includes('/data/grammarQuestions')) {
              return 'feature-english';
            }
            // Forum feature — rich text editing, not always visited
            if (id.includes('Forum') || id.includes('ForumPanel')) {
              return 'feature-forum';
            }
            // Settings panels — loaded only when user opens settings
            if (id.includes('SettingsPanel') || id.includes('SecuritySettings') ||
              id.includes('PrivacySettings') || id.includes('AppearanceSettings')) {
              return 'feature-settings';
            }
          }
        },

        // Asset naming with better cache control
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          } else if (/css/i.test(extType)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // ⚡ OPTIMIZATION: esbuild minification (faster than terser)
    minify: 'esbuild',

    // ⚡ Drop console.* and debugger statements in production builds
    esbuildOptions: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },

    // ⚡ OPTIMIZATION: CSS code splitting
    cssCodeSplit: true,

    // ⚡ OPTIMIZATION: Faster rebuilds
    reportCompressedSize: false,

    // Target modern browsers for smaller bundle
    target: 'es2020',
  },

  // 🔒 PurgeCSS Configuration - Remove unused CSS in production
  css: {
    postcss: {
      plugins: process.env.NODE_ENV === 'production' ? [
        purgecss({
          content: [
            './src/**/*.{js,jsx,ts,tsx}',
            './public/index.html'
          ],
          // Safelist: Keep these classes even if not found in content
          safelist: {
            standard: [
              'html', 'body', /^react-/, /^toast/, /^Toastify/,
              /^recharts/, /^chart/, /modal/, /dropdown/,
              /^btn-/, /^text-/, /^bg-/, /active/, /disabled/,
              /loading/, /spinner/, /skeleton/,
              // CSS Modules: hashed class names (_className_hash_line) not found by PurgeCSS extractor
              /^_/
            ],
            deep: [/^rc-/, /^ant-/],  // Keep nested classes
            greedy: [/toast/, /modal/, /popup/]  // Keep anything containing these
          },
          // Don't remove keyframes
          keyframes: true,
          // Don't remove font-face rules
          fontFace: false,
          // Default extractor for JS files
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        })
      ] : []
    }
  },

  // Dev server
  server: {
    port: 3000,
    open: false,
    cors: true,
    // Proxy API requests to Django
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://127.0.0.1:8888',
        ws: true,
      },
    },
  },

  // Preview server (build sonrası test)
  preview: {
    port: 5173,
  },

  // Environment variables prefix (Vite uses VITE_ by default)
  envPrefix: 'VITE_',

  // Define global constants - 🔥 VERSION ARTIK DİNAMİK!
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(APP_VERSION),
    'import.meta.env.VITE_BUILD_ID': JSON.stringify(Date.now().toString()),
  },
})
