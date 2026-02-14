import { FaPlus, FaRobot, FaTrash } from 'react-icons/fa';
import { styles } from './oauthStyles';

const BotsTab = ({ o }) => (
    <>
        <div style={styles.toolbar}>
            <button onClick={() => o.setShowCreateBot(!o.showCreateBot)} style={styles.createButton}>
                <FaPlus style={{ marginRight: '5px' }} /> New Bot
            </button>
        </div>

        {o.showCreateBot && (
            <div style={styles.createForm}>
                <h3 style={styles.formTitle}>Create Bot Account</h3>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Bot Name</label>
                    <input type="text" value={o.newBot.name}
                        onChange={(e) => o.setNewBot({ ...o.newBot, name: e.target.value })}
                        placeholder="My Bot" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea value={o.newBot.description}
                        onChange={(e) => o.setNewBot({ ...o.newBot, description: e.target.value })}
                        placeholder="What does your bot do?" style={{ ...styles.input, minHeight: '60px' }} />
                </div>
                <div style={styles.formActions}>
                    <button onClick={o.createBot} style={styles.submitButton}>Create Bot</button>
                    <button onClick={() => o.setShowCreateBot(false)} style={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        )}

        <div style={styles.botsList}>
            {o.bots.length === 0 ? (
                <div style={styles.empty}>No bots yet. Create one to automate tasks!</div>
            ) : (
                o.bots.map(bot => (
                    <div key={bot.id} style={styles.botCard}>
                        <div style={styles.botHeader}>
                            <FaRobot style={{ fontSize: '32px', color: '#5865f2' }} />
                            <div style={{ flex: 1, marginLeft: '12px' }}>
                                <div style={styles.botName}>{bot.name}</div>
                                <div style={styles.botDescription}>{bot.description}</div>
                                <div style={styles.botStatus}>
                                    Status: {bot.is_active ? '\ud83d\udfe2 Active' : '\ud83d\udd34 Inactive'}
                                </div>
                            </div>
                            <button onClick={() => o.deleteBot(bot.id)} style={styles.deleteButton}><FaTrash /></button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </>
);

export default BotsTab;
