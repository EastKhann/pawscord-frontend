import React from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaLock, FaUnlock } from 'react-icons/fa';
import styles from '../styles';
import css from './AdminTabs.module.css';

const SecurityTab = () => {
    const { maintenanceMode, toggleMaintenance } = useAdminAPIContext();
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
        <div>
            <h2 className={css.sectionTitle}>{t('🔒_security_merkezi')}</h2>

            <div style={maintenanceCardStyle}>
                <div className={css.flexBetween}>
                    <div className="flex-align-12">
                        <FaCheckCircle size={24} color={maintenanceMode ? '#f0b132' : '#23a559'} />
                        <div>
                            <div style={maintenanceTextStyle}>
                                {maintenanceMode
                                    ? t('admin.panel.maintenanceActive')
                                    : t('admin.panel.systemSafe')}
                            </div>
                            <div className={css.textGray12}>{t('son_tsearch_5_minutes_ago')}</div>
                        </div>
                    </div>
                    <button
                        aria-label="Toggle maintenance mode"
                        onClick={toggleMaintenance}
                        style={styles.actionBtn(maintenanceMode ? '#23a559' : '#f0b132')}
                    >
                        {maintenanceMode ? <FaUnlock /> : <FaLock />}{' '}
                        {maintenanceMode ? 'Close' : t('common.maintenance')}
                    </button>
                </div>
            </div>

            <div className="grid-3col">
                {[
                    { label: 'Giriş Denemesi', value: '247', sub: 'Son 24 saat', color: '#5865f2' },
                    { label: 'Başarısız Giriş', value: '12', sub: 'Son 24 saat', color: '#f0b132' },
                    { label: 'Engellenen IP', value: '15', sub: 'Aktif', color: '#e74c3c' },
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
                            <div className={css.textGray11}>{item.sub}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default SecurityTab;
