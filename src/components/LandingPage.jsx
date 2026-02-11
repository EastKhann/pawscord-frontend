// Landing Page for Pre-Launch Waitlist
import { useState } from 'react';
import axios from 'axios';
import toast from '../utils/toast';
import './LandingPage.css';

export default function LandingPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/waitlist/', { email });
            setSuccess(true);
            setEmail('');

            // Show referral link
            if (response.data.referral_code) {
                toast.success(`You're on the list! Share this link for VIP early access: pawscord.com/join/${response.data.referral_code}`, 5000);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Discord Alternative That <span className="highlight">Respects Your Privacy</span>
                        </h1>
                        <p className="hero-subtitle">
                            Real-time chat, voice channels, 100MB uploads. No tracking. No ads. 100% open source.
                        </p>

                        {/* Waitlist Form */}
                        {!success ? (
                            <form className="waitlist-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="waitlist-input"
                                />
                                <button type="submit" disabled={loading} className="waitlist-btn">
                                    {loading ? 'Joining...' : 'Join Waitlist'}
                                </button>
                            </form>
                        ) : (
                            <div className="success-message">
                                <h3>🎉 You're on the list!</h3>
                                <p>We'll notify you when we launch on January 22.</p>
                                <p className="referral-hint">Check your email for your VIP referral link!</p>
                            </div>
                        )}

                        {error && <p className="error-message">{error}</p>}

                        <p className="launch-date">🚀 Launching January 22, 2026 • Join 500+ beta testers</p>
                    </div>

                    <div className="hero-image">
                        <img src="/static/images/hero-screenshot.png" alt="Pawscord Interface" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="features">
                <div className="container">
                    <h2 className="section-title">Why Pawscord?</h2>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Privacy First</h3>
                            <p>No data mining. No tracking. GDPR compliant. Your conversations stay yours.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Real-Time Chat</h3>
                            <p>WebSocket-powered instant messaging. Sub-second message delivery.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🎤</div>
                            <h3>Voice Channels</h3>
                            <p>Crystal-clear WebRTC voice chat. Up to 4K quality for premium users.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📁</div>
                            <h3>100MB Uploads</h3>
                            <p>4x larger than Discord. Share videos, presentations, anything.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Cross-Platform</h3>
                            <p>Web, Android APK, Windows EXE. iOS app coming February.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">💎</div>
                            <h3>Premium Features</h3>
                            <p>Starting at $4.99/mo. Custom emojis, unlimited uploads, priority support.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshots */}
            <section className="screenshots">
                <div className="container">
                    <h2 className="section-title">See It In Action</h2>
                    <div className="screenshots-grid">
                        <img src="/static/images/screenshot-chat.png" alt="Chat Interface" />
                        <img src="/static/images/screenshot-voice.png" alt="Voice Channels" />
                        <img src="/static/images/screenshot-mobile.png" alt="Mobile App" />
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="social-proof">
                <div className="container">
                    <div className="stats">
                        <div className="stat">
                            <h3>500+</h3>
                            <p>Beta Testers</p>
                        </div>
                        <div className="stat">
                            <h3>279 KB</h3>
                            <p>Bundle Size</p>
                        </div>
                        <div className="stat">
                            <h3>99.9%</h3>
                            <p>Uptime SLA</p>
                        </div>
                        <div className="stat">
                            <h3>100%</h3>
                            <p>Open Source</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <h2>Ready to Join?</h2>
                    <p>Be part of the first 1,000 users. Get 3 months free premium.</p>
                    {!success && (
                        <form className="waitlist-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="waitlist-input"
                            />
                            <button type="submit" disabled={loading} className="waitlist-btn">
                                {loading ? 'Joining...' : 'Get Early Access'}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-links">
                        <a href="https://github.com/pawscord/pawscord" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="mailto:hello@pawscord.com">Contact</a>
                    </div>
                    <p className="copyright">© 2026 Pawscord. Built with ❤️ for privacy.</p>
                </div>
            </footer>
        </div>
    );
}
