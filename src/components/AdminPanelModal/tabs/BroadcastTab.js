import React from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import { FaClock, FaPaperPlane } from 'react-icons/fa';
import styles from '../styles';
import toast from '../../../utils/toast';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';

const BroadcastTab = () => {
    const { announceText, handleBroadcast, setAnnounceText } = useAdminAPIContext();
    const { t } = useTranslation();
    return (
        <div>
            <h2 className={css.sectionTitle}>{t('📢_duyuru_merkezi')}</h2>

            <div style={styles.statCard}>
                <h3 className={css.cardTitleSm}>{t('yeni_duyuru')}</h3>
                <textarea
                    value={announceText}
                    onChange={(e) => setAnnounceText(e.target.value)}
                    placeholder={t('admin.panel.broadcastPlaceholder')}
                    className={css.broadcastTextarea}
                />
                <div className="flex-gap-10">
                    <button
                        aria-label={t('admin.sendBroadcast', 'Send broadcast')}
                        onClick={handleBroadcast}
                        style={styles.actionBtnBlueLg}
                    >
                        <FaPaperPlane /> {t('admin.send', 'Send')}
                    </button>
                    <button
                        aria-label={t('admin.scheduleBroadcast', 'Schedule broadcast')}
                        style={styles.actionBtnGrayLg}
                        onClick={() => toast.info(t('common.comingSoon'))}
                    >
                        <FaClock /> {t('admin.schedule', 'Schedule')}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default BroadcastTab;
