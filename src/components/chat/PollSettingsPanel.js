import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  FaPoll, FaTimes, FaCog, FaSave, FaUndo, FaVoteYea,
  FaChartBar, FaPlus, FaTrash, FaClock, FaCheckCircle,
  FaLock, FaUsers
} from 'react-icons/fa';
import './PollSettingsPanel.css';
import usePollSettings, { formatTimeRemaining } from '../PollSettingsPanel/usePollSettings';
import SettingsTab from '../PollSettingsPanel/SettingsTab';

const PollSettingsPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { settings, loading, activeTab, setActiveTab, hasChanges, pollTemplates, activePolls, handleSettingChange, saveSettings, resetSettings } = usePollSettings({ serverId, fetchWithAuth, apiBaseUrl });

  if (loading) return (
    <div className="poll-settings-overlay" role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
      <div className="poll-settings-panel" role="button" tabIndex={0} onClick={e => e.stopPropagation()} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
        <div className="loading">{t('poll.loading', 'Loading poll settings...')}</div>
      </div>
    </div>
  );

  return (
    <div className="poll-settings-overlay" role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
      <div className="poll-settings-panel" role="button" tabIndex={0} onClick={e => e.stopPropagation()} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
        <div className="panel-header">
          <div className="header-info"><h2><FaPoll /> {t('poll.title', 'Poll Settings')}</h2><span className="subtitle">{t('poll.subtitle', 'Configure voting and poll options')}</span></div>
          <div className="header-actions">
            {hasChanges && (<><button
              aria-label={t('poll.reset', 'Reset settings')} className="reset-btn" onClick={resetSettings}>{t('poll.reset,'Reset')}</button><button
                aria - label= { t('poll.save', 'Save settings')} className="save-btn" onClick={saveSettings}>{t('poll.save', 'Save Changes')}</button></>)}>
            <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}><FaTimes /></button>
          </div>
        </div>

        <div className="tabs">
          <button
            aria-label={t('poll.settingsTab', 'General settings')} className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}><FaCog /> Genel Ayarlar</button>
          <button
            aria-label={t('poll.templates', 'Templates')} className={activeTab === 'templates' ? 'active' : ''} onClick={() => setActiveTab('templates')}>{t('poll.templates', 'Templates')}</button>
          <button
            aria-label={t('poll.activeTab', 'Active polls')} className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}><FaChartBar /> Aktif Anketler</button>
        </div>

        <div className="panel-content">
          {activeTab === 'settings' && settings && <SettingsTab settings={settings} handleSettingChange={handleSettingChange} />}

          {activeTab === 'templates' && (
            <div className="templates-content">
              <div className="templates-header"><h3>{t('poll.templatesTitle', 'Poll Templates')}</h3><button
                aria-label={t('poll.newTemplate', 'New template')} className="add-template-btn">{t('poll.newTemplate', 'New Template')}</button></div>
              <div className="templates-grid">
                {pollTemplates.map(template => (
                  <div key={template.id} className="template-card">
                    <div className="template-header"><h4>{template.name}</h4><button
                      aria-label={t('common.delete')} className="delete-template"><FaTrash /></button></div>
                    <div className="template-info">
                      <span className="template-duration"><FaClock /> {template.duration}h</span>
                      <span className="template-multi">{template.multi_vote ? <FaCheckCircle /> : <FaLock />}{template.multi_vote ? t('poll.multiVote', 'Multi vote') : t('poll.singleVote', 'Single vote')}</span>
                    </div>
                    <div className="template-options">{template.options.map((opt, i) => <span key={`item-${i}`} className="option-chip">{opt}</span>)}</div>
                    <button
                      aria-label={t('poll.useTemplate', 'Use template')} className="use-template-btn">{t('poll.useTemplate', 'Use Template')}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'active' && (
            <div className="active-polls-content">
              <h3><FaChartBar /> {t('poll.activePolls', 'Active and Current Polls')}</h3>
              {activePolls.length > 0 ? (
                <div className="polls-list">
                  {activePolls.map(poll => (
                    <div key={poll.id} className={`poll-item ${poll.status}`}>
                      <div className="poll-status">{poll.status === 'active' ? <span className="status-badge active"><span className="pulse"></span>Aktif</span> : <span className="status-badge ended">Bitti</span>}</div>
                      <div className="poll-info"><h4>{poll.question}</h4><div className="poll-meta"><span><FaUsers /> {poll.votes} oy</span><span><FaClock /> {formatTimeRemaining(poll.end_time)}</span></div></div>
                      <div className="poll-actions"><button
                        aria-label={t('poll.viewPoll', 'View poll')} className="view-btn">{t('poll.view', 'View')}</button>{poll.status === 'active' && <button
                          aria-label={t('poll.endEarly', 'End poll early')} className="end-btn">Erken Bitir</button>}</div>
                    </div>
                  ))}
                </div>
              ) : <div className="empty-state">Aktif anket yok</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PollSettingsPanel.propTypes = {
  serverId: PropTypes.string,
  onClose: PropTypes.func,
  fetchWithAuth: PropTypes.func,
  apiBaseUrl: PropTypes.string,
};
export default PollSettingsPanel;
