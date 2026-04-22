import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { EVENT_COLORS } from './eventConstants';
import { EventCard } from './EventCard';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const CalendarView = ({ events, onSelectDate, onEventClick }) => {
    const { t } = useTranslation();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const monthNames = [
        'Ocak',
        'February',
        'Mart',
        'Nisan',
        'May',
        'Haziran',
        'Temmuz',
        t('ui.agustos'),
        'September',
        'Ekim',
        'November',
        'Search',
    ];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const getEventsForDay = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events[dateStr] || [];
    };

    const handleDayClick = (day) => {
        const date = new Date(year, month, day);
        setSelectedDate(date);
        onSelectDate?.(date);
    };

    const today = new Date();
    const isToday = (day) => {
        return (
            day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
        );
    };

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    return (
        <div aria-label={t('calendar.calendarView', 'Calendar view')} className="calendar-view">
            <div className="cv-header">
                <button aria-label={t('calendar.prevMonth', 'Previous month')} onClick={prevMonth}>
                    <FaChevronLeft />
                </button>
                <h3>
                    {monthNames[month]} {year}
                </h3>
                <button aria-label={t('calendar.nextMonth', 'Next month')} onClick={nextMonth}>
                    <FaChevronRight />
                </button>
            </div>

            <div className="cv-day-names">
                {dayNames.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="cv-grid">
                {calendarDays.map((day, idx) => {
                    if (!day) {
                        return <div key={`item-${idx}`} className="cv-day empty" />;
                    }

                    const dayEvents = getEventsForDay(day);
                    const hasEvents = dayEvents.length > 0;

                    return (
                        <div
                            key={`item-${idx}`}
                            className={`cv-day ${isToday(day) ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleDayClick(day)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <span className="cv-day-number">{day}</span>
                            {hasEvents && (
                                <div className="cv-day-events">
                                    {dayEvents.slice(0, 3).map((e, i) => (
                                        <div
                                            key={`item-${i}`}
                                            className="cv-event-dot"
                                            style={{ backgroundColor: EVENT_COLORS[e.event_type] }}
                                            title={e.name}
                                        />
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <span className="cv-more">+{dayEvents.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedDate && (
                <div className="cv-selected-events">
                    <h4>
                        {selectedDate.toLocaleDateString('tr-TR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                        })}
                    </h4>
                    {getEventsForDay(selectedDate.getDate()).map((event, idx) => (
                        <EventCard
                            key={`item-${idx}`}
                            event={event}
                            compact
                            onView={onEventClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

CalendarView.propTypes = {
    events: PropTypes.array,
    onSelectDate: PropTypes.func,
    onEventClick: PropTypes.func,
};
