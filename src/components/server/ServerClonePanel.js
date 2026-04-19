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
        setStatus('Klonlama işlemi başlatılıyor...');

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
                { progress: 20, status: 'Sunucu oluşturuluyor...' },
                { progress: 40, status: 'Kanallar yapılandırılıyor...' },
                { progress: 60, status: 'Roller ayarlanıyor...' },
                { progress: 80, status: 'Ayarlar uygulanıyor...' },
                { progress: 100, status: 'Tamamlandı!' },
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
                toast.error(data.error || 'Sunucu kopyalanamadı');
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
                    <div className="loading">Sunucu verisi yükleniyor...</div>
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
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {cloning ? (
                    <div className="cloning-progress">
                        <div className="progress-icon">
                            <FaSpinner className="spinning" />
                        </div>
                        <h3>Sunucu Klonlanıyor...</h3>
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
                                <h3>Yeni Sunucu Adı</h3>
                                <input
                                    type="text"
                                    value={newServerName}
                                    onChange={(e) => setNewServerName(e.target.value)}
                                    placeholder="Sunucu adını girin"
                                    maxLength={100}
                                    aria-label="New Server Name"
                                />
                            </div>

                            {/* Clone Options */}
                            <div className="section">
                                <h3>Neler Klonlanacak ({getSelectedCount()}/6)</h3>
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
                                            <span className="option-name">Kategoriler</span>
                                            <span className="option-count">
                                                {serverData?.categories?.length || 0} kategori
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
                                            <span className="option-name">Kanallar</span>
                                            <span className="option-count">
                                                {serverData?.channels?.length || 0} kanal
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
                                            <span className="option-name">Roller</span>
                                            <span className="option-count">
                                                {serverData?.roles?.length || 0} rol
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
                                            <span className="option-name">İzinler</span>
                                            <span className="option-count">
                                                Kanal izin aşımları
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
                                            <span className="option-name">Emojiler</span>
                                            <span className="option-count">
                                                {serverData?.emojis?.length || 0} emoji
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
                                                Sunucu konfigürasyonı
                                            </span>
                                        </div>
                                        {options.settings && <FaCheck className="check" />}
                                    </div>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="section">
                                <h3>Önİzleme</h3>
                                <div className="preview-card">
                                    <div className="preview-header">
                                        <div className="preview-icon">
                                            {newServerName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="preview-info">
                                            <span className="preview-name">
                                                {newServerName || 'Yeni Sunucu'}
                                            </span>
                                            <span className="preview-meta">
                                                <FaUsers /> 1 üye
                                            </span>
                                        </div>
                                    </div>
                                    <div className="preview-items">
                                        {options.categories && (
                                            <span className="preview-item">
                                                <FaFolder /> {serverData?.categories?.length}{' '}
                                                Kategori
                                            </span>
                                        )}
                                        {options.channels && (
                                            <span className="preview-item">
                                                <FaHashtag />{' '}
                                                {
                                                    serverData?.channels?.filter(
                                                        (c) => c.type === 'text'
                                                    ).length
                                                }{' '}
                                                Metin
                                            </span>
                                        )}
                                        {options.channels && (
                                            <span className="preview-item">
                                                <FaVolumeUp />{' '}
                                                {
                                                    serverData?.channels?.filter(
                                                        (c) => c.type === 'voice'
                                                    ).length
                                                }{' '}
                                                Ses
                                            </span>
                                        )}
                                        {options.roles && (
                                            <span className="preview-item">
                                                <FaShieldAlt /> {serverData?.roles?.length} Rol
                                            </span>
                                        )}
                                        {options.emojis && (
                                            <span className="preview-item">
                                                <FaSmile /> {serverData?.emojis?.length} Emoji
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Warning */}
                            <div className="warning-box">
                                <FaExclamationTriangle />
                                <div>
                                    <strong>Not:</strong> Üyeler, mesajlar ve mesaj geçmişi
                                    klonlanmayacak. Yalnızca sunucu yapısı ve ayarlar kopyalanacak.
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="panel-footer">
                            <button aria-label="on Close" className="cancel-btn" onClick={onClose}>
                                İptal
                            </button>
                            <button
                                aria-label="handle Clone"
                                className="clone-btn"
                                onClick={handleClone}
                                disabled={!newServerName.trim()}
                            >
                                <FaCopy /> Sunucuyu Klonla
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
