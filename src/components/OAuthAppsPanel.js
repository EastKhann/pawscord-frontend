import { useState, useEffect } from 'react';
import { FaTimes, FaRobot, FaPlus, FaKey, FaCopy, FaTrash, FaCode, FaCog } from 'react-icons/fa';
import { toast } from '../utils/toast';

const OAuthAppsPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const [apps, setApps] = useState([]);
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('apps'); // apps, bots
    const [showCreateApp, setShowCreateApp] = useState(false);
    const [showCreateBot, setShowCreateBot] = useState(false);
    const [newApp, setNewApp] = useState({ name: '', description: '', redirect_uris: '', scopes: [] });
    const [newBot, setNewBot] = useState({ name: '', description: '' });

    const availableScopes = ['read_messages', 'send_messages', 'manage_channels', 'manage_roles', 'manage_server', 'read_user', 'modify_user'];

    useEffect(() => {
        fetchApps();
        fetchBots();
    }, []);

    const fetchApps = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/oauth/apps/list/`);
            const data = await response.json();
            setApps(data.apps || []);
        } catch (error) {
            toast.error('Failed to load OAuth apps');
        } finally {
            setLoading(false);
        }
    };

    const fetchBots = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bots/list/`);
            const data = await response.json();
            setBots(data.bots || []);
        } catch (error) {
            toast.error('Failed to load bots');
        }
    };

    const createApp = async () => {
        if (!newApp.name) {
            toast.error('App name is required');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/oauth/apps/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newApp,
                    redirect_uris: newApp.redirect_uris.split('\n').filter(uri => uri.trim())
                })
            });

            const data = await response.json();
            toast.success('OAuth app created successfully');
            setShowCreateApp(false);
            setNewApp({ name: '', description: '', redirect_uris: '', scopes: [] });
            fetchApps();

            // Show client ID and secret
            if (data.client_id && data.client_secret) {
                toast.info(`Client ID: ${data.client_id}\nClient Secret: ${data.client_secret}\n\nSave these credentials securely. The secret will not be shown again.`);
            }
        } catch (error) {
            toast.error('Failed to create OAuth app');
        }
    };

    const createBot = async () => {
        if (!newBot.name) {
            toast.error('Bot name is required');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bots/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBot)
            });

            const data = await response.json();
            toast.success('Bot created successfully');
            setShowCreateBot(false);
            setNewBot({ name: '', description: '' });
            fetchBots();

            // Show bot token
            if (data.token) {
                toast.info(`Bot Token: ${data.token}\n\nSave this token securely. It will not be shown again.`);
            }
        } catch (error) {
            toast.error('Failed to create bot');
        }
    };

    const deleteApp = async (appId) => {
        if (!confirm('Are you sure you want to delete this app? This cannot be undone.')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/oauth/apps/${appId}/delete/`, {
                method: 'DELETE'
            });

            toast.success('App deleted successfully');
            fetchApps();
        } catch (error) {
            toast.error('Failed to delete app');
        }
    };

    const deleteBot = async (botId) => {
        if (!confirm('Are you sure you want to delete this bot? This cannot be undone.')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/bots/${botId}/delete/`, {
                method: 'DELETE'
            });

            toast.success('Bot deleted successfully');
            fetchBots();
        } catch (error) {
            toast.error('Failed to delete bot');
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`);
    };

    const toggleScope = (scope) => {
        setNewApp(prev => ({
            ...prev,
            scopes: prev.scopes.includes(scope)
                ? prev.scopes.filter(s => s !== scope)
                : [...prev.scopes, scope]
        }));
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaRobot style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Developer Portal</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button
                        onClick={() => setActiveTab('apps')}
                        style={{ ...styles.tab, ...(activeTab === 'apps' && styles.tabActive) }}
                    >
                        <FaCode style={{ marginRight: '5px' }} />
                        OAuth Apps ({apps.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('bots')}
                        style={{ ...styles.tab, ...(activeTab === 'bots' && styles.tabActive) }}
                    >
                        <FaRobot style={{ marginRight: '5px' }} />
                        Bots ({bots.length})
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : activeTab === 'apps' ? (
                        <>
                            <div style={styles.toolbar}>
                                <button onClick={() => setShowCreateApp(!showCreateApp)} style={styles.createButton}>
                                    <FaPlus style={{ marginRight: '5px' }} />
                                    New OAuth App
                                </button>
                            </div>

                            {showCreateApp && (
                                <div style={styles.createForm}>
                                    <h3 style={styles.formTitle}>Create OAuth Application</h3>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Application Name</label>
                                        <input
                                            type="text"
                                            value={newApp.name}
                                            onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                                            placeholder="My Awesome App"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Description</label>
                                        <textarea
                                            value={newApp.description}
                                            onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                                            placeholder="What does your app do?"
                                            style={{ ...styles.input, minHeight: '60px' }}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Redirect URIs (one per line)</label>
                                        <textarea
                                            value={newApp.redirect_uris}
                                            onChange={(e) => setNewApp({ ...newApp, redirect_uris: e.target.value })}
                                            placeholder="https://example.com/callback"
                                            style={{ ...styles.input, minHeight: '80px' }}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Scopes</label>
                                        <div style={styles.scopesGrid}>
                                            {availableScopes.map(scope => (
                                                <label key={scope} style={styles.scopeCheckbox}>
                                                    <input
                                                        type="checkbox"
                                                        checked={newApp.scopes.includes(scope)}
                                                        onChange={() => toggleScope(scope)}
                                                    />
                                                    <span>{scope}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={styles.formActions}>
                                        <button onClick={createApp} style={styles.submitButton}>
                                            Create Application
                                        </button>
                                        <button onClick={() => setShowCreateApp(false)} style={styles.cancelButton}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div style={styles.appsList}>
                                {apps.length === 0 ? (
                                    <div style={styles.empty}>No OAuth apps yet. Create one to get started!</div>
                                ) : (
                                    apps.map(app => (
                                        <div key={app.id} style={styles.appCard}>
                                            <div style={styles.appHeader}>
                                                <div>
                                                    <div style={styles.appName}>{app.name}</div>
                                                    <div style={styles.appDescription}>{app.description}</div>
                                                </div>
                                                <button onClick={() => deleteApp(app.id)} style={styles.deleteButton}>
                                                    <FaTrash />
                                                </button>
                                            </div>

                                            <div style={styles.appDetails}>
                                                <div style={styles.credential}>
                                                    <strong>Client ID:</strong>
                                                    <code style={styles.code}>{app.client_id}</code>
                                                    <button onClick={() => copyToClipboard(app.client_id, 'Client ID')} style={styles.copyButton}>
                                                        <FaCopy />
                                                    </button>
                                                </div>

                                                <div style={styles.detail}>
                                                    <strong>Scopes:</strong> {app.scopes?.join(', ') || 'None'}
                                                </div>

                                                <div style={styles.detail}>
                                                    <strong>Redirect URIs:</strong>
                                                    {app.redirect_uris?.map((uri, idx) => (
                                                        <div key={idx} style={styles.uri}>{uri}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={styles.toolbar}>
                                <button onClick={() => setShowCreateBot(!showCreateBot)} style={styles.createButton}>
                                    <FaPlus style={{ marginRight: '5px' }} />
                                    New Bot
                                </button>
                            </div>

                            {showCreateBot && (
                                <div style={styles.createForm}>
                                    <h3 style={styles.formTitle}>Create Bot Account</h3>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Bot Name</label>
                                        <input
                                            type="text"
                                            value={newBot.name}
                                            onChange={(e) => setNewBot({ ...newBot, name: e.target.value })}
                                            placeholder="My Bot"
                                            style={styles.input}
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Description</label>
                                        <textarea
                                            value={newBot.description}
                                            onChange={(e) => setNewBot({ ...newBot, description: e.target.value })}
                                            placeholder="What does your bot do?"
                                            style={{ ...styles.input, minHeight: '60px' }}
                                        />
                                    </div>

                                    <div style={styles.formActions}>
                                        <button onClick={createBot} style={styles.submitButton}>
                                            Create Bot
                                        </button>
                                        <button onClick={() => setShowCreateBot(false)} style={styles.cancelButton}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div style={styles.botsList}>
                                {bots.length === 0 ? (
                                    <div style={styles.empty}>No bots yet. Create one to automate tasks!</div>
                                ) : (
                                    bots.map(bot => (
                                        <div key={bot.id} style={styles.botCard}>
                                            <div style={styles.botHeader}>
                                                <FaRobot style={{ fontSize: '32px', color: '#5865f2' }} />
                                                <div style={{ flex: 1, marginLeft: '12px' }}>
                                                    <div style={styles.botName}>{bot.name}</div>
                                                    <div style={styles.botDescription}>{bot.description}</div>
                                                    <div style={styles.botStatus}>
                                                        Status: {bot.is_active ? '🟢 Active' : '🔴 Inactive'}
                                                    </div>
                                                </div>
                                                <button onClick={() => deleteBot(bot.id)} style={styles.deleteButton}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #2c2f33',
        padding: '0 20px',
    },
    tab: {
        padding: '12px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid transparent',
    },
    tabActive: {
        color: '#5865f2',
        borderBottom: '2px solid #5865f2',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    toolbar: {
        marginBottom: '20px',
    },
    createButton: {
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
    },
    createForm: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
    },
    formTitle: {
        margin: '0 0 16px 0',
        fontSize: '16px',
        color: '#ffffff',
    },
    formGroup: {
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        color: '#dcddde',
        fontSize: '14px',
        marginBottom: '8px',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
    },
    scopesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
    },
    scopeCheckbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer',
    },
    formActions: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
        marginTop: '20px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#4f545c',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    appsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    appCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
    },
    appHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
    },
    appName: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    appDescription: {
        fontSize: '14px',
        color: '#99aab5',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: '#f04747',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '5px',
    },
    appDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    credential: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        color: '#dcddde',
    },
    code: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#5865f2',
    },
    copyButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '5px',
    },
    detail: {
        fontSize: '14px',
        color: '#dcddde',
    },
    uri: {
        fontSize: '13px',
        color: '#5865f2',
        marginLeft: '8px',
        fontFamily: 'monospace',
    },
    botsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    botCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
    },
    botHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    botName: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    botDescription: {
        fontSize: '14px',
        color: '#99aab5',
        marginBottom: '4px',
    },
    botStatus: {
        fontSize: '13px',
        color: '#dcddde',
    },
};

export default OAuthAppsPanel;
