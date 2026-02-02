// components/ReportMessageModal.js
// 🚨 Message Report Modal

import React, { useState } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import './ReportMessageModal.css';

const ReportMessageModal = ({ message, onClose, onSubmit }) => {
    const [reason, setReason] = useState('spam');
    const [details, setDetails] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const reportReasons = [
        {
            value: 'spam',
            label: 'Spam',
            description: 'Unwanted promotional or repetitive content'
        },
        {
            value: 'harassment',
            label: 'Harassment',
            description: 'Bullying or targeted harassment'
        },
        {
            value: 'hate_speech',
            label: 'Hate Speech',
            description: 'Discriminatory or hateful content'
        },
        {
            value: 'nsfw',
            label: 'NSFW Content',
            description: 'Adult or inappropriate content'
        },
        {
            value: 'violence',
            label: 'Violence/Threats',
            description: 'Threatening or violent content'
        },
        {
            value: 'misinformation',
            label: 'Misinformation',
            description: 'False or misleading information'
        },
        {
            value: 'scam',
            label: 'Scam/Fraud',
            description: 'Fraudulent or deceptive content'
        },
        {
            value: 'other',
            label: 'Other',
            description: 'Other reason not listed above'
        }
    ];

    const handleSubmit = async () => {
        if (!details.trim() && reason === 'other') {
            toast.error('❌ Please provide details for "Other" reason');
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch('/api/messages/report/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    message_id: message.id,
                    reason,
                    details: details.trim()
                })
            });

            if (response.ok) {
                toast.success('✅ Report submitted successfully. Our moderators will review it.');
                if (onSubmit) onSubmit();
                onClose();
            } else {
                throw new Error('Failed to submit report');
            }
        } catch (error) {
            console.error('Report error:', error);
            toast.error('❌ Failed to submit report. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const selectedReason = reportReasons.find(r => r.value === reason);

    return (
        <div className="report-message-modal-overlay" onClick={onClose}>
            <div className="report-message-modal" onClick={(e) => e.stopPropagation()}>
                <div className="report-modal-header">
                    <div className="header-title">
                        <FaExclamationTriangle className="warning-icon" />
                        <h3>Report Message</h3>
                    </div>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>

                <div className="report-modal-body">
                    <div className="message-preview">
                        <strong>Reporting message from:</strong> {message.username}
                        <div className="message-content">
                            {message.content}
                        </div>
                    </div>

                    <div className="reason-section">
                        <label>Reason for report:</label>
                        <div className="reason-options">
                            {reportReasons.map(r => (
                                <label
                                    key={r.value}
                                    className={`reason-option ${reason === r.value ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="reason"
                                        value={r.value}
                                        checked={reason === r.value}
                                        onChange={(e) => setReason(e.target.value)}
                                    />
                                    <div className="reason-content">
                                        <div className="reason-label">{r.label}</div>
                                        <div className="reason-description">{r.description}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="details-section">
                        <label>Additional details {reason === 'other' && <span className="required">*</span>}:</label>
                        <textarea
                            placeholder="Provide any additional context that might help moderators..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            maxLength={500}
                            rows={4}
                        />
                        <div className="char-count">{details.length}/500</div>
                    </div>

                    <div className="report-info">
                        <FaExclamationTriangle />
                        <p>
                            False reports may result in action against your account.
                            Reports are anonymous to the reported user.
                        </p>
                    </div>
                </div>

                <div className="report-modal-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportMessageModal;



