// frontend/src/utils/notificationManager.js

/**
 * 🔔 Advanced Notification Manager
 * Toast notifications, Push notifications, Permission handling
 */

class NotificationManager {
    constructor(options = {}) {
        this.maxNotifications = options.maxNotifications || 5;
        this.defaultDuration = options.defaultDuration || 5000;
        this.position = options.position || 'top-right';
        this.notifications = [];
        this.notificationId = 0;
        this.container = null;
        this.soundEnabled = options.soundEnabled !== false;

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = `notification-container notification-container--${this.position}`;
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(this.container);

        // Request permission for push notifications
        if ('Notification' in window && Notification.permission === 'default') {
            // Don't auto-request, wait for user action
        }
    }

    /**
     * Show toast notification
     */
    toast(message, options = {}) {
        const {
            type = 'info',
            duration = this.defaultDuration,
            title,
            actions = [],
            icon,
            closeButton = true,
            pauseOnHover = true,
            onClick,
            onClose
        } = options;

        const id = ++this.notificationId;
        const notification = {
            id,
            message,
            type,
            duration,
            title,
            actions,
            icon,
            closeButton,
            pauseOnHover,
            onClick,
            onClose,
            timestamp: Date.now()
        };

        // Remove oldest if max reached
        if (this.notifications.length >= this.maxNotifications) {
            this.remove(this.notifications[0].id);
        }

        this.notifications.push(notification);
        this.render(notification);

        // Auto remove
        if (duration > 0) {
            notification.timeoutId = setTimeout(() => {
                this.remove(id);
            }, duration);
        }

        // Play sound
        if (this.soundEnabled && type !== 'info') {
            this.playSound(type);
        }

        if (import.meta.env.MODE === 'development') {
        }

        return id;
    }

    /**
     * Show success notification
     */
    success(message, options = {}) {
        return this.toast(message, { ...options, type: 'success' });
    }

    /**
     * Show error notification
     */
    error(message, options = {}) {
        return this.toast(message, { ...options, type: 'error', duration: 0 });
    }

    /**
     * Show warning notification
     */
    warning(message, options = {}) {
        return this.toast(message, { ...options, type: 'warning' });
    }

    /**
     * Show info notification
     */
    info(message, options = {}) {
        return this.toast(message, { ...options, type: 'info' });
    }

    /**
     * Render notification
     */
    render(notification) {
        const element = document.createElement('div');
        element.className = `notification notification--${notification.type} notification--enter`;
        element.setAttribute('role', 'alert');
        element.dataset.notificationId = notification.id;

        // Icon
        const iconMap = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        const iconElement = notification.icon || iconMap[notification.type];

        // Build HTML
        element.innerHTML = `
      <div class="notification__icon">${iconElement}</div>
      <div class="notification__content">
        ${notification.title ? `<div class="notification__title">${notification.title}</div>` : ''}
        <div class="notification__message">${notification.message}</div>
        ${notification.actions.length > 0 ? `
          <div class="notification__actions">
            ${notification.actions.map((action, i) => `
              <button class="notification__action" data-action-index="${i}">
                ${action.label}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
      ${notification.closeButton ? '<button class="notification__close" aria-label="Close">&times;</button>' : ''}
    `;

        // Event listeners
        if (notification.onClick) {
            element.addEventListener('click', (e) => {
                if (!e.target.closest('.notification__close') && !e.target.closest('.notification__action')) {
                    notification.onClick(notification);
                }
            });
        }

        if (notification.closeButton) {
            const closeBtn = element.querySelector('.notification__close');
            closeBtn.addEventListener('click', () => this.remove(notification.id));
        }

        // Action buttons
        notification.actions.forEach((action, i) => {
            const btn = element.querySelector(`[data-action-index="${i}"]`);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    action.onClick(notification);
                    if (action.closeOnClick !== false) {
                        this.remove(notification.id);
                    }
                });
            }
        });

        // Pause on hover
        if (notification.pauseOnHover && notification.duration > 0) {
            element.addEventListener('mouseenter', () => {
                if (notification.timeoutId) {
                    clearTimeout(notification.timeoutId);
                }
            });

            element.addEventListener('mouseleave', () => {
                notification.timeoutId = setTimeout(() => {
                    this.remove(notification.id);
                }, 2000); // 2s after mouse leave
            });
        }

        this.container.appendChild(element);
        notification.element = element;

