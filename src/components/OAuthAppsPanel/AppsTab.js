import { FaPlus, FaCopy, FaTrash } from 'react-icons/fa';
import { styles } from './oauthStyles';

const AppsTab = ({ o }) => (
    <>
        <div style={styles.toolbar}>
            <button onClick={() => o.setShowCreateApp(!o.showCreateApp)} style={styles.createButton}>
                <FaPlus style={{ marginRight: '5px' }} /> New OAuth App
            </button>
        </div>

        {o.showCreateApp && (
            <div style={styles.createForm}>
                <h3 style={styles.formTitle}>Create OAuth Application</h3>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Application Name</label>
                    <input type="text" value={o.newApp.name}
                        onChange={(e) => o.setNewApp({ ...o.newApp, name: e.target.value })}
                        placeholder="My Awesome App" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea value={o.newApp.description}
                        onChange={(e) => o.setNewApp({ ...o.newApp, description: e.target.value })}
                        placeholder="What does your app do?" style={{ ...styles.input, minHeight: '60px' }} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Redirect URIs (one per line)</label>
                    <textarea value={o.newApp.redirect_uris}
                        onChange={(e) => o.setNewApp({ ...o.newApp, redirect_uris: e.target.value })}
                        placeholder="https://example.com/callback" style={{ ...styles.input, minHeight: '80px' }} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Scopes</label>
                    <div style={styles.scopesGrid}>
                        {o.availableScopes.map(scope => (
                            <label key={scope} style={styles.scopeCheckbox}>
                                <input type="checkbox" checked={o.newApp.scopes.includes(scope)}
                                    onChange={() => o.toggleScope(scope)} />
                                <span>{scope}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div style={styles.formActions}>
                    <button onClick={o.createApp} style={styles.submitButton}>Create Application</button>
                    <button onClick={() => o.setShowCreateApp(false)} style={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        )}

        <div style={styles.appsList}>
            {o.apps.length === 0 ? (
                <div style={styles.empty}>No OAuth apps yet. Create one to get started!</div>
            ) : (
                o.apps.map(app => (
                    <div key={app.id} style={styles.appCard}>
                        <div style={styles.appHeader}>
                            <div>
                                <div style={styles.appName}>{app.name}</div>
                                <div style={styles.appDescription}>{app.description}</div>
                            </div>
                            <button onClick={() => o.deleteApp(app.id)} style={styles.deleteButton}><FaTrash /></button>
                        </div>
                        <div style={styles.appDetails}>
                            <div style={styles.credential}>
                                <strong>Client ID:</strong>
                                <code style={styles.code}>{app.client_id}</code>
                                <button onClick={() => o.copyToClipboard(app.client_id, 'Client ID')} style={styles.copyButton}><FaCopy /></button>
                            </div>
                            <div style={styles.detail}><strong>Scopes:</strong> {app.scopes?.join(', ') || 'None'}</div>
                            <div style={styles.detail}>
                                <strong>Redirect URIs:</strong>
                                {app.redirect_uris?.map((uri, idx) => <div key={idx} style={styles.uri}>{uri}</div>)}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </>
);

export default AppsTab;
