import { getStatusBadge, formatTimeRemaining, calculatePercentage } from './usePolls';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


const PollCard = ({ poll, onVote, onEnd, onDelete }) => {
    const { t } = useTranslation();

  const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
  const badge = getStatusBadge(poll.status);

  return (
    <div aria-label="poll card" className="poll-card">
      <div className="poll-card-header">
        <h3>{poll.question}</h3>
        <span className="status-badge" style={{ background: badge.color }}>{badge.text}</span>
      </div>

      <div className="poll-info">
        <div className="info-item">
          <span className="info-label">{t('toplam_oy')}</span>
          <span className="info-value">{totalVotes}</span>
        </div>
        {poll.status === 'active' && (
          <div className="info-item">
            <span className="info-label">Kalan Süre:</span>
            <span className="info-value time-remaining">{formatTimeRemaining(poll.end_time)}</span>
          </div>
        )}
      </div>

      <div className="poll-options">
        {poll.options.map((option) => {
          const pct = calculatePercentage(option.votes || 0, totalVotes);
          const isWinner = poll.status === 'ended' && option.votes === Math.max(...poll.options.map(o => o.votes || 0));
          return (
            <div key={option.id} className={`poll-option ${poll.status === 'active' ? 'clickable' : ''} ${isWinner ? 'winner' : ''}`}
              role="button"
              tabIndex={0}

              onClick={() => poll.status === 'active' && onVote(poll.id, option.id)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
              <div className="option-text">
                {option.text}
                {isWinner && <span className="winner-badge">🏆 Kazanan</span>}
              </div>
              <div className="option-stats">
                <span className="option-votes">{option.votes || 0} oy</span>
                <span className="option-percentage">{pct}%</span>
              </div>
              <div className="option-bar"><div className="option-bar-fill" style={{ width: `${pct}%` }} /></div>
            </div>
          );
        })}>
      </div>

      <div className="poll-meta">
        {poll.allow_multiple_choices && <span className="meta-badge">✓ Çoklu seçim</span>}
        {poll.anonymous && <span className="meta-badge">🔒 Anonim</span>}
      </div>

      <div className="poll-card-footer">
        {poll.status === 'active' && <button className="end-poll-btn" onClick={() => onEnd(poll.id)}>🏁 Sonlandır</button>}
        <button className="delete-poll-btn" onClick={() => onDelete(poll.id)}>🗑️ Delete</button>
      </div>
    </div>
  );
};

PollCard.propTypes = {
    poll: PropTypes.object,
    onVote: PropTypes.func,
    onEnd: PropTypes.func,
    onDelete: PropTypes.func,
};
export default PollCard;