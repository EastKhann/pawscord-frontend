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
          <span className="prize-icon">{'\uD83C\uDF81'}</span>
          <span className="prize-text">{giveaway.prize}</span>
        </div>

        {giveaway.description && (
          <p className="giveaway-description">{giveaway.description}</p>
        )}

        <div className="giveaway-info">
          <div className="info-item">
            <span className="info-label">Kazanan Say{'\u0131'}s{'\u0131'}:</span>
            <span className="info-value">{giveaway.winners_count} ki{'\u015F'}i</span>
          </div>
          <div className="info-item">
            <span className="info-label">Kat{'\u0131'}l{'\u0131'}mc{'\u0131'}lar:</span>
            <span className="info-value">{giveaway.entries_count || 0} ki{'\u015F'}i</span>
          </div>
          {giveaway.status === 'active' && (
            <div className="info-item">
              <span className="info-label">Kalan S{'\u00FC'}re:</span>
              <span className="info-value time-remaining">
                {formatTimeRemaining(giveaway.end_time)}
              </span>
            </div>
          )}
        </div>

        {giveaway.required_role_id && (
          <div className="requirement-badge">{'\u2B50'} Rol gereksinimi var</div>
        )}
        {giveaway.required_messages > 0 && (
          <div className="requirement-badge">{'\uD83D\uDCAC'} {giveaway.required_messages} mesaj gerekli</div>
        )}
        {giveaway.required_invites > 0 && (
          <div className="requirement-badge">{'\uD83D\uDC65'} {giveaway.required_invites} davet gerekli</div>
        )}

        {giveaway.winners && giveaway.winners.length > 0 && (
          <div className="winners-section">
            <h4>{'\uD83C\uDF89'} Kazananlar:</h4>
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
            {'\uD83C\uDFC1'} Sonland{'\u0131'}r
          </button>
        )}
        {giveaway.status === 'ended' && (
          <button className="reroll-btn" onClick={() => onReroll(giveaway.id)}>
            {'\uD83D\uDD04'} Reroll
          </button>
        )}
        <button className="delete-btn" onClick={() => onDelete(giveaway.id)}>
          {'\uD83D\uDDD1\uFE0F'} Sil
        </button>
      </div>
    </div>
  );
};

export default GiveawayCard;
