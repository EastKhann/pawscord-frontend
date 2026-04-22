// frontend/src/components/TicTacToe.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TicTacToe = ({ gameData, onMove, currentUser }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { board, turn, player_x, player_o, winner, game_id } = gameData;

    const handleClick = (index) => {
        if (board[index] !== '' || winner) return;
        onMove(game_id, index);
    };

    let status = `Turn: ${turn}`;
    if (winner) status = `🏆 Winner: ${winner}`;
    if (!board.includes('') && !winner) status = '🤝 Draw!';

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span>❌ {player_x}</span>
                <strong className="icon-warning">{status}</strong>
                <span>⭕ {player_o || 'Bekleniyor...'}</span>
            </div>
            <div style={styles.board}>
                {board.map((cell, i) => (
                    <button
                        aria-label={t('games.makeMoveButton', 'Make a move')}
                        key={`item-${i}`}
                        style={{
                            ...styles.cell,
                            color: cell === 'X' ? '#f23f42' : '#5865f2',
                        }}
                        onClick={() => handleClick(i)}
                        disabled={!!cell || !!winner}
                    >
                        {cell}
                    </button>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#111214',
        padding: '10px',
        borderRadius: '8px',
        maxWidth: '200px',
        margin: '10px 0',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8em',
        marginBottom: '5px',
        color: '#ccc',
    },
    board: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' },
    cell: {
        width: '50px',
        height: '50px',
        fontSize: '1.5em',
        fontWeight: 'bold',
        backgroundColor: '#0d0e10',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

TicTacToe.propTypes = {
    gameData: PropTypes.array,
    onMove: PropTypes.func,
    currentUser: PropTypes.object,
};
export default TicTacToe;
