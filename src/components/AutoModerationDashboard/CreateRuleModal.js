/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './styles';
import PropTypes from 'prop-types';
import useModalA11y from '../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';

const CreateRuleModal = ({ newRule, setNewRule, onClose, onCreateRule }) => {
    const { t } = useTranslation();

    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: 'Create Moderation Rule',
    });
    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <h3 style={styles.modalTitle}>{t('create_moderation_rule')}</h3>

                <div style={styles.formGroup}>
                    <label style={styles.label}>{t('rule_type')}</label>
                    <select
                        value={newRule.rule_type}
                        onChange={(e) => setNewRule({ ...newRule, rule_type: e.target.value })}
                        style={styles.select}
                    >
                        <option value="toxic">{t('toxic_language')}</option>
                        <option value="spam">{t('spam_detection')}</option>
                        <option value="keyword">{t('keyword_filter')}</option>
                        <option value="link">{t('link_filter')}</option>
                        <option value="caps">{t('excessive_caps')}</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>{t('action')}</label>
                    <select
                        value={newRule.action}
                        onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                        style={styles.select}
                    >
                        <option value="warn">{t('warn_user')}</option>
                        <option value="delete">{t('delete_message')}</option>
                        <option value="timeout">{t('timeout_user_5min')}</option>
                        <option value="kick">{t('kick_user')}</option>
                        <option value="ban">{t('ban_user')}</option>
                    </select>
                </div>

                {newRule.rule_type !== 'keyword' && (
                    <div style={styles.formGroup}>
                        <label style={styles.label}>
                            AI Threshold ({(newRule.threshold * 100).toFixed(0)}%)
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="1"
                            step="0.05"
                            value={newRule.threshold}
                            onChange={(e) =>
                                setNewRule({ ...newRule, threshold: parseFloat(e.target.value) })
                            }
                            style={styles.slider}
                        />
                    </div>
                )}

                {newRule.rule_type === 'keyword' && (
                    <div style={styles.formGroup}>
                        <label style={styles.label}>{t('keywords_comma_separated')}</label>
                        <input
                            type="text"
                            placeholder={t('word1_word2_word3')}
                            onChange={(e) =>
                                setNewRule({
                                    ...newRule,
                                    keywords: e.target.value.split(',').map((k) => k.trim()),
                                })
                            }
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

CreateRuleModal.propTypes = {
    newRule: PropTypes.object,
    setNewRule: PropTypes.func,
    onClose: PropTypes.func,
    onCreateRule: PropTypes.func,
};
export default CreateRuleModal;
