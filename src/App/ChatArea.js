/**
 * ?? ChatArea � Main chat rendering section
 * Extracted from App.js: header, message list, drag overlay, input container
 */
import React, { Suspense, memo, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaBell, FaUsers, FaSearch, FaEllipsisV } from 'react-icons/fa';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ScrollToBottomButton from '../components/chat/ScrollToBottomButton';
import MessageDateDivider from '../components/chat/MessageDateDivider';
import TypingIndicatorEnhanced from '../components/chat/TypingIndicatorEnhanced';
import ImageGalleryGroup from '../components/shared/ImageGalleryGroup';
import { Message, VirtualMessageList, MessageInput, NotificationDropdown } from './lazyImports';
import ToolbarMenu from './ToolbarMenu';
import MessageSkeleton from '../components/chat/MessageSkeleton';
import styles from '../styles/appStyles';
import '../styles/chat-area.css';

import { useTranslation } from 'react-i18next';
import logger from '../utils/logger';
import { useUIStore } from '../stores/useUIStore';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1054 = styles.chatArea;
const _st1055 = styles.chatHeader;
const _st1056 = styles.mobileMenuButton;
const _st1057 = styles.mobileMenuButton;
const _st1058 = styles.systemMessage;

const isImageOnlyMessage = (msg) => {
    if (!msg) return false;
    const hasImage = !!(msg.image_url || msg.image);
    const hasFileImage =
        !!(msg.file_url || msg.file) &&
        !msg.is_voice_message &&
        /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(msg.file_name || '');
    const hasContent = !!(msg.content && msg.content.trim());
    return (hasImage || hasFileImage) && !hasContent && !msg.poll && !msg.reply_to;
};

/**
 * @param {Object} props
 * @param {boolean} props.isMobile - Whether the app is in mobile view
 * @param {boolean} props.isNative - Whether running in native (Capacitor) mode
 * @param {Object} props.activeChat - Current active chat object { type, id, targetUser }
 * @param {string} props.chatTitle - Display title of the active chat
 * @param {boolean} props.isConnected - WebSocket connection status
 * @param {Array} props.optimizedMessages - Memoized array of messages to render
 * @param {boolean} props.messageHistoryLoading - Whether older messages are loading
 * @param {Object} props.messageHandlers - Message send/edit/delete handlers
 * @param {Object} props.fileUpload - File upload state and handlers
 * @param {Function} props.fetchWithAuth - Authenticated fetch wrapper
 * @param {string} props.ABSOLUTE_HOST_URL - API base URL
 */
