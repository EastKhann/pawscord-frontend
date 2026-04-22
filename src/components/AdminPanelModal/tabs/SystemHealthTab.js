import React from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import { FaChartLine, FaClock, FaDatabase, FaMemory, FaWifi } from 'react-icons/fa';
import styles from '../styles';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';

const SystemHealthTab = () => {
    const { systemHealth } = useAdminAPIContext();
    const { t } = useTranslation();
    return (
        <div aria-label={t('admin.systemHealthTab', 'System health tab')}>
            <h2 className={css.sectionTitle}>{t('admin.panel.systemHealth')}</h2>

            {/* Health Bars */}
            <div className={css.grid3col}>
                {[
                    { label: 'CPU', value: systemHealth?.cpu || 0, color: '#23a559' },
                    { label: 'Bellek', value: systemHealth?.memory || 0, color: '#5865f2' },
                    { label: 'Disk', value: systemHealth?.disk || 0, color: '#f0b132' },
                ].map((item, idx) => (
                    <div key={`item-${idx}`} style={styles.statCard}>
                        <div className="flex-between-mb8">
                            <span className={css.labelLg}>{item.label}</span>
                            <span
                                style={{
                                    color: item.value > 80 ? '#e74c3c' : item.color,
                                    fontWeight: '700',
                                }}
                            >
                                {item.value}%
                            </span>
                        </div>
                        <div className="progress-track">
                            <div
                                style={{
                                    width: `${item.value}%`,
                                    height: '100%',
                                    borderRadius: '4px',
                                    backgroundColor: item.value > 80 ? '#e74c3c' : item.color,
                                    transition: 'width 0.5s',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* System Info */}
            <div className="grid-5col-12">
                {[
                    {
                        label: 'Uptime',
                        value: systemHealth?.uptime,
                        icon: <FaClock color="#5865f2" />,
                    },
                    {
                        label: t('admin.panel.connectedCount'),
                        value: systemHealth?.activeConnections,
                        icon: <FaWifi color="#23a559" />,
                    },
                    {
                        label: t('admin.panel.requestsPerMin'),
                        value: systemHealth?.requestsThuMinute,
                        icon: <FaChartLine color="#f0b132" />,
                    },
                    {
                        label: t('admin.panel.dbConnections'),
                        value: systemHealth?.dbConnections,
                        icon: <FaDatabase color="#5865f2" />,
                    },
                    {
                        label: 'Cache Hit',
                        value: `${systemHealth?.cacheHitRate}%`,
                        icon: <FaMemory color="#e74c3c" />,
                    },
                ].map((item, idx) => (
                    <div key={`item-${idx}`} style={styles.statCardCenterInl}>
                        <div className="mb-8">{item.icon}</div>
                        <div className="white-bold-18">{item.value || '---'}</div>
                        <div className={css.labelSm}>{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SystemHealthTab;
