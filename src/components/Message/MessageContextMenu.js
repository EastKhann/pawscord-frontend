/* eslint-disable react-hooks/rules-of-hooks */
// frontend/src/components/Message/MessageContextMenu.js
// 📋 MESSAGE CONTEXT MENU - Right-click menu

import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    FaReply,
    FaEdit,
    FaTrash,
    FaSmile,
    FaShareSquare,
    FaFileAlt,
    FaThumbtack,
    FaBell,
    FaComments,
    FaExclamationTriangle,
} from 'react-icons/fa';
const _s = (o) => o;
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

export const MessageContextMenu = memo(
    ({
        msg,
        contextMenu,
        displayContent,
        isMyMessage,
        onSetReply,
        onStartEdit,
        onDelete,
        onTogglePin,
        onStartForward,
        onShowReactionPicker,
        onShowThreadModal,
        onShowReminderModal,
        onClose,
        fetchWithAuth,
        absoluteHostUrl,
    }) => {
        const { t } = useTranslation();
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
        const dangerContextMenuItemStyle = { ...styles.contextMenuItem, color: '#f23f42' };
        if (!contextMenu) return null;

        // Copy message to clipboard
        const handleCopy = useCallback(() => {
            navigator.clipboard.writeText(displayContent);
            toast.success(t('messageMenu.copied', '✅ Message copied'));
            onClose();
        }, [displayContent, onClose]);

        // Report message
        const handleReport = useCallback(async () => {
            const reason = prompt(t('messageMenu.reportReason', 'Rapor sebebi:'));
            if (reason) {
                await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                    method: 'POST',
                    body: JSON.stringify({ message_id: msg.id, reason }),
                });
                toast.success(t('messageMenu.reportSent', '✅ Report sent'));
                onClose();
            }
        }, [msg.id, fetchWithAuth, absoluteHostUrl, onClose, t]);

        return (
            <div
                aria-label="message context menu"
                style={_s({
                    ...styles.contextMenu,
                    left: `${contextMenu.x}>px`,
                    top: `${contextMenu.y}px`,
                })}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="context-menu-item"
                    style={styles.contextMenuItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        onShowReactionPicker();
                        onClose();
                    }}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <FaSmile /> {t('messageMenu.addReaction', 'Tepki Ekle')}
                </div>

                <div
                    className="context-menu-item"
                    style={styles.contextMenuItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        onSetReply(msg);
                        onClose();
                    }}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <FaReply /> {t('messageMenu.reply', 'Reply')}
                </div>

                {isMyMessage && msg.content && (
                    <div
                        className="context-menu-item"
                        style={styles.contextMenuItem}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            onStartEdit(msg);
                            onClose();
                        }}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <FaEdit /> {t('messageMenu.edit', 'Edit')}
                    </div>
                )}

                <div
                    className="context-menu-item"
                    style={styles.contextMenuItem}
                    role="button"
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <FaFileAlt /> {t('messageMenu.copyMessage', 'Mesajı Kopyala')}
                </div>

                <div
                    className="context-menu-item"
                    style={styles.contextMenuItem}
                    role="button"
                    tabIndex={0}
                    onClick={async () => {
                        await onTogglePin(msg.id);
                        onClose();
                    }}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <FaThumbtack />{' '}
                    {msg.is_pinned ? t('messageMenu.unpin', 'Unpin') : t('messageMenu.pin', 'Pin')}
                </div>

                <div
                    className="context-menu-item"
                    style={styles.contextMenuItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        onStartForward(msg);
                        onClose();
                    }}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <FaShareSquare /> {t('messageMenu.forward', 'Forward')}
                </div>

                <div
                    className="context-menu-item"
                    style={styles.contextMenuItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        onShowThreadModal();
                        onClose();
                    }}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <FaComments /> {t('messageMenu.startThread', 'İş Parçaçığı Başlat')}
                </div>

                <div
                    className="context-menu-item"
                    style={styles.contextMenuItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        onShowReminderModal();
                        onClose();
                    }}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <FaBell /> {t('messageMenu.setReminder', 'Hatırlatıcı Ayarla')}
                </div>

                <div style={styles.contextMenuDivider}></div>

                {isMyMessage && (
                    <div
                        className="context-menu-item danger"
                        style={dangerContextMenuItemStyle}
                        role="button"
                        tabIndex={0}
                        onClick={async () => {
                            if (
                                await confirmDialog(
                                    t(
                                        'messageMenu.deleteConfirm',
                                        'Are you sure you want to delete this message?'
                                    )
                                )
                            ) {
                                await onDelete(msg.id);
                                onClose();
                            }
                        }}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <FaTrash /> {t('messageMenu.delete', 'Delete')}
                    </div>
                )}

                {!isMyMessage && (
                    <div
                        className="context-menu-item danger"
                        style={dangerContextMenuItemStyle}
                        role="button"
                        tabIndex={0}
                        onClick={handleReport}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <FaExclamationTriangle /> {t('messageMenu.report', 'Report')}
                    </div>
                )}
            </div>
        );
    }
);

const styles = {
    contextMenu: {
        position: 'fixed',
        backgroundColor: '#18191c',
        border: '1px solid #0e1222',
        borderRadius: '6px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 10000,
        minWidth: '220px',
        overflow: 'hidden',
        padding: '6px 0',
    },
    contextMenuItem: {
        padding: '10px 14px',
        cursor: 'pointer',
        color: '#b5bac1',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.15s',
        backgroundColor: 'transparent',
    },
    contextMenuDivider: {
        height: '1px',
        backgroundColor: '#111214',
        margin: '6px 0',
    },
};

MessageContextMenu.displayName = 'MessageContextMenu';
MessageContextMenu.propTypes = {
    msg: PropTypes.object,
    contextMenu: PropTypes.object,
    displayContent: PropTypes.object,
    isMyMessage: PropTypes.bool,
    onSetReply: PropTypes.func,
    onStartEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onTogglePin: PropTypes.func,
    onStartForward: PropTypes.func,
    onShowReactionPicker: PropTypes.func,
    onShowThreadModal: PropTypes.func,
    onShowReminderModal: PropTypes.func,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    absoluteHostUrl: PropTypes.string,
};
export default MessageContextMenu;
