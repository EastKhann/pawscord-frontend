/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/BotDeveloperPortal.js - Decomposed
import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
    FaRobot,
    FaPlus,
    FaTrash,
    FaEdit,
    FaKey,
    FaCopy,
    FaChartLine,
    FaLink,
    FaServer,
    FaTimes,
    FaEye,
    FaEyeSlash,
    FaRocket,
    FaPause,
    FaPlay,
    FaSync,
    FaBook,
} from 'react-icons/fa';
import './BotDeveloperPortal.css';
import { useBotPortal, webhookEventOptions } from '../BotDeveloperPortal/hooks/useBotPortal';
import BotDocsView from '../BotDeveloperPortal/BotDocsView';
import { useTranslation } from 'react-i18next';

const S = {
    flex2: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
    flex: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px',
        height: '120px',
        padding: '0 10px',
    },
    txt: { color: '#dbdee1', marginBottom: '16px' },
};

const BotDeveloperPortal = ({ apiBaseUrl, onClose, currentUser }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const {
        view,
        setView,
        bots,
        selectedBot,
        setSelectedBot,
        loading,
        showToken,
        setShowToken,
        botForm,
        setBotForm,
        showWebhookForm,
        setShowWebhookForm,
        webhookUrl,
        setWebhookUrl,
        webhookEvents,
        setWebhookEvents,
        handleCreateBot,
        handleUpdateBot,
        handleDeleteBot,
        handleRegenerateToken,
        handleCreateWebhook,
        handleToggleBotStatus,
        copyToClipboard,
        editBot,
        resetForm,
    } = useBotPortal(apiBaseUrl);

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleViewList = useCallback(() => setView('list'), [setView]);
    const handleViewCreate = useCallback(() => {
        setView('create');
        resetForm();
    }, [setView, resetForm]);
    const handleViewCreateNoReset = useCallback(() => setView('create'), [setView]);
    const handleViewDocs = useCallback(() => setView('docs'), [setView]);
    const handleFormName = useCallback(
        (e) => setBotForm((prev) => ({ ...prev, name: e.target.value })),
        []
    );
    const handleFormDescription = useCallback(
        (e) => setBotForm((prev) => ({ ...prev, description: e.target.value })),
        []
    );
    const handleFormAvatar = useCallback(
        (e) => setBotForm((prev) => ({ ...prev, avatar_url: e.target.value })),
        []
    );
    const handleFormPrefix = useCallback(
        (e) => setBotForm((prev) => ({ ...prev, prefix: e.target.value })),
        []
    );
    const handleFormPublic = useCallback(
        (e) => setBotForm((prev) => ({ ...prev, is_public: e.target.checked })),
        []
    );
    const handleCloseWebhookForm = useCallback(
        () => setShowWebhookForm(false),
        [setShowWebhookForm]
    );
    const handleWebhookUrlChange = useCallback(
        (e) => setWebhookUrl(e.target.value),
        [setWebhookUrl]
    );

    return (
        <div
            className="bot-portal-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="bot-portal-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="portal-header">
                    <h2>
                        <FaRobot /> Bot Geliştirici Portalı
                    </h2>
                    <div className="header-actions">
                        <button
                            aria-label="handle View List"
                            className={`nav-btn ${view === 'list' ? 'active' : ''}`}
                            onClick={handleViewList}
                        >
                            <FaRobot /> My Bots
                        </button>
                        <button
                            aria-label="handle View Create"
                            className={`nav-btn ${view === 'create' ? 'active' : ''}`}
                            onClick={handleViewCreate}
                        >
                            <FaPlus /> Yeni Bot
                        </button>
                        <button
                            aria-label="handle View Docs"
                            className={`nav-btn ${view === 'docs' ? 'active' : ''}`}
                            onClick={handleViewDocs}
                        >
                            <FaBook /> Documentation
                        </button>
                    </div>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="portal-content">
                    {/* Bots List View */}
                    {view === 'list' && (
                        <div className="bots-list-view">
                            {loading ? (
                                <div className="loading">{t('common.loading')}</div>
                            ) : bots.length > 0 ? (
                                <div className="bots-grid">
                                    {bots.map((bot) => (
                                        <div key={bot.id} className="bot-card">
                                            <div className="bot-header">
                                                <img
                                                    src={bot.avatar_url || '/default-bot.png'}
                                                    alt={bot.name}
                                                    className="bot-avatar"
                                                />
                                                <div className="bot-info">
                                                    <h3>{bot.name}</h3>
                                                    <span
                                                        className={`bot-status ${bot.status || 'offline'}`}
                                                    >
                                                        {bot.status === 'online'
                                                            ? '🟢 Çevrimiçi'
                                                            : '🔴 Çevrimdışı'}
                                                    </span>
                                                </div>
                                                <div className="bot-actions">
                                                    <button
                                                        aria-label={
                                                            bot.status === 'online'
                                                                ? 'Botu durdur'
                                                                : 'Botu başlat'
                                                        }
                                                        className="action-btn"
                                                        onClick={() =>
                                                            handleToggleBotStatus(
                                                                bot.id,
                                                                bot.status
                                                            )
                                                        }
                                                        title={
                                                            bot.status === 'online'
                                                                ? 'Durdur'
                                                                : 'Başlat'
                                                        }
                                                    >
                                                        {bot.status === 'online' ? (
                                                            <FaPause />
                                                        ) : (
                                                            <FaPlay />
                                                        )}
                                                    </button>
                                                    <button
                                                        aria-label="Botu düzenle"
                                                        className="action-btn"
                                                        onClick={() => editBot(bot)}
                                                        title={t('common.edit')}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        aria-label="Botu sil"
                                                        className="action-btn delete"
                                                        onClick={() => handleDeleteBot(bot.id)}
                                                        title={t('common.delete')}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="bot-description">
                                                {bot.description || 'Description yok'}
                                            </p>

                                            <div className="bot-stats">
                                                <div className="stat">
                                                    <FaServer />
                                                    <span>{bot.servers_count || 0} servers</span>
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
                                                        aria-label="Action button"
                                                        className="toggle-token"
                                                        onClick={() =>
                                                            setShowToken({
                                                                ...showToken,
                                                                [bot.id]: !showToken[bot.id],
                                                            })
                                                        }
                                                    >
                                                        {showToken[bot.id] ? (
                                                            <FaEyeSlash />
                                                        ) : (
                                                            <FaEye />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="token-value">
                                                    <code>
                                                        {showToken[bot.id] ? bot.token : ''}
                                                    </code>
                                                    <button
                                                        aria-label="Action button"
                                                        className="copy-btn"
                                                        onClick={() => copyToClipboard(bot.token)}
                                                    >
                                                        <FaCopy />
                                                    </button>
                                                </div>
                                                <button
                                                    aria-label="Action button"
                                                    className="regenerate-btn"
                                                    onClick={() => handleRegenerateToken(bot.id)}
                                                >
                                                    <FaSync /> Token Refresh
                                                </button>
                                            </div>

                                            <div className="bot-footer">
                                                <button
                                                    aria-label="Action button"
                                                    className="webhook-btn"
                                                    onClick={() => {
                                                        setSelectedBot(bot);
                                                        setShowWebhookForm(true);
                                                    }}
                                                >
                                                    <FaLink /> Webhook Add
                                                </button>
                                                <button
                                                    aria-label="Action button"
                                                    className="analytics-btn"
                                                    onClick={() => {
                                                        setSelectedBot(bot);
                                                        setView('analytics');
                                                    }}
                                                >
                                                    <FaChartLine /> Analytics
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-bots">
                                    <FaRobot className="empty-icon" />
                                    <p>Henüz bot oluştturmadınız</p>
                                    <button
                                        aria-label="handle View Create No Reset"
                                        onClick={handleViewCreateNoReset}
                                    >
                                        <FaPlus /> İlk botunuzu oluşturun
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Create/Edit Bot View */}
                    {(view === 'create' || view === 'edit') && (
                        <div className="bot-form-view">
                            <h3>{view === 'create' ? '🤖 Yeni Bot Create' : '✏️ Bot Edit'}</h3>

                            <div className="form-group">
                                <label>Bot Name *</label>
                                <input
                                    type="text"
                                    placeholder="Harika Bot"
                                    value={botForm.name}
                                    onChange={handleFormName}
                                    maxLength={32}
                                    aria-label="Harika Bot"
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    placeholder="Bu bot ne yapar?"
                                    value={botForm.description}
                                    onChange={handleFormDescription}
                                    rows={3}
                                    aria-label="Bu bot ne yapar?"
                                />
                            </div>

                            <div className="form-group">
                                <label>Avatar URL</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={botForm.avatar_url}
                                    onChange={handleFormAvatar}
                                    aria-label="https://..."
                                />
                            </div>

                            <div className="form-group">
                                <label>Komut Öneki</label>
                                <input
                                    type="text"
                                    placeholder="!"
                                    value={botForm.prefix}
                                    onChange={handleFormPrefix}
                                    maxLength={5}
                                    aria-label="!"
                                />
                            </div>

                            <div className="form-group">
                                <label>Bot İzinleri (Niyet)</label>
                                <div className="intents-grid">
                                    {Object.entries(botForm.intents).map(([intent, enabled]) => (
                                        <label key={intent} className="intent-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={enabled}
                                                onChange={(e) =>
                                                    setBotForm({
                                                        ...botForm,
                                                        intents: {
                                                            ...botForm.intents,
                                                            [intent]: e.target.checked,
                                                        },
                                                    })
                                                }
                                            />
                                            <span>
                                                {intent.charAt(0).toUpperCase() + intent.slice(1)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={botForm.is_public}
                                        onChange={handleFormPublic}
                                        aria-label="checkbox"
                                    />
                                    <span>Botu herkese açık yap (keşfedilebilir)</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button
                                    aria-label="view create handle Create Bot handle Update Bot"
                                    className="submit-btn"
                                    onClick={view === 'create' ? handleCreateBot : handleUpdateBot}
                                >
                                    <FaRocket />{' '}
                                    {view === 'create' ? 'Bot Create' : t('common.save')}
                                </button>
                                <button
                                    aria-label="handle View List"
                                    className="cancel-btn"
                                    onClick={handleViewList}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Analytics View */}
                    {view === 'analytics' && selectedBot && (
                        <div className="analytics-view">
                            <button
                                aria-label="handle View List"
                                className="back-btn"
                                onClick={handleViewList}
                            >
                                ← Geri
                            </button>
                            <h3>📊 {selectedBot.name} - Analytics</h3>

                            <div className="analytics-grid">
                                <div className="analytics-card">
                                    <div className="analytics-value">
                                        {selectedBot.servers_count || 0}
                                    </div>
                                    <div className="analytics-label">Toplam Sunucu</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">
                                        {selectedBot.users_count || 0}
                                    </div>
                                    <div className="analytics-label">Toplam Kullanıcı</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">
                                        {selectedBot.commands_used || 0}
                                    </div>
                                    <div className="analytics-label">Komut Kullanımı</div>
                                </div>
                                <div className="analytics-card">
                                    <div className="analytics-value">
                                        {selectedBot.messages_sent || 0}
                                    </div>
                                    <div className="analytics-label">Gönderilen Mesaj</div>
                                </div>
                            </div>

                            <div className="analytics-chart-placeholder analytics-chart-placeholder pad-20">
                                <h4 style={S.txt}>📈 Haftalık Kullanım</h4>
                                <div style={S.flex}>
                                    {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(
                                        (day, i) => {
                                            const val = Math.max(
                                                10,
                                                Math.floor(
                                                    ((selectedBot.commands_used || 50) *
                                                        (0.3 +
                                                            Math.sin(i * 1.2) * 0.5 +
                                                            Math.random() * 0.2)) /
                                                        7
                                                )
                                            );
                                            const maxVal = (selectedBot.commands_used || 50) / 4;
                                            const pct = Math.min(
                                                100,
                                                (val / Math.max(maxVal, 1)) * 100
                                            );
                                            return (
                                                <div key={day} style={S.flex2}>
                                                    <span className="text-949-07em">{val}</span>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            maxWidth: '40px',
                                                            height: `${Math.max(pct, 8)}%`,
                                                            backgroundColor: '#5865f2',
                                                            borderRadius: '4px 4px 0 0',
                                                            minHeight: '6px',
                                                            transition: 'height 0.3s ease',
                                                        }}
                                                    />
                                                    <span className="text-949-07em">{day}</span>
                                                </div>
                                            );
                                        }
                                    )}
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
                            <h3>
                                <FaLink /> Webhook Oluştur
                            </h3>

                            <div className="form-group">
                                <label>Webhook URL *</label>
                                <input
                                    type="text"
                                    placeholder="https://your-server.com/webhook"
                                    value={webhookUrl}
                                    onChange={handleWebhookUrlChange}
                                    aria-label="https://your-server.com/webhook"
                                />
                            </div>

                            <div className="form-group">
                                <label>Olaylar</label>
                                <div className="webhook-events">
                                    {webhookEventOptions.map((event) => (
                                        <label key={event.id} className="event-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={webhookEvents.includes(event.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setWebhookEvents((prev) => [
                                                            ...prev,
                                                            event.id,
                                                        ]);
                                                    } else {
                                                        setWebhookEvents((prev) =>
                                                            prev.filter((ev) => ev !== event.id)
                                                        );
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
                                    aria-label="Action button"
                                    className="submit-btn"
                                    onClick={() => handleCreateWebhook(selectedBot.id)}
                                >
                                    Webhook Create
                                </button>
                                <button
                                    aria-label="handle Close Webhook Form"
                                    className="cancel-btn"
                                    onClick={handleCloseWebhookForm}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

BotDeveloperPortal.propTypes = {
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    currentUser: PropTypes.object,
};
export default memo(BotDeveloperPortal);
