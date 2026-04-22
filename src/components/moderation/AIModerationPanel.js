import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { getStyles } from '../AIModerationPanel/aiModerationStyles';
import useAIModeration from '../AIModerationPanel/useAIModeration';
import FlagCard from '../AIModerationPanel/FlagCard';

const S = {
    txt: { textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' },
};

const TOGGLES = [
    {
        key: 'spamDetection',
        labelKey: 'aiModeration.spamDetection',
        label: 'Spam Detection',
        descKey: 'aiModeration.spamDetectionDesc',
        desc: 'Detect repeated or mass messages',
    },
    {
        key: 'profanityFilter',
        labelKey: 'aiModeration.profanityFilter',
        label: 'Profanity Filter',
        descKey: 'aiModeration.profanityFilterDesc',
        desc: 'Block offensive language',
    },
    {
        key: 'nsfwDetection',
        labelKey: 'aiModeration.nsfwDetection',
        label: 'NSFW Detection',
        descKey: 'aiModeration.nsfwDetectionDesc',
        desc: 'Detect inappropriate images',
    },
];

const STAT_ITEMS = [
    {
        key: 'messagesScanned',
        labelKey: 'aiModeration.messagesScanned',
        label: 'Messages Scanned',
        fmt: (v) => v.toLocaleString(),
    },
    { key: 'flaggedToday', labelKey: 'aiModeration.flaggedToday', label: 'Flagged Today' },
    { key: 'autoModActions', labelKey: 'aiModeration.autoActions', label: 'Auto Actions' },
    { key: 'accuracy', labelKey: 'aiModeration.accuracy', label: 'Accuracy', suffix: '%' },
];

const AIModerationPanel = ({ serverSlug, token, isMobile }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { settings, setSettings, recentFlags, stats, saveSettings, handleAction } =
        useAIModeration(serverSlug, token);
    const styles = getStyles(isMobile);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>
                    <FaShieldAlt /> {t('aiModeration.title', 'YZ Moderasyon')}
                </h1>
                <p style={styles.subtitle}>
                    {t(
                        'aiModeration.subtitle',
                        t('aiMod.desc', 'Automatic content filtering powered by machine learning')
                    )}
                </p>
            </div>

            <div style={styles.statsGrid}>
                {STAT_ITEMS.map((s) => (
                    <div key={s.key} style={styles.statCard}>
                        <div style={styles.statValue}>
                            {s.fmt ? s.fmt(stats[s.key]) : stats[s.key]}
                            {s.suffix || ''}
                        </div>
                        <div style={styles.statLabel}>{t(s.labelKey, s.label)}</div>
                    </div>
                ))}
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    {t('aiModeration.detectionSettings', '⚙️ Detection Settings')}
                </h2>
                {TOGGLES.map((toggle) => (
                    <div key={toggle.key} style={styles.setting}>
                        <div style={styles.settingInfo}>
                            <div style={styles.settingLabel}>
                                {t(toggle.labelKey, toggle.label)}
                            </div>
                            <div style={styles.settingDesc}>{t(toggle.descKey, toggle.desc)}</div>
                        </div>
                        <div
                            style={styles.switch(settings[toggle.key])}
                            role="switch"
                            aria-checked={settings[toggle.key]}
                            aria-label={toggle.label}
                            tabIndex={0}
                            onClick={() =>
                                setSettings({ ...settings, [toggle.key]: !settings[toggle.key] })
                            }
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSettings((s) => ({ ...s, [toggle.key]: !s[toggle.key] }));
                                }
                            }}
                        >
                            <div style={styles.switchKnob(settings[toggle.key])} />
                        </div>
                    </div>
                ))}
                <div style={styles.setting}>
                    <div style={styles.settingInfo}>
                        <div style={styles.settingLabel}>
                            {t('aiModeration.toxicityThreshold', 'Toksisite Eşiği')}:{' '}
                            {settings.toxicityThreshold}%
                        </div>
                        <div style={styles.settingDesc}>
                            {t(
                                'aiModeration.toxicityDesc',
                                t('aiMod.sensitivityDesc', 'Sensitivity level for toxic content')
                            )}
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.toxicityThreshold}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                toxicityThreshold: parseInt(e.target.value),
                            })
                        }
                        style={styles.slider}
                    />
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <FaExclamationTriangle /> {t('aiModeration.recentFlags', 'Son İşaretlemeler')} (
                    {recentFlags.length})
                </h2>
                {recentFlags.length === 0 ? (
                    <div style={S.txt}>
                        <FaCheckCircle size={48} />
                        <p className="mt-16">
                            {t('aiModeration.noViolations', 'Son ihlal tespit edilmedi')}
                        </p>
                    </div>
                ) : (
                    <div style={styles.flagsList}>
                        {recentFlags.map((flag) => (
                            <FlagCard
                                key={flag.id}
                                flag={flag}
                                styles={styles}
                                onAction={handleAction}
                            />
                        ))}
                    </div>
                )}
            </div>

            <button aria-label={t('aiModeration.saveSettings', 'Save settings')} onClick={saveSettings} style={styles.saveBtn}>
                💾 {t('panels.saveSettings')}
            </button>
        </div>
    );
};

AIModerationPanel.propTypes = {
    serverSlug: PropTypes.string,
    token: PropTypes.string,
    isMobile: PropTypes.bool,
};
export default AIModerationPanel;
