// frontend/src/components/QuickActionsMenu.js
import React from 'react';
import {
    FaUserShield, FaLink, FaHistory, FaFileExport,
    FaUsers, FaChartBar, FaTools, FaBan
} from 'react-icons/fa';

const QuickActionsMenu = ({
    onClose,
    isAdmin,
    onOpenWebhooks,
    onOpenModerator,
    onExportData,
    onShowAuditLogs,
    onShowReports
}) => {
    const adminActions = [
        { icon: FaUserShield, label: 'Moderatör Araçları', onClick: onOpenModerator, color: '#f04747' },
        { icon: FaLink, label: 'Webhook Yönetimi', onClick: onOpenWebhooks, color: '#5865f2' },
        { icon: FaHistory, label: 'Audit Logları', onClick: onShowAuditLogs, color: '#faa61a' },
        { icon: FaBan, label: 'Raporları Görüntüle', onClick: onShowReports, color: '#f04747' },
        { icon: FaFileExport, label: 'Veri Dışa Aktar', onClick: onExportData, color: '#43b581' },
        { icon: FaChartBar, label: 'Sunucu İstatistikleri', onClick: () => window.open('/analytics', '_blank'), color: '#f0b132' }
    ];

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.menu} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.title}>⚡ Hızlı İşlemler</h3>
                <div style={styles.actions}>
                    {adminActions.map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                action.onClick?.();
                                onClose();
                            }}
                            style={{ ...styles.actionButton, backgroundColor: action.color }}
                        >
                            <action.icon style={{ fontSize: '1.2em' }} />
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
    },
    menu: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '20px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
    },
    title: {
        color: 'white',
        margin: '0 0 15px 0',
        fontSize: '1.2em',
        textAlign: 'center'
    },
    actions: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px'
    },
    actionButton: {
        padding: '15px 10px',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9em',
        transition: 'transform 0.2s',
        ':hover': {
            transform: 'scale(1.05)'
        }
    }
};

export default React.memo(QuickActionsMenu);


