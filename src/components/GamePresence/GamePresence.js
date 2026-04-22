import { useState, useEffect, useMemo } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import { API_BASE_URL } from '../../utils/constants';
import './GamePresence.css';
import { SpotifyCard } from './SpotifyCard';
import { RichPresenceCard } from './RichPresenceCard';
import { PlaytimeStats } from './PlaytimeStats';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

export { ActivityBadge } from './ActivityBadge';
export { RichPresenceCard } from './RichPresenceCard';
export { SpotifyCard } from './SpotifyCard';
export { CustomStatusInput } from './CustomStatusInput';
export { PlaytimeStats } from './PlaytimeStats';

const GamePresence = ({ userId, username, showStats = false }) => {
    const { t } = useTranslation();
    const [activities, setActivities] = useState([]);
    const [customStatus, setCustomStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const token = getToken();
                const url = username
                    ? `${API_BASE_URL}/presence/activity/${username}/`
                    : `${API_BASE_URL}/presence/activity/`;
                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setActivities(data.activities || []);
                    setCustomStatus(data.custom_status);
                }
            } catch (error) {
                logger.error('Activity fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchActivity();
        const interval = setInterval(fetchActivity, 30000);
        return () => clearInterval(interval);
    }, [username, userId]);

    const sortedActivities = useMemo(() => {
        const priority = { streaming: 1, playing: 2, listening: 3, watching: 4 };
        return [...activities].sort((a, b) => (priority[a.type] || 5) - (priority[b.type] || 5));
    }, [activities]);

    if (isLoading) return <div className="game-presence-loading">{t('common.loading')}</div>;

    return (
        <div aria-label={t('gamePresence.container', 'Game presence')} className="game-presence">
            {customStatus && (
                <div className="gp-custom-status">
                    {customStatus.emoji && (
                        <span className="gp-cs-emoji">{customStatus.emoji}</span>
                    )}
                    <span className="gp-cs-text">{customStatus.text}</span>
                </div>
            )}
            {sortedActivities.length > 0 ? (
                <div className="gp-activities">
                    {sortedActivities.map((activity, idx) =>
                        activity.type === 'listening' ? (
                            <SpotifyCard key={`item-${idx}`} activity={activity} />
                        ) : (
                            <RichPresenceCard key={`item-${idx}`} activity={activity} />
                        )
                    )}
                </div>
            ) : (
                !customStatus && (
                    <div className="gp-no-activity">
                        <span>{t('no_current_activity')}</span>
                    </div>
                )
            )}
            {showStats && <PlaytimeStats username={username} />}
        </div>
    );
};

GamePresence.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    showStats: PropTypes.bool,
};
export default GamePresence;
