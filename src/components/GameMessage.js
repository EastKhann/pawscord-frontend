import { useState } from 'react';
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa';

const GameMessage = ({ gameId, state, currentUser, onMove }) => {
    // state: { p1: 'user1', p2: 'user2', p1_move: null, p2_move: null, status: 'waiting' | 'finished', winner: null }
    const [myMove, setMyMove] = useState(null);

    const isPlayer = state.p1 === currentUser || state.p2 === currentUser;
    const isFinished = state.status === 'finished';

    const handleMove = (move) => {
        if (!isPlayer || isFinished || myMove) return;
        setMyMove(move);
        onMove(gameId, move);
    };

    const getIcon = (move) => {
        if (move === 'rock') return <FaHandRock />;
        if (move === 'paper') return <FaHandPaper />;
        if (move === 'scissors') return <FaHandScissors />;
        return null;
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                🎮 Taş Kağıt Makas
            </div>

            <div style={styles.players}>
                <div style={styles.player}>
                    <span style={styles.playerName}>{state.p1}</span>
                    <div style={styles.movePlaceholder}>
                        {isFinished ? getIcon(state.p1_move) : (state.p1_move ? '✅' : 'Thinking...')}
                    </div>
                </div>
                <div style={styles.vs}>VS</div>
                <div style={styles.player}>
                    <span style={styles.playerName}>{state.p2}</span>
                    <div style={styles.movePlaceholder}>
                        {isFinished ? getIcon(state.p2_move) : (state.p2_move ? '✅' : 'Thinking...')}
                    </div>
                </div>
            </div>

            {isFinished && (
                <div style={styles.result}>
                    {state.winner === 'draw' ? 'Berabere!' : `Kazanan: ${state.winner}!`}
                </div>
            )}

            {!isFinished && isPlayer && !myMove && (
                <div style={styles.controls}>
                    <button onClick={() => handleMove('rock')} style={styles.moveBtn} title="Taş">🪨</button>
                    <button onClick={() => handleMove('paper')} style={styles.moveBtn} title="Kağıt">📄</button>
                    <button onClick={() => handleMove('scissors')} style={styles.moveBtn} title="Makas">✂️</button>
                </div>
            )}

            {!isFinished && isPlayer && myMove && (
                <div style={styles.status}>Hamleni Yaptın, Rakibi Bekle...</div>
            )}
        </div>
    );
};

const styles = {
    container: {
        background: 'linear-gradient(135deg, #2b2d31, #232428)',
        borderRadius: '8px',
        border: '1px solid #eb459e',
        padding: '12px',
        maxWidth: '300px',
        color: 'white',
        marginTop: '5px'
    },
    header: { fontSize: '0.9em', fontWeight: 'bold', color: '#eb459e', marginBottom: '10px', textAlign: 'center' },
    players: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    player: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
    playerName: { fontSize: '0.9em', fontWeight: 'bold' },
    movePlaceholder: {
        width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2em'
    },
    vs: { fontSize: '0.8em', color: '#b9bbbe', fontWeight: 'bold' },
    controls: { display: 'flex', justifyContent: 'center', gap: '10px' },
    moveBtn: {
        backgroundColor: '#5865f2', border: 'none', borderRadius: '8px', width: '40px', height: '40px',
        fontSize: '1.2em', cursor: 'pointer', transition: 'transform 0.1s'
    },
    result: { textAlign: 'center', fontWeight: 'bold', color: '#23a559', marginTop: '10px' },
    status: { textAlign: 'center', fontSize: '0.8em', color: '#b9bbbe', marginTop: '5px' }
};

export default GameMessage;


