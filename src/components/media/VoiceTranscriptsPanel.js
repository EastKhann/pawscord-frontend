import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaMicrophone, FaFileAlt, FaDownload, FaSearch } from 'react-icons/fa';

import { toast } from '../../utils/toast';

import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --

const VoiceTranscriptsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const { t } = useTranslation();

    const [transcripts, setTranscripts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [filteredTranscripts, setFilteredTranscripts] = useState([]);

    useEffect(() => {
        fetchTranscripts();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = transcripts.filter(
                (t) =>
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
            const response = await fetchWithAuth(
                `${apiBaseUrl}/voice/transcripts/?room_slug=${roomSlug}`
            );

            const data = await response.json();

            setTranscripts(data.transcripts || []);

            setFilteredTranscripts(data.transcripts || []);
        } catch (error) {
            toast.error(t('transcripts.loadFailed', 'Failed to load transcripts'));
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

            ...filteredTranscripts.map((t) => [
                t.speaker_username,

                new Date(t.created_at).toLocaleString(),

                `"${t.text.replace(/"/g, '""')}"`,

                `${(t.confidence * 100).toFixed(1)}%`,
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;

        a.download = `voice_transcripts_${Date.now()}.csv`;

        document.body.appendChild(a);

        a.click();

        window.URL.revokeObjectURL(url);

        document.body.removeChild(a);

        toast.success(t('transcripts.exported', 'Transcripts exported'));
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaMicrophone className="icon-primary-mr10" />

                        <h2 style={styles.title}>{t('transcripts.title', 'Ses Transkriptleri')}</h2>
                    </div>

                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.searchBox}>
                        <FaSearch />

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('transcripts.searchPlaceholder', 'Transkript ara...')}
                            style={styles.searchInput}
                            aria-label="Search Query"
                        />
                    </div>

                    <button aria-label="export All" onClick={exportAll} style={styles.exportButton}>
                        <FaDownload className="mr-6" />

                        {t('transcripts.exportAll', 'Tümünü Dışa Aktar')}
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>
                            {t('transcripts.loading', 'Transkriptler yükleniyor...')}
                        </div>
                    ) : filteredTranscripts.length === 0 ? (
                        <div style={styles.empty}>
                            {searchQuery
                                ? t('transcripts.noMatch', 'No transcripts match your search')
                                : t('transcripts.noTranscripts', 'No voice transcripts yet')}
                        </div>
                    ) : (
                        <div style={styles.transcriptsList}>
                            {filteredTranscripts.map((transcript, idx) => (
                                <div key={`item-${idx}`} style={styles.transcriptCard}>
                                    <div style={styles.transcriptHeader}>
                                        <div style={styles.speaker}>
                                            <FaMicrophone />

                                            {transcript.speaker_username}
                                        </div>

                                        <div style={styles.metadata}>
                                            <span style={styles.date}>
                                                {new Date(transcript.created_at).toLocaleString()}
                                            </span>

                                            <span
                                                style={{
                                                    ...styles.confidence,

                                                    color:
                                                        transcript.confidence >= 0.8
                                                            ? '#23a559'
                                                            : transcript.confidence >= 0.6
                                                              ? '#f0b232'
                                                              : '#f23f42',
                                                }}
                                            >
                                                {(transcript.confidence * 100).toFixed(1)}%
                                                confidence
                                            </span>
                                        </div>
                                    </div>

                                    <div style={styles.transcriptText}>{transcript.text}</div>

                                    {transcript.duration && (
                                        <div style={styles.duration}>
                                            Duration: {transcript.duration}s
                                        </div>
                                    )}

                                    <button
                                        aria-label="Action button"
                                        onClick={() => downloadTranscript(transcript)}
                                        style={styles.downloadButton}
                                    >
                                        <FaFileAlt className="mr-6" />

                                        {t('transcripts.download', 'Download')}
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

        borderBottom: '1px solid #0e1222',
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

        color: '#949ba4',

        cursor: 'pointer',

        fontSize: '20px',

        padding: '5px',
    },

    toolbar: {
        display: 'flex',

        gap: '12px',

        padding: '15px 20px',

        borderBottom: '1px solid #0e1222',
    },

    searchBox: {
        flex: 1,

        display: 'flex',

        alignItems: 'center',

        backgroundColor: '#111214',

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

        color: '#949ba4',

        padding: '40px',
    },

    empty: {
        textAlign: 'center',

        color: '#949ba4',

        padding: '40px',
    },

    transcriptsList: {
        display: 'flex',

        flexDirection: 'column',

        gap: '16px',
    },

    transcriptCard: {
        backgroundColor: '#111214',

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

        color: '#949ba4',
    },

    confidence: {
        fontSize: '12px',

        fontWeight: '500',
    },

    transcriptText: {
        fontSize: '14px',

        color: '#dbdee1',

        lineHeight: '1.6',

        marginBottom: '12px',

        padding: '12px',

        backgroundColor: '#1e1e1e',

        borderRadius: '4px',
    },

    duration: {
        fontSize: '12px',

        color: '#949ba4',

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

VoiceTranscriptsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    onClose: PropTypes.func,

    roomSlug: PropTypes.string,
};

export default VoiceTranscriptsPanel;
