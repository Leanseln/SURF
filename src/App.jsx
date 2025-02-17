import Navbar from "./components/Navbar";
import Features from "./components/Features";
import About from "./components/About";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./images/Home.png";

function Home() {
 
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
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg py-3 px-12 text-white shadow-lg w-fit"
          >
            Watch Demo
          </button>
        </div>
        <div className="hidden lg:block mt-8 lg:mt-0">
          <img src={Hero || "/placeholder.svg"} alt="S.U.R.F Boat" width={500} height={300} />
        </div>
      </section>
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
