import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmailVerification.css';

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        verifyEmail();
    }, [token]);

    const verifyEmail = async () => {
        try {
            const response = await fetch('/api/auth/verify-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage('Email verified successfully! Redirecting...');

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.error || 'Verification failed');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setStatus('error');
            setMessage('An error occurred during verification');
        }
    };

    return (
        <div className="email-verification">
            <div className="verification-card">
                <div className={`status-icon ${status}`}>
                    {status === 'verifying' && (
                        <div className="spinner"></div>
                    )}
                    {status === 'success' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {status === 'error' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            <path d="M15 9l-6 6M9 9l6 6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    )}
                </div>

                <h2>{status === 'success' ? 'Email Verified!' : status === 'error' ? 'Verification Failed' : 'Verifying Email'}</h2>
                <p>{message}</p>

                {status === 'success' && (
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </button>
                )}

                {status === 'error' && (
                    <button
                        className="btn-secondary"
                        onClick={() => navigate('/register')}
                    >
                        Back to Registration
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;


