/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CreateBotView = ({ newBot, setNewBot, handleCreateBot, onCancel }) => {
  const { t } = useTranslation();
  return (
    <div className="create-bot-form">
      <h3>{t('createBot.title','🤖 Create New Bot')}</h3>

      <div className="form-group">
        <label>{t('createBot.botName','Bot Name *')}</label>
        <input
          type="text"
          placeholder={t('createBot.placeholder','ExampleBot')}"
        value={newBot.name}
        onChange={e => setNewBot({ ...newBot, name: e.target.value })}
        maxLength={32}
      />
      </div>

      <div className="form-group">
        <label>{t('common.description','Description')}</label>
        <textarea
          placeholder={t('botunuz_ne_yapar')}
          value={newBot.description}
          onChange={e => setNewBot({ ...newBot, description: e.target.value })}
          rows={4}
          maxLength={200}
        />
      </div>

      <div className="form-group">
        <label>{t('avatar_url_opsiyonel')}</label>
        <input
          type="url"
          placeholder={t('https_example_com_avatar_png')}
          value={newBot.avatar_url}
          onChange={e => setNewBot({ ...newBot, avatar_url: e.target.value })}
        />
      </div>

      <div className="form-actions">
        <button className="submit-btn" onClick={handleCreateBot}>
          ✨ Create Bot
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

CreateBotView.propTypes = {
  newBot: PropTypes.object,
  setNewBot: PropTypes.func,
  handleCreateBot: PropTypes.func,
  onCancel: PropTypes.func,
};
export default CreateBotView;
