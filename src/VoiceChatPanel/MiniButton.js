
const MiniButton = ({ icon, active, danger, onClick, title }) => {
    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: active
                    ? 'rgba(88, 101, 242, 0.8)'
                    : danger
                        ? 'rgba(237, 66, 69, 0.8)'
                        : 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.2s ease',
            }}
        >
            {icon}
        </button>
    );
};

export default MiniButton;
