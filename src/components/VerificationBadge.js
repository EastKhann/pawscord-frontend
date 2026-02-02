// components/VerificationBadge.js
// ✓ Verified User Badge Component

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './VerificationBadge.css';

const VerificationBadge = ({
    verified,
    size = 16,
    showTooltip = true,
    type = 'default' // default, gold, partner
}) => {
    if (!verified) return null;

    const colors = {
        default: '#5865f2', // Discord blue
        gold: '#faa61a',    // Gold verified
        partner: '#43b581'  // Partner green
    };

    const tooltips = {
        default: 'Verified User',
        gold: 'Gold Verified',
        partner: 'Official Partner'
    };

    return (
        <span className="verification-badge-container">
            <FaCheckCircle
                className={`verification-badge verification-${type}`}
                style={{
                    color: colors[type],
                    fontSize: `${size}px`
                }}
                title={showTooltip ? tooltips[type] : ''}
            />
        </span>
    );
};

export default VerificationBadge;



