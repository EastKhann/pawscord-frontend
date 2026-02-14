import { useState, useEffect, useCallback } from 'react';
import { getApiBase } from '../../../utils/apiEndpoints';
import toast from '../../../utils/toast';
import { SENSITIVITY_PRESETS } from '../constants';

const DEFAULT_STATS = {
    totalDetected: 0,
    todayDetected: 0,
    actionsTaken: { warn: 0, mute: 0, kick: 0, ban: 0 },
    topOffenders: [],
    recentDetections: []
};

const useSpamDetection = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [settings, setSettings] = useState({
        enabled: true,
        sensitivity: 'medium',
        actions: { warn: true, mute: true, kick: false, ban: false },
        patterns: {
            rapidMessages: true, duplicateContent: true, mentionSpam: true,
            linkSpam: true, capsLock: true, zalgoText: true
        },
        thresholds: SENSITIVITY_PRESETS.medium,
        whitelist: [],
        customPatterns: []
    });

    const [stats, setStats] = useState(DEFAULT_STATS);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

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

        try {
            const statsResponse = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/spam-stats/`);
            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                setStats(prev => ({ ...prev, ...statsData }));
            } else {
                setStats(DEFAULT_STATS);
            }
        } catch (err) {
            console.error('Failed to fetch spam stats:', err);
            setStats(DEFAULT_STATS);
        }

        setLoading(false);
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    useEffect(() => { fetchSettings(); }, [fetchSettings]);

    const handleSensitivityChange = (level) => {
        setSettings(prev => ({ ...prev, sensitivity: level, thresholds: SENSITIVITY_PRESETS[level] }));
    };

    const handlePatternToggle = (pattern) => {
        setSettings(prev => ({ ...prev, patterns: { ...prev.patterns, [pattern]: !prev.patterns[pattern] } }));
    };

    const handleActionToggle = (action) => {
        setSettings(prev => ({ ...prev, actions: { ...prev.actions, [action]: !prev.actions[action] } }));
    };

    const toggleEnabled = () => {
        setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
    };

    const saveSettings = async () => {
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/spam-settings/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (response.ok) toast.success('Spam koruma ayarları kaydedildi! ✅');
            else toast.error('Ayarlar kaydedilemedi');
        } catch (err) {
            console.error('Failed to save settings:', err);
            toast.error('Bir hata oluştu');
        }
    };

    return {
        settings, stats, loading, activeTab, setActiveTab,
        handleSensitivityChange, handlePatternToggle, handleActionToggle,
        toggleEnabled, saveSettings
    };
};

export default useSpamDetection;
