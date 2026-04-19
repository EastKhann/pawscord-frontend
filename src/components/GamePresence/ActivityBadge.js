import { FaGamepad, FaTwitch, FaSpotify, FaYoutube } from 'react-icons/fa';

import PropTypes from 'prop-types';


const S = {
  txt: { color },
};

const ICONS = { playing: FaGamepad, streaming: FaTwitch, listening: FaSpotify, watching: FaYoutube };
const COLORS = { playing: '#23a559', streaming: '#9146ff', listening: '#1db954', watching: '#ff0000' };

export const ActivityBadge = ({ activity, size = 'medium' }) => {

  if (!activity) return null;
  const Icon = ICONS[activity.type] || FaGamepad;
  const color = COLORS[activity.type] || '#5865f2';

  return (
    <div aria-label="activity badge" className={`activity-badge activity-badge-${size}`} style={{ borderColor: color }}>
      <span className="activity-icon" style={S.txt}<Icon /></span>
      <span className="activity-name">{activity.name}</span>
    </div >
  );
};

ActivityBadge.propTypes = {
  activity: PropTypes.object,
  size: PropTypes.number,
};