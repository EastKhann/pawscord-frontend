import { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaGamepad, FaPlay, FaTrophy, FaUsers, FaCoins, FaDice, FaBrain } from 'react-icons/fa';
import { toast } from '../utils/toast';

const MiniGamesPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
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
            const data = await res.json();
            setGames(data.games || []);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/games/leaderboard/?server_id=${serverId}`);
            const data = await res.json();
            setLeaderboard(data.leaderboard || []);
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
        }
    };

    const createGame = async (gameType) => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/games/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ game_type: gameType, server_id: serverId })
            });
            const data = await res.json();
            if (data.game) {
                setActiveGame(data.game);
                setView('playing');
                toast.success(`${data.game.game_type} started!`);
            }
        } catch (error) {
            toast.error('Failed to create game');
        } finally {
            setLoading(false);
        }
    };

    const performAction = async (action, actionData = {}) => {
        if (!activeGame) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/games/${activeGame.id}/action/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, data: actionData })
            });
            const data = await res.json();
            if (data.game) {
                setActiveGame(data.game);
            }
            if (data.status === 'finished') {
                toast.success(`Game over! ${data.winners?.join(', ')} won ${data.reward} coins!`);
                setTimeout(() => {
                    setActiveGame(null);
                    setView('games');
                    fetchLeaderboard();
                }, 3000);
            }
            return data;
        } catch (error) {
            toast.error('Action failed');
        }
    };

    const gameIcons = {
        trivia: '🧠', word_chain: '📝', tic_tac_toe: '⭕',
        rock_paper_scissors: '✊', number_guess: '🔢',
        emoji_quiz: '😀', hangman: '🎯', memory_match: '🃏'
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaGamepad style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Mini Games</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
                </div>

                <div style={styles.tabs}>
                    <button onClick={() => setView('games')} style={view === 'games' ? styles.activeTab : styles.tab}>
                        <FaDice /> Games
                    </button>
                    <button onClick={() => setView('leaderboard')} style={view === 'leaderboard' ? styles.activeTab : styles.tab}>
                        <FaTrophy /> Leaderboard
                    </button>
                </div>

                <div style={styles.content}>
                    {view === 'games' && (
                        <div style={styles.gamesGrid}>
                            {games.map(game => (
                                <div key={game.id} style={styles.gameCard}>
                                    <span style={styles.gameIcon}>{gameIcons[game.id] || '🎮'}</span>
                                    <h3 style={styles.gameName}>{game.name}</h3>
                                    <p style={styles.gameDesc}>{game.description}</p>
                                    <div style={styles.gameInfo}>
                                        <span><FaUsers /> {game.min_players}-{game.max_players}</span>
                                        <span><FaCoins /> {game.reward_coins}</span>
                                    </div>
                                    <button
                                        onClick={() => createGame(game.id)}
                                        style={styles.playButton}
                                        disabled={loading}
                                    >
                                        <FaPlay /> Play
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {view === 'playing' && activeGame && (
                        <GameRenderer
                            game={activeGame}
                            onAction={performAction}
                        />
                    )}

                    {view === 'leaderboard' && (
                        <div style={styles.leaderboard}>
                            {leaderboard.map((player, idx) => (
                                <div key={player.username} style={styles.leaderboardRow}>
                                    <span style={styles.rank}>#{idx + 1}</span>
                                    <span style={styles.playerName}>{player.username}</span>
                                    <span style={styles.wins}>{player.wins} wins</span>
                                    <span style={styles.totalScore}>{player.total_score} pts</span>
                                </div>
                            ))}
                            {leaderboard.length === 0 && (
                                <p style={styles.emptyText}>No games played yet!</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Game Renderer Component
const GameRenderer = ({ game, onAction }) => {
    const { game_type, state, players } = game;

    if (game_type === 'trivia') {
        const question = state.questions?.[state.current_question];
        return (
            <div style={styles.gameArea}>
                <h3>Question {state.current_question + 1}/{state.questions?.length}</h3>
                <p style={styles.question}>{question?.question}</p>
                <div style={styles.options}>
                    {question?.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => onAction('answer', { answer: idx })}
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
                <h3>Tic Tac Toe</h3>
                <div style={styles.ticTacToeBoard}>
                    {state.board?.map((cell, idx) => (
                        <button
                            key={idx}
                            onClick={() => onAction('move', { position: idx })}
                            style={styles.ticTacToeCell}
                            disabled={cell !== null}
                        >
                            {cell === 0 ? '❌' : cell === 1 ? '⭕' : ''}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (game_type === 'number_guess') {
        const [guess, setGuess] = useState('');
        return (
            <div style={styles.gameArea}>
                <h3>Guess the Number (1-100)</h3>
                <p>Guesses left: {state.max_guesses - (state.guesses?.length || 0)}</p>
                {state.hints?.length > 0 && (
                    <p>Last hint: Go {state.hints[state.hints.length - 1]}</p>
                )}
                <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    style={styles.guessInput}
                    min="1"
                    max="100"
                />
                <button
                    onClick={() => { onAction('guess', { number: parseInt(guess) }); setGuess(''); }}
                    style={styles.guessButton}
                >
                    Guess!
                </button>
            </div>
        );
    }

    if (game_type === 'rock_paper_scissors') {
        return (
            <div style={styles.gameArea}>
                <h3>Rock Paper Scissors - Round {state.current_round}/{state.max_rounds}</h3>
                <div style={styles.rpsButtons}>
                    {['rock', 'paper', 'scissors'].map(choice => (
                        <button
                            key={choice}
                            onClick={() => onAction('choose', { choice })}
                            style={styles.rpsButton}
                        >
                            {choice === 'rock' ? '🪨' : choice === 'paper' ? '📄' : '✂️'}
                            <span>{choice}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (game_type === 'hangman') {
        const [letter, setLetter] = useState('');
        return (
            <div style={styles.gameArea}>
                <h3>Hangman</h3>
                <p style={styles.hangmanWord}>{state.display?.join(' ')}</p>
                <p>Wrong guesses: {state.wrong_guesses}/{state.max_wrong}</p>
                <p>Used: {state.guessed_letters?.join(', ')}</p>
                <input
                    type="text"
                    value={letter}
                    onChange={(e) => setLetter(e.target.value.slice(-1).toUpperCase())}
                    style={styles.letterInput}
                    maxLength={1}
                />
                <button
                    onClick={() => { onAction('guess_letter', { letter }); setLetter(''); }}
                    style={styles.guessButton}
                >
                    Guess Letter
                </button>
            </div>
        );
    }

    return (
        <div style={styles.gameArea}>
            <h3>Game: {game_type}</h3>
            <p>Game is in progress...</p>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 10000
    },
    modal: {
        backgroundColor: '#2f3136', borderRadius: '12px', width: '700px',
        maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px', borderBottom: '1px solid #40444b'
    },
    headerLeft: { display: 'flex', alignItems: 'center' },
    title: { margin: 0, color: '#fff', fontSize: '20px' },
    closeButton: {
        background: 'none', border: 'none', color: '#b9bbbe',
        cursor: 'pointer', fontSize: '20px'
    },
    tabs: { display: 'flex', padding: '10px 20px', gap: '10px' },
    tab: {
        background: '#40444b', border: 'none', color: '#b9bbbe',
        padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '6px'
    },
    activeTab: {
        background: '#5865f2', border: 'none', color: '#fff',
        padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '6px'
    },
    content: { padding: '20px', overflowY: 'auto', flex: 1 },
    gamesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' },
    gameCard: {
        background: '#40444b', borderRadius: '10px', padding: '15px',
        textAlign: 'center'
    },
    gameIcon: { fontSize: '40px' },
    gameName: { color: '#fff', margin: '10px 0 5px' },
    gameDesc: { color: '#b9bbbe', fontSize: '12px', marginBottom: '10px' },
    gameInfo: {
        display: 'flex', justifyContent: 'center', gap: '15px',
        color: '#b9bbbe', fontSize: '12px', marginBottom: '10px'
    },
    playButton: {
        background: '#5865f2', border: 'none', color: '#fff',
        padding: '8px 20px', borderRadius: '6px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '6px', margin: '0 auto'
    },
    gameArea: { textAlign: 'center', color: '#fff' },
    question: { fontSize: '18px', marginBottom: '20px' },
    options: { display: 'flex', flexDirection: 'column', gap: '10px' },
    optionButton: {
        background: '#40444b', border: 'none', color: '#fff',
        padding: '12px', borderRadius: '8px', cursor: 'pointer',
        fontSize: '14px', transition: 'background 0.2s'
    },
    ticTacToeBoard: {
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px',
        width: '200px', margin: '20px auto'
    },
    ticTacToeCell: {
        width: '60px', height: '60px', background: '#40444b',
        border: 'none', borderRadius: '8px', fontSize: '30px', cursor: 'pointer'
    },
    guessInput: {
        background: '#40444b', border: 'none', color: '#fff',
        padding: '10px', borderRadius: '6px', width: '100px',
        textAlign: 'center', fontSize: '18px'
    },
    guessButton: {
        background: '#5865f2', border: 'none', color: '#fff',
        padding: '10px 20px', borderRadius: '6px', cursor: 'pointer',
        marginLeft: '10px'
    },
    letterInput: {
        background: '#40444b', border: 'none', color: '#fff',
        padding: '10px', borderRadius: '6px', width: '50px',
        textAlign: 'center', fontSize: '24px', textTransform: 'uppercase'
    },
    rpsButtons: { display: 'flex', justifyContent: 'center', gap: '20px' },
    rpsButton: {
        background: '#40444b', border: 'none', color: '#fff',
        padding: '20px', borderRadius: '12px', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '5px', fontSize: '40px'
    },
    hangmanWord: { fontSize: '32px', letterSpacing: '8px', marginBottom: '20px' },
    leaderboard: { display: 'flex', flexDirection: 'column', gap: '10px' },
    leaderboardRow: {
        display: 'flex', alignItems: 'center', gap: '15px',
        background: '#40444b', padding: '12px 15px', borderRadius: '8px'
    },
    rank: { color: '#faa61a', fontWeight: 'bold', width: '40px' },
    playerName: { color: '#fff', flex: 1 },
    wins: { color: '#57f287' },
    totalScore: { color: '#b9bbbe' },
    emptyText: { color: '#72767d', textAlign: 'center', padding: '40px' }
};

export default MiniGamesPanel;
