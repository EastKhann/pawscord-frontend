// frontend/src/components/BotBuilder.js
import { useState } from 'react';
import toast from '../utils/toast';
import axios from 'axios';
import { FaRobot, FaPlus, FaTrash, FaCode, FaSave, FaPlay } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';

const BotBuilder = ({ onClose, serverSlug, token, isMobile }) => {
    const [botName, setBotName] = useState('');
    const [botAvatar, setBotAvatar] = useState('🤖');
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

    // Add new command
    const addCommand = () => {
        setCommands([
            ...commands,
            { id: Date.now(), trigger: '', response: '', enabled: true }
        ]);
    };

    // Update command
    const updateCommand = (id, field, value) => {
        setCommands(commands.map(cmd =>
            cmd.id === id ? { ...cmd, [field]: value } : cmd
        ));
    };

    // Remove command
    const removeCommand = (id) => {
        if (commands.length > 1) {
            setCommands(commands.filter(cmd => cmd.id !== id));
        }
    };

    // Save bot configuration
    const handleSave = async () => {
        if (!botName.trim()) {
            toast.error('❌ Please enter a bot name');
            return;
        }

        const validCommands = commands.filter(cmd => cmd.trigger && cmd.response);
        if (validCommands.length === 0) {
            toast.error('❌ Please add at least one valid command');
            return;
        }

        setIsSaving(true);
        try {
            const botConfig = {
                server_slug: serverSlug,
                name: botName,
                avatar: botAvatar,
                commands: validCommands,
                events,
                auto_moderation: autoModeration,
            };

            await axios.post(
                `${getApiBase()}/bots/create/`,
                botConfig,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success('✅ Bot created successfully!');
            onClose();
        } catch (error) {
            console.error('Failed to create bot:', error);
            toast.error('❌ Failed to create bot. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // Test bot command
    const testCommand = (cmd) => {
        toast.info(`📋 Test Output:\n\n${cmd.response}`);
    };

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: isMobile ? '0' : '20px',
        },
        modal: {
            background: 'linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))',
            borderRadius: isMobile ? '0' : '16px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '900px',
            height: isMobile ? '100%' : 'auto',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(88, 101, 242, 0.3)',
            border: isMobile ? 'none' : '1px solid rgba(88, 101, 242, 0.4)',
        },
        header: {
            padding: isMobile ? '16px' : '20px 24px',
            background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(114, 137, 218, 0.15))',
            borderBottom: '1px solid rgba(88, 101, 242, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: 'rgba(255, 255, 255, 0.95)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        content: {
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '16px' : '24px',
        },
        section: {
            marginBottom: '24px',
        },
        sectionTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        inputGroup: {
            marginBottom: '16px',
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '8px',
        },
        input: {
            width: '100%',
            padding: '12px 14px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '15px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.2s ease',
        },
        textarea: {
            width: '100%',
            minHeight: '80px',
            padding: '12px 14px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '14px',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
        },
        commandCard: {
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '12px',
            padding: isMobile ? '12px' : '16px',
            marginBottom: '12px',
        },
        commandHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
        },
        commandActions: {
            display: 'flex',
            gap: '8px',
        },
        iconBtn: {
            background: 'rgba(88, 101, 242, 0.2)',
            border: '1px solid rgba(88, 101, 242, 0.4)',
            borderRadius: '6px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease',
            fontSize: '14px',
        },
        deleteBtn: {
            background: 'rgba(218, 55, 60, 0.2)',
            border: '1px solid rgba(218, 55, 60, 0.4)',
            color: '#da373c',
        },
        addBtn: {
            width: '100%',
            padding: '12px',
            background: 'rgba(88, 101, 242, 0.2)',
            border: '1px solid rgba(88, 101, 242, 0.4)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            minHeight: '44px',
        },
        toggle: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
        },
        switch: (enabled) => ({
            width: '50px',
            height: '28px',
            background: enabled ? 'linear-gradient(135deg, #43b581, #4caf50)' : 'rgba(255, 255, 255, 0.2)',
            borderRadius: '14px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(88, 101, 242, 0.3)',
        }),
        switchKnob: (enabled) => ({
            width: '22px',
            height: '22px',
            background: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '1px',
            left: enabled ? '24px' : '1px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }),
        footer: {
            padding: isMobile ? '16px' : '20px 24px',
            borderTop: '1px solid rgba(88, 101, 242, 0.2)',
            display: 'flex',
            gap: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
        },
        cancelBtn: {
            flex: 1,
            padding: '14px',
            background: 'rgba(78, 80, 88, 0.5)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minHeight: '44px',
        },
        saveBtn: {
            flex: 1,
            padding: '14px',
            background: 'linear-gradient(135deg, #5865f2, #7289da)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            opacity: isSaving ? 0.6 : 1,
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minHeight: '44px',
        },
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <FaRobot />
                        Custom Bot Builder
                    </h2>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {/* Basic Info */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>🤖 Basic Information</h3>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Bot Name</label>
                            <input
                                type="text"
                                value={botName}
                                onChange={(e) => setBotName(e.target.value)}
                                placeholder="My Awesome Bot"
                                style={styles.input}
                                maxLength={32}
                            />
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Bot Avatar (Emoji)</label>
                            <input
                                type="text"
                                value={botAvatar}
                                onChange={(e) => setBotAvatar(e.target.value)}
                                placeholder="🤖"
                                style={styles.input}
                                maxLength={2}
                            />
                        </div>
                    </div>

                    {/* Commands */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>⚡ Commands</h3>

                        {commands.map((cmd) => (
                            <div key={cmd.id} style={styles.commandCard}>
                                <div style={styles.commandHeader}>
                                    <div style={styles.toggle}>
                                        <div
                                            style={styles.switch(cmd.enabled)}
                                            onClick={() => updateCommand(cmd.id, 'enabled', !cmd.enabled)}
                                        >
                                            <div style={styles.switchKnob(cmd.enabled)} />
                                        </div>
                                        <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                                            {cmd.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                    <div style={styles.commandActions}>
                                        <button
                                            onClick={() => testCommand(cmd)}
                                            style={styles.iconBtn}
                                            title="Test Command"
                                        >
                                            <FaPlay />
                                        </button>
                                        {commands.length > 1 && (
                                            <button
                                                onClick={() => removeCommand(cmd.id)}
                                                style={{ ...styles.iconBtn, ...styles.deleteBtn }}
                                                title="Delete Command"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Trigger (e.g., !hello)</label>
                                    <input
                                        type="text"
                                        value={cmd.trigger}
                                        onChange={(e) => updateCommand(cmd.id, 'trigger', e.target.value)}
                                        placeholder="!command"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Response</label>
                                    <textarea
                                        value={cmd.response}
                                        onChange={(e) => updateCommand(cmd.id, 'response', e.target.value)}
                                        placeholder="Bot response here..."
                                        style={styles.textarea}
                                    />
                                </div>
                            </div>
                        ))}

                        <button onClick={addCommand} style={styles.addBtn}>
                            <FaPlus />
                            Add Command
                        </button>
                    </div>

                    {/* Auto Moderation */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>🛡️ Auto Moderation</h3>

                        {Object.entries(autoModeration).map(([key, value]) => {
                            if (typeof value === 'boolean') {
                                return (
                                    <div key={key} style={styles.toggle}>
                                        <div
                                            style={styles.switch(value)}
                                            onClick={() => setAutoModeration({ ...autoModeration, [key]: !value })}
                                        >
                                            <div style={styles.switchKnob(value)} />
                                        </div>
                                        <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </span>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button onClick={onClose} style={styles.cancelBtn}>
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={isSaving} style={styles.saveBtn}>
                        <FaSave />
                        {isSaving ? 'Creating...' : 'Create Bot'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BotBuilder;



