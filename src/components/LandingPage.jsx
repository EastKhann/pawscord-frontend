// Landing Page for Pre-Launch Waitlist
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from '../utils/toast';
import './LandingPage.css';

export default function LandingPage() {
    const { t } = useTranslation();
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
                            {t('landing.heroTitle')} <span className="highlight">{t('landing.heroHighlight')}</span>
                        </h1>
                        <p className="hero-subtitle">
                            {t('landing.heroSubtitle')}
                        </p>

                        {/* Waitlist Form */}
                        {!success ? (
                            <form className="waitlist-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder={t('landing.emailPlaceholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="waitlist-input"
                                />
                                <button type="submit" disabled={loading} className="waitlist-btn">
                                    {loading ? t('landing.joining') : t('landing.joinWaitlist')}
                                </button>
                            </form>
                        ) : (
                            <div className="success-message">
                                <h3>🎉 {t('landing.onTheList')}</h3>
                                <p>{t('landing.notifyLaunch')}</p>
                                <p className="referral-hint">{t('landing.checkEmail')}</p>
                            </div>
                        )}

                        {error && <p className="error-message">{error}</p>}

                        <p className="launch-date">🚀 {t('landing.launchDate')}</p>
                    </div>

                    <div className="hero-image">
                        <img src="/static/images/hero-screenshot.png" alt="Pawscord Interface" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="features">
                <div className="container">
                    <h2 className="section-title">{t('landing.whyPawscord')}</h2>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>{t('landing.privacyFirst')}</h3>
                            <p>{t('landing.privacyDesc')}</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>{t('landing.realTimeChat')}</h3>
                            <p>{t('landing.realtimeDesc')}</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🎤</div>
                            <h3>{t('landing.voiceChannels')}</h3>
                            <p>{t('landing.voiceDesc')}</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📁</div>
                            <h3>{t('landing.uploads')}</h3>
                            <p>{t('landing.uploadsDesc')}</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>{t('landing.crossPlatform')}</h3>
                            <p>{t('landing.crossDesc')}</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">💎</div>
                            <h3>{t('landing.premiumFeatures')}</h3>
                            <p>{t('landing.premiumDesc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshots */}
            <section className="screenshots">
                <div className="container">
                    <h2 className="section-title">{t('landing.seeInAction')}</h2>
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
                    <h2>{t('landing.readyToJoin')}</h2>
                    <p>{t('landing.firstUsers')}</p>
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
                                {loading ? t('landing.joining') : t('landing.getEarlyAccess')}
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
                    <p className="copyright">{t('landing.copyright')}</p>
                </div>
            </footer>
        </div>
    );
}
