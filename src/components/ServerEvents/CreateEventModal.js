import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { API_BASE_URL } from '../../utils/constants';
import toast from '../../utils/toast';
import { EVENT_TYPES } from './eventConstants';

export const CreateEventModal = ({ serverId, onClose, onCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        event_type: 'other',
        start_date: '',
        start_time: '',
        end_time: '',
        external_location: '',
        max_attendees: '',
        recurrence: 'none',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.start_date || !formData.start_time) {
            toast.error('L\u00FCtfen gerekli alanlar\u0131 doldurun');
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('access_token');

            const startTime = new Date(`${formData.start_date}T${formData.start_time}`).toISOString();
            const endTime = formData.end_time
                ? new Date(`${formData.start_date}T${formData.end_time}`).toISOString()
                : null;

            const response = await fetch(`${API_BASE_URL}/servers/${serverId}/events/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    start_time: startTime,
                    end_time: endTime,
                    max_attendees: formData.max_attendees ? parseInt(formData.max_attendees) : null,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Etkinlik olu\u015Fturuldu! \uD83C\uDF89');
                onCreated?.(data.event);
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Etkinlik olu\u015Fturulamad\u0131');
            }
        } catch (error) {
            console.error('Create event error:', error);
            toast.error('Ba\u011Flant\u0131 hatas\u0131');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="event-modal-overlay" onClick={onClose}>
            <div className="event-modal" onClick={e => e.stopPropagation()}>
                <div className="em-header">
                    <h2>{'\uD83D\uDCC5'} Etkinlik Olu\u015Ftur</h2>
                    <button className="em-close" onClick={onClose}><FaTimes /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="em-field">
                        <label>Etkinlik Ad\u0131 *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => handleChange('name', e.target.value)}
                            placeholder="Oyun Gecesi"
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="em-field">
                        <label>Etkinlik T\u00FCr\u00FC</label>
                        <select
                            value={formData.event_type}
                            onChange={e => handleChange('event_type', e.target.value)}
                        >
                            {EVENT_TYPES.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="em-field">
                        <label>A\u00E7\u0131klama</label>
                        <textarea
                            value={formData.description}
                            onChange={e => handleChange('description', e.target.value)}
                            placeholder="Etkinlik hakk\u0131nda detaylar..."
                            rows={3}
                        />
                    </div>

                    <div className="em-row">
                        <div className="em-field">
                            <label>Tarih *</label>
                            <input
                                type="date"
                                value={formData.start_date}
                                onChange={e => handleChange('start_date', e.target.value)}
                                required
                            />
                        </div>
                        <div className="em-field">
                            <label>Ba\u015Flang\u0131\u00E7 *</label>
                            <input
                                type="time"
                                value={formData.start_time}
                                onChange={e => handleChange('start_time', e.target.value)}
                                required
                            />
                        </div>
                        <div className="em-field">
                            <label>Biti\u015F</label>
                            <input
                                type="time"
                                value={formData.end_time}
                                onChange={e => handleChange('end_time', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="em-field">
                        <label>Konum / Link</label>
                        <input
                            type="text"
                            value={formData.external_location}
                            onChange={e => handleChange('external_location', e.target.value)}
                            placeholder="https://... veya adres"
                        />
                    </div>

                    <div className="em-row">
                        <div className="em-field">
                            <label>Maks. Kat\u0131l\u0131mc\u0131</label>
                            <input
                                type="number"
                                value={formData.max_attendees}
                                onChange={e => handleChange('max_attendees', e.target.value)}
                                placeholder="S\u0131n\u0131rs\u0131z"
                                min={1}
                            />
                        </div>
                        <div className="em-field">
                            <label>Tekrar</label>
                            <select
                                value={formData.recurrence}
                                onChange={e => handleChange('recurrence', e.target.value)}
                            >
                                <option value="none">Tekrarlamaz</option>
                                <option value="daily">Her g\u00FCn</option>
                                <option value="weekly">Her hafta</option>
                                <option value="biweekly">{'\u0130'}ki haftada bir</option>
                                <option value="monthly">Her ay</option>
                            </select>
                        </div>
                    </div>

                    <div className="em-actions">
                        <button type="button" className="em-cancel" onClick={onClose}>
                            {'\u0130'}ptal
                        </button>
                        <button type="submit" className="em-submit" disabled={isLoading}>
                            {isLoading ? 'Olu\u015Fturuluyor...' : 'Etkinlik Olu\u015Ftur'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
