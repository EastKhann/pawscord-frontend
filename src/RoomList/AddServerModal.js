import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { FaServer, FaUserFriends, FaTimes, FaCompass } from '../utils/iconOptimization';
import { styles } from '../styles/SidebarStyles';
import useModalA11y from '../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --
const _st1 = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
};
const _st2 = { color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 };
const _st3 = {};
const _st4 = { color: '#b5bac1', fontSize: '14px', marginBottom: '12px' };
const _st5 = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '10px',
    marginBottom: '12px',
};
const _st6 = { width: '16px', height: '16px', cursor: 'pointer' };
const _st7 = { color: '#b5bac1', fontSize: '14px', cursor: 'pointer' };
const _st8 = {};
const _st9 = {};
const _st1084 = {};
const _st1085 = {};
const _st1086 = {};

const AddServerModal = ({ isOpen, onClose, onCreateServer, onFriendsClick, onDiscoverClick }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen, label: t('server.addServer', 'Add Server') });
    const [isCreatingServer, setIsCreatingServer] = useState(false);
    const [newServerName, setNewServerName] = useState('');
    const [isNewServerPublic, setIsNewServerPublic] = useState(false);

    // Reset form state when the modal is closed externally (e.g. Escape key)
    React.useEffect(() => {
        if (!isOpen) {
            setIsCreatingServer(false);
            setNewServerName('');
            setIsNewServerPublic(false);
        }
    }, [isOpen]);

    const handleCreateServer = async (e) => {
        e?.preventDefault();
        if (!newServerName.trim()) return;
        await onCreateServer(newServerName, isNewServerPublic);
        setNewServerName('');
        setIsNewServerPublic(false);
        setIsCreatingServer(false);
        onClose();
    };

    if (!isOpen && !isCreatingServer) return null;

    // Server creation form
    if (isCreatingServer) {
        return createPortal(
            <div style={styles.modalOverlay}>
                <style>{`@keyframes sideFadeIn { from{opacity:0} to{opacity:1} }`}</style>
                <form onSubmit={handleCreateServer} style={styles.addCategoryForm}>
                    <div style={_st1}>
                        <h3 style={_st2}>{t('server.createServer', 'Create Server')}</h3>
                        <button
                            type="button"
                            aria-label={t('common.close')}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                color: 'inherit',
                            }}
                            onClick={() => {
                                setIsCreatingServer(false);
                                onClose();
                            }}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <p style={_st4}>{t('server.giveServerName', 'Give your server a name.')}</p>
                    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                    <input
                        autoFocus
                        placeholder={t('server.serverNamePlaceholder', 'Sunucu Adı...')}
                        aria-label={t('server.serverName', 'Sunucu adı')}
                        value={newServerName}
                        onChange={(e) => setNewServerName(e.target.value)}
                        style={styles.addRoomInput}
                    />

                    <div style={_st5}>
                        <input
                            type="checkbox"
                            id="publicCheck"
                            checked={isNewServerPublic}
                            onChange={(e) => setIsNewServerPublic(e.target.checked)}
                            style={_st6}
                        />
                        <label htmlFor="publicCheck" style={_st7}>
                            {t('server.publicVisible', 'Public (Visible in Discovery)')}
                        </label>
                    </div>
                    <button
                        aria-label={t('common.create', 'Create')}
                        type="submit"
                        style={styles.addRoomButton}
                    >
                        {t('common.create', 'Create')}
                    </button>
                </form>
            </div>,
            document.body
        );
    }

    // Selection menu
    return createPortal(
        <div style={styles.modalOverlay} {...overlayProps}>
            <style>{`@keyframes sideFadeIn { from{opacity:0} to{opacity:1} }`}</style>
            <div style={styles.selectionModalContent} {...dialogProps}>
                <h3
                    style={{
                        color: 'white',
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '700',
                        textAlign: 'center',
                    }}
                >
                    {t('server.whatToDo', 'What would you like to do?')}
                </h3>
                <button
                    aria-label={t('server.createServer')}
                    style={{
                        ...styles.selectionButton,
                        background: 'linear-gradient(135deg, #5865f2, #4752c4)',
                    }}
                    onClick={() => {
                        setIsCreatingServer(true);
                    }}
                >
                    <FaServer /> {t('server.createServer', 'Sunucu Oluştur')}
                </button>
                <button
                    aria-label={t('server.findServer')}
                    style={{
                        ...styles.selectionButton,
                        background: 'linear-gradient(135deg, #3ba55c, #2d8449)',
                    }}
                    onClick={() => {
                        onClose();
                        if (onDiscoverClick) onDiscoverClick();
                    }}
                >
                    <FaCompass /> {t('server.findServer', 'Sunucu Keşfet')}
                </button>
                <button
                    aria-label={t('friends.addFriend')}
                    style={{
                        ...styles.selectionButton,
                        background: 'linear-gradient(135deg, #f0b232, #c79100)',
                    }}
                    onClick={() => {
                        onClose();
                        if (onFriendsClick) onFriendsClick();
                    }}
                >
                    <FaUserFriends /> {t('friends.addFriend', 'Arkadaş Ekle')}
                </button>
                <button
                    aria-label={t('common.cancel')}
                    style={{
                        ...styles.selectionButton,
                        background: 'rgba(255,255,255,0.07)',
                        marginBottom: 0,
                    }}
                    onClick={onClose}
                >
                    {t('common.cancel')}
                </button>
            </div>
        </div>,
        document.body
    );
};

AddServerModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onCreateServer: PropTypes.func,
    onFriendsClick: PropTypes.func,
    onDiscoverClick: PropTypes.func,
};
export default AddServerModal;
