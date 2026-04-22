// frontend/src/components/ToastDemo.jsx
// Toast Notification Demo Sayfası - Test for

import { useState } from 'react';
import toast from '../../utils/toast';
import './ToastDemo.css';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { API_BASE_URL } from '../../utils/apiEndpoints';

ToastDemo.propTypes = {};

export default function ToastDemo() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="toast-demo-container">
            <div className="toast-demo-card">
                <h1>🎉 Toast Notification Demo</h1>
                <p>Modern notification system - used instead of Alert</p>

                <div className="toast-demo-grid">
                    {/* Success Toast */}
                    <div className="toast-demo-section">
                        <h3>✅ Success Toast</h3>
                        <p>Used for successful operations</p>
                        <button
                            aria-label={t('toastDemo.showSuccess', 'Show success toast')}
                            className="demo-btn success"
                            onClick={() => toast.success('Operation completed successfully!')}
                        >
                            Show Success Toast
                        </button>
                        <div className="code-example">
                            <code>toast.success('Mesaj');</code>
                        </div>
                    </div>

                    {/* Error Toast */}
                    <div className="toast-demo-section">
                        <h3>❌ Error Toast</h3>
                        <p>Used for error messages</p>
                        <button
                            aria-label={t('toastDemo.showError', 'Show error toast')}
                            className="demo-btn error"
                            onClick={() => toast.error('An error occurred! Please tekrar deneyin.')}
                        >
                            Show Error Toast
                        </button>
                        <div className="code-example">
                            <code>toast.error('Error message');</code>
                        </div>
                    </div>

                    {/* Warning Toast */}
                    <div className="toast-demo-section">
                        <h3>⚠️ Warning Toast</h3>
                        <p>Used for warning messages</p>
                        <button
                            aria-label={t('toastDemo.showWarning', 'Show warning toast')}
                            className="demo-btn warning"
                            onClick={() => toast.warning('Warning! This action cannot be undone.')}
                        >
                            Show Warning Toast
                        </button>
                        <div className="code-example">
                            <code>toast.warning('Warning');</code>
                        </div>
                    </div>

                    {/* Info Toast */}
                    <div className="toast-demo-section">
                        <h3>ℹ️ Info Toast</h3>
                        <p>Used for info messages</p>
                        <button
                            aria-label={t('toastDemo.showInfo', 'Show info toast')}
                            className="demo-btn info"
                            onClick={() => toast.info('Davet linki panoya copied!')}
                        >
                            Show Info Toast
                        </button>
                        <div className="code-example">
                            <code>toast.info('Bilgi');</code>
                        </div>
                    </div>
                </div>

                {/* Advanced Examples */}
                <div className="toast-demo-advanced">
                    <h2>🚀 Advanced Examples</h2>

                    <div className="advanced-row">
                        <button
                            aria-label={t('toastDemo.showMultiple', 'Show multiple toasts')}
                            className="demo-btn-large"
                            onClick={() => {
                                toast.success('1. Toast');
                                setTimeout(() => toast.info('2. Toast'), 500);
                                setTimeout(() => toast.warning('3. Toast'), 1000);
                                setTimeout(() => toast.error('4. Toast'), 1500);
                            }}
                        >
                            Multiple Toasts (4 pieces)
                        </button>
                        <code>Multiple toasts can be shown at the same time</code>
                    </div>

                    <div className="advanced-row">
                        <button
                            aria-label={t('toastDemo.showLongDuration', 'Show long duration toast')}
                            className="demo-btn-large"
                            onClick={() => toast.success('Bu toast 10 saniye kalacak!', 10000)}
                        >
                            Uzun Durationli Toast (10 saniye)
                        </button>
                        <code>toast.success('Mesaj', 10000);</code>
                    </div>

                    <div className="advanced-row">
                        <button
                            aria-label={t('toastDemo.showLongMessage', 'Show long message toast')}
                            className="demo-btn-large"
                            onClick={() =>
                                toast.success(
                                    'A very long message can be written here. The toast automatically expands and shows the entire message. Maximum width',
                                    5000
                                )
                            }
                        >
                            Long Message Toast
                        </button>
                        <code>Uzun messagelar otomatik wrap edilir</code>
                    </div>
                </div>

                {/* Kullanım Kılavuzu */}
                <div className="toast-usage-guide">
                    <h2>📚 Usage Guide</h2>

                    <div className="guide-step">
                        <h4>1️⃣ Import Et</h4>
                        <pre>
                            <code>import toast from '../../utils/toast';</code>
                        </pre>
                    </div>

                    <div className="guide-step">
                        <h4>2️⃣ Kullan</h4>
                        <pre>
                            <code>{`// Basit kullanım
toast.success('Operation successful!');
toast.error('An error occurred!');
toast.warning('Dikkat!');
toast.info('Info message');

// Özel süre (milisaniye)
toast.success('5 saniye kalacak', 5000);

// API response örneği
fetch(\`\${API_BASE_URL}/data\`)
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      toast.success('Veri kaydedildi!');
    } else {
      toast.error(data.error);
    }
  })
  .catch(err => {
    toast.error('Connection error: ' + err.message);
  });`}</code>
                        </pre>
                    </div>

                    <div className="guide-step">
                        <h4>3️⃣ Alert'i Change</h4>
                        <pre>
                            <code>{`// ❌ ÖNCE (eski, çirkin)
alert('✅ Server created!');
alert('❌ Error: ' + error.message);

// ✅ SONRA (yeni, modern)
toast.success('Server created!');
toast.error('Error: ' + error.message);`}</code>
                        </pre>
                    </div>
                </div>

                {/* Özellikler */}
                <div className="toast-features">
                    <h2>✨ Features</h2>
                    <ul>
                        <li>
                            ✅ <strong>Modern Design:</strong> Smooth animations and gradients
                            renkler
                        </li>
                        <li>
                            ✅ <strong>4 Different Types:</strong> Success, Error, Warning, Info
                        </li>
                        <li>
                            ✅ <strong>Emoji Icons:</strong> Custom emoji for each type
                        </li>
                        <li>
                            ✅ <strong>Otomatik Kapanma:</strong> Default 3 saniye
                        </li>
                        <li>
                            ✅ <strong>Manual Close:</strong> Close instantly with X button
                        </li>
                        <li>
                            ✅ <strong>Stack Structure:</strong> Multiple toasts stacked
                        </li>
                        <li>
                            ✅ <strong>Responsive:</strong> Looks great on mobile too
                        </li>
                        <li>
                            ✅ <strong>Easy to Use:</strong> Single line of code
                        </li>
                    </ul>
                </div>

                {/* Alert vs Toast Karşılaştırması */}
                <div className="comparison-table">
                    <h2>📊 Alert vs Toast Comparison</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Alert (Eski)</th>
                                <th>Toast (Yeni)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Appearance</td>
                                <td>❌ Ugly popup</td>
                                <td>✅ Modern notification</td>
                            </tr>
                            <tr>
                                <td>Animasyon</td>
                                <td>❌ Yok</td>
                                <td>✅ Smooth slide-in/out</td>
                            </tr>
                            <tr>
                                <td>Renk</td>
                                <td>❌ Gri/Beyaz (sistem)</td>
                                <td>✅ 4 different color types</td>
                            </tr>
                            <tr>
                                <td>Sayfa Engeli</td>
                                <td>❌ Blocks the page</td>
                                <td>✅ Continue working in background</td>
                            </tr>
                            <tr>
                                <td>Multiple Messages</td>
                                <td>❌ Tek seferde 1 tane</td>
                                <td>✅ Multiple at the same time</td>
                            </tr>
                            <tr>
                                <td>Otomatik Kapanma</td>
                                <td>❌ Manuel closema gerekli</td>
                                <td>✅ Otomatik kaybolur</td>
                            </tr>
                            <tr>
                                <td>Mobil Uyum</td>
                                <td>❌ Poor</td>
                                <td>✅ Perfect responsive</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Live Test Area */}
                <div className="live-test-area">
                    <h2>🧪 Live Test Area</h2>
                    <p>Write your own message and test it!</p>
                    <div className="test-form">
                        <input
                            type="text"
                            id="customMessage"
                            placeholder={t('toastDemo.messagePlaceholder', 'Type your message here...')}
                            defaultValue="Merhaba Pawscord! 🐾"
                            aria-label={t('toastDemo.customMessage', 'Custom message input')}
                        />
                        <select id="customType" aria-label={t('toastDemo.toastType', 'Toast type')}>
                            <option value="success">{t('common.success')}</option>
                            <option value="error">{t('common.error')}</option>
                            <option value="warning">{t('common.warning')}</option>
                            <option value="info">Info</option>
                        </select>
                        <button
                            aria-label={t('toastDemo.showToast', 'Show toast')}
                            className="demo-btn-test"
                            onClick={() => {
                                const msg = document.getElementById('customMessage').value;
                                const type = document.getElementById('customType').value;
                                toast[type](msg);
                            }}
                        >
                            Show Toast 🚀
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
