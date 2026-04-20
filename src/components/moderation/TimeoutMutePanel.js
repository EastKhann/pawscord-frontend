/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/TimeoutMutePanel.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaClock, FaVolumeUp } from 'react-icons/fa';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

/**
 * ⏰ Timeout/Mute Panel
 * Useryı geçici olarak susturma
 */

const TimeoutMutePanel = ({ fetchWithAuth, apiBaseUrl, roomSlug, userId, username, onClose }) => {
    const { t } = useTranslation();
    const [duration, setDuration] = useState('60');
    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState('');
    const [processing, setProcessing] = useState(false);

    const presetDurations = [
        { label: '1 Dakika', value: '1' },
        { label: '5 Dakika', value: '5' },
        { label: '10 Dakika', value: '10' },
        { label: '30 Dakika', value: '30' },
        { label: '1 Saat', value: '60' },
        { label: '6 Saat', value: '360' },
        { label: '12 Saat', value: '720' },
        { label: '24 Saat', value: '1440' },
        { label: t('ui.7_gun_2'), value: '10080' },
    ];

    const applyMute = async () => {
        if (!duration || parseInt(duration) <= 0) {
            toast.error(t('ui.gecerli_bir_sure_girin'));
            return;
        }

        try {
            setProcessing(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/mute/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room_slug: roomSlug,
                    user_id: userId,
                    duration_minutes: parseInt(duration),
                    reason,
                }),
            });

            if (response.ok) {
                toast.success(t('timeoutMute.muted', { user: username, duration }));
                onClose();
            } else {
                toast.error(t('ui.mute_failed'));
            }
        } catch (error) {
            logger.error(t('ui.mute_hatasi'), error);
            toast.error(t('common.error'));
        } finally {
            setProcessing(false);
        }
    };

    const removeMute = async () => {
        try {
            setProcessing(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/unmute/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room_slug: roomSlug,
                    user_id: userId,
                }),
            });

            if (response.ok) {
                toast.success(t('timeoutMute.unmuted', { user: username }));
                onClose();
            } else {
                toast.error(t('timeoutMute.operationFailed'));
            }
        } catch (error) {
            logger.error(t('ui.unmute_hatasi'), error);
            toast.error(t('common.error'));
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaClock className="icon-warning" />
                        <h2 className="m-0">Timeout - {username}</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    <div style={styles.presets}>
                        {presetDurations.map((preset) => (
                            <button
                                aria-label="Action button"
                                key={preset.value}
                                onClick={() => setDuration(preset.value)}
                                style={{
                                    ...styles.presetBtn,
                                    backgroundColor:
                                        duration === preset.value ? '#5865f2' : '#111214',
                                }}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Özel Duration (minute)</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="60"
                            style={styles.input}
                            min="1"
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Reason (opsiyonel)</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Spam, kural ihlali, vb."
                            style={styles.textarea}
                            rows={3}
                        />
                    </div>

                    <div style={styles.info}>
                        ⏰ Kullanıcı <strong>{duration} dakika</strong> boyunca mesaj gönderemeyecek
                    </div>
                </div>

                <div style={styles.footer}>
                    <button aria-label="remove Mute" onClick={removeMute} style={styles.unmuteBtn}>
                        <FaVolumeUp /> Unmute
                    </button>
                    <button
                        aria-label="apply Mute"
                        onClick={applyMute}
                        disabled={processing}
                        style={styles.muteBtn}
                    >
                        {processing ? 'Processing...' : 'Timeout Uygula'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    presets: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '20px',
    },
    presetBtn: {
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    field: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#dbdee1',
        fontSize: '14px',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        resize: 'vertical',
    },
    info: {
        backgroundColor: '#5865f21a',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        padding: '15px',
        color: '#5865f2',
        fontSize: '14px',
        textAlign: 'center',
    },
    footer: {
        display: 'flex',
        gap: '10px',
        padding: '20px',
        borderTop: '1px solid #333',
    },
    unmuteBtn: {
        flex: 1,
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
    },
    muteBtn: {
        flex: 1,
        backgroundColor: '#f0b232',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
    },
};

TimeoutMutePanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    roomSlug: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    onClose: PropTypes.func,
};
export default TimeoutMutePanel;
