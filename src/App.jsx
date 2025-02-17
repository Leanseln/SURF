import { useRef, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import About from "./components/About";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./images/Home.png";
import SURF from "./video/SURF.mp4";

function Home() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch((error) => console.error("Error playing video:", error));
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <Navbar />
      <section
        id="home"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center md:space-x-20 container mx-auto px-4 py-8 md:py-0"
      >
        <div className="space-y-10 text-center md:text-left flex flex-col items-center lg:items-start">
          <div className="space-y-2 ">
            <h1 className="text-5xl md:text-8xl font-bold text-center lg:text-left text-blue-800">
              S.U.R.F
            </h1>
            <h2 className="text-md md:text-2xl text-center lg:text-left text-gray-700">
              AI-Powered Miniature <span className="text-orange-500">Boat</span> Prototype.
            </h2>
            <h3 className="text-gray-600 text-center lg:text-left text-sm md:text-md">
              Demonstrating the future of autonomous flood rescue technology.
            </h3>
          </div>
          <button
            onClick={handlePlayVideo}
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg py-3 px-12 text-white shadow-lg w-fit"
          >
            Watch Demo
          </button>
        </div>
        <div className="hidden lg:block mt-8 lg:mt-0">
          <img src={Hero || "/placeholder.svg"} alt="S.U.R.F Boat" width={500} height={300} />
        </div>
      </section>
      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-black rounded-lg p-4">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-2 right-2 text-white z-50 px-3 py-1 rounded-full"
            >
              ✕
            </button>
            <video
            ref={videoRef}
            src={SURF}
            controls
            className="w-[640px] h-[360px] max-w-full rounded-lg">
            </video>
          </div>
        </div>
      )}

      <main>
        <Features />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
