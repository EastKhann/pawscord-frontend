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
            <SettingSection title="Geli\u015Ftirici Modu">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 8 }}>
                    ID'leri kopyalama ve hata ay\u0131klama ara\u00E7lar\u0131na eri\u015Fim sa\u011Flar.
                </p>
                <ToggleSwitch label="Geli\u015Ftirici modunu etkinle\u015Ftir" value={devMode} onChange={createToggle('pawscord_dev_mode', setDevMode)} />
            </SettingSection>
            <SettingSection title="Performans">
                <ToggleSwitch label="Donan\u0131m h\u0131zland\u0131rma" value={hwAccel} onChange={createToggle('pawscord_hw_accel', setHwAccel)} />
                <ToggleSwitch label="Azalt\u0131lm\u0131\u015F hareket (animasyonlar\u0131 kapat)" value={reducedMotion} onChange={createToggle('pawscord_reduced_motion', setReducedMotion)} />
            </SettingSection>
            <SettingSection title="\u00D6nbellek">
                <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => {
                        if (window.caches) {
                            window.caches.keys().then(names => names.forEach(n => window.caches.delete(n)));
                        }
                        localStorage.removeItem('pawscord_msg_cache');
                        toast.info('\u00D6nbellek temizlendi!');
                    }} style={S.actionBtn}>
                        <FaTrash style={{ fontSize: 12 }} /> \u00D6nbelle\u011Fi Temizle
                    </button>
                </div>
            </SettingSection>
            <SettingSection title="Hata Ay\u0131klama">
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
