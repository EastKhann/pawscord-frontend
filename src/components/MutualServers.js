// frontend/src/components/MutualServers.js
// 🔥 FEATURE 32: Mutual servers on user profile
// Shows list of servers shared between current user and viewed profile

import React, { memo } from 'react';
import { FaServer } from 'react-icons/fa';

const MutualServers = ({ servers = [], onServerClick }) => {
    if (servers.length === 0) return null;

    return (
        <div style={S.container}>
            <div style={S.header}>
                <span style={S.title}>ORTAK SUNUCULAR — {servers.length}</span>
            </div>
            <div style={S.list}>
                {servers.map((server) => (
                    <button
                        key={server.id}
                        type="button"
                        style={S.item}
                        onClick={() => onServerClick?.(server)}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                        {server.icon ? (
                            <img src={server.icon} alt="" style={S.icon} />
                        ) : (
                            <div style={S.iconPlaceholder}>
                                <FaServer style={{ fontSize: 12, color: '#b5bac1' }} />
                            </div>
                        )}
                        <span style={S.name}>{server.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const S = {
    container: { padding: '12px 0' },
    header: { marginBottom: 8 },
    title: {
        fontSize: 12, fontWeight: 700, color: '#f2f3f5',
        textTransform: 'uppercase', letterSpacing: '0.5px',
    },
    list: {
        display: 'flex', flexDirection: 'column', gap: 2,
    },
    item: {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 8px', borderRadius: 6,
        border: 'none', background: 'transparent',
        cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.1s', width: '100%',
    },
    icon: {
        width: 28, height: 28, borderRadius: '50%', objectFit: 'cover',
    },
    iconPlaceholder: {
        width: 28, height: 28, borderRadius: '50%',
        backgroundColor: '#5865f2', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
    },
    name: {
        fontSize: 14, color: '#dcddde', fontWeight: 400,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
};

export default memo(MutualServers);
