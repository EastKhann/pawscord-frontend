import React, { useState, useCallback } from 'react';
import './DiceRoller.css';

// Parse dice notation like "2d6", "1d20+5", "3d8-2"
const parseDiceNotation = (notation) => {
    const match = notation.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
    if (!match) return null;

    return {
        count: parseInt(match[1]) || 1,
        sides: parseInt(match[2]),
        modifier: parseInt(match[3]) || 0
    };
};

// Roll a single die
const rollDie = (sides) => Math.floor(Math.random() * sides) + 1;

// Roll dice based on notation
const rollDice = (notation) => {
    const parsed = parseDiceNotation(notation);
    if (!parsed) return null;

    const rolls = [];
    for (let i = 0; i < parsed.count; i++) {
        rolls.push(rollDie(parsed.sides));
    }

    const sum = rolls.reduce((a, b) => a + b, 0);
    const total = sum + parsed.modifier;

    return {
        notation,
        rolls,
        sum,
        modifier: parsed.modifier,
        total,
        max: parsed.count * parsed.sides + parsed.modifier,
        min: parsed.count + parsed.modifier,
        isCritical: parsed.sides === 20 && rolls.includes(20),
        isFumble: parsed.sides === 20 && rolls.includes(1)
    };
};

// Pick random item from list
const pickRandom = (items) => {
    const index = Math.floor(Math.random() * items.length);
    return { item: items[index], index };
};

// Generate random number in range
const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Shuffle array
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Flip a coin
const flipCoin = () => Math.random() < 0.5 ? 'Yazı' : 'Tura';

