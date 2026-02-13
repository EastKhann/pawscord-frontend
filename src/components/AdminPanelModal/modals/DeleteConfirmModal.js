import React from 'react';
import styles from '../styles';

const DeleteConfirmModal = ({ deleteConfirm, handleServerDelete, setDeleteConfirm }) => {
    return (
        <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
                                justifyContent: 'center', alignItems: 'center', zIndex: 20
                            }} onClick={() => setDeleteConfirm(null)}>
                                <div style={{
                                    backgroundColor: '#1a1a1e', borderRadius: '12px',
                                    padding: '24px', width: '400px', border: '1px solid #e74c3c40'
                                }} onClick={e => e.stopPropagation()}>
                                    <h3 style={{ color: '#e74c3c', marginTop: 0 }}>⚠️ Silme Onayı</h3>
                                    <p style={{ color: '#9ca3af' }}>
                                        <strong style={{ color: '#fff' }}>"{deleteConfirm.name}"</strong> silmek istediğinizden emin misiniz?
                                        <br /><span style={{ color: '#e74c3c', fontSize: '12px' }}>Bu işlem geri alınamaz!</span>
                                    </p>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                        <button style={{ ...styles.actionBtn('#e74c3c'), padding: '10px 20px' }}
                                            onClick={() => {
                                                if (deleteConfirm.type === 'server') handleServerDelete(deleteConfirm.id, deleteConfirm.name);
                                            }}>
                                            🗑️ Sil
                                        </button>
                                        <button style={{ ...styles.actionBtn('#6b7280'), padding: '10px 20px' }} onClick={() => setDeleteConfirm(null)}>
                                            İptal
                                        </button>
                                    </div>
                                </div>
                            </div>
    );
};

export default DeleteConfirmModal;
