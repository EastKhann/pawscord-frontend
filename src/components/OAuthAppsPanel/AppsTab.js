/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaPlus, FaCopy, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { styles } from './oauthStyles';

import { useTranslation } from 'react-i18next';

const S = {
    size2: { ...styles.input, minHeight: '80px' },
    size: { ...styles.input, minHeight: '60px' },
};

const AppsTab = ({ o }) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={styles.toolbar}>
                <button
                    onClick={() => o.setShowCreateApp(!o.showCreateApp)}
                    style={styles.createButton}
                >
                    <FaPlus className="mr-5" /> New OAuth App
                </button>
            </div>

            {o.showCreateApp && (
                <div style={styles.createForm}>
                    <h3 style={styles.formTitle}>OAuth Uygulaması Oluştur</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Uygulama Adı</label>
                        <input
                            type="text"
                            value={o.newApp.name}
                            onChange={(e) => o.setNewApp({ ...o.newApp, name: e.target.value })}
                            placeholder="Harika Uygulamamı"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Açıklama</label>
                        <textarea
                            value={o.newApp.description}
                            onChange={(e) =>
                                o.setNewApp({ ...o.newApp, description: e.target.value })
                            }
                            placeholder="Uygulamanız ne yapar?"
                            style={S.size}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            Yönlendirme URI'leri (her satıra bir tane)
                        </label>
                        <textarea
                            value={o.newApp.redirect_uris}
                            onChange={(e) =>
                                o.setNewApp({ ...o.newApp, redirect_uris: e.target.value })
                            }
                            placeholder="https://example.com/callback"
                            style={S.size2}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Kapsam</label>
                        <div style={styles.scopesGrid}>
                            {o.availableScopes.map((scope) => (
                                <label key={scope} style={styles.scopeCheckbox}>
                                    <input
                                        type="checkbox"
                                        checked={o.newApp.scopes.includes(scope)}
                                        onChange={() => o.toggleScope(scope)}
                                    />
                                    <span>{scope}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div style={styles.formActions}>
                        <button onClick={o.createApp} style={styles.submitButton}>
                            Uygulama Oluştur
                        </button>
                        <button
                            onClick={() => o.setShowCreateApp(false)}
                            style={styles.cancelButton}
                        >
                            {t('common.cancel')}
                        </button>
                    </div>
                </div>
            )}

            <div style={styles.appsList}>
                {o.apps.length === 0 ? (
                    <div style={styles.empty}>
                        Henüz OAuth uygulaması yok. Başlamak için bir tane oluşturun!
                    </div>
                ) : (
                    o.apps.map((app) => (
                        <div key={app.id} style={styles.appCard}>
                            <div style={styles.appHeader}>
                                <div>
                                    <div style={styles.appName}>{app.name}</div>
                                    <div style={styles.appDescription}>{app.description}</div>
                                </div>
                                <button
                                    onClick={() => o.deleteApp(app.id)}
                                    style={styles.deleteButton}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div style={styles.appDetails}>
                                <div style={styles.credential}>
                                    <strong>Client ID:</strong>
                                    <code style={styles.code}>{app.client_id}</code>
                                    <button
                                        onClick={() =>
                                            o.copyToClipboard(app.client_id, 'Client ID')
                                        }
                                        style={styles.copyButton}
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                                <div style={styles.detail}>
                                    <strong>Kapsam:</strong> {app.scopes?.join(', ') || 'Yok'}
                                </div>
                                <div style={styles.detail}>
                                    <strong>Redirect URIs:</strong>
                                    {app.redirect_uris?.map((uri, idx) => (
                                        <div key={`item-${idx}`} style={styles.uri}>
                                            {uri}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

AppsTab.propTypes = {
    o: PropTypes.node,
};
export default AppsTab;
