// frontend/src/VoiceChatPanel/MinimizedView.js
// ?? Kk Ada - Minimized Voice Panel (Discord Tarzi)

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Draggable from 'react-draggable';
import MiniButton from './MiniButton';
import { getDeterministicAvatarFallback } from './avatarUtils';

// -- extracted inline style constants --

const MinimizedView = React.memo(
    ({
        roomName,
        userCount,
        combinedUsers,
        currentUser,
        onToggleMinimize,
        onContextMenu,
        getUserAvatar,
        // Voice controls
        isMuted,
        isCameraOn,
        isScreenSharing,
        toggleMute,
        toggleCamera,
        toggleScreenShare,
        leaveVoice,
    }) => {
        const nodeRef = useRef(null);
        const { t } = useTranslation();

        return (
            <Draggable
                nodeRef={nodeRef}
                handle=".mini-drag-handle"
                defaultPosition={{ x: 20, y: window.innerHeight - 180 }}
                bounds="parent"
            >
                <div ref={nodeRef}>
                    {/* MINI HEADER */}
                    <div className="mini-drag-handle">
                        <div />
                        <span>?? {roomName}</span>
                        <div>?? {userCount}</div>
                        <button
                            aria-label={t('common.minimize', 'Minimize')}
                            onClick={onToggleMinimize}
                            onMouseEnter={(e) =>
                                (e.target.style.background = 'rgba(255, 255, 255, 0.2)')
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.background = 'rgba(255, 255, 255, 0.1)')
                            }
                        >
                            ?? {t('voice.expand', 'Aç')}
                        </button>
                    </div>

                    {/* KULLANICILAR */}
                    <div>
                        {combinedUsers.slice(0, 3).map((user) => (
                            <div
                                key={user.username}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    if (user.username !== currentUser?.username) {
                                        onContextMenu({
                                            user,
                                            position: { x: e.clientX, y: e.clientY },
                                        });
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    if (user.username !== currentUser?.username) {
                                        onContextMenu({
                                            user,
                                            position: { x: e.clientX, y: e.clientY },
                                        });
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '8px',
                                    background: user.isTalking
                                        ? 'rgba(67, 181, 129, 0.15)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px',
                                    border: user.isTalking
                                        ? '1px solid rgba(67, 181, 129, 0.4)'
                                        : '1px solid transparent',
                                    transition: 'all 0.2s',
                                    cursor:
                                        user.username !== currentUser?.username
                                            ? 'pointer'
                                            : 'default',
                                }}
                                onMouseEnter={(e) => {
                                    if (user.username !== currentUser?.username) {
                                        e.currentTarget.style.background =
                                            'rgba(67, 181, 129, 0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = user.isTalking
                                        ? 'rgba(67, 181, 129, 0.15)'
                                        : 'rgba(255, 255, 255, 0.05)';
                                }}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                <img
                                    src={getUserAvatar(user.username)}
                                    alt={user.username}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = getDeterministicAvatarFallback(
                                            user.username,
                                            64
                                        );
                                    }}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: user.isTalking
                                            ? '2px solid #23a559'
                                            : '2px solid rgba(255, 255, 255, 0.15)',
                                        boxShadow: user.isTalking
                                            ? '0 0 10px rgba(67, 181, 129, 0.5)'
                                            : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                                <div>
                                    <div>
                                        {user.username}{' '}
                                        {user.isLocal && `(${t('voice.you', 'Sen')})`}
                                    </div>
                                    <div>
                                        {user.isMuted
                                            ? `?? ${t('voice.muted', 'Susturuldu')}`
                                            : user.isTalking
                                              ? `?? ${t('voice.talking', 'Konusuyor')}`
                                              : `??? ${t('voice.active', 'Aktif')}`}
                                    </div>
                                </div>
                                {user.isCameraOn && <span>??</span>}
                                {user.isScreenSharing && <span>???</span>}
                            </div>
                        ))}
                        {userCount > 3 && (
                            <div>
                                +{userCount - 3} {t('voice.more', 'daha...')}
                            </div>
                        )}
                    </div>

                    {/* MINI CONTROLS */}
                    <div>
                        <MiniButton
                            icon={isMuted ? '??' : '??'}
                            active={!isMuted}
                            onClick={toggleMute}
                            title={isMuted ? t('voice.unmute') : t('voice.mute')}
                        />
                        <MiniButton
                            icon={isCameraOn ? '??' : '??'}
                            active={isCameraOn}
                            onClick={toggleCamera}
                            title={isCameraOn ? t('voice.stopCamera') : t('voice.camera')}
                        />
                        <MiniButton
                            icon="???"
                            active={isScreenSharing}
                            onClick={toggleScreenShare}
                            title={
                                isScreenSharing
                                    ? t('voice.stopScreenShare')
                                    : t('voice.screenShare')
                            }
                        />
                        <MiniButton
                            icon="?"
                            danger
                            onClick={leaveVoice}
                            title={t('voice.leave')}
                        />
                    </div>
                </div>
            </Draggable>
        );
    }
);

MinimizedView.displayName = 'MinimizedView';

MinimizedView.propTypes = {
    roomName: PropTypes.string,
    userCount: PropTypes.number,
    combinedUsers: PropTypes.array,
    currentUser: PropTypes.object,
    onToggleMinimize: PropTypes.func,
    onContextMenu: PropTypes.func,
    getUserAvatar: PropTypes.func,
    isCameraOn: PropTypes.bool,
    isScreenSharing: PropTypes.bool,
    toggleMute: PropTypes.func,
    toggleCamera: PropTypes.func,
    toggleScreenShare: PropTypes.func,
    leaveVoice: PropTypes.object,
};
export default MinimizedView;
