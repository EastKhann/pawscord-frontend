/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';

import PropTypes from 'prop-types';

import './StickersPanel.css';

import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const StickersPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();

    const [stickers, setStickers] = useState([]);

    const [stickerPacks, setStickerPacks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('my-stickers');

    const [showUploadModal, setShowUploadModal] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [stickerName, setStickerName] = useState('');

    const [stickerFile, setStickerFile] = useState(null);

    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        // TODO: Backend not yet implemented — sticker API endpoints don't exist
        setLoading(false);
    }, [activeTab, serverId]);

    const fetchStickers = async () => {
        try {
            setLoading(true);

            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/stickers/${serverId}/list/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();

                setStickers(data.stickers || []);
            }
        } catch (error) {
            logger.error('Error fetching stickers:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStickerPacks = async () => {
        try {
            setLoading(true);

            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/stickers/packs/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();

                setStickerPacks(data.packs || []);
            }
        } catch (error) {
            logger.error('Error fetching sticker packs:', error);
        } finally {
            setLoading(false);
        }
    };

    const uploadSticker = async () => {
        if (!stickerName.trim() || !stickerFile) {
            logger.error(' Please provide sticker name and file');

            return;
        }

        const formData = new FormData();

        formData.append('name', stickerName);

        formData.append('sticker', stickerFile);

        try {
            setUploading(true);

            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/stickers/${serverId}/upload/`, {
                method: 'POST',

                headers: { Authorization: `Bearer ${token}` },

                body: formData,
            });

            if (response.ok) {
                setShowUploadModal(false);

                setStickerName('');

                setStickerFile(null);

                setPreviewUrl('');

                fetchStickers();
            } else {
                const data = await response.json();

                logger.error('', data.error || 'Failed to upload sticker');
            }
        } catch (error) {
            logger.error('Error uploading sticker:', error);
        } finally {
            setUploading(false);
        }
    };

    const deleteSticker = async (stickerId) => {
        if (!(await confirmDialog(t('stickers.deleteConfirm', 'Are you sure you want to delete this sticker?')))) return;

        try {
            const token = getToken();

            const response = await fetch(
                `${API_BASE_URL}/stickers/${serverId}/${stickerId}/delete/`,
                {
                    method: 'DELETE',

                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                setStickers(stickers.filter((s) => s.id !== stickerId));
            } else {
                logger.error(' Failed to delete sticker');
            }
        } catch (error) {
            logger.error('Error deleting sticker:', error);
        }
    };

    const installPack = async (packId) => {
        try {
            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/stickers/${serverId}/install-pack/`, {
                method: 'POST',

                headers: {
                    Authorization: `Bearer ${token}`,

                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ pack_id: packId }),
            });

            if (response.ok) {
                fetchStickerPacks();
            } else {
                logger.error(' Failed to install pack');
            }
        } catch (error) {
            logger.error('Error installing pack:', error);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            logger.error(' Please select an image file');

            return;
        }

        // Max 512KB for stickers

        if (file.size > 512 * 1024) {
            logger.error(' File size must be less than 512KB');

            return;
        }

        setStickerFile(file);

        setPreviewUrl(URL.createObjectURL(file));
    };

    return (
        <div
            className="stickers-panel-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="stickers-panel-modal"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="stickers-panel-header">
                    <h2>🎨 Stickers</h2>

                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="stickers-tabs">
                    <button
                        aria-label={t('stickers.myStickers', 'My stickers')}
                        className={`tab-btn ${activeTab === 'my-stickers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my-stickers')}
                    >
                        My Stickers
                    </button>

                    <button
                        aria-label={t('stickers.stickerPacks', 'Sticker packs')}
                        className={`tab-btn ${activeTab === 'packs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('packs')}
                    >
                        📦 Sticker Packs
                    </button>
                </div>

                <div className="stickers-panel-content">
                    {activeTab === 'my-stickers' && (
                        <>
                            <div className="sticker-actions">
                                <button
                                    aria-label={t('stickers.showUpload', 'Upload sticker')}
                                    className="upload-sticker-btn"
                                    onClick={() => setShowUploadModal(true)}
                                >
                                    ➕ Upload Sticker
                                </button>

                                <p className="sticker-count">{stickers.length} stickers</p>
                            </div>

                            {loading ? (
                                <div className="loading-spinner">{t('stickers.loading', 'Loading stickers...')}</div>
                            ) : stickers.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">🎨</div>

                                    <h3>{t('stickers.noStickers', 'No Stickers Yet')}</h3>

                                    <p>{t('stickers.uploadFirst', 'Upload your first custom sticker')}</p>
                                </div>
                            ) : (
                                <div className="stickers-grid">
                                    {stickers.map((sticker) => (
                                        <div key={sticker.id} className="sticker-card">
                                            <img
                                                src={sticker.url}
                                                alt={sticker.name}
                                                className="sticker-image"
                                            />

                                            <div className="sticker-name">{sticker.name}</div>

                                            <button
                                                aria-label={t('stickers.deleteSticker', 'Delete sticker')}
                                                className="delete-sticker-btn"
                                                onClick={() => deleteSticker(sticker.id)}
                                                title="Sil"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'packs' && (
                        <>
                            {loading ? (
                                <div className="loading-spinner">{t('stickers.loadingPacks', 'Loading packs...')}</div>
                            ) : stickerPacks.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">📦</div>

                                    <h3>{t('stickers.noPacks', 'No Packs Found')}</h3>

                                    <p>
                                        {t('stickers.checkBackLater', 'Check back later for new sticker packs')}
                                    </p>
                                </div>
                            ) : (
                                <div className="packs-grid">
                                    {stickerPacks.map((pack) => (
                                        <div key={pack.id} className="pack-card">
                                            <div className="pack-preview">
                                                {pack.preview_stickers
                                                    ?.slice(0, 4)
                                                    .map((sticker, idx) => (
                                                        <img
                                                            key={`item-${idx}`}
                                                            src={sticker.url}
                                                            alt=""
                                                            className="pack-preview-img"
                                                        />
                                                    ))}
                                            </div>

                                            <div className="pack-info">
                                                <h3>{pack.name}</h3>

                                                <p>{pack.sticker_count} stickers</p>
                                            </div>

                                            <button
                                                aria-label={pack.installed ? t('stickers.installed', 'Installed') : t('stickers.installPack', 'Install pack')}
                                                className={`install-pack-btn ${pack.installed ? 'installed' : ''}`}
                                                onClick={() =>
                                                    !pack.installed && installPack(pack.id)
                                                }
                                                disabled={pack.installed}
                                            >
                                                {pack.installed ? '✓ Installed' : '➕ Install'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Upload Modal */}

                {showUploadModal && (
                    <div
                        className="upload-modal-overlay"
                        role="button"
                        tabIndex={0}
                        onClick={() => setShowUploadModal(false)}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                        <div
                            className="upload-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-label={t('stickers.uploadModal', 'Upload sticker')}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3>➕ Upload Sticker</h3>

                            <div className="form-group">
                                <label>{t('stickers.name', 'Sticker Name')}</label>

                                <input
                                    type="text"
                                    value={stickerName}
                                    onChange={(e) => setStickerName(e.target.value)}
                                    placeholder={t('stickers.name', 'My Sticker')}
                                    maxLength={32}
                                    className="sticker-name-input"
                                    aria-label={t('stickers.nameInput', 'Sticker name')}
                                />
                            </div>

                            <div className="form-group">
                                <label>{t('stickers.image', 'Sticker Image')}</label>

                                <div
                                    className="file-upload-area"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => document.getElementById('sticker-file').click()}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt={t('alt.preview', 'Preview')}
                                            className="upload-preview"
                                        />
                                    ) : (
                                        <>
                                            <div className="upload-icon">📤</div>

                                            <p>{t('stickers.clickToSelect', 'Click to select an image')}</p>

                                            <p className="upload-hint">
                                                PNG, GIF • Max 512KB • 512x512px recommended
                                            </p>
                                        </>
                                    )}
                                </div>

                                <input
                                    id="sticker-file"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="display-none"
                                    aria-label={t('stickers.fileInput', 'Sticker image file')}
                                />
                            </div>

                            <div className="modal-actions">
                                <button
                                    aria-label={t('common.cancel', 'Cancel')}
                                    className="cancel-btn"
                                    onClick={() => setShowUploadModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    aria-label={t('stickers.uploadBtn', 'Upload sticker')}
                                    className="upload-btn"
                                    onClick={uploadSticker}
                                    disabled={uploading || !stickerName || !stickerFile}
                                >
                                    {uploading ? t('panels.uploading') : 'Upload'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

StickersPanel.propTypes = {
    serverId: PropTypes.string,

    onClose: PropTypes.func,
};

export default StickersPanel;
