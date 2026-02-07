// frontend/src/components/AuditLogFilter.js
// 🔥 FEATURE 47: Audit log search/filter
// Filter and search through server audit logs

import React, { useState, memo, useCallback, useMemo } from 'react';
import { FaSearch, FaFilter, FaUser, FaCalendar, FaHashtag, FaShieldAlt, FaCog, FaTrash, FaUserPlus, FaUserMinus, FaBan, FaEdit, FaThumbtack, FaVolumeUp, FaTimes } from 'react-icons/fa';

const ACTION_TYPES = [
    { key: 'all', label: 'Tümü', icon: FaFilter },
    { key: 'channel_create', label: 'Kanal Oluşturma', icon: FaHashtag },
    { key: 'channel_delete', label: 'Kanal Silme', icon: FaTrash },
    { key: 'channel_edit', label: 'Kanal Düzenleme', icon: FaEdit },
    { key: 'member_join', label: 'Üye Katılma', icon: FaUserPlus },
    { key: 'member_leave', label: 'Üye Ayrılma', icon: FaUserMinus },
    { key: 'member_ban', label: 'Yasaklama', icon: FaBan },
    { key: 'role_create', label: 'Rol Oluşturma', icon: FaShieldAlt },
    { key: 'role_edit', label: 'Rol Düzenleme', icon: FaEdit },
    { key: 'message_delete', label: 'Mesaj Silme', icon: FaTrash },
    { key: 'message_pin', label: 'Mesaj Sabitleme', icon: FaThumbtack },
    { key: 'server_edit', label: 'Sunucu Düzenleme', icon: FaCog },
    { key: 'voice_move', label: 'Sesli Taşıma', icon: FaVolumeUp },
];

