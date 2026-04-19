import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import styles from '../styles';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';
import { useAdminAPIContext } from '../AdminAPIContext';

const ServersTab = () => {
    const { t } = useTranslation();
    const { handleServerDetails, servers, setDeleteConfirm } = useAdminAPIContext();
    return (
        <div>
            <h2 className={css.sectionTitle}>{t('admin.panel.servers')}</h2>
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
                                <div className={css.textGray11Alt}>Owner: {server.owner}</div>
                            </div>
                        </div>
                        <div className="grid-3col-8-mb14">
                            <div style={styles.miniCard}>
                                <div className={css.valuePrimary}>{server.members}</div>
                                <div className={css.labelXs}>{t('member')}</div>
                            </div>
                            <div style={styles.miniCard}>
                                <div className="white-bold-16g">{server.channels}</div>
                                <div className={css.labelXs}>{t('channel')}</div>
                            </div>
                            <div style={styles.miniCard}>
                                <div className={css.valuePrimary}>{server.voice_channels}</div>
                                <div className={css.labelXs}>{t('ses')}</div>
                            </div>
                        </div>
                        <div className="flex-gap-6">
                            <button
                                aria-label="View server details"
                                style={styles.actionBtnBlueBlock}
                                onClick={() => handleServerDetails(server)}
                            >
                                <FaEye /> View
                            </button>
                            <button
                                aria-label="Delete server"
                                style={styles.actionBtnRedBlock}
                                onClick={() =>
                                    setDeleteConfirm({
                                        type: 'server',
                                        id: server.id,
                                        name: server.name,
                                    })
                                }
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ServersTab;
