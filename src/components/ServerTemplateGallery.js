// frontend/src/components/ServerTemplateGallery.js
// 🔥 FEATURE 38: Server template gallery
// Pre-built server templates for quick setup

import React, { useState, memo, useCallback } from 'react';
import { FaGamepad, FaGraduationCap, FaUsers, FaMusic, FaCode, FaPalette, FaFilm, FaFootballBall, FaBriefcase, FaRocket, FaPlus, FaCheck } from 'react-icons/fa';

const TEMPLATES = [
    {
        id: 'gaming', name: 'Oyun Topluluğu', icon: FaGamepad, color: '#57f287',
        desc: 'Oyuncular için hazır kanal yapısı',
        channels: ['genel-sohbet', 'oyun-sohbet', 'medya', 'sesli-oyun-1', 'sesli-oyun-2', 'stratejiler'],
        roles: ['Admin', 'Moderatör', 'Oyuncu', 'Üye'],
    },
    {
        id: 'education', name: 'Eğitim / Okul', icon: FaGraduationCap, color: '#5865f2',
        desc: 'Öğrenciler ve öğretmenler için',
        channels: ['duyurular', 'genel-sohbet', 'ödevler', 'kaynak-paylaşım', 'sesli-ders', 'soru-cevap'],
        roles: ['Öğretmen', 'Asistan', 'Öğrenci', 'Misafir'],
    },
    {
        id: 'community', name: 'Arkadaş Grubu', icon: FaUsers, color: '#fee75c',
        desc: 'Samimi bir topluluk sunucusu',
        channels: ['hoşgeldin', 'genel-sohbet', 'medya', 'müzik', 'sesli-takılma'],
        roles: ['Admin', 'OG Üye', 'Üye'],
    },
    {
        id: 'music', name: 'Müzik Topluluğu', icon: FaMusic, color: '#1db954',
        desc: 'Müzisyenler ve dinleyiciler için',
        channels: ['duyurular', 'müzik-paylaşım', 'yapım', 'feedback', 'sesli-jam', 'dinleme-partisi'],
        roles: ['Admin', 'DJ', 'Müzisyen', 'Dinleyici'],
    },
    {
        id: 'coding', name: 'Yazılım Geliştirme', icon: FaCode, color: '#eb459e',
        desc: 'Geliştiriciler için kodlama sunucusu',
        channels: ['duyurular', 'genel', 'yardım', 'projeler', 'kaynak', 'code-review', 'sesli-pair'],
        roles: ['Admin', 'Senior', 'Junior', 'Öğrenci'],
    },
    {
        id: 'art', name: 'Sanat & Tasarım', icon: FaPalette, color: '#f47fff',
        desc: 'Sanatçılar ve tasarımcılar için',
        channels: ['duyurular', 'çalışmalar', 'feedback', 'tutorial', 'İlham', 'sesli-atölye'],
        roles: ['Admin', 'Sanatçı', 'Öğrenci', 'Hayran'],
    },
    {
        id: 'film', name: 'Film & Dizi Kulübü', icon: FaFilm, color: '#ed4245',
        desc: 'Film ve dizi severler için',
        channels: ['duyurular', 'film-sohbet', 'dizi-sohbet', 'öneriler', 'spoiler', 'izleme-partisi'],
        roles: ['Admin', 'Eleştirmen', 'Üye'],
    },
    {
        id: 'sports', name: 'Spor Topluluğu', icon: FaFootballBall, color: '#fee75c',
        desc: 'Sporseverler için',
        channels: ['genel', 'futbol', 'basketbol', 'e-spor', 'maç-günü', 'sesli-maç'],
        roles: ['Admin', 'Mod', 'Sporcu', 'Taraftar'],
    },
    {
        id: 'business', name: 'İş / Startup', icon: FaBriefcase, color: '#5865f2',
        desc: 'Profesyonel ekip sunucusu',
        channels: ['duyurular', 'genel', 'pazarlama', 'geliştirme', 'toplantı-notları', 'sesli-toplantı'],
        roles: ['CEO', 'Yönetici', 'Çalışan', 'Stajyer'],
    },
    {
        id: 'startup', name: 'Side Project', icon: FaRocket, color: '#57f287',
        desc: 'Yan proje geliştirme sunucusu',
        channels: ['fikirler', 'geliştirme', 'tasarım', 'test', 'lansman', 'sesli-sprint'],
        roles: ['Kurucu', 'Geliştirici', 'Tasarımcı', 'Tester'],
    },
];

