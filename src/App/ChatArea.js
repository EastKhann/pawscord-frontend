/**
 * 💬 ChatArea — Main chat rendering section
 * Extracted from App.js: header, message list, drag overlay, input container
 */
import React, { Suspense, memo, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { FaBell, FaUsers, FaSearch } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import ScrollToBottomButton from '../components/ScrollToBottomButton';
import MessageDateDivider from '../components/MessageDateDivider';
import TypingIndicatorEnhanced from '../components/TypingIndicatorEnhanced';
import ImageGalleryGroup from '../components/ImageGalleryGroup';
import {
    Message, VirtualMessageList, MessageInput, NotificationDropdown,
} from './lazyImports';
import ToolbarMenu from './ToolbarMenu';
import MessageSkeleton from '../components/MessageSkeleton';
import styles from '../styles/appStyles';

const isImageOnlyMessage = (msg) => {
    if (!msg) return false;
    const hasImage = !!(msg.image_url || msg.image);
    const hasFileImage = !!(msg.file_url || msg.file) && !msg.is_voice_message && /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(msg.file_name || '');
    const hasContent = !!(msg.content && msg.content.trim());
    return (hasImage || hasFileImage) && !hasContent && !msg.poll && !msg.reply_to;
};

export default memo(function ChatArea({
    // Layout
    isMobile, isNative, safeAreaBottom, mobileWebPadding,
    isLeftSidebarVisible, setIsLeftSidebarVisible,
    isRightSidebarVisible, setIsRightSidebarVisible,
    // Chat state
    activeChat, setActiveChat, chatTitle, isConnected,
    optimizedMessages, messageHistoryLoading, hasMoreMessages,
    showScrollToBottom, setShowScrollToBottom,
    // Search
    searchQuery, setSearchQuery, debouncedSearchQuery, searchInputRef,
    // Selection
    isSelectionMode, selectedMessages, setSelectedMessages,
    // User
    username, isAdmin, allUsers,
    // Encryption
    hasKey,
    // Modals
    modals, openModal, closeModal, toggleModal,
    // Typing
    activeTypingUsers,
    // Sound & Voice
    soundSettings, isInVoice,
    // Handlers
    messageHandlers, fileUpload,
    scrollToBottom, throttledHandleMessageScroll,
    handleCopyLink, toggleNotifications,
    getDeterministicAvatar,
    // Viewer setters
    setZoomedImage, setViewingProfile, setEditingMessage,
    setReplyingTo, setForwardingMessage, setGalleryData,
    setChartSymbol,
    // Refs
    messageBoxRef, messagesEndRef,
    // Config
    ABSOLUTE_HOST_URL, fetchWithAuth,
}) {
    // Stable callback references
    const handleDragOver = useCallback((e) => e.preventDefault(), []);

    // ── Faz 2.4: New-message unread counter (shown on scroll-to-bottom FAB) ──
    const [newMsgCount, setNewMsgCount] = useState(0);
    const prevMsgCountRef = useRef(optimizedMessages.length);
    useEffect(() => {
        const prev = prevMsgCountRef.current;
        const curr = optimizedMessages.length;
        if (curr > prev && showScrollToBottom) {
            setNewMsgCount(c => c + (curr - prev));
        }
        prevMsgCountRef.current = curr;
    }, [optimizedMessages.length, showScrollToBottom]);
    useEffect(() => {
        if (!showScrollToBottom) setNewMsgCount(0);
    }, [showScrollToBottom]);

    // ── Faz 4.1: Pull-to-refresh (mobile) ──
    const [pullDistance, setPullDistance] = useState(0);
    const [isPullRefreshing, setIsPullRefreshing] = useState(false);
    const pullStartYRef = useRef(-1);
    const MAX_PULL = 80;
    const handleMsgBoxTouchStart = useCallback((e) => {
        if (messageBoxRef.current?.scrollTop === 0 && hasMoreMessages) {
            pullStartYRef.current = e.touches[0].clientY;
        } else {
            pullStartYRef.current = -1;
        }
    }, [messageBoxRef, hasMoreMessages]);
    const handleMsgBoxTouchMove = useCallback((e) => {
        if (pullStartYRef.current < 0 || isPullRefreshing) return;
        const dy = e.touches[0].clientY - pullStartYRef.current;
        if (dy > 0 && messageBoxRef.current?.scrollTop === 0) {
            setPullDistance(Math.min(dy * 0.5, MAX_PULL));
        }
    }, [isPullRefreshing, messageBoxRef]);
    const handleMsgBoxTouchEnd = useCallback(async () => {
        if (pullDistance >= MAX_PULL * 0.85 && hasMoreMessages && !messageHistoryLoading) {
            setIsPullRefreshing(true);
            try { await messageHandlers.fetchMessageHistory?.(); } catch (_) { }
            setIsPullRefreshing(false);
        }
        setPullDistance(0);
        pullStartYRef.current = -1;
    }, [pullDistance, hasMoreMessages, messageHistoryLoading, messageHandlers]);

    // ── Faz 4.1: Keyboard-aware scroll (mobile virtual keyboard opens) ──
    useEffect(() => {
        if (!isMobile || typeof window === 'undefined' || !window.visualViewport) return;
        let prevH = window.visualViewport.height;
        const handleViewportResize = () => {
            const newH = window.visualViewport.height;
            if (newH < prevH - 80) {
                // Keyboard appeared — scroll message list to bottom
                setTimeout(() => scrollToBottom('smooth'), 120);
            }
            prevH = newH;
        };
        window.visualViewport.addEventListener('resize', handleViewportResize);
        return () => window.visualViewport.removeEventListener('resize', handleViewportResize);
    }, [isMobile, scrollToBottom]);
    const handleOpenLeftSidebar = useCallback(() => setIsLeftSidebarVisible(true), [setIsLeftSidebarVisible]);
    const handleBackToWelcome = useCallback(() => {
        setActiveChat('welcome', 'welcome');
        setIsLeftSidebarVisible(false);
        setIsRightSidebarVisible(false);
    }, [setActiveChat, setIsLeftSidebarVisible, setIsRightSidebarVisible]);
    const handleSearchSubmit = useCallback((e) => messageHandlers.handleSearchMessages(e, debouncedSearchQuery), [messageHandlers, debouncedSearchQuery]);
    const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), [setSearchQuery]);
    const handleToggleNotifications = useCallback(() => toggleModal('notifications'), [toggleModal]);
    const handleCloseNotifications = useCallback(() => closeModal('notifications'), [closeModal]);
    const handleToggleToolbar = useCallback(() => toggleModal('toolbarMenu'), [toggleModal]);
    const handleOpenRightSidebar = useCallback(() => setIsRightSidebarVisible(true), [setIsRightSidebarVisible]);
    const handleToggleReaction = useCallback(() => { }, []);
    const handleToggleSelection = useCallback((id) => {
        setSelectedMessages(prev => { const s = new Set(prev); if (s.has(id)) s.delete(id); else s.add(id); return s; });
    }, [setSelectedMessages]);
    const handleViewProfile = useCallback((u) => setViewingProfile(allUsers.find(usr => usr.username === u)), [setViewingProfile, allUsers]);
    const handleOpenGallery = useCallback((images, startIndex) => setGalleryData({ images, startIndex }), [setGalleryData]);
    const handleScrollToBottom = useCallback(() => { scrollToBottom('smooth'); setShowScrollToBottom(false); setNewMsgCount(0); }, [scrollToBottom, setShowScrollToBottom]);
    const handleShowCodeSnippet = useCallback(() => openModal('snippetModal'), [openModal]);
    const handleClearPendingFiles = useCallback(() => fileUpload.setPendingFilesFromDrop([]), [fileUpload]);

    // Stable render callback for VirtualMessageList
    const renderVirtualMessage = useCallback((msg, index) => {
        const prevMsg = index > 0 ? optimizedMessages[index - 1] : null;
        const sameUser = prevMsg && prevMsg.username === msg.username;
        const sameDay = prevMsg && msg.timestamp && prevMsg.timestamp &&
            new Date(msg.timestamp).toDateString() === new Date(prevMsg.timestamp).toDateString();
        const withinGroupTime = sameDay && msg.timestamp && prevMsg.timestamp &&
            (new Date(msg.timestamp) - new Date(prevMsg.timestamp)) < 5 * 60 * 1000;
        const isGrouped = sameUser && withinGroupTime && !msg.reply_to && !prevMsg.reply_to && !msg.is_pinned;
        return (
            <Message key={msg.id || msg.temp_id || index} msg={msg} currentUser={username}
                absoluteHostUrl={ABSOLUTE_HOST_URL} isAdmin={isAdmin}
                onImageClick={setZoomedImage} fetchWithAuth={fetchWithAuth}
                allUsers={allUsers} getDeterministicAvatar={getDeterministicAvatar}
                onShowChart={setChartSymbol} onDelete={messageHandlers.handleDeleteMessage}
                onStartEdit={setEditingMessage} onSetReply={setReplyingTo}
                onToggleReaction={handleToggleReaction} onStartForward={setForwardingMessage}
                isSelectionMode={isSelectionMode} isSelected={selectedMessages.has(msg.id)}
                onToggleSelection={handleToggleSelection}
                onScrollToMessage={messageHandlers.scrollToMessage}
                onViewProfile={handleViewProfile}
                onTogglePin={messageHandlers.handleTogglePin}
                onVisible={messageHandlers.handleMessageVisible}
                isGrouped={isGrouped} />
        );
    }, [username, ABSOLUTE_HOST_URL, isAdmin, setZoomedImage, fetchWithAuth, allUsers,
        getDeterministicAvatar, setChartSymbol, messageHandlers, setEditingMessage,
        setReplyingTo, handleToggleReaction, setForwardingMessage, isSelectionMode,
        selectedMessages, handleToggleSelection, handleViewProfile]);

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
            const showDateDivider = !prevMsg || (msg.timestamp && prevMsg.timestamp && new Date(msg.timestamp).toDateString() !== new Date(prevMsg.timestamp).toDateString());
            // Grouping: same user, same day, within 5 min, no date divider, no reply, no pin
            const isGrouped = !showDateDivider && lastRealMsg &&
                lastRealMsg.username === msg.username &&
                !msg.reply_to && !lastRealMsg.reply_to &&
                !msg.is_pinned &&
                msg.timestamp && lastRealMsg.timestamp &&
                (new Date(msg.timestamp) - new Date(lastRealMsg.timestamp)) < GROUP_MS;
            if (isImageOnlyMessage(msg)) {
                const galleryMsgs = [msg];
                let j = i + 1;
                while (j < optimizedMessages.length && isImageOnlyMessage(optimizedMessages[j]) && optimizedMessages[j].username === msg.username && msg.timestamp && optimizedMessages[j].timestamp && Math.abs(new Date(optimizedMessages[j].timestamp) - new Date(msg.timestamp)) < 300000) { galleryMsgs.push(optimizedMessages[j]); j++; }
                if (galleryMsgs.length >= 2) {
                    elements.push(
                        <React.Fragment key={`gallery-${galleryMsgs.map(m => m.id || m.temp_id).join('-')}`}>
                            {showDateDivider && msg.timestamp && <MessageDateDivider date={msg.timestamp} />}
                            <ImageGalleryGroup messages={galleryMsgs} currentUser={username} absoluteHostUrl={ABSOLUTE_HOST_URL} isAdmin={isAdmin}
                                onOpenGallery={handleOpenGallery} onViewProfile={handleViewProfile}
                                onDelete={messageHandlers.handleDeleteMessage} allUsers={allUsers} getDeterministicAvatar={getDeterministicAvatar}
                                fetchWithAuth={fetchWithAuth} onVisible={messageHandlers.handleMessageVisible} />
                        </React.Fragment>
                    );
                    lastRealMsg = galleryMsgs[galleryMsgs.length - 1];
                    i = j; continue;
                }
            }
            elements.push(
                <React.Fragment key={key}>
                    {showDateDivider && msg.timestamp && <MessageDateDivider date={msg.timestamp} />}
                    <Message msg={msg} currentUser={username} absoluteHostUrl={ABSOLUTE_HOST_URL} isAdmin={isAdmin}
                        onImageClick={setZoomedImage} fetchWithAuth={fetchWithAuth}
                        allUsers={allUsers} getDeterministicAvatar={getDeterministicAvatar}
                        onShowChart={setChartSymbol} onDelete={messageHandlers.handleDeleteMessage}
                        onStartEdit={setEditingMessage} onSetReply={setReplyingTo}
                        onToggleReaction={handleToggleReaction} onStartForward={setForwardingMessage}
                        isSelectionMode={isSelectionMode} isSelected={selectedMessages.has(msg.id)}
                        onToggleSelection={handleToggleSelection}
                        onScrollToMessage={messageHandlers.scrollToMessage}
                        onViewProfile={handleViewProfile}
                        onTogglePin={messageHandlers.handleTogglePin}
                        onVisible={messageHandlers.handleMessageVisible}
                        isGrouped={!!isGrouped} />
                </React.Fragment>
            );
            lastRealMsg = msg;
            i++;
        }
        return elements;
    }, [optimizedMessages, selectedMessages, isSelectionMode, username, ABSOLUTE_HOST_URL, isAdmin,
        setZoomedImage, fetchWithAuth, allUsers, getDeterministicAvatar, setChartSymbol,
        messageHandlers, setEditingMessage, setReplyingTo, handleToggleReaction, setForwardingMessage,
        handleToggleSelection, handleViewProfile, handleOpenGallery]);

    return (
        <div style={{ ...styles.chatArea, position: 'relative', paddingTop: mobileWebPadding, boxSizing: 'border-box' }}
            onDrop={fileUpload.handleChatDrop} onDragOver={handleDragOver}
            onDragEnter={fileUpload.handleChatDragEnter} onDragLeave={fileUpload.handleChatDragLeave}>

            {/* CHAT HEADER */}
            <div style={{ ...styles.chatHeader, justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', gap: '8px' }}>
                    {isMobile && !isLeftSidebarVisible && <button onClick={handleOpenLeftSidebar} style={{ ...styles.mobileMenuButton, fontSize: '1.3em' }}>☰</button>}
                    {isMobile && (activeChat.type === 'dm' || activeChat.type === 'room') && (
                        <button onClick={handleBackToWelcome} style={{ ...styles.mobileMenuButton, fontSize: '1.2em' }}>←</button>
                    )}
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontSize: isMobile ? '1em' : '1rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "'gg sans', 'Noto Sans', sans-serif" }}>
                        {activeChat.type === 'room' && <span style={{ color: '#949ba4', fontWeight: 500 }}>#</span>}
                        {chatTitle}
                    </h2>
                    {!isConnected && <div style={styles.connectionPillOffline}>Bağlanıyor...</div>}
                </div>
                <div style={{ display: 'flex', gap: isMobile ? '5px' : '10px', alignItems: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap', position: 'relative' }}>
                    <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                        <input type="text" placeholder="Ara..." value={searchQuery} onChange={handleSearchChange} style={styles.searchInput} ref={searchInputRef} />
                        <FaSearch style={styles.searchIcon} />
                    </form>
                    {!isMobile && activeTypingUsers.length > 0 && <TypingIndicatorEnhanced users={activeTypingUsers} />}
                    {isMobile && activeTypingUsers.length > 0 && <TypingIndicatorEnhanced users={activeTypingUsers} />}
                    <button onClick={handleToggleNotifications} style={{ ...styles.iconButton, color: modals.notifications ? '#5865f2' : '#b9bbbe', position: 'relative' }} title="Bildirimler"><FaBell /></button>
                    {modals.notifications && (
                        <div style={{ position: 'absolute', top: '54px', right: '20px', zIndex: 1000 }}>
                            <Suspense fallback={<LoadingSpinner size="small" text="" />}>
                                <NotificationDropdown currentUser={username} onClose={handleCloseNotifications} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} />
                            </Suspense>
                        </div>
                    )}
                    <div className="toolbar-menu-container" style={{ position: 'relative' }}>
                        <button onClick={handleToggleToolbar} style={{ ...styles.iconButton, color: modals.toolbarMenu ? '#5865f2' : '#b9bbbe', fontSize: '1.2em', fontWeight: 'bold' }} title="Daha Fazla">⋮</button>
                        {modals.toolbarMenu && (
                            <ToolbarMenu
                                activeChat={activeChat} hasKey={hasKey} modals={modals}
                                soundSettings={soundSettings} isInVoice={isInVoice} username={username}
                                openModal={openModal} closeModal={closeModal} toggleModal={toggleModal}
                                handleCopyLink={handleCopyLink} toggleNotifications={toggleNotifications}
                                handleSummarize={messageHandlers.handleSummarize}
                                handleClearChat={messageHandlers.handleClearChat}
                                handleAdminDeleteConversation={messageHandlers.handleAdminDeleteConversation}
                            />
                        )}
                    </div>
                    {isMobile && !isRightSidebarVisible && <button onClick={handleOpenRightSidebar} style={{ ...styles.mobileMenuButton, fontSize: '1.3em' }}><FaUsers /></button>}
                </div>
            </div>

            {/* MESSAGE LIST */}
            <div style={styles.messageBox} ref={messageBoxRef} onScroll={throttledHandleMessageScroll}
                id="main-content" role="log" aria-live="polite" aria-relevant="additions" aria-label="Mesaj listesi"
                onTouchStart={handleMsgBoxTouchStart}
                onTouchMove={handleMsgBoxTouchMove}
                onTouchEnd={handleMsgBoxTouchEnd}
            >
                {/* Faz 4.1: Pull-to-refresh indicator */}
                {(pullDistance > 10 || isPullRefreshing) && (
                    <div className="pull-refresh-indicator" style={{ opacity: isPullRefreshing ? 1 : pullDistance / MAX_PULL }}>
                        <div className="spinner" />
                        {isPullRefreshing ? 'Yükleniyor...' : pullDistance >= MAX_PULL * 0.85 ? 'Bırak → Yükle' : 'Çek → Eski mesajlar'}
                    </div>
                )}
                <Suspense fallback={<p style={styles.systemMessage}>Mesajlar yükleniyor...</p>}>
                    {messageHistoryLoading && optimizedMessages.length === 0 ? (
                        <MessageSkeleton count={6} />
                    ) : optimizedMessages.length === 0 && !messageHistoryLoading ? (
                        /* Empty state illustration */
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', userSelect: 'none', gap: '4px' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(88,101,242,0.15) 0%, rgba(139,92,246,0.15) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                                <span style={{ fontSize: '36px' }}>🐾</span>
                            </div>
                            <div style={{ color: '#f2f3f5', fontSize: '1.3em', fontWeight: 700, fontFamily: "'gg sans', 'Noto Sans', sans-serif" }}>Sohbete hoş geldin!</div>
                            <div style={{ color: '#949ba4', fontSize: '0.95em', fontWeight: 400, marginTop: '2px' }}>İlk mesajı göndererek sohbeti başlat 💬</div>
                        </div>
                    ) : optimizedMessages.length > 50 ? (
                        <VirtualMessageList messages={optimizedMessages} scrollToBottom={true}
                            renderMessage={renderVirtualMessage} />
                    ) : (
                        <>
                            {/* Faz 2.4: Infinite scroll load-more row with animated indicator */}
                            {hasMoreMessages && optimizedMessages.length > 0 && (
                                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                                    {messageHistoryLoading
                                        ? <div className="pull-refresh-indicator"><div className="spinner" />Eski mesajlar yükleniyor...</div>
                                        : <p style={{ ...styles.systemMessage, opacity: 0.55, fontSize: '0.85em', margin: 0 }}>⬆ Yukarı kaydırarak eski mesajları yükleyin</p>
                                    }
                                </div>
                            )}
                            {renderedMessages}
                            <div ref={messagesEndRef} style={{ float: "left", clear: "both", height: 1 }} />
                        </>
                    )}
                </Suspense>
            </div>

            {/* DRAG OVERLAY */}
            {fileUpload.isDragging && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(30, 31, 34, 0.92)', border: '3px dashed #5865f2', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1000, animation: 'dropZoneFadeIn 0.18s ease' }}>
                    <div style={{ fontSize: '56px', marginBottom: '14px', animation: 'dropIconBounce 0.4s cubic-bezier(0.175,0.885,0.32,1.275)' }}>📁</div>
                    <div style={{ color: '#5865f2', fontSize: '1.4em', fontWeight: 700, letterSpacing: '0.2px' }}>Dosyaları buraya bırakın</div>
                    <div style={{ color: '#949ba4', fontSize: '0.85em', marginTop: '6px' }}>PNG, JPG, GIF, MP4, PDF ve daha fazlası</div>
                </div>
            )}

            {showScrollToBottom && <ScrollToBottomButton onClick={handleScrollToBottom} unreadCount={newMsgCount} />}

            <div style={{ ...styles.inputContainer, paddingBottom: isNative ? `calc(16px + ${safeAreaBottom})` : (isMobile ? '25px' : '16px') }}>
                {fileUpload.isUploading && fileUpload.uploadProgress > 0 && (
                    <div style={{ position: 'absolute', top: '-40px', left: '16px', right: '16px', backgroundColor: '#2b2d31', borderRadius: '8px', padding: '8px 12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 1001 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#b9bbbe', fontSize: '12px', whiteSpace: 'nowrap' }}>📤 Yükleniyor: {fileUpload.uploadProgress}%</span>
                            <div style={{ flex: 1, height: '6px', backgroundColor: '#40444b', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${fileUpload.uploadProgress}%`, height: '100%', backgroundColor: '#5865f2', borderRadius: '3px', transition: 'width 0.3s ease' }} />
                            </div>
                        </div>
                    </div>
                )}
                <Suspense fallback={<div style={{ padding: '12px', color: '#72767d' }}>Yükleniyor...</div>}>
                    <MessageInput onSendMessage={messageHandlers.sendMessage} onFileUpload={fileUpload.uploadFile}
                        onShowCodeSnippet={handleShowCodeSnippet}
                        placeholder={chatTitle ? (activeChat.type === 'dm' ? `${chatTitle} kullanıcısına mesaj gönder` : `#${chatTitle} kanalına mesaj gönder`) : 'Mesaj yaz...'}
                        disabled={fileUpload.isUploading} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL}
                        activeChat={activeChat} pendingFilesFromDrop={fileUpload.pendingFilesFromDrop}
                        onClearPendingFiles={handleClearPendingFiles} />
                </Suspense>
            </div>
        </div>
    );
});
