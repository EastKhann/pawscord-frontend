import { DURATION_OPTIONS } from './useGiveaways';

const CreateGiveawayModal = ({ newGiveaway, setNewGiveaway, channels, roles, onCreate, onClose }) => {
    const update = (field, value) => setNewGiveaway({ ...newGiveaway, [field]: value });

    return (
        <div className="create-modal-overlay" onClick={onClose}>
            <div className="create-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Yeni {'Ç'}ekili{'ş'} Olu{'ş'}tur</h3>
                    <button className="close-btn" onClick={onClose}>{'×'}</button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Ba{'ş'}l{'ı'}k *</label>
                        <input type="text" placeholder="Discord Nitro Çekilişi" value={newGiveaway.title} onChange={(e) => update('title', e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>A{'çı'}klama</label>
                        <textarea placeholder={'Çekiliş hakkında detaylar...'} value={newGiveaway.description} onChange={(e) => update('description', e.target.value)} rows="3" />
                    </div>

                    <div className="form-group">
                        <label>{'Ö'}d{'ü'}l *</label>
                        <input type="text" placeholder="1 Aylık Discord Nitro" value={newGiveaway.prize} onChange={(e) => update('prize', e.target.value)} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Kanal *</label>
                            <select value={newGiveaway.channel_id} onChange={(e) => update('channel_id', e.target.value)}>
                                <option value="">Kanal Se{'ç'}in</option>
                                {channels.map((ch) => (
                                    <option key={ch.id} value={ch.id}># {ch.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Kazanan Say{'ı'}s{'ı'}</label>
                            <input type="number" min="1" max="100" value={newGiveaway.winners_count} onChange={(e) => update('winners_count', parseInt(e.target.value))} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>S{'ü'}re</label>
                        <select value={newGiveaway.duration} onChange={(e) => update('duration', parseInt(e.target.value))}>
                            {DURATION_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="requirements-section">
                        <h4>Kat{'ı'}l{'ı'}m Gereksinimleri (Opsiyonel)</h4>

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
                                <label>Minimum Mesaj Say{'ı'}s{'ı'}</label>
                                <input type="number" min="0" value={newGiveaway.required_messages} onChange={(e) => update('required_messages', parseInt(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>Minimum Davet Say{'ı'}s{'ı'}</label>
                                <input type="number" min="0" value={newGiveaway.required_invites} onChange={(e) => update('required_invites', parseInt(e.target.value))} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input type="checkbox" checked={newGiveaway.allow_multiple_entries} onChange={(e) => update('allow_multiple_entries', e.target.checked)} />
                                <span>Birden fazla kat{'ı'}l{'ı'}ma izin ver</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>{'İ'}ptal</button>
                    <button className="submit-btn" onClick={onCreate}>{'🎉'} {'Ç'}ekili{'ş'} Olu{'ş'}tur</button>
                </div>
            </div>
        </div>
    );
};

export default CreateGiveawayModal;
