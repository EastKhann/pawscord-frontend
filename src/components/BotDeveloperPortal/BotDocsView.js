// BotDeveloperPortal/BotDocsView.js
import { FaBook, FaCopy } from 'react-icons/fa';

const CODE_SAMPLE = `const PAWSCORD = require('pawscord-bot');

const bot = new PAWSCORD.Client({
    token: 'YOUR_BOT_TOKEN'
});

bot.on('message', (message) => {
    if (message.content === '!ping') {
        message.reply('Pong! \uD83C\uDFD3');
    }
});

bot.connect();`;

const BotDocsView = ({ copyToClipboard }) => (
    <div className="docs-view">
        <h3><FaBook /> Bot API Dok{'\u00FC'}mantasyonu</h3>

        <div className="docs-section">
            <h4>{'\uD83D\uDE80'} H{'\u0131'}zl{'\u0131'} Ba{'\u015F'}lang{'\u0131\u00E7'}</h4>
            <p>PAWSCORD Bot API ile kendi botunuzu olu{'\u015F'}turabilirsiniz.</p>
            <div className="code-block">
                <div className="code-header">
                    <span>JavaScript (Node.js)</span>
                    <button onClick={() => copyToClipboard(CODE_SAMPLE)}><FaCopy /></button>
                </div>
                <pre>{CODE_SAMPLE}</pre>
            </div>
        </div>

        <div className="docs-section">
            <h4>{'\uD83D\uDCE1'} API Endpoints</h4>
            <div className="endpoint-list">
                <div className="endpoint"><span className="method get">GET</span><code>/api/bots/@me</code><span>Bot bilgilerini al</span></div>
                <div className="endpoint"><span className="method post">POST</span><code>/api/messages/send</code><span>Mesaj g{"\u00F6"}nder</span></div>
                <div className="endpoint"><span className="method post">POST</span><code>/api/reactions/add</code><span>Reaction ekle</span></div>
                <div className="endpoint"><span className="method get">GET</span><code>/api/servers</code><span>Sunucu listesi</span></div>
            </div>
        </div>

        <div className="docs-section">
            <h4>{'\uD83D\uDD17'} WebSocket Events</h4>
            <div className="event-list">
                <div className="event"><code>MESSAGE_CREATE</code><span>Yeni mesaj g{"\u00F6"}nderildi{"\u011F"}inde</span></div>
                <div className="event"><code>REACTION_ADD</code><span>Reaction eklendi{"\u011F"}inde</span></div>
                <div className="event"><code>MEMBER_JOIN</code><span>{"\u00DC"}ye sunucuya kat{"\u0131"}ld{"\u0131\u011F\u0131"}nda</span></div>
                <div className="event"><code>VOICE_STATE_UPDATE</code><span>Ses durumu de{"\u011F"}i{"\u015F"}ti{"\u011F"}inde</span></div>
            </div>
        </div>
    </div>
);

export default BotDocsView;
