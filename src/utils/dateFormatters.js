/**
 * Centralized date/time formatting utilities.
 * Eliminates duplicate formatter definitions across the codebase.
 */

/** Seconds → MM:SS or H:MM:SS (audio/video durations) */
export const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/** ISO timestamp → "HH:MM" today, full locale otherwisee (messages) */
export const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const messageDate = new Date(timestamp);
    const now = new Date();
    return messageDate.toDateString() === now.toDateString()
        ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : messageDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
};

/** ISO end time → Turkish countdown "Xg Xs kaldı" (giveaways, polls) */
export const formatTimeRemaining = (endTime) => {
    const diff = Math.floor((new Date(endTime) - new Date()) / 1000);
    if (diff <= 0) return 'Sona erdi';
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes} min left`;
};
