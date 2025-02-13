import Transcribe from './components/Transcribe/Transcribe';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Camera from './components/Camera/Camera';
function App() {

  return (
    <>
      <div className='w-screen h-screen bg-[#F4F4F4]'>
        <Navbar />
        <div className='absolute bottom-8'>
        <div className='w-screen flex justify-center gap-3'>
          <div className=''>
            <Transcribe />
          </div>
          <div>
            <Camera />
          </div>
        </div>
        </div>
        <div className='absolute bottom-0 w-screen'>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
