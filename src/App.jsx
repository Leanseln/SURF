"use client"

import { useRef, useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Features from "./components/Features"
import About from "./components/About"
import Team from "./components/Team"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./images/hero_section.png"

function Home() {
  const SURF_TEASER_URL = "https://drive.google.com/file/d/1sdh9cWEnpn3L8SM6wFOpTHFOL_q2QIFc/preview"
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch((error) => console.error("Error playing video:", error))
    }
  }, [isPlaying])

  return (
    <div id="home" className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 via-indigo-100 to-purple-400 text-white relative overflow-hidden">
      <Navbar />
      <section className="relative min-h-screen flex items-center pt-16 pb-8 px-4 sm:px-6 lg:px-0 z-10">
        <div className="w-full max-w-7xl mx-auto lg:pr-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 md:pl-0 lg:pl-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-800 mb-4">S.U.R.F</h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-2">
                Supply Unit for Rescue and Floods
              </h2>
              <h3 className="text-base sm:text-lg text-gray-600 mb-6">
                AI-Powered Miniature <span className="text-orange-500">Boat</span> Prototype.
              </h3>
              <button
                onClick={handlePlayVideo}
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg py-2 px-6 sm:px-8 text-white shadow-lg text-sm sm:text-base"
              >
                Watch Teaser
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full pt-20">
          <img
            src={Hero || "/placeholder.svg"}
            alt="S.U.R.F Boat"
            className="w-full h-full object-contain object-right"
          />
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
              src={SURF_TEASER_URL}
              width="100%"
              height="100%"
              style={{ aspectRatio: "16/9" }}
              allow="autoplay"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
      <main className="z-10">
        <Features />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Home
