import { useState, useEffect } from 'react';
import { FaClock, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

const LABELS = { playing: 'Playing', streaming: 'Streaming', listening: 'Listening to', watching: 'Watching', competing: 'Competing in' };

export const RichPresenceCard = ({ activity, expanded = false }) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    if (!activity?.timestamps?.start) return;
    const updateElapsed = () => {
      const diff = Math.floor((new Date() - new Date(activity.timestamps.start)) / 1000);
      const h = Math.floor(diff / 3600), m = Math.floor((diff % 3600) / 60), s = diff % 60;
      setElapsedTime(h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`);
    };
    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [activity]);

  if (!activity) return null;

  return (
    <div className={`rich-presence-card rich-presence-${activity.type} ${expanded ? 'expanded' : ''}`}>
      <div className="rp-header">
        <span className="rp-type">{LABELS[activity.type] || 'Activity'}</span>
      </div>
      <div className="rp-content">
        <div className="rp-assets">
          {activity.assets?.large_image && (
            <div className="rp-large-image">
              <img src={activity.assets.large_image} alt={activity.name} />
              {activity.assets?.small_image && <img src={activity.assets.small_image} alt="" className="rp-small-image" title={activity.assets.small_text} />}
            </div>
          )}
        </div>
        <div className="rp-info">
          <div className="rp-name">{activity.name}</div>
          {activity.details && <div className="rp-details">{activity.details}</div>}
          {activity.state && <div className="rp-state">{activity.state}</div>}
          {activity.party?.size && <div className="rp-party"><FaUsers /><span>{activity.party.size[0]} of {activity.party.size[1]}</span></div>}
          {activity.timestamps?.start && <div className="rp-elapsed"><FaClock /><span>{elapsedTime} elapsed</span></div>}
        </div>
      </div>
      {activity.buttons && activity.buttons.some(b => b) && (
        <div className="rp-buttons">
          {activity.buttons.filter(b => b).map((btn, idx) => (
            <a key={idx} href={btn.url} target="_blank" rel="noopener noreferrer" className="rp-button">
              {btn.label}<FaExternalLinkAlt />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
