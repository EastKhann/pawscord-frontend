// components/LoadingSkeleton.js
// 💀 Loading Skeleton Components

import React from 'react';
import './LoadingSkeleton.css';

export const MessageSkeleton = () => (
  <div className="message-skeleton">
    <div className="skeleton-avatar" />
    <div className="skeleton-content">
      <div className="skeleton-line skeleton-line-short" />
      <div className="skeleton-line skeleton-line-medium" />
      <div className="skeleton-line skeleton-line-long" />
    </div>
  </div>
);

export const UserListSkeleton = () => (
  <div className="user-list-skeleton">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className="user-skeleton">
        <div className="skeleton-avatar-small" />
        <div className="skeleton-line skeleton-line-short" />
      </div>
    ))}
  </div>
);

export const ServerListSkeleton = () => (
  <div className="server-list-skeleton">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="server-skeleton">
        <div className="skeleton-server-icon" />
      </div>
    ))}
  </div>
);

export const RoomListSkeleton = () => (
  <div className="room-list-skeleton">
    {[1, 2, 3].map(i => (
      <div key={i} className="room-skeleton">
        <div className="skeleton-line skeleton-line-medium" />
      </div>
    ))}
  </div>
);

export default {
  MessageSkeleton,
  UserListSkeleton,
  ServerListSkeleton,
  RoomListSkeleton
};



