import { getStatusBadge, formatTimeRemaining } from './useGiveaways';
import PropTypes from 'prop-types';

const GiveawayCard = ({ giveaway, onEnd, onReroll, onDelete }) => {
    const badge = getStatusBadge(giveaway.status);

    return (
        <div aria-label="giveaway card" className="giveaway-card">
            <div className="giveaway-card-header">
                <h3>{giveaway.title}</h3>
                <span className="status-badge" style={{ background: badge.color }}>
                    {badge.text}
                </span>
            </div>

            <div className="giveaway-card-body">
                <div className="giveaway-prize">
                    <span className="prize-icon">🎁</span>
                    <span className="prize-text">{giveaway.prize}</span>
                </div>

                {giveaway.description && (
                    <p className="giveaway-description">{giveaway.description}</p>
                )}

                <div className="giveaway-info">
                    <div className="info-item">
                        <span className="info-label">Kazanan Sayısı:</span>
                        <span className="info-value">{giveaway.winners_count} kişi</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Katılımcılar:</span>
                        <span className="info-value">{giveaway.entries_count || 0} kişi</span>
                    </div>
                    {giveaway.status === 'active' && (
                        <div className="info-item">
                            <span className="info-label">Kalan Süre:</span>
                            <span className="info-value time-remaining">
                                {formatTimeRemaining(giveaway.end_time)}
                            </span>
                        </div>
                    )}
                </div>

                {giveaway.required_role_id && (
                    <div className="requirement-badge">⭐ Role gereksinimi var</div>
                )}
                {giveaway.required_messages > 0 && (
                    <div className="requirement-badge">
                        💬 {giveaway.required_messages} message gerekli
                    </div>
                )}
                {giveaway.required_invites > 0 && (
                    <div className="requirement-badge">
                        👥 {giveaway.required_invites} davet gerekli
                    </div>
                )}

                {giveaway.winners && giveaway.winners.length > 0 && (
                    <div className="winners-section">
                        <h4>🎉 Kazananlar:</h4>
                        <ul className="winners-list">
                            {giveaway.winners.map((winner, index) => (
                                <li key={`item-${index}`}>{winner}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="giveaway-card-footer">
                {giveaway.status === 'active' && (
                    <button className="end-btn" onClick={() => onEnd(giveaway.id)}>
                        🏁 Sonlandır
                    </button>
                )}
                {giveaway.status === 'ended' && (
                    <button className="reroll-btn" onClick={() => onReroll(giveaway.id)}>
                        🔄 Reroll
                    </button>
                )}
                <button className="delete-btn" onClick={() => onDelete(giveaway.id)}>
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
};

GiveawayCard.propTypes = {
    giveaway: PropTypes.object,
    onEnd: PropTypes.func,
    onReroll: PropTypes.func,
    onDelete: PropTypes.func,
};
export default GiveawayCard;
