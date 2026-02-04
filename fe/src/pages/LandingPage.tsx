import Navbar from '../components/Navbar/Navbar';
import ShinyText from '../components/Text/ShinyText';
import Spline from '@splinetool/react-spline';
import Footer from '../components/Footer/Footer';

const LandingPage: React.FC = () => {
  const scrollToDemo = () => {
    document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden">
        {/* Section 1: Hero (full viewport, original layout) */}
        <div
          className="flex flex-col items-center w-screen bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(-85deg, rgb(95, 101, 255) 0%, #D5DAF0 70%, #B2C1D2 100%)'
          }}
        >
          <div className="relative w-screen h-screen flex flex-col items-center">
            <div className="absolute pointer-events-none z-[2] w-[98.5vw] h-screen bg-white opacity-[10%] rounded-[30px] border-2 border-white" />
            <img className="absolute left-1/2 top-1/2 z-[1] w-[1301px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" src="/background.png" alt="background 3D assets" />
            <div className="absolute pointer-events-auto z-[2] w-[45.5vw] h-screen opacity-[60%] rounded-[30px] right-0">
              <div className="absolute bg-[#8187FC] w-[200px] h-[100px] bottom-0 right-0 rounded-[30px]" />
            </div>
            <div className="relative z-[1] flex justify-center items-center w-full h-full">
              <div className="w-[900px] h-[550px] bg-black/10 backdrop-blur-xl rounded-[65px] border border-white/30 flex flex-col justify-center items-center fade-in">
                <div className="w-[111px] h-[26px] bg-[#D9D9D9] rounded-[10px] flex justify-center items-center">
                  <div className="w-[100px] h-[22px] bg-white rounded-[10px] flex justify-center items-center">
                    <h1 className="text-[#8E8E8E] text-[14px] font-harabara">
                      index <span className="text-[#2b2b2b]">v1</span>
                    </h1>
                  </div>
                </div>
                <h1 className="text-[#707070] text-[50px] font-harabara w-[55%] text-center leading-none mt-3">
                  Speech to <span className="text-white">Phonetics</span> In Seconds
                </h1>
                <p className="text-white w-[35%] text-center text-[12px] font-poppins mt-5">
                  Transcribe speech into phonetics, analyze important data, all in one place.
                </p>
                <button
                  type="button"
                  onClick={scrollToDemo}
                  className="w-[130px] h-[38px] mt-5 bg-gradient-to-r from-[#999999] to-[#666666] border-2 border-white rounded-[10px] flex justify-center items-center hover:cursor-pointer relative z-10"
                >
                  <ShinyText
                    text="See Demo"
                    disabled={false}
                    className="text-[12px] font-medium text-white hover:font-bold z-[10]"
                    speed={2}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Video – full-page section (scroll down to see) */}
        <section
          id="video"
          className="w-screen min-h-screen flex flex-col items-center justify-center px-4 py-16"
          style={{
            backgroundImage:
              'linear-gradient(-85deg, rgb(95, 101, 255) 0%, #D5DAF0 70%, #B2C1D2 100%)'
          }}
        >
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-center text-2xl font-semibold text-white/95 mb-8 font-poppins">
              See it in action
            </h2>
            <div className="overflow-hidden shadow-2xl backdrop-blur-sm">
              <video
                src="/p3y.mp4"
                className="w-full aspect-video object-contain"
                controls
                playsInline
                muted={false}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
