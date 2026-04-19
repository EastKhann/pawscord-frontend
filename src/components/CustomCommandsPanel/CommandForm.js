/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CommandForm = ({ newCommand, setNewCommand, createCommand, onCancel }) => {
    const { t } = useTranslation();
    return (
        <div className="command-form">
            <h3>{t('yeni_komut_create')}</h3>
            <div className="form-grid">
                <div className="form-group">
                    <label>{t('komut_adı')}</label>
                    <input
                        type="text"
                        placeholder={t('komut')}
                        value={newCommand.name}
                        onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>{t('description')}</label>
                    <input
                        type="text"
                        placeholder={t('komut_aklaması')}
                        value={newCommand.description}
                        onChange={(e) =>
                            setNewCommand({ ...newCommand, description: e.target.value })
                        }
                    />
                </div>
                <div className="form-group full-width">
                    <label>{t('yanıt')}</label>
                    <textarea
                        placeholder={t('komut_yanıtı_değişkenler_user_server_channel')}
                        value={newCommand.response}
                        onChange={(e) => setNewCommand({ ...newCommand, response: e.target.value })}
                        rows={3}
                    />
                </div>
                <div className="form-group">
                    <label>{t('tetikleme_tipi')}</label>
                    <select
                        value={newCommand.trigger_type}
                        onChange={(e) =>
                            setNewCommand({ ...newCommand, trigger_type: e.target.value })
                        }
                    >
                        <option value="exact">{t('tam_eşleşme')}</option>
                        <option value="contains">{t('i̇çerir')}</option>
                        <option value="starts_with">{t('i̇le_başlar')}</option>
                        <option value="regex">{t('regex')}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>{t('i̇zinler')}</label>
                    <select
                        value={newCommand.permissions}
                        onChange={(e) =>
                            setNewCommand({ ...newCommand, permissions: e.target.value })
                        }
                    >
                        <option value="everyone">{t('hercut')}</option>
                        <option value="mods">{t('moderatorler')}</option>
                        <option value="admins">{t('adminler')}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>{t('cooldown_saniye')}</label>
                    <input
                        type="number"
                        min="0"
                        max="300"
                        value={newCommand.cooldown}
                        onChange={(e) =>
                            setNewCommand({ ...newCommand, cooldown: parseInt(e.target.value) })
                        }
                    />
                </div>
                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={newCommand.delete_trigger}
                            onChange={(e) =>
                                setNewCommand({ ...newCommand, delete_trigger: e.target.checked })
                            }
                        />
                        Delete trigger message
                    </label>
                </div>
                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={newCommand.embed}
                            onChange={(e) =>
                                setNewCommand({ ...newCommand, embed: e.target.checked })
                            }
                        />
                        Send as embed
                    </label>
                </div>
                {newCommand.embed && (
                    <div className="form-group">
                        <label>{t('embed_rengi')}</label>
                        <input
                            type="color"
                            value={newCommand.embed_color}
                            onChange={(e) =>
                                setNewCommand({ ...newCommand, embed_color: e.target.value })
                            }
                        />
                    </div>
                )}
            </div>
            <div className="form-actions">
                <button className="cancel-btn" onClick={onCancel}>
                    {t('common.cancel')}
                </button>
                <button className="submit-btn" onClick={createCommand}>
                    {t('create')}
                </button>
            </div>
        </div>
    );
};

CommandForm.propTypes = {
    newCommand: PropTypes.object,
    setNewCommand: PropTypes.func,
    createCommand: PropTypes.func,
    onCancel: PropTypes.func,
};
export default CommandForm;
