// frontend/src/utils/toast.js
// Modern Toast Notification System - alert() yerine kullan

let toastContainer = null;

// Escape HTML to prevent XSS
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// Toast container'ı initialize et
function initToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

/**
 * Modern toast notification gösterir
 * @param {string} message - Gösterilecek mesaj
 * @param {string} type - 'success', 'error', 'warning', 'info'
 * @param {number} duration - Milisaniye cinsinden görünme süresi (varsayılan: 3000)
 */
export function showToast(message, type = 'info', duration = 3000) {
    const container = initToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

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
            bgColor = '#ef4444';
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

    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 300px;
        max-width: 500px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        pointer-events: all;
        animation: slideIn 0.3s ease-out;
        transition: opacity 0.3s ease-out;
    `;

    toast.innerHTML = `
        <span style="font-size: 20px;">${icon}</span>
        <span style="flex: 1;">${escapeHTML(message)}</span>
        <button onclick="this.parentElement.remove()" style="
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
    `;

    container.appendChild(toast);

    // Animasyon ekle
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

    // Otomatik kaldır
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
};

// Global olarak kullanılabilir hale getir (opsiyonel)
if (typeof window !== 'undefined') {
    window.toast = toast;
    window.showToast = showToast;
}

export default toast;


