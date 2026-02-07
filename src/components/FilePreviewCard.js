// frontend/src/components/FilePreviewCard.js
// 🔥 FEATURE 22: File preview cards for attachments
// Shows file type icon, name, size, download button

import React, { memo, useMemo } from 'react';
import { FaFile, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileArchive, FaFileCode, FaFileAlt, FaFileVideo, FaFileAudio, FaFileImage, FaDownload, FaEye, FaExpand } from 'react-icons/fa';

const FILE_TYPES = {
    pdf: { icon: FaFilePdf, color: '#ed4245', label: 'PDF' },
    doc: { icon: FaFileWord, color: '#5865f2', label: 'Word' },
    docx: { icon: FaFileWord, color: '#5865f2', label: 'Word' },
    xls: { icon: FaFileExcel, color: '#57f287', label: 'Excel' },
    xlsx: { icon: FaFileExcel, color: '#57f287', label: 'Excel' },
    csv: { icon: FaFileExcel, color: '#57f287', label: 'CSV' },
    ppt: { icon: FaFilePowerpoint, color: '#eb459e', label: 'PowerPoint' },
    pptx: { icon: FaFilePowerpoint, color: '#eb459e', label: 'PowerPoint' },
    zip: { icon: FaFileArchive, color: '#fee75c', label: 'Arşiv' },
    rar: { icon: FaFileArchive, color: '#fee75c', label: 'Arşiv' },
    '7z': { icon: FaFileArchive, color: '#fee75c', label: 'Arşiv' },
    tar: { icon: FaFileArchive, color: '#fee75c', label: 'Arşiv' },
    gz: { icon: FaFileArchive, color: '#fee75c', label: 'Arşiv' },
    js: { icon: FaFileCode, color: '#fee75c', label: 'JavaScript' },
    ts: { icon: FaFileCode, color: '#5865f2', label: 'TypeScript' },
    py: { icon: FaFileCode, color: '#57f287', label: 'Python' },
    html: { icon: FaFileCode, color: '#ed4245', label: 'HTML' },
    css: { icon: FaFileCode, color: '#5865f2', label: 'CSS' },
    json: { icon: FaFileCode, color: '#fee75c', label: 'JSON' },
    xml: { icon: FaFileCode, color: '#eb459e', label: 'XML' },
    txt: { icon: FaFileAlt, color: '#b5bac1', label: 'Metin' },
    md: { icon: FaFileAlt, color: '#b5bac1', label: 'Markdown' },
    mp4: { icon: FaFileVideo, color: '#5865f2', label: 'Video' },
    avi: { icon: FaFileVideo, color: '#5865f2', label: 'Video' },
    mkv: { icon: FaFileVideo, color: '#5865f2', label: 'Video' },
    webm: { icon: FaFileVideo, color: '#5865f2', label: 'Video' },
    mov: { icon: FaFileVideo, color: '#5865f2', label: 'Video' },
    mp3: { icon: FaFileAudio, color: '#57f287', label: 'Ses' },
    wav: { icon: FaFileAudio, color: '#57f287', label: 'Ses' },
    ogg: { icon: FaFileAudio, color: '#57f287', label: 'Ses' },
    flac: { icon: FaFileAudio, color: '#57f287', label: 'Ses' },
    png: { icon: FaFileImage, color: '#eb459e', label: 'Resim' },
    jpg: { icon: FaFileImage, color: '#eb459e', label: 'Resim' },
    jpeg: { icon: FaFileImage, color: '#eb459e', label: 'Resim' },
    gif: { icon: FaFileImage, color: '#eb459e', label: 'GIF' },
    webp: { icon: FaFileImage, color: '#eb459e', label: 'Resim' },
    svg: { icon: FaFileImage, color: '#eb459e', label: 'SVG' },
};

const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FilePreviewCard = ({ file, onPreview, onDownload }) => {
    const ext = useMemo(() => {
        const name = file?.name || file?.filename || '';
        return name.split('.').pop()?.toLowerCase() || '';
    }, [file]);

    const typeInfo = FILE_TYPES[ext] || { icon: FaFile, color: '#b5bac1', label: ext.toUpperCase() || 'Dosya' };
    const Icon = typeInfo.icon;
    const isPreviewable = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'pdf', 'txt', 'md', 'mp4', 'webm', 'mp3', 'wav', 'ogg'].includes(ext);
    const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext);

    // If image, show thumbnail
    if (isImage && (file?.url || file?.src)) {
        return (
            <div style={S.imageCard}>
                <img src={file.url || file.src} alt={file.name || ''} style={S.thumbnail} />
                <div style={S.imageOverlay}>
                    <button type="button" style={S.overlayBtn} onClick={() => onPreview?.(file)} title="Büyüt">
                        <FaExpand />
                    </button>
                    <button type="button" style={S.overlayBtn} onClick={() => onDownload?.(file)} title="İndir">
                        <FaDownload />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={S.card}>
            <div style={{ ...S.iconWrap, backgroundColor: `${typeInfo.color}15` }}>
                <Icon style={{ fontSize: 24, color: typeInfo.color }} />
            </div>
            <div style={S.info}>
                <div style={S.fileName}>{file?.name || file?.filename || 'Dosya'}</div>
                <div style={S.meta}>
                    <span style={{ color: typeInfo.color }}>{typeInfo.label}</span>
                    {file?.size && <span>• {formatSize(file.size)}</span>}
                </div>
            </div>
            <div style={S.actions}>
                {isPreviewable && (
                    <button type="button" style={S.actionBtn} onClick={() => onPreview?.(file)} title="Önizle">
                        <FaEye />
                    </button>
                )}
                <button type="button" style={S.actionBtn} onClick={() => onDownload?.(file)} title="İndir">
                    <FaDownload />
                </button>
            </div>
        </div>
    );
};

const S = {
    card: {
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', backgroundColor: '#2b2d31',
        borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)',
        maxWidth: 420, minWidth: 300,
    },
    iconWrap: {
        width: 48, height: 48, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    },
    info: { flex: 1, minWidth: 0 },
    fileName: {
        fontSize: 14, fontWeight: 500, color: '#00a8fc',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        cursor: 'pointer',
    },
    meta: {
        fontSize: 12, color: '#b5bac1', display: 'flex', gap: 6, marginTop: 2,
    },
    actions: { display: 'flex', gap: 4 },
    actionBtn: {
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', background: 'rgba(255,255,255,0.06)',
        color: '#b5bac1', cursor: 'pointer', fontSize: 14,
        transition: 'all 0.15s',
    },
    imageCard: {
        position: 'relative', display: 'inline-block',
        maxWidth: 400, borderRadius: 8, overflow: 'hidden',
    },
    thumbnail: {
        display: 'block', maxWidth: '100%', maxHeight: 300,
        objectFit: 'cover', borderRadius: 8,
    },
    imageOverlay: {
        position: 'absolute', top: 8, right: 8,
        display: 'flex', gap: 4, opacity: 0,
        transition: 'opacity 0.15s',
    },
    overlayBtn: {
        width: 28, height: 28, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#fff', cursor: 'pointer', fontSize: 12,
    },
};

export default memo(FilePreviewCard);
