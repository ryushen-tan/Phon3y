import React from 'react';

interface DashboardRowProps {
    profilePicture: string;
    children: React.ReactNode;
    isSelected?: boolean;
    onClick?: () => void;
}

const DashboardRow: React.FC<DashboardRowProps> = ({
    profilePicture,
    children,
    isSelected = false,
    onClick,
}) => {
    return (
        <div 
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'background-color 0.2s ease',
            }}
            onClick={onClick}
        >
            <div
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    marginRight: '16px',
                    flexShrink: 0,
                }}
            >
                <img 
                    src={profilePicture} 
                    alt="Profile"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div style={{ flex: 1 }}>
                {children}
            </div>
        </div>
    );
};

export default DashboardRow;