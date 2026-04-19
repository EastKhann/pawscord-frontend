// frontend/src/components/APIUsagePanel.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FaTimes,
    FaCode,
    FaChartLine,
    FaClock,
    FaExclamationTriangle,
    FaCheckCircle,
} from 'react-icons/fa';
import { styles, calculateTimeUntilReset } from '../APIUsagePanel/apiUsageStyles';
import useAPIUsage from '../APIUsagePanel/useAPIUsage';

// -- dynamic style helpers (pass 2) --

const APIUsagePanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [error, setError] = useState(null);
    const {
        safeStats,
        endpoints,
        timeline,
        loading,
        timeRange,
        setTimeRange,
        selectedEndpoint,
        setSelectedEndpoint,
        rateLimitStatus,
    } = useAPIUsage(fetchWithAuth, apiBaseUrl);

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine className="icon-primary-24" />
                        <h2 className="m0-fs20">API Kullanım Analitiği</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            style={styles.timeRangeSelect}
                        >
                            <option value="24h">Son 24 Saat</option>
                            <option value="7d">Son 7 Gün</option>
                            <option value="30d">Son 30 Gün</option>
                        </select>
                        <button aria-label="Close" onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Analitik yükleniyor...</div>
                    ) : (
                        <>
                            <div style={styles.statsGrid}>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaCode className="icon-primary" />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {(safeStats.requests_made || 0).toLocaleString()}
                                        </div>
                                        <div style={styles.statLabel}>Toplam İstekler</div>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaCheckCircle className="icon-success" />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {safeStats.success_rate
                                                ? `${safeStats.success_rate.toFixed(1)}%`
                                                : '0%'}
                                        </div>
                                        <div style={styles.statLabel}>Başarı Oranı</div>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaClock className="icon-warning" />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {safeStats.avg_response_time
                                                ? `${safeStats.avg_response_time}ms`
                                                : '0ms'}
                                        </div>
                                        <div style={styles.statLabel}>Ort. Yanıt Süresi</div>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaExclamationTriangle className="icon-danger" />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>{safeStats.errors || 0}</div>
                                        <div style={styles.statLabel}>Hatalar</div>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>İstek Sınırı Durumu</h3>
                                <div>
                                    <div style={styles.rateLimitInfo}>
                                        <div style={styles.rateLimitText}>
                                            {safeStats.requests_made || 0} /{' '}
                                            {safeStats.rate_limit || 10000} istek kullanıldı
                                        </div>
                                        <div>{rateLimitStatus.text}</div>
                                    </div>
                                    <div style={styles.rateLimitBar}>
                                        <div
                                            style={{
                                                ...styles.rateLimitProgress,
                                                width: `${Math.min(((safeStats.requests_made || 0) / (safeStats.rate_limit || 10000)) * 100, 100)}%`,
                                                backgroundColor: rateLimitStatus.color,
                                            }}
                                        />
                                    </div>
                                    {safeStats.reset_at && (
                                        <div style={styles.rateLimitReset}>
                                            Sıfırlanıyor:{' '}
                                            {calculateTimeUntilReset(safeStats.reset_at)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>En Çok Kullanılan Uç Noktalar</h3>
                                <div style={styles.endpointsList}>
                                    {endpoints.length === 0 ? (
                                        <div style={styles.empty}>Uç nokta verisi yok</div>
                                    ) : (
                                        endpoints.slice(0, 10).map((endpoint, idx) => (
                                            <div
                                                key={`item-${idx}`}
                                                style={styles.endpointItem}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setSelectedEndpoint(endpoint)}
                                                onKeyDown={(e) =>
                                                    (e.key === 'Enter' || e.key === ' ') &&
                                                    e.currentTarget.click()
                                                }
                                            >
                                                <div style={styles.endpointRank}>{idx + 1}</div>
                                                <div style={styles.endpointDetails}>
                                                    <div style={styles.endpointPath}>
                                                        <span style={styles.endpointMethod}>
                                                            {endpoint.method}
                                                        </span>
                                                        {endpoint.path}
                                                    </div>
                                                    <div style={styles.endpointStats}>
                                                        <span>{endpoint.count} istek</span>
                                                        <span className="divider-text">•</span>
                                                        <span>{endpoint.avg_time}ms ort.</span>
                                                        {endpoint.error_rate > 0 && (
                                                            <>
                                                                <span className="divider-text">
                                                                    •
                                                                </span>
                                                                <span className="icon-danger">
                                                                    {endpoint.error_rate}% hata
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div style={styles.endpointBar}>
                                                    <div
                                                        style={{
                                                            ...styles.endpointBarFill,
                                                            width: `${(endpoint.count / endpoints[0].count) * 100}%`,
                                                            backgroundColor:
                                                                endpoint.error_rate > 5
                                                                    ? '#f23f42'
                                                                    : '#5865f2',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Son Aktiviteler</h3>
                                <div style={styles.timeline}>
                                    {timeline.length === 0 ? (
                                        <div style={styles.empty}>Son aktivite yok</div>
                                    ) : (
                                        timeline.slice(0, 20).map((event, idx) => (
                                            <div key={`item-${idx}`} style={styles.timelineItem}>
                                                <div
                                                    style={{
                                                        ...styles.timelineIcon,
                                                        backgroundColor:
                                                            event.status >= 400
                                                                ? '#f23f42'
                                                                : '#23a559',
                                                    }}
                                                >
                                                    {event.status >= 400 ? (
                                                        <FaExclamationTriangle />
                                                    ) : (
                                                        <FaCheckCircle />
                                                    )}
                                                </div>
                                                <div style={styles.timelineContent}>
                                                    <div style={styles.timelinePath}>
                                                        <span style={styles.timelineMethod}>
                                                            {event.method}
                                                        </span>
                                                        {event.path}
                                                    </div>
                                                    <div style={styles.timelineMeta}>
                                                        <span
                                                            style={{
                                                                color:
                                                                    event.status >= 400
                                                                        ? '#f23f42'
                                                                        : '#23a559',
                                                            }}
                                                        >
                                                            {event.status}
                                                        </span>
                                                        <span className="divider-text">•</span>
                                                        <span>{event.response_time}ms</span>
                                                        <span className="divider-text">•</span>
                                                        <span>
                                                            {new Date(
                                                                event.timestamp
                                                            ).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

APIUsagePanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    username: PropTypes.string,
};
export default APIUsagePanel;
