// frontend/src/components/ReportsPanel.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './ReportsPanel.css';

const ReportsPanel = ({ apiBaseUrl, onClose }) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'resolved', 'dismissed'
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/reports/list/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setReports(data.reports || []);
            } else {
                toast.error('❌ Şikayetler yüklenemedi');
            }
        } catch (error) {
            console.error('Fetch reports error:', error);
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const handleReport = async (reportId, action, reason = '') => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/reports/handle/${reportId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    action, // 'ban', 'warn', 'delete_message', 'dismiss'
                    reason 
                })
            });

            if (response.ok) {
                const data = await response.json();
                
                // Update report status
                setReports(reports.map(r => 
                    r.id === reportId 
                        ? { ...r, status: action === 'dismiss' ? 'dismissed' : 'resolved', resolution: action }
                        : r
                ));

                setSelectedReport(null);
                toast.success(`✅ ${getActionLabel(action)}`);
            } else {
                const error = await response.json();
                toast.error(`❌ ${error.error || 'İşlem başarısız'}`);
            }
        } catch (error) {
            console.error('Handle report error:', error);
            toast.error('❌ Bağlantı hatası');
        }
    };

    const getActionLabel = (action) => {
        const labels = {
            'ban': 'Kullanıcı yasaklandı',
            'warn': 'Kullanıcı uyarıldı',
            'delete_message': 'Mesaj silindi',
            'dismiss': 'Şikayet reddedildi'
        };
        return labels[action] || 'İşlem tamamlandı';
    };

    const filteredReports = reports.filter(report => {
        if (filter === 'all') return true;
        if (filter === 'pending') return report.status === 'pending';
        if (filter === 'resolved') return report.status === 'resolved';
        if (filter === 'dismissed') return report.status === 'dismissed';
        return true;
    });

    const getStatusBadge = (status) => {
        const badges = {
            'pending': { label: 'Bekliyor', className: 'status-pending' },
            'resolved': { label: 'Çözüldü', className: 'status-resolved' },
            'dismissed': { label: 'Reddedildi', className: 'status-dismissed' }
        };
        return badges[status] || { label: status, className: '' };
    };

    const getSeverityBadge = (reason) => {
        const severities = {
            'spam': { label: 'Spam', className: 'severity-low' },
            'harassment': { label: 'Taciz', className: 'severity-high' },
            'hate_speech': { label: 'Nefret Söylemi', className: 'severity-critical' },
            'inappropriate': { label: 'Uygunsuz İçerik', className: 'severity-medium' },
            'scam': { label: 'Dolandırıcılık', className: 'severity-high' },
            'other': { label: 'Diğer', className: 'severity-low' }
        };
        return severities[reason] || { label: reason, className: '' };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const stats = {
        total: reports.length,
        pending: reports.filter(r => r.status === 'pending').length,
        resolved: reports.filter(r => r.status === 'resolved').length,
        dismissed: reports.filter(r => r.status === 'dismissed').length
    };

    return (
        <div className="reports-overlay" onClick={onClose}>
            <div className="reports-panel" onClick={e => e.stopPropagation()}>
                <div className="reports-header">
                    <h2>🚨 Şikayet Yönetimi</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Stats */}
                <div className="reports-stats">
                    <div className="stat-item">
                        <span className="stat-value">{stats.total}</span>
                        <span className="stat-label">Toplam</span>
                    </div>
                    <div className="stat-item pending">
                        <span className="stat-value">{stats.pending}</span>
                        <span className="stat-label">Bekliyor</span>
                    </div>
                    <div className="stat-item resolved">
                        <span className="stat-value">{stats.resolved}</span>
                        <span className="stat-label">Çözüldü</span>
                    </div>
                    <div className="stat-item dismissed">
                        <span className="stat-value">{stats.dismissed}</span>
                        <span className="stat-label">Reddedildi</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="reports-filters">
                    <button 
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        Tümü ({stats.total})
                    </button>
                    <button 
                        className={filter === 'pending' ? 'active' : ''}
                        onClick={() => setFilter('pending')}
                    >
                        Bekliyor ({stats.pending})
                    </button>
                    <button 
                        className={filter === 'resolved' ? 'active' : ''}
                        onClick={() => setFilter('resolved')}
                    >
                        Çözüldü ({stats.resolved})
                    </button>
                    <button 
                        className={filter === 'dismissed' ? 'active' : ''}
                        onClick={() => setFilter('dismissed')}
                    >
                        Reddedildi ({stats.dismissed})
                    </button>
                </div>

                <div className="reports-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Yükleniyor...</p>
                        </div>
                    ) : filteredReports.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🎉</div>
                            <h3>Şikayet yok</h3>
                            <p>Bu filtre için şikayet bulunamadı</p>
                        </div>
                    ) : (
                        <div className="reports-list">
                            {filteredReports.map(report => {
                                const statusBadge = getStatusBadge(report.status);
                                const severityBadge = getSeverityBadge(report.reason);
                                
                                return (
                                    <div key={report.id} className="report-card">
                                        <div className="report-header">
                                            <div className="report-meta">
                                                <span className={`status-badge ${statusBadge.className}`}>
                                                    {statusBadge.label}
                                                </span>
                                                <span className={`severity-badge ${severityBadge.className}`}>
                                                    {severityBadge.label}
                                                </span>
                                            </div>
                                            <span className="report-date">{formatDate(report.created_at)}</span>
                                        </div>

                                        <div className="report-body">
                                            <div className="report-info">
                                                <div className="info-row">
                                                    <span className="info-label">Bildiren:</span>
                                                    <span className="info-value">👤 {report.reporter_username}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="info-label">Bildirilen:</span>
                                                    <span className="info-value">⚠️ {report.reported_user_username}</span>
                                                </div>
                                                {report.message_content && (
                                                    <div className="info-row">
                                                        <span className="info-label">Mesaj:</span>
                                                        <div className="message-preview">
                                                            {report.message_content}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {report.description && (
                                                <div className="report-description">
                                                    <strong>Açıklama:</strong>
                                                    <p>{report.description}</p>
                                                </div>
                                            )}
                                        </div>

                                        {report.status === 'pending' ? (
                                            <div className="report-actions">
                                                <button 
                                                    className="action-btn ban"
                                                    onClick={() => {
                                                        const reason = prompt('Yasaklama sebebi:');
                                                        if (reason) handleReport(report.id, 'ban', reason);
                                                    }}
                                                    title="Kullanıcıyı Yasakla"
                                                >
                                                    🚫 Yasakla
                                                </button>
                                                <button 
                                                    className="action-btn warn"
                                                    onClick={() => handleReport(report.id, 'warn', 'Uyarı verildi')}
                                                    title="Kullanıcıyı Uyar"
                                                >
                                                    ⚠️ Uyar
                                                </button>
                                                <button 
                                                    className="action-btn delete"
                                                    onClick={() => handleReport(report.id, 'delete_message', 'Mesaj silindi')}
                                                    title="Mesajı Sil"
                                                >
                                                    🗑️ Mesajı Sil
                                                </button>
                                                <button 
                                                    className="action-btn dismiss"
                                                    onClick={() => handleReport(report.id, 'dismiss', 'Geçersiz şikayet')}
                                                    title="Şikayeti Reddet"
                                                >
                                                    ✕ Reddet
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="report-resolution">
                                                <span className="resolution-label">Çözüm:</span>
                                                <span className="resolution-value">{getActionLabel(report.resolution)}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportsPanel;
