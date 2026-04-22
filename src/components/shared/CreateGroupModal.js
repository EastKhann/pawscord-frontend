// frontend/src/components/CreateGroupModal.js

import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaUserPlus, FaCheck } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const S = {
    txt: { color: '#b5bac1', marginBottom: 15 },
};

const CreateGroupModal = ({ onClose, friendsList, fetchWithAuth, apiBaseUrl, onGroupCreated }) => {
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Grup Create' });

    const toggleFriend = (username) => {
        if (selectedFriends.includes(username)) {
            setSelectedFriends((prev) => prev.filter((u) => u !== username));
        } else {
            setSelectedFriends((prev) => [...prev, username]);
        }
    };

    const handleCreate = async () => {
        if (selectedFriends.length < 2) {
            toast.error(t('ui.en_az_2_kisi_secmelisin'));
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/conversations/create_group/`, {
                method: 'POST',
                body: JSON.stringify({ usernames: selectedFriends }),
            });

            if (res.ok) {
                const data = await res.json();
                toast.success(t('group.created'));
                onGroupCreated(data); // App.js'deki listeyi güncellemek for
                onClose();
            } else {
                toast.error(t('ui.grup_olusturulamadi'));
            }
        } catch (e) {
            logger.error(e);
            toast.error(t('common.errorOccurred') + ': ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3>{t('createGroup.title', 'Create Group')}</h3>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.body}>
                    <p style={S.txt}>
                        {t('createGroup.selectFriends', 'Select friends to add to the group ({{count}})', { count: selectedFriends.length })}
                    </p>

                    <div style={styles.friendList}>
                        {friendsList.map((friendName) => (
                            <div
                                key={friendName}
                                role="button"
                                tabIndex={0}
                                onClick={() => toggleFriend(friendName)}
                                style={{
                                    ...styles.friendItem,
                                    backgroundColor: selectedFriends.includes(friendName)
                                        ? 'rgba(88, 101, 242, 0.3)'
                                        : '#111214',
                                    borderColor: selectedFriends.includes(friendName)
                                        ? '#5865f2'
                                        : 'transparent',
                                }}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                <span className="text-white">{friendName}</span>
                                {selectedFriends.includes(friendName) ? (
                                    <FaCheck color="#5865f2" />
                                ) : (
                                    <FaUserPlus color="#b5bac1" />
                                )}
                            </div>
                        ))}
                        {friendsList.length === 0 && (
                            <p className="icon-muted">{t('createGroup.noFriends', 'No friends on your list.')}</p>
                        )}
                    </div>

                    <button
                        aria-label={t('createGroup.create', 'Create group')}
                        onClick={handleCreate}
                        style={styles.createBtn}
                        disabled={loading || selectedFriends.length < 2}
                    >
                        {loading ? t('common.creating', 'Creating...') : t('createGroup.createGroupDm', 'Create Group DM')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: { backgroundColor: '#17191c', width: '400px', borderRadius: '8px', overflow: 'hidden' },
    header: {
        padding: '15px 20px',
        borderBottom: '1px solid #0b0e1b',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.2em',
    },
    body: { padding: '20px' },
    friendList: {
        maxHeight: '300px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '20px',
    },
    friendItem: {
        padding: '10px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        border: '1px solid transparent',
    },
    createBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        opacity: 0.9,
    },
};

CreateGroupModal.propTypes = {
    fetchWithAuth: PropTypes.func.isRequired,
    apiBaseUrl: PropTypes.string.isRequired,
    friends: PropTypes.array,
    onClose: PropTypes.func.isRequired,
    onGroupCreated: PropTypes.func,
};
export default CreateGroupModal;
