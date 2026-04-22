import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaPaperPlane } from 'react-icons/fa';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';
import css from '../tabs/AdminTabs.module.css';

const S = {
    bg: {
        width: '100%',
        minHeight: '100px',
        padding: '12px',
        backgroundColor: '#111113',
        border: '1px solid #2a2a2e',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '14px',
        resize: 'vertical',
        outline: 'none',
        marginBottom: '12px',
    },
    txt: { color: '#fff', marginTop: 0 },
};

const BroadcastModal = ({ announceText, handleBroadcast, setAnnounceText, setBroadcastModal }) => {
    const { t } = useTranslation();

    const onClose = useCallback(() => setBroadcastModal(false), [setBroadcastModal]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: t('broadcast.title','Broadcast Announcement'),
    });
    return (
        <div className={css.absoOverlay8} {...overlayProps}>
            <div className={css.modalCard500Sm} {...dialogProps}>
                <h3 style={S.txt}>{t('📢_duyuru_send')}</h3>
                <textarea
                    value={announceText}
                    onChange={(e) => setAnnounceText(e.target.value)}
                    placeholder={t('common.typeMessage', 'Type a message...')}
                    style={S.bg}
                />
                <div className="flex-gap-8">
                    <button style={styles.actionBtn('#5865f2')} onClick={handleBroadcast}>
                        <FaPaperPlane /> {t('common.send','Send')}
                    </button>
                    <button
                        style={styles.actionBtn('#6b7280')}
                        onClick={() => setBroadcastModal(false)}
                    >
                        {t('common.cancel','Cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
};

BroadcastModal.propTypes = {
    announceText: PropTypes.string,
    handleBroadcast: PropTypes.func,
    setAnnounceText: PropTypes.func,
    setBroadcastModal: PropTypes.func,
};
export default BroadcastModal;
