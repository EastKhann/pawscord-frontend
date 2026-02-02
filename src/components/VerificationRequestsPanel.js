import React, { useState, useEffect } from 'react';
import {
    FaCheckCircle, FaTimes, FaSearch, FaFilter, FaClock, FaUserCheck,
    FaIdCard, FaImage, FaFile, FaEye, FaCheck, FaTimesCircle, FaHistory,
    FaExclamationTriangle, FaCalendarAlt, FaUserShield, FaShieldAlt,
    FaBadgeCheck, FaDownload, FaExpand, FaStar
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './VerificationRequestsPanel.css';

const VerificationRequestsPanel = ({ serverId, onClose }) => {
    const [activeTab, setActiveTab] = useState('pending');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchRequests();
    }, [serverId, activeTab]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/verification/requests/?status=${activeTab}`, {
                headers: { 'Authorization': `Token ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setRequests(data.requests || []);
                setStats(data.stats || { pending: 0, approved: 0, rejected: 0 });
            } else {
                setRequests([]);
                setStats({ pending: 0, approved: 0, rejected: 0 });
            }
        } catch (error) {
            console.error('Error fetching verification requests:', error);
            setRequests([]);
        }
        setLoading(false);
    };

    const handleReview = async (requestId, decision, notes = '') => {
        try {
            const response = await fetch(`/api/verification/requests/${requestId}/review/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ decision, notes })
            });

            if (response.ok) {
                toast.success(`Başvuru ${decision === 'approve' ? 'onaylandı' : 'reddedildi'}`);
                fetchRequests();
                setSelectedRequest(null);
            }
        } catch (error) {
            toast.error('İşlem başarısız');
        }
    };

    const filteredRequests = requests.filter(req =>
        req.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.user?.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getVerificationTypeLabel = (type) => {
        switch (type) {
            case 'creator': return 'İçerik Üreticisi';
            case 'business': return 'İşletme';
            case 'notable': return 'Önemli Kişi';
            case 'developer': return 'Geliştirici';
            default: return 'Standart';
        }
    };

    const getVerificationIcon = (type) => {
        switch (type) {
            case 'creator': return <FaStar />;
            case 'business': return <FaShieldAlt />;
            case 'notable': return <FaBadgeCheck />;
            default: return <FaCheckCircle />;
        }
    };

    return (
        <div className="verification-requests-overlay" onClick={(e) => e.target.className === 'verification-requests-overlay' && onClose()}>
            <div className="verification-requests-panel">
                <div className="panel-header">
                    <h2><FaBadgeCheck /> Doğrulama Başvuruları</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="stats-bar">
                    <div className="stat-item pending">
                        <FaClock />
                        <span>{stats.pending}</span>
                        <label>Bekleyen</label>
                    </div>
                    <div className="stat-item approved">
                        <FaCheckCircle />
                        <span>{stats.approved}</span>
                        <label>Onaylanan</label>
                    </div>
                    <div className="stat-item rejected">
                        <FaTimesCircle />
                        <span>{stats.rejected}</span>
                        <label>Reddedilen</label>
                    </div>
                </div>

                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pending')}
                        >
                            <FaClock /> Bekleyen
                        </button>
                        <button
                            className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
                            onClick={() => setActiveTab('approved')}
                        >
                            <FaCheck /> Onaylanan
                        </button>
                        <button
                            className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
                            onClick={() => setActiveTab('rejected')}
                        >
                            <FaTimesCircle /> Reddedilen
                        </button>
                        <button
                            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            <FaHistory /> Tümü
                        </button>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Kullanıcı ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredRequests.length === 0 ? (
                        <div className="empty-state">
                            <FaBadgeCheck />
                            <p>Başvuru bulunamadı</p>
                        </div>
                    ) : (
                        <div className="requests-list">
                            {filteredRequests.map(request => (
                                <div key={request.id} className="request-card">
                                    <div className="request-header">
                                        <div className="user-section">
                                            <img
                                                src={request.user?.avatar || '/default-avatar.png'}
                                                alt=""
                                                className="user-avatar"
                                            />
                                            <div className="user-info">
                                                <h4>{request.user?.display_name || request.user?.username}</h4>
                                                <span className="username">@{request.user?.username}</span>
                                            </div>
                                        </div>
                                        <div className={`type-badge ${request.type}`}>
                                            {getVerificationIcon(request.type)}
                                            {getVerificationTypeLabel(request.type)}
                                        </div>
                                    </div>

                                    <div className="request-body">
                                        <p className="reason">{request.reason}</p>

                                        {request.documents?.length > 0 && (
                                            <div className="documents-preview">
                                                <label><FaFile /> Belgeler:</label>
                                                <div className="docs-list">
                                                    {request.documents.map((doc, i) => (
                                                        <div key={i} className="doc-item">
                                                            {doc.type === 'id' ? <FaIdCard /> : <FaImage />}
                                                            <span>{doc.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {request.social_links && (
                                            <div className="social-links">
                                                {Object.entries(request.social_links).map(([platform, url]) => (
                                                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="social-link">
                                                        {platform}
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {request.followers_count && (
                                            <div className="followers-info">
                                                <FaUserCheck /> {request.followers_count.toLocaleString()} takipçi
                                            </div>
                                        )}

                                        <div className="request-meta">
                                            <span><FaCalendarAlt /> {new Date(request.submitted_at).toLocaleDateString('tr-TR')}</span>
                                            {request.reviewed_by && (
                                                <span><FaUserShield /> {request.reviewed_by} tarafından incelendi</span>
                                            )}
                                        </div>
                                    </div>

                                    {request.status === 'pending' && (
                                        <div className="request-actions">
                                            <button
                                                className="view-btn"
                                                onClick={() => setSelectedRequest(request)}
                                            >
                                                <FaEye /> Detay
                                            </button>
                                            <button
                                                className="approve-btn"
                                                onClick={() => handleReview(request.id, 'approve')}
                                            >
                                                <FaCheck /> Onayla
                                            </button>
                                            <button
                                                className="reject-btn"
                                                onClick={() => setSelectedRequest({ ...request, showRejectForm: true })}
                                            >
                                                <FaTimesCircle /> Reddet
                                            </button>
                                        </div>
                                    )}

                                    {request.status !== 'pending' && (
                                        <div className={`status-badge ${request.status}`}>
                                            {request.status === 'approved' ? (
                                                <><FaCheckCircle /> Onaylandı</>
                                            ) : (
                                                <><FaTimesCircle /> Reddedildi</>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedRequest && (
                    <ReviewDetailModal
                        request={selectedRequest}
                        onClose={() => setSelectedRequest(null)}
                        onReview={handleReview}
                    />
                )}
            </div>
        </div>
    );
};

const ReviewDetailModal = ({ request, onClose, onReview }) => {
    const [rejectNotes, setRejectNotes] = useState('');
    const [selectedDoc, setSelectedDoc] = useState(null);

    const handleReject = () => {
        if (!rejectNotes.trim()) {
            toast.warning('Red nedeni belirtiniz');
            return;
        }
        onReview(request.id, 'reject', rejectNotes);
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="review-modal">
                <h3><FaUserCheck /> Başvuru Detayı</h3>

                <div className="user-detail">
                    <img
                        src={request.user?.avatar || '/default-avatar.png'}
                        alt=""
                        className="user-avatar-large"
                    />
                    <div>
                        <h4>{request.user?.display_name}</h4>
                        <span>@{request.user?.username}</span>
                    </div>
                </div>

                <div className="detail-section">
                    <label>Başvuru Türü:</label>
                    <p className={`type-badge ${request.type}`}>
                        {request.type === 'creator' && 'İçerik Üreticisi'}
                        {request.type === 'business' && 'İşletme'}
                        {request.type === 'notable' && 'Önemli Kişi'}
                    </p>
                </div>

                <div className="detail-section">
                    <label>Açıklama:</label>
                    <p>{request.reason}</p>
                </div>

                {request.documents?.length > 0 && (
                    <div className="detail-section">
                        <label><FaFile /> Belgeler:</label>
                        <div className="documents-grid">
                            {request.documents.map((doc, i) => (
                                <div key={i} className="doc-preview" onClick={() => setSelectedDoc(doc)}>
                                    {doc.type === 'id' ? <FaIdCard /> : <FaImage />}
                                    <span>{doc.name}</span>
                                    <button className="preview-btn"><FaExpand /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {request.social_links && Object.keys(request.social_links).length > 0 && (
                    <div className="detail-section">
                        <label>Sosyal Medya:</label>
                        <div className="social-links-detail">
                            {Object.entries(request.social_links).map(([platform, url]) => (
                                <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                                    {platform}: {url}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {request.showRejectForm && (
                    <div className="reject-form">
                        <label><FaExclamationTriangle /> Red Nedeni:</label>
                        <textarea
                            value={rejectNotes}
                            onChange={(e) => setRejectNotes(e.target.value)}
                            placeholder="Neden reddedildiğini açıklayın..."
                            rows={3}
                        />
                    </div>
                )}

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>Kapat</button>
                    {!request.showRejectForm ? (
                        <>
                            <button className="approve-btn" onClick={() => onReview(request.id, 'approve')}>
                                <FaCheck /> Onayla
                            </button>
                            <button className="reject-btn" onClick={() => request.showRejectForm = true}>
                                <FaTimesCircle /> Reddet
                            </button>
                        </>
                    ) : (
                        <button className="reject-btn" onClick={handleReject}>
                            <FaTimesCircle /> Reddi Onayla
                        </button>
                    )}
                </div>

                {selectedDoc && (
                    <div className="doc-viewer" onClick={() => setSelectedDoc(null)}>
                        <div className="doc-viewer-content">
                            <img src={selectedDoc.url} alt={selectedDoc.name} />
                            <button className="download-btn">
                                <FaDownload /> İndir
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationRequestsPanel;
