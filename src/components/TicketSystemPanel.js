import './TicketSystemPanel.css';
import useTicketSystem from './TicketSystemPanel/useTicketSystem';
import TicketConfig from './TicketSystemPanel/TicketConfig';
import TicketDetail from './TicketSystemPanel/TicketDetail';

const TicketSystemPanel = ({ serverId, onClose }) => {
  const t = useTicketSystem(serverId);

  return (
    <div className="ticket-panel-overlay" onClick={onClose}>
      <div className="ticket-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ticket-header">
          <h2>{'\ud83c\udfab'} Destek Sistemi</h2>
          <button className="close-btn" onClick={onClose}>{'\u00d7'}</button>
        </div>

        <div className="ticket-content">
          <TicketConfig
            config={t.config}
            setConfig={t.setConfig}
            categories={t.categories}
            roles={t.roles}
            channels={t.channels}
            updateConfig={t.updateConfig}
          />

          <div className="tickets-section">
            <h3>{'\ud83d\udccb'} Aktif Ticket{'\u2019'}lar</h3>

            {t.loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Ticket{'\u2019'}lar y\u00fckleniyor...</p>
              </div>
            ) : t.tickets.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">{'\ud83c\udfab'}</span>
                <p>Hen\u00fcz ticket yok</p>
                <span className="empty-hint">Kullan\u0131c\u0131lar ticket olu\u015fturdu\u011funda burada g\u00f6r\u00fcnecek</span>
              </div>
            ) : (
              <div className="tickets-grid">
                {t.tickets.map((ticket) => (
                  <div key={ticket.id} className="ticket-card" onClick={() => t.setSelectedTicket(ticket)}>
                    <div className="ticket-card-header">
                      <div className="ticket-info">
                        <span className="ticket-id">#{ticket.id}</span>
                        <h4>{ticket.subject || 'Destek Talebi'}</h4>
                      </div>
                      <div className="ticket-badges">
                        <span className="status-badge" style={{ background: t.getStatusBadge(ticket.status).color }}>
                          {t.getStatusBadge(ticket.status).text}
                        </span>
                        <span className="priority-badge" style={{ background: t.getPriorityBadge(ticket.priority).color }}>
                          {t.getPriorityBadge(ticket.priority).text}
                        </span>
                      </div>
                    </div>

                    <div className="ticket-meta">
                      <div className="meta-item">
                        <span className="meta-label">Olu\u015fturan:</span>
                        <span className="meta-value">{ticket.creator_username}</span>
                      </div>
                      {ticket.assigned_to && (
                        <div className="meta-item">
                          <span className="meta-label">Atanan:</span>
                          <span className="meta-value">{ticket.assigned_to_username}</span>
                        </div>
                      )}
                      <div className="meta-item">
                        <span className="meta-label">Olu\u015fturulma:</span>
                        <span className="meta-value">{t.formatDate(ticket.created_at)}</span>
                      </div>
                    </div>

                    <div className="ticket-actions-quick">
                      <button className="priority-btn" onClick={(e) => {
                        e.stopPropagation();
                        const priorities = ['low', 'medium', 'high', 'urgent'];
                        const currentIndex = priorities.indexOf(ticket.priority);
                        t.setPriority(ticket.id, priorities[(currentIndex + 1) % priorities.length]);
                      }}>
                        {'\ud83c\udff7\ufe0f'} \u00d6ncelik
                      </button>
                      <button className="close-ticket-btn" onClick={(e) => {
                        e.stopPropagation();
                        t.closeTicket(ticket.id);
                      }}>
                        {'\u2713'} Kapat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {t.selectedTicket && (
          <TicketDetail
            ticket={t.selectedTicket}
            onClose={() => t.setSelectedTicket(null)}
            newMessage={t.newMessage}
            setNewMessage={t.setNewMessage}
            sendMessage={t.sendMessage}
            exportTranscript={t.exportTranscript}
            closeTicket={t.closeTicket}
            formatDate={t.formatDate}
          />
        )}
      </div>
    </div>
  );
};

export default TicketSystemPanel;
