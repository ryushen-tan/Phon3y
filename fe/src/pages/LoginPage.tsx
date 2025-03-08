import React from 'react';
import GoogleAuth from '../components/GoogleAuth/GoogleAuth';

const LoginPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="mb-4 text-xl font-semibold">Login Page</h2>
            <GoogleAuth />
        </div>
    );
};

export default LoginPage;
