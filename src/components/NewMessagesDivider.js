// frontend/src/components/NewMessagesDivider.js
// 🆕 FEATURE 12: New Messages Divider
// Shows "X yeni mesaj" separator between old and new messages

import { memo } from 'react';

const NewMessagesDivider = ({ count }) => {
    return (
        <div style={S.container}>
            <div style={S.line} />
            <span style={S.label}>
                {count > 0 ? `${count} yeni mesaj` : 'Yeni mesajlar'}
            </span>
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

export default memo(NewMessagesDivider);
