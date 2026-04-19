import { useState } from 'react';
import PropTypes from 'prop-types';
import useGiveaways from '../GiveawayPanel/useGiveaways';
import GiveawayCard from '../GiveawayPanel/GiveawayCard';
import CreateGiveawayModal from '../GiveawayPanel/CreateGiveawayModal';
import './GiveawayPanel.css';

const GiveawayPanel = ({ serverId, onClose }) => {
    const [error, setError] = useState(null);
    const {
        giveaways,
        loading,
        showCreateModal,
        setShowCreateModal,
        channels,
        roles,
        newGiveaway,
        setNewGiveaway,
        createGiveaway,
        endGiveaway,
        rerollGiveaway,
        deleteGiveaway,
    } = useGiveaways(serverId);

    return (
        <div
            className="giveaway-panel-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="giveaway-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="giveaway-header">
                    <h2>🎉 Çekilişler</h2>
                    <button aria-label="on Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="giveaway-content">
                    <div className="giveaway-actions">
                        <button
                            aria-label="Create"
                            className="create-giveaway-btn"
                            onClick={() => setShowCreateModal(true)}
                        >
                            + Yeni Çekiliş Oluştur
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Çekilişler yükleniyor...</p>
                        </div>
                    ) : giveaways.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">🎁</span>
                            <p>Henüz çekiliş yok</p>
                            <span className="empty-hint">Yeni bir çekiliş oluşturun!</span>
                        </div>
                    ) : (
                        <div className="giveaways-list">
                            {giveaways.map((g) => (
                                <GiveawayCard
                                    key={g.id}
                                    giveaway={g}
                                    onEnd={endGiveaway}
                                    onReroll={rerollGiveaway}
                                    onDelete={deleteGiveaway}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {showCreateModal && (
                    <CreateGiveawayModal
                        newGiveaway={newGiveaway}
                        setNewGiveaway={setNewGiveaway}
                        channels={channels}
                        roles={roles}
                        onCreate={createGiveaway}
                        onClose={() => setShowCreateModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

GiveawayPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default GiveawayPanel;
