/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';

import PropTypes from 'prop-types';

import { FaLock, FaTimes } from 'react-icons/fa';

import useModalA11y from '../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

const EncryptionKeyModal = ({ onClose, onSetKey, existingKey }) => {
    const { t } = useTranslation();

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Encryption Key' });

    const [key, setKey] = useState(existingKey || '');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        onSetKey(key);

        onClose();
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3> {t('encryption.title', 'Secure Chat Key')}</h3>

                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={styles.body}>
                    <p className="text-b5-09em">
                        {t('encryption.desc', 'Set a shared password for this conversation. This password is not sent to the server.')}
                        {t('encryption.desc2', 'Only the party who enters the same password can read the messages.')}
                    </p>
                    <input
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder={t('ui.gizli_anahtar_orn_123456')}
                        style={styles.input}
                        autoFocus
                        aria-label={t('encryption.keyInput', 'Encryption key')}
                    />

                    <button aria-label={t('common.submit')} type="submit" style={styles.saveBtn}>
                        {t('common.save')}
                    </button>

                    {existingKey && (
                        <button
                            aria-label={t('encryption.disableEncryption', 'Disable encryption')}
                            type="button"
                            onClick={() => {
                                onSetKey('');
                                onClose();
                            }}
                            style={styles.clearBtn}
                        >
                            {t('encryption.disable', 'Disable Encryption')}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal: {
        backgroundColor: '#17191c',
        width: '400px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    },

    header: {
        padding: '15px 20px',
        backgroundColor: '#111214',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
    },

    closeBtn: { background: 'none', border: 'none', color: '#b5bac1', cursor: 'pointer' },

    body: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' },

    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #0b0e1b',
        backgroundColor: '#0d0e10',
        color: 'white',
        outline: 'none',
    },

    saveBtn: {
        padding: '10px',
        backgroundColor: '#3ba55c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },

    clearBtn: {
        padding: '10px',
        backgroundColor: '#f23f42',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

EncryptionKeyModal.propTypes = {
    onClose: PropTypes.func,

    onSetKey: PropTypes.func,

    existingKey: PropTypes.string,
};

export default EncryptionKeyModal;
