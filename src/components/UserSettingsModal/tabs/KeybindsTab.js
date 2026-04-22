import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import importedS from '../styles';

const S = {
    ...importedS,
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
    },
};

const KeybindsTab = () => {
    const { t } = useTranslation();
    const SHORTCUTS = [
        { keys: 'Ctrl + K', descKey: 'quickSwitch' },
        { keys: 'Ctrl + Shift + M', descKey: 'muteToggle' },
        { keys: 'Ctrl + Shift + D', descKey: 'deafenToggle' },
        { keys: 'Ctrl + Enter', descKey: 'sendMessage' },
        { keys: 'Shift + Enter', descKey: 'newLine' },
        { keys: '↑', descKey: 'editLastMessage' },
        { keys: 'Escape', descKey: 'cancelEdit' },
        { keys: 'Ctrl + T', descKey: 'templates' },
        { keys: 'Ctrl + B', descKey: 'bold' },
        { keys: 'Ctrl + I', descKey: 'italic' },
        { keys: 'Ctrl + U', descKey: 'underline' },
    ];
    return (
        <div aria-label={t('settings.keybindsTab', 'Key bindings tab')}>
            <SettingSection title={t('settings.tabs.keybinds.keyboardShortcuts')}>
                {SHORTCUTS.map((s) => (
                    <div key={s.keys} style={S.flex}>
                        <span className="text-dbd-14n">
                            {t('settings.tabs.keybinds.' + s.descKey)}
                        </span>
                        <kbd style={S.kbd}>{s.keys}</kbd>
                    </div>
                ))}
            </SettingSection>
        </div>
    );
};

KeybindsTab.propTypes = {};
export default KeybindsTab;
