// frontend/src/components/IPWhitelistPanel.js - IP Whitelist Management for Security
import React, { useState, useEffect } from 'react';
import {
    FaShieldAlt, FaTimes, FaPlus, FaTrash, FaSearch, FaGlobe,
    FaCheck, FaBan, FaInfoCircle, FaClock, FaUser, FaExclamationTriangle,
    FaDownload, FaUpload, FaFilter, FaHistory
} from 'react-icons/fa';
import toast from '../utils/toast';
import './IPWhitelistPanel.css';
import confirmDialog from '../utils/confirmDialog';

const IPWhitelistPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [activeTab, setActiveTab] = useState('whitelist'); // 'whitelist', 'blacklist', 'logs'
    const [whitelist, setWhitelist] = useState([]);
    const [blacklist, setBlacklist] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Form state
    const [newEntry, setNewEntry] = useState({
        ip_address: '',
        description: '',
        expires_at: '',
        type: 'whitelist' // 'whitelist' or 'blacklist'
    });

    useEffect(() => {
        fetchIPLists();
        fetchLogs();
    }, [serverId]);

    const fetchIPLists = async () => {
        try {
            const token = localStorage.getItem('access_token');

            // Fetch whitelist
            const whitelistRes = await fetch(`${apiBaseUrl}/security/ip-whitelist/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (whitelistRes.ok) {
                const data = await whitelistRes.json();
                setWhitelist(data.ips || []);
            }

            // Fetch blacklist
            const blacklistRes = await fetch(`${apiBaseUrl}/security/ip-blacklist/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (blacklistRes.ok) {
                const data = await blacklistRes.json();
                setBlacklist(data.ips || []);
            }
        } catch (error) {
            console.error('Fetch IP lists error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLogs = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/security/access-logs/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setLogs(data.logs || []);
            }
        } catch (error) {
            console.error('Fetch logs error:', error);
        }
    };

    const handleAdd = async () => {
        if (!newEntry.ip_address.trim()) {
            toast.error('IP adresi gerekli');
            return;
        }

        // Basic IP validation
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/;
        if (!ipRegex.test(newEntry.ip_address)) {
            toast.error('Geçersiz IP formatı (örn: 192.168.1.1 veya 192.168.1.0/24)');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const endpoint = newEntry.type === 'whitelist'
                ? `${apiBaseUrl}/security/ip-whitelist/add/`
                : `${apiBaseUrl}/security/ip-blacklist/add/`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEntry)
            });

            if (response.ok) {
                toast.success(`✅ IP ${newEntry.type === 'whitelist' ? 'beyaz' : 'kara'} listeye eklendi`);
                fetchIPLists();
                setShowAddModal(false);
                resetForm();
            } else {
                const err = await response.json();
                toast.error(err.error || 'Ekleme başarısız');
            }
        } catch (error) {
            console.error('Add IP error:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const handleDelete = async (ipId, type) => {
        if (!await confirmDialog('Bu IP adresini listeden kaldırmak istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const endpoint = type === 'whitelist'
                ? `${apiBaseUrl}/security/ip-whitelist/${ipId}/remove/`
                : `${apiBaseUrl}/security/ip-blacklist/${ipId}/remove/`;

            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🗑️ IP kaldırıldı');
                fetchIPLists();
            }
        } catch (error) {
            console.error('Delete IP error:', error);
        }
    };

    const blockIP = async (ip) => {
        setNewEntry({
            ip_address: ip,
            description: 'Otomatik engelleme',
            expires_at: '',
            type: 'blacklist'
        });
        setShowAddModal(true);
    };

    const resetForm = () => {
        setNewEntry({
            ip_address: '',
            description: '',
            expires_at: '',
            type: 'whitelist'
        });
    };

    const filteredWhitelist = whitelist.filter(ip =>
        ip.ip_address.includes(searchQuery) || ip.description?.includes(searchQuery)
    );

    const filteredBlacklist = blacklist.filter(ip =>
        ip.ip_address.includes(searchQuery) || ip.description?.includes(searchQuery)
    );

    return (
        <div className="ip-whitelist-overlay" onClick={onClose}>
            <div className="ip-whitelist-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaShieldAlt /> IP Güvenlik Yönetimi</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeTab === 'whitelist' ? 'active' : ''}`}
                        onClick={() => setActiveTab('whitelist')}
                    >
                        <FaCheck /> Beyaz Liste
                        <span className="badge success">{whitelist.length}</span>
                    </button>
                    <button
                        className={`tab ${activeTab === 'blacklist' ? 'active' : ''}`}
                        onClick={() => setActiveTab('blacklist')}
                    >
                        <FaBan /> Kara Liste
                        <span className="badge danger">{blacklist.length}</span>
                    </button>
                    <button
                        className={`tab ${activeTab === 'logs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('logs')}
                    >
                        <FaHistory /> Erişim Logları
                    </button>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="IP veya açıklama ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="add-btn" onClick={() => setShowAddModal(true)}>
                        <FaPlus /> IP Ekle
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : activeTab === 'whitelist' ? (
                        <IPList
                            ips={filteredWhitelist}
                            type="whitelist"
                            onDelete={handleDelete}
                        />
                    ) : activeTab === 'blacklist' ? (
                        <IPList
                            ips={filteredBlacklist}
                            type="blacklist"
                            onDelete={handleDelete}
                        />
                    ) : (
                        <AccessLogs logs={logs} onBlock={blockIP} />
                    )}
                </div>

                {showAddModal && (
                    <AddIPModal
                        entry={newEntry}
                        setEntry={setNewEntry}
                        onAdd={handleAdd}
                        onClose={() => { setShowAddModal(false); resetForm(); }}
                    />
                )}
            </div>
        </div>
    );
};

// IP List Component
const IPList = ({ ips, type, onDelete }) => {
    if (ips.length === 0) {
        return (
            <div className="empty-state">
                {type === 'whitelist' ? <FaCheck /> : <FaBan />}
                <p>{type === 'whitelist' ? 'Beyaz' : 'Kara'} listede IP bulunmuyor</p>
            </div>
        );
    }

    return (
        <div className="ip-list">
            {ips.map(ip => (
                <div key={ip.id} className={`ip-item ${type}`}>
                    <div className="ip-icon">
                        <FaGlobe />
                    </div>
                    <div className="ip-info">
                        <span className="ip-address">{ip.ip_address}</span>
                        {ip.description && (
                            <span className="ip-description">{ip.description}</span>
                        )}
                        <div className="ip-meta">
                            <span><FaUser /> {ip.added_by || 'Sistem'}</span>
                            <span><FaClock /> {new Date(ip.created_at).toLocaleDateString('tr-TR')}</span>
                            {ip.expires_at && (
                                <span className="expires">
                                    <FaExclamationTriangle /> {new Date(ip.expires_at).toLocaleDateString('tr-TR')} tarihinde sona erecek
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        className="delete-btn"
                        onClick={() => onDelete(ip.id, type)}
                    >
                        <FaTrash />
                    </button>
                </div>
            ))}
        </div>
    );
};

// Access Logs Component
const AccessLogs = ({ logs, onBlock }) => {
    if (logs.length === 0) {
        return (
            <div className="empty-state">
                <FaHistory />
                <p>Erişim logu bulunmuyor</p>
            </div>
        );
    }

    return (
        <div className="logs-list">
            {logs.map((log, index) => (
                <div key={index} className={`log-item ${log.blocked ? 'blocked' : ''}`}>
                    <div className="log-status">
                        {log.blocked ? (
                            <FaBan className="blocked-icon" />
                        ) : (
                            <FaCheck className="allowed-icon" />
                        )}
                    </div>
                    <div className="log-info">
                        <span className="log-ip">{log.ip_address}</span>
                        <span className="log-path">{log.path}</span>
                        <span className="log-time">
                            {new Date(log.timestamp).toLocaleString('tr-TR')}
                        </span>
                    </div>
                    <div className="log-details">
                        <span className="user-agent" title={log.user_agent}>
                            {log.user_agent?.substring(0, 50)}...
                        </span>
                        {log.country && (
                            <span className="country">{log.country}</span>
                        )}
                    </div>
                    {!log.blocked && (
                        <button
                            className="block-btn"
                            onClick={() => onBlock(log.ip_address)}
                            title="Bu IP'yi engelle"
                        >
                            <FaBan />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

// Add IP Modal
const AddIPModal = ({ entry, setEntry, onAdd, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="add-ip-modal" onClick={e => e.stopPropagation()}>
                <h3><FaPlus /> IP Adresi Ekle</h3>

                <div className="form-group">
                    <label>Liste Türü</label>
                    <div className="type-selector">
                        <button
                            className={`type-btn ${entry.type === 'whitelist' ? 'active whitelist' : ''}`}
                            onClick={() => setEntry(prev => ({ ...prev, type: 'whitelist' }))}
                        >
                            <FaCheck /> Beyaz Liste
                        </button>
                        <button
                            className={`type-btn ${entry.type === 'blacklist' ? 'active blacklist' : ''}`}
                            onClick={() => setEntry(prev => ({ ...prev, type: 'blacklist' }))}
                        >
                            <FaBan /> Kara Liste
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label><FaGlobe /> IP Adresi *</label>
                    <input
                        type="text"
                        value={entry.ip_address}
                        onChange={(e) => setEntry(prev => ({ ...prev, ip_address: e.target.value }))}
                        placeholder="192.168.1.1 veya 192.168.1.0/24"
                    />
                    <span className="hint">Tekil IP veya CIDR notasyonu kullanabilirsiniz</span>
                </div>

                <div className="form-group">
                    <label><FaInfoCircle /> Açıklama</label>
                    <input
                        type="text"
                        value={entry.description}
                        onChange={(e) => setEntry(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Bu IP neden eklendi?"
                    />
                </div>

                <div className="form-group">
                    <label><FaClock /> Sona Erme Tarihi (İsteğe Bağlı)</label>
                    <input
                        type="datetime-local"
                        value={entry.expires_at}
                        onChange={(e) => setEntry(prev => ({ ...prev, expires_at: e.target.value }))}
                    />
                    <span className="hint">Boş bırakırsanız kalıcı olur</span>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="save-btn" onClick={onAdd}>
                        <FaPlus /> Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IPWhitelistPanel;
