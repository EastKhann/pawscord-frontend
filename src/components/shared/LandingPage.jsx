// Landing Page for Pre-Launch Waitlist
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
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
            const res = await fetch('/api/waitlist/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
            setSuccess(true);
            setEmail('');

            // Show referral link
            if (data.referral_code) {
                toast.success(t('landing.vipAccess', { code: data.referral_code }), 5000);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
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
                            {t('landing.heroTitle')}{' '}
                            <span className="highlight">{t('landing.heroHighlight')}</span>
                        </h1>
                        <p className="hero-subtitle">{t('landing.heroSubtitle')}</p>

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
                                <button
                                    aria-label={t('landing.joinWaitlist', 'Join waitlist')}
                                    type="submit"
                                    disabled={loading}
                                    className="waitlist-btn"
                                >
                                    {loading ? t('landing.joining', 'Joining...') : t('landing.joinWaitlist', 'Join Waitlist')}
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
                        <img
                            src="/static/images/hero-screenshot.png"
                            alt={t('alt.pawscordInterface', 'Pawscord Interface')}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            </section >

            {/* Features Grid */}
            < section className="features" >
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
            </section >

            {/* Screenshots */}
            < section className="screenshots" >
                <div className="container">
                    <h2 className="section-title">{t('landing.seeInAction')}</h2>
                    <div className="screenshots-grid">
                        <img
                            src="/static/images/screenshot-chat.png"
                            alt={t('alt.chatInterface', 'Chat Interface')}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <img
                            src="/static/images/screenshot-voice.png"
                            alt={t('alt.voiceChannels', 'Voice Channels')}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <img
                            src="/static/images/screenshot-mobile.png"
                            alt={t('alt.mobileApp', 'Mobile App')}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            </section >

            {/* Social Proof */}
            < section className="social-proof" >
                <div className="container">
                    <div className="stats">
                        <div className="stat">
                            <h3>500+</h3>
                            <p>{t('landing.betaTesters')}</p>
                        </div>
                        <div className="stat">
                            <h3>279 KB</h3>
                            <p>{t('landing.bundleSize')}</p>
                        </div>
                        <div className="stat">
                            <h3>99.9%</h3>
                            <p>{t('landing.uptimeSla')}</p>
                        </div>
                        <div className="stat">
                            <h3>100%</h3>
                            <p>{t('landing.openSource')}</p>
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="cta" >
                <div className="container">
                    <h2>{t('landing.readyToJoin')}</h2>
                    <p>{t('landing.firstUsers')}</p>
                    {!success && (
                        <form className="waitlist-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder={t('landing.emailPlaceholderFull')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="waitlist-input"
                            />
                            <button
                                aria-label={t('landing.getEarlyAccess', 'Get early access')}
                                type="submit"
                                disabled={loading}
                                className="waitlist-btn"
                            >
                                {loading ? t('landing.joining') : t('landing.getEarlyAccess')}
                            </button>
                        </form>
                    )}
                </div>
            </section >

            {/* Footer */}
            < footer className="footer" >
                <div className="container">
                    <div className="footer-links">
                        <a
                            href="https://github.com/pawscord/pawscord"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                        <a href="/privacy">{t('landing.privacyPolicy')}</a>
                        <a href="/terms">{t('landing.termsOfService')}</a>
                        <a href="mailto:hello@pawscord.com">Contact</a>
                    </div>
                    <p className="copyright">{t('landing.copyright')}</p>
                </div>
            </footer>
        </div >
    );
}
