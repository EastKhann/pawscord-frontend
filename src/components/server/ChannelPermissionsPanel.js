// frontend/src/components/ChannelPermissionsPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaLock, FaUnlock, FaSave, FaTrash, FaUserShield } from 'react-icons/fa';
import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

// -- dynamic style helpers (pass 2) --
/**
 * 🔐 Channel Permissions Panel
 * Channel bazlı rol izinleri (override sistemi)
 *
 * Features:
 * - Thu-channel permission matrix
 * - Role overrides
 * - Permission templates
 */

const _st1164 = {
    padding: '6px 12px',
    borderRadius: '6px',
    backgroundColor: 'rgba(88,101,242,0.1)',
    color: '#5865f2',
    fontSize: '13px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};
const _st1165 = {
    background: 'none',
    border: '2px solid #444',
    borderRadius: '4px',
    padding: '8px',
    cursor: 'pointer',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40px',
    minHeight: '40px',
};

const ChannelPermissionsPanel = ({ fetchWithAuth, apiBaseUrl, channelSlug, onClose }) => {
    const { t } = useTranslation();
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissionMatrix, setPermissionMatrix] = useState({});

    const PERMISSIONS = [
        { key: 'view_channel', name: t('ui.channeli_view'), icon: '👁️' },
        { key: 'send_messages', name: 'Send Message', icon: '💬' },
        { key: 'attach_files', name: 'File Add', icon: '📎' },
        { key: 'embed_links', name: t('ui.link_gomme'), icon: '🔗' },
        { key: 'add_reactions', name: 'Tepki Add', icon: '😀' },
        { key: 'use_voice', name: 'Sesli Kullan', icon: '🎤' },
        { key: 'speak', name: t('ui.konus_2'), icon: '🗣️' },
        { key: 'mute_members', name: 'Sessize alma', icon: '🔇' },
        { key: 'manage_messages', name: t('ui.mesaj_yonetimi'), icon: '⚙️' },
        { key: 'manage_channel', name: t('ui.channel_yonetimi'), icon: '🛠️' },
    ];

    useEffect(() => {
        loadPermissions();
        loadRoles();
    }, [channelSlug]);

    const loadPermissions = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(
                `${apiBaseUrl}/channels/${channelSlug}/permissions/`
            );
            if (response.ok) {
                const data = await response.json();
                setPermissions(data);

                // Matrix'i doldur
                const matrix = {};
                data.forEach((perm) => {
                    if (!matrix[perm.role_id]) {
                        matrix[perm.role_id] = {};
                    }
                    matrix[perm.role_id][perm.permission] = perm.value;
                });
                setPermissionMatrix(matrix);
            }
        } catch (error) {
            logger.error(t('ui.izin_load_hatasi'), error);
            toast.error(t('channelPerms.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const loadRoles = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/roles/list/`);
            if (response.ok) {
                const data = await response.json();
                setRoles(data);
            }
        } catch (error) {
            logger.error(t('ui.role_load_hatasi'), error);
        }
    };

    const updatePermission = async (roleId, permission, value) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/channels/permissions/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    channel_slug: channelSlug,
                    role_id: roleId,
                    permission: permission,
                    value: value,
                }),
            });

            if (response.ok) {
                toast.success(t('ui.izin_updated'));

                // Matrix'i daycelle
                setPermissionMatrix((prev) => ({
                    ...prev,
                    [roleId]: {
                        ...prev[roleId],
                        [permission]: value,
                    },
                }));
            } else {
                toast.error(t('channelPerms.updateFailed'));
            }
        } catch (error) {
            logger.error('Permission update error:', error);
            toast.error(t('common.errorOccurred'));
        }
    };

    const getPermissionValue = (roleId, permission) => {
        return permissionMatrix[roleId]?.[permission];
    };

    const getPermissionIcon = (value) => {
        if (value === true) return { icon: '✅', color: '#23a559', text: 'İzin Ver' };
        if (value === false) return { icon: '❌', color: '#f23f42', text: 'Reject' };
        return { icon: '➖', color: '#949ba4', text: 'Default' };
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
                {/* Header */}
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaLock className="icon-warning" />
                        <h2 className="m-0">Kanal İzinleri</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                {/* Permission Matrix */}
                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : (
                        <div style={styles.matrix}>
                            <div style={styles.matrixHeader}>
                                <div style={styles.headerCell}>İzin</div>
                                {roles.map((role) => (
                                    <div key={role.id} style={styles.headerCell}>
                                        <div style={_st1164}>{role.name}</div>
                                    </div>
                                ))}
                            </div>

                            {PERMISSIONS.map((perm) => (
                                <div key={perm.key} style={styles.matrixRow}>
                                    <div style={styles.permissionName}>
                                        <span className="mr8-fs18">{perm.icon}</span>
                                        {perm.name}
                                    </div>
                                    {roles.map((role) => {
                                        const value = getPermissionValue(role.id, perm.key);
                                        const display = getPermissionIcon(value);

                                        return (
                                            <div key={role.id} style={styles.permissionCell}>
                                                <button
                                                    aria-label="Action button"
                                                    onClick={() => {
                                                        // Cycle: null → true → false → null
                                                        const newValue =
                                                            value === null
                                                                ? true
                                                                : value === true
                                                                  ? false
                                                                  : null;
                                                        updatePermission(
                                                            role.id,
                                                            perm.key,
                                                            newValue
                                                        );
                                                    }}
                                                    style={_st1165}
                                                    title={display.text}
                                                >
                                                    <span className="fs-20">{display.icon}</span>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <div style={styles.legend}>
                        <div style={styles.legendItem}>
                            <span className="text-23a559-18">✅</span>
                            <span>İzin Ver</span>
                        </div>
                        <div style={styles.legendItem}>
                            <span className="text-f23f42-18">❌</span>
                            <span>Reject</span>
                        </div>
                        <div style={styles.legendItem}>
                            <span className="text-949-18">➖</span>
                            <span>Default</span>
                        </div>
                    </div>
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
        width: '95%',
        maxWidth: '1200px',
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
    matrix: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    matrixHeader: {
        display: 'grid',
        gridTemplateColumns: '200px repeat(auto-fit, minmax(100px, 1fr))',
        gap: '2px',
        marginBottom: '10px',
        position: 'sticky',
        top: 0,
        backgroundColor: '#1e1e1e',
        zIndex: 10,
        paddingBottom: '10px',
    },
    headerCell: {
        padding: '12px',
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: '#111214',
        borderRadius: '4px',
    },
    roleTag: {
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '13px',
        fontWeight: '600',
        color: '#fff',
    },
    matrixRow: {
        display: 'grid',
        gridTemplateColumns: '200px repeat(auto-fit, minmax(100px, 1fr))',
        gap: '2px',
        marginBottom: '2px',
    },
    permissionName: {
        padding: '12px',
        backgroundColor: '#111214',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
    },
    permissionCell: {
        padding: '12px',
        backgroundColor: '#111214',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    permissionBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
    },
    footer: {
        padding: '20px',
        borderTop: '1px solid #333',
    },
    legend: {
        display: 'flex',
        gap: '30px',
        justifyContent: 'center',
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888',
    },
};

ChannelPermissionsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    channelSlug: PropTypes.string,
    onClose: PropTypes.func,
};
export default ChannelPermissionsPanel;
