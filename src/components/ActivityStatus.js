// frontend/src/components/ActivityStatus.js
// 🔥 FEATURE 34: Activity status display
// Shows what the user is currently doing (playing, listening, streaming)

import React, { memo } from 'react';
import { FaGamepad, FaMusic, FaVideo, FaCode, FaDesktop, FaSpotify } from 'react-icons/fa';

const ACTIVITY_ICONS = {
    playing: { icon: FaGamepad, color: '#57f287', prefix: 'Oynuyor' },
    listening: { icon: FaMusic, color: '#1db954', prefix: 'Dinliyor' },
    spotify: { icon: FaSpotify, color: '#1db954', prefix: 'Spotify\'da dinliyor' },
    streaming: { icon: FaVideo, color: '#9146ff', prefix: 'Yayın Yapıyor' },
    coding: { icon: FaCode, color: '#5865f2', prefix: 'Kodluyor' },
    watching: { icon: FaDesktop, color: '#fee75c', prefix: 'İzliyor' },
};

const ActivityStatus = ({ activity, compact = false }) => {
    if (!activity) return null;

    const config = ACTIVITY_ICONS[activity.type] || ACTIVITY_ICONS.playing;
    const Icon = config.icon;

    if (compact) {
        return (
            <div style={S.compact}>
                <Icon style={{ fontSize: 10, color: config.color }} />
                <span style={S.compactText}>{activity.name}</span>
            </div>
        );
    }

    return (
        <div style={S.container}>
            <div style={S.header}>
                <Icon style={{ fontSize: 12, color: config.color }} />
                <span style={S.prefix}>{config.prefix}</span>
            </div>
            <div style={S.details}>
                {activity.image && (
                    <img src={activity.image} alt="" style={S.image} />
                )}
                <div style={S.info}>
                    <span style={S.name}>{activity.name}</span>
                    {activity.detail && <span style={S.detail}>{activity.detail}</span>}
                    {activity.state && <span style={S.state}>{activity.state}</span>}
                    {activity.elapsed && (
                        <span style={S.elapsed}>{activity.elapsed} geçti</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const S = {
    container: {
        padding: '12px 0',
    },
    header: {
        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
    },
    prefix: {
        fontSize: 12, fontWeight: 700, color: '#f2f3f5',
        textTransform: 'uppercase', letterSpacing: '0.5px',
    },
    details: {
        display: 'flex', gap: 10,
    },
    image: {
        width: 60, height: 60, borderRadius: 8, objectFit: 'cover', flexShrink: 0,
    },
    info: {
        display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0,
    },
    name: {
        fontSize: 14, fontWeight: 600, color: '#f2f3f5',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
    detail: {
        fontSize: 13, color: '#dcddde',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
    state: {
        fontSize: 13, color: '#b5bac1',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
    elapsed: {
        fontSize: 11, color: '#4e5058',
    },
    compact: {
        display: 'flex', alignItems: 'center', gap: 4,
    },
    compactText: {
        fontSize: 11, color: '#b5bac1',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        maxWidth: 120,
    },
};

export default memo(ActivityStatus);
