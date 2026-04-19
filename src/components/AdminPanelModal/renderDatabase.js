/* eslint-disable no-irregular-whitespace */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React from 'react';
import { FaBroom, FaCloudDownloadAlt, FaCloudUploadAlt, FaDatabase } from 'react-icons/fa';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

const S = {
    txt: { fontSize: '24px', fontWeight: '700', color: '#5865f2' },
};

// Extracted from AdminPanelModal.js
const renderDatabase = () => {
    const { t } = useTranslation();
    return (
        <div aria-label="render database">
            <h2 className="white-18-mb16">{t('🗄️_database_yönetimi')}</h2>

            {/* DB Stats */}
            <div className={css.grid3col12Mb20}>
                {dbStats &&
                    Object.entries(dbStats)
                        .filter(([k]) => k !== 'total_size')
                        .map(([key, val], idx) => (
                            <div key={`item-${Math.random()}`} style={styles.statCard}>
                                <div className="flex-between-center">
                                    <div>
                                        <div className={css.textCapWhite14}>
                                            {key.replace('_', ' ')}
                                        </div>
                                        <div className={css.textGray6b11}>{val.size}</div>
                                    </div>
                                    <div style={S.txt}>{val.count?.toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
            </div>

            {/* Total & Actions */}
            <div className="grid-1fr-2fr-16">
                <div className={css.statCardCenter}>
                    <FaDatabase size={40} color="#5865f2" />
                    <div className={css.whiteH28Mt10}>{dbStats?.total_size || '---'}</div>
                    <div className="text-gray6b-12">{t('toplam_size')}</div>
                </div>
                <div style={styles.statCard}>
                    <h3 className="white-mt0-14">{t('🔧_database_actionsi')}</h3>
                    <div className={css.grid2col10Mt14}>
                        <button onClick={handleBackup} className={css.actionBtnBluePad12}>
                            <FaCloudUploadAlt /> {t('admin.db.backup', 'Yedekle')}
                        </button>
                        <button
                            className={css.actionBtnGreenPad12}
                            onClick={() => toast.info(t('ui.geri_load_ozelligi_yakinda'))}
                        >
                            <FaCloudDownloadAlt /> {t('admin.db.restore', 'Geri Yükle')}
                        </button>
                        <button onClick={handleClearCache} className={css.actionBtnOrangePad12}>
                            <FaBroom /> {t('admin.db.clearCache', 'Cache Temizle')}
                        </button>
                        <button className={css.actionBtnRedPad12} onClick={handleDeleteOldLogs}>
                            <MdDelete /> {t('admin.db.deleteOldLogs', 'Eski Logları Sil')}
                        </button>
                    </div>
                    {backupStatus && (
                        <div
                            style={{
                                marginTop: '12px',
                                padding: '10px',
                                borderRadius: '6px',
                                backgroundColor:
                                    backupStatus === 'success'
                                        ? '#23a55920'
                                        : backupStatus === 'error'
                                          ? '#e74c3c20'
                                          : '#5865f220',
                                color:
                                    backupStatus === 'success'
                                        ? '#23a559'
                                        : backupStatus === 'error'
                                          ? '#e74c3c'
                                          : '#5865f2',
                            }}
                        >
                            {backupStatus === 'running' &&
                                t('admin.db.backupRunning', '⏳ Yedekleme devam ediyor...')}
                            {backupStatus === 'success' &&
                                t('admin.db.backupSuccess', '✅ Yedekleme tamamlandı!')}
                            {backupStatus === 'error' &&
                                t('admin.db.backupFailed', '❌ Yedekleme başarısız!')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

renderDatabase.propTypes = {};
