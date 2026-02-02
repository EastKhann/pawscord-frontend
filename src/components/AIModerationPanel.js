// frontend/src/components/AIModerationPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShieldAlt, FaExclamationTriangle, FaBan, FaCheckCircle, FaEye } from 'react-icons/fa';
import toast from '../utils/toast';
import { getApiBase } from '../utils/apiEndpoints';

const AIModerationPanel = ({ serverSlug, token, isMobile }) => {
    const [settings, setSettings] = useState({
        spamDetection: true,
        profanityFilter: true,
        nsfwDetection: true,
        toxicityThreshold: 70,
        autoTimeout: false,
        autoDelete: false,
        warningCount: 3,
    });
    const [recentFlags, setRecentFlags] = useState([]);
    const [stats, setStats] = useState({
        messagesScanned: 0,
        flaggedToday: 0,
        autoModActions: 0,
        accuracy: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadModeration();
    }, []);

    const loadModeration = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${getApiBase()}/moderation/${serverSlug}/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.settings) setSettings(response.data.settings);
            if (response.data.recent_flags) setRecentFlags(response.data.recent_flags);
            if (response.data.stats) setStats(response.data.stats);
        } catch (error) {
            console.error('Failed to load moderation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveSettings = async () => {
        try {
            await axios.post(
                `${getApiBase()}/moderation/${serverSlug}/update/`,
                { settings },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('✅ Moderation settings saved!');
        } catch (error) {
            console.error('Failed to save:', error);
            toast.error('❌ Failed to save settings');
        }
    };

    const handleAction = async (flagId, action) => {
        try {
            await axios.post(
                `${getApiBase()}/moderation/flag/${flagId}/action/`,
                { action },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            loadModeration();
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const styles = {
        container: {
            padding: isMobile ? '16px' : '24px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        header: {
            marginBottom: '32px',
        },
        title: {
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: 'rgba(255, 255, 255, 0.95)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px',
        },
        subtitle: {
            fontSize: isMobile ? '14px' : '16px',
            color: 'rgba(255, 255, 255, 0.6)',
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '32px',
        },
        statCard: {
            background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.1), rgba(114, 137, 218, 0.1))',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
        },
        statValue: {
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#5865f2',
            marginBottom: '8px',
        },
        statLabel: {
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
        },
        section: {
            background: 'rgba(30, 31, 34, 0.6)',
            border: '1px solid rgba(88, 101, 242, 0.2)',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '24px',
            marginBottom: '24px',
        },
        sectionTitle: {
            fontSize: '20px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        setting: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0',
            borderBottom: '1px solid rgba(88, 101, 242, 0.1)',
        },
        settingInfo: {
            flex: 1,
        },
        settingLabel: {
            fontSize: '16px',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '4px',
        },
        settingDesc: {
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.6)',
        },
        switch: (enabled) => ({
            width: '56px',
            height: '32px',
            background: enabled ? 'linear-gradient(135deg, #43b581, #4caf50)' : 'rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(88, 101, 242, 0.3)',
        }),
        switchKnob: (enabled) => ({
            width: '26px',
            height: '26px',
            background: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '1px',
            left: enabled ? '26px' : '1px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }),
        slider: {
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: 'rgba(255, 255, 255, 0.2)',
            outline: 'none',
            marginTop: '8px',
        },
        flagsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        flagCard: {
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(218, 55, 60, 0.4)',
            borderRadius: '12px',
            padding: '16px',
        },
        flagHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
        },
        flagType: (type) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            background: type === 'spam' ? 'rgba(218, 55, 60, 0.2)' :
                type === 'nsfw' ? 'rgba(240, 183, 50, 0.2)' :
                    'rgba(88, 101, 242, 0.2)',
            color: type === 'spam' ? '#da373c' :
                type === 'nsfw' ? '#f0b732' :
                    '#5865f2',
        }),
        flagMessage: {
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '12px',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '14px',
            marginBottom: '12px',
            fontFamily: 'monospace',
        },
        flagActions: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
        },
        actionBtn: (type) => ({
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            minHeight: '36px',
            background: type === 'delete' ? 'rgba(218, 55, 60, 0.2)' :
                type === 'timeout' ? 'rgba(240, 183, 50, 0.2)' :
                    'rgba(67, 181, 129, 0.2)',
            color: type === 'delete' ? '#da373c' :
                type === 'timeout' ? '#f0b732' :
                    '#43b581',
            border: `1px solid ${type === 'delete' ? 'rgba(218, 55, 60, 0.4)' :
                type === 'timeout' ? 'rgba(240, 183, 50, 0.4)' :
                    'rgba(67, 181, 129, 0.4)'}`,
        }),
        saveBtn: {
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #5865f2, #7289da)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '24px',
            transition: 'all 0.2s ease',
            minHeight: '48px',
        },
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>
                    <FaShieldAlt />
                    AI Moderation
                </h1>
                <p style={styles.subtitle}>
                    Automated content filtering powered by machine learning
                </p>
            </div>

            {/* Stats */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{stats.messagesScanned.toLocaleString()}</div>
                    <div style={styles.statLabel}>Messages Scanned</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{stats.flaggedToday}</div>
                    <div style={styles.statLabel}>Flagged Today</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{stats.autoModActions}</div>
                    <div style={styles.statLabel}>Auto Actions</div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statValue}>{stats.accuracy}%</div>
                    <div style={styles.statLabel}>Accuracy</div>
                </div>
            </div>

            {/* Settings */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    ⚙️ Detection Settings
                </h2>

                <div style={styles.setting}>
                    <div style={styles.settingInfo}>
                        <div style={styles.settingLabel}>Spam Detection</div>
                        <div style={styles.settingDesc}>Detect repeated or mass messages</div>
                    </div>
                    <div
                        style={styles.switch(settings.spamDetection)}
                        onClick={() => setSettings({ ...settings, spamDetection: !settings.spamDetection })}
                    >
                        <div style={styles.switchKnob(settings.spamDetection)} />
                    </div>
                </div>

                <div style={styles.setting}>
                    <div style={styles.settingInfo}>
                        <div style={styles.settingLabel}>Profanity Filter</div>
                        <div style={styles.settingDesc}>Block offensive language</div>
                    </div>
                    <div
                        style={styles.switch(settings.profanityFilter)}
                        onClick={() => setSettings({ ...settings, profanityFilter: !settings.profanityFilter })}
                    >
                        <div style={styles.switchKnob(settings.profanityFilter)} />
                    </div>
                </div>

                <div style={styles.setting}>
                    <div style={styles.settingInfo}>
                        <div style={styles.settingLabel}>NSFW Detection</div>
                        <div style={styles.settingDesc}>Detect inappropriate images</div>
                    </div>
                    <div
                        style={styles.switch(settings.nsfwDetection)}
                        onClick={() => setSettings({ ...settings, nsfwDetection: !settings.nsfwDetection })}
                    >
                        <div style={styles.switchKnob(settings.nsfwDetection)} />
                    </div>
                </div>

                <div style={styles.setting}>
                    <div style={styles.settingInfo}>
                        <div style={styles.settingLabel}>
                            Toxicity Threshold: {settings.toxicityThreshold}%
                        </div>
                        <div style={styles.settingDesc}>Sensitivity level for toxic content</div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.toxicityThreshold}
                        onChange={(e) => setSettings({ ...settings, toxicityThreshold: parseInt(e.target.value) })}
                        style={styles.slider}
                    />
                </div>
            </div>

            {/* Recent Flags */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <FaExclamationTriangle />
                    Recent Flags ({recentFlags.length})
                </h2>

                {recentFlags.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.5)' }}>
                        <FaCheckCircle size={48} />
                        <p style={{ marginTop: '16px' }}>No recent violations detected</p>
                    </div>
                ) : (
                    <div style={styles.flagsList}>
                        {recentFlags.map((flag) => (
                            <div key={flag.id} style={styles.flagCard}>
                                <div style={styles.flagHeader}>
                                    <div>
                                        <span style={styles.flagType(flag.type)}>
                                            <FaExclamationTriangle />
                                            {flag.type.toUpperCase()}
                                        </span>
                                        <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
                                            {flag.user} • {flag.timestamp}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '18px', fontWeight: '700', color: flag.confidence > 80 ? '#da373c' : '#f0b732' }}>
                                        {flag.confidence}%
                                    </div>
                                </div>

                                <div style={styles.flagMessage}>
                                    {flag.message}
                                </div>

                                <div style={styles.flagActions}>
                                    <button
                                        onClick={() => handleAction(flag.id, 'delete')}
                                        style={styles.actionBtn('delete')}
                                    >
                                        <FaBan />
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleAction(flag.id, 'timeout')}
                                        style={styles.actionBtn('timeout')}
                                    >
                                        Timeout User
                                    </button>
                                    <button
                                        onClick={() => handleAction(flag.id, 'dismiss')}
                                        style={styles.actionBtn('dismiss')}
                                    >
                                        <FaEye />
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Save Button */}
            <button onClick={saveSettings} style={styles.saveBtn}>
                💾 Save Settings
            </button>
        </div>
    );
};

export default AIModerationPanel;



