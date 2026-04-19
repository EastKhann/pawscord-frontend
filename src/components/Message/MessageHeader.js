/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// frontend/src/components/Message/MessageHeader.js
// 📋 MESSAGE HEADER - Username, timestamp, badges

import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaLock, FaThumbtack } from 'react-icons/fa';
import { EditHistory } from './EditHistory';
import { formatTimestamp } from '../../utils/dateFormatters';

const S = {
    txt2: { marginLeft: 5, color: '#f0b232', fontSize: '0.8em' },
    txt: {
        marginLeft: 8,
        color: '#f0b232',
        fontSize: '0.9em',
    },
};

export const MessageHeader = memo(
    ({ msg, isAdmin, isAIMessage, onViewProfile, messageEditHistoryUrl, fetchWithAuth }) => {
        const { t } = useTranslation();
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
        return (
            <div aria-label="message header" style={styles.messageHeader}>
                <span
                    role="button"
                    tabIndex={0}
                    style={{
                        cursor: 'pointer',
                        color:
                            msg.username === '⚡ Signal Bot'
                                ? '#5865f2'
                                : isAdmin
                                  ? '#f0b232'
                                  : '#fff',
                        fontWeight: 'bold',
                    }}
                    onClick={() => onViewProfile(msg.username)}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && onViewProfile(msg.username)
                    }
                >
                    {isAIMessage && '🤖 '} {msg.username}
                </span>

                {/* Lock Icon - Mesaj kilitli ise */}
                {msg.is_locked && (
                    <FaLock
                        style={S.txt}
                        title={t('locked_by_moderator_-_cannot_be_edited_or_deleted')}
                    />
                )}

                <span style={styles.timestamp}>
                    {formatTimestamp(msg.timestamp)}
                    {msg.is_edited && (
                        <EditHistory
                            messageId={msg.id}
                            messageEditHistoryUrl={messageEditHistoryUrl}
                            fetchWithAuth={fetchWithAuth}
                        />
                    )}
                    {msg.is_pinned && <FaThumbtack style={S.txt2} />}
                </span>
            </div>
        );
    }
);

const styles = {
    messageHeader: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '4px',
        gap: '8px',
    },
    timestamp: {
        fontSize: '0.75rem',
        color: '#949ba4',
        fontWeight: '400',
    },
};

MessageHeader.displayName = 'MessageHeader';
MessageHeader.propTypes = {
    msg: PropTypes.object,
    isAdmin: PropTypes.bool,
    isAIMessage: PropTypes.bool,
    onViewProfile: PropTypes.func,
    messageEditHistoryUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default MessageHeader;
