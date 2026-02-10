import React, { useState, useEffect } from 'react';
import {
    FaGift, FaTimes, FaSearch, FaGem, FaCrown, FaRocket,
    FaUser, FaCalendar, FaCheck, FaHistory, FaPaperPlane,
    FaHeart, FaClock, FaInfoCircle
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './GiftSubscriptionPanel.css';
import toast from '../utils/toast';

const GiftSubscriptionPanel = ({ userId, onClose }) => {
    const [activeTab, setActiveTab] = useState('send');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState('1');
    const [recipient, setRecipient] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [message, setMessage] = useState('');
    const [giftHistory, setGiftHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    const plans = [
        {
            id: 'nitro',
            name: 'PAWSCORD Nitro',
            icon: <FaGem />,
            color: '#a855f7',
            prices: { '1': 9.99, '3': 26.99, '12': 99.99 },
            features: ['Custom Emoji Anywhere', '2 Server Boosts', 'HD Video', '500MB Upload']
        },
        {
            id: 'basic',
            name: 'PAWSCORD Basic',
            icon: <FaCrown />,
            color: '#ffc107',
            prices: { '1': 4.99, '3': 13.99, '12': 49.99 },
            features: ['Custom Emoji', '50MB Upload', 'Custom Profile']
        },
        {
            id: 'boost',
            name: 'Server Boost',
            icon: <FaRocket />,
            color: '#f472b6',
            prices: { '1': 4.99, '3': 13.99, '12': 49.99 },
            features: ['Boost Any Server', 'Exclusive Badge', 'Special Perks']
        }
    ];

    const durations = [
        { value: '1', label: '1 Month' },
        { value: '3', label: '3 Months' },
        { value: '12', label: '1 Year' }
    ];

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (activeTab === 'history') {
            loadGiftHistory();
        }
    }, [activeTab]);

    useEffect(() => {
        if (recipient.length >= 2) {
            searchUsers();
        } else {
            setSearchResults([]);
        }
    }, [recipient]);

    const loadGiftHistory = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${getApiBase()}/api/nitro/gift-history/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setGiftHistory(data.gifts || []);
            } else {
                setGiftHistory([]);
            }
        } catch (error) {
            console.error('Error loading gift history:', error);
            setGiftHistory([]);
        }
        setLoading(false);
    };

    const searchUsers = async () => {
        setSearching(true);
        try {
            const response = await fetch(`${getApiBase()}/api/users/search/?q=${encodeURIComponent(recipient)}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data.users || []);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching users:', error);
            setSearchResults([]);
        }
        setSearching(false);
    };

    const handleSelectRecipient = (user) => {
        setSelectedRecipient(user);
        setRecipient('');
        setSearchResults([]);
    };

    const handleSendGift = async () => {
        if (!selectedPlan || !selectedRecipient) return;

        setLoading(true);
        try {
            const response = await fetch(`${getApiBase()}/api/nitro/send-gift/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    plan_id: selectedPlan.id,
                    recipient_id: selectedRecipient.id,
                    duration: parseInt(selectedDuration),
                    message: message
                })
            });
            if (response.ok) {
                toast.success(`Gift sent to ${selectedRecipient.username}!`);
                setSelectedPlan(null);
                setSelectedRecipient(null);
                setMessage('');
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to send gift');
            }
        } catch (error) {
            console.error('Error sending gift:', error);
            toast.error('Failed to send gift');
        }
        setLoading(false);
    };

    const getPrice = () => {
        if (!selectedPlan) return 0;
        return selectedPlan.prices[selectedDuration];
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'claimed':
                return <span className="status-badge claimed"><FaCheck /> Claimed</span>;
            case 'pending':
                return <span className="status-badge pending"><FaClock /> Pending</span>;
            case 'expired':
                return <span className="status-badge expired">Expired</span>;
            default:
                return null;
        }
    };

    return (
        <div className="giftpanel-overlay" onClick={onClose}>
            <div className="giftpanel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaGift /> Gift Subscription</h2>
                        <span className="subtitle">Send the gift of premium to friends</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={activeTab === 'send' ? 'active' : ''}
                        onClick={() => setActiveTab('send')}
                    >
                        <FaPaperPlane /> Send Gift
                    </button>
                    <button
                        className={activeTab === 'history' ? 'active' : ''}
                        onClick={() => setActiveTab('history')}
                    >
                        <FaHistory /> Gift History
                    </button>
                </div>

                <div className="content">
                    {activeTab === 'send' ? (
                        <div className="send-gift">
                            {/* Step 1: Select Plan */}
                            <div className="step">
                                <h3>1. Choose a Plan</h3>
                                <div className="plans-grid">
                                    {plans.map(plan => (
                                        <div
                                            key={plan.id}
                                            className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                                            style={{ '--plan-color': plan.color }}
                                            onClick={() => setSelectedPlan(plan)}
                                        >
                                            <div className="plan-icon" style={{ color: plan.color }}>
                                                {plan.icon}
                                            </div>
                                            <h4>{plan.name}</h4>
                                            <div className="plan-price">
                                                ${plan.prices[selectedDuration]}
                                            </div>
                                            <ul className="plan-features">
                                                {plan.features.map((f, i) => (
                                                    <li key={i}><FaCheck /> {f}</li>
                                                ))}
                                            </ul>
                                            {selectedPlan?.id === plan.id && (
                                                <div className="selected-check"><FaCheck /></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Select Duration */}
                            <div className="step">
                                <h3>2. Select Duration</h3>
                                <div className="duration-options">
                                    {durations.map(d => (
                                        <button
                                            key={d.value}
                                            className={selectedDuration === d.value ? 'active' : ''}
                                            onClick={() => setSelectedDuration(d.value)}
                                        >
                                            <FaCalendar /> {d.label}
                                            {selectedPlan && (
                                                <span className="duration-price">
                                                    ${selectedPlan.prices[d.value]}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Select Recipient */}
                            <div className="step">
                                <h3>3. Choose Recipient</h3>
                                {selectedRecipient ? (
                                    <div className="selected-recipient">
                                        <div className="recipient-avatar">
                                            <FaUser />
                                        </div>
                                        <div className="recipient-info">
                                            <span className="recipient-name">
                                                {selectedRecipient.username}
                                            </span>
                                            <span className="recipient-tag">
                                                #{selectedRecipient.discriminator}
                                            </span>
                                        </div>
                                        <button
                                            className="remove-recipient"
                                            onClick={() => setSelectedRecipient(null)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="recipient-search">
                                        <div className="search-input">
                                            <FaSearch />
                                            <input
                                                type="text"
                                                placeholder="Search for a user..."
                                                value={recipient}
                                                onChange={(e) => setRecipient(e.target.value)}
                                            />
                                        </div>
                                        {searchResults.length > 0 && (
                                            <div className="search-results">
                                                {searchResults.map(user => (
                                                    <div
                                                        key={user.id}
                                                        className="search-result"
                                                        onClick={() => handleSelectRecipient(user)}
                                                    >
                                                        <div className="user-avatar">
                                                            <FaUser />
                                                            <span className={`status-dot ${user.status}`}></span>
                                                        </div>
                                                        <span className="user-name">{user.username}</span>
                                                        <span className="user-tag">#{user.discriminator}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Step 4: Add Message */}
                            <div className="step">
                                <h3>4. Add a Message (Optional)</h3>
                                <textarea
                                    placeholder="Write a personal message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={200}
                                />
                                <span className="char-count">{message.length}/200</span>
                            </div>

                            {/* Summary */}
                            {selectedPlan && selectedRecipient && (
                                <div className="gift-summary">
                                    <div className="summary-row">
                                        <span>Gift:</span>
                                        <span>{selectedPlan.name} ({durations.find(d => d.value === selectedDuration)?.label})</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>To:</span>
                                        <span>{selectedRecipient.username}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total:</span>
                                        <span>${getPrice()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="gift-history">
                            {loading ? (
                                <div className="loading">Loading gift history...</div>
                            ) : giftHistory.length === 0 ? (
                                <div className="empty-state">
                                    <FaGift />
                                    <p>No gifts yet</p>
                                    <span>Send your first gift to a friend!</span>
                                </div>
                            ) : (
                                <div className="history-list">
                                    {giftHistory.map(gift => (
                                        <div key={gift.id} className={`history-item ${gift.type}`}>
                                            <div className="gift-icon">
                                                {gift.type === 'sent' ? <FaPaperPlane /> : <FaHeart />}
                                            </div>
                                            <div className="gift-info">
                                                <div className="gift-header">
                                                    <span className="gift-type">
                                                        {gift.type === 'sent' ? 'Sent' : 'Received'}
                                                    </span>
                                                    <span className="gift-plan">{gift.plan_name}</span>
                                                    <span className="gift-duration">
                                                        ({gift.duration} month{gift.duration > 1 ? 's' : ''})
                                                    </span>
                                                </div>
                                                <div className="gift-meta">
                                                    {gift.type === 'sent' ? (
                                                        <span>To: {gift.recipient.username}</span>
                                                    ) : (
                                                        <span>From: {gift.sender.username}</span>
                                                    )}
                                                    <span className="gift-date">{formatDate(gift.created_at)}</span>
                                                </div>
                                                {gift.message && (
                                                    <div className="gift-message">"{gift.message}"</div>
                                                )}
                                            </div>
                                            <div className="gift-status">
                                                {getStatusBadge(gift.status)}
                                                {gift.amount && (
                                                    <span className="gift-amount">${gift.amount}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {activeTab === 'send' && (
                    <div className="panel-footer">
                        <div className="footer-info">
                            <FaInfoCircle />
                            <span>Gifts can be claimed within 48 hours</span>
                        </div>
                        <button
                            className="send-btn"
                            onClick={handleSendGift}
                            disabled={!selectedPlan || !selectedRecipient || loading}
                        >
                            <FaGift /> {loading ? 'Sending...' : `Send Gift ($${getPrice()})`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GiftSubscriptionPanel;
