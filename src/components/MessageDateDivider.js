// frontend/src/components/MessageDateDivider.js
// 📅 FEATURE 6: Message Date Divider
// Groups messages by date with visual separator

import { memo } from 'react';

/**
 * Format a date string into a human-readable Turkish date label.
 * @param {string} dateStr - ISO date string
 * @returns {string} Localized date label (e.g. "Bugün", "Dün", "Pazartesi")
 */
const formatDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (msgDate.getTime() === today.getTime()) return 'Bugün';
    if (msgDate.getTime() === yesterday.getTime()) return 'Dün';

    const diffDays = Math.floor((today.getTime() - msgDate.getTime()) / 86400000);
    if (diffDays < 7) {
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        return days[date.getDay()];
    }

    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

/**
 * Date separator between message groups.
 * Displays localized Turkish date labels (Bugün, Dün, day names, full date).
 * @param {Object} props
 * @param {string} props.date - ISO date string for the divider
 */
const MessageDateDivider = ({ date }) => {
    return (
        <div style={S.container}>
            <div style={S.line} />
            <span style={S.label}>{formatDateLabel(date)}</span>
            <div style={S.line} />
        </div>
    );
};

const S = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 0 8px',
        userSelect: 'none',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
    label: {
        color: '#949ba4',
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        padding: '2px 8px',
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
};

const MemoizedMessageDateDivider = memo(MessageDateDivider);
MemoizedMessageDateDivider.displayName = 'MessageDateDivider';

export default MemoizedMessageDateDivider;
