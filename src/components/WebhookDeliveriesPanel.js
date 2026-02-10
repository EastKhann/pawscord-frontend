// frontend/src/components/WebhookDeliveriesPanel.js - Webhook Delivery Logs & Retry
import React, { useState, useEffect } from 'react';
import {
    FaWebhook, FaTimes, FaSearch, FaRedo, FaCheck, FaExclamationTriangle,
    FaClock, FaFilter, FaDownload, FaEye, FaCode, FaChartLine,
    FaServer, FaTimesCircle, FaCheckCircle
} from 'react-icons/fa';
import toast from '../utils/toast';
import './WebhookDeliveriesPanel.css';
import confirmDialog from '../utils/confirmDialog';

const WebhookDeliveriesPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [activeTab, setActiveTab] = useState('deliveries'); // 'deliveries', 'stats', 'webhooks'
    const [deliveries, setDeliveries] = useState([]);
    const [webhooks, setWebhooks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        webhookId: 'all',
        dateRange: '7d'
    });

    useEffect(() => {
        fetchDeliveries();
        fetchWebhooks();
        fetchStats();
    }, [serverId, filters.dateRange]);

    const fetchDeliveries = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(
                `${apiBaseUrl}/webhooks/${serverId}/deliveries/?range=${filters.dateRange}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (response.ok) {
                const data = await response.json();
                setDeliveries(data.deliveries || []);
            }
        } catch (error) {
            console.error('Fetch deliveries error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWebhooks = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/webhooks/${serverId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setWebhooks(data.webhooks || []);
            }
        } catch (error) {
            console.error('Fetch webhooks error:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/webhooks/${serverId}/stats/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Fetch stats error:', error);
        }
    };

    const handleRetry = async (deliveryId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/webhooks/deliveries/${deliveryId}/retry/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🔄 Webhook yeniden gönderildi');
                fetchDeliveries();
            } else {
                const err = await response.json();
                toast.error(err.error || 'Yeniden gönderme başarısız');
            }
        } catch (error) {
            console.error('Retry delivery error:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const handleRetryAll = async () => {
        const failedCount = deliveries.filter(d => d.status === 'failed').length;
        if (!await confirmDialog(`${failedCount} başarısız webhook'u yeniden göndermek istiyor musunuz?`)) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/webhooks/${serverId}/retry-all/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🔄 Tüm başarısız webhook\'lar kuyruğa alındı');
                fetchDeliveries();
            }
        } catch (error) {
            console.error('Retry all error:', error);
        }
    };

    const getFilteredDeliveries = () => {
        return deliveries.filter(d => {
            const matchesSearch = !filters.search ||
                d.webhook_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                d.event_type?.toLowerCase().includes(filters.search.toLowerCase());

            const matchesStatus = filters.status === 'all' || d.status === filters.status;
            const matchesWebhook = filters.webhookId === 'all' || d.webhook_id === filters.webhookId;

            return matchesSearch && matchesStatus && matchesWebhook;
        });
    };

    const filteredDeliveries = getFilteredDeliveries();
    const failedCount = deliveries.filter(d => d.status === 'failed').length;

    return (
        <div className="webhook-deliveries-overlay" onClick={onClose}>
            <div className="webhook-deliveries-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaWebhook /> Webhook Teslimatları</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeTab === 'deliveries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('deliveries')}
                    >
                        <FaServer /> Teslimatlar
                        {failedCount > 0 && <span className="badge error">{failedCount}</span>}
                    </button>
                    <button
                        className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
                        onClick={() => setActiveTab('stats')}
                    >
                        <FaChartLine /> İstatistikler
                    </button>
                </div>

                <div className="panel-content">
                    {activeTab === 'deliveries' && (
                        <>
                            <div className="toolbar">
                                <div className="search-box">
                                    <FaSearch />
                                    <input
                                        type="text"
                                        placeholder="Webhook veya event ara..."
                                        value={filters.search}
                                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    />
                                </div>

                                <div className="filter-group">
                                    <select
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    >
                                        <option value="all">Tüm Durumlar</option>
                                        <option value="success">Başarılı</option>
                                        <option value="failed">Başarısız</option>
                                        <option value="pending">Bekliyor</option>
                                    </select>

                                    <select
                                        value={filters.webhookId}
                                        onChange={(e) => setFilters({ ...filters, webhookId: e.target.value })}
                                    >
                                        <option value="all">Tüm Webhooklar</option>
                                        {webhooks.map(wh => (
                                            <option key={wh.id} value={wh.id}>{wh.name}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={filters.dateRange}
                                        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                                    >
                                        <option value="24h">Son 24 Saat</option>
                                        <option value="7d">Son 7 Gün</option>
                                        <option value="30d">Son 30 Gün</option>
                                    </select>
                                </div>

                                {failedCount > 0 && (
                                    <button className="retry-all-btn" onClick={handleRetryAll}>
                                        <FaRedo /> Tümünü Yeniden Dene ({failedCount})
                                    </button>
                                )}
                            </div>

                            {loading ? (
                                <div className="loading">Yükleniyor...</div>
                            ) : filteredDeliveries.length > 0 ? (
                                <div className="deliveries-list">
                                    {filteredDeliveries.map(delivery => (
                                        <div
                                            key={delivery.id}
                                            className={`delivery-item ${delivery.status}`}
                                        >
                                            <div className="delivery-status">
                                                {delivery.status === 'success' && <FaCheckCircle className="success" />}
                                                {delivery.status === 'failed' && <FaTimesCircle className="failed" />}
                                                {delivery.status === 'pending' && <FaClock className="pending" />}
                                            </div>

                                            <div className="delivery-info">
                                                <div className="delivery-header">
                                                    <span className="webhook-name">{delivery.webhook_name}</span>
                                                    <span className="event-type">{delivery.event_type}</span>
                                                </div>
                                                <div className="delivery-meta">
                                                    <span className="delivery-time">
                                                        <FaClock /> {new Date(delivery.delivered_at).toLocaleString('tr-TR')}
                                                    </span>
                                                    {delivery.response_time && (
                                                        <span className="response-time">
                                                            {delivery.response_time}ms
                                                        </span>
                                                    )}
                                                    <span className={`status-code ${delivery.status_code >= 200 && delivery.status_code < 300 ? 'success' : 'error'}`}>
                                                        {delivery.status_code || 'N/A'}
                                                    </span>
                                                </div>
                                                {delivery.error_message && (
                                                    <div className="error-message">
                                                        <FaExclamationTriangle /> {delivery.error_message}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="delivery-actions">
                                                <button
                                                    className="view-btn"
                                                    onClick={() => setSelectedDelivery(delivery)}
                                                    title="Detay"
                                                >
                                                    <FaEye />
                                                </button>
                                                {delivery.status === 'failed' && (
                                                    <button
                                                        className="retry-btn"
                                                        onClick={() => handleRetry(delivery.id)}
                                                        title="Yeniden Dene"
                                                    >
                                                        <FaRedo />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-deliveries">
                                    <FaWebhook className="empty-icon" />
                                    <p>Webhook teslimatı bulunamadı</p>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'stats' && stats && (
                        <div className="stats-view">
                            <div className="stats-cards">
                                <div className="stat-card">
                                    <div className="stat-icon total"><FaWebhook /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.total_deliveries || 0}</span>
                                        <span className="stat-label">Toplam Teslimat</span>
                                    </div>
                                </div>
                                <div className="stat-card success">
                                    <div className="stat-icon"><FaCheckCircle /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.successful || 0}</span>
                                        <span className="stat-label">Başarılı</span>
                                    </div>
                                </div>
                                <div className="stat-card error">
                                    <div className="stat-icon"><FaTimesCircle /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.failed || 0}</span>
                                        <span className="stat-label">Başarısız</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon avg"><FaClock /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.avg_response_time || 0}ms</span>
                                        <span className="stat-label">Ort. Yanıt Süresi</span>
                                    </div>
                                </div>
                            </div>

                            <div className="success-rate">
                                <h3>Başarı Oranı</h3>
                                <div className="rate-bar">
                                    <div
                                        className="rate-fill"
                                        style={{ width: `${stats.success_rate || 0}%` }}
                                    />
                                </div>
                                <span className="rate-value">{stats.success_rate || 0}%</span>
                            </div>

                            <div className="top-events">
                                <h3>En Çok Tetiklenen Events</h3>
                                <div className="events-list">
                                    {(stats.top_events || []).map((event, idx) => (
                                        <div key={idx} className="event-item">
                                            <span className="event-name">{event.name}</span>
                                            <span className="event-count">{event.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Detail Modal */}
                {selectedDelivery && (
                    <DeliveryDetailModal
                        delivery={selectedDelivery}
                        onClose={() => setSelectedDelivery(null)}
                        onRetry={handleRetry}
                    />
                )}
            </div>
        </div>
    );
};

// Delivery Detail Modal
const DeliveryDetailModal = ({ delivery, onClose, onRetry }) => {
    const [activeSection, setActiveSection] = useState('request');

    return (
        <div className="detail-modal-overlay" onClick={onClose}>
            <div className="detail-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Teslimat Detayı</h3>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="modal-content">
                    <div className="delivery-overview">
                        <div className={`status-indicator ${delivery.status}`}>
                            {delivery.status === 'success' && <FaCheckCircle />}
                            {delivery.status === 'failed' && <FaTimesCircle />}
                            {delivery.status === 'pending' && <FaClock />}
                            <span>{delivery.status}</span>
                        </div>
                        <div className="overview-info">
                            <p><strong>Webhook:</strong> {delivery.webhook_name}</p>
                            <p><strong>Event:</strong> {delivery.event_type}</p>
                            <p><strong>Tarih:</strong> {new Date(delivery.delivered_at).toLocaleString('tr-TR')}</p>
                            <p><strong>HTTP Status:</strong> {delivery.status_code || 'N/A'}</p>
                            <p><strong>Yanıt Süresi:</strong> {delivery.response_time || 'N/A'}ms</p>
                        </div>
                    </div>

                    <div className="section-tabs">
                        <button
                            className={activeSection === 'request' ? 'active' : ''}
                            onClick={() => setActiveSection('request')}
                        >
                            Request
                        </button>
                        <button
                            className={activeSection === 'response' ? 'active' : ''}
                            onClick={() => setActiveSection('response')}
                        >
                            Response
                        </button>
                    </div>

                    <div className="code-section">
                        {activeSection === 'request' && (
                            <pre>{JSON.stringify(delivery.request_body || {}, null, 2)}</pre>
                        )}
                        {activeSection === 'response' && (
                            <pre>{JSON.stringify(delivery.response_body || {}, null, 2)}</pre>
                        )}
                    </div>

                    {delivery.status === 'failed' && (
                        <button
                            className="retry-btn large"
                            onClick={() => {
                                onRetry(delivery.id);
                                onClose();
                            }}
                        >
                            <FaRedo /> Yeniden Dene
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebhookDeliveriesPanel;
