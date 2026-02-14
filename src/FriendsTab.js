import React from 'react';
import { FaUserFriends, FaPaperPlane, FaTimes, FaBell } from './utils/iconOptimization';
import useFriendsAPI from './FriendsTab/useFriendsAPI';
import FriendsList from './FriendsTab/FriendsList';
import PendingRequests from './FriendsTab/PendingRequests';
import styles from './FriendsTab/friendsTabStyles';

const FriendsTab = ({ fetchWithAuth, apiBaseUrl, getDeterministicAvatar, onStartDM, onClose, onPendingCountChange, onlineUsers = [] }) => {
    const api = useFriendsAPI({ fetchWithAuth, apiBaseUrl, onPendingCountChange });

    return (
        <div style={styles.container}>
            <div style={styles.topBar}>
                <div style={styles.headerLeft}>
                    <div style={styles.title}><FaUserFriends style={{ marginRight: '10px' }} />Arkada{'\u015F'}lar</div>
                    <div style={styles.tabButtons}>
                        <button style={{ ...styles.tabBtn, ...(api.activeTab === 'all' ? styles.activeTabBtn : {}) }}
                            onClick={() => { api.setActiveTab('all'); api.setStatusMsg(null); }}>T{'\u00FC'}m{'\u00FC'} ({api.friends.length})</button>
                        <button style={{ ...styles.tabBtn, ...(api.activeTab === 'pending' ? styles.activeTabBtn : {}) }}
                            onClick={() => { api.setActiveTab('pending'); api.setStatusMsg(null); }}>
                            Bekleyenler{api.requests.length > 0 && <span style={styles.badgePulse}>{api.requests.length}</span>}
                        </button>
                        <button style={{ ...styles.addFriendBtn, ...(api.activeTab === 'add' ? styles.activeAddFriendBtn : {}) }}
                            onClick={() => { api.setActiveTab('add'); api.setStatusMsg(null); }}>Arkada{'\u015F'} Ekle</button>
                    </div>
                </div>
                <button onClick={onClose} style={styles.closeHeaderBtn} title="Kapat"><FaTimes /></button>
            </div>

            <div style={styles.contentArea}>
                {api.statusMsg && (
                    <div style={{
                        marginBottom: '20px', padding: '12px', borderRadius: '8px',
                        backgroundColor: api.statusMsg.type === 'success' ? 'rgba(67, 181, 129, 0.2)' : (api.statusMsg.type === 'info' ? 'rgba(88, 101, 242, 0.2)' : 'rgba(240, 71, 71, 0.2)'),
                        color: api.statusMsg.type === 'success' ? '#43b581' : (api.statusMsg.type === 'info' ? '#dee0fc' : '#f04747'),
                        border: `1px solid ${api.statusMsg.type === 'success' ? '#43b581' : (api.statusMsg.type === 'info' ? '#5865f2' : '#f04747')}`,
                        display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 0.3s ease'
                    }}>
                        {api.statusMsg.type === 'info' && <FaBell />}{api.statusMsg.text}
                    </div>
                )}

                {api.activeTab === 'add' && (
                    <div style={styles.addSection}>
                        <h3 style={{ color: '#fff', marginBottom: '10px' }}>ARKADA{'\u015E'} EKLE</h3>
                        <p style={{ color: '#b9bbbe', fontSize: '0.9em', marginBottom: '20px' }}>Kullan{'\u0131'}c{'\u0131'} ad{'\u0131'}n{'\u0131'} girerek arkada{'\u015F'} ekleyebilirsin.</p>
                        <form onSubmit={api.handleSendRequest} style={styles.addForm}>
                            <input type="text" value={api.addUsername} onChange={(e) => api.setAddUsername(e.target.value)}
                                placeholder="Kullan\u0131c\u0131 Ad\u0131 veya Arkada\u015F Kodu (\u00D6rn: 8392014)" style={styles.input} autoFocus />
                            <button type="submit" style={styles.sendRequestBtn}><FaPaperPlane style={{ marginRight: '5px' }} /> G{'\u00F6'}nder</button>
                        </form>
                    </div>
                )}

                {api.activeTab === 'all' && (
                    <div style={styles.listContainer}>
                        <h4 style={styles.listHeader}>ARKADA{'\u015E'}LAR {'\u2014'} {api.friends.length}</h4>
                        <FriendsList friends={api.friends} onlineUsers={onlineUsers} getDeterministicAvatar={getDeterministicAvatar}
                            onStartDM={onStartDM} handleRemoveFriend={api.handleRemoveFriend} setActiveTab={api.setActiveTab} />
                    </div>
                )}

                {api.activeTab === 'pending' && (
                    <PendingRequests requests={api.requests} outgoing={api.outgoing}
                        getDeterministicAvatar={getDeterministicAvatar} handleRespond={api.handleRespond} />
                )}
            </div>
        </div>
    );
};

export default React.memo(FriendsTab);
