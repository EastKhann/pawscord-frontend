import { FaGamepad, FaTwitch, FaSpotify, FaYoutube } from 'react-icons/fa';

const ICONS = { playing: FaGamepad, streaming: FaTwitch, listening: FaSpotify, watching: FaYoutube };
const COLORS = { playing: '#43b581', streaming: '#9146ff', listening: '#1db954', watching: '#ff0000' };

export const ActivityBadge = ({ activity, size = 'medium' }) => {
  if (!activity) return null;
  const Icon = ICONS[activity.type] || FaGamepad;
  const color = COLORS[activity.type] || '#7289da';

  return (
    <div className={`activity-badge activity-badge-${size}`} style={{ borderColor: color }}>
      <span className="activity-icon" style={{ color }}><Icon /></span>
      <span className="activity-name">{activity.name}</span>
    </div>
  );
};
