// frontend/src/components/PollExportPanel.js - Poll Results Export
import React, { useState, useEffect } from 'react';
import {
    FaPoll, FaTimes, FaSearch, FaDownload, FaChartPie,
    FaVoteYea, FaCalendarAlt, FaUser, FaCheck, FaFilter,
    FaFileExcel, FaFileCsv, FaFilePdf, FaEye, FaHashtag
} from 'react-icons/fa';
import toast from '../utils/toast';
import './PollExportPanel.css';

const PollExportPanel = ({ apiBaseUrl, serverId, onClose }) => {
    const [polls, setPolls] = useState([]);
    const [selectedPolls, setSelectedPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'ended'
    const [exportFormat, setExportFormat] = useState('csv');
    const [showPreview, setShowPreview] = useState(null);

    useEffect(() => {
        fetchPolls();
    }, [filterStatus]);

    const fetchPolls = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/polls/?status=${filterStatus}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPolls(data.polls || data || []);
            }
        } catch (error) {
            console.error('Fetch polls error:', error);
        } finally {
            setLoading(false);
        }
    };

    const togglePollSelection = (pollId) => {
        setSelectedPolls(prev =>
            prev.includes(pollId)
                ? prev.filter(id => id !== pollId)
                : [...prev, pollId]
        );
    };

    const selectAll = () => {
        if (selectedPolls.length === filteredPolls.length) {
            setSelectedPolls([]);
        } else {
            setSelectedPolls(filteredPolls.map(p => p.id));
        }
    };

    const exportPolls = async () => {
        if (selectedPolls.length === 0) {
            toast.error('Lütfen dışa aktarılacak anketleri seçin');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/polls/export/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    poll_ids: selectedPolls,
                    format: exportFormat
                })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `poll-results-${Date.now()}.${exportFormat}`;
                a.click();
                toast.success('📊 Anket sonuçları dışa aktarıldı');
            }
        } catch (error) {
            console.error('Export error:', error);
            toast.error('Dışa aktarma başarısız');
        }
    };

    const filteredPolls = polls.filter(poll =>
        poll.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.channel?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        totalPolls: polls.length,
        activePolls: polls.filter(p => p.status === 'active').length,
        endedPolls: polls.filter(p => p.status === 'ended').length,
        totalVotes: polls.reduce((sum, p) => sum + (p.total_votes || 0), 0)
    };

    return (
        <div className="poll-export-overlay" onClick={onClose}>
            <div className="poll-export-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaPoll /> Anket Sonuçlarını Dışa Aktar</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="stats-bar">
                    <div className="stat">
                        <FaPoll />
                        <span>{stats.totalPolls} Anket</span>
                    </div>
                    <div className="stat active">
                        <FaVoteYea />
                        <span>{stats.activePolls} Aktif</span>
                    </div>
                    <div className="stat ended">
                        <FaCheck />
                        <span>{stats.endedPolls} Tamamlanan</span>
                    </div>
                    <div className="stat votes">
                        <FaChartPie />
                        <span>{stats.totalVotes} Oy</span>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Anket ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label><FaFilter /></label>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">Tümü</option>
                            <option value="active">Aktif</option>
                            <option value="ended">Tamamlanan</option>
                        </select>
                    </div>

                    <div className="format-selector">
                        <button
                            className={`format-btn ${exportFormat === 'csv' ? 'active' : ''}`}
                            onClick={() => setExportFormat('csv')}
                        >
                            <FaFileCsv /> CSV
                        </button>
                        <button
                            className={`format-btn ${exportFormat === 'xlsx' ? 'active' : ''}`}
                            onClick={() => setExportFormat('xlsx')}
                        >
                            <FaFileExcel /> Excel
                        </button>
                        <button
                            className={`format-btn ${exportFormat === 'pdf' ? 'active' : ''}`}
                            onClick={() => setExportFormat('pdf')}
                        >
                            <FaFilePdf /> PDF
                        </button>
                    </div>
                </div>

                <div className="selection-bar">
                    <label className="select-all">
                        <input
                            type="checkbox"
                            checked={selectedPolls.length === filteredPolls.length && filteredPolls.length > 0}
                            onChange={selectAll}
                        />
                        <span>{selectedPolls.length} seçili</span>
                    </label>
                    <button
                        className="export-btn"
                        disabled={selectedPolls.length === 0}
                        onClick={exportPolls}
                    >
                        <FaDownload /> Seçilenleri Dışa Aktar
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredPolls.length === 0 ? (
                        <div className="empty-state">
                            <FaPoll />
                            <p>Anket bulunmuyor</p>
                        </div>
                    ) : (
                        <div className="polls-list">
                            {filteredPolls.map(poll => (
                                <PollCard
                                    key={poll.id}
                                    poll={poll}
                                    selected={selectedPolls.includes(poll.id)}
                                    onSelect={() => togglePollSelection(poll.id)}
                                    onPreview={() => setShowPreview(poll)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {showPreview && (
                    <PollPreviewModal
                        poll={showPreview}
                        onClose={() => setShowPreview(null)}
                    />
                )}
            </div>
        </div>
    );
};

// Poll Card
const PollCard = ({ poll, selected, onSelect, onPreview }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getWinningOption = () => {
        if (!poll.options || poll.options.length === 0) return null;
        return poll.options.reduce((max, opt) =>
            (opt.votes || 0) > (max.votes || 0) ? opt : max
            , poll.options[0]);
    };

    const winner = getWinningOption();

    return (
        <div className={`poll-card ${selected ? 'selected' : ''}`}>
            <div className="poll-select">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={onSelect}
                />
            </div>

            <div className="poll-info">
                <h4 className="poll-question">{poll.question}</h4>
                <div className="poll-meta">
                    <span className="channel">
                        <FaHashtag /> {poll.channel?.name || 'Genel'}
                    </span>
                    <span className="creator">
                        <FaUser /> {poll.creator?.username || 'Bilinmeyen'}
                    </span>
                    <span className="date">
                        <FaCalendarAlt /> {formatDate(poll.created_at)}
                    </span>
                </div>
            </div>

            <div className="poll-stats">
                <div className="vote-count">
                    <FaVoteYea />
                    <span>{poll.total_votes || 0}</span>
                </div>
                <span className={`status-badge ${poll.status}`}>
                    {poll.status === 'active' ? 'Aktif' : 'Tamamlandı'}
                </span>
            </div>

            {winner && (
                <div className="winning-option">
                    <span className="label">Lider:</span>
                    <span className="option">{winner.text}</span>
                    <span className="percentage">
                        {poll.total_votes > 0
                            ? Math.round((winner.votes / poll.total_votes) * 100)
                            : 0}%
                    </span>
                </div>
            )}

            <button className="preview-btn" onClick={onPreview}>
                <FaEye />
            </button>
        </div>
    );
};

// Poll Preview Modal
const PollPreviewModal = ({ poll, onClose }) => {
    const getPercentage = (votes) => {
        if (!poll.total_votes || poll.total_votes === 0) return 0;
        return Math.round((votes / poll.total_votes) * 100);
    };

    const maxVotes = Math.max(...(poll.options?.map(o => o.votes || 0) || [0]));

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="preview-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3><FaPoll /> Anket Sonuçları</h3>
                    <button className="close-modal" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="poll-preview-content">
                    <h4 className="preview-question">{poll.question}</h4>

                    <div className="preview-options">
                        {poll.options?.map((option, idx) => (
                            <div
                                key={idx}
                                className={`option-bar ${option.votes === maxVotes && maxVotes > 0 ? 'winner' : ''}`}
                            >
                                <div className="option-info">
                                    <span className="option-text">{option.text}</span>
                                    <span className="option-votes">{option.votes || 0} oy</span>
                                </div>
                                <div className="option-progress">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${getPercentage(option.votes)}%` }}
                                    />
                                </div>
                                <span className="option-percentage">{getPercentage(option.votes)}%</span>
                            </div>
                        ))}
                    </div>

                    <div className="preview-stats">
                        <div className="stat">
                            <span className="value">{poll.total_votes || 0}</span>
                            <span className="label">Toplam Oy</span>
                        </div>
                        <div className="stat">
                            <span className="value">{poll.options?.length || 0}</span>
                            <span className="label">Seçenek</span>
                        </div>
                        <div className="stat">
                            <span className="value">
                                {new Date(poll.created_at).toLocaleDateString('tr-TR')}
                            </span>
                            <span className="label">Oluşturulma</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="close-btn-modal" onClick={onClose}>Kapat</button>
                </div>
            </div>
        </div>
    );
};

export default PollExportPanel;
