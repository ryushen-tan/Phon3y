import { Routes, Route } from 'react-router-dom';  // added import
import LandingPage from './pages/LandingPage';
import TranscribePage from './pages/TranscribePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:username/transcribe" element={<TranscribePage />} />
    </Routes>
  );
}

export default App;
