// components/ServerBoostModal.js
// 🚀 Server Boost Modal

import React, { useState } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaRocket, FaStar, FaCheck } from 'react-icons/fa';
import './ServerBoostModal.css';

const ServerBoostModal = ({ server, onClose, onBoost }) => {
    const [boostLevel, setBoostLevel] = useState(1);
    const [boosting, setBoosting] = useState(false);

    const boostTiers = [
        {
            level: 1,
            boosts: 2,
            perks: [
                '+50 Emoji Slots',
                'Custom Server Banner',
                '128 Kbps Audio Quality',
                'Animated Server Icon'
            ],
            color: '#f47fff'
        },
        {
            level: 2,
            boosts: 7,
            perks: [
                '+100 Emoji Slots',
                'Server Discovery',
                '256 Kbps Audio Quality',
                '50MB Upload Limit',
                'Custom Invite Background'
            ],
            color: '#f47fff'
        },
        {
            level: 3,
            boosts: 14,
            perks: [
                '+200 Emoji Slots',
                'Custom URL (Vanity)',
                '384 Kbps Audio Quality',
                '100MB Upload Limit',
                'Animated Banner'
            ],
            color: '#f47fff'
        }
    ];

    const handleBoost = async () => {
        setBoosting(true);
        try {
            const response = await fetch('/api/servers/boost/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    server_id: server.id,
                    boost_level: boostLevel
                })
            });

            if (response.ok) {
                onBoost(boostLevel);
                onClose();
            } else {
                throw new Error('Failed to boost');
            }
        } catch (error) {
            console.error('Boost error:', error);
            toast.error('❌ Failed to boost server');
        } finally {
            setBoosting(false);
        }
    };

    return (
        <div className="boost-modal-overlay" onClick={onClose}>
            <div className="boost-modal" onClick={(e) => e.stopPropagation()}>
                <div className="boost-header">
                    <div className="header-title">
                        <FaRocket className="boost-icon" />
                        <h3>Boost {server.name}</h3>
                    </div>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>

                <div className="boost-body">
                    <div className="current-status">
                        <div className="status-label">Current Level</div>
                        <div className="status-value">
                            Level {server.boost_level || 0}
                            <span className="boost-count">
                                ({server.boost_count || 0} Boosts)
                            </span>
                        </div>
                    </div>

                    <div className="boost-tiers">
                        {boostTiers.map(tier => (
                            <div
                                key={tier.level}
                                className={`boost-tier ${server.boost_level >= tier.level ? 'unlocked' : ''}`}
                            >
                                <div className="tier-header">
                                    <div className="tier-level">
                                        Level {tier.level}
                                        {server.boost_level >= tier.level && (
                                            <FaCheck className="unlocked-icon" />
                                        )}
                                    </div>
                                    <div className="tier-requirement">
                                        {tier.boosts} Boosts Required
                                    </div>
                                </div>
                                <ul className="tier-perks">
                                    {tier.perks.map((perk, idx) => (
                                        <li key={idx}>
                                            <FaStar className="perk-icon" />
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="boost-info">
                        <FaRocket />
                        <p>
                            Server Boosts help improve the server for everyone!
                            Boosters get special perks and recognition.
                        </p>
                    </div>
                </div>

                <div className="boost-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="boost-btn"
                        onClick={handleBoost}
                        disabled={boosting}
                    >
                        <FaRocket />
                        {boosting ? 'Boosting...' : 'Boost This Server'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServerBoostModal;



