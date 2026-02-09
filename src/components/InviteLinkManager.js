// frontend/src/components/InviteLinkManager.js
// 🔥 FEATURE 42: Invite link manager
// View, create, revoke server invites

import React, { useState, memo, useCallback } from 'react';
import { FaLink, FaCopy, FaTrash, FaPlus, FaClock, FaUsers, FaCheck, FaInfinity } from 'react-icons/fa';

const EXPIRE_OPTIONS = [
    { label: '30 dakika', value: 1800 },
    { label: '1 saat', value: 3600 },
    { label: '6 saat', value: 21600 },
    { label: '12 saat', value: 43200 },
    { label: '1 gün', value: 86400 },
    { label: '7 gün', value: 604800 },
    { label: 'Süresiz', value: 0 },
];

const MAX_USES_OPTIONS = [
    { label: 'Sınırsız', value: 0 },
    { label: '1 kullanım', value: 1 },
    { label: '5 kullanım', value: 5 },
    { label: '10 kullanım', value: 10 },
    { label: '25 kullanım', value: 25 },
    { label: '50 kullanım', value: 50 },
    { label: '100 kullanım', value: 100 },
];

const InviteLinkManager = ({ invites = [], serverName, onCreateInvite, onRevokeInvite }) => {
    const [showCreate, setShowCreate] = useState(false);
    const [expiresIn, setExpiresIn] = useState(86400);
    const [maxUses, setMaxUses] = useState(0);
    const [copiedId, setCopiedId] = useState(null);

    const handleCreate = useCallback(() => {
        onCreateInvite?.({ expiresIn, maxUses });
        setShowCreate(false);
    }, [expiresIn, maxUses, onCreateInvite]);

    const handleCopy = useCallback((invite) => {
        const link = `${window.location.origin}/#/invite/${invite.code}`;
        navigator.clipboard.writeText(link);
        setCopiedId(invite.id);
        setTimeout(() => setCopiedId(null), 2000);
    }, []);

    const formatTimeLeft = (expiresAt) => {
        if (!expiresAt) return 'Süresiz';
        const diff = new Date(expiresAt) - new Date();
        if (diff <= 0) return 'Süresi dolmuş';
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        if (hours > 24) return `${Math.floor(hours / 24)} gün`;
        if (hours > 0) return `${hours}sa ${minutes}dk`;
        return `${minutes}dk`;
    };

    return (
        <div style={S.container}>
            <div style={S.header}>
                <div>
                    <h3 style={S.title}>Davet Linkleri</h3>
                    <span style={S.subtitle}>{serverName}</span>
                </div>
                <button type="button" style={S.createBtn} onClick={() => setShowCreate(!showCreate)}>
                    <FaPlus /> Yeni Davet
                </button>
            </div>

            {/* Create Section */}
            {showCreate && (
                <div style={S.createSection}>
                    <div style={S.createRow}>
                        <div style={S.createField}>
                            <label style={S.label}><FaClock style={{ fontSize: 10 }} /> Süre</label>
                            <select style={S.select} value={expiresIn} onChange={e => setExpiresIn(Number(e.target.value))}>
                                {EXPIRE_OPTIONS.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={S.createField}>
                            <label style={S.label}><FaUsers style={{ fontSize: 10 }} /> Maks Kullanım</label>
                            <select style={S.select} value={maxUses} onChange={e => setMaxUses(Number(e.target.value))}>
                                {MAX_USES_OPTIONS.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="button" style={S.generateBtn} onClick={handleCreate}>
                        <FaLink /> Davet Oluştur
                    </button>
                </div>
            )}

            {/* Invite List */}
            <div style={S.list}>
                {invites.length === 0 ? (
                    <div style={S.empty}>
                        <FaLink style={{ fontSize: 24, color: '#4e5058' }} />
                        <span>Henüz davet yok</span>
                    </div>
                ) : (
                    invites.map(invite => (
                        <div key={invite.id} style={S.inviteItem}>
                            <div style={S.inviteInfo}>
                                <div style={S.inviteCode}>
                                    <FaLink style={{ fontSize: 12, color: '#5865f2' }} />
                                    <span style={S.codeText}>{invite.code}</span>
                                </div>
                                <div style={S.inviteMeta}>
                                    <span><FaUsers style={{ fontSize: 10 }} /> {invite.uses || 0}{invite.maxUses ? `/${invite.maxUses}` : ''} kullanım</span>
                                    <span><FaClock style={{ fontSize: 10 }} /> {formatTimeLeft(invite.expiresAt)}</span>
                                    {invite.createdBy && <span>@{invite.createdBy}</span>}
                                </div>
                            </div>
                            <div style={S.inviteActions}>
                                <button
                                    type="button"
                                    style={S.actionBtn}
                                    onClick={() => handleCopy(invite)}
                                    title="Kopyala"
                                >
                                    {copiedId === invite.id ? (
                                        <FaCheck style={{ color: '#57f287' }} />
                                    ) : (
                                        <FaCopy />
                                    )}
                                </button>
                                <button
                                    type="button"
                                    style={{ ...S.actionBtn, color: '#ed4245' }}
                                    onClick={() => onRevokeInvite?.(invite.id)}
                                    title="İptal Et"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const S = {
    container: { padding: 16 },
    header: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: { fontSize: 16, fontWeight: 700, color: '#f2f3f5', margin: 0 },
    subtitle: { fontSize: 12, color: '#b5bac1' },
    createBtn: {
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 4,
        border: 'none', backgroundColor: '#5865f2',
        color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
    },
    createSection: {
        padding: 14, backgroundColor: '#2b2d31', borderRadius: 8,
        marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12,
    },
    createRow: { display: 'flex', gap: 12 },
    createField: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
    label: {
        fontSize: 11, fontWeight: 700, color: '#b5bac1',
        textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4,
    },
    select: {
        backgroundColor: '#1e1f22', border: 'none', borderRadius: 4,
        color: '#dcddde', fontSize: 13, padding: '8px 10px', outline: 'none',
    },
    generateBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '8px', borderRadius: 4,
        border: 'none', backgroundColor: '#57f287',
        color: '#000', fontSize: 13, fontWeight: 600, cursor: 'pointer',
    },
    list: { display: 'flex', flexDirection: 'column', gap: 4 },
    empty: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: 30, color: '#4e5058', fontSize: 14,
    },
    inviteItem: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 12px', backgroundColor: '#2b2d31',
        borderRadius: 6, transition: 'background 0.1s',
    },
    inviteInfo: { flex: 1, minWidth: 0 },
    inviteCode: {
        display: 'flex', alignItems: 'center', gap: 6,
    },
    codeText: {
        fontSize: 14, fontWeight: 600, color: '#00a8fc',
        fontFamily: 'monospace',
    },
    inviteMeta: {
        display: 'flex', gap: 10, fontSize: 11, color: '#4e5058', marginTop: 4,
    },
    inviteActions: { display: 'flex', gap: 4 },
    actionBtn: {
        width: 32, height: 32, borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', background: 'transparent',
        color: '#b5bac1', cursor: 'pointer', fontSize: 14,
    },
};

export default memo(InviteLinkManager);
