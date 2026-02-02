// frontend/webpack-bundle-analyzer.config.js

/**
 * 📊 Webpack Bundle Analyzer Configuration
 * Bundle size görselleştirme
 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = {
    webpack: {
        plugins: {
            add: [
                new BundleAnalyzerPlugin({
                    analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
                    analyzerHost: 'localhost',
                    analyzerPort: 8888,
                    reportFilename: path.resolve(__dirname, 'bundle-report.html'),
                    defaultSizes: 'gzip',
                    openAnalyzer: true,
                    generateStatsFile: true,
                    statsFilename: path.resolve(__dirname, 'bundle-stats.json'),
                    statsOptions: {
                        source: false,
                        reasons: true,
                        optimizationBailout: true,
                        usedExports: true,
                        providedExports: true
                    },
                    logLevel: 'info'
                })
            ]
        },
        configure: (webpackConfig) => {
            // Performance hints
            webpackConfig.performance = {
                hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
                maxEntrypointSize: 512000, // 500 KB
                maxAssetSize: 512000
            };

            // Tree shaking
            webpackConfig.optimization = {
                ...webpackConfig.optimization,
                usedExports: true,
                sideEffects: false,

                // Code splitting
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        // Vendor chunks
                        defaultVendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            reuseExistingChunk: true,
                            name(module) {
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1];
                                return `vendor.${packageName.replace('@', '')}`;
                            }
                        },

                        // React framework
                        react: {
                            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                            name: 'react-framework',
                            priority: 20
                        },

                        // Common code
                        common: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                            name: 'common'
                        },

                        // Utilities
                        utils: {
                            test: /[\\/]src[\\/]utils[\\/]/,
                            name: 'utils',
                            priority: 10
                        },

                        // Components
                        components: {
                            test: /[\\/]src[\\/]components[\\/]/,
                            name: 'components',
                            priority: 5,
                            minSize: 30000
                        }
                    }
                },

                // Runtime chunk
                runtimeChunk: {
                    name: 'runtime'
                }
            };

            // Minimize options
            if (process.env.NODE_ENV === 'production') {
                const TerserPlugin = require('terser-webpack-plugin');

                webpackConfig.optimization.minimizer = [
                    new TerserPlugin({
                        terserOptions: {
                            parse: {
                                ecma: 8
                            },
                            compress: {
                                ecma: 5,
                                warnings: false,
                                comparisons: false,
                                inline: 2,
                                drop_console: true, // Remove console.log in production
                                drop_debugger: true,
                                pure_funcs: ['console.log', 'console.info', 'console.debug']
                            },
                            mangle: {
                                safari10: true
                            },
                            output: {
                                ecma: 5,
                                comments: false,
                                ascii_only: true
                            }
                        },
                        parallel: true,
                        extractComments: false
                    })
                ];
            }

            // Module concatenation (scope hoisting)
            webpackConfig.optimization.concatenateModules = true;

            return webpackConfig;
        }
    }
};
