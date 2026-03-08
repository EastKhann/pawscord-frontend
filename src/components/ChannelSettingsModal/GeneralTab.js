// frontend/src/components/ChannelSettingsModal/GeneralTab.js

import { FaLock, FaGlobe, FaExclamationTriangle, FaUserFriends, FaBroadcastTower, FaClock, FaTrash, FaSave } from 'react-icons/fa';
import styles from './styles';

const GeneralTab = ({
    name, setName,
    isPrivate, handlePrivateChange,
    isNsfw, handleNsfwChange,
    isLocked, handleLockedChange,
    isReadOnly, handleReadOnlyChange,
    isVoiceChannel,
    userLimit, handleUserLimitChange,
    bitrate, setBitrate,
    selectedRoles, toggleRole,
    serverRoles,
    handleDelete, handleSave
}) => {
    return (
        <>
            <div style={styles.section}>
                <label style={styles.label}>Kanal Adı</label>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.section}>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={handlePrivateChange}
                    />
                    {isPrivate ? <FaLock color="#f23f42" /> : <FaGlobe color="#23a559" />}
                    <span>{isPrivate ? "🔒 Özel Kanal (İzinli roller)" : "🌍 Herkese Açık Kanal"}</span>
                </label>
            </div>

            {isPrivate && (
                <div style={styles.rolesList}>
                    <p style={{ fontSize: '0.9em', color: '#ccc' }}>Kimler erişebilir?</p>
                    {serverRoles.map(role => (
                        <div key={role.id} style={styles.roleItem} onClick={() => toggleRole(role.id)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: role.color }}></div>
                                <span>{role.name}</span>
                            </div>
                            <input type="checkbox" checked={selectedRoles.includes(role.id)} readOnly />
                        </div>
                    ))}
                </div>
            )}

            {/* 🔥 NSFW CHANNEL */}
            <div style={styles.section}>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={isNsfw} onChange={handleNsfwChange} />
                    <FaExclamationTriangle color="#f23f42" size={16} />
                    <span>🔞 NSFW (18+ İçerik)</span>
                </label>
                <p style={{ fontSize: '0.875em', color: '#949ba4', marginTop: '8px', marginLeft: '28px', fontStyle: 'italic' }}>
                    Yetişkin içerik uyarısı gösterilir.
                </p>
            </div>

            {/* 🔥 LOCKED CHANNEL */}
            <div style={styles.section}>
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isLocked}
                        onChange={handleLockedChange}
                    />
                    <FaLock color="#f23f42" size={14} />
                    <span>🔒 Kanal Kilitli</span>
                </label>
                <p style={{ fontSize: '0.875em', color: '#949ba4', marginTop: '8px', marginLeft: '28px', fontStyle: 'italic' }}>
                    Kimse mesaj gönderemez (geçici kilitleme).
                </p>
            </div>

            {/* 🔥 READ-ONLY CHANNEL */}
            <div style={styles.section}>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={isReadOnly} onChange={handleReadOnlyChange} />
                    <FaBroadcastTower color="#f0b232" size={16} />
                    <span>📢 Duyuru Kanalı (Sadece Admin Yazar)</span>
                </label>
                <p style={{ fontSize: '0.875em', color: '#949ba4', marginTop: '8px', marginLeft: '28px', fontStyle: 'italic' }}>
                    Herkes okuyabilir, sadece adminler yazabilir.
                </p>
            </div>

            {/* 🔥 VOICE SETTINGS */}
            {isVoiceChannel && (
                <>
                    <div style={styles.section}>
                        <label style={{ ...styles.label, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <FaUserFriends size={14} /> Kullanıcı Limiti
                        </label>
                        <input
                            type="number" min="0" max="99" value={userLimit}
                            onChange={handleUserLimitChange}
                            style={styles.input} placeholder="0 = Sınırsız"
                        />
                        <p style={{ fontSize: '0.875em', color: '#949ba4', marginTop: '8px', fontStyle: 'italic' }}>
                            Max kişi sayısı (0 = limitsiz)
                        </p>
                    </div>

                    <div style={styles.section}>
                        <label style={{ ...styles.label, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <FaClock size={14} /> Ses Kalitesi (Bitrate)
                        </label>
                        <select value={bitrate} onChange={e => setBitrate(parseInt(e.target.value))} style={styles.input}>
                            <option value={8}>8 kbps (Düşük)</option>
                            <option value={32}>32 kbps</option>
                            <option value={64}>64 kbps (Normal)</option>
                            <option value={96}>96 kbps (İyi)</option>
                            <option value={128}>128 kbps (Yüksek)</option>
                            <option value={256}>256 kbps (Çok Yüksek)</option>
                            <option value={384}>384 kbps (Maksimum)</option>
                        </select>
                        <p style={{ fontSize: '0.85em', color: '#949ba4', marginTop: '6px', fontStyle: 'italic' }}>
                            Yüksek bitrate = daha iyi ses
                        </p>
                    </div>
                </>
            )}

            <div style={styles.footer}>
                <button onClick={handleDelete} style={styles.deleteBtn}><FaTrash /> Kanalı Sil</button>
                <button onClick={handleSave} style={styles.saveBtn}><FaSave /> Kaydet</button>
            </div>
        </>
    );
};

export default GeneralTab;
