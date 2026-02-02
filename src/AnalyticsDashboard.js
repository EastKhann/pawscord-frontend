// frontend/src/AnalyticsDashboard.js
// (MOBİL VE PC İÇİN AYRI AYRI OPTİMİZE EDİLMİŞ NİHAİ VERSİYON)

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
// ⚡ OPTIMIZATION: Selective import (was importing entire chart.js library)
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js/auto'; // /auto for tree-shaking
import { FaTimes, FaUsers, FaEye, FaUserClock, FaMicrophone } from 'react-icons/fa';

// ⚡ Register only needed components (not all of chart.js)
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AnalyticsDashboard = ({ onClose, apiBaseUrl, fetchWithAuth }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🐱 YENİ: Kedi senkronizasyon state'leri
    const [syncingCats, setSyncingCats] = useState(false);
    const [syncMessage, setSyncMessage] = useState(null);

    // EKRAN GENİŞLİĞİNİ DİNLEME (MOBİL Mİ PC Mİ?)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetchWithAuth(`${apiBaseUrl}/analytics/data/`);
                if (!response.ok) {
                    throw new Error('Veri çekilemedi. Yetkiniz olmayabilir.');
                }
                const data = await response.json();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [apiBaseUrl, fetchWithAuth]);

    // 🐱 Kedi Avatarlarını Senkronize Et
    const handleSyncCatAvatars = async () => {
        setSyncingCats(true);
        setSyncMessage(null);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/admin/sync-cat-avatars/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setSyncMessage({
                    type: 'success',
                    text: data.message || `✅ ${data.copied} kedi avatarı senkronize edildi!`,
                    details: data
                });
            } else {
                setSyncMessage({
                    type: 'error',
                    text: data.message || 'Bir hata oluştu',
                    help: data.help
                });
            }
        } catch (err) {
            setSyncMessage({
                type: 'error',
                text: 'Bağlantı hatası: ' + err.message
            });
        } finally {
            setSyncingCats(false);
        }
    };

    // Grafik Ayarları
    const commonOptions = (title) => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#dcddde', font: { family: 'Poppins' } }
            },
            title: {
                display: true,
                text: title,
                color: '#fff',
                font: { size: 14, family: 'Poppins', weight: '600' },
                padding: { bottom: 15 }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1
            }
        },
        scales: {
            x: { ticks: { color: '#949ba4' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
            y: { ticks: { color: '#949ba4' }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
        },
        elements: { line: { tension: 0.4 } }
    });

    const userGrowthChartData = {
        labels: stats?.user_growth_chart?.labels || [],
        datasets: [{ label: 'Toplam Kullanıcı', data: stats?.user_growth_chart?.data || [], borderColor: '#23a559', backgroundColor: 'rgba(35, 165, 89, 0.2)', fill: true }]
    };

    const visitGrowthChartData = {
        labels: stats?.visit_growth_chart?.labels || [],
        datasets: [{ label: 'Toplam Görüntülenme', data: stats?.visit_growth_chart?.data || [], borderColor: '#f0b232', backgroundColor: 'rgba(240, 178, 50, 0.2)', fill: true }]
    };

    const dailyVisitChartData = {
        labels: stats?.visit_chart?.labels || [],
        datasets: [{ label: 'Günlük Ziyaret', data: stats?.visit_chart?.data || [], borderColor: '#5865f2', backgroundColor: 'rgba(88, 101, 242, 0.2)', fill: true }]
    };

    if (loading) return <div style={styles.overlay}><div style={styles.loader}>Veriler Yükleniyor...</div></div>;
    if (error) return <div style={styles.overlay}><div style={styles.errorBox}>Hata: {error} <button onClick={onClose} style={styles.closeButtonSimple}>Kapat</button></div></div>;
    if (!stats) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            {/* DİNAMİK STİL:
                Mobilde: Ekranı tam kapla, kenarları düz yap.
                PC'de: Ortala, kenarları yuvarlat, geniş olsun.
            */}
            <div
                style={{
                    ...styles.panel,
                    ...(isMobile ? styles.panelMobile : styles.panelDesktop)
                }}
                onClick={e => e.stopPropagation()}
            >

                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>📊 Analitik Paneli</h2>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {/* 🐱 Kedi Senkronizasyon Butonu */}
                        <button
                            style={{
                                ...styles.syncButton,
                                opacity: syncingCats ? 0.6 : 1,
                                cursor: syncingCats ? 'not-allowed' : 'pointer'
                            }}
                            onClick={handleSyncCatAvatars}
                            disabled={syncingCats}
                            title="Kedi avatarlarını senkronize et"
                        >
                            {syncingCats ? '⏳' : '🐱'} {syncingCats ? 'Senkronize Ediliyor...' : 'Kedi Avatarları'}
                        </button>
                        <button style={styles.closeButton} onClick={onClose}><FaTimes /></button>
                    </div>
                </div>

                {/* 🐱 Senkronizasyon Mesajı */}
                {syncMessage && (
                    <div style={{
                        ...styles.syncMessage,
                        backgroundColor: syncMessage.type === 'success' ? '#23a559' : '#ed4245'
                    }}>
                        <div style={{ fontWeight: 'bold' }}>{syncMessage.text}</div>
                        {syncMessage.help && <div style={{ fontSize: '0.85em', marginTop: '5px' }}>{syncMessage.help}</div>}
                        {syncMessage.details && syncMessage.details.copied > 0 && (
                            <div style={{ fontSize: '0.85em', marginTop: '5px' }}>
                                📂 {syncMessage.details.total_cats} toplam, {syncMessage.details.copied} kopyalandı, {syncMessage.details.skipped} atlandı
                            </div>
                        )}
                        <button
                            style={styles.syncMessageClose}
                            onClick={() => setSyncMessage(null)}
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div style={styles.scrollContent}>
                    {/* İSTATİSTİK KARTLARI */}
                    <div style={styles.statsGrid}>
                        <StatCard icon={<FaUsers />} value={stats.total_users} label="Toplam Kullanıcı" color="#5865f2" />
                        <StatCard icon={<FaEye />} value={stats.total_visits} label="Toplam Ziyaret" color="#f0b232" />
                        <StatCard icon={<FaUserClock />} value={stats.active_now} label="Şu An Aktif" color="#23a559" />
                        <StatCard icon={<FaMicrophone />} value={stats.voice_now} label="Seslide Olan" color="#eb459e" />
                    </div>

                    {/* GRAFİKLER */}
                    <div style={isMobile ? styles.chartsGridMobile : styles.chartsGridDesktop}>
                        <div style={styles.chartCard}>
                            <Line options={commonOptions('Kullanıcı Büyümesi')} data={userGrowthChartData} />
                        </div>
                        <div style={styles.chartCard}>
                            <Line options={commonOptions('Görüntülenme Büyümesi')} data={visitGrowthChartData} />
                        </div>
                        <div style={{ ...styles.chartCard, ...(isMobile ? {} : { gridColumn: '1 / -1' }) }}>
                            <Line options={commonOptions('Son 7 Günlük Aktivite')} data={dailyVisitChartData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, value, label, color }) => (
    <div style={{ ...styles.statBox, borderLeft: `4px solid ${color}` }}>
        <div style={{ ...styles.iconBox, color: color }}>{icon}</div>
        <div style={styles.statInfo}>
            <span style={{ ...styles.statValue, color: color }}>{value}</span>
            <span style={styles.statLabel}>{label}</span>
        </div>
    </div>
);

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999,
    },

    // TEMEL PANEL STİLİ
    panel: {
        backgroundColor: '#2b2d31',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
        border: '1px solid #1e1f22',
    },

    // 💻 PC İÇİN PANEL AYARLARI (GENİŞ VE ORTADA)
    panelDesktop: {
        width: '90%',
        maxWidth: '1200px', // PC'de geniş olsun
        height: '85vh',
        borderRadius: '16px',
    },

    // 📱 MOBİL İÇİN PANEL AYARLARI (TAM EKRAN VE SIKIŞIK DEĞİL)
    panelMobile: {
        width: '100%',
        height: '100%', // Tüm ekranı kapla
        maxWidth: 'none',
        borderRadius: '0', // Köşeleri düz yap
        border: 'none'
    },

    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 25px', backgroundColor: '#1e1f22', borderBottom: '1px solid #111214',
        flexShrink: 0
    },
    headerTitle: { margin: 0, color: '#fff', fontSize: '1.3em', display: 'flex', alignItems: 'center', gap: '10px' },
    closeButton: {
        background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
        width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    scrollContent: {
        padding: '20px',
        overflowY: 'auto', // İÇERİK KAYDIRILABİLİR
        flex: 1,
        WebkitOverflowScrolling: 'touch' // Mobilde akıcı kaydırma
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Mobilde yan yana 2 tane sığsın
        gap: '15px',
        marginBottom: '30px'
    },
    statBox: {
        backgroundColor: '#313338', padding: '15px', borderRadius: '12px',
        display: 'flex', alignItems: 'center', gap: '15px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
    },
    iconBox: { fontSize: '1.8em', display: 'flex', alignItems: 'center' },
    statInfo: { display: 'flex', flexDirection: 'column' },
    statValue: { fontSize: '1.6em', fontWeight: 'bold', lineHeight: '1' },
    statLabel: { color: '#949ba4', fontSize: '0.85em', marginTop: '3px' },

    // 💻 PC GRAFİK IZGARASI (YAN YANA)
    chartsGridDesktop: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Yan yana 2 kolon
        gap: '20px'
    },

    // 📱 MOBİL GRAFİK IZGARASI (ALT ALTA)
    chartsGridMobile: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },

    chartCard: {
        backgroundColor: '#313338', padding: '15px', borderRadius: '12px',
        height: '300px', // Grafikler için sabit yükseklik
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)', position: 'relative'
    },
    loader: { color: 'white', fontSize: '1.5em' },
    errorBox: { backgroundColor: '#da373c', color: 'white', padding: '20px', borderRadius: '8px' },
    closeButtonSimple: { marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' },

    // 🐱 Kedi senkronizasyon stilleri
    syncButton: {
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '0.9em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 2px 8px rgba(88, 101, 242, 0.3)',
    },
    syncMessage: {
        padding: '15px',
        margin: '10px 20px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.95em',
        position: 'relative',
    },
    syncMessageClose: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        color: 'white',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

// Animasyon ve scrollbar stili
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  /* Scrollbar Özelleştirme */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #2b2d31; }
  ::-webkit-scrollbar-thumb { background: #1a1b1e; border-radius: 4px; }
`;
document.head.appendChild(styleSheet);

export default AnalyticsDashboard;

