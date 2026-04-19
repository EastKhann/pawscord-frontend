import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCog, FaEdit, FaTrash } from '../utils/iconOptimization';
import { styles } from '../styles/SidebarStyles';
import useModalA11y from '../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --
const _st1 = { fontSize: '1.1em', fontWeight: 600, color: '#fff', marginBottom: '12px' };
const _st2 = { display: 'flex', flexDirection: 'column', gap: '8px' };
const _st3 = {
    width: '100%',
    padding: '10px 12px',
    background: '#2c2f33',
    color: '#dbdee1',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};
const _st4 = {
    width: '100%',
    padding: '10px 12px',
    background: 'rgba(240,71,71,0.15)',
    color: '#f04747',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};
const _st5 = {
    width: '100%',
    padding: '10px 12px',
    background: 'transparent',
    color: '#949ba4',
    border: '1px solid #404249',
    borderRadius: '4px',
    cursor: 'pointer',
};
const _st1083 = {
    background: '#111214',
    borderRadius: '8px',
    padding: '20px',
    minWidth: '300px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
};

const ActionMenuModal = ({ actionMenu, onClose, onRename, onDelete, onSettings }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: !!actionMenu,
        label: 'Channel Menu',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    if (!actionMenu) return null;

    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={_st1083} {...dialogProps}>
                <h4 style={_st1}>{actionMenu.name}</h4>

                <div style={_st2}>
                    {actionMenu.type === 'room' && (
                        <button aria-label="on Settings" onClick={onSettings} style={_st3}>
                            <FaCog /> Channel Settings
                        </button>
                    )}

                    <button aria-label="on Rename" onClick={onRename} style={_st3}>
                        <FaEdit /> Rename
                    </button>

                    <button aria-label="on Delete" onClick={onDelete} style={_st4}>
                        <FaTrash /> Sil
                    </button>
                </div>
                <button aria-label="on Close" style={_st5} onClick={onClose}>
                    {t('common.cancel')}
                </button>
            </div>
        </div>
    );
};

ActionMenuModal.propTypes = {
    actionMenu: PropTypes.func,
    onClose: PropTypes.func,
    onRename: PropTypes.func,
    onDelete: PropTypes.func,
    onSettings: PropTypes.func,
};
export default ActionMenuModal;
