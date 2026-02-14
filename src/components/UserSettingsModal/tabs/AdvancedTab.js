import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import toast from '../../../utils/toast';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import S from '../styles';
import { createToggle } from '../helpers';

const AdvancedTab = () => {
    const [devMode, setDevMode] = useState(() => localStorage.getItem('pawscord_dev_mode') === 'true');
    const [hwAccel, setHwAccel] = useState(() => localStorage.getItem('pawscord_hw_accel') !== 'false');
    const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('pawscord_reduced_motion') === 'true');

    return (
        <div>
            <SettingSection title="Geliştirici Modu">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 8 }}>
                    ID'leri kopyalama ve hata ayıklama araçlarına erişim sağlar.
                </p>
                <ToggleSwitch label="Geliştirici modunu etkinleştir" value={devMode} onChange={createToggle('pawscord_dev_mode', setDevMode)} />
            </SettingSection>
            <SettingSection title="Performans">
                <ToggleSwitch label="Donanım hızlandırma" value={hwAccel} onChange={createToggle('pawscord_hw_accel', setHwAccel)} />
                <ToggleSwitch label="Azaltılmış hareket (animasyonları kapat)" value={reducedMotion} onChange={createToggle('pawscord_reduced_motion', setReducedMotion)} />
            </SettingSection>
            <SettingSection title="Önbellek">
                <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => {
                        if (window.caches) {
                            window.caches.keys().then(names => names.forEach(n => window.caches.delete(n)));
                        }
                        localStorage.removeItem('pawscord_msg_cache');
                        toast.info('Önbellek temizlendi!');
                    }} style={S.actionBtn}>
                        <FaTrash style={{ fontSize: 12 }} /> Önbelleği Temizle
                    </button>
                </div>
            </SettingSection>
            <SettingSection title="Hata Ayıklama">
                <div style={{ padding: 12, backgroundColor: '#1e1f22', borderRadius: 8, fontFamily: 'monospace', fontSize: 12, color: '#949ba4' }}>
                    <div>App Version: {window.__PAWSCORD_VERSION__ || '2.0.0'}</div>
                    <div>Build: {document.querySelector('script[src*="index-"]')?.src?.match(/index-(\w+)/)?.[1] || 'dev'}</div>
                    <div>Platform: {navigator.userAgent.includes('Electron') ? 'Desktop' : navigator.userAgent.includes('Android') ? 'Android' : 'Web'}</div>
                    <div>Service Worker: {navigator.serviceWorker?.controller ? 'Active' : 'Inactive'}</div>
                    <div>Memory: {navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'N/A'}</div>
                </div>
            </SettingSection>
        </div>
    );
};

export default AdvancedTab;
