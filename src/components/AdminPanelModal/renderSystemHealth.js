/* eslint-disable no-irregular-whitespace */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import { FaChartLine, FaClock, FaDatabase, FaMemory, FaWifi } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

const S = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
    },
};

// Extracted from AdminPanelModal.js
const renderSystemHealth = () => {
    const { t } = useTranslation();
    return (
        <div aria-label="render system health">
            <h2 className="white-18-mb16">{t('💚_sistem_sağlığı')}</h2>

            {/* Health Bars */}
            <div style={S.grid}>
                {[
                    {
                        label: t('admin.health.cpu', 'CPU'),
                        value: systemHealth?.cpu || 0,
                        color: '#23a559',
                    },
                    {
                        label: t('admin.health.memory', 'Bellek'),
                        value: systemHealth?.memory || 0,
                        color: '#5865f2',
                    },
                    {
                        label: t('admin.health.disk', 'Disk'),
                        value: systemHealth?.disk || 0,
                        color: '#f0b132',
                    },
                ].map((item, idx) => (
                    <div key={`item-${idx}`} style={styles.statCard}>
                        <div className="flex-between-mb8">
                            <span className="white-bold-13">{item.label}</span>
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
                        label: t('admin.health.uptime', 'Çalışma Süresi'),
                        value: systemHealth?.uptime,
                        icon: <FaClock color="#5865f2" />,
                    },
                    {
                        label: t('ui.connectti'),
                        value: systemHealth?.activeConnections,
                        icon: <FaWifi color="#23a559" />,
                    },
                    {
                        label: t('admin.panel.requestsPerMin'),
                        value: systemHealth?.requestsThuMinute,
                        icon: <FaChartLine color="#f0b132" />,
                    },
                    {
                        label: t('ui.db_baglanti'),
                        value: systemHealth?.dbConnections,
                        icon: <FaDatabase color="#5865f2" />,
                    },
                    {
                        label: t('admin.health.cacheHit', 'Önbellekleme Oranı'),
                        value: `${systemHealth?.cacheHitRate}%`,
                        icon: <FaMemory color="#e74c3c" />,
                    },
                ].map((item, idx) => (
                    <div key={`item-${idx}`} style={styles.statCardCenterInl}>
                        <div className="mb-8">{item.icon}</div>
                        <div className="white-bold-18">{item.value || '---'}</div>
                        <div className="text-gray6b-10">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

renderSystemHealth.propTypes = {};