// Main Dice Roller Component
const DiceRoller = ({ onRoll }) => {
    const [input, setInput] = useState('1d20');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [isRolling, setIsRolling] = useState(false);

    const handleRoll = useCallback(() => {
        const rollResult = rollDice(input);
        if (!rollResult) {
            alert('Geçersiz format! Örnek: 1d20, 2d6+5, 3d8-2');
            return;
        }

        setIsRolling(true);

        // Animation delay
        setTimeout(() => {
            setResult(rollResult);
            setHistory(prev => [rollResult, ...prev.slice(0, 9)]);
            setIsRolling(false);
            onRoll?.(rollResult);
        }, 500);
    }, [input, onRoll]);

    const quickRoll = (notation) => {
        setInput(notation);
        const rollResult = rollDice(notation);
        setIsRolling(true);

        setTimeout(() => {
            setResult(rollResult);
            setHistory(prev => [rollResult, ...prev.slice(0, 9)]);
            setIsRolling(false);
            onRoll?.(rollResult);
        }, 500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleRoll();
        }
    };

    const quickDice = ['1d4', '1d6', '1d8', '1d10', '1d12', '1d20', '1d100'];

    return (
        <div className="dice-roller">
            <div className="dice-header">
                <h3>🎲 Zar At</h3>
            </div>

            <div className="dice-input-row">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="1d20, 2d6+5..."
                    className="dice-input"
                />
                <button
                    className="roll-btn"
                    onClick={handleRoll}
                    disabled={isRolling}
                >
                    {isRolling ? '🎲' : 'At!'}
                </button>
            </div>

            <div className="quick-dice">
                {quickDice.map(d => (
                    <button
                        key={d}
                        className="quick-btn"
                        onClick={() => quickRoll(d)}
                        disabled={isRolling}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {result && (
                <div className={`dice-result ${isRolling ? 'rolling' : ''} ${result.isCritical ? 'critical' : ''} ${result.isFumble ? 'fumble' : ''}`}>
                    <div className="result-total">
                        {result.total}
                        {result.isCritical && <span className="crit-label">KRİTİK!</span>}
                        {result.isFumble && <span className="fumble-label">FUMBLE!</span>}
                    </div>
                    <div className="result-breakdown">
                        [{result.rolls.join(' + ')}]
                        {result.modifier !== 0 && (
                            <span className="modifier">
                                {result.modifier > 0 ? ` + ${result.modifier}` : ` - ${Math.abs(result.modifier)}`}
                            </span>
                        )}
                    </div>
                    <div className="result-range">
                        Min: {result.min} | Max: {result.max}
                    </div>
                </div>
            )}

            {history.length > 0 && (
                <div className="roll-history">
                    <h4>Geçmiş</h4>
                    <div className="history-list">
                        {history.map((roll, i) => (
                            <div key={i} className="history-item">
                                <span className="history-notation">{roll.notation}</span>
                                <span className="history-result">{roll.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Random Picker Component
export const RandomPicker = ({ onPick }) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handlePick = () => {
        const items = input.split(/[,\n]/).map(s => s.trim()).filter(s => s);
        if (items.length < 2) {
            alert('En az 2 seçenek girin (virgül veya yeni satırla ayırın)');
            return;
        }

        setIsAnimating(true);

        // Shuffle animation
        let count = 0;
        const interval = setInterval(() => {
            const temp = pickRandom(items);
            setResult({ ...temp, items, isAnimating: true });
            count++;
            if (count > 10) {
                clearInterval(interval);
                const final = pickRandom(items);
                setResult({ ...final, items, isAnimating: false });
                setIsAnimating(false);
                onPick?.(final);
            }
        }, 100);
    };

    return (
        <div className="random-picker">
            <div className="picker-header">
                <h3>🎯 Rastgele Seç</h3>
            </div>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Seçenekleri girin (virgül veya yeni satır ile ayırın)&#10;Örnek: Pizza, Burger, Sushi"
                className="picker-input"
                rows={4}
            />

            <button
                className="pick-btn"
                onClick={handlePick}
                disabled={isAnimating}
            >
                {isAnimating ? '🎯 Seçiliyor...' : '🎯 Rastgele Seç'}
            </button>

            {result && (
                <div className={`picker-result ${result.isAnimating ? 'animating' : ''}`}>
                    <span className="picked-item">{result.item}</span>
                    {!result.isAnimating && (
                        <span className="pick-info">
                            ({result.index + 1}/{result.items.length} seçenekten)
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

// Coin Flip Component
export const CoinFlip = ({ onFlip }) => {
    const [result, setResult] = useState(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [stats, setStats] = useState({ yazi: 0, tura: 0 });

    const handleFlip = () => {
        setIsFlipping(true);

        setTimeout(() => {
            const flip = flipCoin();
            setResult(flip);
            setStats(prev => ({
                ...prev,
                [flip.toLowerCase()]: prev[flip.toLowerCase()] + 1
            }));
            setIsFlipping(false);
            onFlip?.(flip);
        }, 800);
    };

    return (
        <div className="coin-flip">
            <div className="coin-header">
                <h3>🪙 Yazı Tura</h3>
            </div>

            <div
                className={`coin ${isFlipping ? 'flipping' : ''} ${result?.toLowerCase()}`}
                onClick={handleFlip}
            >
                <div className="coin-face front">Y</div>
                <div className="coin-face back">T</div>
            </div>

            {result && !isFlipping && (
                <div className="flip-result">
                    {result === 'Yazı' ? '📜' : '👑'} {result}
                </div>
            )}

            <button
                className="flip-btn"
                onClick={handleFlip}
                disabled={isFlipping}
            >
                {isFlipping ? 'Havada...' : 'At!'}
            </button>

            <div className="flip-stats">
                <span>Yazı: {stats.yazi}</span>
                <span>Tura: {stats.tura}</span>
            </div>
        </div>
    );
};

// Random Number Generator
export const RandomNumber = ({ onGenerate }) => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [result, setResult] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        if (min >= max) {
            alert('Min değer Max değerden küçük olmalı!');
            return;
        }

        setIsGenerating(true);

        // Quick animation
        let count = 0;
        const interval = setInterval(() => {
            setResult(randomInRange(min, max));
            count++;
            if (count > 8) {
                clearInterval(interval);
                const final = randomInRange(min, max);
                setResult(final);
                setIsGenerating(false);
                onGenerate?.(final);
            }
        }, 50);
    };

    return (
        <div className="random-number">
            <div className="number-header">
                <h3>🔢 Rastgele Sayı</h3>
            </div>

            <div className="range-inputs">
                <div className="range-input">
                    <label>Min</label>
                    <input
                        type="number"
                        value={min}
                        onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                    />
                </div>
                <span className="range-separator">-</span>
                <div className="range-input">
                    <label>Max</label>
                    <input
                        type="number"
                        value={max}
                        onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>

            {result !== null && (
                <div className={`number-result ${isGenerating ? 'generating' : ''}`}>
                    {result}
                </div>
            )}

            <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={isGenerating}
            >
                {isGenerating ? 'Üretiliyor...' : 'Üret'}
            </button>
        </div>
    );
};

// Export utilities for slash commands
export const randomUtils = {
    rollDice,
    parseDiceNotation,
    pickRandom,
    randomInRange,
    shuffleArray,
    flipCoin
};

export default DiceRoller;
