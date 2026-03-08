import { FaShieldAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { getPatternIcon, getActionColor, PATTERN_LABELS, ACTION_LABELS } from './constants';
import styles from './styles';

const SettingsTab = ({ settings, isAdmin, onSensitivityChange, onPatternToggle, onActionToggle, onToggleEnabled, onSave }) => (
    <div style={styles.content}>
        {/* Enable/Disable */}
        <div style={styles.settingRow}>
            <div style={styles.settingInfo}>
                <FaShieldAlt size={18} color="#23a559" />
                <div>
                    <div style={styles.settingTitle}>Spam Koruması</div>
                    <div style={styles.settingDesc}>Otomatik spam algılama ve önleme</div>
                </div>
            </div>
            <button
                style={{ ...styles.toggleButton, backgroundColor: settings.enabled ? '#23a559' : '#949ba4' }}
                onClick={onToggleEnabled}
            >
                {settings.enabled ? <FaCheck /> : <FaTimes />}
            </button>
        </div>

        {/* Sensitivity */}
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Hassasiyet Seviyesi</h3>
            <div style={styles.sensitivityGrid}>
                {[
                    { key: 'low', label: '🐢 Düşük' },
                    { key: 'medium', label: '⚖️ Orta' },
                    { key: 'high', label: '🔥 Yüksek' },
                    { key: 'aggressive', label: '⚡ Agresif' }
                ].map(({ key, label }) => (
                    <button key={key}
                        style={{
                            ...styles.sensitivityButton,
                            backgroundColor: settings.sensitivity === key ? '#5865f2' : '#1e2024',
                            borderColor: settings.sensitivity === key ? '#5865f2' : 'transparent'
                        }}
                        onClick={() => onSensitivityChange(key)}
                    >{label}</button>
                ))}
            </div>
        </div>

        {/* Detection Patterns */}
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Algılama Kalıpları</h3>
            <div style={styles.patternsGrid}>
                {Object.entries(settings.patterns).map(([pattern, enabled]) => (
                    <div key={pattern} style={styles.patternItem}>
                        <div style={styles.patternInfo}>
                            {getPatternIcon(pattern)}
                            <span>{PATTERN_LABELS[pattern] || pattern}</span>
                        </div>
                        <button
                            style={{ ...styles.miniToggle, backgroundColor: enabled ? '#23a559' : '#949ba4' }}
                            onClick={() => onPatternToggle(pattern)}
                        >
                            {enabled ? <FaCheck size={10} /> : <FaTimes size={10} />}
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {/* Actions */}
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Otomatik Eylemler</h3>
            <div style={styles.actionsGrid}>
                {Object.entries(settings.actions).map(([action, enabled]) => (
                    <div key={action} style={styles.actionItem}>
                        <div style={styles.actionInfo}>
                            <div style={{ ...styles.actionDot, backgroundColor: getActionColor(action) }} />
                            <span>{ACTION_LABELS[action] || action}</span>
                        </div>
                        <button
                            style={{ ...styles.miniToggle, backgroundColor: enabled ? '#23a559' : '#949ba4' }}
                            onClick={() => onActionToggle(action)}
                        >
                            {enabled ? <FaCheck size={10} /> : <FaTimes size={10} />}
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {isAdmin && (
            <button style={styles.saveButton} onClick={onSave}>
                <FaCheck /> Ayarları Kaydet
            </button>
        )}
    </div>
);

export default SettingsTab;
