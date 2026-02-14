const BotListView = ({ bots, onSelect, onCreateView, formatNumber }) => (
    <div className="bots-list">
        {bots.length > 0 ? (
            <div className="bots-grid">
                {bots.map(bot => (
                    <div key={bot.id} className="bot-card" onClick={() => onSelect(bot)}>
                        <div className="bot-avatar">
                            {bot.avatar_url ? <img src={bot.avatar_url} alt={bot.name} /> : <div className="default-avatar">{'\uD83E\uDD16'}</div>}
                            {bot.is_verified && <div className="verified-badge">{'\u2713'}</div>}
                        </div>
                        <h3>{bot.name}</h3>
                        {bot.description && <p className="bot-description">{bot.description}</p>}
                        <div className="bot-stats">
                            <span>{'\uD83C\uDFF0'} {formatNumber(bot.servers_count)} sunucu</span>
                            <span>{'\uD83D\uDC65'} {formatNumber(bot.users_count)} kullan{'\u0131'}c{'\u0131'}</span>
                        </div>
                        <div className="bot-status">
                            <span className={`status-badge ${bot.is_public ? 'public' : 'private'}`}>
                                {bot.is_public ? '\uD83C\uDF0D Herkese A\u00E7\u0131k' : '\uD83D\uDD12 \u00D6zel'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="no-bots">
                <div className="no-bots-icon">{'\uD83E\uDD16'}</div>
                <h3>Hen{'\u00FC'}z bot olu{'\u015F'}turmad{'\u0131'}n{'\u0131'}z</h3>
                <p>Discord benzeri botlar olu{'\u015F'}turup sunuculara ekleyebilirsiniz</p>
                <button onClick={onCreateView}>{'\uD83D\uDE80'} {'\u0130'}lk Botunuzu Olu{'\u015F'}turun</button>
            </div>
        )}
    </div>
);

export default BotListView;
