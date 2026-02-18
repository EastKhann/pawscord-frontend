import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../../utils/apiEndpoints';
import toast from '../../utils/toast';
import useModalA11y from '../../hooks/useModalA11y';

const BotDetailModal = ({ bot, onClose, onInstall }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: !!bot, label: 'Bot Detay' });
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
                toast.success(`${bot.name} başarıyla ${selectedServer.name} sunucusuna eklendi!`);
            } else {
                const error = await response.json();
                toast.error(error.error || 'Yükleme başarısız');
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
        <div className="bot-modal-overlay" {...overlayProps}>
            <div className="bot-modal" {...dialogProps}>
                {/* Header */}
                <div className="bot-modal-header" style={{ backgroundImage: bot.banner ? `url(${bot.banner})` : undefined }}>
                    <button className="modal-close" onClick={onClose}>{'×'}</button>
                    <div className="bot-header-content">
                        <img src={bot.avatar || '/default-bot.png'} alt={bot.name} className="bot-large-avatar" />
                        <div className="bot-header-info">
                            <h2>
                                {bot.name}
                                {bot.is_verified && <span className="verified">{'✓'} Doğrulanmış</span>}
                            </h2>
                            <p>{bot.short_description}</p>
                            <div className="bot-stats">
                                <span>{'📥'} {bot.install_count?.toLocaleString()} sunucu</span>
                                <span>{'⭐'} {bot.avg_rating} ({bot.review_count} yorum)</span>
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
                        Genel Bakış
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
                                <h3>Açıklama</h3>
                                <div className="description-content">{bot.description}</div>
                            </div>

                            {bot.features && bot.features.length > 0 && (
                                <div className="features-section">
                                    <h3>{'Ö'}zellikler</h3>
                                    <div className="features-list">
                                        {bot.features.map((feature, idx) => (
                                            <div key={idx} className="feature-item">{'✅'} {feature}</div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="links-section">
                                <h3>Bağlantılar</h3>
                                <div className="links-list">
                                    {bot.website && (
                                        <a href={bot.website} target="_blank" rel="noopener noreferrer">
                                            {'🌐'} Web Sitesi
                                        </a>
                                    )}
                                    {bot.support_server && (
                                        <a href={`/invite/${bot.support_server}`}>
                                            {'💬'} Destek Sunucusu
                                        </a>
                                    )}
                                    {bot.privacy_policy && (
                                        <a href={bot.privacy_policy} target="_blank" rel="noopener noreferrer">
                                            {'🔒'} Gizlilik Politikası
                                        </a>
                                    )}
                                </div>
                            </div>

                            {bot.developer && (
                                <div className="developer-section">
                                    <h3>Geliştirici</h3>
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
                                <p className="no-data">Komut listesi mevcut değil</p>
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
                                                    {'⭐'.repeat(review.rating)}
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
                                <p className="no-data">Henüz yorum yok</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Server Select Modal */}
                {showServerSelect && (
                    <div className="server-select-overlay">
                        <div className="server-select-modal">
                            <h3>Sunucu Seç</h3>
                            <p>{bot.name} botunu hangi sunucuya eklemek istiyorsunuz?</p>

                            <div className="server-list">
                                {servers.length === 0 ? (
                                    <p className="no-servers">Admin olduğunuz sunucu bulunamadı</p>
                                ) : (
                                    servers.map((server) => (
                                        <div
                                            key={server.id}
                                            className={`server-item ${selectedServer?.id === server.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedServer(server)}
                                        >
                                            <img src={server.icon || '/default-server.png'} alt="" />
                                            <span>{server.name}</span>
                                            <span className="member-count">{server.member_count} {'ü'}ye</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="server-select-actions">
                                <button className="cancel-btn" onClick={() => setShowServerSelect(false)}>
                                    {'İ'}ptal
                                </button>
                                <button
                                    className="install-btn"
                                    disabled={!selectedServer || installing}
                                    onClick={handleInstall}
                                >
                                    {installing ? 'Yükleniyor...' : 'Ekle'}
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
