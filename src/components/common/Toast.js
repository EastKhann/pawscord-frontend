// frontend/src/components/common/Toast.js
// 🍞 ENTERPRISE-GRADE TOAST NOTIFICATION SYSTEM
// Beautiful, accessible, and customizable toast notifications

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaInfoCircle,
    FaExclamationTriangle,
    FaTimes,
    FaSpinner
} from 'react-icons/fa';

// Toast types
export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    LOADING: 'loading'
};

// Toast positions
export const TOAST_POSITIONS = {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    TOP_CENTER: 'top-center',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_CENTER: 'bottom-center'
};

// Toast Context
const ToastContext = createContext(null);

/**
 * Toast Provider Component
 */
export const ToastProvider = ({
    children,
    position = TOAST_POSITIONS.TOP_RIGHT,
    maxToasts = 5,
    defaultDuration = 4000
}) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((options) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const toast = {
            id,
            type: options.type || TOAST_TYPES.INFO,
            title: options.title,
            message: options.message,
            duration: options.duration ?? defaultDuration,
            dismissible: options.dismissible ?? true,
            action: options.action,
            icon: options.icon,
            progress: options.progress ?? true,
            createdAt: Date.now()
        };

        setToasts(prev => {
            const newToasts = [...prev, toast];
            // Remove oldest if exceeding max
            if (newToasts.length > maxToasts) {
                return newToasts.slice(-maxToasts);
            }
            return newToasts;
        });

        return id;
    }, [defaultDuration, maxToasts]);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const updateToast = useCallback((id, updates) => {
        setToasts(prev => prev.map(t =>
            t.id === id ? { ...t, ...updates } : t
        ));
    }, []);

    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);

    // Convenience methods
    const success = useCallback((message, options = {}) => {
        return addToast({ ...options, message, type: TOAST_TYPES.SUCCESS });
    }, [addToast]);

    const error = useCallback((message, options = {}) => {
        return addToast({ ...options, message, type: TOAST_TYPES.ERROR, duration: options.duration ?? 6000 });
    }, [addToast]);

    const warning = useCallback((message, options = {}) => {
        return addToast({ ...options, message, type: TOAST_TYPES.WARNING });
    }, [addToast]);

    const info = useCallback((message, options = {}) => {
        return addToast({ ...options, message, type: TOAST_TYPES.INFO });
    }, [addToast]);

    const loading = useCallback((message, options = {}) => {
        return addToast({
            ...options,
            message,
            type: TOAST_TYPES.LOADING,
            duration: 0, // Don't auto-dismiss loading toasts
            dismissible: false,
            progress: false
        });
    }, [addToast]);

    const promise = useCallback(async (promiseFn, options = {}) => {
        const id = loading(options.loading || 'İşlem yapılıyor...');

        try {
            const result = await promiseFn();
            updateToast(id, {
                type: TOAST_TYPES.SUCCESS,
                message: options.success || 'İşlem başarılı!',
                duration: defaultDuration,
                dismissible: true,
                progress: true
            });
            return result;
        } catch (err) {
            updateToast(id, {
                type: TOAST_TYPES.ERROR,
                message: options.error || err.message || 'Bir hata oluştu',
                duration: 6000,
                dismissible: true,
                progress: true
            });
            throw err;
        }
    }, [loading, updateToast, defaultDuration]);

    const value = {
        toasts,
        addToast,
        removeToast,
        updateToast,
        clearAll,
        success,
        error,
        warning,
        info,
        loading,
        promise
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} position={position} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

/**
 * Toast Container Component
 */
const ToastContainer = ({ toasts, position, removeToast }) => {
    const positionStyles = getPositionStyles(position);

    return ReactDOM.createPortal(
        <div style={{ ...styles.container, ...positionStyles }}>
            {toasts.map((toast, index) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    index={index}
                    onDismiss={() => removeToast(toast.id)}
                />
            ))}
        </div>,
        document.body
    );
};

/**
 * Individual Toast Component
 */
