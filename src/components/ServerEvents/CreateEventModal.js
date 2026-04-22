/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { getToken } from '../../utils/tokenStorage';

import { FaTimes } from 'react-icons/fa';

import { API_BASE_URL } from '../../utils/constants';

import toast from '../../utils/toast';

import { EVENT_TYPES } from './eventConstants';

import useModalA11y from '../../hooks/useModalA11y';

import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';

export const CreateEventModal = ({ serverId, onClose, onCreated }) => {
    const { t } = useTranslation();

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: t('event.createTitle', 'Create Event') });

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
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.start_date || !formData.start_time) {
            toast.error(t('ui.please_gerekli_alanlari_doldurun'));

            return;
        }

        setIsLoading(true);

        try {
            const token = getToken();

            const startTime = new Date(
                `${formData.start_date}T${formData.start_time}`
            ).toISOString();

            const endTime = formData.end_time
                ? new Date(`${formData.start_date}T${formData.end_time}`).toISOString()
                : null;

            const response = await fetch(`${API_BASE_URL}/servers/${serverId}/events/`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',

                    Authorization: `Bearer ${token}`,
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

                toast.success(t('events.created'));

                onCreated?.(data.event);

                onClose();
            } else {
                const error = await response.json();

                toast.error(error.error || t('ui.event_olusturulamadi'));
            }
        } catch (error) {
            logger.error('Create event error:', error);

            toast.error(t('common.connectionError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="event-modal-overlay" {...overlayProps}>
            <div className="event-modal" {...dialogProps}>
                <div className="em-header">
                    <h2>{t('event.createTitle2', '📅 Create Event')}</h2>

                    <button aria-label={t('common.close', 'Close')} className="em-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="em-field">
                        <label>{t('event_adı')}</label>

                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder={t('oyun_gecesi')}
                            maxLength={100}
                            required
                            aria-label={t('createEvent.nameInput', 'Event name')}
                        />
                    </div>

                    <div className="em-field">
                        <label>{t('event_typeü')}</label>

                        <select
                            value={formData.event_type}
                            onChange={(e) => handleChange('event_type', e.target.value)}
                        >
                            {EVENT_TYPES.map((t) => (
                                <option key={t.value} value={t.value}>
                                    {t.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="em-field">
                        <label>{t('description')}</label>

                        <textarea
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder={t('event_hakkında_detaillar')}
                            rows={3}
                        />
                    </div>

                    <div className="em-row">
                        <div className="em-field">
                            <label>{t('date')}</label>

                            <input
                                type="date"
                                value={formData.start_date}
                                onChange={(e) => handleChange('start_date', e.target.value)}
                                required
                            />
                        </div>

                        <div className="em-field">
                            <label>{t('başlangıç')}</label>

                            <input
                                type="time"
                                value={formData.start_time}
                                onChange={(e) => handleChange('start_time', e.target.value)}
                                required
                            />
                        </div>

                        <div className="em-field">
                            <label>{t('bitiş')}</label>

                            <input
                                type="time"
                                value={formData.end_time}
                                onChange={(e) => handleChange('end_time', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="em-field">
                        <label>{t('konum_link')}</label>

                        <input
                            type="text"
                            value={formData.external_location}
                            onChange={(e) => handleChange('external_location', e.target.value)}
                            placeholder={t('https_or_adres')}
                            aria-label={t('createEvent.locationInput', 'External location')}
                        />
                    </div>

                    <div className="em-row">
                        <div className="em-field">
                            <label>{t('maks_joinımcı')}</label>

                            <input
                                type="number"
                                value={formData.max_attendees}
                                onChange={(e) => handleChange('max_attendees', e.target.value)}
                                placeholder={t('sınırsız')}
                                min={1}
                            />
                        </div>

                        <div className="em-field">
                            <label>{t('tekrar')}</label>

                            <select
                                value={formData.recurrence}
                                onChange={(e) => handleChange('recurrence', e.target.value)}
                            >
                                <option value="none">{t('tekrarlamaz')}</option>

                                <option value="daily">{t('her_day')}</option>

                                <option value="weekly">{t('her_week')}</option>

                                <option value="biweekly">{t('event.biweekly', 'Every two weeks')}</option>

                                <option value="monthly">{t('her_month')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="em-actions">
                        <button type="button" className="em-cancel" onClick={onClose}>
                            Cancel
                        </button>

                        <button type="submit" className="em-submit" disabled={isLoading}>
                            {isLoading ? t('common.creating', 'Creating...') : t('event.create', 'Create Event')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

CreateEventModal.propTypes = {
    serverId: PropTypes.string,

    onClose: PropTypes.func,

    onCreated: PropTypes.func,
};
