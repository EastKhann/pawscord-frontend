import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

import { FaTimes, FaCompass } from '../utils/iconOptimization';

import { styles } from '../styles/SidebarStyles';

import toast from '../utils/toast';

import { useTranslation } from 'react-i18next';
import useModalA11y from '../hooks/useModalA11y';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --
const _st1 = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
};
const _st2 = { fontSize: '18px', fontWeight: '600', margin: 0, color: '#fff' };
const _st3 = {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#949ba4',
    background: 'none',
    border: 'none',
};
const _st4 = { marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #2a2d31' };
const _st5 = { fontSize: '14px', color: '#b5bac1', margin: '0 0 12px 0' };
const _st6 = { display: 'flex', gap: '8px' };
const _st7 = {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #2a2d31',
    borderRadius: '6px',
    fontSize: '14px',
    background: '#111214',
    color: '#f2f3f5',
    outline: 'none',
};
const _st8 = {
    padding: '10px 16px',
    backgroundColor: '#23a559',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
};
const _st9 = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '16px 0 12px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff',
};
const _st10 = { fontSize: '16px' };
const _st11 = { marginBottom: '16px' };
const _st12 = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #2a2d31',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    background: '#111214',
    color: '#f2f3f5',
    outline: 'none',
};
const _st13 = { textAlign: 'center', color: '#949ba4', fontSize: '14px', padding: '20px' };
const _st14 = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: '400px',
    overflowY: 'auto',
};
const _st15 = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #2a2d31',
    borderRadius: '8px',
    backgroundColor: '#1e1f22',
};
const _st16 = { display: 'flex', alignItems: 'center', gap: '12px', flex: 1 };
const _st17 = { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' };
const _st18 = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#5865f2',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
};
const _st19 = { display: 'flex', flexDirection: 'column', gap: '2px' };
const _st20 = { fontWeight: '600', fontSize: '14px', color: '#f2f3f5' };
const _st21 = { fontSize: '12px', color: '#949ba4' };
const _st22 = {
    backgroundColor: '#23a559',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
};
const _st23 = {
    padding: '6px 12px',
    backgroundColor: '#23a559',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
};
const _st1087 = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
};
const _st1088 = {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    padding: '20px',
    color: '#f2f3f5',
};

const DiscoveryModal = ({
    isOpen,
    onClose,
    publicServers,
    onJoinServer,
    fetchWithAuth,
    apiUrl,
}) => {
    const { t } = useTranslation();

    const [inviteCodeInput, setInviteCodeInput] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    // ✅ Hook must be called unconditionally BEFORE any early return

    const { overlayProps, dialogProps } = useModalA11y({
        onClose: () => {
            setSearchQuery('');
            onClose();
        },
        label: t('discovery.title', 'Discover Servers'),
        isOpen,
    });

    const filteredServers = (publicServers || []).filter(
        (srv) =>
            srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (srv.owner && srv.owner.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleJoinViaCode = async (e) => {
        e.preventDefault();

        if (!inviteCodeInput.trim()) return;

        try {
            const res = await fetchWithAuth(`${apiUrl}/invites/join/`, {
                method: 'POST',

                body: JSON.stringify({ code: inviteCodeInput }),
            });

            const data = await res.json();

            if (res.ok) {
                setInviteCodeInput('');

                onClose();

                toast.success(t('server.joinedNamed', { name: data.server_name }));
            } else {
                toast.error(data.error || t('server.leaveFailed'));
            }
        } catch (error) {
            toast.error(t('server.createConnectionError'));
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div style={_st1087} {...overlayProps}>
            <div style={_st1088} {...dialogProps}>
                <div style={_st1}>
                    <h3 style={_st2}>🌐 {t('joinServer.title', 'Sunucuya Katıl')}</h3>

                    <FaTimes
                        style={_st3}
                        onClick={() => {
                            setSearchQuery('');
                            onClose();
                        }}
                    />
                </div>

                <div style={_st4}>
                    <p style={_st5}>
                        {t(
                            'joinServer.inviteHint',
                            t('discovery.pasteInvite', 'If you have an invite code or link, paste it below.')
                        )}
                    </p>

                    <form onSubmit={handleJoinViaCode} style={_st6}>
                        <input
                            value={inviteCodeInput}
                            onChange={(e) => setInviteCodeInput(e.target.value)}
                            aria-label={t('server.inviteLink', 'Invite Link')}
                            placeholder={t('joinServer.inviteUrlPlaceholder', 'https://pawscord.com/invite/...')}
                            style={_st7}
                        />

                        <button
                            aria-label={t('joinServer.join', 'Katıl')}
                            type="submit"
                            style={_st8}
                        >
                            {t('joinServer.join', 'Katıl')}
                        </button>
                    </form>
                </div>

                <h4 style={_st9}>
                    <FaCompass style={_st10} />{' '}
                    {t('joinServer.discoverCommunities', 'Topluluğu Keşfet')}
                </h4>

                <div style={_st11}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('joinServer.searchPlaceholder', '🔍 Sunucu ara...')}
                        style={_st12}
                        aria-label={t('common.search', 'Search')}
                    />
                </div>

                {filteredServers.length === 0 ? (
                    <p style={_st13}>
                        {!publicServers || publicServers.length === 0
                            ? t(
                                'joinServer.noPublic',
                                t('discovery.noPublicServers', 'There are no public servers you can join right now.')
                            )
                            : t('joinServer.noMatch', 'Aramanızla eşleşen sunucu bulunamadı.')}
                    </p>
                ) : (
                    <div style={_st14}>
                        {filteredServers.map((srv) => (
                            <div key={srv.id} style={_st15}>
                                <div style={_st16}>
                                    {srv.icon ? (
                                        <img
                                            src={`https://www.pawscord.com${srv.icon}`}
                                            alt={`${srv.name} server icon`}
                                            style={_st17}
                                        />
                                    ) : (
                                        <div style={_st18}>
                                            {srv.name.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}

                                    <div style={_st19}>
                                        <div style={_st20}>{srv.name}</div>

                                        <div style={_st21}>
                                            {srv.member_count} Member • Kurucu: {srv.owner}
                                        </div>
                                    </div>
                                </div>

                                {srv.is_member ? (
                                    <span style={_st22}>✓ Membersin</span>
                                ) : (
                                    <button
                                        aria-label={t('joinServer.join', 'Katıl')}
                                        onClick={() => onJoinServer(srv.id)}
                                        style={_st23}
                                    >
                                        {t('common.join', 'Join')}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>,

        document.body
    );
};

DiscoveryModal.propTypes = {
    isOpen: PropTypes.bool,

    onClose: PropTypes.func,

    publicServers: PropTypes.array,

    onJoinServer: PropTypes.func,

    fetchWithAuth: PropTypes.func,

    apiUrl: PropTypes.string,
};

export default DiscoveryModal;
