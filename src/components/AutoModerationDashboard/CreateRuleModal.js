import styles from './styles';

const CreateRuleModal = ({ newRule, setNewRule, onClose, onCreateRule }) => {
    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 style={styles.modalTitle}>Create Moderation Rule</h3>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Rule Type</label>
                    <select
                        value={newRule.rule_type}
                        onChange={(e) => setNewRule({ ...newRule, rule_type: e.target.value })}
                        style={styles.select}
                    >
                        <option value="toxic">Toxic Language</option>
                        <option value="spam">Spam Detection</option>
                        <option value="keyword">Keyword Filter</option>
                        <option value="link">Link Filter</option>
                        <option value="caps">Excessive Caps</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Action</label>
                    <select
                        value={newRule.action}
                        onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                        style={styles.select}
                    >
                        <option value="warn">Warn User</option>
                        <option value="delete">Delete Message</option>
                        <option value="timeout">Timeout User (5min)</option>
                        <option value="kick">Kick User</option>
                        <option value="ban">Ban User</option>
                    </select>
                </div>

                {newRule.rule_type !== 'keyword' && (
                    <div style={styles.formGroup}>
                        <label style={styles.label}>AI Threshold ({(newRule.threshold * 100).toFixed(0)}%)</label>
                        <input
                            type="range"
                            min="0.5"
                            max="1"
                            step="0.05"
                            value={newRule.threshold}
                            onChange={(e) => setNewRule({ ...newRule, threshold: parseFloat(e.target.value) })}
                            style={styles.slider}
                        />
                    </div>
                )}

                {newRule.rule_type === 'keyword' && (
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Keywords (comma separated)</label>
                        <input
                            type="text"
                            placeholder="word1, word2, word3"
                            onChange={(e) => setNewRule({ ...newRule, keywords: e.target.value.split(',').map(k => k.trim()) })}
                            style={styles.input}
                        />
                    </div>
                )}

                <div style={styles.modalButtons}>
                    <button onClick={onClose} style={styles.cancelBtn}>
                        Cancel
                    </button>
                    <button onClick={onCreateRule} style={styles.createBtn}>
                        Create Rule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRuleModal;
