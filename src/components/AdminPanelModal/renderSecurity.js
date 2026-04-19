/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaLock, FaUnlock } from 'react-icons/fa';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

// Extracted from AdminPanelModal.js
const renderSecurity = () => {
    const { t } = useTranslation();
    const maintenanceCardStyle = {
        ...styles.statCard,
        marginBottom: '16px',
        background: maintenanceMode
            ? 'linear-gradient(135deg, #f0b13220, #e74c3c20)'
            : 'linear-gradient(135deg, #23a55920, #5865f220)',
    };
    const maintenanceTextStyle = {
        color: maintenanceMode ? '#f0b132' : '#23a559',
        fontWeight: '600',
    };
    return (
        <div aria-label="render security">
            <h2 className="white-18-mb16">{t('🔒_security_merkezi')}</h2>

            <div style={maintenanceCardStyle}>
                <div className="flex-between-center">
                    <div className="flex-align-12">
                        <FaCheckCircle size={24} color={maintenanceMode ? '#f0b132' : '#23a559'} />
                        <div>
                            <div style={maintenanceTextStyle}>
                                {maintenanceMode
                                    ? t('ui.bakim_modu_active')
                                    : t('admin.security.systemSecure', '✅ Sistem Güvenli')}
                            </div>
                            <div className="text-gray6b-12">{t('son_tsearch_5_minutes_ago')}</div>
                        </div>
                    </div>
                    <button
                        onClick={toggleMaintenance}
                        style={styles.actionBtn(maintenanceMode ? '#23a559' : '#f0b132')}
                    >
                        {maintenanceMode ? <FaUnlock /> : <FaLock />}{' '}
                        {maintenanceMode
                            ? t('admin.security.close', 'Kapat')
                            : t('common.maintenance')}
                    </button>
                </div>
            </div>

            <div className="grid-3col">
                {[
                    {
                        label: t('admin.security.loginAttempts', 'Giriş Denemesi'),
                        value: '247',
                        sub: t('admin.security.last24h', 'Son 24 saat'),
                        color: '#5865f2',
                    },
                    {
                        label: t('admin.security.failedEntry', 'Başarısız Giriş'),
                        value: '12',
                        sub: t('admin.security.last24h', 'Son 24 saat'),
                        color: '#f0b132',
                    },
                    {
                        label: t('admin.security.blockedIp', 'Engellenen IP'),
                        value: '15',
                        sub: t('admin.security.active', 'Aktif'),
                        color: '#e74c3c',
                    },
                ].map((item, idx) => {
                    const itemColorStyle = {
                        fontSize: '24px',
                        fontWeight: '700',
                        color: item.color,
                    };
                    return (
                        <div key={`item-${idx}`} style={styles.statCard}>
                            <div style={itemColorStyle}>{item.value}</div>
                            <div className="white-bold-13">{item.label}</div>
                            <div className="text-gray6b-11">{item.sub}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

renderSecurity.propTypes = {};
