import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';

// -- extracted inline style constants --
const _st1 = { marginBottom: '32px' };
const _st2 = { color: '#fff', marginBottom: '12px' };
const _st3 = { color: '#b5bac1', fontSize: '14px' };
const _st4 = { display: 'flex', flexDirection: 'column', gap: '12px' };
const _st5 = {
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
};
const _st6 = { color: '#fff', margin: '0 0 8px 0' };
const _st7 = { color: '#b5bac1', margin: 0, fontSize: '13px' };
const _st8 = { wordBreak: 'break-all' };
const _st9 = {
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
};
const _st10 = { width: '48px', height: '48px', borderRadius: '50%' };
const _st11 = { color: '#fff', margin: '0 0 4px 0' };

const DeveloperTab = ({ botAccounts: rawBots, oauthApps: rawOAuth, webhooks: rawWH }) => {
    const oauthApps = rawOAuth || [];
    const webhooks = rawWH || [];
    const botAccounts = rawBots || [];
    const styles = profileStyles;
    const { t } = useTranslation();
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div aria-label="developer tab" style={styles.card}>
            <h3 style={styles.sectionTitle}>{t('developer.title')}</h3>

            {/* OAuth Apps */}
            <div style={_st1}>
                <h4 style={_st2}>{t('developer.oauthApps')}</h4>
                {oauthApps.length === 0 ? (
                    <p style={_st3}>{t('developer.noOAuthApps')}</p>
                ) : (
                    <div style={_st4}>
                        {oauthApps.map((app, idx) => (
                            <div key={`item-${idx}`} style={_st5}>
                                <h5 style={_st6}>{app.name}</h5>
                                <p style={_st7}>
                                    Client ID: <code>{app.client_id}</code>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Webhooks */}
            <div style={_st1}>
                <h4 style={_st2}>{t('developer.webhooks')}</h4>
                {webhooks.length === 0 ? (
                    <p style={_st3}>{t('developer.noWebhooks')}</p>
                ) : (
                    <div style={_st4}>
                        {webhooks.map((webhook, idx) => (
                            <div key={`item-${idx}`} style={_st5}>
                                <h5 style={_st6}>{webhook.name}</h5>
                                <p style={_st7}>
                                    URL: <code style={_st8}>{webhook.url}</code>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bot Accounts */}
            <div>
                <h4 style={_st2}>{t('developer.botAccounts')}</h4>
                {botAccounts.length === 0 ? (
                    <p style={_st3}>{t('developer.noBotAccounts')}</p>
                ) : (
                    <div style={_st4}>
                        {botAccounts.map((bot, idx) => (
                            <div key={`item-${idx}`} style={_st9}>
                                <img
                                    src={
                                        bot.avatar_url ||
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect fill="%235865f2" width="48" height="48" rx="24"/%3E%3Ctext x="24" y="24" font-size="22" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E🤖%3C/text%3E%3C/svg%3E'
                                    }
                                    alt={bot.username}
                                    style={_st10}
                                />
                                <div>
                                    <h5 style={_st11}>{bot.username}</h5>
                                    <p style={_st7}>
                                        Token: <code>{bot.token?.substring(0, 20)}...</code>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

DeveloperTab.propTypes = {
    botAccounts: PropTypes.array,
    oauthApps: PropTypes.array,
    webhooks: PropTypes.array,
};
export default DeveloperTab;
