import useBotDeveloper from './useBotDeveloper';
import BotListView from './BotListView';
import CreateBotView from './CreateBotView';
import BotDetailsView from './BotDetailsView';
import '../BotDeveloperPanel.css';

const BotDeveloperPanel = ({ apiBaseUrl, onClose }) => {
  const {
    bots, selectedBot, setSelectedBot, loading, view, setView,
    newBot, setNewBot, analytics, webhooks, showCredentials, setShowCredentials,
    handleCreateBot, handleCreateWebhook, handleDeleteBot, copyToClipboard, formatNumber,
  } = useBotDeveloper(apiBaseUrl);

  if (loading) {
    return (
      <div className="bot-panel-overlay" onClick={onClose}>
        <div className="bot-panel" onClick={e => e.stopPropagation()}>
          <div className="bot-loading"><div className="spinner" /><p>Y{'ü'}kleniyor...</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bot-panel-overlay" onClick={onClose}>
      <div className="bot-panel" onClick={e => e.stopPropagation()}>
        <div className="bot-header">
          <h2>{'🤖'} Bot Developer Panel</h2>
          <div className="header-actions">
            {view !== 'list' && (
              <button className="back-to-list-btn" onClick={() => { setView('list'); setSelectedBot(null); }}>
                {'←'} Botlar{'ı'}m
              </button>
            )}
            {view === 'list' && (
              <button className="create-bot-btn" onClick={() => setView('create')}>
                {'➕'} Yeni Bot
              </button>
            )}
            <button className="close-btn" onClick={onClose}>{'✕'}</button>
          </div>
        </div>

        <div className="bot-content">
          {view === 'list' ? (
            <BotListView
              bots={bots}
              onSelect={bot => { setSelectedBot(bot); setView('details'); }}
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

export default BotDeveloperPanel;
