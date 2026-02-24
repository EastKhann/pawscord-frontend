import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));
const APP_VERSION = packageJson.version;

// ELECTRON CONFIG - PWA DISABLED
// Uses electron.html (no inline <style> blocks) to avoid Vite 7 html-proxy virtual module regression
export default defineConfig({
    base: './',

    plugins: [
        react({
            jsxRuntime: 'automatic',
        }),
        // Rename electron.html to index.html after build (Electron main loads index.html)
        {
            name: 'rename-electron-html',
            closeBundle() {
                const src = path.resolve(__dirname, 'build/electron.html');
                const dst = path.resolve(__dirname, 'build/index.html');
                if (fs.existsSync(src)) {
                    fs.renameSync(src, dst);
                }
            },
        },
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    // Same as web vite.config.ts: esbuild pre-processes ALL source JSX/TSX so
    // vite:build-import-analysis gets plain JS (not JSX) and doesn't fail
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.[jt]sx?$/,
        exclude: [],
        keepNames: true,
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
            // Use electron.html (no inline <style>) to avoid Vite 7 html-proxy bug
            // closeBundle plugin renames electron.html → index.html in output
            input: path.resolve(__dirname, 'electron.html'),
            output: {
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

    // Define global constants - VERSION
    define: {
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(APP_VERSION),
    },

    server: {
        port: 5173,
        host: true,
        open: false,
    },
})
