import { useState } from 'react';
import toast from '../../utils/toast';
import axios from 'axios';
import { getApiBase } from '../../utils/apiEndpoints';

const useBotBuilder = (serverSlug, token, onClose) => {
  const [botName, setBotName] = useState('');
  const [botAvatar, setBotAvatar] = useState('\uD83E\uDD16');
  const [commands, setCommands] = useState([
    { id: 1, trigger: '!hello', response: 'Hello! How can I help you?', enabled: true }
  ]);
  const [events, setEvents] = useState({
    onMemberJoin: { enabled: false, message: 'Welcome {{username}} to {{server}}!' },
    onMemberLeave: { enabled: false, message: 'Goodbye {{username}}. We will miss you!' },
    onMessageDelete: { enabled: false, action: 'log' },
  });
  const [autoModeration, setAutoModeration] = useState({
    spamDetection: false,
    profanityFilter: false,
    capsLimit: 70,
    linkBlocking: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const addCommand = () => {
    setCommands([...commands, { id: Date.now(), trigger: '', response: '', enabled: true }]);
  };

  const updateCommand = (id, field, value) => {
    setCommands(commands.map(cmd => cmd.id === id ? { ...cmd, [field]: value } : cmd));
  };

  const removeCommand = (id) => {
    if (commands.length > 1) setCommands(commands.filter(cmd => cmd.id !== id));
  };

  const testCommand = (cmd) => {
    toast.info(`\uD83D\uDCCB Test Output:\n\n${cmd.response}`);
  };

  const handleSave = async () => {
    if (!botName.trim()) { toast.error('\u274C Please enter a bot name'); return; }
    const validCommands = commands.filter(cmd => cmd.trigger && cmd.response);
    if (validCommands.length === 0) { toast.error('\u274C Please add at least one valid command'); return; }

    setIsSaving(true);
    try {
      await axios.post(`${getApiBase()}/bots/create/`, {
        server_slug: serverSlug, name: botName, avatar: botAvatar,
        commands: validCommands, events, auto_moderation: autoModeration,
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('\u2705 Bot created successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to create bot:', error);
      toast.error('\u274C Failed to create bot. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    botName, setBotName, botAvatar, setBotAvatar,
    commands, addCommand, updateCommand, removeCommand, testCommand,
    autoModeration, setAutoModeration,
    isSaving, handleSave,
  };
};

export default useBotBuilder;
