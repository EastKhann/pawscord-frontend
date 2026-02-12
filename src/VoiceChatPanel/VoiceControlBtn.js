
const VoiceControlBtn = ({ icon, active, danger, special, subtle, small, isLeave, onClick, title, label }) => {
    const getBackground = () => {
        if (isLeave) return 'linear-gradient(135deg, #ed4245 0%, #c03537 100%)';
        if (danger && active) return 'rgba(240, 71, 71, 0.4)';
        if (danger) return 'rgba(240, 71, 71, 0.15)';
        if (special) return 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)';
        if (active) return 'rgba(67, 181, 129, 0.25)';
        if (subtle) return 'rgba(255, 255, 255, 0.05)';
        return 'rgba(255, 255, 255, 0.1)';
    };

    const getBorder = () => {
        if (isLeave) return 'none';
        if (danger && active) return '2px solid rgba(240, 71, 71, 0.6)';
        if (active) return '2px solid rgba(67, 181, 129, 0.5)';
        if (special) return '2px solid rgba(88, 101, 242, 0.5)';
        return '2px solid transparent';
    };

    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: getBackground(),
                border: getBorder(),
                borderRadius: isLeave ? '50%' : '12px',
                width: isLeave ? '48px' : (small ? '40px' : '48px'),
                height: isLeave ? '48px' : (small ? '40px' : '48px'),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: small ? '16px' : '20px',
                color: '#fff',
                transition: 'all 0.2s ease',
                boxShadow: isLeave
                    ? '0 4px 15px rgba(237, 66, 69, 0.4)'
                    : (active ? '0 2px 10px rgba(67, 181, 129, 0.3)' : 'none'),
                transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = isLeave
                    ? '0 6px 20px rgba(237, 66, 69, 0.6)'
                    : '0 4px 15px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = isLeave
                    ? '0 4px 15px rgba(237, 66, 69, 0.4)'
                    : (active ? '0 2px 10px rgba(67, 181, 129, 0.3)' : 'none');
            }}
        >
            <span>{icon}</span>
            {label && (
                <span style={{ fontSize: '9px', marginTop: '2px', fontWeight: 600 }}>{label}</span>
            )}
        </button>
    );
};

export default VoiceControlBtn;
