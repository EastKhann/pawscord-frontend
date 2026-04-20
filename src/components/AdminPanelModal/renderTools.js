/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import { FaBroom, FaBug, FaCloudUploadAlt, FaFileExport, FaSync, FaTerminal } from 'react-icons/fa';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

// Extracted from AdminPanelModal.js
const renderTools = () => {
    const { t } = useTranslation();
    return (
        <div aria-label="render tools">
            <h2 className="white-18-mb16">{t('🔧_admin_araçları')}</h2>

            <div className="grid-3col">
                {[
                    {
                        icon: <FaCloudUploadAlt />,
                        title: t('admin.backup'),
                        desc: t('admin.backupDb'),
                        color: '#5865f2',
                        action: handleBackup,
                    },
                    {
                        icon: <FaBroom />,
                        title: t('admin.cacheClear'),
                        desc: t('admin.clearCache'),
                        color: '#f0b132',
                        action: handleClearCache,
                    },
                    {
                        icon: <FaSync />,
                        title: t('admin.restart'),
                        desc: t('ui.servisleri_yeniden_baslat'),
                        color: '#e74c3c',
                        action: () => toast.info(t('admin.serverSideOnly')),
                    },
                    {
                        icon: <FaTerminal />,
                        title: t('admin.console'),
                        desc: t('admin.adminConsole'),
                        color: '#23a559',
                        action: () => toast.info(t('ui.konsol_erisimi_ssh_uzerinden_yapilmalidi')),
                    },
                    {
                        icon: <FaBug />,
                        title: t('admin.debugMode'),
                        desc: t('ui.error_ayiklama'),
                        color: '#5865f2',
                        action: () => toast.info(t('admin.debugDisabled')),
                    },
                    {
                        icon: <FaFileExport />,
                        title: t('admin.export'),
                        desc: t('ui.veri_disa_aktar'),
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
                                <div className="white-bold-13">{item.title}</div>
                                <div className="text-gray6b-11">{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

renderTools.propTypes = {};
