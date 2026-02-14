// frontend/src/components/ServerAnalyticsDashboard.js
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaChartLine, FaUsers, FaComments, FaHashtag, FaClock } from 'react-icons/fa';
import { useServerAnalytics } from './ServerAnalyticsDashboard/hooks/useServerAnalytics';
import { StatCard, ContentBar, ComparisonCard } from './ServerAnalyticsDashboard/AnalyticsComponents';
import styles from './ServerAnalyticsDashboard/styles';

const ServerAnalyticsDashboard = ({ isOpen, onClose, serverId, serverName, fetchWithAuth, apiBaseUrl }) => {
    const { analytics, comparison, loading, period, setPeriod, fetchAnalytics } =
        useServerAnalytics({ serverId, fetchWithAuth, apiBaseUrl });

    useEffect(() => {
        if (isOpen && serverId) fetchAnalytics();
    }, [isOpen, serverId, fetchAnalytics]);

    if (!isOpen) return null;

    const modalContent = (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine style={{ color: '#5865f2' }} />
                        <h2 style={styles.title}>{serverName || 'Sunucu'} Analytics</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <select value={period} onChange={e => setPeriod(e.target.value)} style={styles.periodSelect}>
                            <option value="7d">Son 7 G{'\u00FC'}n</option>
                            <option value="30d">Son 30 G{'\u00FC'}n</option>
                            <option value="90d">Son 90 G{'\u00FC'}n</option>
                        </select>
                        <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                    </div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loadingState}>
                            <div style={styles.spinner}></div>
                            <span>Veriler y{'\u00FC'}kleniyor...</span>
                        </div>
                    ) : analytics ? (
                        <>
                            <div style={styles.statsRow}>
                                <StatCard icon={<FaUsers />} label={`Toplam \u00DCye`} value={analytics.member_growth?.total || 0} change={comparison?.change?.active_users} color="#5865f2" />
                                <StatCard icon={<FaComments />} label="Toplam Mesaj" value={analytics.message_stats?.total || 0} subtext={`G\u00FCnl\u00FCk ort: ${analytics.message_stats?.daily_average || 0}`} change={comparison?.change?.messages} color="#43b581" />
                                <StatCard icon={<FaUsers />} label={`Aktif \u00DCye`} value={analytics.active_users?.total || 0} subtext={`%${analytics.active_users?.activity_rate || 0} aktivite`} color="#faa61a" />
                                <StatCard icon={<FaClock />} label="En Yo\u011Fun Saat" value={analytics.peak_hours?.peak_hour_label || '-'} color="#f04747" />
                            </div>

                            <div style={styles.chartsRow}>
                                <div style={styles.chartCard}>
                                    <h3 style={styles.chartTitle}>{'\uD83D\uDCC8'} Mesaj Aktivitesi</h3>
                                    <div style={styles.barChart}>
                                        {analytics.message_stats?.daily?.slice(-14).map((d, i) => {
                                            const maxCount = Math.max(...(analytics.message_stats?.daily?.map(x => x.count) || [1]));
                                            const height = (d.count / maxCount) * 100;
                                            return (
                                                <div key={i} style={styles.barContainer}>
                                                    <div style={{ ...styles.bar, height: `${Math.max(height, 5)}%` }} title={`${d.date}: ${d.count} mesaj`} />
                                                    <span style={styles.barLabel}>{new Date(d.date).getDate()}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div style={styles.chartCard}>
                                    <h3 style={styles.chartTitle}>{'\u23F0'} Saatlik Aktivite</h3>
                                    <div style={styles.hourlyChart}>
                                        {analytics.peak_hours?.hourly?.map((count, hour) => {
                                            const maxCount = Math.max(...(analytics.peak_hours?.hourly || [1]));
                                            const intensity = count / maxCount;
                                            return (
                                                <div key={hour} style={{ ...styles.hourBlock, backgroundColor: `rgba(88, 101, 242, ${Math.max(intensity, 0.1)})` }} title={`${hour}:00 - ${count} mesaj`}>
                                                    {hour}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div style={styles.listsRow}>
                                <div style={styles.listCard}>
                                    <h3 style={styles.listTitle}><FaHashtag /> Pop{'\u00FC'}ler Kanallar</h3>
                                    <div style={styles.list}>
                                        {analytics.popular_channels?.slice(0, 5).map((channel, i) => (
                                            <div key={i} style={styles.listItem}>
                                                <span style={styles.listRank}>#{i + 1}</span>
                                                <span style={styles.listName}>{channel.name}</span>
                                                <span style={styles.listValue}>{channel.messages} mesaj</span>
                                            </div>
                                        ))}
                                        {(!analytics.popular_channels || analytics.popular_channels.length === 0) && (
                                            <div style={styles.emptyList}>Veri yok</div>
                                        )}
                                    </div>
                                </div>

                                <div style={styles.listCard}>
                                    <h3 style={styles.listTitle}><FaUsers /> En Aktif {'\u00DC'}yeler</h3>
                                    <div style={styles.list}>
                                        {analytics.active_users?.top_users?.slice(0, 5).map((user, i) => (
                                            <div key={i} style={styles.listItem}>
                                                <span style={styles.listRank}>#{i + 1}</span>
                                                <span style={styles.listName}>{user.username}</span>
                                                <span style={styles.listValue}>{user.messages} mesaj</span>
                                            </div>
                                        ))}
                                        {(!analytics.active_users?.top_users || analytics.active_users.top_users.length === 0) && (
                                            <div style={styles.emptyList}>Veri yok</div>
                                        )}
                                    </div>
                                </div>

                                <div style={styles.listCard}>
                                    <h3 style={styles.listTitle}>{'\uD83D\uDCCA'} {'\u0130\u00E7'}erik Da{'\u011F\u0131'}l{'\u0131'}m{'\u0131'}</h3>
                                    <div style={styles.pieChart}>
                                        {analytics.content_breakdown && (
                                            <>
                                                <ContentBar label="Metin" value={analytics.content_breakdown.text_only} total={analytics.message_stats?.total || 1} color="#5865f2" />
                                                <ContentBar label="Resimli" value={analytics.content_breakdown.with_images} total={analytics.message_stats?.total || 1} color="#43b581" />
                                                <ContentBar label="Dosyal\u0131" value={analytics.content_breakdown.with_files} total={analytics.message_stats?.total || 1} color="#faa61a" />
                                                <ContentBar label="Ses" value={analytics.content_breakdown.voice_messages} total={analytics.message_stats?.total || 1} color="#f04747" />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {comparison && (
                                <div style={styles.comparisonSection}>
                                    <h3 style={styles.sectionTitle}>{'\uD83D\uDCCA'} Haftal{'\u0131'}k Kar{'\u015F\u0131'}la{'\u015F'}t{'\u0131'}rma</h3>
                                    <div style={styles.comparisonGrid}>
                                        <ComparisonCard label="Mesajlar" thisWeek={comparison.this_week?.messages} lastWeek={comparison.last_week?.messages} change={comparison.change?.messages} />
                                        <ComparisonCard label={`Aktif \u00DCyeler`} thisWeek={comparison.this_week?.active_users} lastWeek={comparison.last_week?.active_users} change={comparison.change?.active_users} />
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={styles.errorState}>
                            <span style={{ fontSize: '48px' }}>{'\uD83D\uDCCA'}</span>
                            <p>Analytics verileri y{'\u00FC'}klenemedi</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default ServerAnalyticsDashboard;
