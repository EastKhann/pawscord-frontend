import React, { useState, useEffect } from 'react';
import { FaTimes, FaMicrophone, FaFileAlt, FaDownload, FaSearch } from 'react-icons/fa';
import { toast } from '../utils/toast';

const VoiceTranscriptsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const [transcripts, setTranscripts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTranscripts, setFilteredTranscripts] = useState([]);

    useEffect(() => {
        fetchTranscripts();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = transcripts.filter(t =>
                t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.speaker_username.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredTranscripts(filtered);
        } else {
            setFilteredTranscripts(transcripts);
        }
    }, [searchQuery, transcripts]);

    const fetchTranscripts = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/voice/transcripts/?room_slug=${roomSlug}`);
            const data = await response.json();
            setTranscripts(data.transcripts || []);
            setFilteredTranscripts(data.transcripts || []);
        } catch (error) {
            toast.error('Failed to load transcripts');
        } finally {
            setLoading(false);
        }
    };

    const downloadTranscript = (transcript) => {
        const text = `Voice Transcript
Speaker: ${transcript.speaker_username}
Date: ${new Date(transcript.created_at).toLocaleString()}
Confidence: ${(transcript.confidence * 100).toFixed(1)}%

${transcript.text}
`;

        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transcript_${transcript.id}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const exportAll = () => {
        const csv = [
            ['Speaker', 'Date', 'Text', 'Confidence'],
            ...filteredTranscripts.map(t => [
                t.speaker_username,
                new Date(t.created_at).toLocaleString(),
                `"${t.text.replace(/"/g, '""')}"`,
                `${(t.confidence * 100).toFixed(1)}%`
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voice_transcripts_${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success('Transcripts exported');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaMicrophone style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Voice Transcripts</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.searchBox}>
                        <FaSearch style={{ color: '#99aab5', marginRight: '8px' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search transcripts..."
                            style={styles.searchInput}
                        />
                    </div>
                    <button onClick={exportAll} style={styles.exportButton}>
                        <FaDownload style={{ marginRight: '6px' }} />
                        Export All
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading transcripts...</div>
                    ) : filteredTranscripts.length === 0 ? (
                        <div style={styles.empty}>
                            {searchQuery ? 'No transcripts match your search' : 'No voice transcripts yet'}
                        </div>
                    ) : (
                        <div style={styles.transcriptsList}>
                            {filteredTranscripts.map((transcript, idx) => (
                                <div key={idx} style={styles.transcriptCard}>
                                    <div style={styles.transcriptHeader}>
                                        <div style={styles.speaker}>
                                            <FaMicrophone style={{ marginRight: '8px', color: '#5865f2', fontSize: '14px' }} />
                                            {transcript.speaker_username}
                                        </div>
                                        <div style={styles.metadata}>
                                            <span style={styles.date}>
                                                {new Date(transcript.created_at).toLocaleString()}
                                            </span>
                                            <span style={{
                                                ...styles.confidence,
                                                color: transcript.confidence >= 0.8 ? '#43b581' : transcript.confidence >= 0.6 ? '#faa61a' : '#f04747'
                                            }}>
                                                {(transcript.confidence * 100).toFixed(1)}% confidence
                                            </span>
                                        </div>
                                    </div>
                                    <div style={styles.transcriptText}>
                                        {transcript.text}
                                    </div>
                                    {transcript.duration && (
                                        <div style={styles.duration}>
                                            Duration: {transcript.duration}s
                                        </div>
                                    )}
                                    <button
                                        onClick={() => downloadTranscript(transcript)}
                                        style={styles.downloadButton}
                                    >
                                        <FaFileAlt style={{ marginRight: '6px' }} />
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        display: 'flex',
        gap: '12px',
        padding: '15px 20px',
        borderBottom: '1px solid #2c2f33',
    },
    searchBox: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#2c2f33',
        borderRadius: '4px',
        padding: '8px 12px',
    },
    searchInput: {
        flex: 1,
        background: 'none',
        border: 'none',
        color: '#ffffff',
        fontSize: '14px',
        outline: 'none',
    },
    exportButton: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    transcriptsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    transcriptCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
    },
    transcriptHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px',
    },
    speaker: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
    },
    metadata: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px',
    },
    date: {
        fontSize: '12px',
        color: '#99aab5',
    },
    confidence: {
        fontSize: '12px',
        fontWeight: '500',
    },
    transcriptText: {
        fontSize: '14px',
        color: '#dcddde',
        lineHeight: '1.6',
        marginBottom: '12px',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
    },
    duration: {
        fontSize: '12px',
        color: '#99aab5',
        marginBottom: '12px',
    },
    downloadButton: {
        padding: '6px 12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
        display: 'inline-flex',
        alignItems: 'center',
    },
};

export default VoiceTranscriptsPanel;
