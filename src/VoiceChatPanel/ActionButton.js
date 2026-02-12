
const ActionButton = ({ icon, onClick, title, bgColor = 'rgba(0, 0, 0, 0.7)' }) => {
    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: bgColor,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#fff',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            }}
        >
            {icon}
        </button>
    );
};

export default ActionButton;
