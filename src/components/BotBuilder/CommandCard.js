/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaPlay, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --
const _st1127 = {
    padding: '6px',
    borderRadius: '6px',
    backgroundColor: 'rgba(242,63,66,0.12)',
    border: '1px solid rgba(242,63,66,0.3)',
    color: '#f23f42',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9em',
    transition: 'all 0.15s',
};

const CommandCard = ({ cmd, styles, onUpdate, onRemove, onTest, canRemove }) => {
    const { t } = useTranslation();
    return (
        <div style={styles.commandCard}>
            <div style={styles.commandHeader}>
                <div style={styles.toggle}>
                    <div
                        style={styles.switch(cmd.enabled)}
                        role="button"
                        tabIndex={0}
                        onClick={() => onUpdate(cmd.id, 'enabled', !cmd.enabled)}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div style={styles.switchKnob(cmd.enabled)} />
                    </div>
                    <span className="text-rgba255-14">{cmd.enabled ? 'Enabled' : 'Disabled'}</span>
                </div>
                <div style={styles.commandActions}>
                    <button
                        onClick={() => onTest(cmd)}
                        style={styles.iconBtn}
                        title={t('test_command')}
                    >
                        <FaPlay />
                    </button>
                    {canRemove && (
                        <button
                            onClick={() => onRemove(cmd.id)}
                            style={_st1127}
                            title={t('delete_command')}
                        >
                            <FaTrash />
                        </button>
                    )}
                </div>
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>{t('trigger_e_g_hello')}</label>
                <input
                    type="text"
                    value={cmd.trigger}
                    onChange={(e) => onUpdate(cmd.id, 'trigger', e.target.value)}
                    placeholder={t('commandCard.trigger', '!command')}
                    style={styles.input}
                />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>{t('response')}</label>
                <textarea
                    value={cmd.response}
                    onChange={(e) => onUpdate(cmd.id, 'response', e.target.value)}
                    placeholder={t('bot_response_here')}
                    style={styles.textarea}
                />
            </div>
        </div>
    );
};

CommandCard.propTypes = {
    cmd: PropTypes.object,
    styles: PropTypes.array,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func,
    onTest: PropTypes.func,
    canRemove: PropTypes.bool,
};
export default CommandCard;
