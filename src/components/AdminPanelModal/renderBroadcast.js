/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import { FaClock, FaPaperPlane } from 'react-icons/fa';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

// Extracted from AdminPanelModal.js
const renderBroadcast = () => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('admin.broadcast', 'Broadcast')}>
            <h2 className="white-18-mb16">{t('📢_duyuru_merkezi')}</h2>

            <div style={styles.statCard}>
                <h3 className="white-mt0-14">{t('yeni_duyuru')}</h3>
                <textarea
                    value={announceText}
                    onChange={(e) => setAnnounceText(e.target.value)}
                    placeholder={t('ui.tum_kullanicilsearch_gondermek_istedigin')}
                    className={css.broadcastTextarea}
                />
                <div className="flex-gap-10">
                    <button onClick={handleBroadcast} style={styles.actionBtnBlueLg}>
                        <FaPaperPlane /> {t('admin.broadcast.send', 'Gönder')}
                    </button>
                    <button
                        style={styles.actionBtnGrayLg}
                        onClick={() => toast.info(t('ui.zamanli_duyuru_ozelligi_yakinda'))}
                    >
                        <FaClock /> {t('admin.broadcast.schedule', 'Zamanla')}
                    </button>
                </div>
            </div>
        </div>
    );
};

renderBroadcast.propTypes = {};
