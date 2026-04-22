import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';
import css from '../tabs/AdminTabs.module.css';

const S = {
    txt3: { fontSize: '20px', fontWeight: '700', color: '#f0b132' },
    txt2: { fontSize: '20px', fontWeight: '700', color: '#23a559' },
    txt: { fontSize: '20px', fontWeight: '700', color: '#5865f2' },
    grid: {
        display: 'grid',
        gap: '12px',
        marginBottom: '16px',
    },
    bg: {
        backgroundColor: '#1a1a1e',
        borderRadius: '12px',
        padding: '24px',
        width: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        border: '1px solid #2a2a2e',
    },
};

const ServerDetailModal = ({ selectedServer, setSelectedServer }) => {
    const { t } = useTranslation();

    const onClose = useCallback(() => setSelectedServer(null), [setSelectedServer]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: 'Server Detail',
    });
    return (
        <div aria-label={t('admin.serverDetailModal', 'Server detail')} className={css.fixedOverlay85} {...overlayProps}>
            <div style={S.bg} {...dialogProps}>
                <div className="flex-between-mb20">
                    <h3 className="white-m0">🏠 {selectedServer.name}</h3>
                    <button
                        onClick={() => setSelectedServer(null)}
                        style={styles.actionBtn('#e74c3c')}
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Server Info */}
                <div className="admin-grid-3" style={S.grid}>
                    <div style={styles.miniCard}>
                        <div style={S.txt}>{selectedServer.member_count}</div>
                        <div className="text-gray6b-10">{t('member')}</div>
                    </div>
                    <div style={styles.miniCard}>
                        <div style={S.txt2}>{selectedServer.channel_count}</div>
                        <div className="text-gray6b-10">{t('channel')}</div>
                    </div>
                    <div style={styles.miniCard}>
                        <div style={S.txt3}>{selectedServer.owner}</div>
                        <div className="text-gray6b-10">{t('owner')}</div>
                    </div>
                </div>

                {/* Members */}
                <div className="mb-16">
                    <h4 className="white-14-mb8">
                        👥 {t('adminActions.members')} ({selectedServer.members?.length || 0})
                    </h4>
                    <div className="scroll-dark-200">
                        {selectedServer.members?.map((member, idx) => (
                            <div key={`item-${idx}`} className={css.serverDetailRow}>
                                <span className="text-white">{member.username}</span>
                                <span
                                    style={styles.badge(
                                        member.role === 'admin' ? '#e74c3c' : '#5865f2'
                                    )}
                                >
                                    {member.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Channels */}
                <div>
                    <h4 className="white-14-mb8">
                        📁 {t('adminActions.channels')} ({selectedServer.channels?.length || 0})
                    </h4>
                    <div className="scroll-dark-200">
                        {selectedServer.channels?.map((channel, idx) => (
                            <div key={`item-${idx}`} className={css.serverDetailRow}>
                                <span className="text-white">{channel.name}</span>
                                <span style={styles.badge('#5865f2')}>{channel.type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

ServerDetailModal.propTypes = {
    selectedServer: PropTypes.object,
    setSelectedServer: PropTypes.func,
};
export default ServerDetailModal;
