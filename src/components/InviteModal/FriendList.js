import { FaSearch, FaUserFriends, FaCheck } from 'react-icons/fa';
import st from './inviteModalStyles';

const FriendList = ({
    searchRef, searchQuery, setSearchQuery,
    loadingFriends, filteredFriends, friends,
    getFriendName, getFriendAvatar,
    invitedUsers, sendInviteToFriend,
}) => (
    <>
        <div style={st.searchWrap}>
            <div style={st.searchBox}>
                <FaSearch style={st.searchIcon} />
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Arkadaş ara..."
                    style={st.searchInput}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
        <div style={st.friendList}>
            {loadingFriends ? (
                <div style={st.emptyState}>
                    <div style={st.spinner} />
                    <span style={st.emptyText}>Yükleniyor...</span>
                </div>
            ) : filteredFriends.length === 0 ? (
                <div style={st.emptyState}>
                    <FaUserFriends style={{ fontSize: '32px', color: '#4e5058', marginBottom: '8px' }} />
                    <span style={st.emptyText}>
                        {searchQuery
                            ? 'Sonuç bulunamadı.'
                            : friends.length === 0
                                ? 'Henüz arkadaşın yok.'
                                : 'Eşleşen arkadaş yok.'}
                    </span>
                </div>
            ) : (
                filteredFriends.map(f => {
                    const name = getFriendName(f);
                    const avatar = getFriendAvatar(f);
                    const isInvited = invitedUsers.has(name);
                    return (
                        <div key={f.id} style={st.friendItem} className="invite-friend-item">
                            <div style={st.friendInfo}>
                                <div style={st.friendAvatar}>
                                    {avatar
                                        ? <img src={avatar} alt={name} style={st.avatarImg} />
                                        : <span style={st.avatarLetter}>{name?.charAt(0).toUpperCase()}</span>}
                                </div>
                                <span style={st.friendName}>{name}</span>
                            </div>
                            <button
                                onClick={() => !isInvited && sendInviteToFriend(name)}
                                style={{ ...st.inviteBtn, ...(isInvited ? st.inviteBtnSent : {}) }}
                                disabled={isInvited}
                            >
                                {isInvited
                                    ? <><FaCheck style={{ marginRight: '4px' }} /> Gönderildi</>
                                    : 'Davet Et'}
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    </>
);

export default FriendList;
