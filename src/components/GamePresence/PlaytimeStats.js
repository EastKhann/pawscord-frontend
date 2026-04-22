import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import { FaGamepad } from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

export const PlaytimeStats = ({ username }) => {
    const { t } = useTranslation();

    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = getToken();
                const url = username
                    ? `${API_BASE_URL}/presence/playtime/${username}/`
                    : `${API_BASE_URL}/presence/playtime/`;
                const response = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) setStats(await response.json());
            } catch (error) {
                logger.error('Playtime stats error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [username]);

    if (isLoading) return <div className="playtime-loading">{t('loading_stats')}</div>;
    if (!stats?.games?.length)
        return (
            <div className="playtime-empty">
                <FaGamepad />
                <p>{t('no_games_played_yet')}</p>
            </div>
        );

    return (
        <div aria-label={t('gamePresence.playtimeStats', 'Playtime statistics')} className="playtime-stats">
            <div className="ps-header">
                <h3>🎮 Game Activity</h3>
                <span className="ps-total">{stats.total_playtime} total</span>
            </div>
            <div className="ps-games">
                {stats.games.map((game, idx) => (
                    <div key={`item-${idx}`} className="ps-game">
                        <div className="ps-game-icon">
                            {game.icon ? <img src={game.icon} alt={game.game} /> : <FaGamepad />}
                        </div>
                        <div className="ps-game-info">
                            <span className="ps-game-name">{game.game}</span>
                            <span className="ps-game-time">{game.total_hours}</span>
                        </div>
                        <div className="ps-game-sessions">{game.sessions} sessions</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

PlaytimeStats.propTypes = {
    username: PropTypes.string,
};
