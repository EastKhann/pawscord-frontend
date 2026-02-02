// Skeleton Screen Component
import React from 'react';
import './AppSkeleton.css';

const AppSkeleton = () => {
    return (
        <div className="app-skeleton">
            <div className="skeleton-server-list">
                <div className="skeleton-server-icon animate-pulse"></div>
                <div className="skeleton-server-icon animate-pulse"></div>
                <div className="skeleton-server-icon animate-pulse"></div>
            </div>
            <div className="skeleton-sidebar">
                <div className="skeleton-channel animate-pulse"></div>
                <div className="skeleton-channel animate-pulse"></div>
                <div className="skeleton-channel animate-pulse"></div>
            </div>
            <div className="skeleton-main">
                <div className="skeleton-header animate-pulse"></div>
                <div className="skeleton-messages">
                    <div className="skeleton-message animate-pulse"></div>
                    <div className="skeleton-message animate-pulse"></div>
                    <div className="skeleton-message animate-pulse"></div>
                </div>
                <div className="skeleton-input animate-pulse"></div>
            </div>
        </div>
    );
};

export default AppSkeleton;


