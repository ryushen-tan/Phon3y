import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import background from '/background.png';
import ShinyText from '../components/Text/ShinyText';
import Footer from '../components/Footer/Footer';
import Demo from '/demo.png';
import { Link } from 'react-router-dom';
// import GalleryCard from '../components/Gallery/GalleryCard';

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
                            'linear-gradient(-135deg, #8B9CFF 0%, #D5DAF0 50%, #B2C1D2 100%)'
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
                    <div className='w-screen h-[400px] mt-40 bg-black/10 bg-blur-xl border-1 border-gray-200 backdrop-blur-lg flex flex-col justify-center items-center'>
                        <h1 className='text-white text-[34px] font-medium'>What's our Phoney Mission?</h1>
                        <div className='flex gap-24 text-[#2b2b2b]'>
                            {/* <div className='w-[400px] bg-black/10 h-[300px] bg-white rounded-md flex justify-center items-center font-semibold text-[20px]'>
                                <img src="" alt="" />
                                <h2> "To help people lol" -ryu</h2>
                            </div>
                            <div className='w-[400px] h-[300px] bg-white rounded-md flex justify-center items-center font-semibold text-[20px] text-center p-3'>
                                <h2> "To help people people communicate and build a database for SLP" -ryu</h2>
                            </div> */}
                        </div>

                    </div>
                    <div
                        ref={demoRef}
                        className={`flex justify-center items-center transition-opacity duration-700 ${
                            isDemoVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img src={Demo} alt="Demo Img" className='w-[60%] mt-[20vw]' />
                    </div>
                </div>
                
                <Footer />
            </div>
        </>
    );
}

export default LandingPage;
