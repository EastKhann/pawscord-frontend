import { useState } from 'react';
import PropTypes from 'prop-types';
import './PollsPanel.css';
import usePolls from '../PollsPanel/usePolls';
import PollCard from '../PollsPanel/PollCard';
import CreatePollModal from '../PollsPanel/CreatePollModal';

const PollsPanel = ({ serverId, onClose }) => {
    const [error, setError] = useState(null);
    const {
        polls,
        loading,
        showCreateModal,
        setShowCreateModal,
        channels,
        newPoll,
        setNewPoll,
        createPoll,
        vote,
        endPoll,
        deletePoll,
        addOption,
        removeOption,
        updateOption,
    } = usePolls(serverId);

    return (
        <div
            className="polls-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="polls-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="polls-header">
                    <h2>📊 Polls</h2>
                    <div className="header-actions">
                        <button
                            aria-label="+ Yeni Poll"
                            className="create-poll-btn"
                            onClick={() => setShowCreateModal(true)}
                        >
                            + Yeni Poll
                        </button>
                        <button aria-label="on Close" className="close-btn" onClick={onClose}>
                            ×
                        </button>
                    </div>
                </div>

                <div className="polls-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner" />
                            <p>Anketler yükleniyor...</p>
                        </div>
                    ) : polls.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📊</span>
                            <h3>Henüz anket yok</h3>
                            <p>Topluluk etkileşimini artırmak için anket oluşturun!</p>
                            <button
                                aria-label="Create"
                                className="create-first-btn"
                                onClick={() => setShowCreateModal(true)}
                            >
                                📊 İlk Polli Oluştur
                            </button>
                        </div>
                    ) : (
                        <div className="polls-list">
                            {polls.map((poll) => (
                                <PollCard
                                    key={poll.id}
                                    poll={poll}
                                    onVote={vote}
                                    onEnd={endPoll}
                                    onDelete={deletePoll}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {showCreateModal && (
                    <CreatePollModal
                        newPoll={newPoll}
                        setNewPoll={setNewPoll}
                        channels={channels}
                        onCreate={createPoll}
                        onClose={() => setShowCreateModal(false)}
                        addOption={addOption}
                        removeOption={removeOption}
                        updateOption={updateOption}
                    />
                )}
            </div>
        </div>
    );
};

PollsPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default PollsPanel;
