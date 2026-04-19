import { FaSearch, FaUserFriends, FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';
import st from './inviteModalStyles';

import { useTranslation } from 'react-i18next';

const S = {
    txt: { fontSize: '32px', color: '#4e5058', marginBottom: '8px' },
};

const FriendList = ({
    searchRef,
    searchQuery,
    setSearchQuery,
    loadingFriends,
    filteredFriends,
    friends,
    getFriendName,
    getFriendAvatar,
    invitedUsers,
    sendInviteToFriend,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={st.searchWrap}>
                <div style={st.searchBox}>
                    <FaSearch style={st.searchIcon} />
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder={t('search_friends')}
                        style={st.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div style={st.friendList}>
                {loadingFriends ? (
                    <div style={st.emptyState}>
                        <div style={st.spinner} />
                        <span style={st.emptyText}>{t('common.loading')}</span>
                    </div>
                ) : filteredFriends.length === 0 ? (
                    <div style={st.emptyState}>
                        <FaUserFriends style={S.txt} />
                        <span style={st.emptyText}>
                            {searchQuery
                                ? t('ui.sonuc_not_found_2')
                                : friends.length === 0
                                  ? t('ui.not_yet_arkadasin_yok')
                                  : t('ui.eslesen_arkadas_yok')}
                        </span>
                    </div>
                ) : (
                    filteredFriends.map((f) => {
                        const name = getFriendName(f);
                        const avatar = getFriendAvatar(f);
                        const isInvited = invitedUsers.has(name);
                        const inviteBtnStyle = {
                            ...st.inviteBtn,
                            ...(isInvited ? st.inviteBtnSent : {}),
                        };
                        return (
                            <div
                                aria-label="friend list"
                                key={f.id}
                                style={st.friendItem}
                                className="invite-friend-item"
                            >
                                <div style={st.friendInfo}>
                                    <div style={st.friendAvatar}>
                                        {avatar ? (
                                            <img src={avatar} alt={name} style={st.avatarImg} />
                                        ) : (
                                            <span style={st.avatarLetter}>
                                                {name?.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <span style={st.friendName}>{name}</span>
                                </div>
                                <button
                                    onClick={() => !isInvited && sendInviteToFriend(name)}
                                    style={inviteBtnStyle}
                                    disabled={isInvited}
                                >
                                    {isInvited ? (
                                        <>
                                            <FaCheck className="mr-4" />
                                            {t('sent')}
                                        </>
                                    ) : (
                                        'Invite'
                                    )}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

FriendList.propTypes = {
    searchRef: PropTypes.string,
    searchQuery: PropTypes.string,
    setSearchQuery: PropTypes.func,
    loadingFriends: PropTypes.bool,
    filteredFriends: PropTypes.array,
    friends: PropTypes.array,
    getFriendName: PropTypes.func,
    getFriendAvatar: PropTypes.func,
    invitedUsers: PropTypes.array,
    sendInviteToFriend: PropTypes.func,
};
export default FriendList;
