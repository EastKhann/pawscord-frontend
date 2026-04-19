/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-autofocus */
// frontend/src/components/MessageThreadsPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaComments, FaThumbtack, FaBell, FaBellSlash, FaReply } from 'react-icons/fa';
import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
/**
 * 💬 Message Threads Panel
 * Discord-style thread sistemi
 *
 * Features:
 * - Thread oluşturma
 * - Thread'lere abone olma
 * - Thread pinleme
 * - Thread mesajları görüntüleme
 */

const MessageThreadsPanel = ({ fetchWithAuth, apiBaseUrl, messageId, onClose }) => {
    const { t } = useTranslation();
    const [thread, setThread] = useState(null);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newThreadName, setNewThreadName] = useState('');
    const [showCreateThread, setShowCreateThread] = useState(false);

    useEffect(() => {
        if (messageId) {
            loadThreads();
        }
    }, [messageId]);

    const loadThreads = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/threads/list/`);
            if (response.ok) {
                const data = await response.json();
                setThreads(data);
            }
        } catch (error) {
            logger.error(t('ui.thread_load_hatasi'), error);
            toast.error(t('threads.couldNotLoad', 'Konular yüklenemedi'));
        } finally {
            setLoading(false);
        }
    };

    const createThread = async () => {
        if (!newThreadName.trim()) {
            toast.error(t('ui.thread_adi_gerekli'));
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/threads/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message_id: messageId,
                    name: newThreadName,
                }),
            });

            if (response.ok) {
                toast.success(t('threads.created', 'Konu oluşturuldu'));
                setNewThreadName('');
                setShowCreateThread(false);
                loadThreads();
            } else {
                toast.error(t('ui.thread_olusturulamadi'));
            }
        } catch (error) {
            logger.error(t('ui.thread_olusturma_hatasi'), error);
            toast.error(t('common.error', 'Bir hata oluştu'));
        }
    };

    const subscribeToThread = async (threadId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/threads/subscribe/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ thread_id: threadId }),
            });

            if (response.ok) {
                toast.success(t('threads.subscribed', 'Konuya abone oldunuz'));
                loadThreads();
            }
        } catch (error) {
            logger.error(t('ui.abone_olma_hatasi'), error);
            toast.error(t('common.error', 'Bir hata oluştu'));
        }
    };

    const pinThread = async (threadId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/threads/${threadId}/pin/`, {
                method: 'POST',
            });

            if (response.ok) {
                toast.success(t('threads.pinned', 'Konu sabitlendi'));
                loadThreads();
            }
        } catch (error) {
            logger.error('Pin error:', error);
            toast.error(t('common.error', 'Bir hata oluştu'));
        }
    };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaComments className="icon-primary" />
                        <h2 className="m-0">Thread\'ler</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.toolbar}>
                    <button
                        aria-label="Create"
                        onClick={() => setShowCreateThread(!showCreateThread)}
                        style={styles.createBtn}
                    >
                        <FaReply /> {t('threads.newThread', 'Yeni Konu')}
                    </button>
                </div>

                {showCreateThread && (
                    <div style={styles.createForm}>
                        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                        <input
                            type="text"
                            placeholder={t('ui.thread_adi')}
                            value={newThreadName}
                            onChange={(e) => setNewThreadName(e.target.value)}
                            style={styles.input}
                            autoFocus
                        />
                        <div className="flex-gap-10">
                            <button
                                aria-label="create Thread"
                                onClick={createThread}
                                style={styles.saveBtn}
                            >
                                {t('common.create', 'Oluştur')}
                            </button>
                            <button
                                aria-label="Create"
                                onClick={() => setShowCreateThread(false)}
                                style={styles.cancelBtn}
                            >
                                {t('common.cancel')}
                            </button>
                        </div>
                    </div>
                )}

                <div style={styles.threadsList}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : threads.length === 0 ? (
                        <div style={styles.empty}>
                            <FaComments className="icon-lg" />
                            <p>Henüz konu yok</p>
                        </div>
                    ) : (
                        threads.map((thread) => (
                            <div key={thread.id} style={styles.threadItem}>
                                <div style={styles.threadIcon}>
                                    <FaComments className="icon-primary" />
                                </div>
                                <div style={styles.threadContent}>
                                    <div style={styles.threadName}>{thread.name}</div>
                                    <div style={styles.threadMeta}>
                                        <span>{thread.message_count || 0} message</span>
                                        <span>•</span>
                                        <span>{thread.subscriber_count || 0} abone</span>
                                    </div>
                                </div>
                                <div style={styles.threadActions}>
                                    {thread.is_pinned && <FaThumbtack className="icon-warning" />}
                                    <button
                                        aria-label="Action button"
                                        onClick={() => subscribeToThread(thread.id)}
                                        style={styles.actionBtn}
                                        title={
                                            thread.is_subscribed
                                                ? 'Subscriptionten Exit'
                                                : 'Abone Ol'
                                        }
                                    >
                                        {thread.is_subscribed ? <FaBellSlash /> : <FaBell />}
                                    </button>
                                    {!thread.is_pinned && (
                                        <button
                                            aria-label="Action button"
                                            onClick={() => pinThread(thread.id)}
                                            style={styles.actionBtn}
                                            title="Sabitle"
                                        >
                                            <FaThumbtack />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
    },
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #333',
    },
    createBtn: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
    },
    createForm: {
        padding: '20px',
        backgroundColor: '#111214',
        borderBottom: '1px solid #333',
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginBottom: '10px',
    },
    saveBtn: {
        flex: 1,
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    threadsList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    threadItem: {
        display: 'flex',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        marginBottom: '10px',
        alignItems: 'center',
    },
    threadIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#5865f21a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
    },
    threadContent: {
        flex: 1,
    },
    threadName: {
        fontWeight: '600',
        marginBottom: '4px',
    },
    threadMeta: {
        fontSize: '12px',
        color: '#888',
        display: 'flex',
        gap: '8px',
    },
    threadActions: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    actionBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#dbdee1',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '8px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888',
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#888',
    },
};

MessageThreadsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    messageId: PropTypes.string,
    onClose: PropTypes.func,
};
export default MessageThreadsPanel;
