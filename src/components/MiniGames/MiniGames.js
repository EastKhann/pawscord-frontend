import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './MiniGames.css';

import { useTranslation } from 'react-i18next';
// ==================== TIC TAC TOE ====================
export const TicTacToe = ({ opponent, onGameEnd, isMyTurn, mySymbol = 'X' }) => {
    const { t } = useTranslation();
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState(null);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const checkWinner = useCallback((squares) => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: combo };
            }
        }
        return null;
    }, []);

    const handleClick = (index) => {
        if (board[index] || winner) return;
        if (opponent && currentPlayer !== mySymbol) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
            onGameEnd?.(result.winner === mySymbol ? 'win' : 'lose');
        } else if (newBoard.every(cell => cell !== null)) {
            setWinner('draw');
            onGameEnd?.('draw');
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setWinner(null);
        setWinningLine(null);
    };

    return (
        <div aria-label={t('miniGames.ticTacToe', 'Tic-tac-toe game')} className="tictactoe-game">
            <div className="game-header">
                <h3>🎮 XOX Oyunu</h3>
                {opponent && <span className="opponent">vs {opponent}</span>}
            </div>

            <div className="game-status">
                {winner === 'draw' ? (
                    <span>🤝 Berabere!</span>
                ) : winner ? (
                    <span>🎉 {winner} {t('miniGames.won', 'Won!')}</span>
                ) : (
                    <span>Rank: {currentPlayer} {currentPlayer === mySymbol ? '(Sen)' : `(${opponent || 'Rakip'})`}</span>
                )}
            </div>

            <div className="tictactoe-board">
                {board.map((cell, index) => (
                    <button
                        key={`item-${index}`}
                        className={`tictactoe-cell ${cell} ${winningLine?.includes(index) ? 'winning' : ''}`}
                        onClick={() => handleClick(index)}
                        disabled={!!winner || !!cell}>
                        {cell}
                    </button>
                ))}
            </div>

            <button className="game-reset-btn" onClick={resetGame}>
                {t('miniGames.restart', '🔄 Restart')}
            </button>
        </div>
    );
};

// ==================== HANGMAN ====================
const HANGMAN_WORDS = [
    'javascript', 'python', 'discord', 'react', 'gaming',
    'computer', 'keyboard', 'monitor', 'server', 'database',
    'algorithm', 'function', 'variable', 'programming', 'developer'
];

