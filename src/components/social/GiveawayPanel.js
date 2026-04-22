import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useGiveaways from '../GiveawayPanel/useGiveaways';
import GiveawayCard from '../GiveawayPanel/GiveawayCard';
import CreateGiveawayModal from '../GiveawayPanel/CreateGiveawayModal';
import './GiveawayPanel.css';

const GiveawayPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
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
                    <h2>{t('giveaway.title','🎉 Giveaways')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="giveaway-content">
                    <div className="giveaway-actions">
                        <button
                            aria-label={t('common.create')}
                            className="create-giveaway-btn"
                            onClick={() => setShowCreateModal(true)}
                        >
                            {t('giveaway.createNew','+ Create New Giveaway')}
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('giveaway.loading','Loading giveaways...')}</p>
                        </div>
                    ) : giveaways.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">🎁</span>
                            <p>{t('giveaway.noGiveaways','No giveaways yet')}</p>
                            <span className="empty-hint">{t('giveaway.emptyHint','Create a new giveaway!')}</span>
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
