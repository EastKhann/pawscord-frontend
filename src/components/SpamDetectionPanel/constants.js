import {
    FaCommentSlash, FaHistory, FaAt, FaLink,
    FaExclamationTriangle, FaBan, FaShieldAlt
} from 'react-icons/fa';

export const PATTERN_WEIGHTS = {
    rapidMessages: 0.3,
    duplicateContent: 0.25,
    mentionSpam: 0.2,
    linkSpam: 0.15,
    capsLock: 0.05,
    zalgoText: 0.05
};

export const SENSITIVITY_PRESETS = {
    low: { messagesPerMinute: 15, duplicateThreshold: 5, mentionLimit: 10, linkLimit: 5, capsPercentage: 80 },
    medium: { messagesPerMinute: 10, duplicateThreshold: 3, mentionLimit: 5, linkLimit: 3, capsPercentage: 70 },
    high: { messagesPerMinute: 7, duplicateThreshold: 2, mentionLimit: 3, linkLimit: 2, capsPercentage: 60 },
    aggressive: { messagesPerMinute: 5, duplicateThreshold: 2, mentionLimit: 2, linkLimit: 1, capsPercentage: 50 }
};

export const PATTERN_LABELS = {
    rapidMessages: 'Hızlı Mesaj',
    duplicateContent: 'Tekrarlanan İçerik',
    mentionSpam: 'Etiket Spam',
    linkSpam: 'Link Spam',
    capsLock: 'BÜYÜK HARF',
    zalgoText: 'Zalgo Metin'
};

export const ACTION_LABELS = { warn: 'Uyar', mute: 'Sustur', kick: 'At', ban: 'Yasakla' };

export const getPatternIcon = (type) => {
    const icons = {
        rapidMessages: <FaCommentSlash />,
        duplicateContent: <FaHistory />,
        mentionSpam: <FaAt />,
        linkSpam: <FaLink />,
        capsLock: <FaExclamationTriangle />,
        zalgoText: <FaBan />
    };
    return icons[type] || <FaShieldAlt />;
};

export const getActionColor = (action) => {
    const colors = { warn: '#faa61a', mute: '#5865f2', kick: '#f04747', ban: '#ed4245' };
    return colors[action] || '#72767d';
};
