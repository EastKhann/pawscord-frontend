// frontend/src/components/EnterpriseAnalytics.js
import React, { useState, useEffect } from 'react';
import { FaChartLine, FaUsers, FaComments, FaClock, FaDownload } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';

const EnterpriseAnalytics = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [analytics, setAnalytics] = useState(null);
    const [timeRange, setTimeRange] = useState('30days');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, [timeRange]);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/enterprise/analytics/?range=${timeRange}`);
            if (res.ok) {
                const data = await res.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error('Analytics load error:', error);
        }
        setLoading(false);
    };

    const exportReport = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/enterprise/analytics/export/?range=${timeRange}`);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analytics-report-${Date.now()}.pdf`;
            a.click();
        } catch (error) {
            console.error('Export error:', error);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Yükleniyor...</div>;
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine size={24} color="#5865f2" />
                        <h2 style={styles.title}>Enterprise Analytics</h2>
                    </div>
                    <div style={styles.headerActions}>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            style={styles.select}
                        >
                            <option value="7days">Son 7 Gün</option>
                            <option value="30days">Son 30 Gün</option>
                            <option value="90days">Son 90 Gün</option>
                            <option value="1year">Son 1 Yıl</option>
                        </select>
                        <button onClick={exportReport} style={styles.exportButton}>
                            <FaDownload size={14} />
                            <span>Rapor Al</span>
                        </button>
                        <button onClick={onClose} style={styles.closeButton}>×</button>
                    </div>
                </div>

                <div style={styles.content}>
                    {/* KPI Cards */}
                    <div style={styles.kpiGrid}>
                        <KPICard
                            icon={FaUsers}
                            iconColor="#5865f2"
                            label="Aktif Kullanıcılar"
                            value={analytics?.active_users || 0}
                            change="+12%"
                            positive={true}
                        />
                        <KPICard
                            icon={FaComments}
                            iconColor="#3ba55d"
                            label="Toplam Mesajlar"
                            value={analytics?.total_messages || 0}
                            change="+8%"
                            positive={true}
                        />
                        <KPICard
                            icon={FaClock}
                            iconColor="#faa61a"
                            label="Ortalama Oturum"
                            value={`${analytics?.avg_session || 0}dk`}
                            change="-5%"
                            positive={false}
                        />
                        <KPICard
                            icon={FaChartLine}
                            iconColor="#ed4245"
                            label="Engagement Rate"
                            value={`${analytics?.engagement || 0}%`}
                            change="+15%"
                            positive={true}
                        />
                    </div>

                    {/* Charts */}
                    <div style={styles.chartsGrid}>
                        {/* User Activity */}
                        <div style={styles.chartCard}>
                            <h3 style={styles.chartTitle}>Kullanıcı Aktivitesi</h3>
                            {analytics?.user_activity && (
                                <Line
                                    data={{
                                        labels: analytics.user_activity.labels,
                                        datasets: [{
                                            label: 'Aktif Kullanıcılar',
                                            data: analytics.user_activity.data,
                                            borderColor: '#5865f2',
                                            backgroundColor: 'rgba(88, 101, 242, 0.1)',
                                            tension: 0.4
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false }
                                        },
                                        scales: {
                                            y: { beginAtZero: true }
                                        }
                                    }}
                                />
                            )}
                        </div>

                        {/* Message Distribution */}
                        <div style={styles.chartCard}>
                            <h3 style={styles.chartTitle}>Mesaj Dağılımı</h3>
                            {analytics?.message_distribution && (
                                <Bar
                                    data={{
                                        labels: analytics.message_distribution.labels,
                                        datasets: [{
                                            label: 'Mesajlar',
                                            data: analytics.message_distribution.data,
                                            backgroundColor: '#3ba55d'
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false }
                                        }
                                    }}
                                />
                            )}
                        </div>

                        {/* Channel Activity */}
                        <div style={styles.chartCard}>
                            <h3 style={styles.chartTitle}>Kanal Aktivitesi</h3>
                            {analytics?.channel_activity && (
                                <Pie
                                    data={{
                                        labels: analytics.channel_activity.labels,
                                        datasets: [{
                                            data: analytics.channel_activity.data,
                                            backgroundColor: [
                                                '#5865f2',
                                                '#3ba55d',
                                                '#faa61a',
                                                '#ed4245',
                                                '#9b59b6'
                                            ]
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Detailed Stats */}
                    <div style={styles.statsTable}>
                        <h3 style={styles.sectionTitle}>Detaylı İstatistikler</h3>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Metrik</th>
                                    <th style={styles.th}>Değer</th>
                                    <th style={styles.th}>Değişim</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={styles.tr}>
                                    <td style={styles.td}>Toplam Kullanıcı</td>
                                    <td style={styles.td}>{analytics?.total_users || 0}</td>
                                    <td style={{...styles.td, color: '#3ba55d'}}>+25</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <td style={styles.td}>Yeni Kullanıcı</td>
                                    <td style={styles.td}>{analytics?.new_users || 0}</td>
                                    <td style={{...styles.td, color: '#3ba55d'}}>+12</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <td style={styles.td}>Sesli Sohbet Dakikası</td>
                                    <td style={styles.td}>{analytics?.voice_minutes || 0}</td>
                                    <td style={{...styles.td, color: '#3ba55d'}}>+156</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <td style={styles.td}>Dosya Paylaşımı</td>
                                    <td style={styles.td}>{analytics?.file_shares || 0}</td>
                                    <td style={{...styles.td, color: '#ed4245'}}>-8</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Memoized KPI Card component
const KPICard = React.memo(({ icon: Icon, iconColor, label, value, change, positive }) => (
    <div style={styles.kpiCard}>
        <div style={{...styles.kpiIcon, backgroundColor: iconColor + '20'}}>
            <Icon size={24} color={iconColor} />
        </div>
        <div style={styles.kpiContent}>
            <div style={styles.kpiLabel}>{label}</div>
            <div style={styles.kpiValue}>{value}</div>
            <div style={{
                ...styles.kpiChange,
                color: positive ? '#3ba55d' : '#ed4245'
            }}>
                {change} vs geçen dönem
            </div>
        </div>
    </div>
));

// Memoized Charts Section
const ChartsSection = React.memo(({ analytics }) => {
    // Memoize chart data to prevent recreation on every render
    const lineChartData = useMemo(() => {
        if (!analytics?.user_activity) return null;
        return {
            labels: analytics.user_activity.labels,
            datasets: [{
                label: 'Aktif Kullanıcılar',
                data: analytics.user_activity.data,
                borderColor: '#5865f2',
                backgroundColor: 'rgba(88, 101, 242, 0.1)',
                tension: 0.4
            }]
        };
    }, [analytics?.user_activity]);

    const barChartData = useMemo(() => {
        if (!analytics?.message_distribution) return null;
        return {
            labels: analytics.message_distribution.labels,
            datasets: [{
                label: 'Mesajlar',
                data: analytics.message_distribution.data,
                backgroundColor: '#3ba55d'
            }]
        };
    }, [analytics?.message_distribution]);

    const pieChartData = useMemo(() => {
        if (!analytics?.channel_activity) return null;
        return {
            labels: analytics.channel_activity.labels,
            datasets: [{
                data: analytics.channel_activity.data,
                backgroundColor: [
                    '#5865f2',
                    '#3ba55d',
                    '#faa61a',
                    '#ed4245',
                    '#9b59b6'
                ]
            }]
        };
    }, [analytics?.channel_activity]);

    // Memoize chart options
    const lineChartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }), []);

    const barChartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        }
    }), []);

    const pieChartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false
    }), []);

    return (
        <div style={styles.chartsGrid}>
            {/* User Activity */}
            <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>Kullanıcı Aktivitesi</h3>
                {lineChartData && (
                    <Line data={lineChartData} options={lineChartOptions} />
                )}
            </div>

            {/* Message Distribution */}
            <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>Mesaj Dağılımı</h3>
                {barChartData && (
                    <Bar data={barChartData} options={barChartOptions} />
                )}
            </div>

            {/* Channel Activity */}
            <div style={styles.chartCard}>
                <h3 style={styles.chartTitle}>Kanal Aktivitesi</h3>
                {pieChartData && (
                    <Pie data={pieChartData} options={pieChartOptions} />
                )}
            </div>
        </div>
    );
});

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
    },
    panel: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1400px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerActions: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff'
    },
    select: {
        backgroundColor: '#202225',
        border: 'none',
        color: '#dcddde',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    exportButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '28px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe'
    },
    kpiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
    },
    kpiCard: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        gap: '16px'
    },
    kpiIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    kpiContent: {
        flex: 1
    },
    kpiLabel: {
        color: '#b9bbbe',
        fontSize: '13px',
        marginBottom: '4px'
    },
    kpiValue: {
        color: '#ffffff',
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    kpiChange: {
        fontSize: '12px'
    },
    chartsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
    },
    chartCard: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '20px',
        height: '300px'
    },
    chartTitle: {
        color: '#ffffff',
        fontSize: '16px',
        marginBottom: '16px'
    },
    statsTable: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '20px'
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: '18px',
        marginBottom: '16px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        color: '#b9bbbe',
        fontSize: '13px',
        fontWeight: '600',
        textAlign: 'left',
        padding: '12px',
        borderBottom: '1px solid #202225'
    },
    tr: {
        borderBottom: '1px solid #202225'
    },
    td: {
        color: '#dcddde',
        fontSize: '14px',
        padding: '12px'
    }
};

export default EnterpriseAnalytics;



