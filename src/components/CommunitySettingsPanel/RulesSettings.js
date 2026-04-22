import { FaTimes, FaClipboardList } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const RulesSettings = ({ rules, onAdd, onUpdate, onRemove }) => {
    const { t } = useTranslation();
    return (
        <div className="settings-tab">
            <div className="tab-header">
                <h4>{t('rulesSettings.title','Server Rules')}</h4>
                <button className="add-btn" onClick={onAdd}>
                    {t('kural_add')}
                </button>
            </div>

            {rules.length === 0 ? (
                <div className="empty-rules">
                    <FaClipboardList />
                    <p>{t('rulesSettings.noRules','No rules added yet')}</p>
                </div>
            ) : (
                <div className="rules-list">
                    {rules.map((rule, idx) => (
                        <div key={rule.id} className="rule-item">
                            <span className="rule-number">{idx + 1}</span>
                            <div className="rule-content">
                                <input
                                    type="text"
                                    placeholder={t('kural_başlığı')}
                                    value={rule.title}
                                    onChange={(e) => onUpdate(rule.id, 'title', e.target.value)}
                                />
                                <textarea
                                    placeholder={t('kural_aklaması')}
                                    value={rule.description}
                                    onChange={(e) =>
                                        onUpdate(rule.id, 'description', e.target.value)
                                    }
                                    rows="2"
                                />
                            </div>
                            <button className="remove-btn" onClick={() => onRemove(rule.id)}>
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

RulesSettings.propTypes = {
    rules: PropTypes.array,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func,
};
export default RulesSettings;
