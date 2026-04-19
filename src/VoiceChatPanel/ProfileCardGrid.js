// frontend/src/VoiceChatPanel/ProfileCardGrid.js
// 🎨 Profile card grid — shown when no active streams (voice-only users)

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDeterministicAvatarFallback } from './avatarUtils';
import ConnectionQualityIndicator from '../VoiceUserList/ConnectionQualityIndicator';

import PropTypes from 'prop-types';

// -- extracted inline style constants --

const getGridLayout = (count, isMobile) => {
    if (isMobile) return { cols: 1, rows: count };
    if (count <= 1) return { cols: 1, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    return { cols: 4, rows: Math.ceil(count / 4) };
};

const ProfileCardGrid = React.memo(
    ({
        combinedUsers,
        activeSpeaker,
        getUserAvatar,
        setContextMenu,
        connectionQuality = {},
        isMobile,
    }) => {
        const { cols } = getGridLayout(combinedUsers.length, isMobile);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
        const { t } = useTranslation();

        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '32px',
                    padding: isMobile ? '20px' : '48px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                {combinedUsers.map((user) => {
                    const isSpeaking = activeSpeaker === user.username;
                    return (
                        <div
                            key={user.username}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px',
                                padding: '36px 44px',
                                borderRadius: '20px',
                                background: isSpeaking
                                    ? 'linear-gradient(145deg, rgba(88, 101, 242, 0.18) 0%, rgba(67, 181, 129, 0.10) 100%)'
                                    : 'linear-gradient(145deg, rgba(47, 49, 54, 0.6) 0%, rgba(35, 37, 40, 0.8) 100%)',
                                border: isSpeaking
                                    ? '2px solid rgba(67, 181, 129, 0.7)'
                                    : '1px solid rgba(255, 255, 255, 0.06)',
                                boxShadow: isSpeaking
                                    ? '0 0 40px rgba(67, 181, 129, 0.25), 0 8px 32px rgba(0, 0, 0, 0.3)'
                                    : '0 4px 24px rgba(0, 0, 0, 0.25)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                position: 'relative',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                minWidth: isMobile ? '200px' : '220px',
                                maxWidth: '280px',
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`${user.username} profil kartı`}
                            onClick={() =>
                                setContextMenu({
                                    user,
                                    position: {
                                        x: window.innerWidth / 2,
                                        y: window.innerHeight / 2,
                                    },
                                })
                            }
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setContextMenu({
                                        user,
                                        position: {
                                            x: window.innerWidth / 2,
                                            y: window.innerHeight / 2,
                                        },
                                    });
                                }
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = isSpeaking
                                    ? '0 0 40px rgba(67,181,129,0.25), 0 8px 32px rgba(0,0,0,0.3)'
                                    : '0 4px 24px rgba(0,0,0,0.25)';
                            }}
                        >
                            {/* Avatar with speaking ring */}
                            <div
                                style={{
                                    position: 'relative',
                                    padding: '6px',
                                    borderRadius: '50%',
                                    background: isSpeaking
                                        ? 'linear-gradient(135deg, #43b581, #5865f2, #43b581)'
                                        : 'transparent',
                                    backgroundSize: '200% 200%',
                                    animation: isSpeaking
                                        ? 'speakingRing 2s ease infinite'
                                        : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        width: isMobile ? '100px' : '120px',
                                        height: isMobile ? '100px' : '120px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '4px solid #1e1f22',
                                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
                                    }}
                                >
                                    <img
                                        src={getUserAvatar(user.username)}
                                        alt={user.username}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = getDeterministicAvatarFallback(
                                                user.username,
                                                256
                                            );
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                {/* Online dot */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '8px',
                                        right: '8px',
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        background: user.isMuted ? '#f23f42' : '#23a559',
                                        border: '3px solid #1e1f22',
                                        boxShadow: `0 0 8px ${user.isMuted ? 'rgba(242,63,66,0.5)' : 'rgba(35,165,89,0.5)'}`,
                                    }}
                                />
                            </div>

                            {/* Username */}
                            <div
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#fff',
                                    textAlign: 'center',
                                    letterSpacing: '0.2px',
                                    maxWidth: '180px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {user.username}
                            </div>

                            {/* Status text */}
                            <div
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    color: isSpeaking
                                        ? '#43b581'
                                        : user.isMuted
                                          ? '#f23f42'
                                          : 'rgba(255,255,255,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginTop: '-8px',
                                }}
                            >
                                {isSpeaking && (
                                    <>
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                gap: '2px',
                                                alignItems: 'flex-end',
                                                height: '14px',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: '3px',
                                                    background: '#43b581',
                                                    borderRadius: '2px',
                                                    animation: 'wave1 0.8s ease infinite',
                                                }}
                                            />
                                            <span
                                                style={{
                                                    width: '3px',
                                                    background: '#43b581',
                                                    borderRadius: '2px',
                                                    animation: 'wave2 0.8s ease infinite 0.1s',
                                                }}
                                            />
                                            <span
                                                style={{
                                                    width: '3px',
                                                    background: '#43b581',
                                                    borderRadius: '2px',
                                                    animation: 'wave3 0.8s ease infinite 0.2s',
                                                }}
                                            />
                                        </span>{' '}
                                        {t('voice.talking', 'Konuşuyor')}
                                    </>
                                )}
                                {!isSpeaking && user.isMuted && (
                                    <>{t('voice.muted', 'Susturuldu')}</>
                                )}
                                {!isSpeaking && user.isDeafened && (
                                    <>{t('voice.headphonesOff', 'Kulaklık Kapalı')}</>
                                )}
                                {!isSpeaking && !user.isMuted && !user.isDeafened && (
                                    <>{t('voice.active', 'Aktif')}</>
                                )}
                            </div>

                            {/* Connection quality */}
                            {connectionQuality[user.username] && (
                                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                                    <ConnectionQualityIndicator
                                        quality={connectionQuality[user.username].quality}
                                        rtt={connectionQuality[user.username].rtt}
                                        packetLossRate={connectionQuality[user.username].packetLoss}
                                        size={14}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
);

ProfileCardGrid.displayName = 'ProfileCardGrid';

ProfileCardGrid.propTypes = {};

export default ProfileCardGrid;
