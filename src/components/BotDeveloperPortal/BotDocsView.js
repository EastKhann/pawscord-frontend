// BotDeveloperPortal/BotDocsView.js
import { FaBook, FaCopy } from 'react-icons/fa';

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

const BotDocsView = ({ copyToClipboard }) => (
    <div className="docs-view">
        <h3><FaBook /> Bot API Dok{'ü'}mantasyonu</h3>

        <div className="docs-section">
            <h4>{'🚀'} H{'ı'}zl{'ı'} Ba{'ş'}lang{'ıç'}</h4>
            <p>PAWSCORD Bot API ile kendi botunuzu olu{'ş'}turabilirsiniz.</p>
            <div className="code-block">
                <div className="code-header">
                    <span>JavaScript (Node.js)</span>
                    <button onClick={() => copyToClipboard(CODE_SAMPLE)}><FaCopy /></button>
                </div>
                <pre>{CODE_SAMPLE}</pre>
            </div>
        </div>

        <div className="docs-section">
            <h4>{'📡'} API Endpoints</h4>
            <div className="endpoint-list">
                <div className="endpoint"><span className="method get">GET</span><code>/api/bots/@me</code><span>Bot bilgilerini al</span></div>
                <div className="endpoint"><span className="method post">POST</span><code>/api/messages/send</code><span>Mesaj g{"ö"}nder</span></div>
                <div className="endpoint"><span className="method post">POST</span><code>/api/reactions/add</code><span>Reaction ekle</span></div>
                <div className="endpoint"><span className="method get">GET</span><code>/api/servers</code><span>Sunucu listesi</span></div>
            </div>
        </div>

        <div className="docs-section">
            <h4>{'🔗'} WebSocket Events</h4>
            <div className="event-list">
                <div className="event"><code>MESSAGE_CREATE</code><span>Yeni mesaj g{"ö"}nderildi{"ğ"}inde</span></div>
                <div className="event"><code>REACTION_ADD</code><span>Reaction eklendi{"ğ"}inde</span></div>
                <div className="event"><code>MEMBER_JOIN</code><span>{"Ü"}ye sunucuya kat{"ı"}ld{"ığı"}nda</span></div>
                <div className="event"><code>VOICE_STATE_UPDATE</code><span>Ses durumu de{"ğ"}i{"ş"}ti{"ğ"}inde</span></div>
            </div>
        </div>
    </div>
);

export default BotDocsView;
