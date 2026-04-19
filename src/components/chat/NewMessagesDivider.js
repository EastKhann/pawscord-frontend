// frontend/src/components/NewMessagesDivider.js
// 🆕 FEATURE 12: New Messages Divider
// Shows "X new message" separator between old and new messages

import { useState, memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Visual divider showing how many new (unread) messages are below.
 * @param {Object} props
 * @param {number} [props.count=0] - Number of new unread messages
 */
const NewMessagesDivider = ({ count = 0 }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    return (
        <div aria-label="new messages divider" style={S.container}>
            <div style={S.line} />
            <span style={S.label}>{count > 0 ? `${count} new message` : 'New messages'}</span>
            <div style={S.line} />
        </div>
    );
};

const S = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        userSelect: 'none',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#da373c',
    },
    label: {
        color: '#da373c',
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
    },
};

const MemoizedNewMessagesDivider = memo(NewMessagesDivider);
MemoizedNewMessagesDivider.displayName = 'NewMessagesDivider';

MemoizedNewMessagesDivider.propTypes = {
    count: PropTypes.number,
};
export default MemoizedNewMessagesDivider;
