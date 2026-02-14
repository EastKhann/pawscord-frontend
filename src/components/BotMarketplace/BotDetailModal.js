import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../../utils/apiEndpoints';
import toast from '../../utils/toast';

const BotDetailModal = ({ bot, onClose, onInstall }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showServerSelect, setShowServerSelect] = useState(false);
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const [installing, setInstalling] = useState(false);

    const API_URL = API_BASE_URL;

    const loadServers = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_URL}/bots/my-servers/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setServers(data.servers || []);
            }
        } catch (e) {
            console.error('Failed to load servers:', e);
        }
    }, [API_URL]);

    const handleInstall = async () => {
        if (!selectedServer) return;
        setInstalling(true);

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_URL}/bots/${bot.id}/install/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: selectedServer.id })
            });

            if (response.ok) {
                onInstall?.(bot, selectedServer);
                setShowServerSelect(false);
                toast.success(`${bot.name} ba\u015Far\u0131yla ${selectedServer.name} sunucusuna eklendi!`);
            } else {
                const error = await response.json();
                toast.error(error.error || 'Y\u00FCkleme ba\u015Far\u0131s\u0131z');
            }
        } catch (e) {
            console.error('Install failed:', e);
        }
        setInstalling(false);
    };

    useEffect(() => {
        loadServers();
    }, [loadServers]);

    if (!bot) return null;

    return (
        <div className="bot-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="bot-modal">
                {/* Header */}
                <div className="bot-modal-header" style={{ backgroundImage: bot.banner ? `url(${bot.banner})` : undefined }}>
                    <button className="modal-close" onClick={onClose}>{'\u00D7'}</button>
                    <div className="bot-header-content">
                        <img src={bot.avatar || '/default-bot.png'} alt={bot.name} className="bot-large-avatar" />
                        <div className="bot-header-info">
                            <h2>
                                {bot.name}
                                {bot.is_verified && <span className="verified">{'\u2713'} Do\u011Frulanm\u0131\u015F</span>}
                            </h2>
                            <p>{bot.short_description}</p>
                            <div className="bot-stats">
                                <span>{'\uD83D\uDCE5'} {bot.install_count?.toLocaleString()} sunucu</span>
                                <span>{'\u2B50'} {bot.avg_rating} ({bot.review_count} yorum)</span>
                            </div>
                        </div>
                        <button
                            className="add-bot-btn"
                            onClick={() => setShowServerSelect(true)}
                        >
                            Sunucuya Ekle
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bot-modal-tabs">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
                        Genel Bak\u0131\u015F
                    </button>
                    <button className={activeTab === 'commands' ? 'active' : ''} onClick={() => setActiveTab('commands')}>
                        Komutlar
                    </button>
                    <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>
                        Yorumlar
                    </button>
                </div>

                {/* Content */}
                <div className="bot-modal-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            <div className="description-section">
                                <h3>A\u00E7\u0131klama</h3>
                                <div className="description-content">{bot.description}</div>
                            </div>

                            {bot.features && bot.features.length > 0 && (
                                <div className="features-section">
                                    <h3>{'\u00D6'}zellikler</h3>
                                    <div className="features-list">
                                        {bot.features.map((feature, idx) => (
                                            <div key={idx} className="feature-item">{'\u2705'} {feature}</div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="links-section">
                                <h3>Ba\u011Flant\u0131lar</h3>
                                <div className="links-list">
                                    {bot.website && (
                                        <a href={bot.website} target="_blank" rel="noopener noreferrer">
                                            {'\uD83C\uDF10'} Web Sitesi
                                        </a>
                                    )}
                                    {bot.support_server && (
                                        <a href={`/invite/${bot.support_server}`}>
                                            {'\uD83D\uDCAC'} Destek Sunucusu
                                        </a>
                                    )}
                                    {bot.privacy_policy && (
                                        <a href={bot.privacy_policy} target="_blank" rel="noopener noreferrer">
                                            {'\uD83D\uDD12'} Gizlilik Politikas\u0131
                                        </a>
                                    )}
                                </div>
                            </div>

                            {bot.developer && (
                                <div className="developer-section">
                                    <h3>Geli\u015Ftirici</h3>
                                    <div className="developer-info">
                                        <img src={bot.developer.avatar || '/default-avatar.png'} alt="" />
                                        <span>{bot.developer.username}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'commands' && (
                        <div className="commands-tab">
                            {bot.commands && bot.commands.length > 0 ? (
                                <div className="commands-list">
                                    {bot.commands.map((cmd, idx) => (
                                        <div key={idx} className="command-item">
                                            <code className="command-name">{bot.prefix}{cmd.name}</code>
                                            <p className="command-desc">{cmd.description}</p>
                                            {cmd.usage && <code className="command-usage">{cmd.usage}</code>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data">Komut listesi mevcut de\u011Fil</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="reviews-tab">
                            {bot.reviews && bot.reviews.length > 0 ? (
                                <div className="reviews-list">
                                    {bot.reviews.map((review) => (
                                        <div key={review.id} className="review-item">
                                            <div className="review-header">
                                                <img src={review.avatar || '/default-avatar.png'} alt="" />
                                                <span className="reviewer-name">{review.user}</span>
                                                <span className="review-rating">
                                                    {'\u2B50'.repeat(review.rating)}
                                                </span>
                                            </div>
                                            <p className="review-content">{review.content}</p>
                                            <span className="review-date">
                                                {new Date(review.created_at).toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data">Hen\u00FCz yorum yok</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Server Select Modal */}
                {showServerSelect && (
                    <div className="server-select-overlay">
                        <div className="server-select-modal">
                            <h3>Sunucu Se\u00E7</h3>
                            <p>{bot.name} botunu hangi sunucuya eklemek istiyorsunuz?</p>

                            <div className="server-list">
                                {servers.length === 0 ? (
                                    <p className="no-servers">Admin oldu\u011Funuz sunucu bulunamad\u0131</p>
                                ) : (
                                    servers.map((server) => (
                                        <div
                                            key={server.id}
                                            className={`server-item ${selectedServer?.id === server.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedServer(server)}
                                        >
                                            <img src={server.icon || '/default-server.png'} alt="" />
                                            <span>{server.name}</span>
                                            <span className="member-count">{server.member_count} {'\u00FC'}ye</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="server-select-actions">
                                <button className="cancel-btn" onClick={() => setShowServerSelect(false)}>
                                    {'\u0130'}ptal
                                </button>
                                <button
                                    className="install-btn"
                                    disabled={!selectedServer || installing}
                                    onClick={handleInstall}
                                >
                                    {installing ? 'Y\u00FCkleniyor...' : 'Ekle'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BotDetailModal;
