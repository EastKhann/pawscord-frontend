import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

const DEFAULT_CUSTOMIZATION = {
  banner_url: '', banner_color: '#5865f2', theme_color: '#5865f2',
  accent_color: '#5865f2', bio_text: '', bio_background_color: '#2b2d31',
  show_badges: true, show_activity: true
};

const useProfileCustomization = (userId, fetchWithAuth, apiBaseUrl) => {
  const [customization, setCustomization] = useState(DEFAULT_CUSTOMIZATION);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadCustomization(); }, [userId]);

  const loadCustomization = async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/customization/`);
      const d = await r.json();
      if (d.customization) setCustomization(d.customization);
    } catch (e) { console.error('Failed to load customization:', e); }
    finally { setLoading(false); }
  };

  const saveCustomization = async () => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/customization/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customization)
      });
      if (r.ok) toast.success('✅ Profil özelleştirmeleri kaydedildi!');
    } catch (e) { console.error('Failed to save customization:', e); }
  };

  const applyPreset = (preset) => {
    setCustomization(prev => ({
      ...prev, theme_color: preset.primary, accent_color: preset.accent,
      bio_background_color: preset.bg, banner_color: preset.primary
    }));
  };

  const uploadBanner = async (file) => {
    const formData = new FormData();
    formData.append('banner', file);
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/users/${userId}/upload-banner/`, { method: 'POST', body: formData });
      const d = await r.json();
      if (d.banner_url) setCustomization(prev => ({ ...prev, banner_url: d.banner_url }));
    } catch (e) { console.error('Failed to upload banner:', e); }
  };

  const updateField = (field, value) => setCustomization(prev => ({ ...prev, [field]: value }));

  return { customization, previewMode, setPreviewMode, loading, saveCustomization, applyPreset, uploadBanner, updateField };
};

export default useProfileCustomization;
