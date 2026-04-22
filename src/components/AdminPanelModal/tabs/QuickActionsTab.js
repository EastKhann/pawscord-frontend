import React from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import styles from '../styles';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';

const QuickActionsTab = () => {
    const { onClose, onOpenAnalytics, onOpenAutoResponder, onOpenVanityURL, onOpenWebhooks } =
        useAdminAPIContext();
    const { t } = useTranslation();
    return (
        <div aria-label={t('admin.quickActionsTab', 'Quick actions tab')}>
            <h2 className={css.sectionTitle}>{t('⚡_quick_actionsler')}</h2>

            <div className="grid-auto-250-12">
                {[
                    {
                        icon: '📊',
                        title: 'Analytics',
                        desc: t('admin.panel.viewAnalytics'),
                        color: '#f0b132',
                        action: onOpenAnalytics,
                    },
                    {
                        icon: '🪝',
                        title: 'Webhooks',
                        desc: t('admin.panel.webhookSettings'),
                        color: '#5865f2',
                        action: onOpenWebhooks,
                    },
                    {
                        icon: '🤖',
                        title: t('admin.panel.autoResponder'),
                        desc: t('admin.panel.autoResponders'),
                        color: '#5865f2',
                        action: onOpenAutoResponder,
                    },
                    {
                        icon: '🔗',
                        title: 'Vanity URL',
                        desc: t('admin.panel.vanityURLs'),
                        color: '#1abc9c',
                        action: onOpenVanityURL,
                    },
                ].map((item, idx) => (
                    <div
                        key={`item-${idx}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            item.action?.();
                            onClose();
                        }}
                        style={{
                            ...styles.statCard,
                            cursor: 'pointer',
                            borderLeft: `4px solid ${item.color}`,
                        }}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div className="flex-align-14">
                            <div className="fs-28">{item.icon}</div>
                            <div>
                                <div className={css.labelMd}>{item.title}</div>
                                <div className={css.textGray11}>{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default QuickActionsTab;
