// frontend/src/components/QuickActionsMenu.js
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    FaUserShield,
    FaLink,
    FaHistory,
    FaFileExport,
    FaUsers,
    FaChartBar,
    FaTools,
    FaBan,
} from 'react-icons/fa';

// -- dynamic style helpers (pass 2) --

const S = {
    font: { fontSize: '1.2em' },
};

const QuickActionsMenu = ({
    onClose,
    isAdmin,
    onOpenWebhooks,
    onOpenModerator,
    onExportData,
    onShowAuditLogs,
    onShowReports,
}) => {
    const { t } = useTranslation();
    const adminActions = [
        {
            icon: FaUserShield,
            label: t('ui.moderator_araçlari'),
            onClick: onOpenModerator,
            color: '#f23f42',
        },
        {
            icon: FaLink,
            label: t('ui.webhook_yonetimi'),
            onClick: onOpenWebhooks,
            color: '#5865f2',
        },
        {
            icon: FaHistory,
            label: t('ui.denetim_kayitlari'),
            onClick: onShowAuditLogs,
            color: '#f0b232',
        },
        { icon: FaBan, label: t('ui.raporlari_view'), onClick: onShowReports, color: '#f23f42' },
        {
            icon: FaFileExport,
            label: t('ui.veri_disa_aktar'),
            onClick: onExportData,
            color: '#23a559',
        },
        {
            icon: FaChartBar,
            label: t('ui.server_istatistikleri_2'),
            onClick: () => window.open('/analytics', '_blank'),
            color: '#f0b132',
        },
    ];

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.menu}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <h3 style={styles.title}>⚡ {t('ui.hizli_islemler')}</h3>
                <div style={styles.actions}>
                    {adminActions.map((action, idx) => (
                        <button
                            aria-label="Action button"
                            key={`item-${idx}`}
                            onClick={() => {
                                action.onClick?.();
                                onClose();
                            }}
                            style={{ ...styles.actionButton, backgroundColor: action.color }}
                        >
                            <action.icon style={S.font} />
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
        zIndex: 10000,
    },
    menu: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '20px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
    },
    title: {
        color: 'white',
        margin: '0 0 15px 0',
        fontSize: '1.2em',
        textAlign: 'center',
    },
    actions: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
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
            transform: 'scale(1.05)',
        },
    },
};

QuickActionsMenu.propTypes = {
    onClose: PropTypes.func,
    isAdmin: PropTypes.bool,
    onOpenWebhooks: PropTypes.func,
    onOpenModerator: PropTypes.func,
    onExportData: PropTypes.func,
    onShowAuditLogs: PropTypes.func,
    onShowReports: PropTypes.func,
};
export default React.memo(QuickActionsMenu);
