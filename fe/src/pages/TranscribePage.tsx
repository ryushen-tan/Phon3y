import Transcribe from '../components/Transcribe/Transcribe';
import Navbar from '../components/Navbar/Navbar';
import Camera from '../components/Camera/Camera';
import GalleryCard from '../components/Gallery/GalleryCard';
import Footer from '../components/Footer/Footer';
import TutorialModal from '../components/Transcribe/TutorialModal';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setSelectedSession, clearSelectedSession } from '../store/transcribeViewSlice';
import { removeSession } from '../store/sessionsSlice';
import { useState } from 'react';

function TranscribePage() {
  const dispatch = useDispatch();
  const sessions = useSelector((state: RootState) => state.sessions);
  const selectedSessionId = useSelector((state: RootState) => state.transcribeView.selectedSessionId);
  const [showTutorial, setShowTutorial] = useState(true);

  const handleDeleteSession = (sessionId: string) => {
    dispatch(removeSession(sessionId));
    if (selectedSessionId === sessionId) {
      dispatch(clearSelectedSession());
    }
  };

  const handleCloseTutorial = () => setShowTutorial(false);

  return (
    <>
      <TutorialModal isOpen={showTutorial} onClose={handleCloseTutorial} />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Transcription</h1>
            <p className="mt-0.5 text-sm text-gray-500">Record speech and save sessions.</p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Left: Transcribe panel */}
            <section className="flex-shrink-0">
              <Transcribe />
            </section>

            {/* Right: Camera + Saved sessions */}
            <section className="flex min-w-0 flex-1 flex-col gap-6">
              <div>
                <h2 className="mb-3 text-sm font-medium text-gray-700">Live view</h2>
                <Camera />
              </div>
              <div>
                <h2 className="mb-3 text-sm font-medium text-gray-700">Saved sessions</h2>
                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-4">
                    {sessions.length === 0 ? (
                      <div className="flex min-h-[140px] w-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white/50 p-4 text-center text-sm text-gray-500">
                        No saved sessions yet. Record and save to see them here.
                      </div>
                    ) : (
                      sessions.map((session) => (
                        <GalleryCard
                          key={session.id}
                          title={session.title}
                          date={session.date}
                          description={session.transcribedText || session.description}
                          onClick={() => dispatch(setSelectedSession(session.id))}
                          onDelete={() => handleDeleteSession(session.id)}
                          isSelected={selectedSessionId === session.id}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default TranscribePage;
