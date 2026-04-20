/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import useModalA11y from '../hooks/useModalA11y';

// -- extracted inline style constants --
const _st1 = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};
const _st2 = {
    background: '#111214',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
    border: '1px solid #0b0e1b',
    width: '90%',
    maxWidth: '450px',
};
const _st3 = { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' };
const _st4 = { margin: 0, fontSize: '1.2em', fontWeight: 700, color: '#fff' };
const _st5 = { margin: '8px 0 0 0', color: '#949ba4', fontSize: '0.9em' };
const _st6 = { padding: '12px', maxHeight: '300px', overflowY: 'auto' };
const _st7 = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '8px',
    transition: 'all 0.15s',
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
    color: '#fff',
    fontWeight: 600,
};
const _st10 = { flex: 1, minWidth: 0 };
const _st11 = { margin: 0, fontSize: '0.95em', fontWeight: 600, color: '#dbdee1' };
const _st12 = { margin: '3px 0 0 0', fontSize: '0.85em', color: '#949ba4' };
const _st13 = { color: '#5865f2', fontWeight: 700 };
const _st14 = {
    padding: '12px 20px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    justifyContent: 'flex-end',
};
const _st15 = {
    padding: '10px 16px',
    background: 'transparent',
    color: '#949ba4',
    border: '1px solid #404249',
    borderRadius: '6px',
    cursor: 'pointer',
};

const InviteToServerModal = ({ inviteToServerModal, servers, onSendInvite, onClose }) => {
    if (!inviteToServerModal || !inviteToServerModal.isOpen) return null;

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Invite to Server' });

    return createPortal(
        <div {...overlayProps} style={_st1}>
            <div {...dialogProps} style={_st2}>
                {/* Header */}
                <div style={_st3}>
                    <h2 style={_st4}>🎫 Invite to Server</h2>
                    <p style={_st5}>
                        Which server would you like to invite{' '}
                        <strong>{inviteToServerModal.username}</strong> to?
                    </p>
                </div>

                {/* Server List */}
                <div style={_st6}>
                    {servers.map((server) => (
                        <div
                            key={server.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`Invite to ${server.name}`}
                            onClick={() => onSendInvite(server.id, inviteToServerModal.username)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') &&
                                onSendInvite(server.id, inviteToServerModal.username)
                            }
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
                                <div style={_st12}>
                                    {server.member_count || server.categories?.length || 0} member
                                </div>
                            </div>
                            <div style={_st13}>→</div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={_st14}>
                    <button aria-label="on Close" onClick={onClose} style={_st15}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

InviteToServerModal.propTypes = {
    inviteToServerModal: PropTypes.object,
    servers: PropTypes.array,
    onSendInvite: PropTypes.func,
    onClose: PropTypes.func,
};
export default InviteToServerModal;
