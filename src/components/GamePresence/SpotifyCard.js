import { useState, useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';

export const SpotifyCard = ({ activity }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!activity?.timestamps) return;
    const update = () => {
      const { start, end } = activity.timestamps;
      setProgress(Math.min(((Date.now() - start) / (end - start)) * 100, 100));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [activity]);

  if (!activity || activity.type !== 'listening') return null;

  return (
    <div className="spotify-card">
      <div className="spotify-header"><FaSpotify className="spotify-icon" /><span>Listening to Spotify</span></div>
      <div className="spotify-content">
        {activity.assets?.large_image && <img src={activity.assets.large_image} alt={activity.details} className="spotify-album-art" />}
        <div className="spotify-info">
          <div className="spotify-track">{activity.details}</div>
          <div className="spotify-artist">{activity.state}</div>
          {activity.assets?.large_text && <div className="spotify-album">{activity.assets.large_text}</div>}
        </div>
      </div>
      <div className="spotify-progress"><div className="spotify-progress-bar" style={{ width: `${progress}%` }} /></div>
    </div>
  );
};
