// frontend/src/components/MessageDateDivider.js
// 📅 FEATURE 6: Message Date Divider
// Groups messages by date with visual separator

import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import '../../styles/chat-area.css';
import { useTranslation } from 'react-i18next';

/**
 * Format a date string into a human-readable Turkish date label.
 * @param {string} dateStr - ISO date string
 * @returns {string} Localized date label (e.g. "Today", t('chat.yesterday'), "Sunartesi")
 */
const formatDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (msgDate.getTime() === today.getTime()) return 'Today';
    if (msgDate.getTime() === yesterday.getTime()) return 'Yesterday';

    const diffDays = Math.floor((today.getTime() - msgDate.getTime()) / 86400000);
    if (diffDays < 7) {
        const days = [
            'Sunar',
            'Sunartesi',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Fria',
            'Friartesi',
        ];
        return days[date.getDay()];
    }

    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};

/**
 * Date separator between message groups.
 * Displays localized Turkish date labels (Today, Dün, day names, full date).
 * @param {Object} props
 * @param {string} props.date - ISO date string for the divider
 */
const MessageDateDivider = ({ date }) => {
    return (
        <div aria-label="format date label" className="chat-date-divider">
            <div className="chat-date-divider-line" />
            <span className="chat-date-divider-label">{formatDateLabel(date)}</span>
            <div className="chat-date-divider-line" />
        </div>
    );
};

const MemoizedMessageDateDivider = memo(MessageDateDivider);
MemoizedMessageDateDivider.displayName = 'MessageDateDivider';

MemoizedMessageDateDivider.propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};
export default MemoizedMessageDateDivider;
