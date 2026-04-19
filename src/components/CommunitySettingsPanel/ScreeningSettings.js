import { FaTimes, FaQuestionCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ScreeningSettings = ({ questions, onAdd, onUpdate, onRemove }) => {
    const { t } = useTranslation();
    return (
        <div className="settings-tab">
            <div className="tab-header">
                <h4>Üye Tarama Soruları</h4>
                <button className="add-btn" onClick={onAdd}>
                    {t('soru_add')}
                </button>
            </div>

            <p className="tab-description">
                Yeni üyeler sunucuya katılmadan önce bu soruları yanıtlamalıdır.
            </p>

            {questions.length === 0 ? (
                <div className="empty-rules">
                    <FaQuestionCircle />
                    <p>Henüz soru addnmemiş</p>
                </div>
            ) : (
                <div className="questions-list">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="question-item">
                            <span className="question-number">{idx + 1}</span>
                            <div className="question-content">
                                <input
                                    type="text"
                                    placeholder={t('soruyu_yazın')}
                                    value={q.question}
                                    onChange={(e) => onUpdate(q.id, 'question', e.target.value)}
                                />
                                <label className="required-toggle">
                                    <input
                                        type="checkbox"
                                        checked={q.required}
                                        onChange={(e) =>
                                            onUpdate(q.id, 'required', e.target.checked)
                                        }
                                    />
                                    <span>{t('zorunlu')}</span>
                                </label>
                            </div>
                            <button className="remove-btn" onClick={() => onRemove(q.id)}>
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

ScreeningSettings.propTypes = {
    questions: PropTypes.array,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func,
};
export default ScreeningSettings;
