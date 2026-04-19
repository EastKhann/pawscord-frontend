import {
    FaCommentSlash,
    FaHistory,
    FaAt,
    FaLink,
    FaExclamationTriangle,
    FaBan,
    FaShieldAlt,
} from 'react-icons/fa';

export const PATTERN_WEIGHTS = {
    rapidMessages: 0.3,
    duplicateContent: 0.25,
    mentionSpam: 0.2,
    linkSpam: 0.15,
    capsLock: 0.05,
    zalgoText: 0.05,
};

export const SENSITIVITY_PRESETS = {
    low: {
        messagesThuMinute: 15,
        duplicateThreshold: 5,
        mentionLimit: 10,
        linkLimit: 5,
        capsPercentage: 80,
    },
    medium: {
        messagesThuMinute: 10,
        duplicateThreshold: 3,
        mentionLimit: 5,
        linkLimit: 3,
        capsPercentage: 70,
    },
    high: {
        messagesThuMinute: 7,
        duplicateThreshold: 2,
        mentionLimit: 3,
        linkLimit: 2,
        capsPercentage: 60,
    },
    aggressive: {
        messagesThuMinute: 5,
        duplicateThreshold: 2,
        mentionLimit: 2,
        linkLimit: 1,
        capsPercentage: 50,
    },
};

export const PATTERN_LABELS = {
    rapidMessages: { key: 'spamDetection.rapidMessages', fallback: 'Rapid Messages' },
    duplicateContent: { key: 'spamDetection.duplicateContent', fallback: 'Duplicate Content' },
    mentionSpam: { key: 'spamDetection.mentionSpam', fallback: 'Mention Spam' },
    linkSpam: { key: 'spamDetection.linkSpam', fallback: 'Link Spam' },
    capsLock: { key: 'spamDetection.capsLock', fallback: 'CAPS LOCK' },
    zalgoText: { key: 'spamDetection.zalgoText', fallback: 'Zalgo Text' },
};

export const ACTION_LABELS = {
    warn: { key: 'spamDetection.actionWarn', fallback: 'Warn' },
    mute: { key: 'spamDetection.actionMute', fallback: 'Mute' },
    kick: { key: 'spamDetection.actionKick', fallback: 'Kick' },
    ban: { key: 'spamDetection.actionBan', fallback: 'Ban' },
};

export const getPatternIcon = (type) => {
    const icons = {
        rapidMessages: <FaCommentSlash />,
        duplicateContent: <FaHistory />,
        mentionSpam: <FaAt />,
        linkSpam: <FaLink />,
        capsLock: <FaExclamationTriangle />,
        zalgoText: <FaBan />,
    };
    return icons[type] || <FaShieldAlt />;
};

export const getActionColor = (action) => {
    const colors = { warn: '#f0b232', mute: '#5865f2', kick: '#f23f42', ban: '#f23f42' };
    return colors[action] || '#949ba4';
};
