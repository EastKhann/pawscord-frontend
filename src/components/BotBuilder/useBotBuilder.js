import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import { authFetch } from '../../utils/authFetch';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';

const useBotBuilder = (serverSlug, token, onClose) => {
    const { t } = useTranslation();
    const [botName, setBotName] = useState('');
    const [botAvatar, setBotAvatar] = useState('🤖');
    const [commands, setCommands] = useState([
        { id: 1, trigger: '!hello', response: 'Hello! How can I help you?', enabled: true },
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
        setCommands(commands.map((cmd) => (cmd.id === id ? { ...cmd, [field]: value } : cmd)));
    };

    const removeCommand = (id) => {
        if (commands.length > 1) setCommands(commands.filter((cmd) => cmd.id !== id));
    };

    const testCommand = (cmd) => {
        toast.info(t('bot.testOutput', { response: cmd.response }));
    };

    const handleSave = async () => {
        if (!botName.trim()) {
            toast.error(t('bot.enterName'));
            return;
        }
        const validCommands = commands.filter((cmd) => cmd.trigger && cmd.response);
        if (validCommands.length === 0) {
            toast.error(t('bot.addCommand'));
            return;
        }

        setIsSaving(true);
        try {
            await authFetch(`${getApiBase()}/bots/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_slug: serverSlug,
                    name: botName,
                    avatar: botAvatar,
                    commands: validCommands,
                    events,
                    auto_moderation: autoModeration,
                }),
            });
            toast.success(t('bot.createSuccess'));
            onClose();
        } catch (error) {
            logger.error('Failed to create bot:', error);
            toast.error(t('bot.createError'));
        } finally {
            setIsSaving(false);
        }
    };

    return {
        botName,
        setBotName,
        botAvatar,
        setBotAvatar,
        commands,
        addCommand,
        updateCommand,
        removeCommand,
        testCommand,
        events,
        setEvents,
        autoModeration,
        setAutoModeration,
        isSaving,
        handleSave,
    };
};

export default useBotBuilder;
