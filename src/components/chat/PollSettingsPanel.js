import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { settings, loading, activeTab, setActiveTab, hasChanges, pollTemplates, activePolls, handleSettingChange, saveSettings, resetSettings } = usePollSettings({ serverId, fetchWithAuth, apiBaseUrl });

  if (loading) return (
    <div className="poll-settings-overlay" role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
      <div className="poll-settings-panel" role="button" tabIndex={0} onClick={e => e.stopPropagation()} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
        <div className="loading">Anket ayarları yükleniyor...</div>
      </div>
    </div>
  );

  return (
    <div className="poll-settings-overlay" role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
      <div className="poll-settings-panel" role="button" tabIndex={0} onClick={e => e.stopPropagation()} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
        <div className="panel-header">
          <div className="header-info"><h2><FaPoll /> Anket Ayarları</h2><span className="subtitle">Oylama ve anket seçeneklerini yapılandır</span></div>
          <div className="header-actions">
            {hasChanges && (<><button
              aria-label="reset Settings" className="reset-btn" onClick={resetSettings}><FaUndo /> Sıfırla</button><button
                aria-label="save Settings" className="save-btn" onClick={saveSettings}><FaSave /> Değişiklikleri Kaydet</button></>)}>
            <button aria-label="Close" className="close-btn" onClick={onClose}><FaTimes /></button>
          </div>
        </div>

        <div className="tabs">
          <button
            aria-label="Genel Ayarlar" className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}><FaCog /> Genel Ayarlar</button>
          <button
            aria-label="Templates" className={activeTab === 'templates' ? 'active' : ''} onClick={() => setActiveTab('templates')}><FaVoteYea /> Şablonlar</button>
          <button
            aria-label="Aktif Anketler" className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}><FaChartBar /> Aktif Anketler</button>
        </div>

        <div className="panel-content">
          {activeTab === 'settings' && settings && <SettingsTab settings={settings} handleSettingChange={handleSettingChange} />}

          {activeTab === 'templates' && (
            <div className="templates-content">
              <div className="templates-header"><h3>Anket Şablonları</h3><button
                aria-label="Poll Templates" className="add-template-btn"><FaPlus /> Yeni Şablon</button></div>
              <div className="templates-grid">
                {pollTemplates.map(template => (
                  <div key={template.id} className="template-card">
                    <div className="template-header"><h4>{template.name}</h4><button
                      aria-label="Delete" className="delete-template"><FaTrash /></button></div>
                    <div className="template-info">
                      <span className="template-duration"><FaClock /> {template.duration}h</span>
                      <span className="template-multi">{template.multi_vote ? <FaCheckCircle /> : <FaLock />}{template.multi_vote ? 'Çoklu oy' : 'Tek oy'}</span>
                    </div>
                    <div className="template-options">{template.options.map((opt, i) => <span key={`item-${i}`} className="option-chip">{opt}</span>)}</div>
                    <button
                      aria-label="Use Template" className="use-template-btn">Şablonu Kullan</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'active' && (
            <div className="active-polls-content">
              <h3><FaChartBar /> Aktif ve Güncel Anketler</h3>
              {activePolls.length > 0 ? (
                <div className="polls-list">
                  {activePolls.map(poll => (
                    <div key={poll.id} className={`poll-item ${poll.status}`}>
                      <div className="poll-status">{poll.status === 'active' ? <span className="status-badge active"><span className="pulse"></span>Aktif</span> : <span className="status-badge ended">Bitti</span>}</div>
                      <div className="poll-info"><h4>{poll.question}</h4><div className="poll-meta"><span><FaUsers /> {poll.votes} oy</span><span><FaClock /> {formatTimeRemaining(poll.end_time)}</span></div></div>
                      <div className="poll-actions"><button
                        aria-label="View" className="view-btn">Görüntüle</button>{poll.status === 'active' && <button
                          aria-label="Erken bitir" className="end-btn">Erken Bitir</button>}</div>
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
