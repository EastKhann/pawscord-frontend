import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/JoinServerModal.js

// OKen bağımsız - hiçbir dış prop'a ihtiyacı yok (sadece isOpen + onClose)

import React, { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

import { API_BASE_URL } from '../../utils/apiEndpoints';

import toast from '../../utils/toast';

import useModalA11y from '../../hooks/useModalA11y';

import './JoinServerModal.css';

import { useTranslation } from 'react-i18next';

const input = {
    flex: 1,
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #2a2d31',

    background: '#111214',
    color: '#f2f3f5',
    fontSize: '14px',
    outline: 'none',

    boxSizing: 'border-box',
    width: '100%',
};

const S = {
    txt3: {
        color: '#fff',
        fontWeight: 600,
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },

    flex: { display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 },

    txt2: { color: '#f23f42', marginBottom: '8px' },

    mar2: { ...input, marginBottom: '12px' },

    mar: { borderTop: '1px solid #2a2d31', margin: '0 0 12px' },

    txt: { color: '#b5bac1', fontSize: '13px', margin: '0 0 8px' },
};

const JoinServerModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    const [servers, setServers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [inviteCode, setInviteCode] = useState('');

    const [joiningId, setJoiningId] = useState(null);

    const apiFetch = useCallback(async (url, options = {}) => {
        const token = getToken();

        const res = await fetch(url, {
            ...options,

            headers: {
                'Content-Type': 'application/json',

                ...(token ? { Authorization: `Bearer ${token}` } : {}),

                ...options.headers,
            },
        });

        return res;
    }, []);

    // Serverları upload

    const loadServers = useCallback(async () => {
        setLoading(true);

        setError(null);

        try {
            const res = await apiFetch(`${API_BASE_URL}/servers/public/`);

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();

            setServers(Array.isArray(data) ? data : data.results || []);
        } catch (e) {
            setError(t('errors.server_load_failed'));
        } finally {
            setLoading(false);
        }
    }, [apiFetch]);

    useEffect(() => {
        if (isOpen) {
            loadServers();

            setSearchQuery('');

            setInviteCode('');
        }
    }, [isOpen, loadServers]);

    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen,
        label: t('joinServer.title', 'Sunucuya Katıl'),
    });

    const handleJoinServer = async (serverId) => {
        setJoiningId(serverId);

        try {
            const res = await apiFetch(`${API_BASE_URL}/servers/${serverId}/join/`, {
                method: 'POST',
            });

            if (res.ok) {
                toast.success(t('ui.serverya_successfully_katildin'));

                // Listeyi daycelle

                setServers((prev) =>
                    prev.map((s) => (s.id === serverId ? { ...s, is_member: true } : s))
                );
            } else {
                const data = await res.json().catch(() => ({}));

                toast.error(data.error || t('joinServer.error', 'Could not join the server.'));
            }
        } catch {
            toast.error(t('errors.connection_error'));
        } finally {
            setJoiningId(null);
        }
    };

    const handleJoinViaCode = async (e) => {
        e.preventDefault();

        const code = inviteCode.trim();

        if (!code) return;

        // Davet linkinden kodu kar

        const extracted = code.includes('/invite/')
            ? code.split('/invite/').pop().replace(/\/$/, '')
            : code;

        setJoiningId('invite');

        try {
            const res = await apiFetch(`${API_BASE_URL}/invites/join/`, {
                method: 'POST',

                body: JSON.stringify({ code: extracted }),
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                toast.success(t('server.joined', { name: data.server_name || 'Server' }));

                setInviteCode('');

                loadServers();
            } else {
                toast.error(data.error || t('ui.gecersiz_davet_kodu'));
            }
        } catch {
            toast.error(t('invite.connectionError'));
        } finally {
            setJoiningId(null);
        }
    };

    if (!isOpen) return null;

    const filtered = servers.filter(
        (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.owner && s.owner.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return createPortal(
        <div {...overlayProps} style={overlay}>
            <div {...dialogProps} style={modal} className="jsm-modal">
                {/* Header */}

                <div style={header}>
                    <h3 className="text-fff-m0-18">🌐 {t('joinServer.title', 'Sunucuya Katıl')}</h3>

                    <button onClick={onClose} style={closeBtn} aria-label={t('common.close')}>
                        ✕
                    </button>
                </div>

                {/* Davet kodu */}

                <div style={section}>
                    <p style={S.txt}>
                        {t('joinServer.pasteInvite', 'Davet kodunu veya linki yapıştır:')}
                    </p>

                    <form onSubmit={handleJoinViaCode} className="jsm-invite-form flex-gap-8">
                        <input
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                            placeholder={t('joinServer.inviteUrl', 'https://pawscord.com/invite/abc123')}
                            style={input}
                        />

                        <button
                            aria-label={t('joinServer.joinByCode', 'Join by invite code')}
                            style={{
                                ...joinBtn,

                                opacity: joiningId === 'invite' || !inviteCode.trim() ? 0.5 : 1,
                            }}
                        >
                            {joiningId === 'invite' ? '...' : t('joinServer.join', 'Katıl')}
                        </button>
                    </form>
                </div>

                {/* Ayırıcı */}

                <div style={S.mar} />

                {/* Search */}

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('joinServer.searchPlaceholder', '🔍 Sunucu ara...')}
                    style={S.mar2}
                    aria-label={t('joinServer.searchInput', 'Search servers')}
                />

                {/* Server listsi */}

                <div style={listContainer}>
                    {loading && <p style={infoText}>{t('common.loading')}</p>}

                    {error && (
                        <div className="pad-center-20">
                            <p style={S.txt2}>{error}</p>

                            <button
                                aria-label={t('common.retry', 'Tekrar Dene')}
                                onClick={loadServers}
                                style={retryBtn}
                            >
                                {t('common.retry', 'Tekrar Dene')}
                            </button>
                        </div>
                    )}

                    {!loading && !error && filtered.length === 0 && (
                        <p style={infoText}>
                            {servers.length === 0
                                ? t('ui.su_an_halka_acik_sunucu_yok')
                                : t('ui.searchnizla_eslesen_sunucu_not_found')}
                        </p>
                    )}

                    {!loading &&
                        filtered.map((srv) => (
                            <div key={srv.id} style={serverRow} className="jsm-server-row">
                                <div style={S.flex}>
                                    {srv.icon ? (
                                        <img
                                            src={
                                                srv.icon.startsWith('http')
                                                    ? srv.icon
                                                    : `https://api.pawscord.com${srv.icon}`
                                            }
                                            alt=""
                                            style={avatar}
                                        />
                                    ) : (
                                        <div style={avatarFallback}>
                                            {srv.name.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <div style={S.txt3}>{srv.name}</div>

                                        <div className="text-b5-12">
                                            {srv.member_count} {t('common.member', 'Üye')} •{' '}
                                            {srv.owner}
                                        </div>
                                    </div>
                                </div>

                                {srv.is_member ? (
                                    <span className="text-23a559-13-600">
                                        ✔ {t('joinServer.alreadyMember', 'Üyesin')}
                                    </span>
                                ) : (
                                    <button
                                        aria-label={t('joinServer.joinServer', 'Join server')}
                                        disabled={joiningId === srv.id}
                                        style={{
                                            ...joinBtn,

                                            opacity: joiningId === srv.id ? 0.5 : 1,

                                            flexShrink: 0,
                                        }}
                                    >
                                        {joiningId === srv.id ? '...' : 'Join'}
                                    </button>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>,

        document.body
    );
};

// --- Styles ---

const overlay = {
    position: 'fixed',
    inset: 0,
    zIndex: 99999,

    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(4px)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const modal = {
    background: '#1e1f22',

    width: '520px',
    maxWidth: '92vw',

    display: 'flex',
    flexDirection: 'column',

    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
};

const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: '16px',
};

const closeBtn = {
    background: 'none',
    border: 'none',
    color: '#b5bac1',

    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px 8px',

    borderRadius: '4px',
};

const section = {
    background: '#111214',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '12px',
};

const joinBtn = {
    background: '#23a559',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',

    padding: '8px 18px',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',

    whiteSpace: 'nowrap',
};

const retryBtn = {
    background: '#5865f2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',

    padding: '8px 16px',
    fontWeight: 600,
    cursor: 'pointer',
};

const listContainer = {
    flex: 1,
    overflowY: 'auto',
    minHeight: 0,
};

const serverRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: '#111214',
    padding: '10px 12px',
    borderRadius: '8px',

    marginBottom: '8px',
    border: '1px solid #2a2d31',
};

const avatar = {
    width: 38,
    height: 38,
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0,
};

const avatarFallback = {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#5865f2',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: '#fff',
    fontWeight: 700,
    fontSize: '13px',
    flexShrink: 0,
};

const infoText = {
    color: '#b5bac1',
    textAlign: 'center',
    padding: '24px',
    fontStyle: 'italic',
};

JoinServerModal.propTypes = {
    isOpen: PropTypes.bool,

    onClose: PropTypes.func,
};

export default JoinServerModal;
