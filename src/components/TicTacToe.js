// frontend/src/components/TicTacToe.js


const TicTacToe = ({ gameData, onMove, currentUser }) => {
    const { board, turn, player_x, player_o, winner, game_id } = gameData;

    const handleClick = (index) => {
        if (board[index] !== "" || winner) return;
        onMove(game_id, index);
    };

    let status = `Sıra: ${turn}`;
    if (winner) status = `🏆 Kazanan: ${winner}`;
    if (!board.includes("") && !winner) status = "🤝 Berabere!";

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span>❌ {player_x}</span>
                <strong style={{color:'#f0b232'}}>{status}</strong>
                <span>⭕ {player_o || 'Bekleniyor...'}</span>
            </div>
            <div style={styles.board}>
                {board.map((cell, i) => (
                    <button
                        key={i}
                        style={{
                            ...styles.cell,
                            color: cell === 'X' ? '#f04747' : '#5865f2'
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
    container: { backgroundColor: '#2f3136', padding: '10px', borderRadius: '8px', maxWidth: '200px', margin: '10px 0' },
    header: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', marginBottom: '5px', color:'#ccc' },
    board: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' },
    cell: { width: '50px', height: '50px', fontSize: '1.5em', fontWeight:'bold', backgroundColor: '#202225', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default TicTacToe;

