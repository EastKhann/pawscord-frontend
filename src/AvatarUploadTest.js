/**
 * 📸 AVATAR UPLOAD TEST PAGE
 * Test için basit bir sayfa
 */

import React, { useState } from 'react';
import toast from './utils/toast';
import AvatarCropper from './components/AvatarCropper';
import { getApiBase } from './utils/apiEndpoints';

function AvatarUploadTest() {
  const [showCropper, setShowCropper] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

  const handleAvatarUpload = async (croppedBlob) => {
    console.log('📸 Avatar cropped!', croppedBlob);

    // FormData oluştur
    const formData = new FormData();
    formData.append('avatar', croppedBlob, 'avatar.png');

    try {
      // TODO: Token'ı context'ten al
      const token = localStorage.getItem('access_token');

      const response = await fetch(`${getApiBase()}/users/update_profile/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Avatar uploaded!', data);

        // Preview için blob URL oluştur
        const blobUrl = URL.createObjectURL(croppedBlob);
        setUploadedAvatar(blobUrl);

        toast.success('✅ Profil fotoğrafı güncellendi!');
        setShowCropper(false);
      } else {
        const error = await response.json();
        console.error('❌ Upload failed:', error);
        toast.error(`❌ Hata: ${error.error || 'Upload failed'}`);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      toast.error('❌ Bağlantı hatası!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#36393f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px'
    }}>
      <h1 style={{ color: 'white' }}>📸 Avatar Cropper Test</h1>

      {uploadedAvatar && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#b9bbbe', marginBottom: '10px' }}>Yüklenen Avatar:</p>
          <img
            src={uploadedAvatar}
            alt="Uploaded avatar"
            style={{
              width: 128,
              height: 128,
              borderRadius: '50%',
              border: '3px solid #5865f2'
            }}
          />
        </div>
      )}

      <button
        onClick={() => setShowCropper(true)}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#5865f2',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#4752c4';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#5865f2';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        📸 Profil Fotoğrafını Değiştir
      </button>

      {showCropper && (
        <AvatarCropper
          onCropComplete={handleAvatarUpload}
          onCancel={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}

export default AvatarUploadTest;



