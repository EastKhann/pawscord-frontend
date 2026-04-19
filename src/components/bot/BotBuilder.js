/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRobot, FaPlus, FaSave } from 'react-icons/fa';
import { getStyles } from '../BotBuilder/botBuilderStyles';
import useBotBuilder from '../BotBuilder/useBotBuilder';
import CommandCard from '../BotBuilder/CommandCard';

import { useTranslation } from 'react-i18next';
const BotBuilder = ({ onClose, serverSlug, token, isMobile }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        botName,
        setBotName,
        botAvatar,
        setBotAvatar,
        commands,
        addCommand,
        updateCommand,
        removeCommand,
        testCommand,
        autoModeration,
        setAutoModeration,
        isSaving,
        handleSave,
    } = useBotBuilder(serverSlug, token, onClose);

    const styles = getStyles(isMobile, isSaving);

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <FaRobot /> Özel Bot Oluşturucu
                    </h2>
                </div>

                <div style={styles.content}>
                    {/* Basic Info */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>🤖 Temel Bilgiler</h3>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Bot Adı</label>
                            <input
                                type="text"
                                value={botName}
                                onChange={(e) => setBotName(e.target.value)}
                                placeholder="Harika Botum"
                                style={styles.input}
                                maxLength={32}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Bot Avatarı (Emoji)</label>
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
                            <CommandCard
                                key={cmd.id}
                                cmd={cmd}
                                styles={styles}
                                onUpdate={updateCommand}
                                onRemove={removeCommand}
                                onTest={testCommand}
                                canRemove={commands.length > 1}
                            />
                        ))}
                        <button aria-label="Komut Ekle" onClick={addCommand} style={styles.addBtn}>
                            <FaPlus /> Komut Ekle
                        </button>
                    </div>

                    {/* Auto Moderation */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>🛡️ Otomatik Moderasyon</h3>
                        {Object.entries(autoModeration).map(([key, value]) => {
                            if (typeof value !== 'boolean') return null;
                            return (
                                <div key={key} style={styles.toggle}>
                                    <div
                                        style={styles.switch(value)}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() =>
                                            setAutoModeration({ ...autoModeration, [key]: !value })
                                        }
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div style={styles.switchKnob(value)} />
                                    </div>
                                    <span className="text-rgba255-14">
                                        {key
                                            .replace(/([A-Z])/g, ' $1')
                                            .replace(/^./, (str) => str.toUpperCase())}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={styles.footer}>
                    <button aria-label="on Close" onClick={onClose} style={styles.cancelBtn}>
                        {t('common.cancel')}
                    </button>
                    <button
                        aria-label="handle Save"
                        onClick={handleSave}
                        disabled={isSaving}
                        style={styles.saveBtn}
                    >
                        <FaSave /> {isSaving ? 'Creating...' : 'Create Bot'}
                    </button>
                </div>
            </div>
        </div>
    );
};

BotBuilder.propTypes = {
    onClose: PropTypes.func,
    serverSlug: PropTypes.string,
    token: PropTypes.string,
    isMobile: PropTypes.bool,
};
export default BotBuilder;
