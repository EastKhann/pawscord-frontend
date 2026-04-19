import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FaUsers,
    FaTimes,
    FaCog,
    FaShieldAlt,
    FaGavel,
    FaUserCheck,
    FaToggleOn,
    FaToggleOff,
    FaSave,
} from 'react-icons/fa';
import useCommunitySettings, {
    VERIFICATION_LEVELS,
    CONTENT_FILTERS,
} from '../CommunitySettingsPanel/useCommunitySettings';
import GeneralSettings from '../CommunitySettingsPanel/GeneralSettings';
import RulesSettings from '../CommunitySettingsPanel/RulesSettings';
import ScreeningSettings from '../CommunitySettingsPanel/ScreeningSettings';
import SafetySettings from '../CommunitySettingsPanel/SafetySettings';
import './CommunitySettingsPanel.css';
import { useTranslation } from 'react-i18next';

const TABS = [
    { key: 'general', label: 'General', Icon: FaCog },
    { key: 'rules', label: 'Kurallar', Icon: FaGavel },
    { key: 'screening', label: 'Member Screening', Icon: FaUserCheck },
    { key: 'safety', label: 'Security', Icon: FaShieldAlt },
];

const CommunitySettingsPanel = ({ apiBaseUrl, serverId, onClose }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const state = useCommunitySettings(apiBaseUrl, serverId);

    if (state.loading) {
        return (
            <div
                className="community-settings-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="community-settings-panel"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="loading">Uploadniyor...</div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="community-settings-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="community-settings-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="panel-header">
                    <h2>
                        <FaUsers /> Topluluk Ayarları
                    </h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="community-toggle">
                    <div className="toggle-info">
                        <span className="toggle-label">Topluluk Sunucusu</span>
                        <span className="toggle-description">
                            Community özelliklerini aktifleştir (keşfet, kar{''}lama ekranı vb.)
                        </span>
                    </div>
                    <button
                        aria-label="Action button"
                        className={`toggle-btn ${state.settings.is_community ? 'active' : ''}`}
                        onClick={() =>
                            state.setSettings((prev) => ({
                                ...prev,
                                is_community: !prev.is_community,
                            }))
                        }
                    >
                        {state.settings.is_community ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                </div>

                <div className="tabs">
                    {TABS.map(({ key, label, Icon }) => (
                        <button
                            aria-label="Switch tab"
                            key={key}
                            className={`tab ${state.activeTab === key ? 'active' : ''}`}
                            onClick={() => state.setActiveTab(key)}
                        >
                            <Icon /> {label}
                        </button>
                    ))}
                </div>

                <div className="panel-content">
                    {state.activeTab === 'general' && (
                        <GeneralSettings
                            settings={state.settings}
                            setSettings={state.setSettings}
                            channels={state.channels}
                        />
                    )}
                    {state.activeTab === 'rules' && (
                        <RulesSettings
                            rules={state.rules}
                            onAdd={state.addRule}
                            onUpdate={state.updateRule}
                            onRemove={state.removeRule}
                        />
                    )}
                    {state.activeTab === 'screening' && (
                        <ScreeningSettings
                            questions={state.screeningQuestions}
                            onAdd={state.addQuestion}
                            onUpdate={state.updateQuestion}
                            onRemove={state.removeQuestion}
                        />
                    )}
                    {state.activeTab === 'safety' && (
                        <SafetySettings
                            settings={state.settings}
                            setSettings={state.setSettings}
                            verificationLevels={VERIFICATION_LEVELS}
                            contentFilters={CONTENT_FILTERS}
                        />
                    )}
                </div>

                <div className="panel-footer">
                    <button aria-label="on Close" className="cancel-btn" onClick={onClose}>
                        İptal
                    </button>
                    <button
                        aria-label="state save Settings"
                        className="save-btn"
                        onClick={state.saveSettings}
                        disabled={state.saving}
                    >
                        <FaSave /> {state.saving ? t('panels.saving') : t('common.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

CommunitySettingsPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default CommunitySettingsPanel;
