const TicketDetail = ({ ticket, onClose, newMessage, setNewMessage, sendMessage, exportTranscript, closeTicket, formatDate }) => (
  <div className="ticket-detail-modal" onClick={onClose}>
    <div className="ticket-detail-panel" onClick={(e) => e.stopPropagation()}>
      <div className="detail-header">
        <div>
          <span className="ticket-id-large">#{ticket.id}</span>
          <h3>{ticket.subject || 'Destek Talebi'}</h3>
        </div>
        <button className="close-btn" onClick={onClose}>{'\u00d7'}</button>
      </div>

      <div className="detail-body">
        <div className="messages-container">
          {ticket.messages?.map((msg, index) => (
            <div key={index} className="message-item">
              <div className="message-author">
                <span className="author-name">{msg.author}</span>
                <span className="message-time">{formatDate(msg.created_at)}</span>
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
        </div>

        <div className="message-input-container">
          <input
            type="text"
            placeholder="Mesaj\u0131n\u0131z\u0131 yaz\u0131n..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            {'\ud83d\udce4'} G\u00f6nder
          </button>
        </div>
      </div>

      <div className="detail-footer">
        <button className="export-btn" onClick={() => exportTranscript(ticket.id)}>
          {'\ud83d\udcc4'} Transcript \u0130ndir
        </button>
        <button className="close-ticket-btn-large" onClick={() => closeTicket(ticket.id)}>
          {'\u2713'} Ticket'\u0131 Kapat
        </button>
      </div>
    </div>
  </div>
);

export default TicketDetail;
