/**
 * 🎫 InviteServerModal — Portal modal for inviting a user to a server
 * Extracted from App.js inline JSX
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import toast from '../utils/toast';
import useModalA11y from '../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --
const _st1 = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
};
const _st2 = {
    background: '#1e1f22',
    borderRadius: '12px',
    padding: '24px',
    width: '400px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#f2f3f5',
};
const _st3 = { marginBottom: '16px' };
const _st4 = { margin: '0 0 8px', fontSize: '18px', fontWeight: '700', color: '#fff' };
const _st5 = { color: '#b5bac1', fontSize: '14px', margin: 0 };
const _st6 = { flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' };
const _st7 = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'rgba(255,255,255,0.02)',
    transition: 'background-color 0.15s',
};
const _st8 = { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' };
const _st9 = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#5865f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
    color: '#fff',
    flexShrink: 0,
};
const _st10 = { flex: 1, minWidth: 0 };
const _st11 = {
    color: '#f2f3f5',
    fontWeight: '600',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};
const _st12 = { color: '#949ba4', fontSize: '12px' };
const _st13 = { color: '#949ba4', fontSize: '18px' };
const _st14 = { marginTop: '16px', display: 'flex', justifyContent: 'flex-end' };
const _st15 = {
    padding: '8px 24px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    background: 'rgba(255,255,255,0.07)',
    color: '#f2f3f5',
};

export default function InviteServerModal({
    inviteToServerUser,
    setInviteToServerUser,
    categories,
    fetchWithAuth,
    API_BASE_URL,
}) {
    const { t } = useTranslation();
    const handleClose = () => setInviteToServerUser(null);
    const { overlayProps, dialogProps } = useModalA11y({
        onClose: handleClose,
        isOpen: !!inviteToServerUser,
        label: 'Invite to Server',
    });
    if (!inviteToServerUser) return null;

    return ReactDOM.createPortal(
        <div
            aria-label="invite to server modal"
            role="button"
            tabIndex={-1}
            style={_st1}
            onClick={() => setInviteToServerUser(null)}
            onKeyDown={(e) => e.key === 'Escape' && setInviteToServerUser(null)}
            {...overlayProps}
        >
            <div {...dialogProps} style={_st2}>
                {/* Header */}
                <div style={_st3}>
                    <h2 style={_st4}>🎫 Invite to Server</h2>
                    <p style={_st5}>
                        <strong>{inviteToServerUser.username}</strong> — which server do you want to
                        invite them to?
                    </p>
                </div>

                {/* Server List */}
                <div style={_st6}>
                    {categories.map((server) => (
                        <div
                            key={server.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`Invite to ${server.name}`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click();
                            }}
                            onClick={async () => {
                                try {
                                    const res = await fetchWithAuth(
                                        `${API_BASE_URL}/servers/${server.id}/invite/`,
                                        {
                                            method: 'POST',
                                            body: JSON.stringify({
                                                target_username: inviteToServerUser.username,
                                            }),
                                        }
                                    );
                                    if (res.ok) {
                                        toast.success(
                                            t('dm.inviteSent', {
                                                username: inviteToServerUser.username,
                                            })
                                        );
                                    } else {
                                        const data = await res.json();
                                        if (data.error?.includes('zaten'))
                                            toast.info(
                                                t('dm.alreadyMemberServer', {
                                                    username: inviteToServerUser.username,
                                                })
                                            );
                                        else toast.error(data.error || t('dm.inviteFailed'));
                                    }
                                } catch (error) {
                                    toast.error(t('dm.connectionError'));
                                }
                                setInviteToServerUser(null);
                            }}
                            style={_st7}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                            }}
                        >
                            {server.icon ? (
                                <img src={server.icon} alt={server.name} style={_st8} />
                            ) : (
                                <div style={_st9}>{server.name?.substring(0, 2).toUpperCase()}</div>
                            )}
                            <div style={_st10}>
                                <div style={_st11}>{server.name}</div>
                                <div style={_st12}>{server.member_count || 0} member</div>
                            </div>
                            <div style={_st13}>→</div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={_st14}>
                    <button onClick={() => setInviteToServerUser(null)} style={_st15}>
                        {t('common.cancel')}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

InviteServerModal.propTypes = {
    inviteToServerUser: PropTypes.object,
    setInviteToServerUser: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    fetchWithAuth: PropTypes.func.isRequired,
    API_BASE_URL: PropTypes.string.isRequired,
};
