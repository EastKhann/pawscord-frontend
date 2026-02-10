// frontend/src/components/ServerMembers.js

import React, { useState, useEffect } from 'react';
import { FaCrown, FaUserShield, FaSearch, FaCheck } from 'react-icons/fa';
import toast from '../utils/toast';

const ServerMembers = ({ members, roles, serverId, fetchWithAuth, apiBaseUrl, onRefresh }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [memberList, setMemberList] = useState(members || []);
    const [loading, setLoading] = useState(false);
    const [assigningMember, setAssigningMember] = useState(null); // Hangi üyeye rol atanıyor

    // Component mount olduğunda üyeleri fetch et
    useEffect(() => {
        if (!members || members.length === 0) {
            fetchMembers();
        } else {
            setMemberList(members);
        }
    }, [members, serverId]);

    // Sunucu üyelerini API'den çek
    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/members/`);
            if (res.ok) {
                const data = await res.json();
                setMemberList(data.members || []);
            } else {
                console.error('❌ [ServerMembers] Failed to fetch members');
            }
        } catch (error) {
            console.error('❌ [ServerMembers] Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Üyeye rol ata
    const assignRole = async (memberUsername, roleId) => {
        setAssigningMember(memberUsername);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/assign_role/`, {
                method: 'POST',
                body: JSON.stringify({
                    username: memberUsername,
                    role_id: roleId
                })
            });

            if (res.ok) {
                toast.success(`${memberUsername} kullanıcısına rol atandı!`);
                // Listeyi yenile
                await fetchMembers();
            } else {
                const error = await res.json();
                toast.error(`Rol atanamadı: ${error.error || 'Bilinmeyen hata'}`);
            }
        } catch (error) {
            console.error('Rol atama hatası:', error);
            toast.error('Rol atama hatası!');
        } finally {
            setAssigningMember(null);
        }
    };

    // Üyeden rolü kaldır
    const removeRole = async (memberUsername, roleId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/remove_role/`, {
                method: 'POST',
                body: JSON.stringify({
                    username: memberUsername,
                    role_id: roleId
                })
            });

            if (res.ok) {
                toast.success(`${memberUsername} kullanıcısından rol kaldırıldı!`);
                await fetchMembers();
            } else {
                toast.error('Rol kaldırılamadı!');
            }
        } catch (error) {
            console.error('Rol kaldırma hatası:', error);
        }
    };

    // Filtrelenmiş üye listesi
    const filteredMembers = memberList.filter(member => {
        const username = member.username || member.user?.username || '';
        return username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div style={styles.container}>
            {/* Arama Çubuğu */}
            <div style={styles.searchBar}>
                <FaSearch style={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Üye ara..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {/* Üye Sayısı */}
            <div style={styles.memberCount}>
                {filteredMembers.length} Üye {loading && '(Yükleniyor...)'}
            </div>

            {/* Üye Listesi */}
            <div style={styles.memberList}>
                {loading ? (
                    <div style={styles.loadingText}>Üyeler yükleniyor...</div>
                ) : filteredMembers.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p>Hiç üye bulunamadı</p>
                        <button onClick={fetchMembers} style={styles.refreshBtn}>
                            Yenile
                        </button>
                    </div>
                ) : (
                    filteredMembers.map((member, index) => {
                        const username = member.username || member.user?.username || 'Bilinmeyen';
                        const isOwner = member.is_owner || false;
                        const memberRoles = member.roles || [];

                        return (
                            <div key={index} style={styles.memberItem}>
                                {/* Sol Taraf - Avatar + İsim */}
                                <div style={styles.memberInfo}>
                                    <div style={styles.avatar}>
                                        {member.avatar_url ? (
                                            <img src={member.avatar_url} alt={username} style={styles.avatarImg} />
                                        ) : (
                                            <div style={styles.avatarPlaceholder}>
                                                {username.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div style={styles.memberDetails}>
                                        <div style={styles.username}>
                                            {username}
                                            {isOwner && <FaCrown style={styles.crownIcon} title="Sunucu Sahibi" />}
                                        </div>
                                        {memberRoles.length > 0 && (
                                            <div style={styles.rolesContainer}>
                                                {memberRoles.map(role => (
                                                    <span
                                                        key={role.id}
                                                        style={{
                                                            ...styles.roleBadge,
                                                            backgroundColor: role.color || '#99aab5'
                                                        }}
                                                    >
                                                        {role.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Sağ Taraf - Rol Ataması */}
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
                                            <option value="">Rol Ata</option>
                                            {roles.map(role => (
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
        gap: '16px'
    },
    searchBar: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        color: '#b9bbbe',
        fontSize: '14px'
    },
    searchInput: {
        width: '100%',
        padding: '10px 10px 10px 36px',
        backgroundColor: '#1e1f22',
        border: '1px solid #40444b',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none'
    },
    memberCount: {
        color: '#b9bbbe',
        fontSize: '13px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    memberList: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    loadingText: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px',
        fontSize: '14px'
    },
    emptyState: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    refreshBtn: {
        alignSelf: 'center',
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    memberItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        transition: 'background-color 0.2s'
    },
    memberInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0
    },
    avatarImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
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
        fontWeight: 'bold'
    },
    memberDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1
    },
    username: {
        color: '#fff',
        fontSize: '15px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    crownIcon: {
        color: '#f0b232',
        fontSize: '14px'
    },
    rolesContainer: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap'
    },
    roleBadge: {
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        color: 'white'
    },
    roleActions: {
        display: 'flex',
        gap: '8px'
    },
    roleSelect: {
        padding: '6px 12px',
        backgroundColor: '#1e1f22',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '13px',
        cursor: 'pointer',
        outline: 'none'
    }
};

export default ServerMembers;



