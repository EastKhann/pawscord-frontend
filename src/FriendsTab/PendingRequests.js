import React from 'react';
import { FaCheck, FaTimes } from '../utils/iconOptimization';
import LazyImage from '../components/LazyImage';
import styles from './friendsTabStyles';

const PendingRequests = ({ requests, outgoing, getDeterministicAvatar, handleRespond }) => (
    <div style={styles.listContainer}>
        <h4 style={styles.listHeader}>BEKLEYEN {'İ'}STEKLER {'—'} {requests.length}</h4>
        {requests.length === 0 && outgoing.length === 0 && <p style={styles.emptyText}>Bekleyen istek yok.</p>}

        {requests.map(req => {
            const senderUsername = req.sender_username || 'Unknown';
            const senderAvatar = req.sender_avatar;
            return (
                <div key={req.id} style={{ ...styles.listItem, backgroundColor: 'rgba(250, 166, 26, 0.1)' }}>
                    <div style={styles.userInfo}>
                        <LazyImage src={senderAvatar || getDeterministicAvatar(senderUsername)} style={styles.avatar} alt="avatar" />
                        <div style={{ marginLeft: '12px' }}>
                            <strong style={{ color: 'white', display: 'block' }}>{senderUsername}</strong>
                            <span style={{ fontSize: '0.8em', color: '#faa61a' }}>Sana istek gönderdi!</span>
                        </div>
                    </div>
                    <div style={styles.actions}>
                        <button onClick={() => handleRespond(req.id, 'accept')} style={styles.acceptBtn} title="Kabul Et"><FaCheck /></button>
                        <button onClick={() => handleRespond(req.id, 'reject')} style={styles.rejectBtn} title="Reddet"><FaTimes /></button>
                    </div>
                </div>
            );
        })}

        {outgoing.length > 0 && (
            <>
                <h4 style={{ ...styles.listHeader, marginTop: '30px' }}>G{'Ö'}NDERD{'İ'}KLER{'İ'}M {'—'} {outgoing.length}</h4>
                {outgoing.map(req => {
                    const receiverUsername = req.receiver_username || 'Unknown';
                    const receiverAvatar = req.receiver_avatar;
                    return (
                        <div key={req.id} style={styles.listItem}>
                            <div style={styles.userInfo}>
                                <LazyImage src={receiverAvatar || getDeterministicAvatar(receiverUsername)} style={styles.avatar} alt="avatar" />
                                <span style={{ marginLeft: '12px', color: '#b9bbbe' }}>{receiverUsername} (Bekliyor...)</span>
                            </div>
                            <button onClick={() => handleRespond(req.id, 'reject')} style={styles.rejectBtn} title="{'İ'}ptal Et"><FaTimes /></button>
                        </div>
                    );
                })}
            </>
        )}
    </div>
);

export default PendingRequests;
