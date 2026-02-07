// frontend/src/components/ChannelTypeIcons.js
// 🔥 FEATURE 13: Channel type icons for sidebar
// Returns appropriate icon based on channel_type

import React, { memo } from 'react';
import { FaHashtag, FaVolumeUp, FaBullhorn, FaBookOpen, FaLock, FaCog, FaTheaterMasks, FaGamepad, FaNewspaper } from 'react-icons/fa';

const CHANNEL_ICONS = {
    text: { icon: FaHashtag, color: '#949ba4' },
    voice: { icon: FaVolumeUp, color: '#3ba55c' },
    announcement: { icon: FaBullhorn, color: '#faa61a' },
    forum: { icon: FaBookOpen, color: '#5865f2' },
    stage: { icon: FaTheaterMasks, color: '#e91e63' },
    rules: { icon: FaNewspaper, color: '#faa61a' },
    private: { icon: FaLock, color: '#949ba4' },
    gaming: { icon: FaGamepad, color: '#3ba55c' },
    settings: { icon: FaCog, color: '#949ba4' },
};

const ChannelTypeIcon = ({ type = 'text', size = 16, style = {} }) => {
    const config = CHANNEL_ICONS[type] || CHANNEL_ICONS.text;
    const Icon = config.icon;
    return <Icon style={{ color: config.color, fontSize: size, flexShrink: 0, ...style }} />;
};

export default memo(ChannelTypeIcon);
