import React, { useState, useEffect } from 'react';
import {
    FaCopy, FaTimes, FaServer, FaCheck, FaHashtag, FaVolumeUp,
    FaShieldAlt, FaSmile, FaImage, FaCog, FaUsers, FaFolder,
    FaExclamationTriangle, FaSpinner, FaDownload, FaUpload
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './ServerClonePanel.css';
import toast from '../utils/toast';

const ServerClonePanel = ({ serverId, serverName, onClose, onClone }) => {
    const [loading, setLoading] = useState(true);
    const [cloning, setCloning] = useState(false);
    const [serverData, setServerData] = useState(null);
    const [newServerName, setNewServerName] = useState('');
    const [options, setOptions] = useState({
        channels: true,
        roles: true,
        emojis: true,
        settings: true,
        permissions: true,
        categories: true
    });
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        loadServerData();
    }, [serverId]);

    const loadServerData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${getApiBase()}/api/servers/${serverId}/clone-data/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setServerData(data);
                setNewServerName(`${data.name || serverName} (Copy)`);
            } else {
                setServerData({ id: serverId, name: serverName, channels: [], categories: [], roles: [], emojis: [], settings: {} });
                setNewServerName(`${serverName} (Copy)`);
            }
        } catch (error) {
            console.error('Error loading server data:', error);
            setServerData({ id: serverId, name: serverName, channels: [], categories: [], roles: [], emojis: [], settings: {} });
            setNewServerName(`${serverName} (Copy)`);
        }
        setLoading(false);
    };

    const handleOptionToggle = (option) => {
        setOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const handleClone = async () => {
        if (!newServerName.trim()) return;

        setCloning(true);
        setProgress(0);
        setStatus('Starting clone process...');

        try {
            const response = await fetch(`${getApiBase()}/api/servers/${serverId}/clone/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newServerName,
                    options: options
                })
            });

            // Simulate progress for UX
            const steps = [
                { progress: 20, status: 'Creating server...' },
                { progress: 40, status: 'Setting up channels...' },
                { progress: 60, status: 'Configuring roles...' },
                { progress: 80, status: 'Applying settings...' },
                { progress: 100, status: 'Complete!' }
            ];

            for (const step of steps) {
                await new Promise(resolve => setTimeout(resolve, 300));
                setProgress(step.progress);
                setStatus(step.status);
            }

            if (response.ok) {
                const data = await response.json();
                toast.success(`Server "${newServerName}" created successfully!`);
                if (onClone) onClone({ name: newServerName, ...options, newServerId: data.server_id });
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to clone server');
            }
        } catch (error) {
            console.error('Error cloning server:', error);
            toast.error('Failed to clone server');
        }
        onClose();
    };

    const getSelectedCount = () => {
        return Object.values(options).filter(Boolean).length;
    };

    if (loading) {
        return (
            <div className="serverclone-overlay" onClick={onClose}>
                <div className="serverclone-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading server data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="serverclone-overlay" onClick={onClose}>
            <div className="serverclone-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaCopy /> Clone Server</h2>
                        <span className="source-server">
                            <FaServer /> {serverData?.name}
                        </span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {cloning ? (
                    <div className="cloning-progress">
                        <div className="progress-icon">
                            <FaSpinner className="spinning" />
                        </div>
                        <h3>Cloning Server...</h3>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="progress-status">{status}</span>
                        <span className="progress-percent">{progress}%</span>
                    </div>
                ) : (
                    <>
                        <div className="content">
                            {/* New Server Name */}
                            <div className="section">
                                <h3>New Server Name</h3>
                                <input
                                    type="text"
                                    value={newServerName}
                                    onChange={(e) => setNewServerName(e.target.value)}
                                    placeholder="Enter server name"
                                    maxLength={100}
                                />
                            </div>

                            {/* Clone Options */}
                            <div className="section">
                                <h3>What to Clone ({getSelectedCount()}/6)</h3>
                                <div className="options-grid">
                                    <div
                                        className={`option-card ${options.categories ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('categories')}
                                    >
                                        <div className="option-icon"><FaFolder /></div>
                                        <div className="option-info">
                                            <span className="option-name">Categories</span>
                                            <span className="option-count">
                                                {serverData?.categories?.length || 0} categories
                                            </span>
                                        </div>
                                        {options.categories && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.channels ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('channels')}
                                    >
                                        <div className="option-icon">
                                            <FaHashtag />
                                        </div>
                                        <div className="option-info">
                                            <span className="option-name">Channels</span>
                                            <span className="option-count">
                                                {serverData?.channels?.length || 0} channels
                                            </span>
                                        </div>
                                        {options.channels && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.roles ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('roles')}
                                    >
                                        <div className="option-icon"><FaShieldAlt /></div>
                                        <div className="option-info">
                                            <span className="option-name">Roles</span>
                                            <span className="option-count">
                                                {serverData?.roles?.length || 0} roles
                                            </span>
                                        </div>
                                        {options.roles && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.permissions ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('permissions')}
                                    >
                                        <div className="option-icon"><FaCog /></div>
                                        <div className="option-info">
                                            <span className="option-name">Permissions</span>
                                            <span className="option-count">Channel overrides</span>
                                        </div>
                                        {options.permissions && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.emojis ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('emojis')}
                                    >
                                        <div className="option-icon"><FaSmile /></div>
                                        <div className="option-info">
                                            <span className="option-name">Emojis</span>
                                            <span className="option-count">
                                                {serverData?.emojis?.length || 0} emojis
                                            </span>
                                        </div>
                                        {options.emojis && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.settings ? 'selected' : ''}`}
                                        onClick={() => handleOptionToggle('settings')}
                                    >
                                        <div className="option-icon"><FaCog /></div>
                                        <div className="option-info">
                                            <span className="option-name">Settings</span>
                                            <span className="option-count">Server config</span>
                                        </div>
                                        {options.settings && <FaCheck className="check" />}
                                    </div>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="section">
                                <h3>Preview</h3>
                                <div className="preview-card">
                                    <div className="preview-header">
                                        <div className="preview-icon">
                                            {newServerName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="preview-info">
                                            <span className="preview-name">{newServerName || 'New Server'}</span>
                                            <span className="preview-meta">
                                                <FaUsers /> 1 member
                                            </span>
                                        </div>
                                    </div>
                                    <div className="preview-items">
                                        {options.categories && (
                                            <span className="preview-item">
                                                <FaFolder /> {serverData?.categories?.length} Categories
                                            </span>
                                        )}
                                        {options.channels && (
                                            <span className="preview-item">
                                                <FaHashtag /> {serverData?.channels?.filter(c => c.type === 'text').length} Text
                                            </span>
                                        )}
                                        {options.channels && (
                                            <span className="preview-item">
                                                <FaVolumeUp /> {serverData?.channels?.filter(c => c.type === 'voice').length} Voice
                                            </span>
                                        )}
                                        {options.roles && (
                                            <span className="preview-item">
                                                <FaShieldAlt /> {serverData?.roles?.length} Roles
                                            </span>
                                        )}
                                        {options.emojis && (
                                            <span className="preview-item">
                                                <FaSmile /> {serverData?.emojis?.length} Emojis
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Warning */}
                            <div className="warning-box">
                                <FaExclamationTriangle />
                                <div>
                                    <strong>Note:</strong> Members, messages, and message history will not be cloned.
                                    Only server structure and settings will be copied.
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="panel-footer">
                            <button className="cancel-btn" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                className="clone-btn"
                                onClick={handleClone}
                                disabled={!newServerName.trim()}
                            >
                                <FaCopy /> Clone Server
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ServerClonePanel;
