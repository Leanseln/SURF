import { useState } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import juliet from './images/girl1.jpg';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <nav className="bg-white md:flex md:items-center md:justify-between container mx-auto border-none">
          <div className="p-5 flex justify-between items-center">
            <span className="text-2xl cursor-pointer">
              <h1 className="text-3xl font-bold">S.U.R.F</h1>
            </span>

            <span
              className="text-3xl cursor-pointer mx-2 md:hidden block"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <IoClose size={30} />
              ) : (
                <IoMenu size={30} /> 
              )}
            </span>
          </div>

          <ul
            className={`sm:flex flex-col sm:flex-row w-full sm:space-x-8 items-center absolute sm:static bg-fontblue sm:bg-transparent right-0 p-4 transition-all duration-500 ease-in-out transform ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            } md:opacity-100 md:flex md:justify-end md:transform-none`}
          >
            <li className="py-2">
              <a href="#" className="text-xl hover:text-cyan-500 duration-500">
                Home
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-xl hover:text-cyan-500 duration-500">
                Mission
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-xl hover:text-cyan-500 duration-500">
                Team
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-xl hover:text-cyan-500 duration-500">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-grow">
          {/* Any main content goes here */}
        </main>

        {/* Mission Section */}
        <section className="items-center text-center flex flex-col sm:flex-row justify-evenly">
          <div className="w-64 text-center my-5">
            <div className="h-32 text-center items-center flex justify-center font-bold text-2xl">Mission</div>
            <div className="py-4 px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique atque voluptas exercitationem eos eaque animi hic assumenda qui minus.
            </div>
          </div>
          <div className="w-64 text-center">
            <div className="h-32 text-center items-center flex justify-center font-bold text-2xl">Vision</div>
            <div className="py-4 px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique atque voluptas exercitationem eos eaque animi hic assumenda qui minus.
            </div>
          </div>
          <div className="w-64 text-center">
            <div className="h-32 text-center items-center flex justify-center font-bold text-2xl">Goals</div>
            <div className="py-4 px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique atque voluptas exercitationem eos eaque animi hic assumenda qui minus.
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="text-center">
          <h1 className="text-2xl font-bold py-8">Meet the team</h1>
          <div>
            <div className="flex flex-wrap justify-center items-center lg:space-x-12">
              <div className="text-center items-center flex flex-col justify-center w-48 mb-6">
                <img src={juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>Raymart Sarmiento</h1>
                <h2>Project Manager</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48 mb-6">
                <img src={juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>Leansel Nico Ortega</h1>
                <h2>Software Developer</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48 mb-6">
                <img src={juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>Marc Jayson Tosoc</h1>
                <h2>QA Developer</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48 mb-6">
                <img src={juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>John Lloyd Itliong</h1>
                <h2>Frontend Master</h2>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center lg:space-x-12">
              <div className="text-center items-center flex flex-col justify-center w-48">
                <img src={juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>Micholo Joaquin Buenafe</h1>
                <h2>Project Manager</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48">
                <img src={juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>Marcus James Tapang</h1>
                <h2>Software Developer</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48">
                <img src={juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>Juliet Bautista</h1>
                <h2>Marketing</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48">
                <img src={juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>Jay Ann Rose Gerente</h1>
                <h2>Marketing</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h1>Contact Us</h1>
        </section>
      </div>
    </>
  );
}

export default App;
