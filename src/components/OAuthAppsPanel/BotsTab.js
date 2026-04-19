/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaPlus, FaRobot, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { styles } from './oauthStyles';

import { useTranslation } from 'react-i18next';

const S = {
    mar: { flex: 1, marginLeft: '12px' },
    txt: { fontSize: '32px', color: '#5865f2' },
    size: { ...styles.input, minHeight: '60px' },
};

const BotsTab = ({ o }) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={styles.toolbar}>
                <button
                    onClick={() => o.setShowCreateBot(!o.showCreateBot)}
                    style={styles.createButton}
                >
                    <FaPlus className="mr-5" /> New Bot
                </button>
            </div>

            {o.showCreateBot && (
                <div style={styles.createForm}>
                    <h3 style={styles.formTitle}>Bot Hesabı Oluştur</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Bot Adı</label>
                        <input
                            type="text"
                            value={o.newBot.name}
                            onChange={(e) => o.setNewBot({ ...o.newBot, name: e.target.value })}
                            placeholder="Botum"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Açıklama</label>
                        <textarea
                            value={o.newBot.description}
                            onChange={(e) =>
                                o.setNewBot({ ...o.newBot, description: e.target.value })
                            }
                            placeholder="Botunuz ne yapar?"
                            style={S.size}
                        />
                    </div>
                    <div style={styles.formActions}>
                        <button onClick={o.createBot} style={styles.submitButton}>
                            Bot Oluştur
                        </button>
                        <button
                            onClick={() => o.setShowCreateBot(false)}
                            style={styles.cancelButton}
                        >
                            {t('common.cancel')}
                        </button>
                    </div>
                </div>
            )}

            <div style={styles.botsList}>
                {o.bots.length === 0 ? (
                    <div style={styles.empty}>
                        Henüz bot yok. Görevleri otomatikleştirmek için bir tane oluşturun!
                    </div>
                ) : (
                    o.bots.map((bot) => (
                        <div key={bot.id} style={styles.botCard}>
                            <div style={styles.botHeader}>
                                <FaRobot style={S.txt} />
                                <div style={S.mar}>
                                    <div style={styles.botName}>{bot.name}</div>
                                    <div style={styles.botDescription}>{bot.description}</div>
                                    <div style={styles.botStatus}>
                                        Status: {bot.is_active ? '🟢 Active' : '🔴 Inactive'}
                                    </div>
                                </div>
                                <button
                                    onClick={() => o.deleteBot(bot.id)}
                                    style={styles.deleteButton}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

BotsTab.propTypes = {
    o: PropTypes.node,
};
export default BotsTab;
