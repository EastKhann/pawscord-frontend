import { getStatusBadge, formatTimeRemaining } from './useGiveaways';

const GiveawayCard = ({ giveaway, onEnd, onReroll, onDelete }) => {
  const badge = getStatusBadge(giveaway.status);

  return (
    <div className="giveaway-card">
      <div className="giveaway-card-header">
        <h3>{giveaway.title}</h3>
        <span className="status-badge" style={{ background: badge.color }}>
          {badge.text}
        </span>
      </div>

      <div className="giveaway-card-body">
        <div className="giveaway-prize">
          <span className="prize-icon">{'🎁'}</span>
          <span className="prize-text">{giveaway.prize}</span>
        </div>

        {giveaway.description && (
          <p className="giveaway-description">{giveaway.description}</p>
        )}

        <div className="giveaway-info">
          <div className="info-item">
            <span className="info-label">Kazanan Say{'ı'}s{'ı'}:</span>
            <span className="info-value">{giveaway.winners_count} ki{'ş'}i</span>
          </div>
          <div className="info-item">
            <span className="info-label">Kat{'ı'}l{'ı'}mc{'ı'}lar:</span>
            <span className="info-value">{giveaway.entries_count || 0} ki{'ş'}i</span>
          </div>
          {giveaway.status === 'active' && (
            <div className="info-item">
              <span className="info-label">Kalan S{'ü'}re:</span>
              <span className="info-value time-remaining">
                {formatTimeRemaining(giveaway.end_time)}
              </span>
            </div>
          )}
        </div>

        {giveaway.required_role_id && (
          <div className="requirement-badge">{'⭐'} Rol gereksinimi var</div>
        )}
        {giveaway.required_messages > 0 && (
          <div className="requirement-badge">{'💬'} {giveaway.required_messages} mesaj gerekli</div>
        )}
        {giveaway.required_invites > 0 && (
          <div className="requirement-badge">{'👥'} {giveaway.required_invites} davet gerekli</div>
        )}

        {giveaway.winners && giveaway.winners.length > 0 && (
          <div className="winners-section">
            <h4>{'🎉'} Kazananlar:</h4>
            <ul className="winners-list">
              {giveaway.winners.map((winner, index) => (
                <li key={index}>{winner}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="giveaway-card-footer">
        {giveaway.status === 'active' && (
          <button className="end-btn" onClick={() => onEnd(giveaway.id)}>
            {'🏁'} Sonland{'ı'}r
          </button>
        )}
        {giveaway.status === 'ended' && (
          <button className="reroll-btn" onClick={() => onReroll(giveaway.id)}>
            {'🔄'} Reroll
          </button>
        )}
        <button className="delete-btn" onClick={() => onDelete(giveaway.id)}>
          {'🗑️'} Sil
        </button>
      </div>
    </div>
  );
};

export default GiveawayCard;