const ChatArea = memo(function ChatArea({
    // Layout
    isMobile,
    isNative,
    safeAreaBottom,
    mobileWebPadding,
    isLeftSidebarVisible,
    setIsLeftSidebarVisible,
    isRightSidebarVisible,
    setIsRightSidebarVisible,
    // Chat state
    activeChat,
    setActiveChat,
    chatTitle,
    isConnected,
    optimizedMessages,
    messageHistoryLoading,
    hasMoreMessages,
    showScrollToBottom,
    setShowScrollToBottom,
    // Search
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    searchInputRef,
    // Selection
    isSelectionMode,
    selectedMessages,
    setSelectedMessages,
    // User
    username,
    isAdmin,
    allUsers,
    // Messages state (for optimistic reaction updates)
    setMessages,
    // Encryption
    hasKey,
    // Modals
    modals,
    openModal,
    closeModal,
    toggleModal,
    // Typing
    activeTypingUsers,
    // Sound & Voice
    soundSettings,
    isInVoice,
    // Handlers
    messageHandlers,
    fileUpload,
    scrollToBottom,
    throttledHandleMessageScroll,
    handleCopyLink,
    toggleNotifications,
    getDeterministicAvatar,
    // Viewer setters
    setZoomedImage,
    setViewingProfile,
    setEditingMessage,
    setReplyingTo,
    setForwardingMessage,
    setGalleryData,
    setChartSymbol,
    // Refs
    messageBoxRef,
    messagesEndRef,
    // Config
    ABSOLUTE_HOST_URL,
    fetchWithAuth,
    // WebSocket ref (for typing indicator)
    ws = null,
}) {
    const { t } = useTranslation();
    const unreadNotifCount = useUIStore((s) => s.unreadNotifCount);
    // Stable callback references
    const handleDragOver = useCallback((e) => e.preventDefault(), []);

    // -- Faz 2.4: New-message unread counter (shown on scroll-to-bottom FAB) --
    const [newMsgCount, setNewMsgCount] = useState(0);
    const prevMsgCountRef = useRef(optimizedMessages.length);
    useEffect(() => {
        const prev = prevMsgCountRef.current;
        const curr = optimizedMessages.length;
        if (curr > prev && showScrollToBottom) {
            setNewMsgCount((c) => c + (curr - prev));
        }
        prevMsgCountRef.current = curr;
    }, [optimizedMessages.length, showScrollToBottom]);
    useEffect(() => {
        if (!showScrollToBottom) setNewMsgCount(0);
    }, [showScrollToBottom]);

    // -- Faz 4.1: Pull-to-refresh (mobile) --
    const [pullDistance, setPullDistance] = useState(0);
    const [isPullRefreshing, setIsPullRefreshing] = useState(false);
    const pullStartYRef = useRef(-1);
    const MAX_PULL = 80;
    const handleMsgBoxTouchStart = useCallback(
        (e) => {
            if (messageBoxRef.current?.scrollTop === 0 && hasMoreMessages) {
                pullStartYRef.current = e.touches[0].clientY;
            } else {
                pullStartYRef.current = -1;
            }
        },
        [messageBoxRef, hasMoreMessages]
    );
    const handleMsgBoxTouchMove = useCallback(
        (e) => {
            if (pullStartYRef.current < 0 || isPullRefreshing) return;
            const dy = e.touches[0].clientY - pullStartYRef.current;
            if (dy > 0 && messageBoxRef.current?.scrollTop === 0) {
                setPullDistance(Math.min(dy * 0.5, MAX_PULL));
            }
        },
        [isPullRefreshing, messageBoxRef]
    );
    const handleMsgBoxTouchEnd = useCallback(async () => {
        if (pullDistance >= MAX_PULL * 0.85 && hasMoreMessages && !messageHistoryLoading) {
            setIsPullRefreshing(true);
            try {
                await messageHandlers.fetchMessageHistory?.();
            } catch (_) { }
            setIsPullRefreshing(false);
        }
        setPullDistance(0);
        pullStartYRef.current = -1;
    }, [pullDistance, hasMoreMessages, messageHistoryLoading, messageHandlers]);

    // -- Faz 4.1: Keyboard-aware scroll (mobile virtual keyboard opens) --
    useEffect(() => {
        if (!isMobile || typeof window === 'undefined' || !window.visualViewport) return;
        let prevH = window.visualViewport.height;
        const handleViewportResize = () => {
            const newH = window.visualViewport.height;
            if (newH < prevH - 80) {
                // Keyboard appeared � scroll message list to bottom
                setTimeout(() => scrollToBottom('smooth'), 120);
            }
            prevH = newH;
        };
        window.visualViewport.addEventListener('resize', handleViewportResize);
        return () => window.visualViewport.removeEventListener('resize', handleViewportResize);
    }, [isMobile, scrollToBottom]);
    const handleOpenLeftSidebar = useCallback(
        () => setIsLeftSidebarVisible(true),
        [setIsLeftSidebarVisible]
    );
    const handleBackToWelcome = useCallback(() => {
        setActiveChat('welcome', 'welcome');
        setIsLeftSidebarVisible(false);
        setIsRightSidebarVisible(false);
    }, [setActiveChat, setIsLeftSidebarVisible, setIsRightSidebarVisible]);
    const handleSearchSubmit = useCallback(
        (e) => messageHandlers.handleSearchMessages(e, debouncedSearchQuery),
        [messageHandlers, debouncedSearchQuery]
    );
    const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), [setSearchQuery]);
    const handleToggleNotifications = useCallback(
        () => toggleModal('notifications'),
        [toggleModal]
    );
    const handleCloseNotifications = useCallback(() => closeModal('notifications'), [closeModal]);
    const handleToggleToolbar = useCallback(() => toggleModal('toolbarMenu'), [toggleModal]);
    const handleOpenRightSidebar = useCallback(
        () => setIsRightSidebarVisible(true),
        [setIsRightSidebarVisible]
    );
    const handleToggleReaction = useCallback(
        async (messageId, emoji) => {
            if (!messageId || !emoji) return;
            // Optimistic update: toggle reaction in local state immediately
            setMessages((prev) =>
                prev.map((msg) => {
                    if (msg.id !== messageId) return msg;
                    const reactions = Array.isArray(msg.reactions) ? msg.reactions : [];
                    const existing = reactions.find(
                        (r) => r.emoji === emoji && r.user_id === msg._currentUserId
                    );
                    const optimisticR = existing
                        ? reactions.filter(
                            (r) => !(r.emoji === emoji && r.user_id === msg._currentUserId)
                        )
                        : [
                            ...reactions,
                            {
                                emoji,
                                user_id: username,
                                username,
                                user: { username, display_name: username },
                            },
                        ];
                    return { ...msg, reactions: optimisticR };
                })
            );
            try {
                await fetchWithAuth(`${ABSOLUTE_HOST_URL}/api/messages/react/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message_id: messageId, emoji }),
                });
            } catch (e) {
                // Rolelback: re-fetch is handled by WS; log error only
                logger.error('[Reaction] toggle failed:', e);
            }
        },
        [setMessages, fetchWithAuth, ABSOLUTE_HOST_URL, username]
    );
    const handleToggleSelection = useCallback(
        (id) => {
            setSelectedMessages((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            );
        },
        [setSelectedMessages]
    );
    const handleViewProfile = useCallback(
        (u) => {
            const usr = Array.isArray(allUsers) ? allUsers.find((a) => a.username === u) : null;
            setViewingProfile(usr || { username: u });
        },
        [setViewingProfile, allUsers]
    );
    const handleOpenGallery = useCallback(
        (images, startIndex) => setGalleryData({ images, startIndex }),
        [setGalleryData]
    );
    const handleScrollToBottom = useCallback(() => {
        scrollToBottom('smooth');
        setShowScrollToBottom(false);
        setNewMsgCount(0);
    }, [scrollToBottom, setShowScrollToBottom]);
    const handleShowCodeSnippet = useCallback(() => openModal('snippetModal'), [openModal]);
    const handleClearPendingFiles = useCallback(
        () => fileUpload.setPendingFilesFromDrop([]),
        [fileUpload]
    );

    // Stable render callback for VirtualMessageList
    const renderVirtualMessage = useCallback(
        (msg, index) => {
            const prevMsg = index > 0 ? optimizedMessages[index - 1] : null;
            const sameUser = prevMsg && prevMsg.username === msg.username;
            const sameDay =
                prevMsg &&
                msg.timestamp &&
                prevMsg.timestamp &&
                new Date(msg.timestamp).toDateString() ===
                new Date(prevMsg.timestamp).toDateString();
            const withinGroupTime =
                sameDay &&
                msg.timestamp &&
                prevMsg.timestamp &&
                new Date(msg.timestamp) - new Date(prevMsg.timestamp) < 5 * 60 * 1000;
            const isGrouped =
                sameUser && withinGroupTime && !msg.reply_to && !prevMsg.reply_to && !msg.is_pinned;
            return (
                <Message
                    key={msg.id || msg.temp_id || index}
                    msg={msg}
                    currentUser={username}
                    absoluteHostUrl={ABSOLUTE_HOST_URL}
                    isAdmin={isAdmin}
                    onImageClick={setZoomedImage}
                    fetchWithAuth={fetchWithAuth}
                    allUsers={allUsers}
                    getDeterministicAvatar={getDeterministicAvatar}
                    onShowChart={setChartSymbol}
                    onDelete={messageHandlers.handleDeleteMessage}
                    onStartEdit={setEditingMessage}
                    onSetReply={setReplyingTo}
                    onToggleReaction={handleToggleReaction}
                    onStartForward={setForwardingMessage}
                    isSelectionMode={isSelectionMode}
                    isSelected={selectedMessages.has(msg.id)}
                    onToggleSelection={handleToggleSelection}
                    onScrollToMessage={messageHandlers.scrollToMessage}
                    onViewProfile={handleViewProfile}
                    onTogglePin={messageHandlers.handleTogglePin}
                    onVisible={messageHandlers.handleMessageVisible}
                    isGrouped={isGrouped}
                />
            );
        },
        [
            username,
            ABSOLUTE_HOST_URL,
            isAdmin,
            setZoomedImage,
            fetchWithAuth,
            allUsers,
            getDeterministicAvatar,
            setChartSymbol,
            messageHandlers,
            setEditingMessage,
            setReplyingTo,
            handleToggleReaction,
            setForwardingMessage,
            isSelectionMode,
            selectedMessages,
            handleToggleSelection,
            handleViewProfile,
        ]
    );

    // Memoized message list with gallery grouping
    const GROUP_MS = 5 * 60 * 1000;
    const renderedMessages = useMemo(() => {
        const elements = [];
        let i = 0;
        let lastRealMsg = null; // track last non-gallery message for group detection
        while (i < optimizedMessages.length) {
            const msg = optimizedMessages[i];
            const key = msg.id || msg.temp_id || i;
            const prevMsg = i > 0 ? optimizedMessages[i - 1] : null;
            const showDateDivider =
                !prevMsg ||
                (msg.timestamp &&
                    prevMsg.timestamp &&
                    new Date(msg.timestamp).toDateString() !==
                    new Date(prevMsg.timestamp).toDateString());
            // Grouping: same user, same day, within 5 min, no date divider, no reply, no pin
            const isGrouped =
                !showDateDivider &&
                lastRealMsg &&
                lastRealMsg.username === msg.username &&
                !msg.reply_to &&
                !lastRealMsg.reply_to &&
                !msg.is_pinned &&
                msg.timestamp &&
                lastRealMsg.timestamp &&
                new Date(msg.timestamp) - new Date(lastRealMsg.timestamp) < GROUP_MS;
            if (isImageOnlyMessage(msg)) {
                const galleryMsgs = [msg];
                let j = i + 1;
                while (
                    j < optimizedMessages.length &&
                    isImageOnlyMessage(optimizedMessages[j]) &&
                    optimizedMessages[j].username === msg.username &&
                    msg.timestamp &&
                    optimizedMessages[j].timestamp &&
                    Math.abs(new Date(optimizedMessages[j].timestamp) - new Date(msg.timestamp)) <
                    300000
                ) {
                    galleryMsgs.push(optimizedMessages[j]);
                    j++;
                }
                if (galleryMsgs.length >= 2) {
                    elements.push(
                        <React.Fragment
                            key={`gallery-${galleryMsgs.map((m) => m.id || m.temp_id).join('-')}`}
                        >
                            {showDateDivider && msg.timestamp && (
                                <MessageDateDivider date={msg.timestamp} />
                            )}
                            <ImageGalleryGroup
                                messages={galleryMsgs}
                                currentUser={username}
                                absoluteHostUrl={ABSOLUTE_HOST_URL}
                                isAdmin={isAdmin}
                                onOpenGallery={handleOpenGallery}
                                onViewProfile={handleViewProfile}
                                onDelete={messageHandlers.handleDeleteMessage}
                                allUsers={allUsers}
                                getDeterministicAvatar={getDeterministicAvatar}
                                fetchWithAuth={fetchWithAuth}
                                onVisible={messageHandlers.handleMessageVisible}
                            />
                        </React.Fragment>
                    );
                    lastRealMsg = galleryMsgs[galleryMsgs.length - 1];
                    i = j;
                    continue;
                }
            }
            elements.push(
                <React.Fragment key={key}>
                    {showDateDivider && msg.timestamp && (
                        <MessageDateDivider date={msg.timestamp} />
                    )}
                    <Message
                        msg={msg}
                        currentUser={username}
                        absoluteHostUrl={ABSOLUTE_HOST_URL}
                        isAdmin={isAdmin}
                        onImageClick={setZoomedImage}
                        fetchWithAuth={fetchWithAuth}
                        allUsers={allUsers}
                        getDeterministicAvatar={getDeterministicAvatar}
                        onShowChart={setChartSymbol}
                        onDelete={messageHandlers.handleDeleteMessage}
                        onStartEdit={setEditingMessage}
                        onSetReply={setReplyingTo}
                        onToggleReaction={handleToggleReaction}
                        onStartForward={setForwardingMessage}
                        isSelectionMode={isSelectionMode}
                        isSelected={selectedMessages.includes(msg.id)}
                        onToggleSelection={handleToggleSelection}
                        onScrollToMessage={messageHandlers.scrollToMessage}
                        onViewProfile={handleViewProfile}
                        onTogglePin={messageHandlers.handleTogglePin}
                        onVisible={messageHandlers.handleMessageVisible}
                        isGrouped={!!isGrouped}
                    />
                </React.Fragment>
            );
            lastRealMsg = msg;
            i++;
        }
        return elements;
    }, [
        optimizedMessages,
        selectedMessages,
        isSelectionMode,
        username,
        ABSOLUTE_HOST_URL,
        isAdmin,
        setZoomedImage,
        fetchWithAuth,
        allUsers,
        getDeterministicAvatar,
        setChartSymbol,
        messageHandlers,
        setEditingMessage,
        setReplyingTo,
        handleToggleReaction,
        setForwardingMessage,
        handleToggleSelection,
        handleViewProfile,
        handleOpenGallery,
    ]);

    return (
        <div
            style={_st1054}
            className="chat-area-root"
            onDrop={fileUpload.handleChatDrop}
            onDragOver={handleDragOver}
            onDragEnter={fileUpload.handleChatDragEnter}
            onDragLeave={fileUpload.handleChatDragLeave}
        >
            {/* CHAT HEADER */}
            <div style={_st1055} className="chat-header-elevated">
                <div>
                    {isMobile && !isLeftSidebarVisible && (
                        <button onClick={handleOpenLeftSidebar} style={_st1056}>
                            ?
                        </button>
                    )}
                    {isMobile && (activeChat.type === 'dm' || activeChat.type === 'room') && (
                        <button onClick={handleBackToWelcome} style={_st1057}>
                            ?
                        </button>
                    )}
                    <h2
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            margin: 0,
                            fontSize: isMobile ? '1em' : '1rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: "'gg sans', 'Noto Sans', sans-serif",
                        }}
                    >
                        {activeChat.type === 'room' && <span>#</span>}
                        {chatTitle}
                    </h2>
                    {!isConnected && (
                        <div style={styles.connectionPillOffline}>{t('chat.connecting')}</div>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: isMobile ? '5px' : '10px',
                        alignItems: 'center',
                        flexWrap: isMobile ? 'nowrap' : 'wrap',
                        position: 'relative',
                    }}
                >
                    <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={styles.searchInput}
                            ref={searchInputRef}
                        />
                        <FaSearch style={styles.searchIcon} />
                    </form>
                    {activeTypingUsers.length > 0 && (
                        <TypingIndicatorEnhanced users={activeTypingUsers} />
                    )}
                    <button
                        onClick={handleToggleNotifications}
                        style={{
                            ...styles.iconButton,
                            color: modals.notifications ? '#5865f2' : '#b5bac1',
                            position: 'relative',
                        }}
                        title={t('chat.notifications')}
                        aria-label={t('chat.notifications')}
                        aria-expanded={!!modals.notifications}
                    >
                        <FaBell />
                        {unreadNotifCount > 0 && (
                            <span
                                aria-label={t('notifications.unreadCount', { count: unreadNotifCount })}
                                style={{
                                    position: 'absolute',
                                    top: -4,
                                    right: -4,
                                    minWidth: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    background: '#ed4245',
                                    color: '#fff',
                                    fontSize: 10,
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0 3px',
                                    animation: 'notifPulse 1.5s ease-in-out infinite',
                                    pointerEvents: 'none',
                                }}
                            >
                                {unreadNotifCount > 99 ? '99+' : unreadNotifCount}
                            </span>
                        )}
                    </button>
                    {modals.notifications && (
                        <div>
                            <Suspense fallback={<LoadingSpinner size="small" text="" />}>
                                <NotificationDropdown
                                    currentUser={username}
                                    onClose={handleCloseNotifications}
                                    fetchWithAuth={fetchWithAuth}
                                    apiBaseUrl={ABSOLUTE_HOST_URL}
                                />
                            </Suspense>
                        </div>
                    )}
                    <div className="toolbar-menu-container">
                        <button
                            onClick={handleToggleToolbar}
                            style={{
                                ...styles.iconButton,
                                color: modals.toolbarMenu ? '#5865f2' : '#b5bac1',
                                fontSize: '1.2em',
                                fontWeight: 'bold',
                            }}
                            title={t('chat.moreOptions')}
                            aria-label={t('chat.moreOptions')}
                            aria-expanded={!!modals.toolbarMenu}
                        >
                            <FaEllipsisV />
                        </button>
                        {modals.toolbarMenu && (
                            <ToolbarMenu
                                activeChat={activeChat}
                                hasKey={hasKey}
                                modals={modals}
                                soundSettings={soundSettings}
                                isInVoice={isInVoice}
                                username={username}
                                openModal={openModal}
                                closeModal={closeModal}
                                toggleModal={toggleModal}
                                handleCopyLink={handleCopyLink}
                                toggleNotifications={toggleNotifications}
                                handleSummarize={messageHandlers.handleSummarize}
                                handleClearChat={messageHandlers.handleClearChat}
                                handleAdminDeleteConversation={
                                    messageHandlers.handleAdminDeleteConversation
                                }
                            />
                        )}
                    </div>
                    {isMobile && !isRightSidebarVisible && (
                        <button
                            onClick={handleOpenRightSidebar}
                            style={_st1056}
                            aria-label={t('nav.openMembersPanel', 'Open members panel')}
                        >
                            <FaUsers />
                        </button>
                    )}
                </div>
            </div>

            {/* MESSAGE LIST */}
            <div
                style={styles.messageBox}
                ref={messageBoxRef}
                onScroll={throttledHandleMessageScroll}
                className="chat-message-box"
                id="chat-message-list"
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-label={t('nav.messageList', 'Message list')}
                onTouchStart={handleMsgBoxTouchStart}
                onTouchMove={handleMsgBoxTouchMove}
                onTouchEnd={handleMsgBoxTouchEnd}
            >
                {/* Faz 4.1: Pull-to-refresh indicator */}
                {(pullDistance > 10 || isPullRefreshing) && (
                    <div
                        className="pull-refresh-indicator"
                        style={{ opacity: isPullRefreshing ? 1 : pullDistance / MAX_PULL }}
                    >
                        <div className="spinner" />
                        {isPullRefreshing
                            ? t('chat.pullRefreshing')
                            : pullDistance >= MAX_PULL * 0.85
                                ? t('chat.pullRelease')
                                : t('chat.pullDrag')}
                    </div>
                )}
                <Suspense
                    fallback={<p style={styles.systemMessage}>{t('chat.loadingMessages')}</p>}
                >
                    {messageHistoryLoading && optimizedMessages.length === 0 ? (
                        <MessageSkeleton count={6} />
                    ) : optimizedMessages.length === 0 && !messageHistoryLoading ? (
                        /* Empty state — context-aware for DM vs channel */
                        <div className="chat-empty-state">
                            <div className="chat-empty-icon-ring">
                                <span role="img" aria-label={activeChat.type === 'dm' ? 'direct message' : 'paw'}>
                                    {activeChat.type === 'dm' ? '💬' : '🐾'}
                                </span>
                            </div>
                            <div className="chat-empty-title">
                                {activeChat.type === 'dm'
                                    ? t('chat.dmWelcomeTitle', 'Start a conversation')
                                    : t('chat.welcomeTitle')}
                            </div>
                            <div className="chat-empty-subtitle">
                                {activeChat.type === 'dm'
                                    ? t('chat.dmWelcomeSubtitle', 'Say hello to {{name}}! 👋', { name: chatTitle })
                                    : t('chat.welcomeSubtitle')}
                            </div>
                        </div>
                    ) : optimizedMessages.length > 50 ? (
                        <VirtualMessageList
                            messages={optimizedMessages}
                            scrollToBottom={true}
                            renderMessage={renderVirtualMessage}
                        />
                    ) : (
                        <>
                            {hasMoreMessages && optimizedMessages.length > 0 && (
                                <div className="load-more-row">
                                    {messageHistoryLoading ? (
                                        <div className="pull-refresh-indicator">
                                            <div className="spinner" />
                                            {t('chat.loadingOlderMessages')}
                                        </div>
                                    ) : (
                                        <p style={_st1058}>{t('chat.scrollOlderMessages')}</p>
                                    )}
                                </div>
                            )}
                            {renderedMessages}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </Suspense>
            </div>

            {/* DRAG OVERLAY */}
            {fileUpload.isDragging && (
                <div className="chat-drop-overlay">
                    <div className="chat-drop-icon" role="img" aria-hidden="true">📁</div>
                    <div className="chat-drop-title">{t('chat.dropFilesHere')}</div>
                    <div className="chat-drop-sub">{t('chat.dropFilesDesc')}</div>
                </div>
            )}

            {showScrollToBottom && (
                <ScrollToBottomButton onClick={handleScrollToBottom} unreadCount={newMsgCount} />
            )}

            <div
                style={{
                    ...styles.inputContainer,
                    paddingBottom: isNative
                        ? `calc(16px + ${safeAreaBottom})`
                        : isMobile
                            ? '25px'
                            : '20px',
                }}
                className="chat-input-outer"
            >
                {fileUpload.isUploading && fileUpload.uploadProgress > 0 && (
                    <div className="upload-progress-wrap">
                        <span className="upload-progress-label">
                            {t('chat.uploading', { progress: fileUpload.uploadProgress })}
                        </span>
                        <div className="upload-progress-track">
                            <div
                                className="upload-progress-fill"
                                style={{ width: `${fileUpload.uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}
                <Suspense fallback={<div>{t('common.loading')}</div>}>
                    <MessageInput
                        onSendMessage={messageHandlers.sendMessage}
                        onFileUpload={fileUpload.uploadFile}
                        onShowCodeSnippet={handleShowCodeSnippet}
                        placeholder={
                            chatTitle
                                ? activeChat.type === 'dm'
                                    ? t('chat.dmPlaceholder', { name: chatTitle })
                                    : t('chat.channelPlaceholder', { name: chatTitle })
                                : t('chat.typeMessage')
                        }
                        disabled={fileUpload.isUploading}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={ABSOLUTE_HOST_URL}
                        activeChat={activeChat}
                        pendingFilesFromDrop={fileUpload.pendingFilesFromDrop}
                        onClearPendingFiles={handleClearPendingFiles}
                        ws={ws}
                        username={username}
                    />
                </Suspense>
            </div>
        </div>
    );
});

ChatArea.displayName = 'ChatArea';

ChatArea.propTypes = {
    isNative: PropTypes.bool,
    safeAreaBottom: PropTypes.object,
    mobileWebPadding: PropTypes.object,
    isLeftSidebarVisible: PropTypes.bool,
    setIsLeftSidebarVisible: PropTypes.func,
    isRightSidebarVisible: PropTypes.bool,
    setIsRightSidebarVisible: PropTypes.func,
    setActiveChat: PropTypes.func,
    chatTitle: PropTypes.string,
    isConnected: PropTypes.bool,
    optimizedMessages: PropTypes.array,
    messageHistoryLoading: PropTypes.string,
    hasMoreMessages: PropTypes.bool,
    showScrollToBottom: PropTypes.bool,
    setShowScrollToBottom: PropTypes.func,
    setSearchQuery: PropTypes.func,
    debouncedSearchQuery: PropTypes.object,
    searchInputRef: PropTypes.string,
    selectedMessages: PropTypes.object,
    setSelectedMessages: PropTypes.func,
    isAdmin: PropTypes.bool,
    allUsers: PropTypes.array,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    toggleModal: PropTypes.func,
    isInVoice: PropTypes.bool,
    fileUpload: PropTypes.object,
    scrollToBottom: PropTypes.func,
    throttledHandleMessageScroll: PropTypes.object,
    handleCopyLink: PropTypes.func,
    toggleNotifications: PropTypes.func,
    getDeterministicAvatar: PropTypes.func,
    setViewingProfile: PropTypes.func,
    setEditingMessage: PropTypes.func,
    setReplyingTo: PropTypes.func,
    setForwardingMessage: PropTypes.func,
    setGalleryData: PropTypes.func,
    setChartSymbol: PropTypes.func,
    messagesEndRef: PropTypes.object,
    fetchWithAuth: PropTypes.func,
};
export default ChatArea;
