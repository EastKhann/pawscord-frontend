import React, { useState, useEffect } from 'react';
import { securityApi } from '../services/niceToHaveApi';
import './SecurityActivityPanel.css';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';

const ACTIVITY_ICONS = {
    login: '🔓',
    logout: '🔒',
    password_change: '🔑',
    email_change: '📧',
    two_factor_enabled: '🛡️',
    two_factor_disabled: '⚠️',
    new_device: '📱',
    suspicious_login: '🚨',
};

function SecurityActivityPanel({ onClose }) {
    const [activities, setActivities] = useState([]);
    const [devices, setDevices] = useState([]);
    const [activeTab, setActiveTab] = useState('activity');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [activityData, devicesData] = await Promise.all([
                securityApi.getActivityLog(),
                securityApi.getTrustedDevices()
            ]);
            setActivities(activityData.activities || []);
            setDevices(devicesData.devices || []);
        } catch (err) {
            console.error('Failed to load security data:', err);
        }
        setLoading(false);
    };

    const handleRemoveDevice = async (deviceId) => {
        if (!await confirmDialog('Remove this device? They will need to log in again.')) return;

        try {
            await securityApi.removeDevice(deviceId);
            setDevices(devices.filter(d => d.id !== deviceId));
        } catch (err) {
            toast.error('Failed to remove device');
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const getDeviceIcon = (type) => {
        switch (type) {
            case 'desktop': return '💻';
            case 'mobile': return '📱';
            case 'tablet': return '📱';
            default: return '🖥️';
        }
    };

    if (loading) {
        return (
            <div className="security-activity-panel">
                <h2>🛡️ Security Activity</h2>
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="security-activity-panel">
            <h2>🛡️ Security Activity</h2>

            <div className="security-tabs">
                <button
                    className={activeTab === 'activity' ? 'active' : ''}
                    onClick={() => setActiveTab('activity')}
                >
                    Activity Log
                </button>
                <button
                    className={activeTab === 'devices' ? 'active' : ''}
                    onClick={() => setActiveTab('devices')}
                >
                    Trusted Devices ({devices.length})
                </button>
            </div>

            {activeTab === 'activity' && (
                <div className="activity-list">
                    {activities.length === 0 ? (
                        <div className="empty-state">
                            <span className="emoji">📋</span>
                            <p>No recent activity</p>
                        </div>
                    ) : (
                        activities.map(activity => (
                            <div
                                key={activity.id}
                                className={`activity-item ${activity.is_suspicious ? 'suspicious' : ''}`}
                            >
                                <div className="activity-icon">
                                    {ACTIVITY_ICONS[activity.activity_type] || '📝'}
                                </div>
                                <div className="activity-info">
                                    <div className="activity-type">
                                        {activity.activity_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                    </div>
                                    <div className="activity-details">
                                        {activity.ip_address && <span>IP: {activity.ip_address}</span>}
                                        {activity.location && <span>📍 {activity.location}</span>}
                                    </div>
                                    {activity.device_info && (
                                        <div className="activity-device">{activity.device_info}</div>
                                    )}
                                </div>
                                <div className="activity-time">{formatDate(activity.created_at)}</div>
                                {activity.is_suspicious && (
                                    <span className="suspicious-badge">⚠️ Suspicious</span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'devices' && (
                <div className="devices-list">
                    {devices.length === 0 ? (
                        <div className="empty-state">
                            <span className="emoji">📱</span>
                            <p>No trusted devices</p>
                        </div>
                    ) : (
                        devices.map(device => (
                            <div key={device.id} className={`device-item ${device.is_current ? 'current' : ''}`}>
                                <div className="device-icon">{getDeviceIcon(device.device_type)}</div>
                                <div className="device-info">
                                    <div className="device-name">
                                        {device.device_name || 'Unknown Device'}
                                        {device.is_current && <span className="current-badge">This device</span>}
                                    </div>
                                    <div className="device-details">
                                        <span>{device.browser}</span>
                                        <span>{device.os}</span>
                                    </div>
                                    {device.last_location && (
                                        <div className="device-location">📍 {device.last_location}</div>
                                    )}
                                    <div className="device-last-used">Last used: {formatDate(device.last_used)}</div>
                                </div>
                                {!device.is_current && (
                                    <button
                                        className="remove-device-btn"
                                        onClick={() => handleRemoveDevice(device.id)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SecurityActivityPanel;
