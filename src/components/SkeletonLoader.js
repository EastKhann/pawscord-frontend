// frontend/src/components/SkeletonLoader.js
import React from 'react';

/**
 * 💀 Skeleton Loader - Loading state için placeholder
 * Lazy load componentler yüklenirken gösterilir
 */

export const MessageSkeleton = () => (
    <div style={{
        padding: '12px 16px',
        display: 'flex',
        gap: '12px',
        animation: 'pulse 1.5s ease-in-out infinite'
    }}>
        {/* Avatar skeleton */}
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
        }} />

        {/* Content skeleton */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{
                width: '120px',
                height: '14px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
            }} />
            <div style={{
                width: '100%',
                height: '40px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
            }} />
        </div>
    </div>
);

export const UserListSkeleton = () => (
    <div style={{ padding: '8px' }}>
        {[...Array(8)].map((_, i) => (
            <div key={i} style={{
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '4px'
            }}>
                {/* Avatar */}
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    animationDelay: `${i * 0.1}s`
                }} />

                {/* Name */}
                <div style={{
                    width: `${80 + Math.random() * 60}px`,
                    height: '12px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    animationDelay: `${i * 0.1}s`
                }} />
            </div>
        ))}
    </div>
);

export const ModalSkeleton = () => (
    <div style={{
        padding: '24px',
        background: '#2f3136',
        borderRadius: '8px',
        width: '500px',
        maxWidth: '90vw'
    }}>
        {/* Header */}
        <div style={{
            width: '200px',
            height: '24px',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            marginBottom: '20px'
        }} />

        {/* Content */}
        {[...Array(3)].map((_, i) => (
            <div key={i} style={{
                width: '100%',
                height: '60px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                marginBottom: '12px',
                animationDelay: `${i * 0.15}s`
            }} />
        ))}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            {[...Array(2)].map((_, i) => (
                <div key={i} style={{
                    width: '100px',
                    height: '36px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite',
                    animationDelay: `${i * 0.2}s`
                }} />
            ))}
        </div>
    </div>
);

export const PanelSkeleton = () => (
    <div style={{
        padding: '16px',
        width: '100%',
        height: '100%',
        background: '#2f3136'
    }}>
        {/* Title */}
        <div style={{
            width: '150px',
            height: '20px',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            marginBottom: '16px'
        }} />

        {/* Items */}
        {[...Array(6)].map((_, i) => (
            <div key={i} style={{
                width: '100%',
                height: '48px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #2f3136 25%, #36393f 50%, #2f3136 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                marginBottom: '8px',
                animationDelay: `${i * 0.1}s`
            }} />
        ))}
    </div>
);

export const SpinnerLoader = ({ size = 40, color = '#5865f2' }) => (
    <div style={{
        width: size,
        height: size,
        border: `4px solid rgba(88, 101, 242, 0.1)`,
        borderTop: `4px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
    }} />
);

export const LoadingOverlay = ({ message = 'Yükleniyor...' }) => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        zIndex: 9999
    }}>
        <SpinnerLoader size={60} />
        <p style={{ color: '#fff', fontSize: '16px' }}>{message}</p>
    </div>
);

// CSS Animation'ları
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}

export default {
    MessageSkeleton,
    UserListSkeleton,
    ModalSkeleton,
    PanelSkeleton,
    SpinnerLoader,
    LoadingOverlay
};


