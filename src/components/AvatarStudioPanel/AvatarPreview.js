import PropTypes from 'prop-types';

const AvatarPreview = ({ avatar, parts, mini = false }) => {
    const size = mini ? 80 : 200;
    const bgColor = parts.backgrounds?.find((b) => b.id === avatar.background)?.color || '#17191c';
    const skinColor = parts.skin_tones?.find((s) => s.id === avatar.skin_tone)?.color || '#D2B48C';
    const hairColor =
        parts.hair_colors?.find((h) => h.id === avatar.hair_color)?.color || '#1C1C1C';
    const eyeColor = parts.eye_colors?.find((e) => e.id === avatar.eye_color)?.color || '#8B4513';

    const containerStyle = {
        width: size,
        height: size,
        borderRadius: '50%',
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '4px solid #182135',
    };
    const faceStyle = {
        width: size * 0.7,
        height: size * 0.8,
        borderRadius:
            avatar.face_shape === 'round'
                ? '50%'
                : avatar.face_shape === 'oval'
                  ? '50% 50% 45% 45%'
                  : avatar.face_shape === 'square'
                    ? '10%'
                    : '50%',
        background: skinColor,
        position: 'relative',
    };
    const hairStyle = {
        position: 'absolute',
        top: -size * 0.1,
        left: '50%',
        transform: 'translateX(-50%)',
        width: size * 0.7,
        height: size * 0.3,
        background: hairColor,
        borderRadius: '50% 50% 0 0',
    };
    const eyesRowStyle = {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: size * 0.15,
    };
    const eyeStyle = {
        width: size * 0.1,
        height: size * 0.1,
        borderRadius: '50%',
        background: eyeColor,
    };
    const mouthStyle = {
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: size * 0.2,
        height: size * 0.05,
        background: avatar.mouth === 'smile' ? '#e8a0a0' : '#d4a0a0',
        borderRadius: avatar.mouth === 'smile' ? '0 0 50% 50%' : '4px',
    };
    const glassesStyle = {
        position: 'absolute',
        top: '32%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: size * 0.5,
        height: size * 0.12,
        border: '2px solid #333',
        borderRadius: '4px',
        background: 'transparent',
    };
    const crownStyle = {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: size * 0.2,
    };
    const catEarsStyle = {
        position: 'absolute',
        top: size * 0.05,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: size * 0.15,
    };

    return (
        <div aria-label="avatar preview" style={containerStyle}>
            <div style={faceStyle}>
                {/* Hair */}
                <div style={hairStyle} />
                {/* Eyes */}
                <div style={eyesRowStyle}>
                    <div style={eyeStyle} />
                    <div style={eyeStyle} />
                </div>
                {/* Mouth */}
                <div style={mouthStyle} />
            </div>
            {/* Accessories */}
            {avatar.accessory === 'glasses' && <div style={glassesStyle} />}
            {avatar.accessory === 'crown' && <div style={crownStyle}>👑</div>}
            {avatar.accessory === 'cat_ears' && <div style={catEarsStyle}>🐱</div>}
        </div>
    );
};

AvatarPreview.propTypes = {
    avatar: PropTypes.string,
    parts: PropTypes.array,
    mini: PropTypes.bool,
};
export default AvatarPreview;
