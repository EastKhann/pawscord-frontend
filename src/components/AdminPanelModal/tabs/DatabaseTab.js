import React from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import { FaBroom, FaCloudDownloadAlt, FaCloudUploadAlt, FaDatabase } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import styles from '../styles';
import toast from '../../../utils/toast';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';

const DatabaseTab = () => {
    const { backupStatus, dbStats, handleBackup, handleClearCache, handleDeleteOldLogs } =
        useAdminAPIContext();
    const { t } = useTranslation();
    return (
        <div>
            <h2 className={css.sectionTitle}>{t('admin.panel.database')}</h2>

            {/* DB Stats */}
            <div className={css.grid3col}>
                {dbStats &&
                    Object.entries(dbStats)
                        .filter(([k]) => k !== 'total_size')
                        .map(([key, val], idx) => (
                            <div key={`item-${Math.random()}`} style={styles.statCard}>
                                <div className={css.flexBetween}>
                                    <div>
                                        <div className={css.textCapWhite14}>
                                            {key.replace('_', ' ')}
                                        </div>
                                        <div className={css.textGray11}>{val.size}</div>
                                    </div>
                                    <div className={css.valuePrimaryLg}>
                                        {val.count?.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>

            {/* Total & Actions */}
            <div className="grid-1fr-2fr-16">
                <div className={css.statCardCenter}>
                    <FaDatabase size={40} color="#5865f2" />
                    <div className={css.whiteH28Mt10}>{dbStats?.total_size || '---'}</div>
                    <div className={css.textGray12}>{t('toplam_size')}</div>
                </div>
                <div style={styles.statCard}>
                    <h3 className={css.cardTitleSm}>{t('admin.panel.dbOperations')}</h3>
                    <div className={css.grid2col10Mt14}>
                        <button
                            aria-label="Backup database"
                            onClick={handleBackup}
                            className={css.actionBtnBluePad12}
                        >
                            <FaCloudUploadAlt /> Backup
                        </button>
                        <button
                            aria-label="Restore database"
                            className={css.actionBtnGreenPad12}
                            onClick={() => toast.info(t('common.comingSoon'))}
                        >
                            <FaCloudDownloadAlt /> Restore
                        </button>
                        <button
                            aria-label="Clear cache"
                            onClick={handleClearCache}
                            className={css.actionBtnOrangePad12}
                        >
                            <FaBroom /> Cache Clear
                        </button>
                        <button
                            aria-label="Delete old logs"
                            className={css.actionBtnRedPad12}
                            onClick={handleDeleteOldLogs}
                        >
                            <MdDelete /> {t('admin.panel.deleteOldLogs')}
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
                            {backupStatus === 'running' && '⏳ Yedekleme devam ediyor...'}
                            {backupStatus === 'success' && '✅ Backup confirmed!'}
                            {backupStatus === 'error' && t('admin.panel.backupFailed')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DatabaseTab;