const ServerTemplateGallery = ({ onSelect, onClose }) => {
    const [selected, setSelected] = useState(null);

    const handleSelect = useCallback((template) => {
        setSelected(template.id);
        onSelect?.(template);
    }, [onSelect]);

    return (
        <div style={S.container}>
            <div style={S.header}>
                <h3 style={S.title}>Sunucu Şablonları</h3>
                <p style={S.subtitle}>Hazır bir şablonla hızlıca başla</p>
            </div>

            <div style={S.grid}>
                {/* Blank server option */}
                <button
                    type="button"
                    style={{
                        ...S.card,
                        borderColor: selected === 'blank' ? '#5865f2' : 'rgba(255,255,255,0.06)',
                    }}
                    onClick={() => { setSelected('blank'); onSelect?.({ id: 'blank', name: 'Boş Sunucu', channels: ['genel'], roles: ['Admin', 'Üye'] }); }}
                >
                    <div style={{ ...S.iconWrap, backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FaPlus style={{ fontSize: 20, color: '#b5bac1' }} />
                    </div>
                    <span style={S.cardName}>Sıfırdan Oluştur</span>
                    <span style={S.cardDesc}>Boş bir sunucu</span>
                </button>

                {TEMPLATES.map(template => {
                    const Icon = template.icon;
                    const isSelected = selected === template.id;
                    return (
                        <button
                            key={template.id}
                            type="button"
                            style={{
                                ...S.card,
                                borderColor: isSelected ? template.color : 'rgba(255,255,255,0.06)',
                            }}
                            onClick={() => handleSelect(template)}
                        >
                            {isSelected && (
                                <FaCheck style={S.checkmark} />
                            )}
                            <div style={{ ...S.iconWrap, backgroundColor: `${template.color}15` }}>
                                <Icon style={{ fontSize: 20, color: template.color }} />
                            </div>
                            <span style={S.cardName}>{template.name}</span>
                            <span style={S.cardDesc}>{template.desc}</span>
                            <div style={S.channelPreview}>
                                {template.channels.slice(0, 3).map(c => (
                                    <span key={c} style={S.channelTag}>#{c}</span>
                                ))}
                                {template.channels.length > 3 && (
                                    <span style={S.moreTag}>+{template.channels.length - 3}</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const S = {
    container: {
        padding: 24, maxHeight: '70vh', overflowY: 'auto',
    },
    header: {
        textAlign: 'center', marginBottom: 20,
    },
    title: {
        fontSize: 22, fontWeight: 700, color: '#f2f3f5', margin: 0,
    },
    subtitle: {
        fontSize: 14, color: '#b5bac1', margin: '4px 0 0',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180, 1fr))',
        gap: 12,
    },
    card: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 8, padding: 16, borderRadius: 8,
        backgroundColor: '#2b2d31', border: '2px solid',
        cursor: 'pointer', textAlign: 'center',
        transition: 'all 0.2s', position: 'relative',
    },
    iconWrap: {
        width: 48, height: 48, borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    cardName: {
        fontSize: 14, fontWeight: 600, color: '#f2f3f5',
    },
    cardDesc: {
        fontSize: 11, color: '#b5bac1', lineHeight: 1.3,
    },
    channelPreview: {
        display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginTop: 4,
    },
    channelTag: {
        fontSize: 10, color: '#5865f2', backgroundColor: 'rgba(88,101,242,0.1)',
        padding: '2px 6px', borderRadius: 3,
    },
    moreTag: {
        fontSize: 10, color: '#4e5058',
    },
    checkmark: {
        position: 'absolute', top: 8, right: 8,
        fontSize: 14, color: '#57f287',
    },
};

export default memo(ServerTemplateGallery);
