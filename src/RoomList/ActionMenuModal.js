import React from 'react';
import { FaCog, FaEdit, FaTrash } from '../utils/iconOptimization';
import { styles } from '../SidebarStyles';
import useModalA11y from '../hooks/useModalA11y';

const ActionMenuModal = ({ actionMenu, onClose, onRename, onDelete, onSettings }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: !!actionMenu, label: 'Kanal Menüsü' });
    if (!actionMenu) return null;

    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={{ ...styles.selectionModalContent, width: '250px' }} {...dialogProps}>
                <h4 style={{ color: 'white', marginTop: 0, borderBottom: '1px solid #4f545c', paddingBottom: 10 }}>{actionMenu.name}</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {actionMenu.type === 'room' && (
                        <button
                            onClick={onSettings}
                            style={{ backgroundColor: '#5865f2', color: 'white', border: 'none', padding: '10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                        >
                            <FaCog /> Kanal Ayarları
                        </button>
                    )}

                    <button
                        onClick={onRename}
                        style={{ backgroundColor: '#5865f2', color: 'white', border: 'none', padding: '10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                        <FaEdit /> Yeniden Adlandır
                    </button>

                    <button
                        onClick={onDelete}
                        style={{ backgroundColor: '#da373c', color: 'white', border: 'none', padding: '10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                        <FaTrash /> Sil
                    </button>
                </div>
                <button style={{ marginTop: 15, background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', width: '100%' }} onClick={onClose}>İptal</button>
            </div>
        </div>
    );
};

export default ActionMenuModal;
