// frontend/src/utils/confirmDialog.js
// 🎯 Global Promise-based Confirm Dialog
// window.confirm() yerine kullan - Styled modal gösterir
// Kullanım: const ok = await confirmDialog('Emin misiniz?');
//           const ok = await confirmDialog({ title: '...', message: '...', type: 'danger' });

import { createRoot } from 'react-dom/client';
import { FaExclamationTriangle, FaTimes, FaTrash, FaCheck, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';

let dialogContainer = null;

/**
 * Promise tabanlı confirm dialog
 * @param {string|object} options - Mesaj string veya options objesi
 * @returns {Promise<boolean>} - Kullanıcı onayladıysa true, iptal ettiyse false
 * 
 * Basit kullanım:
 *   const ok = await confirmDialog('Bu mesajı silmek istediğinize emin misiniz?');
 * 
 * Gelişmiş kullanım:
 *   const ok = await confirmDialog({
 *     title: 'Mesajı Sil',
 *     message: 'Bu işlem geri alınamaz!',
 *     confirmText: 'Sil',
 *     cancelText: 'Vazgeç',
 *     type: 'danger', // 'warning' | 'danger' | 'info'
 *     details: ['Mesaj kalıcı olarak silinecek', 'Geri alınamaz']
 *   });
 */
export function confirmDialog(options) {
    return new Promise((resolve) => {
        // Options normalize
        const config = typeof options === 'string'
            ? { message: options }
            : { ...options };

        const {
            title = 'Emin misiniz?',
            message = 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?',
            confirmText = 'Evet',
            cancelText = 'Vazgeç',
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
                color: '#ef4444',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                btnColor: '#ef4444',
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
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 100000,
                    animation: 'confirmFadeIn 0.2s ease-out',
                    backdropFilter: 'blur(4px)',
                }}
                onClick={(e) => { if (e.target === e.currentTarget) cleanup(false); }}
            >
                <style>{`
                    @keyframes confirmFadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes confirmSlideIn { from { transform: scale(0.9) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
                    .confirm-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
                    .confirm-btn:active { transform: translateY(0); }
                `}</style>
                <div style={{
                    background: '#2b2d31',
                    borderRadius: '16px',
                    width: '420px',
                    maxWidth: '90vw',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                    overflow: 'hidden',
                    animation: 'confirmSlideIn 0.25s ease-out',
                }}>
                    {/* Header */}
                    <div style={{
                        background: tc.gradient,
                        padding: '20px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px',
                            background: 'rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '18px', color: '#fff', flexShrink: 0,
                        }}>
                            {tc.icon}
                        </div>
                        <h3 style={{
                            margin: 0, color: '#fff', fontSize: '16px',
                            fontWeight: 600, flex: 1,
                        }}>
                            {title}
                        </h3>
                        <button
                            onClick={() => cleanup(false)}
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                border: 'none', color: '#fff',
                                width: '32px', height: '32px', borderRadius: '8px',
                                cursor: 'pointer', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: '14px', flexShrink: 0,
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '20px 24px' }}>
                        <p style={{
                            color: '#dbdee1', fontSize: '14px',
                            lineHeight: '1.6', margin: '0 0 16px 0',
                            whiteSpace: 'pre-line',
                        }}>
                            {message}
                        </p>

                        {/* Details */}
                        {details && details.length > 0 && (
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '10px',
                                padding: '12px 16px',
                                marginBottom: '16px',
                            }}>
                                <div style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                                    ⚠️ Bu işlem:
                                </div>
                                {details.map((d, i) => (
                                    <div key={i} style={{
                                        color: '#b5bac1', fontSize: '13px',
                                        padding: '3px 0', display: 'flex', gap: '8px',
                                    }}>
                                        <span style={{ color: tc.color }}>•</span>
                                        <span>{d}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: '16px 24px',
                        background: 'rgba(0,0,0,0.15)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '10px',
                    }}>
                        <button
                            className="confirm-btn"
                            onClick={() => cleanup(false)}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#b5bac1',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#b5bac1'; }}
                        >
                            {cancelText}
                        </button>
                        <button
                            className="confirm-btn"
                            onClick={() => cleanup(true)}
                            autoFocus
                            style={{
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
                            }}
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
