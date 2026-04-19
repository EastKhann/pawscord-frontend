// frontend/src/VoiceChatPanel/GridView.js
// 🎨 Grid view for voice chat — screen shares + camera cards

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserVideoCard from './UserVideoCard';
import { StreamBadge } from './StatusBadges';

// -- extracted inline style constants --

const getGridLayout = (count, isMobile) => {
    if (isMobile) return { cols: 1, rows: count };
    if (count <= 1) return { cols: 1, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    return { cols: 4, rows: Math.ceil(count / 4) };
};

const GridView = React.memo(
    ({
        combinedUsers,
        allStreams,
        screenShares = [],
        remoteVolumes,
        setRemoteVolume,
        talkingIndicators,
        activeSpeaker,
        pinnedUser,
        setPinnedUser,
        setExpandedUser,
        setContextMenu,
        connectionQuality,
        getUserAvatar,
        isMobile,
    }) => {
        // 🔥 Focused key: user can click to enlarge any frame
        const [focusedKey, setFocusedKey] = useState(null);

        // Build unified list: screen shares + cameras (all equal by default)
        const allItems = [];

        // Screen shares
        (screenShares || []).forEach((user) => {
            const screenStream = allStreams[`${user.username}_screen`];
            if (screenStream) {
                allItems.push({
                    key: `${user.username}_screen`,
                    user: { ...user, streamType: 'screen' },
                    stream: screenStream,
                });
            }
        });

        // Cameras
        combinedUsers.forEach((user) => {
            const cameraStream =
                allStreams[`${user.username}_camera`] ||
                (user.isLocal ? null : allStreams[user.username]);
            allItems.push({
                key: `${user.username}_camera`,
                user: {
                    ...user,
                    streamType: 'camera',
                    volume: remoteVolumes[user.username] || 100,
                    onVolumeChange: (vol) => setRemoteVolume(user.username, vol),
                    isTalking: talkingIndicators?.[user.username] || false,
                },
                stream: cameraStream,
            });
        });

        const toggleFocus = (key) => {
            setFocusedKey((prev) => (prev === key ? null : key));
        };

        const renderCard = (item) => (
            <UserVideoCard
                key={item.key}
                user={item.user}
                stream={item.stream}
                isActive={activeSpeaker === item.user.username}
                isPinned={pinnedUser === item.user.username}
                onExpand={() => toggleFocus(item.key)}
                onPin={() =>
                    setPinnedUser(pinnedUser === item.user.username ? null : item.user.username)
                }
                onContextMenu={(data) => setContextMenu(data)}
                badge={<StreamBadge user={item.user} />}
                connectionQuality={connectionQuality[item.user.username]}
                getUserAvatar={getUserAvatar}
            />
        );

        // 🔥 FOCUSED LAYOUT: one item large + others in sidebar
        if (focusedKey && allItems.length > 1) {
            const focusedItem = allItems.find((i) => i.key === focusedKey);
            const otherItems = allItems.filter((i) => i.key !== focusedKey);

            if (focusedItem) {
                const sidebarItemH = Math.min(
                    180,
                    Math.floor(600 / Math.max(otherItems.length, 1))
                );
                return (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            gap: '12px',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Focused (large) */}
                        <div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
                            {renderCard(focusedItem)}
                        </div>

                        {/* Sidebar (small) */}
                        {otherItems.length > 0 && (
                            <div
                                style={{
                                    width: isMobile ? '160px' : '280px',
                                    flexShrink: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                }}
                            >
                                {otherItems.map((item) => (
                                    <div
                                        key={item.key}
                                        style={{
                                            height: `${sidebarItemH}px`,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {renderCard(item)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }
        }

        // 🔥 DEFAULT: Equal grid for ALL items (screen shares + cameras)
        const { cols, rows } = getGridLayout(allItems.length, isMobile);

        return (
            <div
                style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gap: '16px',
                    minHeight: '400px',
                    height: '100%',
                }}
            >
                {allItems.map((item) => renderCard(item))}
            </div>
        );
    }
);

GridView.displayName = 'GridView';

GridView.propTypes = {
    combinedUsers: PropTypes.array,
    allStreams: PropTypes.array,
    screenShares: PropTypes.array,
    remoteVolumes: PropTypes.array,
    setRemoteVolume: PropTypes.func,
    talkingIndicators: PropTypes.array,
    activeSpeaker: PropTypes.bool,
    pinnedUser: PropTypes.object,
    setPinnedUser: PropTypes.func,
    setExpandedUser: PropTypes.func,
    setContextMenu: PropTypes.func,
    connectionQuality: PropTypes.func,
    getUserAvatar: PropTypes.func,
    isMobile: PropTypes.bool,
};
export default GridView;
