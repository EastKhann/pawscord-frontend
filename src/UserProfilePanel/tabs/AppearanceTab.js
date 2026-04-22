import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';
const _s = (o) => o;

// -- extracted inline style constants --
const _st1 = { color: '#b5bac1', marginBottom: '16px' };
const _st2 = { fontSize: '32px', marginBottom: '8px' };
const _st3 = { color: '#fff', margin: 0, fontWeight: '600' };
const _st4 = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' };
const _st5 = { color: '#fff', margin: 0, fontWeight: '600', fontSize: '14px' };
const _st6 = { color: '#b5bac1' };

const AppearanceTab = ({
    applyTheme,
    availableLanguages,
    currentTheme,
    language,
    themes,
    updateLanguage,
}) => {
    const styles = profileStyles;
    const { t } = useTranslation();
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <>
            <div aria-label={t('aria.appearanceTab', 'Appearance')} style={styles.card}>
                <h3 style={styles.sectionTitle}>🎨 Temalar</h3>

                <p style={_st1}>Choose your profile theme and personalize your appearance.</p>

                <div style={styles.themeGrid}>
                    <div
                        role="radio"
                        aria-checked={currentTheme === 'dark'}
                        tabIndex={0}
                        style={styles.themeCard(currentTheme === 'dark')}
                        onClick={() => applyTheme('dark')}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && applyTheme('dark')
                        }
                    >
                        <div style={_st2}>🌙</div>
                        <p style={_st3}>Dark</p>
                    </div>

                    <div
                        role="radio"
                        aria-checked={currentTheme === 'light'}
                        tabIndex={0}
                        style={styles.themeCard(currentTheme === 'light')}
                        onClick={() => applyTheme('light')}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && applyTheme('light')
                        }
                    >
                        <div style={_st2}>☀️</div>
                        <p style={_st3}>Light</p>
                    </div>

                    <div
                        role="radio"
                        aria-checked={currentTheme === 'custom'}
                        tabIndex={0}
                        style={styles.themeCard(currentTheme === 'custom')}
                        onClick={() => applyTheme('custom')}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && applyTheme('custom')
                        }
                    >
                        <div style={_st2}>🎨</div>
                        <p style={_st3}>Custom</p>
                    </div>

                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            role="radio"
                            aria-checked={currentTheme === theme.name}
                            tabIndex={0}
                            style={styles.themeCard(currentTheme === theme.name)}
                            onClick={() => applyTheme(theme.name)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && applyTheme(theme.name)
                            }
                        >
                            <div style={_st2}>{theme.icon || '🎭'}</div>
                            <p style={_st3}>{theme.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.card}>
                <h3 style={styles.sectionTitle}>🌍 Dil Tercihi</h3>

                <p style={_st1}>
                    Choose the application language. Messages will be auto-translated.
                </p>

                <div style={_st4}>
                    {availableLanguages.map((lang) => (
                        <div
                            key={lang.code}
                            role="radio"
                            aria-checked={language === lang.code}
                            tabIndex={0}
                            style={_s({
                                padding: '16px',
                                background:
                                    language === lang.code
                                        ? 'linear-gradient(135deg, #5865f2 0%, #5865f2 100%)'
                                        : 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s',
                                border:
                                    language === lang.code
                                        ? '2px solid #fff'
                                        : '2px solid transparent',
                            })}
                            onClick={() => updateLanguage(lang.code)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && updateLanguage(lang.code)
                            }
                        >
                            <div style={_st2}>{lang.flag || '🌐'}</div>
                            <p style={_st5}>{lang.name}</p>
                        </div>
                    ))}
                </div>

                {availableLanguages.length === 0 && <p style={_st6}>{t('common.loading')}</p>}
            </div>
        </>
    );
};

AppearanceTab.propTypes = {
    applyTheme: PropTypes.object,
    availableLanguages: PropTypes.array,
    currentTheme: PropTypes.object,
    language: PropTypes.string,
    themes: PropTypes.array,
    updateLanguage: PropTypes.func,
};
export default AppearanceTab;
