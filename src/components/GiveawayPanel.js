import useGiveaways from './GiveawayPanel/useGiveaways';
import GiveawayCard from './GiveawayPanel/GiveawayCard';
import CreateGiveawayModal from './GiveawayPanel/CreateGiveawayModal';
import './GiveawayPanel.css';

const GiveawayPanel = ({ serverId, onClose }) => {
  const {
    giveaways, loading, showCreateModal, setShowCreateModal, channels, roles,
    newGiveaway, setNewGiveaway, createGiveaway, endGiveaway, rerollGiveaway, deleteGiveaway
  } = useGiveaways(serverId);

  return (
    <div className="giveaway-panel-overlay" onClick={onClose}>
      <div className="giveaway-panel" onClick={(e) => e.stopPropagation()}>
        <div className="giveaway-header">
          <h2>{'🎉'} {'Ç'}ekili{'ş'}ler</h2>
          <button className="close-btn" onClick={onClose}>{'×'}</button>
        </div>

        <div className="giveaway-content">
          <div className="giveaway-actions">
            <button className="create-giveaway-btn" onClick={() => setShowCreateModal(true)}>
              + Yeni {'Ç'}ekili{'ş'} Olu{'ş'}tur
            </button>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>{'Ç'}ekili{'ş'}ler y{'ü'}kleniyor...</p>
            </div>
          ) : giveaways.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">{'🎁'}</span>
              <p>Hen{'ü'}z {'ç'}ekili{'ş'} yok</p>
              <span className="empty-hint">Yeni bir {'ç'}ekili{'ş'} olu{'ş'}turun!</span>
            </div>
          ) : (
            <div className="giveaways-list">
              {giveaways.map((g) => (
                <GiveawayCard key={g.id} giveaway={g} onEnd={endGiveaway} onReroll={rerollGiveaway} onDelete={deleteGiveaway} />
              ))}
            </div>
          )}
        </div>

        {showCreateModal && (
          <CreateGiveawayModal
            newGiveaway={newGiveaway} setNewGiveaway={setNewGiveaway}
            channels={channels} roles={roles}
            onCreate={createGiveaway} onClose={() => setShowCreateModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GiveawayPanel;
