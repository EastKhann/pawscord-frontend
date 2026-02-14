import { FaTimes, FaRobot, FaPlus, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import useAutoResponders, { MATCH_TYPES } from './AutoRespondersPanel/useAutoResponders';
import styles from './AutoRespondersPanel/autoRespondersStyles';

const AutoRespondersPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const { responders, loading, showCreate, setShowCreate, newResponder, setNewResponder, createResponder, toggleResponder, deleteResponder } = useAutoResponders({ fetchWithAuth, apiBaseUrl, serverId });

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.headerLeft}><FaRobot style={{ marginRight: '10px', color: '#5865f2' }} /><h2 style={styles.title}>Auto-Responders</h2></div>
          <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
        </div>

        <div style={styles.toolbar}>
          <div style={styles.count}>{responders.length} auto-responders</div>
          <button onClick={() => setShowCreate(!showCreate)} style={styles.createButton}><FaPlus style={{ marginRight: '6px' }} />Create New</button>
        </div>

        {showCreate && (
          <div style={styles.createForm}>
            <div style={styles.formRow}>
              <label style={styles.label}>Trigger</label>
              <input type="text" value={newResponder.trigger} onChange={e => setNewResponder({ ...newResponder, trigger: e.target.value })} placeholder="hello" style={styles.input} />
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Response</label>
              <textarea value={newResponder.response} onChange={e => setNewResponder({ ...newResponder, response: e.target.value })} placeholder="Hi there! How can I help you?" style={styles.textarea} rows={3} />
            </div>
            <div style={styles.formRow}>
              <label style={styles.label}>Match Type</label>
              <select value={newResponder.match_type} onChange={e => setNewResponder({ ...newResponder, match_type: e.target.value })} style={styles.select}>
                {MATCH_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <label style={styles.checkbox}>
              <input type="checkbox" checked={newResponder.case_sensitive} onChange={e => setNewResponder({ ...newResponder, case_sensitive: e.target.checked })} />
              <span style={styles.checkboxLabel}>Case sensitive</span>
            </label>
            <button onClick={createResponder} style={styles.submitButton}>Create Auto-Responder</button>
          </div>
        )}

        <div style={styles.content}>
          {loading ? <div style={styles.loading}>Loading...</div> : responders.length === 0 ? <div style={styles.empty}>No auto-responders configured</div> : (
            <div style={styles.respondersList}>
              {responders.map((resp, idx) => (
                <div key={idx} style={styles.responderCard}>
                  <div style={styles.responderInfo}>
                    <div style={styles.trigger}>Trigger: <span style={styles.triggerValue}>{resp.trigger}</span></div>
                    <div style={styles.response}>{resp.response}</div>
                    <div style={styles.meta}>{MATCH_TYPES.find(t => t.value === resp.match_type)?.label}{resp.case_sensitive && ' \u2022 Case Sensitive'}{' \u2022 Uses: ' + (resp.usage_count || 0)}</div>
                  </div>
                  <div style={styles.actions}>
                    <button onClick={() => toggleResponder(resp.id, !resp.enabled)} style={styles.toggleButton} title={resp.enabled ? 'Disable' : 'Enable'}>
                      {resp.enabled ? <FaToggleOn style={{ color: '#43b581', fontSize: '24px' }} /> : <FaToggleOff style={{ color: '#99aab5', fontSize: '24px' }} />}
                    </button>
                    <button onClick={() => deleteResponder(resp.id)} style={styles.deleteButton} title="Delete"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoRespondersPanel;
