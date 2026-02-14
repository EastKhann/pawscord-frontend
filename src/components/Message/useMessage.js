import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useCachedImage } from '../../utils/imageCaching';
import { decryptMessage, isEncrypted } from '../../utils/encryption';
import { useChatStore } from '../../stores/useChatStore';
import toast from '../../utils/toast';

const useMessage = ({ msg, currentUser, absoluteHostUrl, fetchWithAuth, onSetReply, onVisible, allUsers, getDeterministicAvatar }) => {
  const encryptionKeys = useChatStore(s => s.encryptionKeys);
  const currentPermissions = useChatStore(s => s.currentPermissions);

  const [localTranscription, setLocalTranscription] = useState(msg.transcription || null);
  const [localIsTranscribing, setLocalIsTranscribing] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const isMyMessage = msg.username === currentUser;
  const isAIMessage = ['Pawscord AI', 'PawPaw AI', '⚡ Signal Bot'].includes(msg.username);
  const messageRef = useRef(null);

  const handleQuoteMessage = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${absoluteHostUrl}/messages/${msg.id}/quote/`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (res.ok) {
        const content = msg.content || '';
        const quotedText = `> ${msg.username} said:\n> ${content.split('\n').join('\n> ')}\n\n`;
        onSetReply({ ...msg, quotedText });
        toast.success('Message quoted!');
      }
    } catch (e) { console.error('Quote error:', e); toast.error('Failed to quote message'); }
  }, [msg, absoluteHostUrl, fetchWithAuth, onSetReply]);

  const handleContextMenu = useCallback((e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }, []);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) { document.addEventListener('click', handleClick); return () => document.removeEventListener('click', handleClick); }
  }, [contextMenu]);

  useEffect(() => {
    if (!onVisible || isMyMessage || msg.read_by?.includes(currentUser)) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { onVisible(msg.id); observer.disconnect(); } }, { threshold: 0.8 });
    if (messageRef.current) observer.observe(messageRef.current);
    return () => observer.disconnect();
  }, [msg.id, isMyMessage, msg.read_by, onVisible, currentUser]);

  const displayContent = useMemo(() => {
    if (!msg.content) return '';
    if (isEncrypted(msg.content)) {
      const chatId = msg.room ? `room-${msg.room}` : (msg.conversation ? `dm-${msg.conversation}` : null);
      const secretKey = encryptionKeys[chatId];
      return secretKey ? decryptMessage(msg.content, secretKey) : '🔒 Bu mesaj şifreli.';
    }
    return msg.content;
  }, [msg.content, msg.room, msg.conversation, encryptionKeys]);

  const isMessageEncrypted = isEncrypted(msg.content);

  const userAvatarBase = useMemo(() => {
    let url = msg.avatar;
    if (!url) { const u = allUsers?.find(u => u.username === msg.username); url = u?.avatar; }
    if (!url) url = getDeterministicAvatar(msg.username);
    if (url && url.includes('ui-avatars.com')) return url;
    if (url && !url.startsWith('http') && !url.startsWith('blob:')) url = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    return url;
  }, [msg.avatar, msg.username, allUsers, getDeterministicAvatar, absoluteHostUrl]);

  const { url: userAvatar } = useCachedImage(userAvatarBase);

  const getFullUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    let finalUrl = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
    if (finalUrl.includes('/media/local/stream/')) { const token = localStorage.getItem('access_token'); if (token) finalUrl += (finalUrl.includes('?') ? '&' : '?') + `token=${token}`; }
    return finalUrl;
  };

  const fullImageUrl = getFullUrl(msg.image_url || msg.image);
  const fullFileUrl = getFullUrl(msg.file_url || msg.file);

  const isImageFile = useMemo(() => {
    if (!fullFileUrl || fullImageUrl) return false;
    const fn = (msg.file_name || '').toLowerCase();
    return ['jpg','jpeg','png','gif','webp','bmp','svg','ico'].some(ext => fn.endsWith(`.${ext}`));
  }, [fullFileUrl, fullImageUrl, msg.file_name]);

  const finalImageUrl = fullImageUrl || (isImageFile ? fullFileUrl : null);
  const finalFileUrl = isImageFile ? null : fullFileUrl;

  const signalCoin = useMemo(() => {
    if (msg.username === '⚡ Signal Bot' && displayContent) { const m = displayContent.match(/\*\*(.*?)\*\*/); if (m && m[1]) return m[1]; }
    return null;
  }, [msg.username, displayContent]);

  const handleTranscribe = useCallback(async () => {
    if (localIsTranscribing || localTranscription) return;
    setLocalIsTranscribing(true);
    try {
      const res = await fetchWithAuth(`${absoluteHostUrl}/api/messages/${msg.id}/transcribe/`, { method: 'POST' });
      if (res.ok) { const d = await res.json(); if (d.transcription) setLocalTranscription(d.transcription); else toast.error('❌ Çeviri boş döndü.'); }
    } catch (e) { toast.error('❌ Ses metne çevrilemedi.'); }
    finally { setLocalIsTranscribing(false); }
  }, [localIsTranscribing, localTranscription, fetchWithAuth, absoluteHostUrl, msg.id]);

  return {
    messageRef, isMyMessage, isAIMessage, isHovered, setIsHovered,
    contextMenu, setContextMenu, handleContextMenu,
    showReactionPicker, setShowReactionPicker,
    showReminderModal, setShowReminderModal, showThreadModal, setShowThreadModal,
    displayContent, isMessageEncrypted, userAvatar, currentPermissions,
    finalImageUrl, finalFileUrl, signalCoin,
    localTranscription, localIsTranscribing, handleTranscribe,
    handleQuoteMessage,
  };
};

export default useMessage;
