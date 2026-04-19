import { useState, useEffect, useCallback, memo } from 'react';

import PropTypes from 'prop-types';

import {
    FaVolumeUp,
    FaVolumeMute,
    FaEdit,
    FaImage,
    FaLock,
    FaGlobe,
    FaComments,
    FaFileAlt,
    FaTrash,
} from 'react-icons/fa';

import toast from '../../utils/toast';

import confirmDialog from '../../utils/confirmDialog';

import styles from './styles';

import { useTranslation } from 'react-i18next';

import css from './ServerTabs.module.css';

import logger from '../../utils/logger';

const S = {
    txt: { margin: '10px 0', color: '#dbdee1' },

    bg3: {
        padding: '10px 14px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '8px',
        color: '#dbdee1',
        fontSize: '14px',
        outline: 'none',
        width: '220px',
        cursor: 'pointer',
    },

    bg2: {
        flex: 1,
        padding: '10px 14px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '8px',
        color: '#dbdee1',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        minHeight: '60px',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s',
    },

    col: { ...styles.settingBox, flexDirection: 'column', alignItems: 'stretch' },

    bg: {
        padding: '10px 14px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '8px',
        color: '#dbdee1',
        fontSize: '14px',
        outline: 'none',
        width: '220px',
        transition: 'border-color 0.2s',
    },
};

