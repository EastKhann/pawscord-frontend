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
                    placeholder="Arkada\u015F ara..."
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
                    <span style={st.emptyText}>Y\u00FCkleniyor...</span>
                </div>
            ) : filteredFriends.length === 0 ? (
                <div style={st.emptyState}>
                    <FaUserFriends style={{ fontSize: '32px', color: '#4e5058', marginBottom: '8px' }} />
                    <span style={st.emptyText}>
                        {searchQuery
                            ? 'Sonu\u00E7 bulunamad\u0131.'
                            : friends.length === 0
                                ? 'Hen\u00FCz arkada\u015F\u0131n yok.'
                                : 'E\u015Fle\u015Fen arkada\u015F yok.'}
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
                                    ? <><FaCheck style={{ marginRight: '4px' }} /> G\u00F6nderildi</>
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
