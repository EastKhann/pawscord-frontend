import PropTypes from 'prop-types';

const TicketDetail = ({
    ticket,
    onClose,
    newMessage,
    setNewMessage,
    sendMessage,
    exportTranscript,
    closeTicket,
    formatDate,
}) => {
    return (
        <div
            className="ticket-detail-modal"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="ticket-detail-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="detail-header">
                    <div>
                        <span className="ticket-id-large">{ticket.id}</span>
                        <h3>{ticket.subject || 'Destek Talebi'}</h3>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="detail-body">
                    <div className="messages-container">
                        {ticket.messages?.map((msg, index) => (
                            <div key={`item-${index}`} className="message-item">
                                <div className="message-author">
                                    <span className="author-name">{msg.author}</span>
                                    <span className="message-time">
                                        {formatDate(msg.created_at)}
                                    </span>
                                </div>
                                <div className="message-content">{msg.content}</div>
                            </div>
                        ))}
                    </div>

                    <div className="message-input-container">
                        <input
                            type="text"
                            placeholder="Mesajınızı yazın..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button className="send-btn" onClick={sendMessage}>
                            📤 Send
                        </button>
                    </div>
                </div>

                <div className="detail-footer">
                    <button className="export-btn" onClick={() => exportTranscript(ticket.id)}>
                        📄 Transcript Download
                    </button>
                    <button
                        className="close-ticket-btn-large"
                        onClick={() => closeTicket(ticket.id)}
                    >
                        ✓ Tiketi Kapat
                    </button>
                </div>
            </div>
        </div>
    );
};

TicketDetail.propTypes = {
    ticket: PropTypes.object,
    onClose: PropTypes.func,
    newMessage: PropTypes.object,
    setNewMessage: PropTypes.func,
    sendMessage: PropTypes.func,
    exportTranscript: PropTypes.object,
    closeTicket: PropTypes.func,
    formatDate: PropTypes.string,
};
export default TicketDetail;
