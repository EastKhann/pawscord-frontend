// frontend/src/components/BreadcrumbNavigation.js
// 🔥 FEATURE 18: Breadcrumb navigation bar
// Shows: Server > Category > #Channel with click navigation

import React, { memo } from 'react';
import { FaChevronRight, FaHashtag, FaVolumeUp, FaBullhorn, FaComments, FaMicrophone, FaGavel, FaLock, FaGamepad, FaHome } from 'react-icons/fa';

const CHANNEL_ICONS = {
    text: FaHashtag,
    voice: FaVolumeUp,
    announcement: FaBullhorn,
    forum: FaComments,
    stage: FaMicrophone,
    rules: FaGavel,
    private: FaLock,
    gaming: FaGamepad,
};

const BreadcrumbNavigation = ({ server, category, channel, onNavigate }) => {
    if (!server && !channel) return null;

    const ChannelIcon = CHANNEL_ICONS[channel?.channel_type || channel?.type] || FaHashtag;

    return (
        <div style={S.container}>
            {/* Server name */}
            {server && (
                <button
                    type="button"
                    style={S.crumb}
                    onClick={() => onNavigate?.('server', server)}
                    title={server.name}
                >
                    {server.icon ? (
                        <img src={server.icon} alt="" style={S.serverIcon} />
                    ) : (
                        <FaHome style={{ fontSize: 12, opacity: 0.6 }} />
                    )}
                    <span style={S.crumbText}>{server.name}</span>
                </button>
            )}

            {/* Category */}
            {category && (
                <>
                    <FaChevronRight style={S.separator} />
                    <button
                        type="button"
                        style={S.crumb}
                        onClick={() => onNavigate?.('category', category)}
                        title={category.name}
                    >
                        <span style={{ ...S.crumbText, textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.5px' }}>
                            {category.name}
                        </span>
                    </button>
                </>
            )}

            {/* Channel */}
            {channel && (
                <>
                    <FaChevronRight style={S.separator} />
                    <div style={S.activeCrumb}>
                        <ChannelIcon style={{ fontSize: 14, opacity: 0.7 }} />
                        <span style={S.activeText}>{channel.name}</span>
                        {channel.topic && (
                            <>
                                <div style={S.topicDivider} />
                                <span style={S.topic} title={channel.topic}>{channel.topic}</span>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const S = {
    container: {
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '8px 16px', height: 48, minHeight: 48,
        backgroundColor: '#313338', borderBottom: '1px solid rgba(0,0,0,0.2)',
        overflow: 'hidden',
    },
    crumb: {
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: '#b5bac1', fontSize: 14, padding: '4px 6px',
        borderRadius: 4, transition: 'all 0.15s',
        whiteSpace: 'nowrap',
    },
    crumbText: {
        maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis',
    },
    separator: {
        fontSize: 10, color: '#4e5058', flexShrink: 0,
    },
    activeCrumb: {
        display: 'flex', alignItems: 'center', gap: 6,
        color: '#f2f3f5', fontWeight: 600, fontSize: 15,
    },
    activeText: {
        whiteSpace: 'nowrap',
    },
    serverIcon: {
        width: 18, height: 18, borderRadius: '50%', objectFit: 'cover',
    },
    topicDivider: {
        width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.1)',
        margin: '0 8px', flexShrink: 0,
    },
    topic: {
        fontSize: 13, color: '#b5bac1', fontWeight: 400,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        maxWidth: 300,
    },
};

export default memo(BreadcrumbNavigation);
