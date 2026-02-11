// frontend/src/components/AdminAnalyticsPanel.js
import { useState, useEffect } from 'react';
import {
    FaUsers, FaServer, FaComments, FaChartLine,
    FaCrown, FaShoppingCart, FaTimes, FaDownload,
    FaUserPlus, FaUserMinus, FaEye, FaMobile, FaDesktop,
    FaArrowUp, FaArrowDown, FaGlobe, FaFire
} from 'react-icons/fa';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const AdminAnalyticsPanel = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // overview, users, premium, servers

    useEffect(() => {
        fetchStats();
        // Her 30 saniyede bir yenile
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/admin/analytics/`);
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Analytics fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportData = () => {
        if (!stats) return;

        const dataStr = JSON.stringify(stats, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    if (loading) {
        return (
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <div style={styles.loading}>Yükleniyor...</div>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <div style={styles.error}>Analytics verisi yüklenemedi</div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine size={24} />
                        <h2 style={styles.title}>Admin Analytics</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <button onClick={exportData} style={styles.exportButton} title="Export JSON">
                            <FaDownload />
                        </button>
                        <button onClick={onClose} style={styles.closeButton}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    <button
                        onClick={() => setActiveTab('overview')}
                        style={{ ...styles.tab, ...(activeTab === 'overview' && styles.activeTab) }}
                    >
                        <FaChartLine /> Genel
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        style={{ ...styles.tab, ...(activeTab === 'users' && styles.activeTab) }}
                    >
                        <FaUsers /> Kullanıcılar
                    </button>
                    <button
                        onClick={() => setActiveTab('premium')}
                        style={{ ...styles.tab, ...(activeTab === 'premium' && styles.activeTab) }}
                    >
                        <FaCrown /> Premium
                    </button>
                    <button
                        onClick={() => setActiveTab('servers')}
                        style={{ ...styles.tab, ...(activeTab === 'servers' && styles.activeTab) }}
                    >
                        <FaServer /> Sunucular
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {activeTab === 'overview' && <OverviewTab stats={stats} />}
                    {activeTab === 'users' && <UsersTab stats={stats} />}
                    {activeTab === 'premium' && <PremiumTab stats={stats} />}
                    {activeTab === 'servers' && <ServersTab stats={stats} />}
                </div>
            </div>
        </div>
    );
};

// Overview Tab
const OverviewTab = ({ stats }) => {
    // Cihaz dağılımı için pasta grafik verisi
    const deviceData = [
        { name: 'Mobil', value: stats.mobile_views || 0, color: '#5865f2' },
        { name: 'Masaüstü', value: stats.desktop_views || 0, color: '#23a559' }
    ];

    return (
        <div style={styles.tabContent}>
            {/* 🔥 BÜYÜME GÖSTERGELERİ */}
            <div style={styles.growthSection}>
                <GrowthCard
                    label="Mesaj Artışı (24h)"
                    value={stats.message_growth_24h || 0}
                    isPositive={(stats.message_growth_24h || 0) >= 0}
                />
                <GrowthCard
                    label="Kayıt Artışı (24h)"
                    value={stats.signup_growth_24h || 0}
                    isPositive={(stats.signup_growth_24h || 0) >= 0}
                />
                <GrowthCard
                    label="Günlük Ort. Mesaj"
                    value={stats.avg_messages_per_day || 0}
                    isPositive={true}
                    suffix=""
                    icon={<FaComments />}
                />
                <GrowthCard
                    label="Günlük Ort. Kayıt"
                    value={stats.avg_signups_per_day || 0}
                    isPositive={true}
                    suffix=""
                    icon={<FaUserPlus />}
                />
            </div>

            <div style={styles.statsGrid}>
                <StatCard
                    icon={<FaUsers />}
                    label="Toplam Kullanıcı"
                    value={stats.total_users || 0}
                    color="#5865f2"
                    subtitle={`Online: ${stats.online_users || 0} | Aktif: ${stats.active_users || 0}`}
                />
                <StatCard
                    icon={<FaServer />}
                    label="Toplam Sunucu"
                    value={stats.total_servers || 0}
                    color="#23a559"
                    subtitle={`Son 24h: +${stats.new_servers_24h || 0}`}
                />
                <StatCard
                    icon={<FaComments />}
                    label="Toplam Mesaj"
                    value={formatNumber(stats.total_messages || 0)}
                    color="#f0b132"
                    subtitle={`Son 24h: ${formatNumber(stats.messages_24h || 0)}`}
                />
                <StatCard
                    icon={<FaEye />}
                    label="Toplam Ziyaret"
                    value={formatNumber(stats.total_page_views || 0)}
                    color="#e91e63"
                    subtitle={`Son 24h: ${formatNumber(stats.page_views_24h || 0)}`}
                />
                <StatCard
                    icon={<FaCrown />}
                    label="Premium Kullanıcı"
                    value={stats.premium_users || 0}
                    color="#9b59b6"
                    subtitle={`Gelir: ${stats.monthly_revenue || 0} TL/ay`}
                />
                <StatCard
                    icon={<FaGlobe />}
                    label="Benzersiz Ziyaretçi"
                    value={formatNumber(stats.unique_visitors_30d || 0)}
                    color="#00bcd4"
                    subtitle={`Son 24h: ${formatNumber(stats.unique_visitors_24h || 0)}`}
                />
            </div>

            {/* 📱 CİHAZ DAĞILIMI */}
            {(stats.mobile_views > 0 || stats.desktop_views > 0) && (
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>📱 Cihaz Dağılımı (Son 7 Gün)</h3>
                    <div style={styles.deviceStats}>
                        <div style={styles.deviceCard}>
                            <FaMobile size={32} color="#5865f2" />
                            <div style={styles.deviceInfo}>
                                <span style={styles.deviceLabel}>Mobil</span>
                                <span style={styles.deviceValue}>{formatNumber(stats.mobile_views || 0)}</span>
                                <span style={styles.devicePercent}>
                                    {Math.round((stats.mobile_views || 0) / ((stats.mobile_views || 0) + (stats.desktop_views || 1)) * 100)}%
                                </span>
                            </div>
                        </div>
                        <div style={styles.deviceCard}>
                            <FaDesktop size={32} color="#23a559" />
                            <div style={styles.deviceInfo}>
                                <span style={styles.deviceLabel}>Masaüstü</span>
                                <span style={styles.deviceValue}>{formatNumber(stats.desktop_views || 0)}</span>
                                <span style={styles.devicePercent}>
                                    {Math.round((stats.desktop_views || 0) / ((stats.mobile_views || 0) + (stats.desktop_views || 1)) * 100)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 📊 GÜNLÜK GRAFİKLER */}
            {stats.daily_stats && stats.daily_stats.length > 0 && (
                <>
                    {/* Mesaj Grafiği */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>📨 Günlük Mesaj Sayısı (Son 30 Gün)</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={stats.daily_stats}>
                                <defs>
                                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#5865f2" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#5865f2" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                                <XAxis
                                    dataKey="label"
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                    interval={4}
                                />
                                <YAxis
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1f22',
                                        border: '1px solid #5865f2',
                                        borderRadius: '6px',
                                        color: '#fff'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="messages"
                                    stroke="#5865f2"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorMessages)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Aktif Kullanıcı Grafiği */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>👥 Günlük Aktif Kullanıcı (Son 30 Gün)</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={stats.daily_stats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                                <XAxis
                                    dataKey="label"
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                    interval={4}
                                />
                                <YAxis
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1f22',
                                        border: '1px solid #23a559',
                                        borderRadius: '6px',
                                        color: '#fff'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="active_users"
                                    stroke="#23a559"
                                    strokeWidth={3}
                                    dot={{ fill: '#23a559', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Yeni Kayıt Grafiği */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>🆕 Günlük Yeni Kayıtlar (Son 30 Gün)</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={stats.daily_stats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                                <XAxis
                                    dataKey="label"
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                    interval={4}
                                />
                                <YAxis
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1f22',
                                        border: '1px solid #f0b132',
                                        borderRadius: '6px',
                                        color: '#fff'
                                    }}
                                />
                                <Bar
                                    dataKey="signups"
                                    fill="#f0b132"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 👁️ Günlük Ziyaret Sayısı Grafiği */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>👁️ Günlük Ziyaret Sayısı (Son 30 Gün)</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={stats.daily_stats}>
                                <defs>
                                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#e91e63" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#e91e63" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                                <XAxis
                                    dataKey="label"
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                    interval={4}
                                />
                                <YAxis
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1f22',
                                        border: '1px solid #e91e63',
                                        borderRadius: '6px',
                                        color: '#fff'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="page_views"
                                    stroke="#e91e63"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPageViews)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 👥 Günlük Benzersiz Ziyaretçi Grafiği */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>👥 Günlük Benzersiz Ziyaretçi (Son 30 Gün)</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={stats.daily_stats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e1f22" />
                                <XAxis
                                    dataKey="label"
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                    interval={4}
                                />
                                <YAxis
                                    stroke="#b9bbbe"
                                    tick={{ fill: '#b9bbbe', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1f22',
                                        border: '1px solid #00bcd4',
                                        borderRadius: '6px',
                                        color: '#fff'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="unique_visitors"
                                    stroke="#00bcd4"
                                    strokeWidth={3}
                                    dot={{ fill: '#00bcd4', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}

            {/* Son Aktiviteler */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Son Aktiviteler (24 Saat)</h3>
                <div style={styles.activityList}>
                    <ActivityItem icon={<FaUserPlus />} label="Yeni Kayıtlar" value={stats.new_signups_24h || 0} />
                    <ActivityItem icon={<FaServer />} label="Yeni Sunucular" value={stats.new_servers_24h || 0} />
                    <ActivityItem icon={<FaComments />} label="Mesajlar" value={stats.messages_24h || 0} />
                    <ActivityItem icon={<FaEye />} label="Aktif Kullanıcı" value={stats.active_users_24h || 0} />
                    <ActivityItem icon={<FaEye />} label="Sayfa Ziyareti" value={stats.page_views_24h || 0} color="#e91e63" />
                    <ActivityItem icon={<FaUsers />} label="Benzersiz Ziyaretçi" value={stats.unique_visitors_24h || 0} color="#00bcd4" />
                </div>
            </div>

            {/* 📊 En Çok Ziyaret Edilen Sayfalar */}
            {stats.top_pages && stats.top_pages.length > 0 && (
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>📊 En Çok Ziyaret Edilen Sayfalar (Son 30 Gün)</h3>
                    <div style={styles.list}>
                        {stats.top_pages.slice(0, 10).map((page, index) => (
                            <div key={index} style={styles.listItem}>
                                <span>#{index + 1} {page?.path || 'Unknown'}</span>
                                <span style={{ color: '#e91e63', fontWeight: 'bold' }}>{(page?.views || 0).toLocaleString()} ziyaret</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Sayı formatlama yardımcı fonksiyonu
const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

// Büyüme Kartı Bileşeni
const GrowthCard = ({ label, value, isPositive, suffix = '%', icon }) => (
    <div style={{
        ...styles.growthCard,
        borderLeft: `4px solid ${isPositive ? '#23a559' : '#ed4245'}`
    }}>
        <div style={styles.growthLabel}>{label}</div>
        <div style={{
            ...styles.growthValue,
            color: isPositive ? '#23a559' : '#ed4245'
        }}>
            {icon || (isPositive ? <FaArrowUp /> : <FaArrowDown />)}
            <span>{typeof value === 'number' ? value.toFixed(1) : value}{suffix}</span>
        </div>
    </div>
);

// Users Tab
const UsersTab = ({ stats }) => (
    <div style={styles.tabContent}>
        <div style={styles.statsGrid}>
            <StatCard
                icon={<FaUsers />}
                label="Toplam Kullanıcı"
                value={stats.total_users || 0}
                color="#5865f2"
            />
            <StatCard
                icon={<FaUserPlus />}
                label="Online"
                value={stats.online_users || 0}
                color="#23a559"
            />
            <StatCard
                icon={<FaUserMinus />}
                label="Offline"
                value={(stats.total_users - stats.online_users) || 0}
                color="#747f8d"
            />
        </div>

        {/* Top Kullanıcılar */}
        {stats.top_users && stats.top_users.length > 0 && (
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>En Aktif Kullanıcılar</h3>
                <div style={styles.list}>
                    {stats.top_users.map((user, index) => (
                        <div key={index} style={styles.listItem}>
                            <span>#{index + 1} {user.username}</span>
                            <span>{user.message_count} mesaj</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

// Premium Tab
const PremiumTab = ({ stats }) => (
    <div style={styles.tabContent}>
        <div style={styles.statsGrid}>
            <StatCard
                icon={<FaCrown />}
                label="Premium Kullanıcı"
                value={stats.premium_users || 0}
                color="#9b59b6"
            />
            <StatCard
                icon={<FaShoppingCart />}
                label="Aylık Gelir"
                value={`${stats.monthly_revenue || 0} TL`}
                color="#f0b132"
            />
            <StatCard
                icon={<FaChartLine />}
                label="Yıllık Tahmin"
                value={`${(stats.monthly_revenue || 0) * 12} TL`}
                color="#23a559"
            />
        </div>

        {/* Premium Dağılımı */}
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Premium Dağılımı</h3>
            <div style={styles.pieChart}>
                <PieItem label="Ücretsiz" value={stats.free_users || 0} color="#747f8d" />
                <PieItem label="Nitro Basic" value={stats.basic_users || 0} color="#5865f2" />
                <PieItem label="Nitro Premium" value={stats.premium_tier_users || 0} color="#9b59b6" />
            </div>
        </div>
    </div>
);

// Servers Tab
const ServersTab = ({ stats }) => (
    <div style={styles.tabContent}>
        <div style={styles.statsGrid}>
            <StatCard
                icon={<FaServer />}
                label="Toplam Sunucu"
                value={stats.total_servers || 0}
                color="#5865f2"
            />
            <StatCard
                icon={<FaEye />}
                label="Genel Sunucu"
                value={stats.public_servers || 0}
                color="#23a559"
            />
            <StatCard
                icon={<FaUsers />}
                label="Ortalama Üye"
                value={stats.avg_server_members || 0}
                color="#f0b132"
            />
        </div>

        {/* En Büyük Sunucular */}
        {stats.top_servers && stats.top_servers.length > 0 && (
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>En Büyük Sunucular</h3>
                <div style={styles.list}>
                    {stats.top_servers.map((server, index) => (
                        <div key={index} style={styles.listItem}>
                            <span>#{index + 1} {server.name}</span>
                            <span>{server.member_count} üye</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

// Yardımcı Bileşenler
const StatCard = ({ icon, label, value, color, subtitle }) => (
    <div style={{ ...styles.statCard, borderTop: `3px solid ${color}` }}>
        <div style={{ ...styles.statIcon, color }}>{icon}</div>
        <div style={styles.statContent}>
            <div style={styles.statLabel}>{label}</div>
            <div style={styles.statValue}>{value}</div>
            {subtitle && <div style={styles.statSubtitle}>{subtitle}</div>}
        </div>
    </div>
);

const ActivityItem = ({ icon, label, value, color = '#5865f2' }) => (
    <div style={styles.activityItem}>
        <div style={{ ...styles.activityIcon, color }}>{icon}</div>
        <div style={styles.activityLabel}>{label}</div>
        <div style={{ ...styles.activityValue, color }}>{value}</div>
    </div>
);

const PieItem = ({ label, value, color }) => (
    <div style={styles.pieItem}>
        <div style={{ ...styles.pieColor, backgroundColor: color }}></div>
        <div style={styles.pieLabel}>{label}</div>
        <div style={styles.pieValue}>{value}</div>
    </div>
);

// Styles
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
        backdropFilter: 'blur(5px)'
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #1e1f22',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#fff'
    },
    headerRight: {
        display: 'flex',
        gap: '10px'
    },
    title: {
        margin: 0,
        fontSize: '24px',
        color: '#fff'
    },
    exportButton: {
        background: '#23a559',
        border: 'none',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: '#da373c',
        border: 'none',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    tabs: {
        display: 'flex',
        padding: '0 20px',
        borderBottom: '1px solid #1e1f22',
        gap: '5px'
    },
    tab: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        padding: '12px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        borderBottom: '2px solid transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    activeTab: {
        color: '#fff',
        borderBottomColor: '#5865f2'
    },
    content: {
        flex: 1,
        overflow: 'auto',
        padding: '20px'
    },
    tabContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '15px'
    },
    statCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    statIcon: {
        fontSize: '32px'
    },
    statContent: {
        flex: 1
    },
    statLabel: {
        color: '#b9bbbe',
        fontSize: '12px',
        marginBottom: '5px'
    },
    statValue: {
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold'
    },
    statSubtitle: {
        color: '#747f8d',
        fontSize: '11px',
        marginTop: '3px'
    },
    section: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '20px'
    },
    sectionTitle: {
        color: '#fff',
        fontSize: '16px',
        marginBottom: '15px',
        margin: '0 0 15px 0'
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    activityItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#2b2d31',
        borderRadius: '6px'
    },
    activityIcon: {
        color: '#5865f2',
        marginRight: '12px',
        fontSize: '18px'
    },
    activityLabel: {
        flex: 1,
        color: '#b9bbbe',
        fontSize: '14px'
    },
    activityValue: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#2b2d31',
        borderRadius: '6px',
        color: '#b9bbbe',
        fontSize: '14px'
    },
    pieChart: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    pieItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    pieColor: {
        width: '20px',
        height: '20px',
        borderRadius: '4px'
    },
    pieLabel: {
        flex: 1,
        color: '#b9bbbe',
        fontSize: '14px'
    },
    pieValue: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    loading: {
        color: '#fff',
        textAlign: 'center',
        padding: '40px'
    },
    error: {
        color: '#da373c',
        textAlign: 'center',
        padding: '40px'
    },
    // 🆕 Büyüme göstergeleri stilleri
    growthSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
    },
    growthCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    growthLabel: {
        color: '#b9bbbe',
        fontSize: '12px'
    },
    growthValue: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    // 🆕 Cihaz dağılımı stilleri
    deviceStats: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
    },
    deviceCard: {
        flex: '1 1 200px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        backgroundColor: '#2b2d31',
        padding: '20px',
        borderRadius: '8px'
    },
    deviceInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    deviceLabel: {
        color: '#b9bbbe',
        fontSize: '12px'
    },
    deviceValue: {
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold'
    },
    devicePercent: {
        color: '#5865f2',
        fontSize: '14px',
        fontWeight: 'bold'
    }
};

export default AdminAnalyticsPanel;