const AuditLogFilter = ({ logs = [], users = [], onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAction, setSelectedAction] = useState('all');
    const [selectedUser, setSelectedUser] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            // Action filter
            if (selectedAction !== 'all' && log.action !== selectedAction) return false;
            // User filter
            if (selectedUser !== 'all' && log.userId !== selectedUser) return false;
            // Search filter
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchText = `${log.description || ''} ${log.username || ''} ${log.target || ''}`.toLowerCase();
                if (!matchText.includes(term)) return false;
            }
            // Date filter
            if (dateRange.start && new Date(log.timestamp) < new Date(dateRange.start)) return false;
            if (dateRange.end && new Date(log.timestamp) > new Date(dateRange.end + 'T23:59:59')) return false;
            return true;
        });
    }, [logs, selectedAction, selectedUser, searchTerm, dateRange]);

    const handleClearFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedAction('all');
        setSelectedUser('all');
        setDateRange({ start: '', end: '' });
    }, []);

    const hasActiveFilters = searchTerm || selectedAction !== 'all' || selectedUser !== 'all' || dateRange.start || dateRange.end;

    return (
        <div style={S.container}>
            {/* Search Bar */}
            <div style={S.searchBar}>
                <FaSearch style={{ fontSize: 14, color: '#4e5058' }} />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Denetim kayıtlarında ara..."
                    style={S.searchInput}
                />
                {hasActiveFilters && (
                    <button type="button" style={S.clearBtn} onClick={handleClearFilters}>
                        <FaTimes style={{ fontSize: 12 }} /> Temizle
                    </button>
                )}
            </div>

            {/* Filters Row */}
            <div style={S.filtersRow}>
                {/* Action Type */}
                <div style={S.filterGroup}>
                    <label style={S.filterLabel}><FaFilter style={{ fontSize: 10 }} /> İşlem</label>
                    <select style={S.filterSelect} value={selectedAction} onChange={e => setSelectedAction(e.target.value)}>
                        {ACTION_TYPES.map(a => (
                            <option key={a.key} value={a.key}>{a.label}</option>
                        ))}
                    </select>
                </div>

                {/* User Filter */}
                <div style={S.filterGroup}>
                    <label style={S.filterLabel}><FaUser style={{ fontSize: 10 }} /> Kullanıcı</label>
                    <select style={S.filterSelect} value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                        <option value="all">Tümü</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>@{u.username}</option>
                        ))}
                    </select>
                </div>

                {/* Date Range */}
                <div style={S.filterGroup}>
                    <label style={S.filterLabel}><FaCalendar style={{ fontSize: 10 }} /> Tarih</label>
                    <div style={S.dateRange}>
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            style={S.dateInput}
                        />
                        <span style={{ color: '#4e5058' }}>—</span>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            style={S.dateInput}
                        />
                    </div>
                </div>
            </div>

            {/* Results count */}
            <div style={S.results}>
                <span style={S.resultCount}>{filteredLogs.length} kayıt bulundu</span>
            </div>

            {/* Log Entries */}
            <div style={S.logList}>
                {filteredLogs.map((log, i) => {
                    const actionConfig = ACTION_TYPES.find(a => a.key === log.action);
                    const Icon = actionConfig?.icon || FaCog;
                    return (
                        <div key={log.id || i} style={S.logItem}>
                            <div style={S.logIcon}>
                                <Icon style={{ fontSize: 14, color: '#5865f2' }} />
                            </div>
                            <div style={S.logInfo}>
                                <span style={S.logDesc}>
                                    <strong style={{ color: '#f2f3f5' }}>{log.username || 'Bilinmeyen'}</strong>
                                    {' '}{log.description || actionConfig?.label || log.action}
                                    {log.target && <span style={{ color: '#5865f2' }}> → {log.target}</span>}
                                </span>
                                <span style={S.logTime}>
                                    {log.timestamp ? new Date(log.timestamp).toLocaleString('tr-TR') : ''}
                                </span>
                            </div>
                        </div>
                    );
                })}
                {filteredLogs.length === 0 && (
                    <div style={S.empty}>
                        <FaSearch style={{ fontSize: 24, color: '#4e5058' }} />
                        <span>Kayıt bulunamadı</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const S = {
    container: { padding: 16 },
    searchBar: {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', backgroundColor: '#1e1f22',
        borderRadius: 6, marginBottom: 12,
    },
    searchInput: {
        flex: 1, background: 'transparent', border: 'none', outline: 'none',
        color: '#dcddde', fontSize: 14, fontFamily: 'inherit',
    },
    clearBtn: {
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '4px 8px', borderRadius: 4,
        border: 'none', backgroundColor: 'rgba(255,255,255,0.06)',
        color: '#b5bac1', fontSize: 12, cursor: 'pointer',
    },
    filtersRow: {
        display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap',
    },
    filterGroup: {
        flex: 1, minWidth: 120,
    },
    filterLabel: {
        display: 'flex', alignItems: 'center', gap: 4,
        fontSize: 11, fontWeight: 700, color: '#b5bac1',
        textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4,
    },
    filterSelect: {
        width: '100%', backgroundColor: '#1e1f22', border: 'none', borderRadius: 4,
        color: '#dcddde', fontSize: 13, padding: '6px 8px', outline: 'none',
    },
    dateRange: {
        display: 'flex', alignItems: 'center', gap: 4,
    },
    dateInput: {
        flex: 1, backgroundColor: '#1e1f22', border: 'none', borderRadius: 4,
        color: '#dcddde', fontSize: 12, padding: '6px 4px', outline: 'none',
    },
    results: {
        marginBottom: 8,
    },
    resultCount: {
        fontSize: 12, color: '#4e5058',
    },
    logList: {
        display: 'flex', flexDirection: 'column', gap: 2,
        maxHeight: 400, overflowY: 'auto',
    },
    logItem: {
        display: 'flex', gap: 10, padding: '8px 10px',
        borderRadius: 4, transition: 'background 0.1s',
    },
    logIcon: {
        width: 28, height: 28, borderRadius: '50%',
        backgroundColor: 'rgba(88,101,242,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    },
    logInfo: {
        display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0,
    },
    logDesc: {
        fontSize: 14, color: '#dcddde',
    },
    logTime: {
        fontSize: 11, color: '#4e5058',
    },
    empty: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 8, padding: 40, color: '#4e5058', fontSize: 14,
    },
};

export default memo(AuditLogFilter);
