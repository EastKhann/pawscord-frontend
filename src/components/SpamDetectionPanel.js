// frontend/src/components/SpamDetectionPanel.js
// 🛡️ ML-Based Spam Detection System - Full Implementation

import React, { useState, useEffect, useCallback } from 'react';
import {
    FaShieldAlt, FaRobot, FaBan, FaExclamationTriangle,
    FaCheck, FaTimes, FaCog, FaChartBar, FaHistory,
    FaUserSlash, FaCommentSlash, FaLink, FaAt
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import toast from '../utils/toast';

/**
 * Spam Detection Panel
 * ML-based spam detection with pattern analysis
 */
const SpamDetectionPanel = ({ serverId, fetchWithAuth, apiBaseUrl, isAdmin = false }) => {
    const [settings, setSettings] = useState({
        enabled: true,
        sensitivity: 'medium', // low, medium, high, aggressive
        actions: {
            warn: true,
            mute: true,
            kick: false,
            ban: false
        },
        patterns: {
            rapidMessages: true,
            duplicateContent: true,
            mentionSpam: true,
            linkSpam: true,
            capsLock: true,
            zalgoText: true
        },
        thresholds: {
            messagesPerMinute: 10,
            duplicateThreshold: 3,
            mentionLimit: 5,
            linkLimit: 3,
            capsPercentage: 70
        },
        whitelist: [],
        customPatterns: []
    });

    const [stats, setStats] = useState({
        totalDetected: 0,
        todayDetected: 0,
        actionsToken: { warn: 0, mute: 0, kick: 0, ban: 0 },
        topOffenders: [],
        recentDetections: []
    });

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview'); // overview, settings, logs

    // Spam pattern weights for ML-like scoring
    const PATTERN_WEIGHTS = {
        rapidMessages: 0.3,
        duplicateContent: 0.25,
        mentionSpam: 0.2,
        linkSpam: 0.15,
        capsLock: 0.05,
        zalgoText: 0.05
    };

    // Sensitivity presets
    const SENSITIVITY_PRESETS = {
        low: {
            messagesPerMinute: 15,
            duplicateThreshold: 5,
            mentionLimit: 10,
            linkLimit: 5,
            capsPercentage: 80
        },
        medium: {
            messagesPerMinute: 10,
            duplicateThreshold: 3,
            mentionLimit: 5,
            linkLimit: 3,
            capsPercentage: 70
        },
        high: {
            messagesPerMinute: 7,
            duplicateThreshold: 2,
            mentionLimit: 3,
            linkLimit: 2,
            capsPercentage: 60
        },
        aggressive: {
            messagesPerMinute: 5,
            duplicateThreshold: 2,
            mentionLimit: 2,
            linkLimit: 1,
            capsPercentage: 50
        }
    };

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        const baseUrl = apiBaseUrl || getApiBase();
        try {
            const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/spam-settings/`);
            if (response.ok) {
                const data = await response.json();
                setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (err) {
            console.error('Failed to fetch spam settings:', err);
        }

        // Fetch stats
        try {
            const statsResponse = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/spam-stats/`);
            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                setStats(prev => ({ ...prev, ...statsData }));
            } else {
                setStats({
                    totalDetected: 0,
                    todayDetected: 0,
                    actionsTaken: { warn: 0, mute: 0, kick: 0, ban: 0 },
                    topOffenders: [],
                    recentDetections: []
                });
            }
        } catch (err) {
            console.error('Failed to fetch spam stats:', err);
            setStats({
                totalDetected: 0,
                todayDetected: 0,
                actionsTaken: { warn: 0, mute: 0, kick: 0, ban: 0 },
                topOffenders: [],
                recentDetections: []
            });
        }

        setLoading(false);
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const handleSensitivityChange = (level) => {
        setSettings(prev => ({
            ...prev,
            sensitivity: level,
            thresholds: SENSITIVITY_PRESETS[level]
        }));
    };

    const handlePatternToggle = (pattern) => {
        setSettings(prev => ({
            ...prev,
            patterns: {
                ...prev.patterns,
                [pattern]: !prev.patterns[pattern]
            }
        }));
    };

    const handleActionToggle = (action) => {
        setSettings(prev => ({
            ...prev,
            actions: {
                ...prev.actions,
                [action]: !prev.actions[action]
            }
        }));
    };

    const saveSettings = async () => {
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/spam-settings/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                toast.success('Spam koruma ayarları kaydedildi! ✅');
            } else {
                toast.error('Ayarlar kaydedilemedi');
            }
        } catch (err) {
            console.error('Failed to save settings:', err);
            toast.error('Bir hata oluştu');
        }
    };

    const getPatternIcon = (type) => {
        const icons = {
            rapidMessages: <FaCommentSlash />,
            duplicateContent: <FaHistory />,
            mentionSpam: <FaAt />,
            linkSpam: <FaLink />,
            capsLock: <FaExclamationTriangle />,
            zalgoText: <FaBan />
        };
        return icons[type] || <FaShieldAlt />;
    };

    const getActionColor = (action) => {
        const colors = {
            warn: '#faa61a',
            mute: '#5865f2',
            kick: '#f04747',
            ban: '#ed4245'
        };
        return colors[action] || '#72767d';
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaRobot className="pulse" size={32} color="#5865f2" />
                    <span>Spam koruma sistemi yükleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaShieldAlt size={24} color="#43b581" />
                    <div>
                        <h2 style={styles.title}>Spam Koruma Sistemi</h2>
                        <p style={styles.subtitle}>ML tabanlı akıllı spam algılama</p>
                    </div>
                </div>
                <div style={styles.headerRight}>
                    <div
                        style={{
                            ...styles.statusBadge,
                            backgroundColor: settings.enabled ? 'rgba(67, 181, 129, 0.2)' : 'rgba(240, 71, 71, 0.2)',
                            color: settings.enabled ? '#43b581' : '#f04747'
                        }}
                    >
                        {settings.enabled ? '✓ Aktif' : '✗ Kapalı'}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={styles.tabs}>
                {['overview', 'settings', 'logs'].map(tab => (
                    <button
                        key={tab}
                        style={{
                            ...styles.tab,
                            backgroundColor: activeTab === tab ? '#5865f2' : 'transparent',
                            color: activeTab === tab ? '#fff' : '#b9bbbe'
                        }}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'overview' && <FaChartBar />}
                        {tab === 'settings' && <FaCog />}
                        {tab === 'logs' && <FaHistory />}
                        {tab === 'overview' ? 'Genel Bakış' : tab === 'settings' ? 'Ayarlar' : 'Kayıtlar'}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div style={styles.content}>
                    {/* Stats Cards */}
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaShieldAlt size={20} color="#43b581" />
                            </div>
                            <div style={styles.statInfo}>
                                <div style={styles.statValue}>{stats.totalDetected}</div>
                                <div style={styles.statLabel}>Toplam Tespit</div>
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaExclamationTriangle size={20} color="#faa61a" />
                            </div>
                            <div style={styles.statInfo}>
                                <div style={styles.statValue}>{stats.todayDetected}</div>
                                <div style={styles.statLabel}>Bugün</div>
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaUserSlash size={20} color="#f04747" />
                            </div>
                            <div style={styles.statInfo}>
                                <div style={styles.statValue}>{stats.actionsTaken?.ban || 0}</div>
                                <div style={styles.statLabel}>Ban</div>
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaRobot size={20} color="#5865f2" />
                            </div>
                            <div style={styles.statInfo}>
                                <div style={styles.statValue}>
                                    {Object.values(settings.patterns).filter(Boolean).length}
                                </div>
                                <div style={styles.statLabel}>Aktif Kural</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Detections */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Son Tespitler</h3>
                        <div style={styles.detectionsList}>
                            {stats.recentDetections.map((detection, index) => (
                                <div key={index} style={styles.detectionItem}>
                                    <div style={styles.detectionIcon}>
                                        {getPatternIcon(detection.type)}
                                    </div>
                                    <div style={styles.detectionInfo}>
                                        <div style={styles.detectionUser}>
                                            <strong>{detection.username}</strong>
                                            <span style={styles.detectionType}>{detection.type}</span>
                                        </div>
                                        <div style={styles.detectionMessage}>
                                            {detection.message.substring(0, 50)}...
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            ...styles.actionBadge,
                                            backgroundColor: getActionColor(detection.action)
                                        }}
                                    >
                                        {detection.action}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Offenders */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>En Çok İhlal Edenler</h3>
                        <div style={styles.offendersList}>
                            {stats.topOffenders.map((offender, index) => (
                                <div key={index} style={styles.offenderItem}>
                                    <div style={styles.offenderRank}>#{index + 1}</div>
                                    <div style={styles.offenderInfo}>
                                        <span style={styles.offenderName}>{offender.username}</span>
                                        <span style={styles.offenderCount}>{offender.count} ihlal</span>
                                    </div>
                                    <div
                                        style={{
                                            ...styles.actionBadge,
                                            backgroundColor: getActionColor(offender.lastAction)
                                        }}
                                    >
                                        {offender.lastAction}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
                <div style={styles.content}>
                    {/* Enable/Disable */}
                    <div style={styles.settingRow}>
                        <div style={styles.settingInfo}>
                            <FaShieldAlt size={18} color="#43b581" />
                            <div>
                                <div style={styles.settingTitle}>Spam Koruması</div>
                                <div style={styles.settingDesc}>Otomatik spam algılama ve önleme</div>
                            </div>
                        </div>
                        <button
                            style={{
                                ...styles.toggleButton,
                                backgroundColor: settings.enabled ? '#43b581' : '#72767d'
                            }}
                            onClick={() => setSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                        >
                            {settings.enabled ? <FaCheck /> : <FaTimes />}
                        </button>
                    </div>

                    {/* Sensitivity */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Hassasiyet Seviyesi</h3>
                        <div style={styles.sensitivityGrid}>
                            {['low', 'medium', 'high', 'aggressive'].map(level => (
                                <button
                                    key={level}
                                    style={{
                                        ...styles.sensitivityButton,
                                        backgroundColor: settings.sensitivity === level ? '#5865f2' : '#40444b',
                                        borderColor: settings.sensitivity === level ? '#5865f2' : 'transparent'
                                    }}
                                    onClick={() => handleSensitivityChange(level)}
                                >
                                    {level === 'low' && '🐢 Düşük'}
                                    {level === 'medium' && '⚖️ Orta'}
                                    {level === 'high' && '🔥 Yüksek'}
                                    {level === 'aggressive' && '⚡ Agresif'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Detection Patterns */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Algılama Kalıpları</h3>
                        <div style={styles.patternsGrid}>
                            {Object.entries(settings.patterns).map(([pattern, enabled]) => (
                                <div key={pattern} style={styles.patternItem}>
                                    <div style={styles.patternInfo}>
                                        {getPatternIcon(pattern)}
                                        <span>{
                                            pattern === 'rapidMessages' ? 'Hızlı Mesaj' :
                                                pattern === 'duplicateContent' ? 'Tekrarlanan İçerik' :
                                                    pattern === 'mentionSpam' ? 'Etiket Spam' :
                                                        pattern === 'linkSpam' ? 'Link Spam' :
                                                            pattern === 'capsLock' ? 'BÜYÜK HARF' :
                                                                'Zalgo Metin'
                                        }</span>
                                    </div>
                                    <button
                                        style={{
                                            ...styles.miniToggle,
                                            backgroundColor: enabled ? '#43b581' : '#72767d'
                                        }}
                                        onClick={() => handlePatternToggle(pattern)}
                                    >
                                        {enabled ? <FaCheck size={10} /> : <FaTimes size={10} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Otomatik Eylemler</h3>
                        <div style={styles.actionsGrid}>
                            {Object.entries(settings.actions).map(([action, enabled]) => (
                                <div key={action} style={styles.actionItem}>
                                    <div style={styles.actionInfo}>
                                        <div
                                            style={{
                                                ...styles.actionDot,
                                                backgroundColor: getActionColor(action)
                                            }}
                                        />
                                        <span>{
                                            action === 'warn' ? 'Uyar' :
                                                action === 'mute' ? 'Sustur' :
                                                    action === 'kick' ? 'At' :
                                                        'Yasakla'
                                        }</span>
                                    </div>
                                    <button
                                        style={{
                                            ...styles.miniToggle,
                                            backgroundColor: enabled ? '#43b581' : '#72767d'
                                        }}
                                        onClick={() => handleActionToggle(action)}
                                    >
                                        {enabled ? <FaCheck size={10} /> : <FaTimes size={10} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    {isAdmin && (
                        <button style={styles.saveButton} onClick={saveSettings}>
                            <FaCheck /> Ayarları Kaydet
                        </button>
                    )}
                </div>
            )}

            {/* Logs Tab */}
            {activeTab === 'logs' && (
                <div style={styles.content}>
                    <div style={styles.logsHeader}>
                        <h3 style={styles.sectionTitle}>Spam Kayıtları</h3>
                        <select style={styles.filterSelect}>
                            <option value="all">Tüm Eylemler</option>
                            <option value="warn">Uyarılar</option>
                            <option value="mute">Susturmalar</option>
                            <option value="kick">Atmalar</option>
                            <option value="ban">Yasaklamalar</option>
                        </select>
                    </div>
                    <div style={styles.logsList}>
                        {stats.recentDetections.map((log, index) => (
                            <div key={index} style={styles.logItem}>
                                <div style={styles.logTime}>
                                    {new Date(log.timestamp).toLocaleString('tr-TR')}
                                </div>
                                <div style={styles.logContent}>
                                    <strong>{log.username}</strong> - {log.type}
                                    <div style={styles.logMessage}>"{log.message}"</div>
                                </div>
                                <div
                                    style={{
                                        ...styles.actionBadge,
                                        backgroundColor: getActionColor(log.action)
                                    }}
                                >
                                    {log.action}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        overflow: 'hidden'
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
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center'
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
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600'
    },
    tabs: {
        display: 'flex',
        padding: '0 20px',
        borderBottom: '1px solid #202225',
        gap: '8px'
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        border: 'none',
        borderRadius: '4px 4px 0 0',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'all 0.15s'
    },
    content: {
        padding: '20px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '24px'
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#202225',
        borderRadius: '8px'
    },
    statIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        backgroundColor: '#36393f',
        borderRadius: '8px'
    },
    statInfo: {
        flex: 1
    },
    statValue: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#fff'
    },
    statLabel: {
        fontSize: '12px',
        color: '#72767d'
    },
    section: {
        marginBottom: '24px'
    },
    sectionTitle: {
        margin: '0 0 16px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    detectionsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    detectionItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: '#202225',
        borderRadius: '6px'
    },
    detectionIcon: {
        color: '#faa61a'
    },
    detectionInfo: {
        flex: 1
    },
    detectionUser: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
        fontSize: '14px'
    },
    detectionType: {
        fontSize: '11px',
        color: '#72767d',
        backgroundColor: '#40444b',
        padding: '2px 6px',
        borderRadius: '3px'
    },
    detectionMessage: {
        fontSize: '12px',
        color: '#72767d',
        marginTop: '4px'
    },
    actionBadge: {
        padding: '4px 10px',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    offendersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    offenderItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: '#202225',
        borderRadius: '6px'
    },
    offenderRank: {
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#40444b',
        borderRadius: '50%',
        fontSize: '12px',
        fontWeight: '600',
        color: '#fff'
    },
    offenderInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    offenderName: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500'
    },
    offenderCount: {
        color: '#72767d',
        fontSize: '12px'
    },
    settingRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#202225',
        borderRadius: '8px',
        marginBottom: '16px'
    },
    settingInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    settingTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500'
    },
    settingDesc: {
        color: '#72767d',
        fontSize: '12px'
    },
    toggleButton: {
        width: '44px',
        height: '24px',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        transition: 'background-color 0.2s'
    },
    sensitivityGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px'
    },
    sensitivityButton: {
        padding: '12px',
        border: '2px solid transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        color: '#fff',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'all 0.15s'
    },
    patternsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px'
    },
    patternItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#202225',
        borderRadius: '6px'
    },
    patternInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#dcddde',
        fontSize: '13px'
    },
    miniToggle: {
        width: '28px',
        height: '18px',
        border: 'none',
        borderRadius: '9px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        transition: 'background-color 0.2s'
    },
    actionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px'
    },
    actionItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#202225',
        borderRadius: '6px'
    },
    actionInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#dcddde',
        fontSize: '13px'
    },
    actionDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%'
    },
    saveButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        padding: '12px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.15s'
    },
    logsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    filterSelect: {
        padding: '8px 12px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '13px'
    },
    logsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    logItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: '#202225',
        borderRadius: '6px'
    },
    logTime: {
        fontSize: '11px',
        color: '#72767d',
        whiteSpace: 'nowrap'
    },
    logContent: {
        flex: 1,
        fontSize: '13px',
        color: '#dcddde'
    },
    logMessage: {
        fontSize: '12px',
        color: '#72767d',
        marginTop: '4px',
        fontStyle: 'italic'
    }
};

export default SpamDetectionPanel;
