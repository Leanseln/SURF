import { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import marcus from './images/marcus.jpg'
import juliet from './images/girl1.jpg'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <nav className="flex items-center justify-between px-4 sm:mx-auto container py-4">
          <h1 className="text-3xl font-bold">S.U.R.F</h1>

          {/* Burger Icon (Menu Button) */}
          <div className="sm:hidden flex items-center cursor-pointer" onClick={toggleMenu}>
            <IoMenu size={30} />
          </div>
          <ul
          className={`sm:flex flex flex-col sm:flex-row space-x-6 sm:space-x-8 absolute sm:static bg-fontblue sm:bg-transparent top-20 right-0 p-4 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
        >
          <li className="py-2">Home</li>
          <li className="py-2">Mission</li>
          <li className="py-2">Team</li>
          <li className="py-2">Contact</li>
        </ul>
        </nav>
        
        {/* Main content */}
        <main className="flex-grow">
          {/* Any main content goes here */}
        </main>

        {/* Mission Section */}
        <section className='items-center text-center flex flex-col sm:flex-row justify-evenly'>
          <div className='w-64 text-center my-5'>
            <div className='h-32 text-center items-center flex justify-center font-bold text-2xl'>Mission</div>
            <div className='py-4 px-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique atque voluptas exercitationem eos eaque animi hic assumenda qui minus.
            </div>
          </div>
          <div className='w-64 text-center'>
            <div className='h-32 text-center items-center flex justify-center font-bold text-2xl'>Vision</div>
            <div className='py-4 px-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique atque voluptas exercitationem eos eaque animi hic assumenda qui minus.
            </div>
          </div>
          <div className='w-64 text-center'>
            <div className='h-32 text-center items-center flex justify-center font-bold text-2xl'>Goals</div>
            <div className='py-4 px-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto similique atque voluptas exercitationem eos eaque animi hic assumenda qui minus.
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className='text-center'>
          <h1 className='text-2xl font-bold py-8'>Meet the team</h1>
          <div>
          <div className='sm:flex justify-center space-x-12 mb-4'>
            <div className='text-center items-center flex flex-col justify-center w-48'>
              <img src={juliet} alt="juliet" className='h-32 rounded-full' />
              <h1>Raymart Sarmiento</h1>
              <h2>Project Manager</h2>
            </div>
            <div className='text-center items-center flex flex-col justify-center w-48'>
              <img src={juliet} alt="juliet" className='h-32 rounded-full' />
              <h1>Leansel Nico Ortega</h1>
              <h2>Software Developer</h2>
            </div>
            <div className='text-center items-center flex flex-col justify-center w-48'>
              <img src={juliet} alt="juliet" className='h-32 rounded-full' />
              <h1>Marc Jayson Tosoc</h1>
              <h2>QA Developer</h2>
            </div>
            <div className='text-center items-center flex flex-col justify-center w-48'>
              <img src={juliet} alt="juliet" className='h-32 rounded-full' />
              <h1>John Lloyd Itliong</h1>
              <h2>Frontend Master</h2>
            </div>
            </div>
          <div className='flex justify-center space-x-12'>
            <div className='text-center items-center flex flex-col justify-center w-48'>
              <img src={juliet} alt="juliet" className='h-32 rounded-full' />
              <h1>Micholo Joaquin Buenafe</h1>
              <h2>Project Manager</h2>
            </div>
            <div className='text-center items-center flex flex-col justify-center w-48'>
              <img src={juliet} alt="juliet" className='h-32 rounded-full' />
              <h1>Marcus James Tapang</h1>
              <h2>Software Developer</h2>
            </div>
            <div className='text-center items-center flex flex-col justify-center w-48'>
              <img src={juliet} alt="juliet" className='h-32 rounded-full' />
              <h1>Juliet Bautista</h1>
              <h2>Marketing</h2>
            </div>
            <div className='text-center items-center flex flex-col justify-center w-48'>
              <img src={juliet} alt="juliet" className='h-32 rounded-full' />
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
