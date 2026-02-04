import Navbar from '../components/Navbar/Navbar';
import GalleryCard from '../components/Gallery/GalleryCard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setSelectedSession } from '../store/transcribeViewSlice';
import { removeSession } from '../store/sessionsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessions = useSelector((state: RootState) => state.sessions);

  const handleSelectSession = (sessionId: string) => {
    dispatch(setSelectedSession(sessionId));
    navigate('/transcribe');
  };

  const handleDeleteSession = (sessionId: string) => {
    dispatch(removeSession(sessionId));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Sessions</h1>
              <p className="mt-0.5 text-sm text-gray-500">Your saved recordings.</p>
            </div>
            <Link
              to="/transcribe"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              New recording
            </Link>
          </div>
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-16 text-center">
              <p className="text-sm text-gray-500">No sessions yet. Start a recording and save to see them here.</p>
              <Link
                to="/transcribe"
                className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go to transcription →
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sessions.map((session) => (
                <GalleryCard
                  key={session.id}
                  title={session.title}
                  date={session.date}
                  description={session.transcribedText || session.description}
                  onClick={() => handleSelectSession(session.id)}
                  onDelete={() => handleDeleteSession(session.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
