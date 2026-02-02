import React from 'react';
import './SkeletonScreen.css';

export const MessageSkeleton = () => (
    <div className="skeleton-message">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-content">
            <div className="skeleton-username"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
        </div>
    </div>
);

export const ServerListSkeleton = () => (
    <div className="skeleton-server-list">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton-server-icon"></div>
        ))}
    </div>
);

export const ChatSkeleton = () => (
    <div className="skeleton-chat">
        <div className="skeleton-header">
            <div className="skeleton-channel-name"></div>
            <div className="skeleton-icons"></div>
        </div>
        <div className="skeleton-messages">
            {[...Array(12)].map((_, i) => (
                <MessageSkeleton key={i} />
            ))}
        </div>
    </div>
);

export const RoomListSkeleton = () => (
    <div className="skeleton-room-list">
        <div className="skeleton-server-header"></div>
        {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-room-item"></div>
        ))}
    </div>
);

export const UserProfileSkeleton = () => (
    <div className="skeleton-profile">
        <div className="skeleton-banner"></div>
        <div className="skeleton-profile-avatar"></div>
        <div className="skeleton-profile-name"></div>
        <div className="skeleton-profile-bio"></div>
        <div className="skeleton-profile-stats"></div>
    </div>
);

export default { MessageSkeleton, ServerListSkeleton, ChatSkeleton, RoomListSkeleton, UserProfileSkeleton };