export const Hangman = ({ onGameEnd, customWord }) => {
    const { t } = useTranslation();
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const maxWrong = 6;

    useEffect(() => {
        const newWord = customWord || HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)];
        setWord(newWord.toLowerCase());
        setGuessedLetters(new Set());
        setWrongGuesses(0);
    }, [customWord]);

    const displayWord = word.split('').map(letter =>
        guessedLetters.has(letter) ? letter : '_'
    ).join(' ');

    const isWon = word && word.split('').every(letter => guessedLetters.has(letter));
    const isLost = wrongGuesses >= maxWrong;

    const handleGuess = (letter) => {
        if (guessedLetters.has(letter) || isWon || isLost) return;

        const newGuessed = new Set(guessedLetters);
        newGuessed.add(letter);
        setGuessedLetters(newGuessed);

        if (!word.includes(letter)) {
            const newWrong = wrongGuesses + 1;
            setWrongGuesses(newWrong);
            if (newWrong >= maxWrong) {
                onGameEnd?.('lose');
            }
        } else if (word.split('').every(l => newGuessed.has(l))) {
            onGameEnd?.('win');
        }
    };

    const resetGame = () => {
        const newWord = HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)];
        setWord(newWord.toLowerCase());
        setGuessedLetters(new Set());
        setWrongGuesses(0);
    };

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const hangmanParts = [
        '  ____\n |    |\n |\n |\n |\n_|_',
        '  ____\n |    |\n |    O\n |\n |\n_|_',
        '  ____\n |    |\n |    O\n |    |\n |\n_|_',
        '  ____\n |    |\n |    O\n |   /|\n |\n_|_',
        '  ____\n |    |\n |    O\n |   /|\\\n |\n_|_',
        '  ____\n |    |\n |    O\n |   /|\\\n |   /\n_|_',
        '  ____\n |    |\n |    O\n |   /|\\\n |   / \\\n_|_'
    ];

    return (
        <div className="hangman-game">
            <div className="game-header">
                <h3>🪢 Adam Asmaca</h3>
                <span className="lives">❤️ {maxWrong - wrongGuesses} can</span>
            </div>

            <pre className="hangman-drawing">
                {hangmanParts[wrongGuesses]}
            </pre>

            <div className="word-display">
                {isLost ? (
                    <span className="revealed-word">❌ {word}</span>
                ) : (
                    <span className={isWon ? 'won' : ''}>{displayWord}</span>
                )}
            </div>

            {(isWon || isLost) && (
                <div className="game-result">
                    {isWon ? t('ui.kazandin') : '😢 Kmaybettin!'}
                </div>
            )}

            <div className="keyboard">
                {alphabet.map(letter => (
                    <button
                        key={letter}
                        className={`key ${guessedLetters.has(letter) ? (word.includes(letter) ? 'correct' : 'wrong') : ''}`}
                        onClick={() => handleGuess(letter)}
                        disabled={guessedLetters.has(letter) || isWon || isLost}>
                        {letter.toUpperCase()}
                    </button>
                ))}
            </div>

            <button className="game-reset-btn" onClick={resetGame}>
                🔄 Yeni Kelime
            </button>
        </div>
    );
};

// ==================== TRIVIA ====================
const TRIVIA_QUESTIONS = [
    {
        question: t('miniGames.q1', 'What does "typeof null" return in JavaScript?'),
        options: ["null", "undefined", "object", "string"],
        correct: 2
    },
    {
        question: t('miniGames.q2', 'In which year was the first version of React released?'),
        options: ["2011", "2013", "2015", "2017"],
        correct: 1
    },
    {
        question: t('ui.http_protokolunde_404_kodu_ne_anlama_gel'),
        options: [t('ui.server_errorsi'), "Not found", "Yetki Yok", "Redirect"],
        correct: 1
    },
    {
        question: t('miniGames.q3', 'Who is the creator of Python?'),
        options: ["Guido van Rossum", "James Gosling", "Bjarne Stroustrup", "Dennis Ritchie"],
        correct: 0
    },
    {
        question: "Git'te 'HEAD' ne anlama gelir?",
        options: [t('ui.ilk_commit'), "Son commit", "Current branch reference", "Uzak repo"],
        correct: 2
    },
    {
        question: "CSS'te 'display: flex' ne yapar?",
        options: ["Hides element", "Flexbox layout example", "Fixes element", "Animation examples"],
        correct: 1
    },
    {
        question: "Discord hangi year kuruldu?",
        options: ["2013", "2015", "2017", "2019"],
        correct: 1
    },
    {
        question: "What JavaScript engine is Node.js built on?",
        options: ["SpiderMonkey", "V8", "Chakra", "JavaScriptCore"],
        correct: 1
    }
];

