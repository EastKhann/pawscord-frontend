/* eslint-disable jsx-a11y/label-has-associated-control */
import { DURATION_OPTIONS } from './useGiveaways';
import PropTypes from 'prop-types';
import useModalA11y from '../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';

const CreateGiveawayModal = ({
    newGiveaway,
    setNewGiveaway,
    channels,
    roles,
    onCreate,
    onClose,
}) => {
    const { t } = useTranslation();

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Create Giveaway' });
    const update = (field, value) => setNewGiveaway({ ...newGiveaway, [field]: value });

    return (
        <div className="create-modal-overlay" {...overlayProps}>
            <div className="create-modal" {...dialogProps}>
                <div className="modal-header">
                    <h3>{t('giveaway.createNew','Create New Giveaway')}</h3>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>{t('admin.reportTitleLabel', 'Title *')}</label>
                        <input
                            type="text"
                            placeholder={t('discord_nitro_çekilişi')}
                            value={newGiveaway.title}
                            onChange={(e) => update('title', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>A{''}klama</label>
                        <textarea
                            placeholder={t('ui.cekilis_hakkinda_detaillar')}
                            value={newGiveaway.description}
                            onChange={(e) => update('description', e.target.value)}
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('giveaway.prize','Prize *')}</label>
                        <input
                            type="text"
                            placeholder={t('1_monthly_discord_nitro')}
                            value={newGiveaway.prize}
                            onChange={(e) => update('prize', e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>{t('channel')}</label>
                            <select
                                value={newGiveaway.channel_id}
                                onChange={(e) => update('channel_id', e.target.value)}
                            >
                                <option value="">{t('giveaway.selectChannel','Select Channel')}</option>
                                {channels.map((ch) => (
                                    <option key={ch.id} value={ch.id}>
                                        {ch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t('giveaway.winnerCount','Winner Count')}</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={newGiveaway.winners_count}
                                onChange={(e) => update('winners_count', parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>{t('common.duration','Duration')}</label>
                        <select
                            value={newGiveaway.duration}
                            onChange={(e) => update('duration', parseInt(e.target.value))}
                        >
                            {DURATION_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="requirements-section">
                        <h4>{t('giveaway.requirements','Entry Requirements (Optional)')}</h4>

                        <div className="form-group">
                            <label>{t('gerekli_role')}</label>
                            <select
                                value={newGiveaway.required_role_id}
                                onChange={(e) => update('required_role_id', e.target.value)}
                            >
                                <option value="">{t('role_yok')}</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('giveaway.minMessages','Minimum Message Count')}</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={newGiveaway.required_messages}
                                    onChange={(e) =>
                                        update('required_messages', parseInt(e.target.value))
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('giveaway.minInvites','Minimum Invite Count')}</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={newGiveaway.required_invites}
                                    onChange={(e) =>
                                        update('required_invites', parseInt(e.target.value))
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={newGiveaway.allow_multiple_entries}
                                    onChange={(e) =>
                                        update('allow_multiple_entries', e.target.checked)
                                    }
                                />
                                <span>{t('giveaway.allowMultiEntry','Allow multiple entries')}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        {t('common.cancel','Cancel')}
                    </button>
                    <button className="submit-btn" onClick={onCreate}>
                        🎉 Create Giveaway
                    </button>
                </div>
            </div>
        </div>
    );
};

CreateGiveawayModal.propTypes = {
    newGiveaway: PropTypes.object,
    setNewGiveaway: PropTypes.func,
    channels: PropTypes.array,
    roles: PropTypes.array,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
};
export default CreateGiveawayModal;
