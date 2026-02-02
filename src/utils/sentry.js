// frontend/src/utils/sentry.js
// 🐛 Sentry Error Tracking Integration

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Initialize Sentry
export const initSentry = () => {
    if (import.meta.env.MODE === 'production') {
        Sentry.init({
            dsn: import.meta.env.VITE_SENTRY_DSN || "https://your-sentry-dsn@sentry.io/project-id",
            integrations: [
                new BrowserTracing(),
                new Sentry.Replay({
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

        console.log('✅ Sentry initialized');
    } else {
        console.log('ℹ️ Sentry disabled in development');
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
    return Sentry.startTransaction({ name, op });
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


