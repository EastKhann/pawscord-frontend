// frontend/src/components/ScrollToBottomButton.js
// ⬇️ FEATURE 4: Scroll to Bottom FAB with Unread Count
// Mesaj listesinde aşağı kaydırmak için floating buton

import React, { memo } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ScrollToBottomButton = ({ onClick, unreadCount = 0, visible = true }) => {
    if (!visible) return null;

    return (
        <button
            onClick={onClick}
            style={S.fab}
            className="scroll-to-bottom-fab"
            title="En alta git"
        >
            {unreadCount > 0 && (
                <div style={S.badge}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                </div>
            )}
            <FaChevronDown style={{ fontSize: 16 }} />
        </button>
    );
};

const S = {
    fab: {
        position: 'absolute',
        bottom: 90,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#313338',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#dcddde',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.2s ease',
        zIndex: 50,
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -4,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#5865f2',
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 5px',
        boxShadow: '0 2px 6px rgba(88,101,242,0.4)',
    },
};

if (typeof document !== 'undefined') {
    const id = 'scroll-bottom-fab-css';
    if (!document.getElementById(id)) {
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `.scroll-to-bottom-fab:hover { background-color: #404249 !important; transform: scale(1.1); }`;
        document.head.appendChild(s);
    }
}

export default memo(ScrollToBottomButton);