const ManagementTab = memo(
    ({ server, isOwner, fetchWithAuth, apiBaseUrl, onRefreshServers, onClose }) => {
        const { t } = useTranslation();

        const [isMuted, setIsMuted] = useState(false);

        const [deleteConfirmation, setDeleteConfirmation] = useState('');

        const [showDeleteModal, setShowDeleteModal] = useState(false);

        const [serverName, setServerName] = useState(server.name || '');

        const [isRenamingServer, setIsRenamingServer] = useState(false);

        const [serverDescription, setServerDescription] = useState(server.description || '');

        const [isSavingDescription, setIsSavingDescription] = useState(false);

        const [defaultChannelSlug, setDefaultChannelSlug] = useState(
            server.metadata?.default_channel_slug || ''
        );

        const [isSavingDefaultChannel, setIsSavingDefaultChannel] = useState(false);

        // Load mute status

        useEffect(() => {
            const loadMuteStatus = async () => {
                try {
                    const res = await fetchWithAuth(
                        `${apiBaseUrl}/servers/${server.id}/mute-status/`
                    );

                    if (res.ok) {
                        const data = await res.json();

                        setIsMuted(data.is_muted || false);
                    }
                } catch (e) {
                    logger.error('Mute status load error:', e);
                }
            };

            loadMuteStatus();
        }, [server.id, fetchWithAuth, apiBaseUrl]);

        const handleToggleMute = async () => {
            try {
                const endpoint = isMuted ? 'unmute' : 'mute';

                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/${endpoint}/`, {
                    method: 'POST',
                });

                if (res.ok) {
                    setIsMuted(!isMuted);

                    toast.success(
                        isMuted ? t('server.notificationsEnabled') : t('server.notificationsMuted')
                    );
                } else {
                    const data = await res.json();

                    toast.error(data.error || t('common.errorOccurred'));
                }
            } catch (e) {
                logger.error('Mute error:', e);

                toast.error(t('common.errorOccurred'));
            }
        };

        const handleDeleteServer = async () => {
            if (deleteConfirmation !== server.name) {
                toast.warning(t('server.deleteNameMismatch'));

                return;
            }

            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/delete/`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    toast.success(t('server.deleteSuccess'));

                    onClose();

                    if (onRefreshServers) onRefreshServers();

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 500);
                } else {
                    const data = await res.json();

                    toast.error(t('server.deleteFailed'));
                }
            } catch (e) {
                logger.error('Delete error:', e);

                toast.error(t('server.deleteFailed'));
            }
        };

        const handleSaveDescription = async () => {
            setIsSavingDescription(true);

            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                    method: 'PATCH',

                    headers: { 'Content-Type': 'application/json' },

                    body: JSON.stringify({ description: serverDescription }),
                });

                if (res.ok) {
                    toast.success(t('server.descriptionUpdated'));

                    if (onRefreshServers) onRefreshServers();
                } else {
                    const data = await res.json();

                    toast.error(t('server.descriptionFailed'));
                }
            } catch (e) {
                logger.error('Description error:', e);

                toast.error(t('server.descriptionFailed'));
            } finally {
                setIsSavingDescription(false);
            }
        };

        const handleSaveDefaultChannel = async () => {
            setIsSavingDefaultChannel(true);

            try {
                const res = await fetchWithAuth(
                    `${apiBaseUrl}/servers/${server.id}/default-channel/`,
                    {
                        method: 'POST',

                        headers: { 'Content-Type': 'application/json' },

                        body: JSON.stringify({ channel_slug: defaultChannelSlug }),
                    }
                );

                if (res.ok) {
                    toast.success(t('server.defaultChannelUpdated'));

                    if (onRefreshServers) onRefreshServers();
                } else {
                    const data = await res.json().catch(() => ({}));

                    toast.error(t('server.defaultChannelFailed'));
                }
            } catch (e) {
                logger.error('Default channel error:', e);

                toast.error(t('server.defaultChannelFailed'));
            } finally {
                setIsSavingDefaultChannel(false);
            }
        };

        const handleRenameServer = async () => {
            const trimmed = serverName.trim();

            if (!trimmed || trimmed === server.name) {
                toast.warning(t('server.validName'));

                return;
            }

            setIsRenamingServer(true);

            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/update/`, {
                    method: 'PATCH',

                    headers: { 'Content-Type': 'application/json' },

                    body: JSON.stringify({ name: trimmed }),
                });

                if (res.ok) {
                    toast.success(t('server.nameUpdated'));

                    if (onRefreshServers) onRefreshServers();
                } else {
                    const data = await res.json();

                    toast.error(t('server.nameFailed'));
                }
            } catch (e) {
                logger.error(t('ui.rename_hatasi'), e);

                toast.error(t('server.nameFailed'));
            } finally {
                setIsRenamingServer(false);
            }
        };

        const handleServerNameChange = useCallback((e) => setServerName(e.target.value), []);

        const handleServerDescriptionChange = useCallback(
            (e) => setServerDescription(e.target.value),
            []
        );

        const handleDefaultChannelChange = useCallback(
            (e) => setDefaultChannelSlug(e.target.value),
            []
        );

        const handleDeleteConfirmationChange = useCallback(
            (e) => setDeleteConfirmation(e.target.value),
            []
        );

        const handleInputFocus = useCallback((e) => {
            e.target.style.borderColor = '#5865f2';
        }, []);

        const handleInputBlur = useCallback((e) => {
            e.target.style.borderColor = '#1e2024';
        }, []);

        const handleShowDeleteModal = useCallback(() => setShowDeleteModal(true), []);

        const handleCancelDelete = useCallback(() => {
            setShowDeleteModal(false);
            setDeleteConfirmation('');
        }, []);

        const handleIconUpload = useCallback(() => {
            const input = document.createElement('input');

            input.type = 'file';
            input.accept = 'image/*';

            input.onchange = async (e) => {
                const file = e.target.files[0];

                if (!file) return;

                if (file.size > 5 * 1024 * 1024) {
                    toast.warning(t('ui.file_boyutu_cok_buyuk_maksimum_5mb_olmal'));
                    return;
                }

                const formData = new FormData();

                formData.append('icon', file);

                try {
                    const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/icon/`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (res.ok) {
                        toast.success(t('server.iconUpdated'));
                        if (onRefreshServers) onRefreshServers();
                    } else {
                        const error = await res.json();
                        toast.error(error.error || t('common.unknownError'));
                    }
                } catch (error) {
                    logger.error(' Icon upload error:', error);
                    toast.error(t('server.iconFailed'));
                }
            };

            input.click();
        }, [fetchWithAuth, apiBaseUrl, server.id, onRefreshServers]);

        const handlePrivacyToggle = useCallback(async () => {
            const newPrivacy = !server.is_public;

            const message = newPrivacy
                ? 'Are you sure you want to make the server public?'
                : 'Are you sure you want to make the server private?';

            if (!(await confirmDialog(message))) return;

            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/privacy/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_public: newPrivacy }),
                });

                if (res.ok) {
                    toast.success(t(newPrivacy ? 'server.madePublic' : 'server.madePrivate'));
                    if (onRefreshServers) onRefreshServers();
                } else {
                    const error = await res.json();
                    toast.error(error.error || t('common.unknownError'));
                }
            } catch (error) {
                logger.error(t('ui.gizlilik_ayari_hatasi'), error);
                toast.error(t('server.privacyChangeFailed'));
            }
        }, [server.is_public, fetchWithAuth, apiBaseUrl, server.id, onRefreshServers]);

        const muteBtnStyle = {
            ...styles.actionBtn,
            backgroundColor: isMuted ? '#23a559' : '#5865f2',
        };

        const saveNameBtnStyle = {
            ...styles.actionBtn,
            backgroundColor: serverName.trim() !== server.name ? '#5865f2' : '#4e5058',
            opacity: isRenamingServer || serverName.trim() === server.name ? 0.5 : 1,
            cursor:
                isRenamingServer || serverName.trim() === server.name ? 'not-allowed' : 'pointer',
        };

        const saveDescBtnStyle = {
            ...styles.actionBtn,
            backgroundColor:
                serverDescription !== (server.description || '') ? '#5865f2' : '#4e5058',
            opacity:
                isSavingDescription || serverDescription === (server.description || '') ? 0.5 : 1,
            cursor:
                isSavingDescription || serverDescription === (server.description || '')
                    ? 'not-allowed'
                    : 'pointer',
            alignSelf: 'flex-start',
        };

        const privacyBtnStyle = {
            ...styles.actionBtn,
            backgroundColor: server.is_public ? '#f23f42' : '#23a559',
        };

        const saveChannelBtnStyle = {
            ...styles.actionBtn,
            backgroundColor:
                defaultChannelSlug !== (server.metadata?.default_channel_slug || '')
                    ? '#5865f2'
                    : '#4e5058',
            opacity:
                isSavingDefaultChannel ||
                defaultChannelSlug === (server.metadata?.default_channel_slug || '')
                    ? 0.5
                    : 1,
            cursor:
                isSavingDefaultChannel ||
                defaultChannelSlug === (server.metadata?.default_channel_slug || '')
                    ? 'not-allowed'
                    : 'pointer',
        };

        const deleteDangerBtnStyle = {
            ...styles.dangerBtn,
            opacity: deleteConfirmation !== server.name ? 0.5 : 1,
            cursor: deleteConfirmation !== server.name ? 'not-allowed' : 'pointer',
        };

        return (
            <div style={styles.managementTab}>
                <h3 style={styles.sectionTitle}>{t('🔔_notification_settings')}</h3>

                <div style={styles.settingBox}>
                    <div style={styles.settingInfo}>
                        <div style={styles.settingLabel}>
                            {isMuted ? '🔇 Server Muted' : '🔊 Notifications Active'}
                        </div>

                        <div style={styles.settingDesc}>
                            {isMuted
                                ? 'You are not receiving any notifications from this server.'
                                : 'You are receiving all notifications from this server.'}
                        </div>
                    </div>

                    <button
                        onClick={handleToggleMute}
                        aria-label={
                            isMuted ? 'Enable server notifications' : 'Mute server notifications'
                        }
                        style={muteBtnStyle}
                    >
                        {isMuted ? <FaVolumeUp /> : <FaVolumeMute />}

                        {isMuted ? ' Unmute' : ' Mute'}
                    </button>
                </div>

                <div style={styles.divider}></div>

                {isOwner && (
                    <>
                        <h3 style={styles.sectionTitle}>{t('🎨_server_customization')}</h3>

                        {/* Server Name */}

                        <div style={styles.settingBox}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>
                                    <FaEdit className="mr-8" />
                                    {t('server_name')}
                                </div>

                                <div style={styles.settingDesc}>
                                    {t('change_your_server_s_display_name')}
                                </div>
                            </div>

                            <div className={css.flexAlignGap8}>
                                <input
                                    type="text"
                                    value={serverName}
                                    onChange={handleServerNameChange}
                                    maxLength={100}
                                    style={S.bg}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    placeholder={t('server_adı')}
                                    aria-label="Server Name"
                                />

                                <button
                                    onClick={handleRenameServer}
                                    aria-label="Save server name"
                                    disabled={isRenamingServer || serverName.trim() === server.name}
                                    style={saveNameBtnStyle}
                                >
                                    {isRenamingServer ? '...' : 'Save'}
                                </button>
                            </div>
                        </div>

                        {/* Server Description */}

                        <div style={S.col}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>
                                    <FaFileAlt className="mr-8" />
                                    {t('server_description')}
                                </div>

                                <div style={styles.settingDesc}>
                                    {t('write_a_short_description_about_your_server')}
                                </div>
                            </div>

                            <div className={css.flexGap8Mt10}>
                                <textarea
                                    value={serverDescription}
                                    onChange={handleServerDescriptionChange}
                                    maxLength={300}
                                    placeholder={t('this_server_hakkında_bir_aklama_yazın')}
                                    style={S.bg2}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    aria-label="textarea"
                                />

                                <button
                                    onClick={handleSaveDescription}
                                    aria-label="Save server description"
                                    disabled={
                                        isSavingDescription ||
                                        serverDescription === (server.description || '')
                                    }
                                    style={saveDescBtnStyle}
                                >
                                    {isSavingDescription ? '...' : 'Save'}
                                </button>
                            </div>

                            <div className={css.fieldHintRight}>
                                {serverDescription.length}/300 karakter
                            </div>
                        </div>

                        {/* İkon Changeme */}

                        <div style={styles.settingBox}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>
                                    <FaImage className="mr-8" />
                                    {t('server_i̇konu')}
                                </div>

                                <div style={styles.settingDesc}>
                                    {t('servernuzun_profile_resmini_değiştirin_maks_5mb')}
                                </div>
                            </div>

                            <button
                                onClick={handleIconUpload}
                                aria-label="Upload server icon"
                                style={styles.actionBtn}
                            >
                                <FaImage /> İkonu Değiştir
                            </button>
                        </div>

                        {/* Gizlilik Ayarı */}

                        <div style={styles.settingBox}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>
                                    {server.is_public ? (
                                        <FaGlobe className="mr-8" />
                                    ) : (
                                        <FaLock className="mr-8" />
                                    )}

                                    {server.is_public ? 'Public Server' : t('ui.ozel_server')}
                                </div>

                                <div style={styles.settingDesc}>
                                    {server.is_public
                                        ? t('ui.hercut_bu_sunucuyu_findabilir_ve_katilab')
                                        : 'Only invited people can join.'}
                                </div>
                            </div>

                            <button
                                onClick={handlePrivacyToggle}
                                aria-label={
                                    server.is_public ? 'Make server private' : 'Make server public'
                                }
                                style={privacyBtnStyle}
                            >
                                {server.is_public ? <FaLock /> : <FaGlobe />}

                                {server.is_public ? t('ui.ozel_yap_2') : ' Make Public'}
                            </button>
                        </div>

                        {/* Default Channel */}

                        <div style={styles.settingBox}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>
                                    <FaComments className="mr-8" />
                                    {t('default_channel')}
                                </div>

                                <div style={styles.settingDesc}>
                                    {t('users_sunucuya_girdiğinde_ilk_gösterilecek_kanal')}
                                </div>
                            </div>

                            <div className={css.flexAlignGap8}>
                                <select
                                    value={defaultChannelSlug}
                                    onChange={handleDefaultChannelChange}
                                    style={S.bg3}
                                    aria-label="select"
                                >
                                    <option value="">{t('otomatik_i̇lk_metin_kanalı')}</option>

                                    {server.categories?.map((cat) =>
                                        cat.rooms
                                            ?.filter(
                                                (r) =>
                                                    r.room_type !== 'voice' &&
                                                    r.channel_type !== 'voice'
                                            )
                                            .map((room) => (
                                                <option key={room.slug} value={room.slug}>
                                                    {room.name}
                                                </option>
                                            ))
                                    )}
                                </select>

                                <button
                                    onClick={handleSaveDefaultChannel}
                                    aria-label="Save default channel"
                                    disabled={
                                        isSavingDefaultChannel ||
                                        defaultChannelSlug ===
                                            (server.metadata?.default_channel_slug || '')
                                    }
                                    style={saveChannelBtnStyle}
                                >
                                    {isSavingDefaultChannel ? '...' : 'Save'}
                                </button>
                            </div>
                        </div>

                        <div style={styles.divider}></div>
                    </>
                )}

                {/* Tehlikeli Bölge */}

                {isOwner && (
                    <>
                        <h3 style={styles.sectionTitle}>{t('⚠_tehlikeli_bölge')}</h3>

                        <div style={styles.dangerBox}>
                            <div style={styles.settingInfo}>
                                <div style={styles.settingLabel}>{t('🗑_serveryu_delete')}</div>

                                <div style={styles.settingDesc}>
                                    {t(
                                        'bu_işlem_geri alınamaz_tüm_kanallar_messagelar_ve_settings_kalı'
                                    )}
                                </div>

                                {showDeleteModal && (
                                    <div style={styles.deleteConfirmation}>
                                        <p style={S.txt}>
                                            {t('type_server_name_to_delete')}
                                            <strong>{server.name}</strong>
                                        </p>

                                        <input
                                            type="text"
                                            value={deleteConfirmation}
                                            onChange={handleDeleteConfirmationChange}
                                            placeholder={server.name}
                                            style={styles.confirmInput}
                                            aria-label="text"
                                        />

                                        <div className={css.flexGap10Mt10}>
                                            <button
                                                onClick={handleDeleteServer}
                                                aria-label="Confirm delete server"
                                                disabled={deleteConfirmation !== server.name}
                                                style={deleteDangerBtnStyle}
                                            >
                                                <FaTrash /> Sunucuyu KALICI OLARAK SiL
                                            </button>

                                            <button
                                                onClick={handleCancelDelete}
                                                aria-label="Cancel server deletion"
                                                style={styles.cancelBtn}
                                            >
                                                {t('common.cancel')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!showDeleteModal && (
                                <button
                                    onClick={handleShowDeleteModal}
                                    aria-label="Open delete server dialog"
                                    style={styles.dangerBtn}
                                >
                                    <FaTrash />
                                    {t('serveryu_delete')}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }
);

ManagementTab.propTypes = {
    server: PropTypes.string,

    isOwner: PropTypes.bool,

    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    onRefreshServers: PropTypes.func,

    onClose: PropTypes.func,
};

export default ManagementTab;
