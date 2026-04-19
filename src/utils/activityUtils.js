// Shared activity freshness helper
// Activity older than 5 minutes (no fresh WS update) is considered stale
// PropTypes validation: N/A for this module (hook/utility — no React props interface)
// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
const ACTIVITY_EXPIRY_MS = 5 * 60 * 1000;

const isFreshTimestamp = (timestamp) => {
    if (!timestamp) return false;
    const parsed = new Date(timestamp).getTime();
    if (Number.isNaN(parsed)) return false;
    return Date.now() - parsed <= ACTIVITY_EXPIRY_MS;
};

export const getFreshActivity = (activity) => {
    if (!activity || (typeof activity === 'object' && Object.keys(activity).length === 0))
        return null;

    const nextActivity = { ...activity };

    const receivedAt = nextActivity._received_at;
    if (receivedAt && Date.now() - receivedAt > ACTIVITY_EXPIRY_MS) return null;

    const spotifyFresh = isFreshTimestamp(nextActivity.spotify?.timestamp);
    const steamFresh = isFreshTimestamp(nextActivity.steam?.timestamp);
    const legacyFresh = isFreshTimestamp(nextActivity.timestamp);

    if (nextActivity.spotify && !spotifyFresh) {
        delete nextActivity.spotify;
    }

    if (nextActivity.steam && !steamFresh) {
        delete nextActivity.steam;
    }

    if (!receivedAt && !legacyFresh && !nextActivity.spotify && !nextActivity.steam) {
        return null;
    }

    if (typeof nextActivity === 'object' && Object.keys(nextActivity).length === 0) return null;

    return nextActivity;
};
