import React, { useState, useEffect } from 'react';
import { giftApi } from '../services/niceToHaveApi';
import './GiftSystemPanel.css';
import toast from '../utils/toast';

const GIFT_TYPES = [
    { id: 'coins', name: 'Coins', emoji: '💰', cost: null },
    { id: 'flower', name: 'Flower', emoji: '🌹', cost: 50 },
    { id: 'heart', name: 'Heart', emoji: '💖', cost: 100 },
    { id: 'star', name: 'Star', emoji: '⭐', cost: 150 },
    { id: 'crown', name: 'Crown', emoji: '👑', cost: 500 },
    { id: 'rocket', name: 'Rocket', emoji: '🚀', cost: 300 },
    { id: 'trophy', name: 'Trophy', emoji: '🏆', cost: 1000 },
    { id: 'nitro', name: 'Nitro', emoji: '💎', cost: 2000 },
];

function GiftSystemPanel({ onClose }) {
    const [activeTab, setActiveTab] = useState('send');
    const [gifts, setGifts] = useState({ received: [], sent: [] });
    const [selectedType, setSelectedType] = useState('coins');
    const [receiverId, setReceiverId] = useState('');
    const [amount, setAmount] = useState(100);
    const [message, setMessage] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [loading, setLoading] = useState(false);
    const [revealGift, setRevealGift] = useState(null);

    useEffect(() => {
        loadGifts();
    }, []);

    const loadGifts = async () => {
        try {
            const data = await giftApi.getMyGifts();
            setGifts(data);
        } catch (err) {
            console.error('Failed to load gifts:', err);
        }
    };

    const handleSendGift = async () => {
        if (!receiverId) return;

        setLoading(true);
        try {
            await giftApi.sendGift({
                receiver_id: parseInt(receiverId),
                gift_type: selectedType,
                amount: selectedType === 'coins' ? amount : 1,
                message,
                is_anonymous: isAnonymous
            });

            // Reset form
            setReceiverId('');
            setAmount(100);
            setMessage('');
            setIsAnonymous(false);

            loadGifts();
            toast.success('Gift sent successfully! 🎁');
        } catch (err) {
            toast.error('Failed to send gift: ' + err.message);
        }
        setLoading(false);
    };

    const handleOpenGift = async (giftId) => {
        try {
            const result = await giftApi.openGift(giftId);
            if (result.gift) {
                setRevealGift(result.gift);
                loadGifts();
            }
        } catch (err) {
            toast.error('Failed to open gift');
        }
    };

    const getGiftEmoji = (type) => {
        return GIFT_TYPES.find(g => g.id === type)?.emoji || '🎁';
    };

    return (
        <div className="gift-system-panel">
            <h2>💝 Gift System</h2>

            <div className="gift-tabs">
                <button
                    className={`gift-tab ${activeTab === 'send' ? 'active' : ''}`}
                    onClick={() => setActiveTab('send')}
                >
                    Send Gift
                </button>
                <button
                    className={`gift-tab ${activeTab === 'received' ? 'active' : ''}`}
                    onClick={() => setActiveTab('received')}
                >
                    Received ({gifts.received?.filter(g => !g.is_opened).length || 0})
                </button>
                <button
                    className={`gift-tab ${activeTab === 'sent' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sent')}
                >
                    Sent
                </button>
            </div>

            {activeTab === 'send' && (
                <>
                    <div className="gift-types">
                        {GIFT_TYPES.map(type => (
                            <div
                                key={type.id}
                                className={`gift-type-card ${selectedType === type.id ? 'selected' : ''}`}
                                onClick={() => setSelectedType(type.id)}
                            >
                                <div className="emoji">{type.emoji}</div>
                                <div className="name">{type.name}</div>
                                {type.cost && <div className="cost">💰 {type.cost}</div>}
                            </div>
                        ))}
                    </div>

                    <div className="gift-form">
                        <div className="form-group">
                            <label>Recipient User ID</label>
                            <input
                                type="number"
                                value={receiverId}
                                onChange={(e) => setReceiverId(e.target.value)}
                                placeholder="Enter user ID..."
                            />
                        </div>

                        {selectedType === 'coins' && (
                            <div className="form-group">
                                <label>Amount</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                                    min="1"
                                    max="10000"
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Message (Optional)</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Add a personal message..."
                                maxLength={200}
                            />
                        </div>

                        <div className="form-group">
                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="anonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                />
                                <label htmlFor="anonymous" style={{ marginBottom: 0 }}>
                                    Send anonymously
                                </label>
                            </div>
                        </div>

                        <button
                            className="send-gift-btn"
                            onClick={handleSendGift}
                            disabled={loading || !receiverId}
                        >
                            {loading ? 'Sending...' : '🎁 Send Gift'}
                        </button>
                    </div>
                </>
            )}

            {activeTab === 'received' && (
                <div className="gifts-list">
                    {gifts.received?.length === 0 ? (
                        <div className="empty-state">
                            <div className="emoji">📭</div>
                            <p>No gifts received yet</p>
                        </div>
                    ) : (
                        gifts.received?.map(gift => (
                            <div key={gift.id} className={`gift-item ${!gift.is_opened ? 'unopened' : ''}`}>
                                <div className="gift-icon">{getGiftEmoji(gift.gift_type)}</div>
                                <div className="gift-info">
                                    <div className="gift-type">
                                        {gift.gift_type === 'coins' ? `${gift.amount} Coins` : GIFT_TYPES.find(t => t.id === gift.gift_type)?.name}
                                    </div>
                                    <div className="gift-from">
                                        From: {gift.is_opened ? gift.sender : '???'}
                                    </div>
                                    {gift.is_opened && gift.message && (
                                        <div className="gift-message">"{gift.message}"</div>
                                    )}
                                </div>
                                {!gift.is_opened && (
                                    <button className="open-gift-btn" onClick={() => handleOpenGift(gift.id)}>
                                        Open
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'sent' && (
                <div className="gifts-list">
                    {gifts.sent?.length === 0 ? (
                        <div className="empty-state">
                            <div className="emoji">📤</div>
                            <p>You haven't sent any gifts yet</p>
                        </div>
                    ) : (
                        gifts.sent?.map(gift => (
                            <div key={gift.id} className="gift-item">
                                <div className="gift-icon">{getGiftEmoji(gift.gift_type)}</div>
                                <div className="gift-info">
                                    <div className="gift-type">
                                        {gift.gift_type === 'coins' ? `${gift.amount} Coins` : GIFT_TYPES.find(t => t.id === gift.gift_type)?.name}
                                    </div>
                                    <div className="gift-from">To: {gift.receiver}</div>
                                    {gift.message && (
                                        <div className="gift-message">"{gift.message}"</div>
                                    )}
                                </div>
                                <div style={{ color: gift.is_opened ? '#43b581' : '#faa61a', fontSize: '12px' }}>
                                    {gift.is_opened ? '✓ Opened' : '⏳ Pending'}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {revealGift && (
                <div className="gift-reveal-modal" onClick={() => setRevealGift(null)}>
                    <div className="gift-reveal-content" onClick={e => e.stopPropagation()}>
                        <div className="emoji">{getGiftEmoji(revealGift.gift_type)}</div>
                        <h3>You received a gift!</h3>
                        {revealGift.gift_type === 'coins' && (
                            <div className="amount">+{revealGift.amount} Coins</div>
                        )}
                        <div className="from">
                            From: {revealGift.sender}
                        </div>
                        {revealGift.message && (
                            <div className="gift-message">"{revealGift.message}"</div>
                        )}
                        <button className="close-reveal-btn" onClick={() => setRevealGift(null)}>
                            Awesome!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GiftSystemPanel;
