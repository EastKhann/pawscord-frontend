// frontend/src/components/ScrollToBottomButton.js
// ⬇️ FEATURE 4: Scroll to Bottom FAB with Unread Count
// Message listnde aşağı kaydırmak for floating buton

import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';

/**
 * Floating action button to scroll to the bottom of the message list.
 * Shows an optional unread badge count.
 * @param {Object} props
 * @param {() => void} props.onClick - Click handler to scroll to bottom
 * @param {number} [props.unreadCount=0] - Number of unread messages to show in badge
 * @param {boolean} [props.visible=true] - Whether the button is visible
 */
const ScrollToBottomButton = ({ onClick, unreadCount = 0, visible = true }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    if (!visible) return null;

    return (
        <button
            onClick={onClick}
            style={S.fab}
            className="scroll-to-bottom-fab"
            title="En alta git"
            aria-label={
                unreadCount > 0
                    ? `Scroll to bottom (${unreadCount > 99 ? '99+' : unreadCount} unread messages)`
                    : 'En alta git'
            }
        >
            {unreadCount > 0 && (
                <div style={S.badge} aria-hidden="true">
                    {unreadCount > 99 ? '99+' : unreadCount}
                </div>
            )}
            <FaChevronDown style={S.font} />
        </button>
    );
};

const S = {
    fab: {
        position: 'absolute',
        bottom: 90,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: '#14182e',
        border: '1px solid rgba(88, 101, 242, 0.2)',
        color: '#b5bac1',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 18px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
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
    font: { fontSize: 16 },
};

if (typeof document !== 'undefined') {
    const id = 'scroll-bottom-fab-css';
    if (!document.getElementById(id)) {
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `.scroll-to-bottom-fab:hover { background-color: #182135 !important; transform: scale(1.1); box-shadow: 0 6px 20px rgba(0,0,0,0.6) !important; }`;
        document.head.appendChild(s);
    }
}

const MemoizedScrollToBottomButton = memo(ScrollToBottomButton);
MemoizedScrollToBottomButton.displayName = 'ScrollToBottomButton';

MemoizedScrollToBottomButton.propTypes = {
    onClick: PropTypes.func,
    unreadCount: PropTypes.number,
    visible: PropTypes.bool,
};
export default MemoizedScrollToBottomButton;
