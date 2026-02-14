import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

export const accentColors = [
  { name: 'Discord Blue', color: '#5865f2' },
  { name: 'Blurple', color: '#7289da' },
  { name: 'Green', color: '#43b581' },
  { name: 'Yellow', color: '#faa61a' },
  { name: 'Red', color: '#f04747' },
  { name: 'Pink', color: '#ff73fa' },
  { name: 'Purple', color: '#9b59b6' },
  { name: 'Orange', color: '#e67e22' }
];

const DEFAULT_SETTINGS = {
  // Theme
  theme: 'dark',
  accent_color: '#5865f2',
  // Message Display
  message_display_mode: 'cozy',
  font_size: 16,
  message_group_spacing: 'default',
  // Chat Features
  show_emoji_picker: true,
  show_gif_picker: true,
  animate_emoji: true,
  animate_stickers: true,
  show_embeds: true,
  render_embeds: true,
  inline_embed_media: true,
  inline_attachment_media: true,
  // Accessibility
  use_reduced_motion: false,
  high_contrast_mode: false,
  saturate_colors: 100,
  // Language
  language: 'tr',
  timezone: 'Europe/Istanbul'
};

const applyTheme = (themeSettings) => {
  document.documentElement.setAttribute('data-theme', themeSettings.theme);
  document.documentElement.style.setProperty('--accent-color', themeSettings.accent_color);
  document.documentElement.style.setProperty('--font-size', `${themeSettings.font_size}px`);
  document.documentElement.style.setProperty('--saturation', `${themeSettings.saturate_colors}%`);

  if (themeSettings.use_reduced_motion) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }

  if (themeSettings.high_contrast_mode) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
};

const useAppearanceSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    fetchAppearanceSettings();
  }, []);

  const fetchAppearanceSettings = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/appearance/settings/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        applyTheme(data);
      }
    } catch (error) {
      console.error('Error fetching appearance settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/appearance/settings/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        setSettings(newSettings);
        applyTheme(newSettings);
        toast.success('✅ Görünüm ayarları kaydedildi');
      } else {
        toast.error('❌ Ayarlar kaydedilemedi');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
  };

  const toggleSetting = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    updateSettings(newSettings);
  };

  const resetToDefaults = async () => {
    if (!await confirmDialog('Tüm görünüm ayarlarını varsıyılana döndürmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/appearance/settings/reset/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        applyTheme(data);
        toast.success('✅ Ayarlar varsıyılana döndürüldü');
      }
    } catch (error) {
      console.error('Error resetting settings:', error);
      toast.error('❌ Ayarlar sıfırlanamadı');
    }
  };

  return { settings, loading, updateSetting, toggleSetting, resetToDefaults };
};

export default useAppearanceSettings;
