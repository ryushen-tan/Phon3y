import Navbar from '../components/Navbar/Navbar';
import DashboardRow from '../components/Dashboard/DashboardRow';
import GalleryCard from '../components/Gallery/GalleryCard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setSelectedSession } from '../store/transcribeViewSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessions = useSelector((state: RootState) => state.sessions);

    const handleSelectSession = (sessionId: string) => {
        dispatch(setSelectedSession(sessionId));
        navigate('/transcribe');
    };

    return (
        <>
            <Navbar />
            <div 
                className='w-screen h-screen'
                style={{
                    backgroundImage:
                        'linear-gradient(-135deg, #8B9CFF 0%, #D5DAF0 50%, #B2C1D2 100%)'
                }}
            >
                <div
                    className="flex w-screen h-[28vw] gap-5 justify-center items-center"
                >
                    <div>
                        <div className="absolute left-10 bottom-10 w-[63vw] h-[38vw] bg-black/10 bg-blur-xl rounded-[30px] border-2 border-white backdrop-blur-xl flex flex-col justify-center items-center fade-in overflow-auto p-4">
                            <DashboardRow profilePicture="">
                                <div className="w-full flex flex-wrap gap-3 justify-center">
                                    {sessions.length === 0 ? (
                                        <p className="text-white/80 font-poppins text-sm">No previous sessions yet. Start a recording and save to see them here.</p>
                                    ) : (
                                        sessions.map((session) => (
                                            <GalleryCard
                                                key={session.id}
                                                title={session.title}
                                                date={session.date}
                                                description={session.transcribedText || session.description}
                                                onClick={() => handleSelectSession(session.id)}
                                            />
                                        ))
                                    )}
                                </div>
                            </DashboardRow>
                        </div>
                    </div>
                    <div>
                        <div className="absolute right-10 bottom-10 w-[30vw] h-[38vw] bg-black/10 bg-blur-xl rounded-[30px] border-2 border-white backdrop-blur-xl flex flex-col justify-center items-center fade-in">
                            <div 
                                className='w-full h-[50%] p-5'
                            >
                                <Link 
                                    to="/transcribe"
                                >
                                    <button
                                        className='w-full p-2 h-[40px] border-2 border-white rounded-[10px] text-white font-poppins font-semibold hover:cursor-pointer hover:opacity-[80%]'
                                    >
                                        New Patient
                                    </button>
                                </Link>
                            </div>
                            <div 
                                className='w-full h-[50%]'
                            >

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;