import { FaRobot, FaPlus, FaSave } from 'react-icons/fa';
import { getStyles } from './BotBuilder/botBuilderStyles';
import useBotBuilder from './BotBuilder/useBotBuilder';
import CommandCard from './BotBuilder/CommandCard';

const BotBuilder = ({ onClose, serverSlug, token, isMobile }) => {
  const {
    botName, setBotName, botAvatar, setBotAvatar,
    commands, addCommand, updateCommand, removeCommand, testCommand,
    autoModeration, setAutoModeration, isSaving, handleSave,
  } = useBotBuilder(serverSlug, token, onClose);

  const styles = getStyles(isMobile, isSaving);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}><FaRobot /> Custom Bot Builder</h2>
        </div>

        <div style={styles.content}>
          {/* Basic Info */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{'\uD83E\uDD16'} Basic Information</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bot Name</label>
              <input type="text" value={botName} onChange={(e) => setBotName(e.target.value)} placeholder="My Awesome Bot" style={styles.input} maxLength={32} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bot Avatar (Emoji)</label>
              <input type="text" value={botAvatar} onChange={(e) => setBotAvatar(e.target.value)} placeholder={'\uD83E\uDD16'} style={styles.input} maxLength={2} />
            </div>
          </div>

          {/* Commands */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{'\u26A1'} Commands</h3>
            {commands.map(cmd => (
              <CommandCard key={cmd.id} cmd={cmd} styles={styles} onUpdate={updateCommand} onRemove={removeCommand} onTest={testCommand} canRemove={commands.length > 1} />
            ))}
            <button onClick={addCommand} style={styles.addBtn}><FaPlus /> Add Command</button>
          </div>

          {/* Auto Moderation */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{'\uD83D\uDEE1\uFE0F'} Auto Moderation</h3>
            {Object.entries(autoModeration).map(([key, value]) => {
              if (typeof value !== 'boolean') return null;
              return (
                <div key={key} style={styles.toggle}>
                  <div style={styles.switch(value)} onClick={() => setAutoModeration({ ...autoModeration, [key]: !value })}>
                    <div style={styles.switchKnob(value)} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          <button onClick={handleSave} disabled={isSaving} style={styles.saveBtn}>
            <FaSave /> {isSaving ? 'Creating...' : 'Create Bot'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotBuilder;
