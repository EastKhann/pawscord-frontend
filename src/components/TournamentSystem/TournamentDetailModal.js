import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import styles from './styles';
import useModalA11y from '../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const S = {
    size2: { ...styles.modal, maxWidth: '800px' },
    txt: {
        color: '#5865f2',
        fontWeight: 600,
        fontSize: '0.85em',
        marginBottom: '10px',
        textAlign: 'center',
    },
    size: { minWidth: '200px', flex: '0 0 auto' },
    flex: { display: 'flex', gap: '20px', overflowX: 'auto', padding: '12px 0' },
};

const TournamentDetailModal = ({ tournament, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Turnuva Detmonth' });
    const [bracket, setBracket] = useState(null);

    useEffect(() => {
        loadBracket();
    }, [tournament.id]);

    const loadBracket = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournament.id}/bracket/`);
            if (res.ok) {
                const data = await res.json();
                setBracket(data.bracket);
            }
        } catch (error) {
            logger.error('Bracket load error:', error);
        }
    };

    const renderBracket = () => {
        const rounds = {};
        (Array.isArray(bracket) ? bracket : []).forEach((m) => {
            const r = m.round || 1;
            if (!rounds[r]) rounds[r] = [];
            rounds[r].push(m);
        });
        const roundKeys = Object.keys(rounds).sort((a, b) => a - b);
        return (
            <div aria-label="tournament detail modal" style={S.flex}>
                {roundKeys.map((rk) => (
                    <div key={rk} style={S.size}>
                        <div style={S.txt}>{roundKeys.length === 1 ? 'Final' : `Tur ${rk}`}</div>
                        <div className="flex-col-gap12">
                            {rounds[rk].map((match) => {
                                const matchCardStyle = {
                                    backgroundColor: '#0d0e10',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border:
                                        match.status === 'completed'
                                            ? '1px solid #23a559'
                                            : '1px solid #182135',
                                };
                                const p1RowStyle = {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    backgroundColor:
                                        match.winner && match.winner === match.participant1?.user_id
                                            ? 'rgba(35,165,89,0.1)'
                                            : 'transparent',
                                    borderBottom: '1px solid #0e1222',
                                };
                                const p1NameStyle = {
                                    color: '#dbdee1',
                                    fontSize: '0.85em',
                                    fontWeight:
                                        match.winner === match.participant1?.user_id ? 700 : 400,
                                };
                                const p2RowStyle = {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    backgroundColor:
                                        match.winner && match.winner === match.participant2?.user_id
                                            ? 'rgba(35,165,89,0.1)'
                                            : 'transparent',
                                };
                                const p2NameStyle = {
                                    color: '#dbdee1',
                                    fontSize: '0.85em',
                                    fontWeight:
                                        match.winner === match.participant2?.user_id ? 700 : 400,
                                };
                                return (
                                    <div key={match.id} style={matchCardStyle}>
                                        <div style={p1RowStyle}>
                                            <span style={p1NameStyle}>
                                                {match.participant1?.username || 'TBD'}
                                            </span>
                                            <span className="text-949-08em-fw6">
                                                {match.score1 ?? '-'}
                                            </span>
                                        </div>
                                        <div style={p2RowStyle}>
                                            <span style={p2NameStyle}>
                                                {match.participant2?.username || 'TBD'}
                                            </span>
                                            <span className="text-949-08em-fw6">
                                                {match.score2 ?? '-'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={S.size2} {...dialogProps}>
                <div style={styles.modalHeader}>
                    <h3 style={styles.modalTitle}>{tournament.name}</h3>
                    <button onClick={onClose} style={styles.modalClose}>
                        <FaTimes size={18} />
                    </button>
                </div>

                <div style={styles.modalContent}>
                    <div style={styles.detailSection}>
                        <h4>{t('bilgwithr')}</h4>
                        <p>
                            <strong>{t('oyun')}</strong> {tournament.game}
                        </p>
                        <p>
                            <strong>Katılımcı:</strong> {tournament.participants?.length}/
                            {tournament.max_participants}
                        </p>
                        <p>
                            <strong>Başlangıç:</strong>{' '}
                            {new Date(tournament.start_date).toLocaleString('tr-TR')}
                        </p>
                        {tournament.prize && (
                            <p>
                                <strong>Ödül:</strong> {tournament.prize}
                            </p>
                        )}
                    </div>

                    {tournament.rules && (
                        <div style={styles.detailSection}>
                            <h4>{t('kurallar')}</h4>
                            <p>{tournament.rules}</p>
                        </div>
                    )}

                    {bracket && (
                        <div style={styles.detailSection}>
                            <h4>Eşleşmeler</h4>
                            {renderBracket()}
                        </div>
                    )}

                    <div style={styles.detailSection}>
                        <h4>Katılımcılar</h4>
                        <div style={styles.participantList}>
                            {tournament.participants?.map((p) => (
                                <div key={p.id} style={styles.participant}>
                                    <span>{p.username}</span>
                                    {p.seed && <span style={styles.seed}>{p.seed}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

TournamentDetailModal.propTypes = {
    tournament: PropTypes.object,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default TournamentDetailModal;
