import React from 'react';


import PropTypes from 'prop-types';


import {


import { useTranslation } from 'react-i18next';


FaTwitter, FaGithub, FaInstagram, FaYoutube, FaTwitch,


    FaGlobe, FaTimes, FaSave


} from 'react-icons/fa';





const ProfileEditForm = ({ editData, setEditData, extendedProfile, saveExtendedProfile, setIsEditing }) => {


    const { t } = useTranslation();





    return (


        <div className="profile-edit-form">


            <div className="edit-section">


                <h4>{t('hakkımda')}</h4>


                <textarea


                    value={editData.bio || extendedProfile?.bio || ''}


                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}


                    placeholder={t('kendin_hakkında_bir_şeyler_yaz')}


                    maxLength={500}


                />


            </div>





            <div className="edit-section">


                <h4>{t('zamirler')}</h4>


                <input


                    type="text"


                    value={editData.pronouns || extendedProfile?.pronouns || ''}


                    onChange={(e) => setEditData({ ...editData, pronouns: e.target.value })}


                    placeholder={t('example_pronouns')}





                    aria-label={t('profile.pronouns', 'Pronouns')}


                />


            </div>





            <div className="edit-section">


                <h4>{t('konum')}</h4>


                <input


                    type="text"


                    value={editData.location || extendedProfile?.location || ''}


                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}


                    placeholder={t('şehir_ülke')}





                    aria-label={t('profile.location', 'Location')}


                />


            </div>





            <div className="edit-section">


                <h4>{t('sosyal_baglantilar')}</h4>


                <div className="social-inputs">


                    <div className="social-input">


                        <FaTwitter />


                        <input


                            type="text"


                            value={editData.twitter_username || extendedProfile?.twitter_username || ''}


                            onChange={(e) => setEditData({ ...editData, twitter_username: e.target.value })}


                            placeholder={t('twitter_kullanıcı_adı')}





                            aria-label={t('profile.twitter', 'Twitter username')}


                        />


                    </div>


                    <div className="social-input">


                        <FaGithub />


                        <input


                            type="text"


                            value={editData.github_username || extendedProfile?.github_username || ''}


                            onChange={(e) => setEditData({ ...editData, github_username: e.target.value })}


                            placeholder={t('github_kullanıcı_adı')}





                            aria-label={t('profile.github', 'GitHub username')}


                        />


                    </div>


                    <div className="social-input">


                        <FaInstagram />


                        <input


                            type="text"


                            value={editData.instagram_username || extendedProfile?.instagram_username || ''}


                            onChange={(e) => setEditData({ ...editData, instagram_username: e.target.value })}


                            placeholder={t('instagram_kullanıcı_adı')}





                            aria-label={t('profile.instagram', 'Instagram username')}


                        />


                    </div>


                    <div className="social-input">


                        <FaYoutube />


                        <input


                            type="url"


                            value={editData.youtube_channel || extendedProfile?.youtube_channel || ''}


                            onChange={(e) => setEditData({ ...editData, youtube_channel: e.target.value })}


                            placeholder={t('youtube_kanal_url')}





                            aria-label={t('profile.youtube', 'YouTube channel URL')}


                        />


                    </div>


                    <div className="social-input">


                        <FaTwitch />


                        <input


                            type="text"


                            value={editData.twitch_username || extendedProfile?.twitch_username || ''}


                            onChange={(e) => setEditData({ ...editData, twitch_username: e.target.value })}


                            placeholder={t('twitch_kullanıcı_adı')}





                            aria-label={t('profile.twitch', 'Twitch username')}


                        />


                    </div>


                    <div className="social-input">


                        <FaGlobe />


                        <input


                            type="url"


                            value={editData.website_url || extendedProfile?.website_url || ''}


                            onChange={(e) => setEditData({ ...editData, website_url: e.target.value })}


                            placeholder={t('web_sitesi_url')}





                            aria-label={t('profile.website', 'Website URL')}


                        />


                    </div>


                </div>


            </div>





            <div className="edit-actions">


                <button className="btn-cancel" onClick={() => setIsEditing(false)}>


                    <FaTimes /> Cancel


                </button>


                <button className="btn-save" onClick={saveExtendedProfile}>


                    <FaSave /> Kaydet


                </button>


            </div>


        </div>


    );


};





ProfileEditForm.propTypes = {


    editData: PropTypes.array,


    setEditData: PropTypes.func,


    extendedProfile: PropTypes.object,


    saveExtendedProfile: PropTypes.func,


    setIsEditing: PropTypes.func,


};


export default ProfileEditForm;


