import Transcribe from './components/Transcribe/Transcribe';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Camera from './components/Camera/Camera';
import GalleryCard from './components/Gallery/GalleryCard';
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
          <div className='flex flex-col gap-3'>
            <Camera />
            <div className="w-240 overflow-x-auto">
              <div className="flex gap-3 w-max">
                <GalleryCard title="Test Card" date="January 1st, 2024" description="this is just a test" />
                <GalleryCard title="Test Card" date="January 1st, 2024" description="this is just a test" />
                <GalleryCard title="Test Card" date="January 1st, 2024" description="this is just a test" />
                <GalleryCard title="Test Card" date="January 1st, 2024" description="this is just a test" />
              </div>
            </div>
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
