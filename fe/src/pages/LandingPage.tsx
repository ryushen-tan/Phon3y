import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ShinyText from '../components/Text/ShinyText';
import Spline from '@splinetool/react-spline';
import Demo from '/mockup.png';
import { Link } from 'react-router-dom';
import { useLandingPage } from './LandingPageHooks';

const LandingPage: React.FC = () => {
    const demoRef = useRef<HTMLDivElement | null>(null);
    const [isDemoVisible, setIsDemoVisible] = useState(false);
    const { destinationUrl } = useLandingPage(); // Assuming you have a useNavbar hook to get the destination URL

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
                    <div className="w-screen h-screen flex flex-col items-center">

                    {/* Background Light Layer with Spline Scene */}
                    <div className="absolute pointer-events-none z-[2] w-[98.5vw] h-screen bg-white opacity-[10%] rounded-[30px] border-2 border-white">
                    </div>
                    <div className='absolute pointer-events-auto z-[2] w-[45.5vw] h-screen opacity-[20%] rounded-[30px] right-0'>
                        <Spline scene="https://prod.spline.design/2hCFzkawcQb7Q0Cj/scene.splinecode" />
                        <div className='absolute bg-[#8187FC] w-[200px] h-[100px] bottom-0 right-0 rounded-[30px]'></div>
                    </div>
                    {/* Foreground Content Container */}
                    <div className="relative z-[1] flex justify-center items-center w-full h-full">
                        <div className="w-[900px] h-[550px] bg-black/10 backdrop-blur-xl rounded-[65px] border border-white/30 flex flex-col justify-center items-center fade-in">

                            {/* Version Tag */}
                            <div className="w-[111px] h-[26px] bg-[#D9D9D9] rounded-[10px] flex justify-center items-center">
                                <div className="w-[100px] h-[22px] bg-white rounded-[10px] flex justify-center items-center">
                                    <h1 className="text-[#8E8E8E] text-[14px] font-harabara">
                                    index <span className="text-[#2b2b2b]">v1</span>
                                    </h1>
                                </div>
                            </div>

                            {/* Hero Title */}
                            <h1 className="text-[#707070] text-[50px] font-harabara w-[55%] text-center leading-none mt-3">
                                Speech to <span className="text-white">Phonetics</span> In Seconds
                            </h1>

                            {/* Subtext */}
                            <p className="text-white w-[35%] text-center text-[12px] font-poppins mt-5">
                                Transcribe speech into phonetics, analyze important data, all in one place.
                            </p>

                            {/* CTA Button */}
                            <Link to={destinationUrl}>
                                <button 
                                    className="w-[130px] h-[38px] mt-5 bg-gradient-to-r from-[#999999] to-[#666666] border-2 border-white rounded-[10px] flex justify-center items-center hover:cursor-pointer relative z-10">
                                    <ShinyText
                                        text="Get Started"
                                        disabled={false}
                                        className="text-[12px] font-medium text-white hover:font-bold z-[10] "
                                        speed={2}
                                    />
                                </button>
                            </Link>

                        </div>
                    </div>

                    </div>
                    <div className='w-full flex flex-row justify-center items-center mt-[10%] gap-8'>
                        <h1 
                            className='text-white opacity-80 text-[128px] track-tighter top-[80%] left-[10%]'
                        >
                            spiːtʃ
                        </h1>
                        <h1 
                            className='text-white opacity-80 text-[128px] track-tighter top-[90%] left-[45%]'
                        >
                            fɔːr
                        </h1>
                        <h1 
                            className='text-white opacity-80 text-[128px] track-tighter top-[100%] left-[70%]'
                        >
                            ˈevriwʌn
                        </h1>
                    </div>
                    
                    <div
                        ref={demoRef}
                        className={`flex justify-center items-center transition-opacity duration-700 ${
                            isDemoVisible ? 'opacity-80' : 'opacity-0'
                        }`}
                    >
                        <div className='w-full flex justify-center'>
                            <img src={Demo} alt="Demo Img" className='w-[80%] mt-[10%]' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;
