const AvatarPreview = ({ avatar, parts, mini = false }) => {
  const size = mini ? 80 : 200;
  const bgColor = parts.backgrounds?.find(b => b.id === avatar.background)?.color || '#36393f';
  const skinColor = parts.skin_tones?.find(s => s.id === avatar.skin_tone)?.color || '#D2B48C';
  const hairColor = parts.hair_colors?.find(h => h.id === avatar.hair_color)?.color || '#1C1C1C';
  const eyeColor = parts.eye_colors?.find(e => e.id === avatar.eye_color)?.color || '#8B4513';

  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '4px solid #40444b' }}>
      <div style={{
        width: size * 0.7, height: size * 0.8,
        borderRadius: avatar.face_shape === 'round' ? '50%' : avatar.face_shape === 'oval' ? '50% 50% 45% 45%' : avatar.face_shape === 'square' ? '10%' : '50%',
        background: skinColor, position: 'relative'
      }}>
        {/* Hair */}
        <div style={{ position: 'absolute', top: -size * 0.1, left: '50%', transform: 'translateX(-50%)', width: size * 0.7, height: size * 0.3, background: hairColor, borderRadius: '50% 50% 0 0' }} />
        {/* Eyes */}
        <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: size * 0.15 }}>
          <div style={{ width: size * 0.1, height: size * 0.1, borderRadius: '50%', background: eyeColor }} />
          <div style={{ width: size * 0.1, height: size * 0.1, borderRadius: '50%', background: eyeColor }} />
        </div>
        {/* Mouth */}
        <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', width: size * 0.2, height: size * 0.05, background: avatar.mouth === 'smile' ? '#e8a0a0' : '#d4a0a0', borderRadius: avatar.mouth === 'smile' ? '0 0 50% 50%' : '4px' }} />
      </div>
      {/* Accessories */}
      {avatar.accessory === 'glasses' && (
        <div style={{ position: 'absolute', top: '32%', left: '50%', transform: 'translateX(-50%)', width: size * 0.5, height: size * 0.12, border: '2px solid #333', borderRadius: '4px', background: 'transparent' }} />
      )}
      {avatar.accessory === 'crown' && (
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', fontSize: size * 0.2 }}>{'\uD83D\uDC51'}</div>
      )}
      {avatar.accessory === 'cat_ears' && (
        <div style={{ position: 'absolute', top: size * 0.05, left: '50%', transform: 'translateX(-50%)', fontSize: size * 0.15 }}>{'\uD83D\uDC31'}</div>
      )}
    </div>
  );
};

export default AvatarPreview;