const Toast = ({
    id,
    type,
    title,
    message,
    duration,
    dismissible,
    action,
    icon,
    progress,
    onDismiss,
    index
}) => {
    const [isExiting, setIsExiting] = useState(false);
    const [progressWidth, setProgressWidth] = useState(100);

    useEffect(() => {
        if (duration > 0) {
            // Progress bar animation
            if (progress) {
                const startTime = Date.now();
                const interval = setInterval(() => {
                    const elapsed = Date.now() - startTime;
                    const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
                    setProgressWidth(remaining);
                    if (remaining <= 0) clearInterval(interval);
                }, 50);

                return () => clearInterval(interval);
            }

            // Auto dismiss
            const timer = setTimeout(() => {
                handleDismiss();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, progress]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            onDismiss();
        }, 200);
    };

    const Icon = icon || getDefaultIcon(type);
    const colors = getTypeColors(type);

    return (
        <div
            style={{
                ...styles.toast,
                ...colors.background,
                transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
                opacity: isExiting ? 0 : 1,
                animationDelay: `${index * 50}ms`
            }}
            role="alert"
            aria-live="polite"
        >
            {/* Icon */}
            <div style={{ ...styles.iconWrapper, color: colors.icon }}>
                {type === TOAST_TYPES.LOADING ? (
                    <FaSpinner className="spin" size={20} />
                ) : (
                    <Icon size={20} />
                )}
            </div>

            {/* Content */}
            <div style={styles.content}>
                {title && <div style={styles.title}>{title}</div>}
                <div style={styles.message}>{message}</div>
                {action && (
                    <button
                        style={{ ...styles.actionButton, color: colors.icon }}
                        onClick={action.onClick}
                    >
                        {action.label}
                    </button>
                )}
            </div>

            {/* Dismiss Button */}
            {dismissible && (
                <button
                    style={styles.dismissButton}
                    onClick={handleDismiss}
                    aria-label="Kapat"
                >
                    <FaTimes size={14} />
                </button>
            )}

            {/* Progress Bar */}
            {progress && duration > 0 && (
                <div style={styles.progressContainer}>
                    <div
                        style={{
                            ...styles.progressBar,
                            width: `${progressWidth}%`,
                            backgroundColor: colors.icon
                        }}
                    />
                </div>
            )}
        </div>
    );
};

/**
 * Hook to use toast
 */
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// Helper functions
function getDefaultIcon(type) {
    switch (type) {
        case TOAST_TYPES.SUCCESS:
            return FaCheckCircle;
        case TOAST_TYPES.ERROR:
            return FaExclamationCircle;
        case TOAST_TYPES.WARNING:
            return FaExclamationTriangle;
        case TOAST_TYPES.INFO:
        default:
            return FaInfoCircle;
    }
}

function getTypeColors(type) {
    switch (type) {
        case TOAST_TYPES.SUCCESS:
            return {
                background: { backgroundColor: '#1a3d28' },
                icon: '#43b581'
            };
        case TOAST_TYPES.ERROR:
            return {
                background: { backgroundColor: '#3d1a1a' },
                icon: '#f04747'
            };
        case TOAST_TYPES.WARNING:
            return {
                background: { backgroundColor: '#3d3a1a' },
                icon: '#faa61a'
            };
        case TOAST_TYPES.LOADING:
            return {
                background: { backgroundColor: '#1a2d3d' },
                icon: '#5865f2'
            };
        case TOAST_TYPES.INFO:
        default:
            return {
                background: { backgroundColor: '#1a2d3d' },
                icon: '#5865f2'
            };
    }
}

function getPositionStyles(position) {
    const base = { position: 'fixed', zIndex: 99999 };

    switch (position) {
        case TOAST_POSITIONS.TOP_LEFT:
            return { ...base, top: '20px', left: '20px' };
        case TOAST_POSITIONS.TOP_CENTER:
            return { ...base, top: '20px', left: '50%', transform: 'translateX(-50%)' };
        case TOAST_POSITIONS.BOTTOM_RIGHT:
            return { ...base, bottom: '20px', right: '20px' };
        case TOAST_POSITIONS.BOTTOM_LEFT:
            return { ...base, bottom: '20px', left: '20px' };
        case TOAST_POSITIONS.BOTTOM_CENTER:
            return { ...base, bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
        case TOAST_POSITIONS.TOP_RIGHT:
        default:
            return { ...base, top: '20px', right: '20px' };
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        width: '100%',
        pointerEvents: 'none'
    },
    toast: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        pointerEvents: 'all',
        animation: 'slideIn 0.2s ease-out',
        transition: 'transform 0.2s, opacity 0.2s',
        position: 'relative',
        overflow: 'hidden'
    },
    iconWrapper: {
        flexShrink: 0,
        marginRight: '12px',
        marginTop: '2px'
    },
    content: {
        flex: 1,
        minWidth: 0
    },
    title: {
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '4px'
    },
    message: {
        color: '#b5bac1',
        fontSize: '14px',
        lineHeight: '1.4',
        wordWrap: 'break-word'
    },
    actionButton: {
        background: 'none',
        border: 'none',
        padding: '0',
        marginTop: '8px',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    dismissButton: {
        background: 'none',
        border: 'none',
        padding: '4px',
        marginLeft: '8px',
        color: '#b5bac1',
        cursor: 'pointer',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s'
    },
    progressContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    progressBar: {
        height: '100%',
        transition: 'width 0.05s linear'
    }
};

// Add keyframes for animation
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(styleSheet);
}

export default Toast;
