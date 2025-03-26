import { useState } from "react"
import Navbar from "./components/Navbar"
import Features from "./components/Features"
import About from "./components/About"
import Team from "./components/Team"
import MobileApp from "./components/MobileApp"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./images/hero_section.png"

function Home() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 via-indigo-100 to-purple-400 relative overflow-hidden">
      <Navbar />
      <section id="home" className="relative min-h-screen flex items-center pt-16 pb-8 px-4 sm:px-6 lg:px-0 z-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 lg:pl-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-800 mb-4 sm:mb-6 tracking-tight leading-none">
                S.U.R.F
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-2">
                Supply Unit for Rescue and Floods
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 mx-auto lg:mx-0 max-w-xl">
                An AI-Powered Miniature <span className="text-orange-500 font-medium">Boat</span> Prototype designed to deliver essential supplies and assist in 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium"> rescue operations during floods</span>.
              </p>
              <button
                onClick={handlePlayVideo}
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg py-2 sm:py-3 px-6 sm:px-8 text-white shadow-lg text-sm sm:text-base md:text-lg font-medium flex items-center mx-auto lg:mx-0 group"
              >
                <span>Watch Teaser</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:block w-full lg:w-1/2 mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:h-full lg:pt-20">
              <img
                src={Hero || "/placeholder.svg"}
                alt="S.U.R.F Boat"
                className="w-full h-auto md:max-h-96 lg:max-h-none lg:h-full object-contain mx-auto lg:mx-0 lg:object-right"
              />
            </div>
          </div>
        </div>
      </section>
      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="relative bg-black rounded-lg p-2 sm:p-4 w-full max-w-md md:max-w-xl lg:max-w-5xl">
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-2 right-1 sm:top-2 sm:right-2 text-white z-50 px-2 py-1 rounded-full text-xs sm:text-sm"
            >
              ✕
            </button>
            <iframe
              src={`https://player.vimeo.com/video/1064943286?autoplay=1`}  
              width="100%"
              height="100%"
              style={{ aspectRatio: "16/9" }}
              allow="autoplay; fullscreen"
              className="rounded-lg"
              title="S.U.R.F Teaser"
            ></iframe>
          </div>
        </div>
      )}
      <main className="z-10">
        <About />
        <Features />
        <MobileApp />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Home