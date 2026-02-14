import { getStatusBadge, formatTimeRemaining, calculatePercentage } from './usePolls';

const PollCard = ({ poll, onVote, onEnd, onDelete }) => {
  const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
  const badge = getStatusBadge(poll.status);

  return (
    <div className="poll-card">
      <div className="poll-card-header">
        <h3>{poll.question}</h3>
        <span className="status-badge" style={{ background: badge.color }}>{badge.text}</span>
      </div>

      <div className="poll-info">
        <div className="info-item">
          <span className="info-label">Toplam Oy:</span>
          <span className="info-value">{totalVotes}</span>
        </div>
        {poll.status === 'active' && (
          <div className="info-item">
            <span className="info-label">Kalan S{'ü'}re:</span>
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
              onClick={() => poll.status === 'active' && onVote(poll.id, option.id)}>
              <div className="option-text">
                {option.text}
                {isWinner && <span className="winner-badge">{'🏆'} Kazanan</span>}
              </div>
              <div className="option-stats">
                <span className="option-votes">{option.votes || 0} oy</span>
                <span className="option-percentage">{pct}%</span>
              </div>
              <div className="option-bar"><div className="option-bar-fill" style={{ width: `${pct}%` }} /></div>
            </div>
          );
        })}
      </div>

      <div className="poll-meta">
        {poll.allow_multiple_choices && <span className="meta-badge">{'✓'} {'Ç'}oklu se{'ç'}im</span>}
        {poll.anonymous && <span className="meta-badge">{'🔒'} Anonim</span>}
      </div>

      <div className="poll-card-footer">
        {poll.status === 'active' && <button className="end-poll-btn" onClick={() => onEnd(poll.id)}>{'🏁'} Sonland{'ı'}r</button>}
        <button className="delete-poll-btn" onClick={() => onDelete(poll.id)}>{'🗑️'} Sil</button>
      </div>
    </div>
  );
};

export default PollCard;
