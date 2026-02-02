// frontend/src/utils/ThemeManager.js

export const THEMES = {
    default: {
        name: 'Pawscord Dark',
        colors: {
            '--background-primary': '#313338',
            '--background-secondary': '#2b2d31',
            '--background-tertiary': '#1e1f22',
            '--background-accent': '#404249',
            '--text-primary': '#dbdee1',
            '--text-secondary': '#949ba4',
            '--text-muted': '#787f89',
            '--text-link': '#00a8fc',
            '--button-primary': '#5865f2',
            '--button-secondary': '#4e5058',
            '--border-primary': '#1f2023'
        }
    },
    midnight: {
        name: 'Midnight AMOLED',
        colors: {
            '--background-primary': '#000000',
            '--background-secondary': '#0a0a0a',
            '--background-tertiary': '#111111',
            '--background-accent': '#222222',
            '--text-primary': '#ffffff',
            '--text-secondary': '#b0b0b0',
            '--text-muted': '#666666',
            '--text-link': '#3ea6ff',
            '--button-primary': '#3ea6ff',
            '--button-secondary': '#333333',
            '--border-primary': '#333333'
        }
    },
    dracula: {
        name: 'Dracula',
        colors: {
            '--background-primary': '#282a36',
            '--background-secondary': '#44475a',
            '--background-tertiary': '#6272a4',
            '--background-accent': '#44475a',
            '--text-primary': '#f8f8f2',
            '--text-secondary': '#bfbfbf',
            '--text-muted': '#6272a4',
            '--text-link': '#8be9fd',
            '--button-primary': '#bd93f9',
            '--button-secondary': '#44475a',
            '--border-primary': '#44475a'
        }
    },
    ocean: {
        name: 'Deep Ocean',
        colors: {
            '--background-primary': '#0f172a',
            '--background-secondary': '#1e293b',
            '--background-tertiary': '#334155',
            '--background-accent': '#334155',
            '--text-primary': '#e2e8f0',
            '--text-secondary': '#94a3b8',
            '--text-muted': '#64748b',
            '--text-link': '#38bdf8',
            '--button-primary': '#0ea5e9',
            '--button-secondary': '#334155',
            '--border-primary': '#1e293b'
        }
    },
    forest: {
        name: 'Enchanted Forest',
        colors: {
            '--background-primary': '#1a2f1a',
            '--background-secondary': '#243b24',
            '--background-tertiary': '#2f4b2f',
            '--background-accent': '#3a5a3a',
            '--text-primary': '#e0ffe0',
            '--text-secondary': '#a0cca0',
            '--text-muted': '#608060',
            '--text-link': '#4caf50',
            '--button-primary': '#4caf50',
            '--button-secondary': '#2f4b2f',
            '--border-primary': '#2f4b2f'
        }
    },
    matrix: {
        name: 'The Matrix',
        colors: {
            '--background-primary': '#0d0d0d',
            '--background-secondary': '#121212',
            '--background-tertiary': '#1a1a1a',
            '--background-accent': '#003b00',
            '--text-primary': '#00ff41',
            '--text-secondary': '#008f11',
            '--text-muted': '#003b00',
            '--text-link': '#00ff41',
            '--button-primary': '#008f11',
            '--button-secondary': '#003b00',
            '--border-primary': '#003b00'
        }
    },
    sunset: {
        name: 'Sunset Vibes',
        colors: {
            '--background-primary': '#2d1b2e',
            '--background-secondary': '#442740',
            '--background-tertiary': '#5a3450',
            '--background-accent': '#734361',
            '--text-primary': '#ffccaa',
            '--text-secondary': '#ff9e7d',
            '--text-muted': '#b05963',
            '--text-link': '#ffbd69',
            '--button-primary': '#ff6b6b',
            '--button-secondary': '#5a3450',
            '--border-primary': '#5a3450'
        }
    }
};

export const applyTheme = (themeKey) => {
    const theme = THEMES[themeKey] || THEMES.default;
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    localStorage.setItem('pawscord_theme', themeKey);
};

export const loadSavedTheme = () => {
    const savedTheme = localStorage.getItem('pawscord_theme');
    if (savedTheme && THEMES[savedTheme]) {
        applyTheme(savedTheme);
        return savedTheme;
    }
    return 'default';
};


