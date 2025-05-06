import React from 'react';

interface DashboardRowProps {
    profilePicture: string;
    children: React.ReactNode;
    isSelected?: boolean;
    onClick?: () => void;
}

const DashboardRow: React.FC<DashboardRowProps> = ({
    children,
}) => {

    return (
        <div style={{ flex: 1 }}>
            {children}
        </div>
    );
};

export default DashboardRow;