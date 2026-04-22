/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const STAT_CARDS = [
    { icon: '🏰', key: 'servers_count', label: 'Server' },
    { icon: '👥', key: 'users_count', label: 'User' },
    { icon: '💬', key: 'messages_sent', label: 'Mesaj' },
    { icon: '📡', key: 'api_calls', label: t('botDetails.apiCalls', 'API Calls') },
];

const BotDetailsView = ({
    selectedBot,
    analytics,
    webhooks,
    showCredentials,
    setShowCredentials,
    handleCreateWebhook,
    handleDeleteBot,
    copyToClipboard,
    formatNumber,
}) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('botDeveloper.detailsView', 'Bot details')} className="bot-details">
            {showCredentials && (
                <div className="credentials-alert">
                    <h4>⚠️ Bot Kimlik Bilgileri</h4>
                    <p>{t('botDetails.storeSecure', 'Store this information in a safe place! It will not be shown again.')}</p>
                    {[
                        { label: 'Client ID', value: selectedBot.client_id },
                        { label: 'Client Secret', value: selectedBot.client_secret },
                        { label: 'Bot Token', value: selectedBot.api_token },
                    ].map(({ label, value }) => (
                        <div key={label} className="credential-item">
                            <label>{label}:</label>
                            <div className="credential-value">
                                <code>{value}</code>
                                <button onClick={() => copyToClipboard(value, label)}>📋</button>
                            </div>
                        </div>
                    ))}
                    <button className="dismiss-btn" onClick={() => setShowCredentials(false)}>{t('common.understood', 'Got it')}</button>
                </div>
            )}

            <div className="details-header">
                <div className="bot-info">
                    <div className="bot-avatar-large">
                        {selectedBot.avatar_url ? (
                            <img src={selectedBot.avatar_url} alt={selectedBot.name} />
                        ) : (
                            <div className="default-avatar">🤖</div>
                        )}
                    </div>
                    <div>
                        <h2>{selectedBot.name}</h2>
                        <p>{selectedBot.description}</p>
                        <div className="bot-id">
                            ID: {selectedBot.client_id?.substring(0, 16)}...
                        </div>
                    </div>
                </div>
            </div>

            {analytics && (
                <div className="analytics-section">
                    <h3>📊 Statistics</h3>
                    <div className="analytics-grid">
                        {STAT_CARDS.map((s) => (
                            <div key={s.key} className="stat-card">
                                <div className="stat-icon">{s.icon}</div>
                                <div className="stat-value">{formatNumber(analytics[s.key])}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="webhooks-section">
                <div className="section-header">
                    <h3>🔗 Webhooks</h3>
                    <button
                        className="add-webhook-btn"
                        onClick={() => handleCreateWebhook(selectedBot.id)}
                    >
                        ➕ Webhook Add
                    </button>
                </div>
                {webhooks.length > 0 ? (
                    <div className="webhooks-list">
                        {webhooks.map((wh, idx) => (
                            <div key={`item-${idx}`} className="webhook-item">
                                <div className="webhook-icon">🔗</div>
                                <div className="webhook-info">
                                    <div className="webhook-url">{wh.url}</div>
                                    <div className="webhook-meta">
                                        {t('apiKeys.created', 'Created:')}{' '}
                                        {new Date(wh.created_at).toLocaleDateString('tr-TR')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-webhooks">
                        <p>{t('botDetails.noWebhooks', 'No webhooks yet')}</p>
                    </div>
                )}
            </div>

            <div className="danger-zone">
                <h3>⚠️ Danger Zone</h3>
                <button className="delete-bot-btn" onClick={() => handleDeleteBot(selectedBot.id)}>
                    🗑️ Botu Delete
                </button>
            </div>
        </div>
    );
};

BotDetailsView.propTypes = {
    selectedBot: PropTypes.bool,
    analytics: PropTypes.array,
    webhooks: PropTypes.array,
    showCredentials: PropTypes.bool,
    setShowCredentials: PropTypes.func,
    handleCreateWebhook: PropTypes.func,
    handleDeleteBot: PropTypes.func,
    copyToClipboard: PropTypes.object,
    formatNumber: PropTypes.func,
};
export default BotDetailsView;
