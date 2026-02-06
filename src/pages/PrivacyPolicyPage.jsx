// frontend/src/pages/PrivacyPolicyPage.jsx
import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: 1.6,
            color: '#dcddde',
            background: 'linear-gradient(135deg, #1e1f22 0%, #2b2d31 100%)',
            minHeight: '100vh',
            padding: '0',
        }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)',
                    padding: '60px 40px',
                    borderRadius: '16px',
                    textAlign: 'center',
                    marginBottom: '40px',
                    boxShadow: '0 8px 32px rgba(88, 101, 242, 0.4)',
                }}>
                    <h1 style={{
                        fontSize: '3em',
                        color: '#fff',
                        marginBottom: '10px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    }}>🐾 Pawscord Privacy Policy</h1>
                    <p style={{ color: '#e3e5e8', fontSize: '1.1em' }}>Last Updated: February 5, 2026</p>
                </div>

                <div style={{
                    background: '#2b2d31',
                    padding: '50px 40px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}>
                    <div style={{
                        background: 'rgba(88, 101, 242, 0.15)',
                        borderLeft: '4px solid #5865f2',
                        padding: '20px',
                        margin: '25px 0',
                        borderRadius: '8px',
                    }}>
                        <strong style={{ color: '#fff' }}>Quick Summary:</strong> Pawscord collects only the data necessary to provide our chat service. We never sell your data to third parties.
                    </div>

                    <h2 style={{
                        color: '#5865f2',
                        margin: '40px 0 20px 0',
                        fontSize: '2em',
                        borderBottom: '2px solid #5865f2',
                        paddingBottom: '10px',
                    }}>1. Information We Collect</h2>
                    <p style={{ color: '#b9bbbe' }}>To provide Pawscord's chat and communication services, we collect:</p>

                    <h3 style={{ color: '#7289da', margin: '25px 0 15px 0', fontSize: '1.4em' }}>Personal Information</h3>
                    <ul style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}><strong>Account Data:</strong> Username, email address, password (encrypted)</li>
                        <li style={{ margin: '10px 0' }}><strong>Profile Information:</strong> Avatar, display name, bio (optional)</li>
                        <li style={{ margin: '10px 0' }}><strong>User ID:</strong> Unique identifier for your account</li>
                    </ul>

                    <h3 style={{ color: '#7289da', margin: '25px 0 15px 0', fontSize: '1.4em' }}>Communication Data</h3>
                    <ul style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}><strong>Messages:</strong> Text messages, direct messages, group chats</li>
                        <li style={{ margin: '10px 0' }}><strong>Media Files:</strong> Photos, videos, and files you share</li>
                        <li style={{ margin: '10px 0' }}><strong>Voice Messages:</strong> Audio recordings (if feature is used)</li>
                    </ul>

                    <h3 style={{ color: '#7289da', margin: '25px 0 15px 0', fontSize: '1.4em' }}>Usage Information</h3>
                    <ul style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}><strong>Activity Data:</strong> Online status, last seen timestamp</li>
                        <li style={{ margin: '10px 0' }}><strong>App Interactions:</strong> Features used, settings preferences</li>
                    </ul>

                    <h3 style={{ color: '#7289da', margin: '25px 0 15px 0', fontSize: '1.4em' }}>Device Information</h3>
                    <ul style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}><strong>Device Identifiers:</strong> Device ID for push notifications (FCM token)</li>
                        <li style={{ margin: '10px 0' }}><strong>Technical Data:</strong> App version, OS version</li>
                    </ul>

                    <h2 style={{
                        color: '#5865f2',
                        margin: '40px 0 20px 0',
                        fontSize: '2em',
                        borderBottom: '2px solid #5865f2',
                        paddingBottom: '10px',
                    }}>2. How We Use Your Information</h2>
                    <p style={{ color: '#b9bbbe' }}>We use collected data to:</p>
                    <ul style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}>✅ Provide and maintain Pawscord services</li>
                        <li style={{ margin: '10px 0' }}>✅ Deliver messages and notifications</li>
                        <li style={{ margin: '10px 0' }}>✅ Create and manage your account</li>
                        <li style={{ margin: '10px 0' }}>✅ Provide customer support</li>
                        <li style={{ margin: '10px 0' }}>✅ Improve app functionality and user experience</li>
                        <li style={{ margin: '10px 0' }}>✅ Prevent fraud and ensure security</li>
                    </ul>

                    <h2 style={{
                        color: '#5865f2',
                        margin: '40px 0 20px 0',
                        fontSize: '2em',
                        borderBottom: '2px solid #5865f2',
                        paddingBottom: '10px',
                    }}>3. Data Sharing</h2>
                    <p style={{ color: '#b9bbbe' }}><strong style={{ color: '#fff' }}>We do NOT sell your data.</strong> Your information is only shared in these limited cases:</p>
                    <ul style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}><strong>With Other Users:</strong> Messages and media you send are delivered to intended recipients</li>
                        <li style={{ margin: '10px 0' }}><strong>Service Providers:</strong> Cloud hosting (AWS/Cloudflare), push notifications (Firebase)</li>
                        <li style={{ margin: '10px 0' }}><strong>Legal Requirements:</strong> If required by law enforcement with valid legal request</li>
                    </ul>

                    <h2 style={{
                        color: '#5865f2',
                        margin: '40px 0 20px 0',
                        fontSize: '2em',
                        borderBottom: '2px solid #5865f2',
                        paddingBottom: '10px',
                    }}>4. Data Security</h2>
                    <p style={{ color: '#b9bbbe' }}>We protect your data using:</p>
                    <ul style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}>🔒 HTTPS/TLS encryption for data transmission</li>
                        <li style={{ margin: '10px 0' }}>🔒 Password hashing (bcrypt/PBKDF2)</li>
                        <li style={{ margin: '10px 0' }}>🔒 Secure database storage</li>
                        <li style={{ margin: '10px 0' }}>🔒 Regular security audits</li>
                    </ul>

                    <h2 style={{
                        color: '#5865f2',
                        margin: '40px 0 20px 0',
                        fontSize: '2em',
                        borderBottom: '2px solid #5865f2',
                        paddingBottom: '10px',
                    }}>5. Your Rights</h2>
                    <p style={{ color: '#b9bbbe' }}>You have the right to:</p>
                    <ul style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}>📋 Access your personal data</li>
                        <li style={{ margin: '10px 0' }}>✏️ Update or correct your information</li>
                        <li style={{ margin: '10px 0' }}>🗑️ Delete your account and associated data</li>
                        <li style={{ margin: '10px 0' }}>📥 Export your data (data portability)</li>
                        <li style={{ margin: '10px 0' }}>❌ Opt-out of non-essential notifications</li>
                    </ul>

                    <h3 style={{ color: '#7289da', margin: '25px 0 15px 0', fontSize: '1.4em' }}>How to Delete Your Account</h3>
                    <ol style={{ color: '#b9bbbe', margin: '15px 0 15px 30px' }}>
                        <li style={{ margin: '10px 0' }}>Open Pawscord app</li>
                        <li style={{ margin: '10px 0' }}>Go to <strong>Settings → Account Settings</strong></li>
                        <li style={{ margin: '10px 0' }}>Tap <strong>"Delete Account"</strong></li>
                        <li style={{ margin: '10px 0' }}>Enter your password to confirm</li>
                        <li style={{ margin: '10px 0' }}>Your account will be permanently deleted within 48 hours</li>
                    </ol>

                    <div style={{
                        background: 'rgba(114, 137, 218, 0.1)',
                        border: '2px solid #7289da',
                        padding: '30px',
                        borderRadius: '12px',
                        margin: '40px 0',
                    }}>
                        <h2 style={{ marginTop: 0, color: '#5865f2', border: 'none' }}>Contact Us</h2>
                        <p style={{ color: '#b9bbbe' }}>If you have questions about this Privacy Policy or your data:</p>
                        <ul style={{ color: '#b9bbbe', margin: 0, padding: 0, listStyle: 'none' }}>
                            <li style={{ margin: '10px 0' }}>📧 <strong>Email:</strong> support@pawscord.com</li>
                            <li style={{ margin: '10px 0' }}>🌐 <strong>Website:</strong> pawscord.com</li>
                            <li style={{ margin: '10px 0' }}>📱 <strong>In-App:</strong> Settings → Help & Support</li>
                        </ul>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #40444b', color: '#72767d' }}>
                        <p><strong>Pawscord</strong> - Secure Chat & Communication Platform</p>
                        <p>© 2026 Pawscord. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
