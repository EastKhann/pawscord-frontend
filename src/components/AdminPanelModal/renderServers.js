/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

// Extracted from AdminPanelModal.js
const renderServers = () => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('admin.servers', 'Servers')}>
            <h2 className="white-18-mb16">{t('🏠_server_yönetimi')}</h2>
            <div className="grid-auto-280-14">
                {servers.map((server) => (
                    <div key={server.id} style={styles.statCardRel}>
                        {server.is_verified && (
                            <div className="pos-abs-tr10">
                                <span style={styles.badge('#23a559')}>{t('✓_approved')}</span>
                            </div>
                        )}
                        <div className="flex-align-12-mb14">
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: `linear-gradient(135deg, hsl(${server.id * 50}, 60%, 45%), hsl(${server.id * 50 + 40}, 60%, 35%))`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontWeight: '700',
                                    fontSize: '18px',
                                }}
                            >
                                {server.name?.charAt(0)}
                            </div>
                            <div>
                                <div className="white-bold-14">{server.name}</div>
                                <div className="text-gray6b-11">
                                    {t('admin.servers.owner', 'Sahip')}: {server.owner}
                                </div>
                            </div>
                        </div>
                        <div className="grid-3col-8-mb14">
                            <div style={styles.miniCard}>
                                <div className="white-bold-16p">{server.members}</div>
                                <div className="text-gray6b-9">{t('member')}</div>
                            </div>
                            <div style={styles.miniCard}>
                                <div className="white-bold-16g">{server.channels}</div>
                                <div className="text-gray6b-9">{t('channel')}</div>
                            </div>
                            <div style={styles.miniCard}>
                                <div className="white-bold-16p">{server.voice_channels}</div>
                                <div className="text-gray6b-9">{t('ses')}</div>
                            </div>
                        </div>
                        <div className="flex-gap-6">
                            <button
                                style={styles.actionBtnBlueBlock}
                                onClick={() => handleServerDetails(server)}
                            >
                                <FaEye /> {t('admin.servers.view', 'Görüntüle')}
                            </button>
                            <button
                                style={styles.actionBtnRedBlock}
                                onClick={() =>
                                    setDeleteConfirm({
                                        type: 'server',
                                        id: server.id,
                                        name: server.name,
                                    })
                                }
                            >
                                <FaTrash /> {t('admin.servers.delete', 'Sil')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

renderServers.propTypes = {};
