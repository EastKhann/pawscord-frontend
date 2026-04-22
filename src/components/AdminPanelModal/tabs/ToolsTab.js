import React from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import { FaBroom, FaBug, FaCloudUploadAlt, FaFileExport, FaSync, FaTerminal } from 'react-icons/fa';
import styles from '../styles';
import toast from '../../../utils/toast';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';

const ToolsTab = () => {
    const { handleBackup, handleClearCache } = useAdminAPIContext();
    const { t } = useTranslation();
    return (
        <div aria-label={t('admin.toolsTab', 'Tools tab')}>
            <h2 className={css.sectionTitle}>{t('admin.panel.tools')}</h2>

            <div className="grid-3col">
                {[
                    {
                        icon: <FaCloudUploadAlt />,
                        title: 'Yedekle',
                        desc: t('adminTools.backupDb', 'Backup Database'),
                        color: '#5865f2',
                        action: handleBackup,
                    },
                    {
                        icon: <FaBroom />,
                        title: 'Cache Clear',
                        desc: t('admin.panel.cacheCleared'),
                        color: '#f0b132',
                        action: handleClearCache,
                    },
                    {
                        icon: <FaSync />,
                        title: 'Restart',
                        desc: t('admin.panel.restarted'),
                        color: '#e74c3c',
                        action: () => toast.info(t('adminTools.restart')),
                    },
                    {
                        icon: <FaTerminal />,
                        title: 'Console',
                        desc: t('admin.panel.consoleTodo'),
                        color: '#23a559',
                        action: () => toast.info(t('adminTools.console')),
                    },
                    {
                        icon: <FaBug />,
                        title: 'Debug Mode',
                        desc: t('admin.panel.debugTodo'),
                        color: '#5865f2',
                        action: () => toast.info(t('adminTools.debug')),
                    },
                    {
                        icon: <FaFileExport />,
                        title: t('adminTools.export', 'Export'),
                        desc: t('adminTools.exportData', 'Export Data'),
                        color: '#1abc9c',
                        action: handleBackup,
                    },
                ].map((item, idx) => (
                    <div
                        key={`item-${idx}`}
                        style={styles.statCardBtn}
                        role="button"
                        tabIndex={0}
                        onClick={item.action}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div className="flex-align-12">
                            <div style={{ fontSize: '24px', color: item.color }}>{item.icon}</div>
                            <div>
                                <div className={css.labelLg}>{item.title}</div>
                                <div className={css.textGray11}>{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ToolsTab;
