import React from 'react';
import GoogleAuth from '../components/GoogleAuth/GoogleAuth';

const LoginPage: React.FC = () => {
    return (
        <div 
            className="flex flex-col items-center justify-center h-screen"
            style={{
                backgroundImage:
                    'linear-gradient(-135deg, #8B9CFF 0%, #D5DAF0 50%, #B2C1D2 100%)'
            }}
        >
            <div className='w-120 h-160 rounded-2xl bg-white flex flex-col items-center justify-center'>
                <h2 className="mb-4 text-xl font-semibold text-gray-500">Login Page</h2>
                <GoogleAuth />
            </div>
        </div>
    );
};

export default LoginPage;
