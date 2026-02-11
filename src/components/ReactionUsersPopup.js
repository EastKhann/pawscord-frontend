// frontend/src/components/ReactionUsersPopup.js
// 👥 FEATURE 3: Reaction Users Popup
// Hover on a reaction to see who reacted

import { useState, useRef, useCallback, memo } from 'react';
import ReactDOM from 'react-dom';

const ReactionUsersPopup = ({ emoji, users = [], count, hasCurrentUser, onToggle, currentUsername }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
    const btnRef = useRef(null);
    const timerRef = useRef(null);

    const handleMouseEnter = useCallback(() => {
        timerRef.current = setTimeout(() => {
            if (btnRef.current) {
                const rect = btnRef.current.getBoundingClientRect();
                setPopupPos({
                    top: rect.top - 8,
                    left: rect.left + rect.width / 2,
                });
                setShowPopup(true);
            }
        }, 300);
    }, []);

    const handleMouseLeave = useCallback(() => {
        clearTimeout(timerRef.current);
        setShowPopup(false);
    }, []);

    const userList = users.slice(0, 20);
    const remaining = count - userList.length;

    return (
        <>
            <button
                ref={btnRef}
                onClick={() => onToggle?.(emoji)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    ...S.btn,
                    ...(hasCurrentUser ? S.btnActive : {}),
                }}
            >
                <span style={S.emoji}>{emoji}</span>
                <span style={S.count}>{count}</span>
            </button>

            {showPopup && userList.length > 0 && ReactDOM.createPortal(
                <div
                    style={{
                        ...S.popup,
                        top: popupPos.top,
                        left: popupPos.left,
                        transform: 'translate(-50%, -100%)',
                    }}
                    onMouseEnter={() => clearTimeout(timerRef.current)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div style={S.popupEmoji}>{emoji}</div>
                    <div style={S.userList}>
                        {userList.map((user, i) => {
                            const name = typeof user === 'string' ? user : (user.display_name || user.username || 'Bilinmeyen');
                            const isMe = name === currentUsername;
                            return (
                                <div key={i} style={S.userRow}>
                                    <span style={{ ...S.userName, ...(isMe ? S.userNameMe : {}) }}>
                                        {name}
                                    </span>
                                    {isMe && <span style={S.youBadge}>sen</span>}
                                </div>
                            );
                        })}
                        {remaining > 0 && (
                            <div style={S.moreText}>ve {remaining} kişi daha...</div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

const S = {
    btn: {
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '2px 8px', backgroundColor: 'rgba(88,101,242,0.1)',
        border: '1px solid rgba(88,101,242,0.3)', borderRadius: 12,
        cursor: 'pointer', transition: 'all 0.2s', fontSize: 13, color: '#dcddde',
    },
    btnActive: {
        backgroundColor: 'rgba(88,101,242,0.25)',
        borderColor: '#5865f2',
        boxShadow: '0 0 8px rgba(88,101,242,0.3)',
    },
    emoji: { fontSize: 14, lineHeight: 1 },
    count: { fontSize: 11, fontWeight: 600, color: '#dcddde' },
    popup: {
        position: 'fixed', zIndex: 20000,
        backgroundColor: '#18191c', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, padding: '10px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        maxWidth: 220, minWidth: 120,
        animation: 'reactionPopupIn 0.15s ease-out',
    },
    popupEmoji: { fontSize: 24, textAlign: 'center', marginBottom: 8 },
    userList: { display: 'flex', flexDirection: 'column', gap: 4 },
    userRow: { display: 'flex', alignItems: 'center', gap: 6 },
    userName: { color: '#dcddde', fontSize: 12, fontWeight: 500 },
    userNameMe: { color: '#5865f2' },
    youBadge: {
        fontSize: 9, color: '#5865f2', backgroundColor: 'rgba(88,101,242,0.15)',
        padding: '1px 5px', borderRadius: 4, fontWeight: 600,
    },
    moreText: { color: '#949ba4', fontSize: 11, fontStyle: 'italic', marginTop: 2 },
};

if (typeof document !== 'undefined') {
    const id = 'reaction-popup-css';
    if (!document.getElementById(id)) {
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `@keyframes reactionPopupIn { from { opacity:0; transform: translate(-50%,-100%) translateY(8px); } to { opacity:1; transform: translate(-50%,-100%) translateY(0); } }`;
        document.head.appendChild(s);
    }
}

export default memo(ReactionUsersPopup);
