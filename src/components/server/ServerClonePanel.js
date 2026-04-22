import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import {
    FaCopy,
    FaTimes,
    FaServer,
    FaCheck,
    FaHashtag,
    FaVolumeUp,
    FaShieldAlt,
    FaSmile,
    FaImage,
    FaCog,
    FaUsers,
    FaFolder,
    FaExclamationTriangle,
    FaSpinner,
    FaDownload,
    FaUpload,
} from 'react-icons/fa';
const _s = (o) => o;
import { getApiBase } from '../../utils/apiEndpoints';
import './ServerClonePanel.css';
import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const ServerClonePanel = ({ serverId, serverName, onClose, onClone }) => {
    const { t } = useTranslation();
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
        categories: true,
    });
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const token = getToken();

    useEffect(() => {
        loadServerData();
    }, [serverId]);

    const loadServerData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${getApiBase()}/api/servers/${serverId}/clone-data/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setServerData(data);
                setNewServerName(`${data.name || serverName} (Copy)`);
            } else {
                setServerData({
                    id: serverId,
                    name: serverName,
                    channels: [],
                    categories: [],
                    roles: [],
                    emojis: [],
                    settings: {},
                });
                setNewServerName(`${serverName} (Copy)`);
            }
        } catch (error) {
            logger.error('Error loading server data:', error);
            setServerData({
                id: serverId,
                name: serverName,
                channels: [],
                categories: [],
                roles: [],
                emojis: [],
                settings: {},
            });
            setNewServerName(`${serverName} (Copy)`);
        }
        setLoading(false);
    };

    const handleOptionToggle = (option) => {
        setOptions((prev) => ({
            ...prev,
            [option]: !prev[option],
        }));
    };

    const handleClone = async () => {
        if (!newServerName.trim()) return;

        setCloning(true);
        setProgress(0);
        setStatus(t('server.cloneStarting', 'Starting clone operation...'));

        try {
            const response = await fetch(`${getApiBase()}/api/servers/${serverId}/clone/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newServerName,
                    options: options,
                }),
            });

            // Simulate progress for UX
            const steps = [
                { progress: 20, status: t('server.cloneCreating', 'Creating server...') },
                { progress: 40, status: t('server.cloneConfigChannels', 'Configuring channels...') },
                { progress: 60, status: t('server.cloneSetupRoles', 'Setting up roles...') },
                { progress: 80, status: t('server.cloneApplySettings', 'Applying settings...') },
                { progress: 100, status: t('server.cloneComplete', 'Complete!') },
            ];

            for (const step of steps) {
                await new Promise((resolve) => setTimeout(resolve, 300));
                setProgress(step.progress);
                setStatus(step.status);
            }

            if (response.ok) {
                const data = await response.json();
                toast.success(t('serverClone.created'));
                if (onClone)
                    onClone({ name: newServerName, ...options, newServerId: data.server_id });
            } else {
                const data = await response.json();
                toast.error(data.error || t('server.cloneFailed', 'Server could not be cloned'));
            }
        } catch (error) {
            logger.error('Error cloning server:', error);
            toast.error(t('server.cloneFailed'));
        }
        onClose();
    };

    const getSelectedCount = () => {
        return Object.values(options).filter(Boolean).length;
    };

    if (loading) {
        return (
            <div
                className="serverclone-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="serverclone-panel"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="loading">{t('server.cloneLoading', 'Loading server data...')}</div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="serverclone-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="serverclone-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaCopy /> Sunucuyu Klonla
                        </h2>
                        <span className="source-server">
                            <FaServer /> {serverData?.name}
                        </span>
                    </div>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {cloning ? (
                    <div className="cloning-progress">
                        <div className="progress-icon">
                            <FaSpinner className="spinning" />
                        </div>
                        <h3>{t('server.cloningTitle', 'Cloning Server...')}</h3>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={_s({ width: `${progress}%` })}
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
                                <h3>{t('server.newServerName', 'New Server Name')}</h3>
                                <input
                                    type="text"
                                    value={newServerName}
                                    onChange={(e) => setNewServerName(e.target.value)}
                                    placeholder={t('server.enterName', 'Enter server name')}
                                    maxLength={100}
                                    aria-label={t('server.newServerName', 'New Server Name')}
                                />
                            </div>

                            {/* Clone Options */}
                            <div className="section">
                                <h3>{t('server.cloneWhatToClone', 'What Will Be Cloned ({{count}}/6)', { count: getSelectedCount() })}</h3>
                                <div className="options-grid">
                                    <div
                                        className={`option-card ${options.categories ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleOptionToggle('categories')}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="option-icon">
                                            <FaFolder />
                                        </div>
                                        <div className="option-info">
                                            <span className="option-name">{t('server.categories', 'Categories')}</span>
                                            <span className="option-count">
                                                {serverData?.categories?.length || 0} {t('server.categoryLabel', 'Category')}
                                            </span>
                                        </div>
                                        {options.categories && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.channels ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleOptionToggle('channels')}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="option-icon">
                                            <FaHashtag />
                                        </div>
                                        <div className="option-info">
                                            <span className="option-name">{t('server.channels', 'Channels')}</span>
                                            <span className="option-count">
                                                {serverData?.channels?.length || 0} {t('server.channelName', 'Channel')}
                                            </span>
                                        </div>
                                        {options.channels && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.roles ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleOptionToggle('roles')}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="option-icon">
                                            <FaShieldAlt />
                                        </div>
                                        <div className="option-info">
                                            <span className="option-name">{t('server.roles', 'Roles')}</span>
                                            <span className="option-count">
                                                {serverData?.roles?.length || 0} {t('server.rolesLabel', 'Role')}
                                            </span>
                                        </div>
                                        {options.roles && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.permissions ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleOptionToggle('permissions')}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="option-icon">
                                            <FaCog />
                                        </div>
                                        <div className="option-info">
                                            <span className="option-name">{t('server.permissions', 'Permissions')}</span>
                                            <span className="option-count">
                                                {t('server.channelPermissionOverrides', 'Channel permission overrides')}
                                            </span>
                                        </div>
                                        {options.permissions && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.emojis ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleOptionToggle('emojis')}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="option-icon">
                                            <FaSmile />
                                        </div>
                                        <div className="option-info">
                                            <span className="option-name">{t('server.emojis', 'Emojis')}</span>
                                            <span className="option-count">
                                                {serverData?.emojis?.length || 0} {t('server.emojiLabel', 'Emoji')}
                                            </span>
                                        </div>
                                        {options.emojis && <FaCheck className="check" />}
                                    </div>

                                    <div
                                        className={`option-card ${options.settings ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleOptionToggle('settings')}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="option-icon">
                                            <FaCog />
                                        </div>
                                        <div className="option-info">
                                            <span className="option-name">
                                                {t('common.settings')}
                                            </span>
                                            <span className="option-count">
                                                {t('server.serverConfig', 'Server configuration')}
                                            </span>
                                        </div>
                                        {options.settings && <FaCheck className="check" />}
                                    </div>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="section">
                                <h3>{t('server.preview', 'Preview')}</h3>
                                <div className="preview-card">
                                    <div className="preview-header">
                                        <div className="preview-icon">
                                            {newServerName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="preview-info">
                                            <span className="preview-name">
                                                {newServerName || t('server.newServerPlaceholder', 'New Server')}
                                            </span>
                                            <span className="preview-meta">
                                                <FaUsers /> {t('server.oneMember', '1 member')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="preview-items">
                                        {options.categories && (
                                            <span className="preview-item">
                                                <FaFolder /> {serverData?.categories?.length}{' '}
                                                {t('server.categoryLabel', 'Category')}
                                            </span>
                                        )}
                                        {options.channels && (
                                            <span className="preview-item">
                                                <FaHashtag />{' '}
                                                {serverData?.channels?.filter((c) => c.type === 'text').length}{' '}
                                                {t('server.textCount', 'Text')}
                                            </span>
                                        )}
                                        {options.channels && (
                                            <span className="preview-item">
                                                <FaVolumeUp />{' '}
                                                {serverData?.channels?.filter((c) => c.type === 'voice').length}{' '}
                                                {t('server.voiceCount', 'Voice')}
                                            </span>
                                        )}
                                        {options.roles && (
                                            <span className="preview-item">
                                                <FaShieldAlt /> {serverData?.roles?.length} {t('server.rolesLabel', 'Role')}
                                            </span>
                                        )}
                                        {options.emojis && (
                                            <span className="preview-item">
                                                <FaSmile /> {serverData?.emojis?.length} {t('server.emojiLabel', 'Emoji')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Warning */}
                            <div className="warning-box">
                                <FaExclamationTriangle />
                                <div>
                                    <strong>{t('common.note', 'Note:')}</strong> {t('server.cloneWarning', 'Members, messages and message history will not be cloned. Only server structure and settings will be copied.')}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="panel-footer">
                            <button aria-label={t('common.close', 'Close')} className="cancel-btn" onClick={onClose}>
                                {t('server.cloneCancel', 'Cancel')}
                            </button>
                            <button
                                aria-label={t('server.cloneButton', 'Clone Server')}
                                className="clone-btn"
                                onClick={handleClone}
                                disabled={!newServerName.trim()}
                            >
                                <FaCopy /> {t('server.cloneButton', 'Clone Server')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

ServerClonePanel.propTypes = {
    serverId: PropTypes.string,
    serverName: PropTypes.string,
    onClose: PropTypes.func,
    onClone: PropTypes.func,
};
export default ServerClonePanel;
