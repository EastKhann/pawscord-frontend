export const getRuleIcon = (type) => {
    switch (type) {
        case 'toxic': return '☠️';
        case 'spam': return '🚫';
        case 'keyword': return '🔤';
        case 'link': return '🔗';
        case 'caps': return '📢';
        default: return '⚙️';
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
        case 'warn': return '⚠️ Warn';
        case 'delete': return '🗑️ Delete';
        case 'timeout': return '⏱️ Timeout';
        case 'kick': return '👢 Kick';
        case 'ban': return '🔨 Ban';
        default: return action;
    }
};

export const getActionIcon = (action) => {
    switch (action) {
        case 'warn': return '⚠️';
        case 'delete': return '🗑️';
        case 'timeout': return '⏱️';
        case 'ban': return '🔨';
        default: return '❓';
    }
};

export const getActionStyle = (action) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: action === 'ban' ? '#f23f42' : action === 'timeout' ? '#f0b132' : '#5865f2',
    color: '#fff'
});
