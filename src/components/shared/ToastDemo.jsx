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
                <p>Modern bildirim sistemi - Alert'in yerine kullanılıyor</p>

                <div className="toast-demo-grid">
                    {/* Success Toast */}
                    <div className="toast-demo-section">
                        <h3>✅ Success Toast</h3>
                        <p>Başarılı işlemler için kullanılır</p>
                        <button
                            aria-label="button"
                            className="demo-btn success"
                            onClick={() => toast.success('Operation completed successfully!')}
                        >
                            Success Toast Göster
                        </button>
                        <div className="code-example">
                            <code>toast.success('Mesaj');</code>
                        </div>
                    </div>

                    {/* Error Toast */}
                    <div className="toast-demo-section">
                        <h3>❌ Error Toast</h3>
                        <p>Hata mesajları için kullanılır</p>
                        <button
                            aria-label="button"
                            className="demo-btn error"
                            onClick={() => toast.error('An error occurred! Please tekrar deneyin.')}
                        >
                            Error Toast Göster
                        </button>
                        <div className="code-example">
                            <code>toast.error('Error message');</code>
                        </div>
                    </div>

                    {/* Warning Toast */}
                    <div className="toast-demo-section">
                        <h3>⚠️ Warning Toast</h3>
                        <p>Uyarı mesajları için kullanılır</p>
                        <button
                            aria-label="button"
                            className="demo-btn warning"
                            onClick={() => toast.warning('Warning! This action cannot be undone.')}
                        >
                            Warning Toast Göster
                        </button>
                        <div className="code-example">
                            <code>toast.warning('Warning');</code>
                        </div>
                    </div>

                    {/* Info Toast */}
                    <div className="toast-demo-section">
                        <h3>ℹ️ Info Toast</h3>
                        <p>Bilgi mesajları için kullanılır</p>
                        <button
                            aria-label="button"
                            className="demo-btn info"
                            onClick={() => toast.info('Davet linki panoya copied!')}
                        >
                            Info Toast Göster
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
                            aria-label="button"
                            className="demo-btn-large"
                            onClick={() => {
                                toast.success('1. Toast');
                                setTimeout(() => toast.info('2. Toast'), 500);
                                setTimeout(() => toast.warning('3. Toast'), 1000);
                                setTimeout(() => toast.error('4. Toast'), 1500);
                            }}
                        >
                            Çoklu Toast (4 adet)
                        </button>
                        <code>Birden fazla toast mevcut anda gösterilebilir</code>
                    </div>

                    <div className="advanced-row">
                        <button
                            aria-label="button"
                            className="demo-btn-large"
                            onClick={() => toast.success('Bu toast 10 saniye kalacak!', 10000)}
                        >
                            Uzun Durationli Toast (10 saniye)
                        </button>
                        <code>toast.success('Mesaj', 10000);</code>
                    </div>

                    <div className="advanced-row">
                        <button
                            aria-label="button"
                            className="demo-btn-large"
                            onClick={() =>
                                toast.success(
                                    'Çok uzun bir message buraya yazılabilir. Toast otomatik olarak genişler ve tüm mesajı gösterir. Maksimum genişlik 500px olarak ayarlanmış durumda.',
                                    5000
                                )
                            }
                        >
                            Uzun Mesajlı Toast
                        </button>
                        <code>Uzun messagelar otomatik wrap edilir</code>
                    </div>
                </div>

                {/* Kullanım Kılavuzu */}
                <div className="toast-usage-guide">
                    <h2>📚 Kullanım Kılavuzu</h2>

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
                    <h2>✨ Özellikler</h2>
                    <ul>
                        <li>
                            ✅ <strong>Modern Tasarım:</strong> Smooth animasyonlar ve gradient
                            renkler
                        </li>
                        <li>
                            ✅ <strong>4 Farklı Tip:</strong> Success, Error, Warning, Info
                        </li>
                        <li>
                            ✅ <strong>Emoji İkonlar:</strong> Her tip için özel emoji
                        </li>
                        <li>
                            ✅ <strong>Otomatik Kapanma:</strong> Default 3 saniye
                        </li>
                        <li>
                            ✅ <strong>Manuel Kapatma:</strong> X butonuyla anında kapat
                        </li>
                        <li>
                            ✅ <strong>Stack Yapı:</strong> Birden fazla toast üst üste
                        </li>
                        <li>
                            ✅ <strong>Responsive:</strong> Mobilde de mükemmel görünür
                        </li>
                        <li>
                            ✅ <strong>Kolay Kullanım:</strong> Tek satır kod
                        </li>
                    </ul>
                </div>

                {/* Alert vs Toast Karşılaştırması */}
                <div className="comparison-table">
                    <h2>📊 Alert vs Toast Karşılaştırması</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Özellik</th>
                                <th>Alert (Eski)</th>
                                <th>Toast (Yeni)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Görünüm</td>
                                <td>❌ Çirkin popup</td>
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
                                <td>✅ 4 farklı renk tipi</td>
                            </tr>
                            <tr>
                                <td>Sayfa Engeli</td>
                                <td>❌ Sayfayı bloklar</td>
                                <td>✅ Arka planda çalışmaya devam</td>
                            </tr>
                            <tr>
                                <td>Çoklu Mesaj</td>
                                <td>❌ Tek seferde 1 tane</td>
                                <td>✅ Aynı anda birden fazla</td>
                            </tr>
                            <tr>
                                <td>Otomatik Kapanma</td>
                                <td>❌ Manuel closema gerekli</td>
                                <td>✅ Otomatik kaybolur</td>
                            </tr>
                            <tr>
                                <td>Mobil Uyum</td>
                                <td>❌ Kötü</td>
                                <td>✅ Mükemmel responsive</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Live Test Area */}
                <div className="live-test-area">
                    <h2>🧪 Canlı Test Alanı</h2>
                    <p>Kendi mesajını yaz ve test et!</p>
                    <div className="test-form">
                        <input
                            type="text"
                            id="customMessage"
                            placeholder="Type your message here..."
                            defaultValue="Merhaba Pawscord! 🐾"
                            aria-label="Type your message here..."
                        />
                        <select id="customType" aria-label="customType">
                            <option value="success">{t('common.success')}</option>
                            <option value="error">{t('common.error')}</option>
                            <option value="warning">{t('common.warning')}</option>
                            <option value="info">Info</option>
                        </select>
                        <button
                            aria-label="button"
                            className="demo-btn-test"
                            onClick={() => {
                                const msg = document.getElementById('customMessage').value;
                                const type = document.getElementById('customType').value;
                                toast[type](msg);
                            }}
                        >
                            Toast Göster 🚀
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
