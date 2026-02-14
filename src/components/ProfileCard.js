import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/apiEndpoints';
import { BADGE_DATA } from './ProfileCard/profileCardData';
import './ProfileCard.css';

// Re-export editor from sub-module
export { ProfileCardEditor } from './ProfileCard/ProfileCardEditor';

export const ProfileCard = ({ username, onEdit, compact = false }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = API_BASE_URL;

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        const url = username ? `${API_URL}/profile/card/${username}/` : `${API_URL}/profile/card/`;
        const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) setProfile(await res.json());
      } catch (e) { console.error('Failed to load profile:', e); }
      setLoading(false);
    })();
  }, [username, API_URL]);

  if (loading) return <div className="profile-card loading"><div className="loading-spinner" /></div>;
  if (!profile) return <div className="profile-card error">Profil y\u00fcklenemedi</div>;

  const colors = profile.custom_colors || profile.theme_colors;

  return (
    <div className={`profile-card ${compact ? 'compact' : ''}`} style={{ '--primary': colors.primary, '--secondary': colors.secondary, '--accent': colors.accent, '--bg': colors.background }}>
      <div className="card-banner" style={{ backgroundImage: profile.banner ? `url(${profile.banner})` : undefined, backgroundColor: profile.banner_color }}>
        {onEdit && <button className="edit-btn" onClick={onEdit}>{'\u270F\uFE0F'}</button>}
      </div>

      <div className="card-avatar">
        <img src={profile.avatar || '/default-avatar.png'} alt="" />
        {profile.status_text && <div className="status-indicator" title={profile.status_text}>{profile.status_text.slice(0, 1)}</div>}
      </div>

      <div className="card-content">
        {profile.badges?.length > 0 && (
          <div className="card-badges">
            {profile.badges.map((badgeId) => { const badge = BADGE_DATA[badgeId]; return badge ? <span key={badgeId} className="badge" style={{ backgroundColor: badge.color }} title={badge.name}>{badge.icon}</span> : null; })}
          </div>
        )}

        <h2 className="card-name">{profile.display_name || profile.username}</h2>
        <p className="card-username">@{profile.username}</p>
        {profile.bio && <p className="card-bio">{profile.bio}</p>}

        <div className="card-stats">
          <div className="stat"><span className="stat-value">Lv.{profile.level}</span><span className="stat-label">Seviye</span></div>
          <div className="stat"><span className="stat-value">{profile.xp?.toLocaleString()}</span><span className="stat-label">XP</span></div>
          <div className="stat"><span className="stat-value">{new Date(profile.created_at).toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' })}</span><span className="stat-label">Kat\u0131l\u0131m</span></div>
        </div>

        {profile.links?.length > 0 && (
          <div className="card-links">
            {profile.links.map((link, idx) => <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="link-item" title={link.name}>{link.icon}</a>)}
          </div>
        )}

        {profile.spotify_connected && <div className="spotify-badge">{'\uD83C\uDFB5'} Spotify Ba\u011fl\u0131</div>}
        {profile.is_premium && <div className="premium-badge">{'\uD83D\uDC8E'} Premium</div>}
      </div>
    </div>
  );
};

export default ProfileCard;
