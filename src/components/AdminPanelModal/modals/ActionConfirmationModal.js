import React, { useCallback } from 'react';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';

const ActionConfirmationModal = ({ actionModal, handleUserAction, setActionModal, setSelectedUser }) => {
    const onClose = useCallback(() => setActionModal(null), [setActionModal]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Action Confirmation' });
    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 10
        }} {...overlayProps}>
            <div style={{
                backgroundColor: '#1a1a1e', borderRadius: '12px',
                padding: '24px', width: '420px', border: '1px solid #2a2a2e'
            }} {...dialogProps}>
                <h3 style={{ color: actionModal.type === 'delete' ? '#dc2626' : '#f0b132', marginTop: 0 }}>
                    {actionModal.type === 'delete' ? '🗑️ Kullanıcıyı Sil' :
                        actionModal.type === 'ban' ? '⛔ Kullanıcıyı Yasakla' :
                            '⚠️ İşlem Onayla'}
                </h3>
                <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                    <strong style={{ color: '#fff' }}>{actionModal.user?.username}</strong>
                    {actionModal.type === 'delete'
                        ? ' kullanıcısını kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz! Tüm mesajları, sunucu üyelikleri ve profili silinecektir.'
                        : actionModal.type === 'ban'
                            ? ' kullanıcısını yasaklamak istediğinizden emin misiniz? Kullanıcı giriş yapamayacaktır.'
                            : ' üzerinde bu işlemi yapmak istediğinizden emin misiniz?'
                    }
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <button
                        style={styles.actionBtn(actionModal.type === 'delete' ? '#dc2626' : '#e74c3c')}
                        onClick={() => {
                            handleUserAction(actionModal.type, actionModal.user?.id);
                            setSelectedUser(null);
                        }}
                    >
                        {actionModal.type === 'delete' ? '🗑️ Kalıcı Olarak Sil' : 'Onayla'}
                    </button>
                    <button style={styles.actionBtn('#6b7280')} onClick={() => setActionModal(null)}>
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionConfirmationModal;
