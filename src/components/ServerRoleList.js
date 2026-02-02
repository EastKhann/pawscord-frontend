// frontend/src/components/ServerRoleList.js

import React from 'react';
import { FaTrash, FaShieldAlt } from 'react-icons/fa';

const ServerRoleList = ({ roles, onDelete }) => {
    if (!roles || roles.length === 0) {
        return (
            <div style={styles.emptyState}>
                <p>Henüz oluşturulmuş bir rol yok.</p>
            </div>
        );
    }

    return (
        <div style={styles.listContainer}>
            {roles.map((role) => (
                <div key={role.id} style={{ ...styles.roleItem, borderLeftColor: role.color }}>
                    <div style={styles.roleInfo}>
                        <FaShieldAlt style={{ color: role.color, marginRight: '10px' }} />
                        <span style={{ color: role.color, fontWeight: 'bold' }}>{role.name}</span>
                        <span style={styles.memberCount}>
                            ({role.member_count !== undefined ? role.member_count : 0} üye)
                        </span>
                    </div>

                    <button
                        onClick={() => onDelete(role.id)}
                        style={styles.deleteButton}
                        title="Rolü Sil"
                    >
                        <FaTrash />
                    </button>
                </div>
            ))}
        </div>
    );
};

const styles = {
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '10px',
        maxHeight: '200px',
        overflowY: 'auto',
        paddingRight: '5px'
    },
    roleItem: {
        backgroundColor: '#2b2d31',
        padding: '10px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeft: '4px solid #99aab5' // Varsayılan, inline style ile ezilir
    },
    roleInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    memberCount: {
        color: '#949ba4',
        fontSize: '0.8em',
        marginLeft: '8px'
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: '#da373c',
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s'
    },
    emptyState: {
        padding: '20px',
        textAlign: 'center',
        color: '#949ba4',
        fontStyle: 'italic',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '8px'
    }
};

export default ServerRoleList;

