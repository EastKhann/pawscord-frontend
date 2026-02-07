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
  // 🔥 FIX: Electron için relative path, web için CDN/absolute path
  // VITE_ELECTRON=true ise './' kullan (file:// protokolü için)
  // Değilse CDN URL veya '/' kullan (web deployment için)
  base: process.env.VITE_ELECTRON === 'true'
    ? './'
    : (process.env.VITE_CDN_URL || '/'),

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

    // ⚡ PWA Support - SADECE web build için (Electron'da devre dışı)
    ...(process.env.VITE_ELECTRON !== 'true' ? [VitePWA({
      // 🔥 FIX: autoUpdate yerine prompt kullan - otomatik sayfa yenilemesi mesaj kaybına sebep oluyor!
      registerType: 'prompt',
      workbox: {
        // 🔥 KRITIK: skipWaiting false olmalı - aksi halde SW otomatik aktive olur ve sayfa yenilenir!
        skipWaiting: false,
        clientsClaim: false,
        // 🔥 FIX: Sadece kritik dosyaları precache'le - JS/CSS hariç (runtime'da yüklensin)
        globPatterns: ['**/*.{html,ico,png,svg,webp}'],
        // 🔥 FIX: Büyük dosyaları precache'den hariç tut
        globIgnores: ['**/bot/*.png', '**/static/js/*.js', '**/static/css/*.css'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB limit (varsayılan 2MB)
        // 🔥 FIX: Eski cache'leri otomatik temizle
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          // 🔥 JS/CSS dosyaları için StaleWhileRevalidate - network öncelikli ama cache fallback
          {
            urlPattern: /\/static\/(?:js|css)\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              }
            }
          },
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
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, './node_modules/react/jsx-dev-runtime'),
    },
  },

  // Allow .js files with JSX (CRA compatibility)
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  // Build optimizations
  build: {
    // Output directory
    outDir: 'build',

    // Sourcemap (production'da false)
    sourcemap: false,

    // Chunk size warnings
    chunkSizeWarningLimit: 1500,

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
                !id.includes('react-syntax') && !id.includes('react-dnd')) {
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

            // UI libraries - Toastify, color picker
            if (id.includes('react-toastify') || id.includes('react-color')) {
              return 'ui-vendor';
            }

            // Chart libraries - Recharts MUST go to react-core (SES/lockdown fix)
            if (id.includes('recharts')) {
              return 'react-core'; // 🔥 FIX: Recharts needs React globals from react-core
            }
            if (id.includes('chart.js') && !id.includes('react-chartjs')) {
              return 'chart-vendor'; // Pure chart.js
            }
            if (id.includes('react-chartjs-2')) {
              return 'chart-vendor'; // Chart.js React wrapper
            }

            // Media libraries
            if (id.includes('react-player') || id.includes('wavesurfer') || id.includes('qrcode')) {
              return 'media-vendor';
            }

            // Editor & DnD - Split to avoid circular dependencies
            if (id.includes('@tiptap')) {
              return 'editor-vendor';
            }
            if (id.includes('dnd')) {
              return 'ui-vendor'; // Move to ui-vendor to avoid circular deps
            }

            // Crypto & Security
            if (id.includes('crypto-js') || id.includes('spark-md5') || id.includes('jwt-decode')) {
              return 'crypto-vendor';
            }

            // Virtual scrolling
            if (id.includes('react-window') || id.includes('react-virtualized-auto-sizer')) {
              return 'perf-vendor';
            }

            // State management
            if (id.includes('zustand')) {
              return 'state-vendor';
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
            return 'static/css/[name]-[hash][extname]';
          }
          return `static/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
      },
    },

    // ⚡ OPTIMIZATION: esbuild minification (faster than terser)
    minify: 'esbuild',

    // ⚡ OPTIMIZATION: Remove console.log in production (esbuild)
    esbuildOptions: {
      drop: ['console', 'debugger'],
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
              /loading/, /spinner/, /skeleton/
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
  },
})
