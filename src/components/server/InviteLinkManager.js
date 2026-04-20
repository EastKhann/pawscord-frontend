/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/InviteLinkManager.js
// 🔥 FEATURE 42: Invite link manager
// View, create, revoke server invites

import { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    FaLink,
    FaCopy,
    FaTrash,
    FaPlus,
    FaClock,
    FaUsers,
    FaCheck,
    FaInfinity,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const EXPIRE_OPTIONS = [
    { label: '30 minute', value: 1800 },
    { label: '1 hour', value: 3600 },
    { label: '6 hour', value: 21600 },
    { label: '12 hour', value: 43200 },
    { label: '1 day', value: 86400 },
    { label: '7 day', value: 604800 },
    { label: 'Permanent', value: 0 },
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
    const { t } = useTranslation();
    const [showCreate, setShowCreate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
        if (!expiresAt) return 'Permanent';
        const diff = new Date(expiresAt) - new Date();
        if (diff <= 0) return t('ui.durationsi_dolmus');
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        if (hours > 24) return `${Math.floor(hours / 24)} day`;
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
                <button
                    aria-label="Create"
                    type="button"
                    style={S.createBtn}
                    onClick={() => setShowCreate(!showCreate)}
                >
                    <FaPlus /> Yeni Davet
                </button>
            </div>

            {/* Create Section */}
            {showCreate && (
                <div style={S.createSection}>
                    <div style={S.createRow}>
                        <div style={S.createField}>
                            <label style={S.label}>
                                <FaClock className="icon-tiny" /> Duration
                            </label>
                            <select
                                style={S.select}
                                value={expiresIn}
                                onChange={(e) => setExpiresIn(Number(e.target.value))}
                            >
                                {EXPIRE_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={S.createField}>
                            <label style={S.label}>
                                <FaUsers className="icon-tiny" /> Maks Kullanım
                            </label>
                            <select
                                style={S.select}
                                value={maxUses}
                                onChange={(e) => setMaxUses(Number(e.target.value))}
                            >
                                {MAX_USES_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        aria-label="handle Create"
                        type="button"
                        style={S.generateBtn}
                        onClick={handleCreate}
                    >
                        <FaLink /> Davet Create
                    </button>
                </div>
            )}

            {/* Invite List */}
            <div style={S.list}>
                {invites.length === 0 ? (
                    <div style={S.empty}>
                        <FaLink className="icon-gray-24" />
                        <span>Henüz davet yok</span>
                    </div>
                ) : (
                    invites.map((invite) => (
                        <div key={invite.id} style={S.inviteItem}>
                            <div style={S.inviteInfo}>
                                <div style={S.inviteCode}>
                                    <FaLink className="text-5865-12" />
                                    <span style={S.codeText}>{invite.code}</span>
                                </div>
                                <div style={S.inviteMeta}>
                                    <span>
                                        <FaUsers className="icon-tiny" /> {invite.uses || 0}
                                        {invite.maxUses ? `/${invite.maxUses}` : ''} uses
                                    </span>
                                    <span>
                                        <FaClock className="icon-tiny" />{' '}
                                        {formatTimeLeft(invite.expiresAt)}
                                    </span>
                                    {invite.createdBy && <span>@{invite.createdBy}</span>}
                                </div>
                            </div>
                            <div style={S.inviteActions}>
                                <button
                                    aria-label="Action button"
                                    type="button"
                                    style={S.actionBtn}
                                    onClick={() => handleCopy(invite)}
                                    title="Kopyala"
                                >
                                    {copiedId === invite.id ? (
                                        <FaCheck className="icon-success" />
                                    ) : (
                                        <FaCopy />
                                    )}
                                </button>
                                <button
                                    aria-label="Action button"
                                    type="button"
                                    style={S.txt}
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: { fontSize: 16, fontWeight: 700, color: '#f2f3f5', margin: 0 },
    subtitle: { fontSize: 12, color: '#b5bac1' },
    createBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 14px',
        borderRadius: 4,
        border: 'none',
        backgroundColor: '#5865f2',
        color: '#fff',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
    },
    createSection: {
        padding: 14,
        backgroundColor: '#111214',
        borderRadius: 8,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    createRow: { display: 'flex', gap: 12 },
    createField: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
    label: {
        fontSize: 11,
        fontWeight: 700,
        color: '#b5bac1',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
    },
    select: {
        backgroundColor: '#0d0e10',
        border: 'none',
        borderRadius: 4,
        color: '#dbdee1',
        fontSize: 13,
        padding: '8px 10px',
        outline: 'none',
    },
    generateBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '8px',
        borderRadius: 4,
        border: 'none',
        backgroundColor: '#23a559',
        color: '#000',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
    },
    list: { display: 'flex', flexDirection: 'column', gap: 4 },
    empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: 30,
        color: '#4e5058',
        fontSize: 14,
    },
    inviteItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        backgroundColor: '#111214',
        borderRadius: 6,
        transition: 'background 0.1s',
    },
    inviteInfo: { flex: 1, minWidth: 0 },
    inviteCode: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    },
    codeText: {
        fontSize: 14,
        fontWeight: 600,
        color: '#00a8fc',
        fontFamily: 'monospace',
    },
    inviteMeta: {
        display: 'flex',
        gap: 10,
        fontSize: 11,
        color: '#4e5058',
        marginTop: 4,
    },
    inviteActions: { display: 'flex', gap: 4 },
    actionBtn: {
        width: 32,
        height: 32,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: 'transparent',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: 14,
    },
};
S.txt = { ...S.actionBtn, color: '#f23f42' };

InviteLinkManager.propTypes = {
    invites: PropTypes.array,
    serverName: PropTypes.string,
    onCreateInvite: PropTypes.func,
    onRevokeInvite: PropTypes.func,
};
export default memo(InviteLinkManager);
