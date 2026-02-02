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
        // Code Splitting Strategy
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              // React & ReactDOM
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'react-vendor',
                priority: 40,
                reuseExistingChunk: true,
              },

              // React Icons (180KB -> separate chunk)
              icons: {
                test: /[\\/]node_modules[\\/]react-icons[\\/]/,
                name: 'icons',
                priority: 30,
                reuseExistingChunk: true,
              },

              // WebRTC & Media libs
              media: {
                test: /[\\/]node_modules[\\/](simple-peer|socket\.io-client)[\\/]/,
                name: 'media-vendor',
                priority: 25,
                reuseExistingChunk: true,
              },

              // Charts & Visualization
              charts: {
                test: /[\\/]node_modules[\\/](chart\.js|recharts)[\\/]/,
                name: 'charts-vendor',
                priority: 20,
                reuseExistingChunk: true,
              },

              // Utilities (lodash, moment, etc)
              utils: {
                test: /[\\/]node_modules[\\/](lodash|moment|date-fns)[\\/]/,
                name: 'utils-vendor',
                priority: 15,
                reuseExistingChunk: true,
              },

              // Other vendors
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                priority: 10,
                reuseExistingChunk: true,
              },

              // Common code used by 2+ chunks
              common: {
                minChunks: 2,
                priority: 5,
                reuseExistingChunk: true,
                name: 'common',
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
                  pure_funcs: ['console.log', 'console.debug'], // Remove specific functions
                },
                mangle: {
                  safari10: true,
                },
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
              parallel: true,
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

  // Babel optimizations
  babel: {
    plugins: [
      // Remove PropTypes in production
      ...(process.env.NODE_ENV === 'production'
        ? [['transform-remove-console', { exclude: ['error', 'warn'] }]]
        : []
      ),
    ],
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