export const Trivia = ({ onGameEnd, questions = TRIVIA_QUESTIONS }) => {
    const { t } = useTranslation();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    useEffect(() => {
        const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
        setShuffledQuestions(shuffled);
    }, [questions]);

    const handleAnswer = (index) => {
        if (showResult) return;

        setSelectedAnswer(index);
        setShowResult(true);

        const isCorrect = index === shuffledQuestions[currentQuestion].correct;
        if (isCorrect) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestion < shuffledQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowResult(false);
            } else {
                setGameOver(true);
                onGameEnd?.(score + (isCorrect ? 1 : 0) >= 3 ? 'win' : 'lose');
            }
        }, 1500);
    };

    const resetGame = () => {
        const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
        setShuffledQuestions(shuffled);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setGameOver(false);
    };

    if (shuffledQuestions.length === 0) return <div>{t("common.loading")}</div>;

    const question = shuffledQuestions[currentQuestion];

    if (gameOver) {
        return (
            <div className="trivia-game">
                <div className="trivia-result">
                    <h3>{score >= 3 ? '🎉 Tebrikler!' : t('ui.olmadi')</h3>
                    <div className="final-score">
                        <span className="score-value">{score}</span>
                        <span className="score-total">/ {shuffledQuestions.length}</span>
                    </div>
                    <p>
                        {score === 5 ? 'Excellent! Hepsini bildin!' :
                            score >= 3 ? t('ui.iyi_is') : 'Bir daha dene!'}
                    </p>
                    <button className="game-reset-btn" onClick={resetGame}>
                        🔄 Play Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="trivia-game">
            <div className="game-header">
                <h3>🧠 Trivia</h3>
                <span className="trivia-progress">
                    {currentQuestion + 1} / {shuffledQuestions.length}
                </span>
            </div>

            <div className="score-display">
                Skor: {score}
            </div>

            <div className="trivia-question">
                {question.question}
            </div>

            <div className="trivia-options">
                {question.options.map((option, index) => (
                    <button
                        key={`item-${index}`}
                        className={`trivia-option ${showResult ? (
                            index === question.correct ? 'correct' :
                                index === selectedAnswer ? 'wrong' : ''
                        ) : ''
                            } ${selectedAnswer === index ? 'selected' : ''}`}
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

// ==================== GAME LAUNCHER ====================
const MiniGames = ({ onClose }) => {
    const [selectedGame, setSelectedGame] = useState(null);

    const games = [
        { id: 'tictactoe', name: 'XOX', icon: '⭕', description: 'Klasik tic-tac-toe oyunu' },
        { id: 'hangman', name: 'Adam Asmaca', icon: '🪢', description: 'Kelimeyi tahmin et' },
        { id: 'trivia', name: t('miniGames.triviaName', 'Trivia'), icon: '🧠', description: t('miniGames.triviaDesc', 'Knowledge quiz') }
    ];

    const handleGameEnd = (result) => {
    };

    if (selectedGame) {
        return (
            <div className="mini-games-container">
                <button className="back-btn" onClick={() => setSelectedGame(null)}>
                    ← Geri
                </button>

                {selectedGame === 'tictactoe' && (
                    <TicTacToe onGameEnd={handleGameEnd} mySymbol="X" />
                )}
                {selectedGame === 'hangman' && (
                    <Hangman onGameEnd={handleGameEnd} />
                )}
                {selectedGame === 'trivia' && (
                    <Trivia onGameEnd={handleGameEnd} />
                )}
            </div>
        );
    }

    return (
        <div className="mini-games-container">
            <div className="games-header">
                <h2>🎮 Mini Oyunlar</h2>
                {onClose && (
                    <button className="close-btn" onClick={onClose}>✕</button>
                )}
            </div>

            <div className="games-grid">
                {games.map(game => (
                    <button
                        key={game.id}
                        className="game-card"
                        onClick={() => setSelectedGame(game.id)}>
                        <span className="game-icon">{game.icon}</span>
                        <span className="game-name">{game.name}</span>
                        <span className="game-desc">{game.description}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

MiniGames.propTypes = {
    opponent: PropTypes.object,
    onGameEnd: PropTypes.func,
    isMyTurn: PropTypes.bool,
    mySymbol: PropTypes.string,
};

TicTacToe.propTypes = {
    opponent: PropTypes.object,
    onGameEnd: PropTypes.func,
    isMyTurn: PropTypes.bool,
    mySymbol: PropTypes.object,
};


Hangman.propTypes = {
    onGameEnd: PropTypes.func,
    customWord: PropTypes.object,
};


Trivia.propTypes = {
    onGameEnd: PropTypes.func,
    questions: PropTypes.array,
};

export default MiniGames;