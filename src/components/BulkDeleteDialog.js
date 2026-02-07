// frontend/src/components/BulkDeleteDialog.js
// 🔥 FEATURE 45: Bulk delete confirmation dialog
// Confirmation dialog for bulk message deletion with count preview

import React, { useState, memo, useCallback } from 'react';
import { FaTrash, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const BulkDeleteDialog = ({ messageCount = 0, channelName, onConfirm, onCancel }) => {
    const [confirmText, setConfirmText] = useState('');
    const requiredText = 'sil';
    const isConfirmed = confirmText.toLowerCase() === requiredText;

    const handleConfirm = useCallback(() => {
        if (isConfirmed) {
            onConfirm?.();
        }
    }, [isConfirmed, onConfirm]);

    return (
        <div style={S.overlay} onClick={onCancel}>
            <div style={S.dialog} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={S.header}>
                    <FaExclamationTriangle style={{ fontSize: 20, color: '#fee75c' }} />
                    <h3 style={S.title}>Toplu Mesaj Silme</h3>
                    <button type="button" style={S.closeBtn} onClick={onCancel}>
                        <FaTimes />
                    </button>
                </div>

                {/* Warning */}
                <div style={S.warning}>
                    <FaTrash style={{ fontSize: 16, color: '#ed4245' }} />
                    <div>
                        <p style={S.warningText}>
                            <strong>{messageCount}</strong> mesajı <strong>#{channelName || 'kanal'}</strong> kanalından kalıcı olarak silmek üzeresiniz.
                        </p>
                        <p style={S.warningHint}>
                            Bu işlem geri alınamaz!
                        </p>
                    </div>
                </div>

                {/* Confirmation Input */}
                <div style={S.confirmSection}>
                    <label style={S.label}>
                        Onaylamak için <strong style={{ color: '#f2f3f5' }}>"sil"</strong> yazın
                    </label>
                    <input
                        type="text"
                        value={confirmText}
                        onChange={e => setConfirmText(e.target.value)}
                        placeholder='sil'
                        style={S.input}
                        autoFocus
                        onKeyDown={e => {
                            if (e.key === 'Enter' && isConfirmed) handleConfirm();
                            if (e.key === 'Escape') onCancel?.();
                        }}
                    />
                </div>

                {/* Actions */}
                <div style={S.actions}>
                    <button type="button" style={S.cancelBtn} onClick={onCancel}>
                        İptal
                    </button>
                    <button
                        type="button"
                        style={{
                            ...S.deleteBtn,
                            opacity: isConfirmed ? 1 : 0.5,
                            cursor: isConfirmed ? 'pointer' : 'not-allowed',
                        }}
                        onClick={handleConfirm}
                        disabled={!isConfirmed}
                    >
                        <FaTrash /> {messageCount} Mesajı Sil
                    </button>
                </div>
            </div>
        </div>
    );
};

const S = {
    overlay: {
        position: 'fixed', inset: 0, zIndex: 10000,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    dialog: {
        backgroundColor: '#313338', borderRadius: 8, width: 440,
        padding: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    },
    header: {
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    title: {
        fontSize: 18, fontWeight: 700, color: '#f2f3f5', margin: 0, flex: 1,
    },
    closeBtn: {
        width: 28, height: 28, borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', background: 'transparent',
        color: '#b5bac1', cursor: 'pointer', fontSize: 16,
    },
    warning: {
        display: 'flex', gap: 12, padding: '16px 20px',
        backgroundColor: 'rgba(237,66,69,0.1)',
        margin: '16px 20px 0', borderRadius: 8,
    },
    warningText: {
        fontSize: 14, color: '#dcddde', margin: 0, lineHeight: 1.5,
    },
    warningHint: {
        fontSize: 12, color: '#ed4245', margin: '4px 0 0', fontWeight: 600,
    },
    confirmSection: {
        padding: '16px 20px',
    },
    label: {
        display: 'block', fontSize: 13, color: '#b5bac1', marginBottom: 8,
    },
    input: {
        width: '100%', padding: '10px 12px',
        backgroundColor: '#1e1f22', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 4, color: '#dcddde', fontSize: 14,
        outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
    },
    actions: {
        display: 'flex', justifyContent: 'flex-end', gap: 8,
        padding: '16px 20px', backgroundColor: '#2b2d31',
        borderRadius: '0 0 8px 8px',
    },
    cancelBtn: {
        padding: '8px 20px', borderRadius: 4,
        border: 'none', background: 'transparent',
        color: '#dcddde', fontSize: 14, cursor: 'pointer',
    },
    deleteBtn: {
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 20px', borderRadius: 4,
        border: 'none', backgroundColor: '#ed4245',
        color: '#fff', fontSize: 14, fontWeight: 500,
        transition: 'opacity 0.15s',
    },
};

export default memo(BulkDeleteDialog);
