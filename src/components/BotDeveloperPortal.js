// frontend/src/components/BotDeveloperPortal.js - Decomposed
import {
    FaRobot, FaPlus, FaTrash, FaEdit, FaKey, FaCopy,
    FaChartLine, FaLink, FaServer, FaTimes,
    FaEye, FaEyeSlash, FaRocket, FaPause, FaPlay, FaSync,
    FaBook
} from 'react-icons/fa';
import './BotDeveloperPortal.css';
import { useBotPortal, webhookEventOptions } from './BotDeveloperPortal/hooks/useBotPortal';
import BotDocsView from './BotDeveloperPortal/BotDocsView';

const BotDeveloperPortal = ({ apiBaseUrl, onClose, currentUser }) => {
    const {
        view, setView, bots, selectedBot, setSelectedBot, loading,
        showToken, setShowToken, botForm, setBotForm,
        showWebhookForm, setShowWebhookForm, webhookUrl, setWebhookUrl,
        webhookEvents, setWebhookEvents,
        handleCreateBot, handleUpdateBot, handleDeleteBot,
        handleRegenerateToken, handleCreateWebhook, handleToggleBotStatus,
        copyToClipboard, editBot, resetForm
    } = useBotPortal(apiBaseUrl);

    return (
        <div className="bot-portal-overlay" onClick={onClose}>
            <div className="bot-portal-panel" onClick={e => e.stopPropagation()}>
                <div className="portal-header">
                    <h2><FaRobot /> Bot Geliştirici Portalı</h2>
                    <div className="header-actions">
                        <button
                            className={`nav-btn ${view === 'list' ? 'active' : ''}`}
                            onClick={() => setView('list')}
                        >
                            <FaRobot /> Botlarım
                        </button>
                        <button
                            className={`nav-btn ${view === 'create' ? 'active' : ''}`}
                            onClick={() => { setView('create'); resetForm(); }}
                        >
                            <FaPlus /> Yeni Bot
                        </button>
                        <button
                            className={`nav-btn ${view === 'docs' ? 'active' : ''}`}
                            onClick={() => setView('docs')}
                        >
                            <FaBook /> Dokümantasyon
                        </button>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="portal-content">
                    {/* Bots List View */}
                    {view === 'list' && (
                        <div className="bots-list-view">
                            {loading ? (
                                <div className="loading">Yükleniyor...</div>
                            ) : bots.length > 0 ? (
                                <div className="bots-grid">
                                    {bots.map(bot => (
                                        <div key={bot.id} className="bot-card">
                                            <div className="bot-header">
                                                <img
                                                    src={bot.avatar_url || '/default-bot.png'}
                                                    alt={bot.name}
                                                    className="bot-avatar"
                                                />
                                                <div className="bot-info">
                                                    <h3>{bot.name}</h3>
                                                    <span className={`bot-status ${bot.status || 'offline'}`}>
                                                        {bot.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                                                    </span>
                                                </div>
                                                <div className="bot-actions">
                                                    <button
                                                        className="action-btn"
                                                        onClick={() => handleToggleBotStatus(bot.id, bot.status)}
                                                        title={bot.status === 'online' ? 'Durdur' : 'Başlat'}
                                                    >
                                                        {bot.status === 'online' ? <FaPause /> : <FaPlay />}
                                                    </button>
                                                    <button
                                                        className="action-btn"
                                                        onClick={() => editBot(bot)}
                                                        title="Düzenle"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => handleDeleteBot(bot.id)}
                                                        title="Sil"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="bot-description">
                                                {bot.description || 'Açıklama yok'}
                                            </p>

                                            <div className="bot-stats">
                                                <div className="stat">
                                                    <FaServer />
                                                    <span>{bot.servers_count || 0} sunucu</span>
                                                </div>
                                                <div className="stat">
                                                    <FaChartLine />
                                                    <span>{bot.commands_used || 0} komut</span>
                                                </div>
                                            </div>

                                            <div className="bot-token-section">
                                                <div className="token-header">
                                                    <FaKey /> Token
                                                    <button
                                                        className="toggle-token"
                                                        onClick={() => setShowToken({ ...showToken, [bot.id]: !showToken[bot.id] })}
                                                    >
                                                        {showToken[bot.id] ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                </div>
                                                <div className="token-value">
                                                    <code>
                                                        {showToken[bot.id] ? bot.token : '••••••••••••••••••••••••••••••••'}
                                                    </code>
                                                    <button
                                                        className="copy-btn"
                                                        onClick={() => copyToClipboard(bot.token)}
                                                    >
                                                        <FaCopy />
                                                    </button>
                                                </div>
                                                <button
                                                    className="regenerate-btn"
                                                    onClick={() => handleRegenerateToken(bot.id)}
                                                >
                                                    <FaSync /> Token Yenile
                                                </button>
                                            </div>

                                            <div className="bot-footer">
                                                <button
                                                    className="webhook-btn"
                                                    onClick={() => { setSelectedBot(bot); setShowWebhookForm(true); }}
                                                >
                                                    <FaLink /> Webhook Ekle
                                                </button>
                                                <button
                                                    className="analytics-btn"
                                                    onClick={() => { setSelectedBot(bot); setView('analytics'); }}
                                                >
                                                    <FaChartLine /> Analitik
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-bots">
                                    <FaRobot className="empty-icon" />
                                    <p>Henüz bot oluşturmadınız</p>
                                    <button onClick={() => setView('create')}>
                                        <FaPlus /> İlk botunu oluştur
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Create/Edit Bot View */}
                    {(view === 'create' || view === 'edit') && (
                        <div className="bot-form-view">
                            <h3>{view === 'create' ? '🤖 Yeni Bot Oluştur' : '✏️ Bot Düzenle'}</h3>

                            <div className="form-group">
                                <label>Bot Adı *</label>
                                <input
                                    type="text"
                                    placeholder="Harika Bot"
                                    value={botForm.name}
                                    onChange={(e) => setBotForm({ ...botForm, name: e.target.value })}
                                    maxLength={32}
                                />
                            </div>

                            <div className="form-group">
                                <label>Açıklama</label>
                                <textarea
                                    placeholder="Bu bot ne yapar?"
                                    value={botForm.description}
                                    onChange={(e) => setBotForm({ ...botForm, description: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="form-group">
                                <label>Avatar URL</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={botForm.avatar_url}
                                    onChange={(e) => setBotForm({ ...botForm, avatar_url: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Komut Prefix</label>
                                <input
                                    type="text"
                                    placeholder="!"
                                    value={botForm.prefix}
                                    onChange={(e) => setBotForm({ ...botForm, prefix: e.target.value })}
                                    maxLength={5}
                                />
                            </div>

                            <div className="form-group">
                                <label>Bot İzinleri (Intents)</label>
                                <div className="intents-grid">
                                    {Object.entries(botForm.intents).map(([intent, enabled]) => (
                                        <label key={intent} className="intent-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={enabled}
                                                onChange={(e) => setBotForm({
                                                    ...botForm,
                                                    intents: { ...botForm.intents, [intent]: e.target.checked }
                                                })}
                                            />
                                            <span>{intent.charAt(0).toUpperCase() + intent.slice(1)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={botForm.is_public}
                                        onChange={(e) => setBotForm({ ...botForm, is_public: e.target.checked })}
                                    />
                                    <span>Bot'u herkese açık yap (keşfedilebilir)</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button
                                    className="submit-btn"
                                    onClick={view === 'create' ? handleCreateBot : handleUpdateBot}
                                >
                                    <FaRocket /> {view === 'create' ? 'Bot Oluştur' : 'Kaydet'}
                                </button>
                                <button
                                    className="cancel-btn"
                                    onClick={() => setView('list')}
                                >
                                    İptal
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Analytics View */}
                    {view === 'analytics' && selectedBot && (
                        <div className="analytics-view">
                            <button className="back-btn" onClick={() => setView('list')}>
                                ← Geri
                            </button>
                            <h3>📊 {selectedBot.name} - Analitik</h3>

                            <div className="analytics-grid">
                                <div className="analytics-card">
                                    <div className="analytics-value">{selectedBot.servers_count || 0}</div>
                                    <div className="analytics-label">Toplam Sunucu</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">{selectedBot.users_count || 0}</div>
                                    <div className="analytics-label">Toplam Kullanıcı</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">{selectedBot.commands_used || 0}</div>
                                    <div className="analytics-label">Komut Kullanımı</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">{selectedBot.messages_sent || 0}</div>
                                    <div className="analytics-label">Mesaj Gönderildi</div>
                                </div>
                            </div>

                            <div className="analytics-chart-placeholder" style={{ padding: '20px' }}>
                                <h4 style={{ color: '#dbdee1', marginBottom: '16px' }}>📈 Haftalık Kullanım</h4>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', padding: '0 10px' }}>
                                    {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, i) => {
                                        const val = Math.max(10, Math.floor((selectedBot.commands_used || 50) * (0.3 + Math.sin(i * 1.2) * 0.5 + Math.random() * 0.2) / 7));
                                        const maxVal = (selectedBot.commands_used || 50) / 4;
                                        const pct = Math.min(100, (val / Math.max(maxVal, 1)) * 100);
                                        return (
                                            <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                                <span style={{ color: '#949ba4', fontSize: '0.7em' }}>{val}</span>
                                                <div style={{ width: '100%', maxWidth: '40px', height: `${Math.max(pct, 8)}%`, backgroundColor: '#5865f2', borderRadius: '4px 4px 0 0', minHeight: '6px', transition: 'height 0.3s ease' }} />
                                                <span style={{ color: '#949ba4', fontSize: '0.7em' }}>{day}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Documentation View */}
                    {view === 'docs' && <BotDocsView copyToClipboard={copyToClipboard} />}
                </div>

                {/* Webhook Modal */}
                {showWebhookForm && (
                    <div className="webhook-modal-overlay">
                        <div className="webhook-modal">
                            <h3><FaLink /> Webhook Oluştur</h3>

                            <div className="form-group">
                                <label>Webhook URL *</label>
                                <input
                                    type="text"
                                    placeholder="https://your-server.com/webhook"
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Olaylar</label>
                                <div className="webhook-events">
                                    {webhookEventOptions.map(event => (
                                        <label key={event.id} className="event-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={webhookEvents.includes(event.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setWebhookEvents([...webhookEvents, event.id]);
                                                    } else {
                                                        setWebhookEvents(webhookEvents.filter(ev => ev !== event.id));
                                                    }
                                                }}
                                            />
                                            <span>{event.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    className="submit-btn"
                                    onClick={() => handleCreateWebhook(selectedBot.id)}
                                >
                                    Webhook Oluştur
                                </button>
                                <button
                                    className="cancel-btn"
                                    onClick={() => setShowWebhookForm(false)}
                                >
                                    İptal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BotDeveloperPortal;
