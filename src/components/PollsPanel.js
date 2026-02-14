import './PollsPanel.css';
import usePolls from './PollsPanel/usePolls';
import PollCard from './PollsPanel/PollCard';
import CreatePollModal from './PollsPanel/CreatePollModal';

const PollsPanel = ({ serverId, onClose }) => {
  const {
    polls, loading, showCreateModal, setShowCreateModal,
    channels, newPoll, setNewPoll,
    createPoll, vote, endPoll, deletePoll,
    addOption, removeOption, updateOption
  } = usePolls(serverId);

  return (
    <div className="polls-overlay" onClick={onClose}>
      <div className="polls-panel" onClick={(e) => e.stopPropagation()}>
        <div className="polls-header">
          <h2>{'\uD83D\uDCCA'} Anketler</h2>
          <div className="header-actions">
            <button className="create-poll-btn" onClick={() => setShowCreateModal(true)}>+ Yeni Anket</button>
            <button className="close-btn" onClick={onClose}>{'\u00D7'}</button>
          </div>
        </div>

        <div className="polls-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Anketler y{'\u00FC'}kleniyor...</p>
            </div>
          ) : polls.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">{'\uD83D\uDCCA'}</span>
              <h3>Hen{'\u00FC'}z anket yok</h3>
              <p>Topluluk etkile{'\u015F'}imini art{'\u0131'}rmak i{'\u00E7'}in bir anket olu{'\u015F'}turun!</p>
              <button className="create-first-btn" onClick={() => setShowCreateModal(true)}>
                {'\uD83D\uDCCA'} {'\u0130'}lk Anketi Olu{'\u015F'}tur
              </button>
            </div>
          ) : (
            <div className="polls-list">
              {polls.map(poll => (
                <PollCard key={poll.id} poll={poll} onVote={vote} onEnd={endPoll} onDelete={deletePoll} />
              ))}
            </div>
          )}
        </div>

        {showCreateModal && (
          <CreatePollModal
            newPoll={newPoll} setNewPoll={setNewPoll}
            channels={channels} onCreate={createPoll}
            onClose={() => setShowCreateModal(false)}
            addOption={addOption} removeOption={removeOption} updateOption={updateOption}
          />
        )}
      </div>
    </div>
  );
};

export default PollsPanel;
