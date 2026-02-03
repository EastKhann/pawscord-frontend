import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// �🔥 ELECTRON CONFIG - PWA DISABLED
export default defineConfig({
    base: './',

    plugins: [
        // ⚡ React with automatic JSX runtime
        react(),

        // 📊 Bundle analyzer
        visualizer({
            filename: 'stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
            template: 'treemap',
        }),
        // ⚠️ PWA DISABLED FOR ELECTRON
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
            'react/jsx-dev-runtime': path.resolve(__dirname, './node_modules/react/jsx-dev-runtime'),
        },
    },

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

    build: {
        outDir: 'build',
        sourcemap: false,
        chunkSizeWarningLimit: 1500,

        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('react-syntax-highlighter')) {
                        return 'syntax-core';
                    }

                    if (id.includes('node_modules')) {
                        if (id.includes('/react/') || id.includes('\\react\\')) {
                            if (!id.includes('react-') && !id.includes('@') &&
                                (id.includes('/react/index') || id.includes('\\react\\index') ||
                                    id.includes('/react/jsx-') || id.includes('\\react\\jsx-'))) {
                                return 'react-vendor';
                            }
                        }
                        if (id.includes('/react-dom/') || id.includes('\\react-dom\\')) {
                            return 'react-vendor';
                        }

                        if (id.includes('react-router')) {
                            return 'router-vendor';
                        }

                        if (id.includes('react-icons') || id.includes('lucide-react')) {
                            return 'icons-vendor';
                        }

                        if (id.includes('chart.js') || id.includes('recharts')) {
                            return 'chart-vendor';
                        }

                        if (id.includes('@tiptap') || id.includes('prosemirror') || id.includes('y-prosemirror') || id.includes('y-protocols')) {
                            return 'editor-vendor';
                        }

                        if (id.includes('simple-peer') || id.includes('socket.io-client') || id.includes('mediasoup-client')) {
                            return 'media-vendor';
                        }

                        if (id.includes('crypto-js') || id.includes('ethereum') || id.includes('ethers')) {
                            return 'crypto-vendor';
                        }

                        if (id.includes('@radix-ui') || id.includes('framer-motion') || id.includes('react-spring')) {
                            return 'ui-vendor';
                        }

                        if (id.includes('zustand') || id.includes('immer') || id.includes('react-query')) {
                            return 'state-vendor';
                        }

                        if (id.includes('performance-now') || id.includes('raf')) {
                            return 'perf-vendor';
                        }

                        return 'vendor';
                    }
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
