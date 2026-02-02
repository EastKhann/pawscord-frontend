// frontend/craco.config.js
// 🚀 CRACO Configuration for Webpack Bundle Optimization

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Production optimizations
      if (env === 'production') {
        // ⚡ CRITICAL: Reduce initial bundle size
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          runtimeChunk: 'single', // Separate runtime chunk
          moduleIds: 'deterministic', // Better long-term caching
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: 30, // Makul seviye
            minSize: 10000, // 10KB minimum
            maxSize: 100000, // 100KB maximum
            enforceSizeThreshold: 150000, // Force split at 150KB
            automaticNameDelimiter: '.',
            cacheGroups: {
              // React & ReactDOM (CRITICAL - load first)
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                name: 'react-vendor',
                priority: 50,
                enforce: true, // Force this split
                reuseExistingChunk: true,
              },

              // ⚡ OPTIMIZATION: Chart.js separate (288KB - lazy load this)
              charts: {
                test: /[\\/]node_modules[\\/](chart\.js|react-chartjs-2)[\\/]/,
                name: 'charts-vendor',
                priority: 45,
                enforce: true,
                reuseExistingChunk: true,
              },

              // React Icons (should be tree-shaken but still separate)
              icons: {
                test: /[\\/]node_modules[\\/]react-icons[\\/]/,
                name: 'icons',
                priority: 40,
                maxSize: 100000, // 100KB
                reuseExistingChunk: true,
              },

              // WebRTC & Media libs
              media: {
                test: /[\\/]node_modules[\\/](simple-peer|socket\.io-client)[\\/]/,
                name: 'media-vendor',
                priority: 35,
                reuseExistingChunk: true,
              },

              // Utilities (lodash, moment, etc)
              utils: {
                test: /[\\/]node_modules[\\/](lodash|moment|date-fns)[\\/]/,
                name: 'utils-vendor',
                priority: 30,
                reuseExistingChunk: true,
              },

              // React Window (virtual scrolling)
              virtualScroll: {
                test: /[\\/]node_modules[\\/](react-window|react-virtualized-auto-sizer)[\\/]/,
                name: 'virtual-scroll',
                priority: 25,
                reuseExistingChunk: true,
              },

              // Other vendors
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  // Dynamic vendor chunk naming - Safe null check
                  if (!module.context) return 'vendor';
                  const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                  if (!match) return 'vendor';
                  const packageName = match[1];
                  return `vendor.${packageName.replace('@', '')}`;
                },
                priority:20000, // Split vendors >20KB (CRITICAL!)
                reuseExistingChunk: true,
              },

              // Common code used by 2+ chunks
              common: {
                minChunks: 2,
                priority: 10,
                reuseExistingChunk: true,
                name: 'common',
                maxSize: 20000, // 20KB max (CRITICAL
                maxSize: 40000, // 40KB max (was 80KB - aggressive!)
              },
            },
          },

          // Terser minification
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                  inline: 2,
                  drop_console: true, // Remove console.log in production
                  drop_debugger: true,
                  pure_funcs: ['console.log', 'console.debug', 'console.info', 'console.warn'], // Remove specific functions
                  passes: 1, // ⚡ 1 pass - hızlı build
                  unsafe: false, // Güvenli mod
                  unsafe_comps: true,
                  unsafe_math: true,
                  unsafe_methods: true,
                  unsafe_proto: true,
                  unsafe_regexp: true,
                  toplevel: true, // Mangle top-level variables
                  keep_fnames: false,
                  keep_classnames: false,
                },
                mangle: {
                  safari10: true,
                  toplevel: true, // Mangle top-level names
                  properties: false,
                },
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
              parallel: true,
              extractComments: false, // ⚡ Don't create .LICENSE.txt files
            }),
          ],

          // Runtime chunk for better caching
          runtimeChunk: {
            name: 'runtime',
          },
        };

        // Plugins
        webpackConfig.plugins = [
          ...webpackConfig.plugins,

          // Gzip compression
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240, // Only compress files > 10KB
            minRatio: 0.8,
          }),

          // Brotli compression (better than gzip)
          new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          }),

          // Bundle Analyzer (conditional)
          ...(process.env.ANALYZE ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: 'bundle-report.html',
              openAnalyzer: true,
            })
          ] : []),

          // Define plugin for environment variables
          new webpack.DefinePlugin({
            'process.env.REACT_APP_BUILD_TIME': JSON.stringify(new Date().toISOString()),
          }),
        ];

        // Performance hints
        webpackConfig.performance = {
          maxEntrypointSize: 512000, // 500KB
          maxAssetSize: 512000,
          hints: 'warning',
        };
      }

      // Development optimizations
      if (env === 'development') {
        // Faster source maps
        webpackConfig.devtool = 'eval-source-map';

        // Cache for faster rebuilds
        webpackConfig.cache = {
          type: 'filesystem',
          cacheDirectory: paths.appPath + '/.webpack-cache',
        };
      }

      return webpackConfig;
    },
  },

  // DevServer optimizations
  devServer: {
    compress: true,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
};
