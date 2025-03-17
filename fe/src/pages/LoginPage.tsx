import React from 'react';
import GoogleAuth from '../components/GoogleAuth/GoogleAuth';
import Overlay from '/overlay.png';
const LoginPage: React.FC = () => {
    return (
        <div 
            className="flex bg-white h-screen items-center"
        >
            <div className='w-full ml-10'>
                <img src={Overlay} alt="overlay" />

            </div>

            <div className='rounded-2xl w-[230vw] flex justify-center bg-blue-300'>
                <div className='flex flex-col justify-center items-center bg-red-300'>
                    <div className='flex flex-col items-start'>
                        <h2 className=" text-5xl font-semibold text-gray-500">Phone-In</h2>
                        <p className='font-semibold text-sm text-gray-500'>Sign in with Partner Account</p>
                    </div>

                    <GoogleAuth />

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
