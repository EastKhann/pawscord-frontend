// frontend/src/components/SSOIntegration.js
export default SSOIntegration;

};
    }
        fontWeight: '500'
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '8px 16px',
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#5865f2',
    saveButton: {
    },
        cursor: 'pointer'
        borderRadius: '4px',
        padding: '8px 16px',
        border: 'none',
        color: '#ffffff',
        backgroundColor: 'transparent',
    cancelButton: {
    },
        marginTop: '16px'
        justifyContent: 'flex-end',
        gap: '8px',
        display: 'flex',
    modalButtons: {
    },
        outline: 'none'
        fontSize: '14px',
        borderRadius: '4px',
        padding: '10px',
        color: '#dcddde',
        border: 'none',
        backgroundColor: '#202225',
        width: '100%',
    input: {
    },
        gap: '12px'
        flexDirection: 'column',
        display: 'flex',
    form: {
    },
        marginBottom: '16px'
        color: '#ffffff',
    modalTitle: {
    },
        maxWidth: '500px'
        width: '90%',
        padding: '24px',
        borderRadius: '8px',
        backgroundColor: '#36393f',
    modal: {
    },
        zIndex: 10001
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        position: 'fixed',
    modalOverlay: {
    },
        margin: 0
        paddingLeft: '20px',
        fontSize: '14px',
        color: '#b9bbbe',
    infoList: {
    },
        marginBottom: '12px'
        fontSize: '16px',
        color: '#ffffff',
    infoTitle: {
    },
        padding: '20px'
        borderRadius: '8px',
        backgroundColor: '#36393f',
    infoBox: {
    },
        fontSize: '13px'
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '8px 16px',
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#5865f2',
    configButton: {
    },
        color: '#72767d'
    statusInactive: {
    },
        color: '#3ba55d'
    statusActive: {
    },
        fontSize: '12px'
    providerStatus: {
    },
        marginBottom: '4px'
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#ffffff',
    providerName: {
    },
        flex: 1
    providerInfo: {
    },
        justifyContent: 'center'
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        height: '60px',
        width: '60px',
    providerIcon: {
    },
        gap: '16px'
        alignItems: 'center',
        display: 'flex',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#36393f',
    providerCard: {
    },
        marginBottom: '24px'
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        display: 'grid',
    providerGrid: {
    },
        lineHeight: '1.5'
        marginBottom: '24px',
        fontSize: '14px',
        color: '#b9bbbe',
    description: {
    },
        padding: '20px'
        overflowY: 'auto',
        flex: 1,
    content: {
    },
        fontSize: '28px'
        cursor: 'pointer',
        color: '#b9bbbe',
        border: 'none',
        background: 'none',
    closeButton: {
    },
        color: '#ffffff'
        fontSize: '20px',
        margin: 0,
    title: {
    },
        gap: '12px'
        alignItems: 'center',
        display: 'flex',
    headerLeft: {
    },
        borderBottom: '1px solid #202225'
        padding: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
    header: {
    },
        flexDirection: 'column'
        display: 'flex',
        maxHeight: '90vh',
        maxWidth: '900px',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: '#2f3136',
    panel: {
    },
        padding: '20px'
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        position: 'fixed',
    overlay: {
const styles = {

};
    );
        </div>
            </div>
                </div>
                    </div>
                        <button onClick={handleSave} style={styles.saveButton}>Kaydet</button>
                        <button onClick={onClose} style={styles.cancelButton}>İptal</button>
                    <div style={styles.modalButtons}>
                    )}
                        </>
                            />
                                style={styles.input}
                                onChange={(e) => setConfig({...config, domain: e.target.value})}
                                value={config.domain}
                                placeholder="Domain (örn: company.com)"
                                type="text"
                            <input
                            />
                                style={styles.input}
                                onChange={(e) => setConfig({...config, client_secret: e.target.value})}
                                value={config.client_secret}
                                placeholder="Client Secret"
                                type="password"
                            <input
                            />
                                style={styles.input}
                                onChange={(e) => setConfig({...config, client_id: e.target.value})}
                                value={config.client_id}
                                placeholder="Client ID"
                                type="text"
                            <input
                        <>
                    ) : (
                        </>
                            />
                                style={{...styles.input, minHeight: '100px'}}
                                placeholder="SAML Certificate (PEM format)"
                            <textarea
                            />
                                style={styles.input}
                                onChange={(e) => setConfig({...config, metadata_url: e.target.value})}
                                value={config.metadata_url}
                                placeholder="SAML Metadata URL"
                                type="text"
                            <input
                        <>
                    {provider.id === 'saml' ? (
                <div style={styles.form}>
                <h3 style={styles.modalTitle}>{provider.name} Yapılandırması</h3>
            <div style={styles.modal}>
        <div style={styles.modalOverlay}>
    return (

    };
        onClose();
        onSave(provider.id, config);
    const handleSave = () => {

    });
        metadata_url: ''
        domain: '',
        client_secret: '',
        client_id: '',
    const [config, setConfig] = useState({
const SSOConfigModal = ({ provider, onClose, onSave }) => {

};
    );
        </div>
            </div>
                )}
                    />
                        onSave={configureSSOProvider}
                        onClose={() => setShowAddModal(false)}
                        provider={showAddModal}
                    <SSOConfigModal
                {showAddModal && (

                </div>
                    </div>
                        </ul>
                            <li>Denetim günlükleri entegrasyonu</li>
                            <li>Şifre yönetimi gerekmez</li>
                            <li>Tek tıkla giriş</li>
                            <li>Merkezi kullanıcı yönetimi</li>
                            <li>Geliştirilmiş güvenlik</li>
                        <ul style={styles.infoList}>
                        <h4 style={styles.infoTitle}>SSO Avantajları</h4>
                    <div style={styles.infoBox}>

                    </div>
                        ))}
                            </div>
                                </button>
                                    {ssoProviders.find(p => p.provider === provider.id) ? 'Düzenle' : 'Yapılandır'}
                                >
                                    style={styles.configButton}
                                    onClick={() => setShowAddModal(provider)}
                                <button
                                </div>
                                    </div>
                                        )}
                                            <span style={styles.statusInactive}>Yapılandırılmadı</span>
                                        ) : (
                                            <span style={styles.statusActive}>✓ Aktif</span>
                                        {ssoProviders.find(p => p.provider === provider.id) ? (
                                    <div style={styles.providerStatus}>
                                    <div style={styles.providerName}>{provider.name}</div>
                                <div style={styles.providerInfo}>
                                </div>
                                    <provider.icon size={32} color={provider.color} />
                                <div style={styles.providerIcon}>
                            <div key={provider.id} style={styles.providerCard}>
                        {providers.map(provider => (
                    <div style={styles.providerGrid}>

                    </div>
                        Single Sign-On (SSO) ile çalışanlarınızın mevcut kurumsal kimlik bilgileriyle giriş yapmasını sağlayın.
                    <div style={styles.description}>
                <div style={styles.content}>

                </div>
                    <button onClick={onClose} style={styles.closeButton}>×</button>
                    </div>
                        <h2 style={styles.title}>Enterprise SSO</h2>
                        <FaKey size={24} color="#5865f2" />
                    <div style={styles.headerLeft}>
                <div style={styles.header}>
            <div style={styles.panel}>
        <div style={styles.overlay}>
    return (

    };
        }
            console.error('SSO load error:', error);
        } catch (error) {
            }
                setSsoProviders(data.providers || []);
                const data = await res.json();
            if (res.ok) {
            const res = await fetchWithAuth(`${apiBaseUrl}/enterprise/sso/`);
        try {
    const loadSSOProviders = async () => {

    };
        }
            console.error('SSO config error:', error);
        } catch (error) {
            }
                loadSSOProviders();
                alert(`${provider.toUpperCase()} SSO başarıyla yapılandırıldı`);
            if (res.ok) {

            });
                body: JSON.stringify({ provider, config })
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            const res = await fetchWithAuth(`${apiBaseUrl}/enterprise/sso/`, {
        try {
    const configureSSOProvider = async (provider, config) => {

    ];
        { id: 'saml', name: 'SAML 2.0 (Generic)', icon: FaLock, color: '#5865f2' }
        { id: 'okta', name: 'Okta', icon: FaKey, color: '#007dc1' },
        { id: 'github', name: 'GitHub Enterprise', icon: FaGithub, color: '#181717' },
        { id: 'microsoft', name: 'Microsoft Azure AD', icon: FaMicrosoft, color: '#00a4ef' },
        { id: 'google', name: 'Google Workspace', icon: FaGoogle, color: '#4285f4' },
    const providers = [

    const [showAddModal, setShowAddModal] = useState(false);
    const [ssoProviders, setSsoProviders] = useState([]);
const SSOIntegration = ({ onClose, fetchWithAuth, apiBaseUrl }) => {

import { FaKey, FaGoogle, FaMicrosoft, FaGithub, FaLock } from 'react-icons/fa';
import React, { useState } from 'react';



