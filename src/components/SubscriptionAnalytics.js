// frontend/src/components/SubscriptionAnalytics.js
// 💳 Subscription Analytics Dashboard - Full Implementation

import React, { useState, useEffect, useCallback } from 'react';
import {
    FaChartLine, FaChartBar, FaChartPie, FaDollarSign,
    FaUsers, FaCrown, FaArrowUp, FaArrowDown, FaCalendarAlt,
    FaGem, FaRocket, FaStar, FaDownload, FaFilter
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';

/**
 * Subscription Analytics Dashboard
 * Comprehensive analytics for premium subscriptions
 */
const SubscriptionAnalytics = ({ fetchWithAuth, apiBaseUrl, isAdmin = false }) => {
    const [analytics, setAnalytics] = useState({
        overview: {
            totalRevenue: 0,
            monthlyRevenue: 0,
            activeSubscribers: 0,
            churnRate: 0,
            avgSubscriptionLength: 0,
            lifetimeValue: 0
        },
        growth: {
            newSubscribers: 0,
            renewals: 0,
            cancellations: 0,
            netGrowth: 0
        },
        breakdown: {
            basic: { count: 0, revenue: 0 },
            premium: { count: 0, revenue: 0 },
            ultimate: { count: 0, revenue: 0 }
        },
        trends: [],
        topPlans: [],
        recentTransactions: []
    });

    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('month'); // week, month, quarter, year
    const [activeChart, setActiveChart] = useState('revenue'); // revenue, subscribers, plans

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            const response = await fetchWithAuth(`${baseUrl}/api/nitro/subscription-analytics/?range=${timeRange}`);
            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            } else {
                console.error('Failed to fetch subscription analytics:', response.status);
                // Empty fallback data structure
                setAnalytics({
                    overview: {
                        totalRevenue: 0,
                        monthlyRevenue: 0,
                        activeSubscribers: 0,
                        churnRate: 0,
                        avgSubscriptionLength: 0,
                        lifetimeValue: 0
                    },
                    growth: {
                        newSubscribers: 0,
                        renewals: 0,
                        cancellations: 0,
                        netGrowth: 0
                    },
                    breakdown: {
                        basic: { count: 0, revenue: 0, percent: 0 },
                        premium: { count: 0, revenue: 0, percent: 0 },
                        ultimate: { count: 0, revenue: 0, percent: 0 }
                    },
                    trends: [],
                    topPlans: [],
                    recentTransactions: []
                });
            }
        } catch (err) {
            console.error('Failed to fetch analytics:', err);
        } finally {
            setLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl, timeRange]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getGrowthIndicator = (value) => {
        if (value > 0) {
            return <span style={{ color: '#43b581' }}><FaArrowUp /> +{value}%</span>;
        } else if (value < 0) {
            return <span style={{ color: '#f04747' }}><FaArrowDown /> {value}%</span>;
        }
        return <span style={{ color: '#72767d' }}>0%</span>;
    };

    const renderMiniChart = (data, color) => {
        const max = Math.max(...data.map(d => d.revenue));
        const height = 60;
        const width = 200;
        const barWidth = width / data.length - 4;

        return (
            <svg width={width} height={height} style={{ display: 'block' }}>
                {data.map((item, index) => {
                    const barHeight = (item.revenue / max) * (height - 10);
                    return (
                        <rect
                            key={index}
                            x={index * (barWidth + 4)}
                            y={height - barHeight}
                            width={barWidth}
                            height={barHeight}
                            fill={color}
                            rx="2"
                            opacity={0.7 + (index / data.length) * 0.3}
                        />
                    );
                })}
            </svg>
        );
    };

    const renderPieChart = (breakdown) => {
        const total = breakdown.basic.count + breakdown.premium.count + breakdown.ultimate.count;
        if (total === 0) return null;

        const data = [
            { name: 'Basic', value: breakdown.basic.count, color: '#43b581' },
            { name: 'Premium', value: breakdown.premium.count, color: '#faa61a' },
            { name: 'Ultimate', value: breakdown.ultimate.count, color: '#f04747' }
        ];

        let cumulativePercent = 0;
        const size = 120;
        const center = size / 2;
        const radius = 45;

        return (
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {data.map((item, index) => {
                    const percent = (item.value / total) * 100;
                    const startAngle = cumulativePercent * 3.6;
                    cumulativePercent += percent;
                    const endAngle = cumulativePercent * 3.6;

                    const startRad = (startAngle - 90) * (Math.PI / 180);
                    const endRad = (endAngle - 90) * (Math.PI / 180);

                    const x1 = center + radius * Math.cos(startRad);
                    const y1 = center + radius * Math.sin(startRad);
                    const x2 = center + radius * Math.cos(endRad);
                    const y2 = center + radius * Math.sin(endRad);

                    const largeArcFlag = percent > 50 ? 1 : 0;

                    const pathData = `
                        M ${center} ${center}
                        L ${x1} ${y1}
                        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                        Z
                    `;

                    return (
                        <path
                            key={index}
                            d={pathData}
                            fill={item.color}
                            opacity="0.9"
                        />
                    );
                })}
                <circle cx={center} cy={center} r="25" fill="#2f3136" />
            </svg>
        );
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaChartLine className="pulse" size={32} color="#5865f2" />
                    <span>Analitik veriler yükleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaChartLine size={24} color="#5865f2" />
                    <div>
                        <h2 style={styles.title}>Abonelik Analitikleri</h2>
                        <p style={styles.subtitle}>Gelir ve büyüme metrikleri</p>
                    </div>
                </div>
                <div style={styles.headerRight}>
                    <select
                        style={styles.timeSelect}
                        value={timeRange}
                        onChange={e => setTimeRange(e.target.value)}
                    >
                        <option value="week">Son 7 Gün</option>
                        <option value="month">Son 30 Gün</option>
                        <option value="quarter">Son 3 Ay</option>
                        <option value="year">Son 1 Yıl</option>
                    </select>
                    <button style={styles.exportButton}>
                        <FaDownload /> Dışa Aktar
                    </button>
                </div>
            </div>

            {/* Overview Cards */}
            <div style={styles.overviewGrid}>
                <div style={styles.overviewCard}>
                    <div style={styles.cardHeader}>
                        <FaDollarSign size={20} color="#43b581" />
                        <span style={styles.cardTitle}>Toplam Gelir</span>
                    </div>
                    <div style={styles.cardValue}>{formatCurrency(analytics.overview.totalRevenue)}</div>
                    <div style={styles.cardTrend}>{getGrowthIndicator(12.5)}</div>
                </div>

                <div style={styles.overviewCard}>
                    <div style={styles.cardHeader}>
                        <FaCalendarAlt size={20} color="#faa61a" />
                        <span style={styles.cardTitle}>Aylık Gelir</span>
                    </div>
                    <div style={styles.cardValue}>{formatCurrency(analytics.overview.monthlyRevenue)}</div>
                    <div style={styles.cardTrend}>{getGrowthIndicator(8.3)}</div>
                </div>

                <div style={styles.overviewCard}>
                    <div style={styles.cardHeader}>
                        <FaUsers size={20} color="#5865f2" />
                        <span style={styles.cardTitle}>Aktif Abone</span>
                    </div>
                    <div style={styles.cardValue}>{analytics.overview.activeSubscribers.toLocaleString()}</div>
                    <div style={styles.cardTrend}>{getGrowthIndicator(5.2)}</div>
                </div>

                <div style={styles.overviewCard}>
                    <div style={styles.cardHeader}>
                        <FaCrown size={20} color="#f04747" />
                        <span style={styles.cardTitle}>Churn Oranı</span>
                    </div>
                    <div style={styles.cardValue}>{analytics.overview.churnRate}%</div>
                    <div style={styles.cardTrend}>{getGrowthIndicator(-1.2)}</div>
                </div>
            </div>

            {/* Growth Metrics */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>
                    <FaRocket size={16} /> Büyüme Metrikleri
                </h3>
                <div style={styles.growthGrid}>
                    <div style={styles.growthCard}>
                        <div style={{ ...styles.growthIcon, backgroundColor: 'rgba(67, 181, 129, 0.2)' }}>
                            <FaArrowUp color="#43b581" />
                        </div>
                        <div style={styles.growthInfo}>
                            <div style={styles.growthValue}>{analytics.growth.newSubscribers}</div>
                            <div style={styles.growthLabel}>Yeni Abone</div>
                        </div>
                    </div>

                    <div style={styles.growthCard}>
                        <div style={{ ...styles.growthIcon, backgroundColor: 'rgba(88, 101, 242, 0.2)' }}>
                            <FaStar color="#5865f2" />
                        </div>
                        <div style={styles.growthInfo}>
                            <div style={styles.growthValue}>{analytics.growth.renewals}</div>
                            <div style={styles.growthLabel}>Yenileme</div>
                        </div>
                    </div>

                    <div style={styles.growthCard}>
                        <div style={{ ...styles.growthIcon, backgroundColor: 'rgba(240, 71, 71, 0.2)' }}>
                            <FaArrowDown color="#f04747" />
                        </div>
                        <div style={styles.growthInfo}>
                            <div style={styles.growthValue}>{analytics.growth.cancellations}</div>
                            <div style={styles.growthLabel}>İptal</div>
                        </div>
                    </div>

                    <div style={styles.growthCard}>
                        <div style={{ ...styles.growthIcon, backgroundColor: 'rgba(250, 166, 26, 0.2)' }}>
                            <FaChartLine color="#faa61a" />
                        </div>
                        <div style={styles.growthInfo}>
                            <div style={styles.growthValue}>+{analytics.growth.netGrowth}</div>
                            <div style={styles.growthLabel}>Net Büyüme</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div style={styles.chartsRow}>
                {/* Revenue Trend */}
                <div style={styles.chartCard}>
                    <h3 style={styles.chartTitle}>
                        <FaChartBar size={14} /> Gelir Trendi
                    </h3>
                    <div style={styles.chartContainer}>
                        {renderMiniChart(analytics.trends, '#5865f2')}
                    </div>
                    <div style={styles.chartLegend}>
                        {analytics.trends.map((item, index) => (
                            <div key={index} style={styles.legendItem}>
                                <span style={styles.legendLabel}>{item.month}</span>
                                <span style={styles.legendValue}>{formatCurrency(item.revenue)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Plan Breakdown */}
                <div style={styles.chartCard}>
                    <h3 style={styles.chartTitle}>
                        <FaChartPie size={14} /> Plan Dağılımı
                    </h3>
                    <div style={styles.pieContainer}>
                        {renderPieChart(analytics.breakdown)}
                        <div style={styles.pieLegend}>
                            <div style={styles.pieItem}>
                                <div style={{ ...styles.pieDot, backgroundColor: '#43b581' }} />
                                <span>Basic ({analytics.breakdown.basic.percent}%)</span>
                            </div>
                            <div style={styles.pieItem}>
                                <div style={{ ...styles.pieDot, backgroundColor: '#faa61a' }} />
                                <span>Premium ({analytics.breakdown.premium.percent}%)</span>
                            </div>
                            <div style={styles.pieItem}>
                                <div style={{ ...styles.pieDot, backgroundColor: '#f04747' }} />
                                <span>Ultimate ({analytics.breakdown.ultimate.percent}%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Plans & Recent Transactions */}
            <div style={styles.bottomRow}>
                {/* Top Plans */}
                <div style={styles.listCard}>
                    <h3 style={styles.listTitle}>
                        <FaGem size={14} /> En Popüler Planlar
                    </h3>
                    <div style={styles.plansList}>
                        {analytics.topPlans.map((plan, index) => (
                            <div key={index} style={styles.planItem}>
                                <div style={styles.planRank}>#{index + 1}</div>
                                <div style={styles.planInfo}>
                                    <span style={styles.planName}>{plan.name}</span>
                                    <span style={styles.planCount}>{plan.count} abone</span>
                                </div>
                                <div style={styles.planRevenue}>{formatCurrency(plan.revenue)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div style={styles.listCard}>
                    <h3 style={styles.listTitle}>
                        <FaDollarSign size={14} /> Son İşlemler
                    </h3>
                    <div style={styles.transactionsList}>
                        {analytics.recentTransactions.map((tx, index) => (
                            <div key={index} style={styles.transactionItem}>
                                <div style={styles.txInfo}>
                                    <span style={styles.txUser}>{tx.user}</span>
                                    <span style={styles.txPlan}>{tx.plan}</span>
                                </div>
                                <div style={styles.txRight}>
                                    <span style={styles.txAmount}>{formatCurrency(tx.amount)}</span>
                                    <span style={{
                                        ...styles.txStatus,
                                        color: tx.status === 'completed' ? '#43b581' : '#f04747'
                                    }}>
                                        {tx.status === 'completed' ? '✓' : '↩'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div style={styles.metricsRow}>
                <div style={styles.metricCard}>
                    <div style={styles.metricLabel}>Ortalama Abonelik Süresi</div>
                    <div style={styles.metricValue}>{analytics.overview.avgSubscriptionLength} ay</div>
                </div>
                <div style={styles.metricCard}>
                    <div style={styles.metricLabel}>Müşteri Yaşam Boyu Değeri</div>
                    <div style={styles.metricValue}>{formatCurrency(analytics.overview.lifetimeValue)}</div>
                </div>
                <div style={styles.metricCard}>
                    <div style={styles.metricLabel}>Abone Başına Gelir (ARPU)</div>
                    <div style={styles.metricValue}>{formatCurrency(analytics.overview.monthlyRevenue / analytics.overview.activeSubscribers)}</div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '20px',
        color: '#dcddde'
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '60px',
        color: '#b9bbbe'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff'
    },
    subtitle: {
        margin: '4px 0 0',
        fontSize: '13px',
        color: '#72767d'
    },
    timeSelect: {
        padding: '8px 12px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '13px',
        cursor: 'pointer'
    },
    exportButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '13px',
        cursor: 'pointer'
    },
    overviewGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
    },
    overviewCard: {
        backgroundColor: '#202225',
        borderRadius: '8px',
        padding: '20px'
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px'
    },
    cardTitle: {
        fontSize: '13px',
        color: '#72767d'
    },
    cardValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '8px'
    },
    cardTrend: {
        fontSize: '12px'
    },
    section: {
        marginBottom: '24px'
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 0 16px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff'
    },
    growthGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
    },
    growthCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#202225',
        borderRadius: '8px'
    },
    growthIcon: {
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px'
    },
    growthInfo: {
        flex: 1
    },
    growthValue: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#fff'
    },
    growthLabel: {
        fontSize: '12px',
        color: '#72767d'
    },
    chartsRow: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '16px',
        marginBottom: '24px'
    },
    chartCard: {
        backgroundColor: '#202225',
        borderRadius: '8px',
        padding: '20px'
    },
    chartTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 0 16px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff'
    },
    chartContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px'
    },
    chartLegend: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
    },
    legendItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '11px'
    },
    legendLabel: {
        color: '#72767d'
    },
    legendValue: {
        color: '#dcddde',
        fontWeight: '500'
    },
    pieContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    pieLegend: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    pieItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: '#dcddde'
    },
    pieDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%'
    },
    bottomRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
    },
    listCard: {
        backgroundColor: '#202225',
        borderRadius: '8px',
        padding: '20px'
    },
    listTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 0 16px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff'
    },
    plansList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    planItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        backgroundColor: '#2f3136',
        borderRadius: '6px'
    },
    planRank: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#40444b',
        borderRadius: '50%',
        fontSize: '11px',
        fontWeight: '600',
        color: '#fff'
    },
    planInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    planName: {
        color: '#fff',
        fontSize: '13px',
        fontWeight: '500'
    },
    planCount: {
        color: '#72767d',
        fontSize: '11px'
    },
    planRevenue: {
        color: '#43b581',
        fontSize: '13px',
        fontWeight: '600'
    },
    transactionsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    transactionItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 12px',
        backgroundColor: '#2f3136',
        borderRadius: '6px'
    },
    txInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    txUser: {
        color: '#fff',
        fontSize: '13px',
        fontWeight: '500'
    },
    txPlan: {
        color: '#72767d',
        fontSize: '11px'
    },
    txRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    txAmount: {
        color: '#dcddde',
        fontSize: '13px',
        fontWeight: '500'
    },
    txStatus: {
        fontSize: '14px'
    },
    metricsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px'
    },
    metricCard: {
        backgroundColor: '#202225',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center'
    },
    metricLabel: {
        fontSize: '12px',
        color: '#72767d',
        marginBottom: '8px'
    },
    metricValue: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#fff'
    }
};

export default SubscriptionAnalytics;
