const BotListView = ({ bots, onSelect, onCreateView, formatNumber }) => (
    <div className="bots-list">
        {bots.length > 0 ? (
            <div className="bots-grid">
                {bots.map(bot => (
                    <div key={bot.id} className="bot-card" onClick={() => onSelect(bot)}>
                        <div className="bot-avatar">
                            {bot.avatar_url ? <img src={bot.avatar_url} alt={bot.name} /> : <div className="default-avatar">{'🤖'}</div>}
                            {bot.is_verified && <div className="verified-badge">{'✓'}</div>}
                        </div>
                        <h3>{bot.name}</h3>
                        {bot.description && <p className="bot-description">{bot.description}</p>}
                        <div className="bot-stats">
                            <span>{'🏰'} {formatNumber(bot.servers_count)} sunucu</span>
                            <span>{'👥'} {formatNumber(bot.users_count)} kullan{'ı'}c{'ı'}</span>
                        </div>
                        <div className="bot-status">
                            <span className={`status-badge ${bot.is_public ? 'public' : 'private'}`}>
                                {bot.is_public ? '🌍 Herkese Açık' : '🔒 Özel'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="no-bots">
                <div className="no-bots-icon">{'🤖'}</div>
                <h3>Hen{'ü'}z bot olu{'ş'}turmad{'ı'}n{'ı'}z</h3>
                <p>Discord benzeri botlar olu{'ş'}turup sunuculara ekleyebilirsiniz</p>
                <button onClick={onCreateView}>{'🚀'} {'İ'}lk Botunuzu Olu{'ş'}turun</button>
            </div>
        )}
    </div>
);

export default BotListView;
