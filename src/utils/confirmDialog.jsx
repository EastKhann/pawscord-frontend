/* eslint-disable jsx-a11y/no-autofocus */
// frontend/src/utils/confirmDialog.js
// 🎯 Global Promise-based Confirm Dialog
// window.confirm() yerine kullan - Styled modal gösterir
// Kullanım: const ok = await confirmDialog('Emin misiniz?');
//           const ok = await confirmDialog({ title: '...', message: '...', type: 'danger' });

import { createRoot } from 'react-dom/client';
import {
    FaExclamationTriangle,
    FaTimes,
    FaTrash,
    FaCheck,
    FaSignOutAlt,
    FaQuestionCircle,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

// -- extracted inline style constants --
const _st1 = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
};
const _st2 = {
    background: '#111214',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
    border: '1px solid #0b0e1b',
    minWidth: '320px',
    maxWidth: '500px',
};
const _st3 = { fontSize: '2em', flexShrink: 0 };
const _st4 = { margin: 0, fontSize: '1.15em', fontWeight: 600, color: '#fff' };
const _st5 = {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '6px',
    color: '#949ba4',
    cursor: 'pointer',
    padding: '8px',
};
const _st6 = { padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' };
const _st7 = { margin: 0, color: '#dbdee1', lineHeight: '1.5' };
const _st8 = {
    marginTop: '16px',
    background: 'rgba(255,255,255,0.02)',
    padding: '12px',
    borderRadius: '6px',
};
const _st9 = { color: '#f59e0b', fontWeight: 600, marginBottom: '8px' };
const _st10 = {
    display: 'flex',
    gap: '8px',
    color: '#949ba4',
    fontSize: '0.9em',
    marginBottom: '6px',
};
const _st11 = { display: 'flex', gap: '12px', justifyContent: 'flex-end', padding: '16px 24px' };
const _st12 = {
    padding: '10px 16px',
    background: 'transparent',
    color: '#b5bac1',
    border: '1px solid #404249',
    borderRadius: '6px',
    cursor: 'pointer',
};

let dialogContainer = null;

/**
 * Promise tabanlı confirm dialog
 * @param {string|object} options - Mesaj string or options objesi
 * @returns {Promise<boolean>} - User confirmdıysa true, cancel ettiyse false
 *
 * Basit kullanım:
 *   const ok = await confirmDialog('Are you sure you want to delete this message?');
 *
 * Gelişmiş kullanım:
 *   const ok = await confirmDialog({
 *     title: 'Delete Message',
 *     message: 'Bu işlem undoınamaz!',
 *     confirmText: 'Delete',
 *     cancelText: 'Cancel',
 *     type: 'danger', // 'warning' | 'danger' | 'info'
 *     details: ['Mesaj kalıcı olarak silinecek', 'Geri alınamaz']
 *   });
 */
export function confirmDialog(options) {
    return new Promise((resolve) => {
        // Options normalize
        const config = typeof options === 'string' ? { message: options } : { ...options };

        const {
            title = 'Emin misiniz?',
            message = 'Are you sure you want to perform this action?',
            confirmText = 'Evet',
            cancelText = 'Cancel',
            type = 'warning', // 'warning', 'danger', 'info'
            details = null,
        } = config;

        // Container oluştur
        if (!dialogContainer) {
            dialogContainer = document.createElement('div');
            dialogContainer.id = 'confirm-dialog-root';
            document.body.appendChild(dialogContainer);
        }

        const root = createRoot(dialogContainer);

        const cleanup = (result) => {
            root.unmount();
            resolve(result);
        };

        // Type config
        const typeConfig = {
            warning: {
                icon: <FaExclamationTriangle />,
                color: '#f59e0b',
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                btnColor: '#f59e0b',
            },
            danger: {
                icon: <FaTrash />,
                color: '#f23f42',
                gradient: 'linear-gradient(135deg, #f23f42 0%, #dc2626 100%)',
                btnColor: '#f23f42',
            },
            info: {
                icon: <FaQuestionCircle />,
                color: '#5865f2',
                gradient: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
                btnColor: '#5865f2',
            },
        };

        const tc = typeConfig[type] || typeConfig.warning;

        root.render(
            <div
                role="presentation"
                style={_st1}
                onClick={(e) => {
                    if (e.target === e.currentTarget) cleanup(false);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') cleanup(false);
                }}
            >
                <style>{`
                    @keyframes confirmFadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes confirmSlideIn { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
                    .confirm-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
                    .confirm-btn:active { transform: translateY(0); }
                `}</style>
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="confirm-dialog-title"
                    style={_st2}
                >
                    {/* Header */}
                    <div
                        style={_s({
                            background: tc.gradient,
                            padding: '20px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        })}
                    >
                        <div style={_st3}>{tc.icon}</div>
                        <h3 id="confirm-dialog-title" style={_st4}>
                            {title}
                        </h3>
                        <button
                            onClick={() => cleanup(false)}
                            style={_st5}
                            onMouseEnter={(e) =>
                                (e.target.style.background = 'rgba(255,255,255,0.25)')
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.background = 'rgba(255,255,255,0.15)')
                            }
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Body */}
                    <div style={_st6}>
                        <p style={_st7}>{message}</p>

                        {/* Details */}
                        {details && details.length > 0 && (
                            <div style={_st8}>
                                <div style={_st9}>⚠️ {t('confirmDialog.thisAction','This action:')}</div>
                                {details.map((d, i) => (
                                    <div key={`item-${i}`} style={_st10}>
                                        <span style={_s({ color: tc.color })}>•</span>
                                        <span>{d}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={_st11}>
                        <button
                            className="confirm-btn"
                            onClick={() => cleanup(false)}
                            style={_st12}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.05)';
                                e.target.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.color = '#b5bac1';
                            }}
                        >
                            {cancelText}
                        </button>
                        <button
                            className="confirm-btn"
                            onClick={() => cleanup(true)}
                            autoFocus
                            style={_s({
                                background: tc.btnColor,
                                border: 'none',
                                color: '#fff',
                                padding: '10px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 600,
                                transition: 'all 0.15s',
                                boxShadow: `0 2px 8px ${tc.btnColor}40`,
                            })}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        );
    });
}

// Global olarak kullanılabilir
if (typeof window !== 'undefined') {
    window.confirmDialog = confirmDialog;
}

export default confirmDialog;
