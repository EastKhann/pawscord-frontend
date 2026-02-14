export const getRuleIcon = (type) => {
    switch (type) {
        case 'toxic': return '\u2620\uFE0F';
        case 'spam': return '\uD83D\uDEAB';
        case 'keyword': return '\uD83D\uDD24';
        case 'link': return '\uD83D\uDD17';
        case 'caps': return '\uD83D\uDCE2';
        default: return '\u2699\uFE0F';
    }
};

export const getRuleLabel = (type) => {
    switch (type) {
        case 'toxic': return 'Toxic Language';
        case 'spam': return 'Spam Detection';
        case 'keyword': return 'Keyword Filter';
        case 'link': return 'Link Filter';
        case 'caps': return 'Excessive Caps';
        default: return type;
    }
};

export const getActionLabel = (action) => {
    switch (action) {
        case 'warn': return '\u26A0\uFE0F Warn';
        case 'delete': return '\uD83D\uDDD1\uFE0F Delete';
        case 'timeout': return '\u23F1\uFE0F Timeout';
        case 'kick': return '\uD83D\uDC62 Kick';
        case 'ban': return '\uD83D\uDD28 Ban';
        default: return action;
    }
};

export const getActionIcon = (action) => {
    switch (action) {
        case 'warn': return '\u26A0\uFE0F';
        case 'delete': return '\uD83D\uDDD1\uFE0F';
        case 'timeout': return '\u23F1\uFE0F';
        case 'ban': return '\uD83D\uDD28';
        default: return '\u2753';
    }
};

export const getActionStyle = (action) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: action === 'ban' ? '#ed4245' : action === 'timeout' ? '#f0b132' : '#5865f2',
    color: '#fff'
});
