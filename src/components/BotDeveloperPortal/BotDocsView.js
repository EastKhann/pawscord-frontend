// BotDeveloperPortal/BotDocsView.js
import { FaBook, FaCopy } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CODE_SAMPLE = `const PAWSCORD = require('pawscord-bot');

const bot = new PAWSCORD.Client({
    token: 'YOUR_BOT_TOKEN'
});

bot.on('message', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong! 🏓');
    }
});

bot.connect();`;

const BotDocsView = ({ copyToClipboard }) => {
    const { t } = useTranslation();
    return (
        <div aria-label="bot docs view" className="docs-view">
            <h3>
                <FaBook /> Bot API Dokümantasyonu
            </h3>

            <div className="docs-section">
                <h4>🚀 Hızlı Başlangıç</h4>
                <p>PAWSCORD Bot API ile kendi botunuzu oluşturabilirsiniz.</p>
                <div className="code-block">
                    <div className="code-header">
                        <span>JavaScript (Node.js)</span>
                        <button onClick={() => copyToClipboard(CODE_SAMPLE)}>
                            <FaCopy />
                        </button>
                    </div>
                    <pre>{CODE_SAMPLE}</pre>
                </div>
            </div>

            <div className="docs-section">
                <h4>📡 API Endpoints</h4>
                <div className="endpoint-list">
                    <div className="endpoint">
                        <span className="method get">{t('get')}</span>
                        <code>{t('api_bots_me')}</code>
                        <span>{t('bot_bilgisini_al')}</span>
                    </div>
                    <div className="endpoint">
                        <span className="method post">{t('post')}</span>
                        <code>{t('api_messages_send')}</code>
                        <span>Mesaj gönder</span>
                    </div>
                    <div className="endpoint">
                        <span className="method post">{t('post')}</span>
                        <code>{t('api_reactions_add')}</code>
                        <span>{t('reaction_add')}</span>
                    </div>
                    <div className="endpoint">
                        <span className="method get">{t('get')}</span>
                        <code>{t('api_servers')}</code>
                        <span>{t('server_listsi')}</span>
                    </div>
                </div>
            </div>

            <div className="docs-section">
                <h4>🔗 WebSocket Events</h4>
                <div className="event-list">
                    <div className="event">
                        <code>{t('message_create')}</code>
                        <span>Yeni mesaj gönderildiğinde</span>
                    </div>
                    <div className="event">
                        <code>{t('reaction_add')}</code>
                        <span>Tepki eklendiğinde</span>
                    </div>
                    <div className="event">
                        <code>{t('member_join')}</code>
                        <span>Üye sunucuya katıldığında</span>
                    </div>
                    <div className="event">
                        <code>{t('voice_state_update')}</code>
                        <span>Ses durumu değiştiğinde</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

BotDocsView.propTypes = {
    copyToClipboard: PropTypes.object,
};
export default BotDocsView;
