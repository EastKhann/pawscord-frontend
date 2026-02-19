/**
 * 💬 ChatArea — Main chat rendering section
 * Extracted from App.js: header, message list, drag overlay, input container
 */
import React, { Suspense, memo, useCallback, useMemo } from 'react';
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
    const handleScrollToBottom = useCallback(() => { scrollToBottom('smooth'); setShowScrollToBottom(false); }, [scrollToBottom, setShowScrollToBottom]);
    const handleShowCodeSnippet = useCallback(() => openModal('snippetModal'), [openModal]);
    const handleClearPendingFiles = useCallback(() => fileUpload.setPendingFilesFromDrop([]), [fileUpload]);

    // Stable render callback for VirtualMessageList
    const renderVirtualMessage = useCallback((msg, index) => (
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
            onVisible={messageHandlers.handleMessageVisible} />
    ), [username, ABSOLUTE_HOST_URL, isAdmin, setZoomedImage, fetchWithAuth, allUsers,
        getDeterministicAvatar, setChartSymbol, messageHandlers, setEditingMessage,
        setReplyingTo, handleToggleReaction, setForwardingMessage, isSelectionMode,
        selectedMessages, handleToggleSelection, handleViewProfile]);

    // Memoized message list with gallery grouping
    const renderedMessages = useMemo(() => {
        const elements = [];
        let i = 0;
        while (i < optimizedMessages.length) {
            const msg = optimizedMessages[i];
            const key = msg.id || msg.temp_id || i;
            const prevMsg = i > 0 ? optimizedMessages[i - 1] : null;
            const showDateDivider = !prevMsg || (msg.timestamp && prevMsg.timestamp && new Date(msg.timestamp).toDateString() !== new Date(prevMsg.timestamp).toDateString());
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
                        onVisible={messageHandlers.handleMessageVisible} />
                </React.Fragment>
            );
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
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: isMobile ? '1em' : '1.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {activeChat.type === 'dm' ? `@ ${chatTitle}` : chatTitle}
                    </h2>
                    <div style={isConnected ? styles.connectionPillOnline : styles.connectionPillOffline}>{isConnected ? '✓' : '✗'}</div>
                </div>
                <div style={{ display: 'flex', gap: isMobile ? '5px' : '10px', alignItems: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap', position: 'relative' }}>
                    <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
                        <input type="text" placeholder="Ara..." value={searchQuery} onChange={handleSearchChange} style={styles.searchInput} ref={searchInputRef} />
                        <FaSearch style={styles.searchIcon} />
                    </form>
                    {!isMobile && activeTypingUsers.length > 0 && <TypingIndicatorEnhanced users={activeTypingUsers} />}
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
                id="main-content" role="log" aria-live="polite" aria-relevant="additions">
                <Suspense fallback={<p style={styles.systemMessage}>Mesajlar yükleniyor...</p>}>
                    {messageHistoryLoading && optimizedMessages.length === 0 ? (
                        <p style={styles.systemMessage}>Yükleniyor...</p>
                    ) : optimizedMessages.length > 200 ? (
                        <VirtualMessageList messages={optimizedMessages} scrollToBottom={true}
                            renderMessage={renderVirtualMessage} />
                    ) : (
                        <>
                            {hasMoreMessages && optimizedMessages.length > 0 && (
                                <p style={{ ...styles.systemMessage, textAlign: 'center', padding: '8px 0', opacity: 0.6, fontSize: '0.85em' }}>
                                    ⬆ Yukarı kaydırarak eski mesajları yükleyin
                                </p>
                            )}
                            {renderedMessages}
                            <div ref={messagesEndRef} style={{ float: "left", clear: "both", height: 1 }} />
                        </>
                    )}
                </Suspense>
            </div>

            {/* DRAG OVERLAY */}
            {fileUpload.isDragging && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(30, 31, 34, 0.9)', border: '3px dashed #5865f2', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1000 }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📁</div>
                    <div style={{ color: '#5865f2', fontSize: '1.4em', fontWeight: 'bold' }}>Dosyaları buraya bırakın</div>
                </div>
            )}

            {showScrollToBottom && <ScrollToBottomButton onClick={handleScrollToBottom} unreadCount={0} />}

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
                        placeholder={chatTitle ? `${chatTitle} kanalına mesaj gönder` : 'Mesaj yaz...'}
                        disabled={fileUpload.isUploading} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL}
                        activeChat={activeChat} pendingFilesFromDrop={fileUpload.pendingFilesFromDrop}
                        onClearPendingFiles={handleClearPendingFiles} />
                </Suspense>
            </div>
        </div>
    );
});
