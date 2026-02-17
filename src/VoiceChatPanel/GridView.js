// frontend/src/VoiceChatPanel/GridView.js
// 🎨 Grid view for voice chat — screen shares + camera cards

import React from 'react';
import UserVideoCard from './UserVideoCard';
import { StreamBadge } from './StatusBadges';

const getGridLayout = (count, isMobile) => {
    if (isMobile) return { cols: 1, rows: count };
    if (count <= 1) return { cols: 1, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    return { cols: 4, rows: Math.ceil(count / 4) };
};

const GridView = React.memo(({
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
    const hasScreenShares = screenShares.length > 0;

    if (hasScreenShares) {
        // 🔥 Mixed grid: screen shares + cameras
        const allItems = [];

        // Önce ekran paylaşımlarını ekle
        screenShares.forEach(user => {
            const screenStream = allStreams[`${user.username}_screen`];
            if (screenStream) {
                allItems.push({
                    key: `${user.username}_screen`,
                    username: user.username,
                    type: 'screen',
                    component: (
                        <UserVideoCard
                            key={`${user.username}_screen`}
                            user={{ ...user, streamType: 'screen' }}
                            stream={screenStream}
                            isActive={false}
                            isPinned={false}
                            onExpand={() => setExpandedUser({ ...user, streamType: 'screen' })}
                            onPin={() => { }}
                            onContextMenu={(data) => setContextMenu(data)}
                            badge={<StreamBadge user={{ ...user, streamType: 'screen' }} />}
                            connectionQuality={connectionQuality[user.username]}
                            getUserAvatar={getUserAvatar}
                        />
                    )
                });
            }
        });

        // Sonra kameraları ekle (sadece aktif stream'ler veya kendim)
        combinedUsers.forEach(user => {
            const cameraStream = allStreams[`${user.username}_camera`] || allStreams[user.username];
            const shouldShow = (cameraStream && cameraStream.active) || user.isLocal;

            if (shouldShow) {
                allItems.push({
                    key: `${user.username}_camera`,
                    username: user.username,
                    type: 'camera',
                    component: (
                        <UserVideoCard
                            key={`${user.username}_camera`}
                            user={{
                                ...user,
                                streamType: 'camera',
                                volume: remoteVolumes[user.username] || 100,
                                onVolumeChange: (vol) => setRemoteVolume(user.username, vol),
                                isTalking: talkingIndicators[user.username] || false,
                            }}
                            stream={cameraStream}
                            isActive={activeSpeaker === user.username}
                            isPinned={pinnedUser === user.username}
                            onExpand={() => setExpandedUser({ ...user, streamType: 'camera' })}
                            onPin={() => setPinnedUser(pinnedUser === user.username ? null : user.username)}
                            onContextMenu={(data) => setContextMenu(data)}
                            badge={<StreamBadge user={user} />}
                            connectionQuality={connectionQuality[user.username]}
                            getUserAvatar={getUserAvatar}
                        />
                    )
                });
            }
        });

        // Grid layout hesapla
        const totalItems = allItems.length;
        let cols, rows;
        if (totalItems <= 2) { cols = totalItems; rows = 1; }
        else if (totalItems <= 4) { cols = 2; rows = 2; }
        else if (totalItems <= 6) { cols = 3; rows = 2; }
        else { cols = 3; rows = Math.ceil(totalItems / 3); }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gap: '16px',
                padding: '0',
                position: 'relative',
            }}>
                {allItems.map((item) => (
                    <div
                        key={item.key}
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                            zIndex: 1,
                            isolation: 'isolate',
                        }}
                    >
                        {item.component}
                    </div>
                ))}
            </div>
        );
    }

    // 🔥 Camera-only grid (no screen shares)
    const { cols, rows } = getGridLayout(combinedUsers.length, isMobile);

    return (
        <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: '16px',
            minHeight: '400px',
            height: '100%',
        }}>
            {combinedUsers.map(user => {
                const cameraStream = allStreams[`${user.username}_camera`] || (user.isLocal ? null : allStreams[user.username]);
                return (
                    <UserVideoCard
                        key={`${user.username}_camera`}
                        user={{
                            ...user,
                            streamType: 'camera',
                            volume: remoteVolumes[user.username] || 100,
                            onVolumeChange: (vol) => setRemoteVolume(user.username, vol)
                        }}
                        stream={cameraStream}
                        isActive={activeSpeaker === user.username}
                        isPinned={pinnedUser === user.username}
                        onExpand={() => setExpandedUser({ ...user, streamType: 'camera' })}
                        onPin={() => setPinnedUser(pinnedUser === user.username ? null : user.username)}
                        onContextMenu={(data) => setContextMenu(data)}
                        badge={<StreamBadge user={{ ...user, streamType: 'camera' }} />}
                        connectionQuality={connectionQuality[user.username]}
                        getUserAvatar={getUserAvatar}
                    />
                );
            })}
        </div>
    );
});

GridView.displayName = 'GridView';

export default GridView;
