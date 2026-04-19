// frontend/src/components/ServerMembers.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaCrown, FaUserShield, FaSearch, FaCheck } from 'react-icons/fa';
import toast from '../../utils/toast';
import logger from '../../utils/logger';

// -- dynamic style helpers (pass 2) --
const _st1167 = {
    display: 'inline-block',
    padding: '4px 10px',
    backgroundColor: 'rgba(88,101,242,0.2)',
    color: '#5865f2',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    marginRight: '8px',
};

const ServerMembers = ({ members, roles, serverId, fetchWithAuth, apiBaseUrl, onRefresh }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [memberList, setMemberList] = useState(members || []);
    const [loading, setLoading] = useState(false);
    const [assigningMember, setAssigningMember] = useState(null); // Hangi memberye rol atanıyor

    // Component mount olduğunda memberleri fetch et
    useEffect(() => {
        if (!members || members.length === 0) {
            fetchMembers();
        } else {
            setMemberList(members);
        }
    }, [members, serverId]);

    // Server memberlerini API'den çek
    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/members/`);
            if (res.ok) {
                const data = await res.json();
                setMemberList(data.members || []);
            } else {
                logger.error('❌ [ServerMembers] Failed to fetch members');
            }
        } catch (error) {
            logger.error('❌ [ServerMembers] Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Memberye rol ata
    const assignRole = async (memberUsername, roleId) => {
        setAssigningMember(memberUsername);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/assign_role/`, {
                method: 'POST',
                body: JSON.stringify({
                    username: memberUsername,
                    role_id: roleId,
                }),
            });

            if (res.ok) {
                toast.success(t('serverMembers.roleAssigned'));
                // Listeyi yenile
                await fetchMembers();
            } else {
                const error = await res.json();
                toast.error(
                    t('serverMembers.roleAssignFailed', {
                        error: error.error || t('common.unknownError'),
                    })
                );
            }
        } catch (error) {
            logger.error(t('ui.role_atama_hatasi'), error);
            toast.error(t('ui.role_atama_hatasi_2'));
        } finally {
            setAssigningMember(null);
        }
    };

    // Memberden rolü kaldır
    const removeRole = async (memberUsername, roleId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/remove_role/`, {
                method: 'POST',
                body: JSON.stringify({
                    username: memberUsername,
                    role_id: roleId,
                }),
            });

            if (res.ok) {
                toast.success(t('serverMembers.roleRemoved'));
                await fetchMembers();
            } else {
                toast.error(t('ui.role_kaldirilamadi'));
            }
        } catch (error) {
            logger.error(t('ui.role_kaldirma_hatasi'), error);
        }
    };

    // Filternmiş member listsi
    const filteredMembers = memberList.filter((member) => {
        const username = member.username || member.user?.username || '';
        return username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div style={styles.container}>
            {/* Search Çubuğu */}
            <div style={styles.searchBar}>
                <FaSearch style={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Üye ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {/* Member Sayısı */}
            <div style={styles.memberCount}>
                {filteredMembers.length} Üye {loading && '(Yükleniyor...)'}
            </div>

            {/* Member Listesi */}
            <div style={styles.memberList}>
                {loading ? (
                    <div style={styles.loadingText}>{t('members.loading')}</div>
                ) : filteredMembers.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p>{t('members.notFound')}</p>
                        <button
                            aria-label={t('common.retry')}
                            onClick={fetchMembers}
                            style={styles.refreshBtn}
                        >
                            {t('common.retry')}
                        </button>
                    </div>
                ) : (
                    filteredMembers.map((member, index) => {
                        const username =
                            member.username || member.user?.username || t('common.unknown');
                        const isOwner = member.is_owner || false;
                        const memberRoles = member.roles || [];

                        return (
                            <div key={`item-${index}`} style={styles.memberItem}>
                                {/* Sol Taraf - Avatar + Name */}
                                <div style={styles.memberInfo}>
                                    <div style={styles.avatar}>
                                        {member.avatar_url ? (
                                            <img
                                                src={member.avatar_url}
                                                alt={username}
                                                style={styles.avatarImg}
                                            />
                                        ) : (
                                            <div style={styles.avatarPlaceholder}>
                                                {username.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div style={styles.memberDetails}>
                                        <div style={styles.username}>
                                            {username}
                                            {isOwner && (
                                                <FaCrown
                                                    style={styles.crownIcon}
                                                    title="Sunucu Sahibi"
                                                />
                                            )}
                                        </div>
                                        {memberRoles.length > 0 && (
                                            <div style={styles.rolesContainer}>
                                                {memberRoles.map((role) => (
                                                    <span key={role.id} style={_st1167}>
                                                        {role.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Sağ Taraf - Role Ataması */}
                                {!isOwner && (
                                    <div style={styles.roleActions}>
                                        <select
                                            onChange={(e) => {
                                                const roleId = parseInt(e.target.value);
                                                if (roleId) {
                                                    assignRole(username, roleId);
                                                }
                                                e.target.value = ''; // Reset select
                                            }}
                                            style={styles.roleSelect}
                                            disabled={assigningMember === username}
                                        >
                                            <option value="">Role Ata</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '16px',
    },
    searchBar: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        color: '#b5bac1',
        fontSize: '14px',
    },
    searchInput: {
        width: '100%',
        padding: '10px 10px 10px 36px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
    },
    memberCount: {
        color: '#b5bac1',
        fontSize: '13px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    memberList: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    loadingText: {
        textAlign: 'center',
        color: '#b5bac1',
        padding: '40px',
        fontSize: '14px',
    },
    emptyState: {
        textAlign: 'center',
        color: '#b5bac1',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    refreshBtn: {
        alignSelf: 'center',
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    memberItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        transition: 'background-color 0.2s',
    },
    memberInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1,
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
    },
    avatarImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5865f2',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    memberDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1,
    },
    username: {
        color: '#fff',
        fontSize: '15px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    crownIcon: {
        color: '#f0b232',
        fontSize: '14px',
    },
    rolesContainer: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
    },
    roleBadge: {
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        color: 'white',
    },
    roleActions: {
        display: 'flex',
        gap: '8px',
    },
    roleSelect: {
        padding: '6px 12px',
        backgroundColor: '#0d0e10',
        border: '1px solid #182135',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '13px',
        cursor: 'pointer',
        outline: 'none',
    },
};

ServerMembers.propTypes = {
    members: PropTypes.array,
    roles: PropTypes.array,
    serverId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onRefresh: PropTypes.func,
};
export default ServerMembers;
