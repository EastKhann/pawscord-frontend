// Shared activity freshness helper
// Activity older than 5 minutes (no fresh WS update) is considered stale
const ACTIVITY_EXPIRY_MS = 5 * 60 * 1000;

export const getFreshActivity = (activity) => {
    if (!activity || (typeof activity === 'object' && Object.keys(activity).length === 0)) return null;
    const receivedAt = activity._received_at;
    if (receivedAt && (Date.now() - receivedAt) > ACTIVITY_EXPIRY_MS) return null;
    return activity;
};
