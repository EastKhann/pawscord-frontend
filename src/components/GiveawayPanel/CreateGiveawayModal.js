import { DURATION_OPTIONS } from './useGiveaways';

const CreateGiveawayModal = ({ newGiveaway, setNewGiveaway, channels, roles, onCreate, onClose }) => {
    const update = (field, value) => setNewGiveaway({ ...newGiveaway, [field]: value });

    return (
        <div className="create-modal-overlay" onClick={onClose}>
            <div className="create-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Yeni {'\u00C7'}ekili{'\u015F'} Olu{'\u015F'}tur</h3>
                    <button className="close-btn" onClick={onClose}>{'\u00D7'}</button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Ba{'\u015F'}l{'\u0131'}k *</label>
                        <input type="text" placeholder="Discord Nitro \u00C7ekili\u015Fi" value={newGiveaway.title} onChange={(e) => update('title', e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>A{'\u00E7\u0131'}klama</label>
                        <textarea placeholder={'\u00C7ekili\u015F hakk\u0131nda detaylar...'} value={newGiveaway.description} onChange={(e) => update('description', e.target.value)} rows="3" />
                    </div>

                    <div className="form-group">
                        <label>{'\u00D6'}d{'\u00FC'}l *</label>
                        <input type="text" placeholder="1 Ayl\u0131k Discord Nitro" value={newGiveaway.prize} onChange={(e) => update('prize', e.target.value)} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Kanal *</label>
                            <select value={newGiveaway.channel_id} onChange={(e) => update('channel_id', e.target.value)}>
                                <option value="">Kanal Se{'\u00E7'}in</option>
                                {channels.map((ch) => (
                                    <option key={ch.id} value={ch.id}># {ch.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Kazanan Say{'\u0131'}s{'\u0131'}</label>
                            <input type="number" min="1" max="100" value={newGiveaway.winners_count} onChange={(e) => update('winners_count', parseInt(e.target.value))} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>S{'\u00FC'}re</label>
                        <select value={newGiveaway.duration} onChange={(e) => update('duration', parseInt(e.target.value))}>
                            {DURATION_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="requirements-section">
                        <h4>Kat{'\u0131'}l{'\u0131'}m Gereksinimleri (Opsiyonel)</h4>

                        <div className="form-group">
                            <label>Gerekli Rol</label>
                            <select value={newGiveaway.required_role_id} onChange={(e) => update('required_role_id', e.target.value)}>
                                <option value="">Rol yok</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Minimum Mesaj Say{'\u0131'}s{'\u0131'}</label>
                                <input type="number" min="0" value={newGiveaway.required_messages} onChange={(e) => update('required_messages', parseInt(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>Minimum Davet Say{'\u0131'}s{'\u0131'}</label>
                                <input type="number" min="0" value={newGiveaway.required_invites} onChange={(e) => update('required_invites', parseInt(e.target.value))} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input type="checkbox" checked={newGiveaway.allow_multiple_entries} onChange={(e) => update('allow_multiple_entries', e.target.checked)} />
                                <span>Birden fazla kat{'\u0131'}l{'\u0131'}ma izin ver</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>{'\u0130'}ptal</button>
                    <button className="submit-btn" onClick={onCreate}>{'\uD83C\uDF89'} {'\u00C7'}ekili{'\u015F'} Olu{'\u015F'}tur</button>
                </div>
            </div>
        </div>
    );
};

export default CreateGiveawayModal;