        // Trigger animation
        requestAnimationFrame(() => {
            element.classList.remove('notification--enter');
        });
    }

    /**
     * Remove notification
     */
    remove(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (!notification) return;

        // Clear timeout
        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId);
        }

        // Animate out
        if (notification.element) {
            notification.element.classList.add('notification--exit');

            setTimeout(() => {
                if (notification.element && notification.element.parentNode) {
                    notification.element.parentNode.removeChild(notification.element);
                }

                // Call onClose
                if (notification.onClose) {
                    notification.onClose(notification);
                }
            }, 300);
        }

        // Remove from array
        this.notifications = this.notifications.filter(n => n.id !== id);
    }

    /**
     * Remove all notifications
     */
    clear() {
        this.notifications.forEach(n => this.remove(n.id));
    }

    /**
     * Play notification sound
     */
    playSound(type) {
        const audio = new Audio();
        const sounds = {
            success: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZijcIF2m98OScTgwOUqjk77RgGwU7k9rx0IItBSh+zPLajjgKFmS67uugUhELSKHh8bllHAU6k9r01JEtBylz0O7v',
            error: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgYKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKC',
            warning: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAB/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/'
        };

        if (sounds[type]) {
            audio.src = sounds[type];
            audio.volume = 0.3;
            audio.play().catch(() => { }); // Ignore errors
        }
    }

    /**
     * Request push notification permission
     */
    async requestPermission() {
        if (!('Notification' in window)) {
            console.warn('Push notifications not supported');
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    /**
     * Show push notification
     */
    async push(title, options = {}) {
        if (!('Notification' in window)) {
            console.warn('Push notifications not supported');
            return;
        }

        if (Notification.permission !== 'granted') {
            const granted = await this.requestPermission();
            if (!granted) return;
        }

        const notification = new Notification(title, {
            body: options.body,
            icon: options.icon || '/logo192.png',
            badge: options.badge || '/logo192.png',
            tag: options.tag,
            data: options.data,
            requireInteraction: options.requireInteraction || false,
            silent: options.silent || false,
            vibrate: options.vibrate || [200, 100, 200]
        });

        notification.onclick = () => {
            window.focus();
            if (options.onClick) {
                options.onClick(notification);
            }
            notification.close();
        };

        if (import.meta.env.MODE === 'development') {
        }

        return notification;
    }

    /**
     * Promise-based notification
     */
    async confirm(message, options = {}) {
        return new Promise((resolve) => {
            this.toast(message, {
                ...options,
                type: options.type || 'warning',
                duration: 0,
                actions: [
                    {
                        label: options.confirmLabel || 'Confirm',
                        onClick: () => resolve(true)
                    },
                    {
                        label: options.cancelLabel || 'Cancel',
                        onClick: () => resolve(false)
                    }
                ],
                onClose: () => resolve(false)
            });
        });
    }

    /**
     * Loading notification
     */
    loading(message, options = {}) {
        return this.toast(message, {
            ...options,
            type: 'info',
            duration: 0,
            icon: '<div class="notification__spinner"></div>',
            closeButton: false
        });
    }

    /**
     * Update notification
     */
    update(id, updates) {
        const notification = this.notifications.find(n => n.id === id);
        if (!notification) return;

        Object.assign(notification, updates);

        if (notification.element) {
            this.remove(id);
            this.render(notification);
        }
    }

    /**
     * Get notification count
     */
    getCount() {
        return this.notifications.length;
    }

    /**
     * Enable/disable sounds
     */
    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
    }
}

// Global instance
export const notificationManager = new NotificationManager({
    position: 'top-right',
    maxNotifications: 5,
    defaultDuration: 5000,
    soundEnabled: true
});

// Shortcuts
export const toast = (message, options) => notificationManager.toast(message, options);
export const success = (message, options) => notificationManager.success(message, options);
export const error = (message, options) => notificationManager.error(message, options);
export const warning = (message, options) => notificationManager.warning(message, options);
export const info = (message, options) => notificationManager.info(message, options);
export const confirm = (message, options) => notificationManager.confirm(message, options);
export const loading = (message, options) => notificationManager.loading(message, options);

/**
 * React Hook
 */
export const useNotification = () => {
    const notify = React.useCallback((message, options) => {
        return notificationManager.toast(message, options);
    }, []);

    const showSuccess = React.useCallback((message, options) => {
        return notificationManager.success(message, options);
    }, []);

    const showError = React.useCallback((message, options) => {
        return notificationManager.error(message, options);
    }, []);

    const showWarning = React.useCallback((message, options) => {
        return notificationManager.warning(message, options);
    }, []);

    const showInfo = React.useCallback((message, options) => {
        return notificationManager.info(message, options);
    }, []);

    const showLoading = React.useCallback((message, options) => {
        return notificationManager.loading(message, options);
    }, []);

    const confirmDialog = React.useCallback((message, options) => {
        return notificationManager.confirm(message, options);
    }, []);

    return {
        notify,
        success: showSuccess,
        error: showError,
        warning: showWarning,
        info: showInfo,
        loading: showLoading,
        confirm: confirmDialog
    };
};

export default NotificationManager;


