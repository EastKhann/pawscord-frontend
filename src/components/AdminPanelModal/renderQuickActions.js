/* eslint-disable no-irregular-whitespace */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

// Extracted from AdminPanelModal.js
const renderQuickActions = () => {
    const { t } = useTranslation();
    return (
        <div aria-label="render quick actions">
            <h2 className="white-18-mb16">{t('⚡_quick_actionsler')}</h2>

            <div className="grid-auto-250-12">
                {[
                    {
                        icon: '📊',
                        title: t('admin.quick.analytics', 'Analizler'),
                        desc: t('admin.panel.viewAnalytics'),
                        color: '#f0b132',
                        action: onOpenAnalytics,
                    },
                    {
                        icon: '🪝',
                        title: t('admin.quick.webhooks', 'Webhooks'),
                        desc: t('ui.webhook_ayarları'),
                        color: '#5865f2',
                        action: onOpenWebhooks,
                    },
                    {
                        icon: '🤖',
                        title: t('admin.quick.autoResponder', 'Otomatik Yanıtlayıcı'),
                        desc: t('admin.quick.autoReplies', 'Otomatik yanıtlar'),
                        color: '#5865f2',
                        action: onOpenAutoResponder,
                    },
                    {
                        icon: '🔗',
                        title: t('admin.quick.vanityUrl', 'Vanity URL'),
                        desc: t('ui.ozel_url_ayarlari'),
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
                                <div className="white-bold-14">{item.title}</div>
                                <div className="text-gray6b-11">{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

renderQuickActions.propTypes = {};
