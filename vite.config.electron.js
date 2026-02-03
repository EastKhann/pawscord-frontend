import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// 🔥 ELECTRON CONFIG - PWA DISABLED - REACT IN SINGLE CHUNK
export default defineConfig({
    base: './',

    plugins: [
        // ⚡ React with automatic JSX runtime - classic mode to avoid Fragment issues
        react({
            jsxRuntime: 'classic',
        }),
        // ⚠️ PWA DISABLED FOR ELECTRON
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },

    optimizeDeps: {
        include: ['react', 'react-dom', 'react/jsx-runtime'],
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },

    build: {
        outDir: 'build',
        sourcemap: false,
        chunkSizeWarningLimit: 10000,

        rollupOptions: {
            output: {
                // 🚨 REACT TEK CHUNK'TA - Fragment hatası için
                manualChunks: (id) => {
                    // React ve react-dom MUTLAKA aynı chunk'ta olmalı
                    if (id.includes('node_modules/react') ||
                        id.includes('node_modules/react-dom') ||
                        id.includes('node_modules/scheduler')) {
                        return 'react-core';
                    }
                    // Büyük kütüphaneler ayrı
                    if (id.includes('node_modules/recharts')) return 'recharts';
                    if (id.includes('node_modules/hls.js')) return 'hls';
                    if (id.includes('node_modules/dashjs')) return 'dashjs';
                    if (id.includes('node_modules/@tiptap')) return 'tiptap';
                    // Geri kalanlar vendor - circular dependency önlemek için tek chunk
                },
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    let extType = info[info.length - 1];
                    if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
                        extType = 'img';
                    } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
                        extType = 'fonts';
                    }
                    return `static/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
            },
        },

        minify: 'esbuild',
        target: 'esnext',
    },

    server: {
        port: 5173,
        host: true,
        open: false,
    },

    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
})
