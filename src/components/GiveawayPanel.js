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
          <h2>{'\uD83C\uDF89'} {'\u00C7'}ekili{'\u015F'}ler</h2>
          <button className="close-btn" onClick={onClose}>{'\u00D7'}</button>
        </div>

        <div className="giveaway-content">
          <div className="giveaway-actions">
            <button className="create-giveaway-btn" onClick={() => setShowCreateModal(true)}>
              + Yeni {'\u00C7'}ekili{'\u015F'} Olu{'\u015F'}tur
            </button>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>{'\u00C7'}ekili{'\u015F'}ler y{'\u00FC'}kleniyor...</p>
            </div>
          ) : giveaways.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">{'\uD83C\uDF81'}</span>
              <p>Hen{'\u00FC'}z {'\u00E7'}ekili{'\u015F'} yok</p>
              <span className="empty-hint">Yeni bir {'\u00E7'}ekili{'\u015F'} olu{'\u015F'}turun!</span>
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
