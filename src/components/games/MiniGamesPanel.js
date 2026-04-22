import { useState, useEffect, useCallback, memo } from 'react';

import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
    FaTimes,
    FaGamepad,
    FaPlay,
    FaTrophy,
    FaUsers,
    FaCoins,
    FaDice,
    FaBrain,
} from 'react-icons/fa';

import { toast } from '../../utils/toast';

import logger from '../../utils/logger';

const S = {
    txt: { textAlign: 'center', padding: '20px', color: '#b5bac1' },
};

const MiniGamesPanel = memo(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();

    const [games, setGames] = useState([]);

    const [activeGame, setActiveGame] = useState(null);

    const [leaderboard, setLeaderboard] = useState([]);

    const [loading, setLoading] = useState(false);

    const [view, setView] = useState('games'); // games, playing, leaderboard

    useEffect(() => {
        fetchGames();

        fetchLeaderboard();
    }, []);

    const fetchGames = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/games/?server_id=${serverId}`);

            if (!res.ok) return;

            const data = await res.json();

            setGames(data.games || []);
        } catch (error) {
            logger.error('Failed to fetch games:', error);
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const res = await fetchWithAuth(
                `${apiBaseUrl}/games/leaderboard/?server_id=${serverId}`
            );

            if (!res.ok) return;

            const data = await res.json();

            setLeaderboard(data.leaderboard || []);
        } catch (error) {
            logger.error('Failed to fetch leaderboard:', error);
        }
    };

    const createGame = useCallback(
        async (gameType) => {
            setLoading(true);

            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/games/create/`, {
                    method: 'POST',

                    headers: { 'Content-Type': 'application/json' },

                    body: JSON.stringify({ game_type: gameType, server_id: serverId }),
                });

                const data = await res.json();

                if (data.game) {
                    setActiveGame(data.game);

                    setView('playing');

                    toast.success(t('miniGames.started'));
                }
            } catch (error) {
                toast.error(t('miniGames.createFailed'));
            } finally {
                setLoading(false);
            }
        },
        [fetchWithAuth, apiBaseUrl, serverId]
    );

    const performAction = async (action, actionData = {}) => {
        if (!activeGame) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/games/${activeGame.id}/action/`, {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ action, data: actionData }),
            });

            const data = await res.json();

            if (data.game) {
                setActiveGame(data.game);
            }

            if (data.status === 'finished') {
                toast.success(
                    t('miniGames.gameOver', {
                        winners: data.winners?.join(', '),
                        reward: data.reward,
                    })
                );

                setTimeout(() => {
                    setActiveGame(null);

                    setView('games');

                    fetchLeaderboard();
                }, 3000);
            }

            return data;
        } catch (error) {
            toast.error(t('miniGames.actionFailed'));
        }
    };

    const gameIcons = {
        trivia: '🧠',
        word_chain: '',
        tic_tac_toe: '⭕',

        rock_paper_scissors: '✊',
        number_guess: '🔢',

        emoji_quiz: '😀',
        hangman: '🎯',
        memory_match: '',
    };

    const handleViewGames = useCallback(() => setView('games'), []);

    const handleViewLeaderboard = useCallback(() => setView('leaderboard'), []);

    const handleCreateGame = useCallback((gameId) => createGame(gameId), [createGame]);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaGamepad className="icon-primary-mr10" />

                        <h2 style={styles.title}>{t('games.miniGames')}</h2>
                    </div>

                    <button
                        onClick={onClose}
                        style={styles.closeButton}
                        aria-label={t('common.close')}
                    >
                        <FaTimes />
                    </button>
                </div>

                {loading && <div style={S.txt}>{t('common.loading')}</div>}

                <div style={styles.tabs}>
                    <button
                        onClick={handleViewGames}
                        style={view === 'games' ? styles.activeTab : styles.tab}
                        aria-label={t('games.startGame')}
                    >
                        <FaDice /> {t('games.startGame')}
                    </button>

                    <button
                        onClick={handleViewLeaderboard}
                        style={view === 'leaderboard' ? styles.activeTab : styles.tab}
                        aria-label={t('games.leaderboard')}
                    >
                        <FaTrophy /> {t('games.leaderboard')}
                    </button>
                </div>

                <div style={styles.content}>
                    {view === 'games' && (
                        <div style={styles.gamesGrid}>
                            {games.map((game) => (
                                <div key={game.id} style={styles.gameCard}>
                                    <span style={styles.gameIcon}>
                                        {gameIcons[game.id] || '🎮'}
                                    </span>

                                    <h3 style={styles.gameName}>{game.name}</h3>

                                    <p style={styles.gameDesc}>{game.description}</p>

                                    <div style={styles.gameInfo}>
                                        <span>
                                            <FaUsers /> {game.min_players}-{game.max_players}
                                        </span>

                                        <span>
                                            <FaCoins /> {game.reward_coins}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleCreateGame(game.id)}
                                        style={styles.playButton}
                                        disabled={loading}
                                        aria-label={`${t('games.startGame')} ${game.name}`}
                                    >
                                        <FaPlay /> {t('games.startGame')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {view === 'playing' && activeGame && (
                        <GameRenderer game={activeGame} onAction={performAction} />
                    )}

                    {view === 'leaderboard' && (
                        <div style={styles.leaderboard}>
                            {leaderboard.map((player, idx) => (
                                <div key={player.username} style={styles.leaderboardRow}>
                                    <span style={styles.rank}>{idx + 1}</span>

                                    <span style={styles.playerName}>{player.username}</span>

                                    <span style={styles.wins}>{player.wins} wins</span>

                                    <span style={styles.totalScore}>{player.total_score} pts</span>
                                </div>
                            ))}

                            {leaderboard.length === 0 && (
                                <p style={styles.emptyText}>{t('games.noGamesYet')}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

MiniGamesPanel.displayName = 'MiniGamesPanel';

// Extracted sub-components with their own hooks (Rules of Hooks fix)

const NumberGuessGame = memo(({ state, onAction }) => {
    const [guess, setGuess] = useState('');

    return (
        <div style={styles.gameArea}>
            <h3>{t('miniGamesPanel.guessNumber', 'Guess the Number (1-100)')}</h3>

            <p>Kalan tahmin: {state.max_guesses - (state.guesses?.length || 0)}</p>

            {state.hints?.length > 0 && <p>Son ipucu: {state.hints[state.hints.length - 1]}</p>}

            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                style={styles.guessInput}
                min="1"
                max="100"
            />

            <button
                aria-label={t('miniGamesPanel.guess', 'Make a guess')}
                onClick={() => {
                    setGuess('');
                }}
                style={styles.guessButton}
            >
                Tahmin Et!
            </button>
        </div>
    );
});

NumberGuessGame.displayName = 'NumberGuessGame';

const HangmanGame = memo(({ state, onAction }) => {
    const [letter, setLetter] = useState('');

    return (
        <div style={styles.gameArea}>
            <h3>Adam Asmaca</h3>

            <p style={styles.hangmanWord}>{state.display?.join(' ')}</p>

            <p>
                {t('miniGamesPanel.wrongGuesses', 'Wrong guesses: {{wrong}}/{{max}}', { wrong: state.wrong_guesses, max: state.max_wrong })}
            </p>

            <p>{t('miniGamesPanel.used', 'Used:')} {state.guessed_letters?.join(', ')}</p>

            <input
                type="text"
                value={letter}
                onChange={(e) => setLetter(e.target.value.slice(-1).toUpperCase())}
                style={styles.letterInput}
                maxLength={1}
                aria-label={t('miniGamesPanel.letterInput', 'Enter a letter')}
            />

            <button
                aria-label={t('miniGamesPanel.guessLetter', 'Guess letter')}
                onClick={() => {
                    setLetter('');
                }}
                style={styles.guessButton}
            >
                Harf Tahmin Et
            </button>
        </div>
    );
});

HangmanGame.displayName = 'HangmanGame';

// Game Renderer Component

const GameRenderer = memo(({ game, onAction }) => {
    const { game_type, state } = game;

    if (game_type === 'trivia') {
        const question = state.questions?.[state.current_question];

        return (
            <div style={styles.gameArea}>
                <h3>
                    Soru {state.current_question + 1}/{state.questions?.length}
                </h3>

                <p style={styles.question}>{question?.question}</p>

                <div style={styles.options}>
                    {question?.options.map((opt, idx) => (
                        <button
                            aria-label={opt}
                            key={`item-${idx}`}
                            style={styles.optionButton}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (game_type === 'tic_tac_toe') {
        return (
            <div style={styles.gameArea}>
                <h3>XOX</h3>

                <div style={styles.ticTacToeBoard}>
                    {state.board?.map((cell, idx) => (
                        <button
                            aria-label={t('miniGamesPanel.cellPosition', 'Cell {{idx}}', { idx: idx + 1 })}
                            key={`item-${idx}`}
                            onClick={() => onAction('move', { position: idx })}
                            style={styles.ticTacToeCell}
                            disabled={cell !== null}
                        >
                            {cell === 0 ? '' : cell === 1 ? '⭕' : ''}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (game_type === 'number_guess') {
        return <NumberGuessGame state={state} onAction={onAction} />;
    }

    if (game_type === 'rock_paper_scissors') {
        return (
            <div style={styles.gameArea}>
                <h3>
                    {t('miniGamesPanel.rpsTitle', 'Rock Paper Scissors - Round {{round}}/{{max}}', { round: state.current_round, max: state.max_rounds })}
                </h3>

                <div style={styles.rpsButtons}>
                    {['rock', 'paper', 'scissors'].map((choice) => (
                        <button
                            aria-label={choice}
                            key={choice}
                            onClick={() => onAction('choose', { choice })}
                            style={styles.rpsButton}
                        >
                            {choice === 'rock' ? '🪨' : choice === 'paper' ? '📄' : '✂'}

                            <span>
                                {choice === 'rock' ? t('miniGamesPanel.rock', 'rock') : choice === 'paper' ? t('miniGamesPanel.paper', 'paper') : t('miniGamesPanel.scissors', 'scissors')}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (game_type === 'hangman') {
        return <HangmanGame state={state} onAction={onAction} />;
    }

    return (
        <div style={styles.gameArea}>
            <h3>Oyun: {game_type}</h3>

            <p>Oyun devam ediyor...</p>
        </div>
    );
});

GameRenderer.displayName = 'GameRenderer';

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
    },

    modal: {
        backgroundColor: '#111214',
        borderRadius: '12px',
        width: '700px',

        maxHeight: '85vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: '20px',
        borderBottom: '1px solid #182135',
    },

    headerLeft: { display: 'flex', alignItems: 'center' },

    title: { margin: 0, color: '#fff', fontSize: '20px' },

    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',

        cursor: 'pointer',
        fontSize: '20px',
    },

    tabs: { display: 'flex', padding: '10px 20px', gap: '10px' },

    tab: {
        background: '#1e2024',
        border: 'none',
        color: '#b5bac1',

        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',

        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },

    activeTab: {
        background: '#5865f2',
        border: 'none',
        color: '#fff',

        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',

        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },

    content: { padding: '20px', overflowY: 'auto', flex: 1 },

    gamesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' },

    gameCard: {
        background: '#1e2024',
        borderRadius: '10px',
        padding: '15px',

        textAlign: 'center',
    },

    gameIcon: { fontSize: '40px' },

    gameName: { color: '#fff', margin: '10px 0 5px' },

    gameDesc: { color: '#b5bac1', fontSize: '12px', marginBottom: '10px' },

    gameInfo: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',

        color: '#b5bac1',
        fontSize: '12px',
        marginBottom: '10px',
    },

    playButton: {
        background: '#5865f2',
        border: 'none',
        color: '#fff',

        padding: '8px 20px',
        borderRadius: '6px',
        cursor: 'pointer',

        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        margin: '0 auto',
    },

    gameArea: { textAlign: 'center', color: '#fff' },

    question: { fontSize: '18px', marginBottom: '20px' },

    options: { display: 'flex', flexDirection: 'column', gap: '10px' },

    optionButton: {
        background: '#1e2024',
        border: 'none',
        color: '#fff',

        padding: '12px',
        borderRadius: '8px',
        cursor: 'pointer',

        fontSize: '14px',
        transition: 'background 0.2s',
    },

    ticTacToeBoard: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '5px',

        width: '200px',
        margin: '20px auto',
    },

    ticTacToeCell: {
        width: '60px',
        height: '60px',
        background: '#1e2024',

        border: 'none',
        borderRadius: '8px',
        fontSize: '30px',
        cursor: 'pointer',
    },

    guessInput: {
        background: '#1e2024',
        border: 'none',
        color: '#fff',

        padding: '10px',
        borderRadius: '6px',
        width: '100px',

        textAlign: 'center',
        fontSize: '18px',
    },

    guessButton: {
        background: '#5865f2',
        border: 'none',
        color: '#fff',

        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',

        marginLeft: '10px',
    },

    letterInput: {
        background: '#1e2024',
        border: 'none',
        color: '#fff',

        padding: '10px',
        borderRadius: '6px',
        width: '50px',

        textAlign: 'center',
        fontSize: '24px',
        textTransform: 'uppercase',
    },

    rpsButtons: { display: 'flex', justifyContent: 'center', gap: '20px' },

    rpsButton: {
        background: '#1e2024',
        border: 'none',
        color: '#fff',

        padding: '20px',
        borderRadius: '12px',
        cursor: 'pointer',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        gap: '5px',
        fontSize: '40px',
    },

    hangmanWord: { fontSize: '32px', letterSpacing: '8px', marginBottom: '20px' },

    leaderboard: { display: 'flex', flexDirection: 'column', gap: '10px' },

    leaderboardRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',

        background: '#1e2024',
        padding: '12px 15px',
        borderRadius: '8px',
    },

    rank: { color: '#f0b232', fontWeight: 'bold', width: '40px' },

    playerName: { color: '#fff', flex: 1 },

    wins: { color: '#23a559' },

    totalScore: { color: '#b5bac1' },

    emptyText: { color: '#949ba4', textAlign: 'center', padding: '40px' },
};

MiniGamesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    onClose: PropTypes.func,

    serverId: PropTypes.string,
};

export default MiniGamesPanel;
