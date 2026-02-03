import Transcribe from '../components/Transcribe/Transcribe';
import Navbar from '../components/Navbar/Navbar';
import Camera from '../components/Camera/Camera';
import GalleryCard from '../components/Gallery/GalleryCard';
import TutorialModal from '../components/Transcribe/TutorialModal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setSelectedSession } from '../store/transcribeViewSlice';
import { useState, useEffect } from 'react';

const TUTORIAL_SEEN_KEY = 'phoney_tutorial_seen';

function TranscribePage() {
  const dispatch = useDispatch();
  const sessions = useSelector((state: RootState) => state.sessions);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(TUTORIAL_SEEN_KEY);
    if (!seen) setShowTutorial(true);
  }, []);

  const handleCloseTutorial = () => {
    localStorage.setItem(TUTORIAL_SEEN_KEY, '1');
    setShowTutorial(false);
  };

  return (
    <>
      <TutorialModal isOpen={showTutorial} onClose={handleCloseTutorial} />
      <div className='w-screen h-screen bg-[#F4F4F4]'>
        <Navbar />
        <div className='absolute bottom-8'>
        <div className='w-screen flex md:flex-row flex-col justify-center gap-3'>
          <div>
            <Transcribe />
          </div>
          <div className='flex flex-col gap-3'>
            <Camera />
            <div className="w-[47vw] overflow-x-auto">
              <div className="flex gap-3 w-max">
                {sessions.map((session) => (
                  <GalleryCard
                    key={session.id}
                    title={session.title}
                    date={session.date}
                    description={session.transcribedText || session.description}
                    onClick={() => dispatch(setSelectedSession(session.id))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className='absolute bottom-0 w-screen' />
      </div>
    </>
  )
}

export default TranscribePage
