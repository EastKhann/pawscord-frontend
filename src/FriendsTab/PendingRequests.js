import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaTimes } from '../utils/iconOptimization';
import LazyImage from '../components/shared/LazyImage';
import styles from './friendsTabStyles';
import { hapticSuccess, hapticLight } from '../utils/haptics';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --
const _st1 = { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 };
const _st2 = { color: '#dbdee1', fontSize: '0.95em' };
const _st3 = { color: '#949ba4', fontSize: '0.85em' };
const _st4 = { color: '#dbdee1', fontSize: '0.9em' };

const _st1066 = styles.listItem;
const _st1067 = styles.listHeader;

const PendingRequests = ({ requests, outgoing, getDeterministicAvatar, handleRespond }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    return (
        <div style={styles.listContainer}>
            <h4 style={styles.listHeader}>
                {t('friends.pending').toUpperCase()} — {requests.length}
            </h4>
            {requests.length === 0 && outgoing.length === 0 && (
                <p style={styles.emptyText}>{t('friends.noPending')}</p>
            )}
            {requests.map((req) => {
                const senderUsername = req.sender_username || 'Unknown';
                const senderAvatar = req.sender_avatar;
                return (
                    <div key={req.id} style={_st1066}>
                        <div style={styles.userInfo}>
                            <LazyImage
                                src={senderAvatar || getDeterministicAvatar(senderUsername)}
                                style={styles.avatar}
                                alt="avatar"
                            />
                            <div style={_st1}>
                                <strong style={_st2}>{senderUsername}</strong>
                                <span style={_st3}>{t('friends.friendRequestSent')}</span>
                            </div>
                        </div>
                        <div style={styles.actions}>
                            <button
                                onClick={() => { hapticSuccess(); handleRespond(req.id, 'accept'); }}
                                style={styles.acceptBtn}
                                title={t('friends.acceptRequest')}
                                aria-label={t('friends.acceptRequest')}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={() => { hapticLight(); handleRespond(req.id, 'reject'); }}
                                style={styles.rejectBtn}
                                title={t('friends.declineRequest')}
                                aria-label={t('friends.declineRequest')}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                );
            })}

            {outgoing.length > 0 && (
                <>
                    <h4 style={_st1067}>
                        {t('common.send').toUpperCase()} — {outgoing.length}
                    </h4>
                    {outgoing.map((req) => {
                        const receiverUsername = req.receiver_username || 'Unknown';
                        const receiverAvatar = req.receiver_avatar;
                        return (
                            <div key={req.id} style={styles.listItem}>
                                <div style={styles.userInfo}>
                                    <LazyImage
                                        src={
                                            receiverAvatar ||
                                            getDeterministicAvatar(receiverUsername)
                                        }
                                        style={styles.avatar}
                                        alt="avatar"
                                    />
                                    <span style={_st4}>
                                        {receiverUsername} ({t('friends.pending')}...)
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleRespond(req.id, 'reject')}
                                    style={styles.rejectBtn}
                                    title={t('common.cancel')}
                                    aria-label={t('common.cancel')}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

PendingRequests.propTypes = {
    requests: PropTypes.array,
    outgoing: PropTypes.object,
    getDeterministicAvatar: PropTypes.func,
    handleRespond: PropTypes.func,
};
export default PendingRequests;
