import { Routes, Route } from 'react-router-dom'; 
import LandingPage from './pages/LandingPage';
import TranscribePage from './pages/TranscribePage';
import LoginPage from './pages/LoginPage'; 
import SignUpPage from './pages/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:username/transcribe" element={<TranscribePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
