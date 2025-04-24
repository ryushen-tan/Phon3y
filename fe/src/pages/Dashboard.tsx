import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import DashboardRow from '../components/Dashboard/DashboardRow';

const Dashboard: React.FC = () => {
    return (
        <>
            <Navbar />
            <div 
                className='w-screen h-screen bg-[]'
                style={{
                    backgroundImage:
                        'linear-gradient(-135deg, #8B9CFF 0%, #D5DAF0 50%, #B2C1D2 100%)'
                }}
            >
                <div
                    className="flex w-screen h-[28vw] gap-5 justify-center items-center"
                >
                    <div>
                        <div className="absolute left-10 bottom-10 w-[63vw] h-[38vw] bg-black/10 bg-blur-xl rounded-[65px] border-2 border-white backdrop-blur-xl flex flex-col justify-center items-center fade-in">
                            <DashboardRow profilePicture={''} children={undefined}></DashboardRow>
                        </div>
                    </div>
                    <div>
                        <div className="absolute right-10 bottom-10 w-[30vw] h-[38vw] bg-black/10 bg-blur-xl rounded-[65px] border-2 border-white backdrop-blur-xl flex flex-col justify-center items-center fade-in">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;