import { FaPlay, FaTrash } from 'react-icons/fa';

const CommandCard = ({ cmd, styles, onUpdate, onRemove, onTest, canRemove }) => (
  <div style={styles.commandCard}>
    <div style={styles.commandHeader}>
      <div style={styles.toggle}>
        <div style={styles.switch(cmd.enabled)} onClick={() => onUpdate(cmd.id, 'enabled', !cmd.enabled)}>
          <div style={styles.switchKnob(cmd.enabled)} />
        </div>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
          {cmd.enabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>
      <div style={styles.commandActions}>
        <button onClick={() => onTest(cmd)} style={styles.iconBtn} title="Test Command"><FaPlay /></button>
        {canRemove && (
          <button onClick={() => onRemove(cmd.id)} style={{ ...styles.iconBtn, ...styles.deleteBtn }} title="Delete Command"><FaTrash /></button>
        )}
      </div>
    </div>
    <div style={styles.inputGroup}>
      <label style={styles.label}>Trigger (e.g., !hello)</label>
      <input type="text" value={cmd.trigger} onChange={(e) => onUpdate(cmd.id, 'trigger', e.target.value)} placeholder="!command" style={styles.input} />
    </div>
    <div style={styles.inputGroup}>
      <label style={styles.label}>Response</label>
      <textarea value={cmd.response} onChange={(e) => onUpdate(cmd.id, 'response', e.target.value)} placeholder="Bot response here..." style={styles.textarea} />
    </div>
  </div>
);

export default CommandCard;
