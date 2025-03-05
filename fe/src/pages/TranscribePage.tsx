import Transcribe from '../components/Transcribe/Transcribe';
import Navbar from '../components/Navbar/Navbar';
// import Footer from './components/Footer/Footer'; // gonna fix this up in the future
import Camera from '../components/Camera/Camera';
import GalleryCard from '../components/Gallery/GalleryCard';

function TranscribePage() {
  return (
    <>
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
                <GalleryCard title="" date="January 1st, 2024" description="" />
                <GalleryCard title="" date="January 1st, 2024" description="" />
                <GalleryCard title="" date="January 1st, 2024" description="" />
                <GalleryCard title="" date="January 1st, 2024" description="" />
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className='absolute bottom-0 w-screen'>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  )
}

export default TranscribePage
