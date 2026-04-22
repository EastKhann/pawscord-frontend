/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { getToken } from '../../utils/tokenStorage';

import PropTypes from 'prop-types';

import './Soundboard.css';

import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';

import useModalA11y from '../../hooks/useModalA11y';

import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const Soundboard = ({ serverId, onClose }) => {
    const { t } = useTranslation();

    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: true,
        label: 'Soundboard',
    });

    const [sounds, setSounds] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showUploadModal, setShowUploadModal] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [soundName, setSoundName] = useState('');

    const [soundFile, setSoundFile] = useState(null);

    const [volume, setVolume] = useState(0.7);

    const [searchQuery, setSearchQuery] = useState('');

    const audioRef = useRef(null);

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);

    const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), []);

    const handleVolumeChange = useCallback((e) => setVolume(parseFloat(e.target.value)), []);

    const handleShowUpload = useCallback(() => setShowUploadModal(true), []);

    const handleHideUpload = useCallback(() => setShowUploadModal(false), []);

    const handleSoundNameChange = useCallback((e) => setSoundName(e.target.value), []);

    const handleFileAreaClick = useCallback(
        () => document.getElementById('sound-file').click(),
        []
    );

    useEffect(() => {
        // TODO: Backend not yet implemented — soundboard API endpoints don't exist
        setLoading(false);
    }, [serverId]);

    const fetchSounds = async () => {
        try {
            setLoading(true);

            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/soundboard/${serverId}/list/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();

                setSounds(data.sounds || []);
            }
        } catch (error) {
            logger.error('Error fetching sounds:', error);
        } finally {
            setLoading(false);
        }
    };

    const playSound = async (soundId, soundUrl) => {
        try {
            // Play locally

            if (audioRef.current) {
                audioRef.current.pause();

                audioRef.current.src = soundUrl;

                audioRef.current.volume = volume;

                audioRef.current.play();
            }

            // Send to server to broadcast

            const token = getToken();

            await fetch(`${API_BASE_URL}/soundboard/${serverId}/${soundId}/play/`, {
                method: 'POST',

                headers: {
                    Authorization: `Bearer ${token}`,

                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ volume }),
            });
        } catch (error) {
            logger.error('Error playing sound:', error);
        }
    };

    const uploadSound = async () => {
        if (!soundName.trim() || !soundFile) {
            logger.error(' Please provide sound name and file');

            return;
        }

        const formData = new FormData();

        formData.append('name', soundName);

        formData.append('sound', soundFile);

        try {
            setUploading(true);

            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/soundboard/${serverId}/upload/`, {
                method: 'POST',

                headers: { Authorization: `Bearer ${token}` },

                body: formData,
            });

            if (response.ok) {
                setShowUploadModal(false);

                setSoundName('');

                setSoundFile(null);

                fetchSounds();
            } else {
                const data = await response.json();

                logger.error('', data.error || 'Failed to upload sound');
            }
        } catch (error) {
            logger.error('Error uploading sound:', error);
        } finally {
            setUploading(false);
        }
    };

    const deleteSound = async (soundId) => {
        if (!(await confirmDialog(t('soundboard.deleteConfirm', 'Are you sure you want to delete this sound?')))) return;

        try {
            const token = getToken();

            const response = await fetch(
                `${API_BASE_URL}/soundboard/${serverId}/${soundId}/delete/`,
                {
                    method: 'DELETE',

                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                setSounds(sounds.filter((s) => s.id !== soundId));
            } else {
                logger.error(' Failed to delete sound');
            }
        } catch (error) {
            logger.error('Error deleting sound:', error);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('audio/')) {
            logger.error(' Please select an audio file');

            return;
        }

        // Max 1MB

        if (file.size > 1024 * 1024) {
            logger.error(' File size must be less than 1MB');

            return;
        }

        setSoundFile(file);
    };

    const filteredSounds = sounds.filter((sound) =>
        sound.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="soundboard-overlay" {...overlayProps}>
            <div className="soundboard-modal" {...dialogProps}>
                <div className="soundboard-header">
                    <h2>🔊 Soundboard</h2>

                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="soundboard-content">
                    {/* Controls */}

                    <div className="soundboard-controls">
                        <div className="search-box">
                            <span className="search-icon"></span>

                            <input
                                type="text"
                                placeholder={t('soundboard.searchPlaceholder', 'Search sounds...')}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="search-input"
                                aria-label={t('soundboard.search', 'Search sounds')}
                            />
                        </div>

                        <div className="volume-control">
                            <span className="volume-icon">🔊</span>

                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                                aria-label={t('music.progressBar', 'Volume')}
                            />

                            <span className="volume-value">{Math.round(volume * 100)}%</span>
                        </div>

                        <button
                            aria-label={t('soundboard.uploadBtn', 'Upload sound')}
                            className="upload-sound-btn"
                            onClick={handleShowUpload}
                        >
                            ➕ {t('common.upload', 'Upload')}
                        </button>
                    </div>

                    {/* Sounds Grid */}

                    {loading ? (
                        <div className="loading-spinner">{t('soundboard.loading', 'Loading sounds...')}</div>
                    ) : filteredSounds.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🔊</div>

                            <h3>{searchQuery ? t('soundboard.notFound', 'Sound Not Found') : t('soundboard.noSounds', 'No Sounds Yet')}</h3>

                            <p>
                                {searchQuery
                                    ? 'Try a different search term'
                                    : 'Upload your first sound effect'}
                            </p>
                        </div>
                    ) : (
                        <div className="sounds-grid">
                            {filteredSounds.map((sound) => (
                                <div key={sound.id} className="sound-card">
                                    <button
                                        aria-label={t('soundboard.playSound', 'Play {{name}}', { name: sound.name })}
                                    >
                                        ▶▶
                                    </button>

                                    <div className="sound-info">
                                        <div className="sound-name">{sound.name}</div>

                                        <div className="sound-meta">
                                            <span className="sound-duration">
                                                {sound.duration || '0:00'}
                                            </span>

                                            <span className="sound-plays">
                                                🔥 {sound.play_count || 0}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        aria-label={t('soundboard.deleteSound', 'Delete {{name}}', { name: sound.name })}
                                        className="delete-sound-btn"
                                        onClick={() => deleteSound(sound.id)}
                                        title={t('common.delete', 'Delete')}
                                    >
                                        🗑
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Hidden audio element for playback */}

                <audio ref={audioRef} />

                {/* Upload Modal */}

                {showUploadModal && (
                    <div
                        className="upload-modal-overlay"
                        role="button"
                        tabIndex={0}
                        onClick={handleHideUpload}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                        <div
                            className="upload-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-label={t('soundboard.uploadTitle', 'Upload Sound')}
                            onClick={handleStopPropagation}
                        >
                            <h3>➕ Upload Sound</h3>

                            <div className="form-group">
                                <label>{t('soundboard.soundName', 'Sound Name')}</label>

                                <input
                                    type="text"
                                    value={soundName}
                                    onChange={handleSoundNameChange}
                                    placeholder={t('soundboard.namePlaceholder', 'e.g. Airhorn')}
                                    maxLength={32}
                                    className="sound-name-input"
                                    aria-label={t('soundboard.soundName', 'Sound Name')}
                                />
                            </div>

                            <div className="form-group">
                                <label>{t('soundboard.soundFile', 'Sound File')}</label>

                                <div
                                    className="file-upload-area"
                                    role="button"
                                    tabIndex={0}
                                    onClick={handleFileAreaClick}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    {soundFile ? (
                                        <div className="file-selected">
                                            <div className="file-icon">🎵</div>

                                            <p>{soundFile.name}</p>

                                            <p className="file-size">
                                                {(soundFile.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="upload-icon">📤</div>

                                            <p>{t('soundboard.clickToSelect', 'Click to select a sound file')}</p>

                                            <p className="upload-hint">
                                                MP3, WAV, OGG • Max 1MB • 5 seconds recommended
                                            </p>
                                        </>
                                    )}
                                </div>

                                <input
                                    id="sound-file"
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleFileSelect}
                                    className="display-none"
                                    aria-label={t('soundboard.fileInput', 'Sound file input')}
                                />
                            </div>

                            <div className="modal-actions">
                                <button
                                    aria-label={t('common.cancel', 'Cancel')}
                                    className="cancel-btn"
                                    onClick={handleHideUpload}
                                >
                                    {t('common.cancel', 'Cancel')}
                                </button>

                                <button
                                    aria-label={t('soundboard.uploadBtn', 'Upload sound')}
                                    className="upload-btn"
                                    onClick={uploadSound}
                                    disabled={uploading || !soundName || !soundFile}
                                >
                                    {uploading ? t('panels.uploading') : t('common.upload', 'Upload')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

Soundboard.propTypes = {
    serverId: PropTypes.string,

    onClose: PropTypes.func,
};

export default memo(Soundboard);
