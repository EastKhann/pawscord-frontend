import { useState, useEffect } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';

export const PlaytimeStats = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const url = username ? `${API_BASE_URL}/presence/playtime/${username}/` : `${API_BASE_URL}/presence/playtime/`;
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (response.ok) setStats(await response.json());
      } catch (error) {
        console.error('Playtime stats error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [username]);

  if (isLoading) return <div className="playtime-loading">Loading stats...</div>;
  if (!stats?.games?.length) return <div className="playtime-empty"><FaGamepad /><p>No games played yet</p></div>;

  return (
    <div className="playtime-stats">
      <div className="ps-header">
        <h3>{'🎮'} Game Activity</h3>
        <span className="ps-total">{stats.total_playtime} total</span>
      </div>
      <div className="ps-games">
        {stats.games.map((game, idx) => (
          <div key={idx} className="ps-game">
            <div className="ps-game-icon">{game.icon ? <img src={game.icon} alt={game.game} /> : <FaGamepad />}</div>
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
