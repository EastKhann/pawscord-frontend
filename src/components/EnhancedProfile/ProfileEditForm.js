import React from 'react';
import {
    FaTwitter, FaGithub, FaInstagram, FaYoutube, FaTwitch,
    FaGlobe, FaTimes, FaSave
} from 'react-icons/fa';

const ProfileEditForm = ({ editData, setEditData, extendedProfile, saveExtendedProfile, setIsEditing }) => {
    return (
        <div className="profile-edit-form">
            <div className="edit-section">
                <h4>Hakkımda</h4>
                <textarea
                    value={editData.bio || extendedProfile?.bio || ''}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    placeholder="Kendin hakkında bir şeyler yaz..."
                    maxLength={500}
                />
            </div>

            <div className="edit-section">
                <h4>Zamirler</h4>
                <input
                    type="text"
                    value={editData.pronouns || extendedProfile?.pronouns || ''}
                    onChange={(e) => setEditData({ ...editData, pronouns: e.target.value })}
                    placeholder="ör: he/him, she/her"
                />
            </div>

            <div className="edit-section">
                <h4>Konum</h4>
                <input
                    type="text"
                    value={editData.location || extendedProfile?.location || ''}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    placeholder="Şehir, Ülke"
                />
            </div>

            <div className="edit-section">
                <h4>Sosyal Bağlantılar</h4>
                <div className="social-inputs">
                    <div className="social-input">
                        <FaTwitter />
                        <input
                            type="text"
                            value={editData.twitter_username || extendedProfile?.twitter_username || ''}
                            onChange={(e) => setEditData({ ...editData, twitter_username: e.target.value })}
                            placeholder="Twitter kullanıcı adı"
                        />
                    </div>
                    <div className="social-input">
                        <FaGithub />
                        <input
                            type="text"
                            value={editData.github_username || extendedProfile?.github_username || ''}
                            onChange={(e) => setEditData({ ...editData, github_username: e.target.value })}
                            placeholder="GitHub kullanıcı adı"
                        />
                    </div>
                    <div className="social-input">
                        <FaInstagram />
                        <input
                            type="text"
                            value={editData.instagram_username || extendedProfile?.instagram_username || ''}
                            onChange={(e) => setEditData({ ...editData, instagram_username: e.target.value })}
                            placeholder="Instagram kullanıcı adı"
                        />
                    </div>
                    <div className="social-input">
                        <FaYoutube />
                        <input
                            type="url"
                            value={editData.youtube_channel || extendedProfile?.youtube_channel || ''}
                            onChange={(e) => setEditData({ ...editData, youtube_channel: e.target.value })}
                            placeholder="YouTube kanal URL"
                        />
                    </div>
                    <div className="social-input">
                        <FaTwitch />
                        <input
                            type="text"
                            value={editData.twitch_username || extendedProfile?.twitch_username || ''}
                            onChange={(e) => setEditData({ ...editData, twitch_username: e.target.value })}
                            placeholder="Twitch kullanıcı adı"
                        />
                    </div>
                    <div className="social-input">
                        <FaGlobe />
                        <input
                            type="url"
                            value={editData.website_url || extendedProfile?.website_url || ''}
                            onChange={(e) => setEditData({ ...editData, website_url: e.target.value })}
                            placeholder="Web sitesi URL"
                        />
                    </div>
                </div>
            </div>

            <div className="edit-actions">
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                    <FaTimes /> İptal
                </button>
                <button className="btn-save" onClick={saveExtendedProfile}>
                    <FaSave /> Kaydet
                </button>
            </div>
        </div>
    );
};

export default ProfileEditForm;
