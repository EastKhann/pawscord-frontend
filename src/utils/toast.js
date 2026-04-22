// frontend/src/utils/toast.js
// Modern Toast Notification System - alert() yerine kullan
import i18n from '../i18n';

let toastContainer = null;

// Escape HTML to prevent XSS
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Toast container'ı initialize et
function initToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.setAttribute('role', 'status');
        toastContainer.setAttribute('aria-live', 'polite');
        toastContainer.setAttribute('aria-atomic', 'false');
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            top: auto;
            z-index: 999999;
            display: flex;
            flex-direction: column-reverse;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

/**
 * Modern toast notification gösterir
 * @param {string} message - Gösterilecek message
 * @param {string} type - 'success', 'error', 'warning', 'info'
 * @param {number} duration - Milisaniye cinsinden görünme süresi (varsailan: 3000)
 * @param {string} priority - 'silent' | 'normal' | 'urgent'  (varsayılan: 'normal')
 */
export function showToast(message, type = 'info', duration = 3000, priority = 'normal') {
    const container = initToastContainer();

    // Priority-based duration overrides
    if (priority === 'silent' && duration === 3000) duration = 2000;
    if (priority === 'urgent' && duration === 3000) duration = 5000;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-priority-${priority}`;

    // Error/urgent toasts get role="alert" for immediate screen reader announcement
    if (type === 'error' || priority === 'urgent') {
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
    }

    // Icon seç
    let icon = 'ℹ️';
    let bgColor = '#3b82f6';

    switch (type) {
        case 'success':
            icon = '✅';
            bgColor = '#10b981';
            break;
        case 'error':
            icon = '❌';
            bgColor = '#f23f42';
            break;
        case 'warning':
            icon = '⚠️';
            bgColor = '#f59e0b';
            break;
        case 'info':
            icon = 'ℹ️';
            bgColor = '#3b82f6';
            break;
    }

    // Priority-based style overrides
    const priorityStyles = {
        silent: `opacity: 0.72; font-size: 12px; padding: 8px 14px; min-width: 220px; max-width: 380px;`,
        normal: `opacity: 1; font-size: 14px; padding: 12px 20px; min-width: 300px; max-width: 500px;`,
        urgent: `opacity: 1; font-size: 15px; padding: 14px 22px; min-width: 320px; max-width: 520px; border: 2px solid rgba(255,255,255,0.4); animation: slideIn 0.3s ease-out, toastUrgentPulse 1.5s ease-in-out 0.3s infinite;`,
    };
    const pStyle = priorityStyles[priority] || priorityStyles.normal;

    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        ${pStyle}
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        pointer-events: all;
        ${priority !== 'urgent' ? 'animation: slideIn 0.3s ease-out;' : ''}
        transition: opacity 0.3s ease-out;
    `;

    toast.innerHTML = `
        <span style="font-size: 20px;" role="img" aria-hidden="true">${icon}</span>
        <span style="flex: 1;">${escapeHTML(message)}</span>
        <button onclick="this.parentElement.remove()" aria-label="${i18n.t('toast.dismiss', { defaultValue: 'Dismiss notification' })}" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; flex-shrink: 0;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
    `;

    container.appendChild(toast);

    // Animasyon add
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    if (!document.getElementById('toast-styles')) {
        style.id = 'toast-styles';
        document.head.appendChild(style);
    }

    // Auto kaldır
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Kısa yollar
export const toast = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration),
    // Priority tabanlı kısa yollar
    silent: (message, type = 'info') => showToast(message, type, 2000, 'silent'),
    urgent: (message, type = 'error') => showToast(message, type, 5000, 'urgent'),
};

// Global olarak kullanılabilir hale getir (opsiyonel)
if (typeof window !== 'undefined') {
    window.toast = toast;
    window.showToast = showToast;
}

export default toast;
