// frontend/src/components/Message/Message.js
// Decomposed: useMessage + messageStyles + sub-components
import { memo, lazy, Suspense, useCallback } from 'react';
import { FaChartLine } from 'react-icons/fa';
import LazyImage from '../LazyImage';
import useMessage from './useMessage';
import styles from './messageStyles';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';
import { MessageActions } from './MessageActions';
import { MessageReactions } from './MessageReactions';
import { MessageContextMenu } from './MessageContextMenu';
import { MessageMedia, LazyMount } from './MessageMedia';
import { MessagePoll } from './MessagePoll';
import ReadReceipt from '../ReadReceipt';
import UserCardPopover from '../UserCardPopover';

const LinkPreview = lazy(() => import('../../LinkPreview'));
const TicTacToe = lazy(() => import('../TicTacToe'));
const ReminderModal = lazy(() => import('../ReminderModal'));
const MessageThreads = lazy(() => import('../MessageThreads'));

const Message = ({ msg, currentUser, isAdmin, onDelete, onStartEdit, onToggleReaction, onTogglePin, onSetReply, onImageClick, absoluteHostUrl, onScrollToMessage, onVisible, messageEditHistoryUrl, onViewProfile, onStartForward, fetchWithAuth, isSelectionMode, isSelected, onToggleSelection, allUsers, getDeterministicAvatar, onShowChart, onContentLoad }) => {
  const {
    messageRef, isMyMessage, isAIMessage, isHovered, setIsHovered,
    contextMenu, setContextMenu, handleContextMenu,
    showReactionPicker, setShowReactionPicker,
    showReminderModal, setShowReminderModal, showThreadModal, setShowThreadModal,
    displayContent, isMessageEncrypted, userAvatar, currentPermissions,
    finalImageUrl, finalFileUrl, signalCoin,
    localTranscription, localIsTranscribing, handleTranscribe, handleQuoteMessage,
  } = useMessage({ msg, currentUser, absoluteHostUrl, fetchWithAuth, onSetReply, onVisible, allUsers, getDeterministicAvatar });

  // Memoized handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => { setIsHovered(false); setShowReactionPicker(false); }, []);
  const handleMessageClick = useCallback(() => { if (isSelectionMode) onToggleSelection(msg.id); }, [isSelectionMode, onToggleSelection, msg.id]);
  const handleViewProfile = useCallback(() => onViewProfile(msg.username), [onViewProfile, msg.username]);
  const handleAvatarClick = useCallback(() => onViewProfile(msg.username), [onViewProfile, msg.username]);
  const handleReplyClick = useCallback(() => { if (msg.reply_to) onScrollToMessage(msg.reply_to.id); }, [msg.reply_to, onScrollToMessage]);
  const handleShowReminder = useCallback(() => setShowReminderModal(true), []);
  const handleShowThread = useCallback(() => setShowThreadModal(true), []);
  const handleCloseReminder = useCallback(() => setShowReminderModal(false), []);
  const handleCloseThread = useCallback(() => setShowThreadModal(false), []);
  const handleShowReactionPicker = useCallback(() => setShowReactionPicker(true), []);
  const handleCloseContextMenu = useCallback(() => setContextMenu(null), []);
  const handleTicTacToeMove = useCallback((gid, idx) => {
    fetchWithAuth(`${absoluteHostUrl}/api/games/xox/move/`, { method: 'POST', body: JSON.stringify({ game_id: gid, index: idx }) });
  }, [fetchWithAuth, absoluteHostUrl]);
  const handleShowChart = useCallback(() => onShowChart(signalCoin), [onShowChart, signalCoin]);

  return (
    <div ref={messageRef} style={{ ...styles.chatMessage, backgroundColor: isSelected ? 'rgba(88, 101, 242, 0.3)' : (isHovered ? 'rgba(4, 4, 5, 0.07)' : 'transparent'), cursor: isSelectionMode ? 'pointer' : 'default' }}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu} id={`message-${msg.id}`} onClick={handleMessageClick}>

      <UserCardPopover user={{ username: msg.username, avatar: userAvatar, status: msg.user_status, roles: msg.user_roles || [], level: msg.user_level, custom_status: msg.custom_status }} onMessage={handleViewProfile} onProfile={handleViewProfile}>
        <div style={styles.avatarContainer}>
          <LazyImage src={userAvatar} alt={msg.username} style={styles.userAvatar} onClick={handleAvatarClick} placeholder={getDeterministicAvatar(msg.username)} />
        </div>
      </UserCardPopover>

      <div style={styles.contentWrapper}>
        {msg.reply_to && (
          <div style={styles.replyContainer} onClick={handleReplyClick}>
            <div style={styles.replyLine} />
            <span style={{ fontWeight: 'bold', marginRight: 5 }}>@{msg.reply_to.username}</span>
            <span style={{ opacity: 0.7, fontSize: '0.9em' }}>{msg.reply_to.content ? msg.reply_to.content.substring(0, 50) + '...' : 'Bir dosya'}</span>
          </div>
        )}

        <MessageHeader msg={msg} isAdmin={isAdmin} isAIMessage={isAIMessage} onViewProfile={onViewProfile} messageEditHistoryUrl={messageEditHistoryUrl} fetchWithAuth={fetchWithAuth} />

        {isHovered && !msg.temp_id && !isSelectionMode && (
          <MessageActions msg={msg} isMyMessage={isMyMessage} isAdmin={isAdmin} currentPermissions={currentPermissions}
            showReactionPicker={showReactionPicker} setShowReactionPicker={setShowReactionPicker}
            onToggleReaction={onToggleReaction} onSetReply={onSetReply} onStartEdit={onStartEdit} onDelete={onDelete}
            onTogglePin={onTogglePin} onStartForward={onStartForward} onToggleSelection={onToggleSelection}
            onQuote={handleQuoteMessage} onShowReminderModal={handleShowReminder}
            onShowThreadModal={handleShowThread} fetchWithAuth={fetchWithAuth} absoluteHostUrl={absoluteHostUrl} />
        )}

        {showReminderModal && <Suspense fallback={null}><ReminderModal messageId={msg.id} messageContent={displayContent} onClose={handleCloseReminder} fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} /></Suspense>}
        {showThreadModal && <Suspense fallback={null}><MessageThreads messageId={msg.id} onClose={handleCloseThread} fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} /></Suspense>}

        <MessageContextMenu msg={msg} contextMenu={contextMenu} displayContent={displayContent} isMyMessage={isMyMessage}
          onSetReply={onSetReply} onStartEdit={onStartEdit} onDelete={onDelete} onTogglePin={onTogglePin}
          onStartForward={onStartForward} onShowReactionPicker={handleShowReactionPicker}
          onShowThreadModal={handleShowThread} onShowReminderModal={handleShowReminder}
          onClose={handleCloseContextMenu} fetchWithAuth={fetchWithAuth} absoluteHostUrl={absoluteHostUrl} />

        {msg.snippet_data?.type === 'game_xox' ? (
          <Suspense fallback={<div style={{ padding: '12px', color: '#b9bbbe' }}>{'🎮'} Oyun y{'ü'}kleniyor...</div>}>
            <TicTacToe gameData={msg.snippet_data} currentUser={currentUser}
              onMove={handleTicTacToeMove} />
          </Suspense>
        ) : (
          <MessageContent displayContent={displayContent} isMessageEncrypted={isMessageEncrypted} snippetData={msg.snippet_data} />
        )}

        {signalCoin && <button onClick={handleShowChart} style={styles.chartBtn}><FaChartLine /> {signalCoin} Grafi{'ğ'}i</button>}
        {msg.link_preview_data && <LazyMount minHeight={80}><Suspense fallback={null}><LinkPreview data={msg.link_preview_data} /></Suspense></LazyMount>}
        <MessagePoll poll={msg.poll} fetchWithAuth={fetchWithAuth} absoluteHostUrl={absoluteHostUrl} />
        <MessageMedia msg={msg} finalImageUrl={finalImageUrl} finalFileUrl={finalFileUrl} onImageClick={onImageClick} onContentLoad={onContentLoad}
          transcription={localTranscription} isTranscribing={localIsTranscribing} onTranscribe={handleTranscribe}
          galleryGroup={msg._galleryGroup} absoluteHostUrl={absoluteHostUrl} />

        <div style={styles.footerRow}>
          <MessageReactions reactions={msg.reactions} currentUser={currentUser} onToggleReaction={onToggleReaction} messageId={msg.id} />
          {isMyMessage && !msg.temp_id && <ReadReceipt status={msg.read_by?.length > 0 ? 'read' : msg.id ? 'delivered' : 'sent'} readBy={msg.read_by || []} />}
        </div>
      </div>
    </div>
  );
};

const areEqual = (prev, next) => {
  for (const k of ['msg', 'currentUser', 'isAdmin', 'isSelectionMode', 'isSelected']) {
    if (prev[k] !== next[k]) return false;
  }
  return true;
};

export default memo(Message, areEqual);
