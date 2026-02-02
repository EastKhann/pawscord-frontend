// hooks/useTheme.js
// 🌓 Dark/Light Mode Hook

import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // LocalStorage'dan tema oku
    const savedTheme = localStorage.getItem('pawscord-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Tema değiştiğinde DOM'a uygula
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pawscord-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};

export default useTheme;



