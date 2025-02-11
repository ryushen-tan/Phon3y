import Transcribe from './components/Transcribe/Transcribe';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
      <div className='w-screen h-screen bg-[#F3F7FF]'>
        <Navbar />
        <div className='absolute bottom-10 left-8 '>
          <Transcribe />
        </div>
        <div className='absolute bottom-0 w-screen'>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
