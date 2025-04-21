import React from 'react';
import GoogleAuth from '../components/GoogleAuth/GoogleAuth';
import Overlay from '/overlay.png';
import Logo from '/logo.png';
import { Link } from 'react-router-dom';
import { useSignIn } from './LogInHooks';

const LoginPage: React.FC = () => {
    const { handleSignIn } = useSignIn();
    return (
        <div 
            className="flex bg-white h-screen items-center"
        >
            <div className='w-full ml-10'>
                <Link to='/'>
                    <div className='w-[60px] h-[60px] hover:cursor-pointer hover:opacity-[80%] flex justify-center items-center rounded-full absolute bg-white top-20 left-17'>
                        <img className="w-[50px]" src={Logo} alt="" />
                    </div>
                </Link>
                <img src={Overlay} alt="overlay" />
            </div>
            <div className='rounded-2xl w-[160vw] flex justify-center'>
                <div className='flex flex-col justify-center gap-4'>
                    <div className='flex flex-col items-start'>
                        <h2 className="text-7xl font-semibold text-[#707070]">Phone-In</h2>
                        <p className='mt-15 font-semibold text-md text-[#707070]'>Sign in with Partner Account</p>
                    </div>
                    <div className='flex gap-10 items-start'>
                        <GoogleAuth />
                        <GoogleAuth />
                    </div>
                    <hr className='w-full border-[#D7D7D7] border border-2'/>
                    <form 
                        onSubmit={handleSignIn} 
                        className='flex flex-col gap-4'
                    >
                        <p className='font-semibold text-md text-[#707070]'>Sign in with your P3Y Account</p>
                        <input 
                            className='bg-[#F5F5F5] rounded-[10px] p-3 text-[#707070] font-regular text-sm' 
                            type="email" 
                            placeholder='username'
                            name='email' 
                        />
                        <input 
                            className='bg-[#F5F5F5] rounded-[10px] p-3 text-[#707070] font-regular text-sm' 
                            type="password" 
                            placeholder='password'
                            name='password' 
                        />
                        <button 
                            className='bg-[#8499B4] rounded-[10px] py-2 w-full h-[40px] text-white font-poppins font-bold hover: cursor-pointer hover:opacity-[80%]'
                            type='submit'
                            >
                                Get Started
                        </button>
                    </form>
                    <Link to='/signup'>
                        <p className='font-semibold text-sm text-[#707070] text-center absolute top-15 right-15'>Don't have an account? <span className='hover:cursor-pointer text-[#2b2b2b]'>Sign up</span></p>
                    </Link>
                    

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
