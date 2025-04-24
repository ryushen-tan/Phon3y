import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import background from '/background.png';
import ShinyText from '../components/Text/ShinyText';
import Demo from '/mockup.png';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const demoRef = useRef<HTMLDivElement | null>(null);
    const [isDemoVisible, setIsDemoVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsDemoVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        const currentDemo = demoRef.current;
        if (currentDemo) {
            observer.observe(currentDemo);
        }

        return () => {
            if (currentDemo) {
                observer.unobserve(currentDemo);
            }
        };
    }, []);

    return (
        <> 
            <Navbar />
            <div className='overflow-x-hidden'>
                <div
                    className="flex flex-col items-center h-[150vw] w-screen bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'linear-gradient(-85deg,rgb(95, 101, 255) 0%, #D5DAF0 70%, #B2C1D2 100%)'
                    }}
                >
                    <div className='w-screen h-screen flex items-center flex-col'>
                        <img className="absolute w-[1301px] top-35 z-[1]" src={background} alt="background 3D assets" />
                        <div className="relative z-[1] flex justify-center items-center h-[100%] w-full">
                            <div className="w-[800px] h-[450px] bg-black/10 bg-blur-xl rounded-[65px] border-1 border-gray-400 backdrop-blur-xl flex flex-col justify-center items-center fade-in">
                                <div className='w-[111px] h-[26px] rounded-[10px] bg-[#D9D9D9] flex justify-center items-center'>
                                    <div className='w-[100px] h-[22px] rounded-[10px] bg-[#FFFFFF] flex justify-center items-center'>
                                        <h1 className='text-[#8E8E8E] text-[14px] font-harabara'>index <span className='text-[#2b2b2b]'>v1</span></h1>
                                    </div>
                                </div>
                                <h1 className='text-[#707070] text-[50px] font-harabara w-[55%] text-center leading-none mt-3'>
                                    Speech to <span className='text-white'>Phonetics</span> In Seconds
                                </h1>
                                <p className='text-white w-[35%] text-center text-[12px] font-poppins mt-5'>Transcribe speech into phonetics, analyze important data, all in one place.</p>
                                <Link to="/guest/transcribe">
                                    <button className='w-[130px] h-[38px] rounded-[10px] bg-gradient-to-r border-2 border-white from-[#999999] to-[#666666] mt-5 flex justify-center items-center hover:cursor-pointer'>
                                        <ShinyText text="Get Started" disabled={false} className="text-[12px] font-medium text-white hover:font-bold" speed={2} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='w-screen h-[400px] mt-40 bg-black/10 bg-blur-xl border-gray-200 backdrop-blur-lg flex flex-col justify-center items-center'>
                        <h1 className='bg-gradient-to-l from-gray-400 to-white bg-clip-text text-transparent text-[60px] font-semibold w-[35%] text-center'>Here's How  Phoney Works</h1>
                    </div>
                    <div
                        ref={demoRef}
                        className={`flex justify-center items-center transition-opacity duration-700 ${
                            isDemoVisible ? 'opacity-80' : 'opacity-0'
                        }`}
                    >
                        <div className='w-full flex justify-end'>
                            <img src={Demo} alt="Demo Img" className='w-[80%] mt-[20%]' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
