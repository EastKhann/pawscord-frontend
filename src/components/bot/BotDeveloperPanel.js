import { useState } from 'react';
import PropTypes from 'prop-types';
import useBotDeveloper from '../BotDeveloperPanel/useBotDeveloper';
import BotListView from '../BotDeveloperPanel/BotListView';
import CreateBotView from '../BotDeveloperPanel/CreateBotView';
import BotDetailsView from '../BotDeveloperPanel/BotDetailsView';
import './BotDeveloperPanel.css';

const BotDeveloperPanel = ({ apiBaseUrl, onClose }) => {
    const [error, setError] = useState(null);
    const {
        bots,
        selectedBot,
        setSelectedBot,
        loading,
        view,
        setView,
        newBot,
        setNewBot,
        analytics,
        webhooks,
        showCredentials,
        setShowCredentials,
        handleCreateBot,
        handleCreateWebhook,
        handleDeleteBot,
        copyToClipboard,
        formatNumber,
    } = useBotDeveloper(apiBaseUrl);

    if (loading) {
        return (
            <div
                className="bot-panel-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="bot-panel"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="bot-loading">
                        <div className="spinner" />
                        <p>Yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="bot-panel-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="bot-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="bot-header">
                    <h2>🤖 Bot Geliştirici Paneli</h2>
                    <div className="header-actions">
                        {view !== 'list' && (
                            <button
                                aria-label="Switch view"
                                className="back-to-list-btn"
                                onClick={() => {
                                    setView('list');
                                    setSelectedBot(null);
                                }}
                            >
                                ← My Bots
                            </button>
                        )}
                        {view === 'list' && (
                            <button
                                aria-label="Create"
                                className="create-bot-btn"
                                onClick={() => setView('create')}
                            >
                                ➕ Yeni Bot
                            </button>
                        )}
                        <button aria-label="on Close" className="close-btn" onClick={onClose}>
                            ✕
                        </button>
                    </div>
                </div>

                <div className="bot-content">
                    {view === 'list' ? (
                        <BotListView
                            bots={bots}
                            onSelect={(bot) => {
                                setSelectedBot(bot);
                                setView('details');
                            }}
                            onCreateView={() => setView('create')}
                            formatNumber={formatNumber}
                        />
                    ) : view === 'create' ? (
                        <CreateBotView
                            newBot={newBot}
                            setNewBot={setNewBot}
                            handleCreateBot={handleCreateBot}
                            onCancel={() => setView('list')}
                        />
                    ) : (
                        <BotDetailsView
                            selectedBot={selectedBot}
                            analytics={analytics}
                            webhooks={webhooks}
                            showCredentials={showCredentials}
                            setShowCredentials={setShowCredentials}
                            handleCreateWebhook={handleCreateWebhook}
                            handleDeleteBot={handleDeleteBot}
                            copyToClipboard={copyToClipboard}
                            formatNumber={formatNumber}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

BotDeveloperPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default BotDeveloperPanel;
