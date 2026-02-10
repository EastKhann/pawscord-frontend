// frontend/src/utils/sentry.js
// 🐛 Sentry Error Tracking Integration (v8+)

import * as Sentry from "@sentry/react";

// Initialize Sentry
export const initSentry = () => {
    const dsn = import.meta.env.VITE_SENTRY_DSN;

    // Skip if no DSN or placeholder DSN
    if (!dsn || dsn.includes('your-sentry-dsn')) {
        return;
    }

    if (import.meta.env.MODE === 'production') {
        Sentry.init({
            dsn,
            integrations: [
                Sentry.browserTracingIntegration(),
                Sentry.replayIntegration({
                    maskAllText: true,
                    blockAllMedia: true,
                }),
            ],

            // Performance Monitoring
            tracesSampleRate: 0.1, // 10% of transactions

            // Session Replay
            replaysSessionSampleRate: 0.1, // 10% of sessions
            replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

            // Environment
            environment: import.meta.env.VITE_ENV || 'production',

            // Release tracking
            release: import.meta.env.VITE_VERSION || '1.1.134',

            // Ignore certain errors
            ignoreErrors: [
                // Random plugins/extensions
                'top.GLOBALS',
                // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
                'originalCreateNotification',
                'canvas.contentDocument',
                'MyApp_RemoveAllHighlights',
                // Facebook blocked
                'fb_xd_fragment',
                // Chrome extensions
                'chrome-extension://',
                'moz-extension://',
            ],

            // Before send hook (filter sensitive data)
            beforeSend(event, hint) {
                // Don't send events in development
                if (import.meta.env.MODE !== 'production') {
                    return null;
                }

                // Filter out sensitive user data
                if (event.request) {
                    delete event.request.cookies;
                    delete event.request.headers;
                }

                // Remove sensitive tags
                if (event.tags) {
                    delete event.tags.password;
                    delete event.tags.token;
                }

                return event;
            },
        });

    } else {
    }
};

// Set user context
export const setSentryUser = (user) => {
    if (user) {
        Sentry.setUser({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    } else {
        Sentry.setUser(null);
    }
};

// Capture custom error
export const captureError = (error, context = {}) => {
    Sentry.captureException(error, {
        contexts: context,
    });
};

// Capture custom message
export const captureMessage = (message, level = 'info') => {
    Sentry.captureMessage(message, level);
};

// Add breadcrumb
export const addBreadcrumb = (message, category = 'custom', data = {}) => {
    Sentry.addBreadcrumb({
        message,
        category,
        level: 'info',
        data,
    });
};

// Track page views
export const trackPageView = (pageName) => {
    addBreadcrumb(`Page view: ${pageName}`, 'navigation');
};

// Track user actions
export const trackAction = (action, data = {}) => {
    addBreadcrumb(action, 'user-action', data);
};

// Performance tracking
export const startTransaction = (name, op = 'custom') => {
    return Sentry.startSpan({ name, op }, () => { });
};

export default {
    initSentry,
    setSentryUser,
    captureError,
    captureMessage,
    addBreadcrumb,
    trackPageView,
    trackAction,
    startTransaction,
};


