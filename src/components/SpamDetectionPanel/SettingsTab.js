import { FaShieldAlt, FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { getPatternIcon, getActionColor, PATTERN_LABELS, ACTION_LABELS } from './constants';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const SettingsTab = ({
    settings,
    isAdmin,
    onSensitivityChange,
    onPatternToggle,
    onActionToggle,
    onToggleEnabled,
    onSave,
}) => {
    const { t } = useTranslation();
    const toggleBtnStyle = {
        ...styles.toggleButton,
        backgroundColor: settings.enabled ? '#23a559' : '#949ba4',
    };
    return (
        <div aria-label={t('spamDetection.settingsTab', 'Settings tab')} style={styles.content}>
            {/* Enable/Disable */}
            <div style={styles.settingRow}>
                <div style={styles.settingInfo}>
                    <FaShieldAlt size={18} color="#23a559" />
                    <div>
                        <div style={styles.settingTitle}>{t('spam_koruması')}</div>
                        <div style={styles.settingDesc}>
                            {t('otomatik_spam_algılama_ve_önleme')}
                        </div>
                    </div>
                </div>
                <button style={toggleBtnStyle} onClick={onToggleEnabled}>
                    {settings.enabled ? <FaCheck /> : <FaTimes />}
                </button>
            </div>

            {/* Sensitivity */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t('hassasiyet_levelsi')}</h3>
                <div style={styles.sensitivityGrid}>
                    {[
                        { key: 'low', labelKey: 'spamDetection.sensitivityLow', label: '🐢 Low' },
                        {
                            key: 'medium',
                            labelKey: 'spamDetection.sensitivityMedium',
                            label: '⚖️ Medium',
                        },
                        {
                            key: 'high',
                            labelKey: 'spamDetection.sensitivityHigh',
                            label: '🔥 High',
                        },
                        {
                            key: 'aggressive',
                            labelKey: 'spamDetection.sensitivityAggressive',
                            label: '⚡ Aggressive',
                        },
                    ].map(({ key, labelKey, label }) => {
                        const sensStyle = {
                            ...styles.sensitivityButton,
                            backgroundColor: settings.sensitivity === key ? '#5865f2' : '#1e2024',
                            borderColor: settings.sensitivity === key ? '#5865f2' : 'transparent',
                        };
                        return (
                            <button
                                key={key}
                                style={sensStyle}
                                onClick={() => onSensitivityChange(key)}
                            >
                                {t(labelKey, label)}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Detection Patterns */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t('algılama_kalıpları')}</h3>
                <div style={styles.patternsGrid}>
                    {Object.entries(settings.patterns).map(([pattern, enabled]) => {
                        const miniToggleStyle = {
                            ...styles.miniToggle,
                            backgroundColor: enabled ? '#23a559' : '#949ba4',
                        };
                        return (
                            <div key={pattern} style={styles.patternItem}>
                                <div style={styles.patternInfo}>
                                    {getPatternIcon(pattern)}
                                    <span>
                                        {t(
                                            (PATTERN_LABELS[pattern] || {}).key,
                                            (PATTERN_LABELS[pattern] || {}).fallback || pattern
                                        )}
                                    </span>
                                </div>
                                <button
                                    style={miniToggleStyle}
                                    onClick={() => onPatternToggle(pattern)}
                                >
                                    {enabled ? <FaCheck size={10} /> : <FaTimes size={10} />}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Actions */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t('otomatik_eylemler')}</h3>
                <div style={styles.actionsGrid}>
                    {Object.entries(settings.actions).map(([action, enabled]) => {
                        const actionDotStyle = {
                            ...styles.actionDot,
                            backgroundColor: getActionColor(action),
                        };
                        const actionToggleStyle = {
                            ...styles.miniToggle,
                            backgroundColor: enabled ? '#23a559' : '#949ba4',
                        };
                        return (
                            <div key={action} style={styles.actionItem}>
                                <div style={styles.actionInfo}>
                                    <div style={actionDotStyle} />
                                    <span>
                                        {t(
                                            (ACTION_LABELS[action] || {}).key,
                                            (ACTION_LABELS[action] || {}).fallback || action
                                        )}
                                    </span>
                                </div>
                                <button
                                    style={actionToggleStyle}
                                    onClick={() => onActionToggle(action)}
                                >
                                    {enabled ? <FaCheck size={10} /> : <FaTimes size={10} />}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isAdmin && (
                <button style={styles.saveButton} onClick={onSave}>
                    <FaCheck /> {t('spamDetection.saveSettings', 'Save Settings')}
                </button>
            )}
        </div>
    );
};

SettingsTab.propTypes = {
    settings: PropTypes.object,
    isAdmin: PropTypes.bool,
    onSensitivityChange: PropTypes.func,
    onPatternToggle: PropTypes.func,
    onActionToggle: PropTypes.func,
    onToggleEnabled: PropTypes.func,
    onSave: PropTypes.func,
};
export default SettingsTab;
