// frontend/src/components/MentionHighlight/MentionHighlight.js

import React from 'react';
import './MentionHighlight.css';

/**
 * 🎯 Mention Highlight Component
 * Highlights @mentions, #channels, and @roles in messages
 */

const MentionHighlight = ({
    content,
    currentUserId,
    onMentionClick,
    onChannelClick,
    onRoleClick
}) => {
    if (!content) return null;

    // Parse and highlight mentions
    const parseContent = (text) => {
        const parts = [];
        let lastIndex = 0;

        // Combined regex for all mention types
        const mentionRegex = /@(\w+)|#(\w+)|<@!?(\d+)>|<#(\d+)>|<@&(\d+)>/g;

        let match;
        while ((match = mentionRegex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index)
                });
            }

            // Determine mention type
            if (match[1]) {
                // @username mention
                const isSelfMention = match[1].toLowerCase() === currentUserId?.toLowerCase();
                parts.push({
                    type: 'user-mention',
                    content: `@${match[1]}`,
                    username: match[1],
                    isSelf: isSelfMention
                });
            } else if (match[2]) {
                // #channel mention
                parts.push({
                    type: 'channel-mention',
                    content: `#${match[2]}`,
                    channel: match[2]
                });
            } else if (match[3]) {
                // <@userId> or <@!userId> mention
                parts.push({
                    type: 'user-id-mention',
                    content: match[0],
                    userId: match[3]
                });
            } else if (match[4]) {
                // <#channelId> mention
                parts.push({
                    type: 'channel-id-mention',
                    content: match[0],
                    channelId: match[4]
                });
            } else if (match[5]) {
                // <@&roleId> mention
                parts.push({
                    type: 'role-mention',
                    content: match[0],
                    roleId: match[5]
                });
            }

            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push({
                type: 'text',
                content: text.substring(lastIndex)
            });
        }

        return parts;
    };

    const parts = parseContent(content);

    return (
        <span className="mention-highlight-container">
            {parts.map((part, index) => {
                switch (part.type) {
                    case 'user-mention':
                    case 'user-id-mention':
                        return (
                            <span
                                key={index}
                                className={`mention user-mention ${part.isSelf ? 'self-mention' : ''}`}
                                onClick={() => onMentionClick?.(part.username || part.userId)}
                                title={`Click to view ${part.username || 'user'}'s profile`}
                            >
                                {part.content}
                            </span>
                        );

                    case 'channel-mention':
                    case 'channel-id-mention':
                        return (
                            <span
                                key={index}
                                className="mention channel-mention"
                                onClick={() => onChannelClick?.(part.channel || part.channelId)}
                                title={`Go to ${part.channel || 'channel'}`}
                            >
                                {part.content}
                            </span>
                        );

                    case 'role-mention':
                        return (
                            <span
                                key={index}
                                className="mention role-mention"
                                onClick={() => onRoleClick?.(part.roleId)}
                            >
                                {part.content}
                            </span>
                        );

                    default:
                        return <span key={index}>{part.content}</span>;
                }
            })}
        </span>
    );
};

/**
 * 🔔 Mention Notification Badge
 */
export const MentionBadge = ({ count, type = 'default' }) => {
    if (!count || count <= 0) return null;

    return (
        <span className={`mention-badge ${type}`}>
            {count > 99 ? '99+' : count}
        </span>
    );
};

/**
 * 🎯 Self Mention Alert
 * Shows when user is mentioned in a message
 */
export const SelfMentionAlert = ({ message, onDismiss, onJump }) => {
    return (
        <div className="self-mention-alert">
            <div className="alert-icon">🎯</div>
            <div className="alert-content">
                <strong>{message.author?.username}</strong> mentioned you in{' '}
                <span className="channel-name">#{message.channel?.name}</span>
            </div>
            <div className="alert-actions">
                <button onClick={onJump}>Jump</button>
                <button onClick={onDismiss}>✕</button>
            </div>
        </div>
    );
};

export default MentionHighlight;
