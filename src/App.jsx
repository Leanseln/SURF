import { useState } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import { useForm, FormProvider } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from './components/ui/button';
import { FormControl, FormLabel, FormMessage } from './components/ui/form';

import juliet from './images/girl1.jpg';
import Juliet from './images/BAUTISTA.jpg';
import Raymart from './images/RAYMART.jpg';
import Lloyd from './images/LLOYD.jpg';
import Nico from './images/NICO.jpg';
import Jayson from './images/TOSOC.jpg';
import Jayann from './images/GERENTE.jpg';

import { CiLocationOn, CiPhone, CiMail  } from "react-icons/ci";
import { FaFacebook, FaInstagram } from "react-icons/fa";


function App() {
  const methods = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = methods;

  const toggleMenu = () => setIsOpen(!isOpen);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="h-full flex flex-col">
        <nav className="bg-white md:flex md:items-center md:justify-between container mx-auto border-none">
          {/* Menu */}
          <div className="p-5 flex justify-between items-center">
            <span className="text-2xl cursor-pointer">
              <h1 className="text-3xl font-bold">S.U.R.F</h1>
            </span>
            <span className="text-3xl cursor-pointer mx-2 md:hidden block" onClick={toggleMenu}>
              {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
            </span>
          </div>
          <ul className={`sm:flex flex-col sm:flex-row w-full sm:space-x-8 items-center absolute sm:static bg-fontblue sm:bg-transparent right-0 p-4 transition-all duration-500 ease-in-out transform ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"} md:opacity-100 md:flex md:justify-end md:transform-none`}>
            <li className="py-2"><a href="#" className="text-xl hover:text-cyan-500 duration-500">Home</a></li>
            <li className="py-2"><a href="#" className="text-xl hover:text-cyan-500 duration-500">Mission</a></li>
            <li className="py-2"><a href="#" className="text-xl hover:text-cyan-500 duration-500">Team</a></li>
            <li className="py-2"><a href="#" className="text-xl hover:text-cyan-500 duration-500">Contact</a></li>
          </ul>
        </nav>

        <main className="flex-grow container mx-auto">
          {/* Main content */}
        </main>

        {/* Mission Section */}
        <section className="items-center text-center flex flex-col sm:flex-row justify-evenly container mx-auto">
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
        <section className="text-center container mx-auto">
          <h1 className="text-2xl font-bold py-8">Meet the team</h1>
            <div className="flex flex-wrap justify-center items-center lg:space-x-12">
              <div className="text-center items-center flex flex-col justify-center w-48 mb-6">
                <img src={Raymart} alt="juliet" className="h-32 rounded-full" />
                <h1>Raymart Sarmiento</h1>
                <h2>Project Manager</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48 mb-6">
                <img src={Nico} alt="juliet" className="h-32 rounded-full" />
                <h1>Leansel Nico Ortega</h1>
                <h2>Software Developer</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48 mb-6">
                <img src={Jayson} alt="juliet" className="h-32 rounded-full" />
                <h1>Marc Jayson Tosoc</h1>
                <h2>QA Developer</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48 mb-6">
                <img src={Lloyd} alt="juliet" className="h-32 rounded-full" />
                <h1>John Lloyd Itliong</h1>
                <h2>Frontend Master</h2>
              </div>
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
                <img src={Juliet} alt="juliet" className="h-32 rounded-full" />
                <h1>Juliet Bautista</h1>
                <h2>Marketing</h2>
              </div>
              <div className="text-center items-center flex flex-col justify-center w-48">
                <img src={Jayann} alt="juliet" className="h-32 rounded-full" />
                <h1>Jay Ann Rose Gerente</h1>
                <h2>Marketing</h2>
              </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="items-center flex flex-col container mx-auto">
          <h1 className="text-2xl font-bold py-8">Get In Touch</h1>
          <div className="flex w-full px-20">
            <div className="w-2/3">
              <h1>Send us a Message</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <FormControl>
                      {/* Correct FormControl structure */}
                      <div>
                        <FormLabel>Your Name</FormLabel>
                        <Input
                          {...register('name', { required: "Name is required" })}
                          placeholder="Your Name"
                        />
                        <FormMessage>{errors.name?.message}</FormMessage>
                      </div>
                    </FormControl>
                  </div>
                  <div className="w-1/2">
                    <FormControl>
                      <div>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                          {...register('email', { required: "Email is required" })}
                          placeholder="Email"
                          type="email"
                        />
                        <FormMessage>{errors.email?.message}</FormMessage>
                      </div>
                    </FormControl>
                  </div>
                </div>

                <div className='w-1/2'>
                  <FormControl>
                    <div>
                      <FormLabel>Phone Number</FormLabel>
                      <div className="flex items-center border rounded-md">
                        <h1 className="text-sm pr-1 flex items-center">+63</h1>
                        <Input
                          type="tel"
                          {...register('phone', {
                            required: "Phone number is required",
                            pattern: { value: /^[9]{1}[0-9]{9}$/, message: "Invalid phone number" }
                          })}
                          className="border-none text-sm"
                        />
                      </div>
                      <FormMessage>{errors.phone?.message}</FormMessage>
                    </div>
                  </FormControl>
                </div>

                <div>
                  <FormControl>
                    <div>
                      <FormLabel>Message</FormLabel>
                      <textarea
                        className="border rounded-md p-2 w-full"
                        {...register('message', { required: "Message is required" })}
                        placeholder="Your message"
                      ></textarea>
                      <FormMessage>{errors.message?.message}</FormMessage>
                    </div>
                  </FormControl>
                </div>

                <Button type="submit" className="mt-4 w-full bg-blue-500 text-white">
                  Submit
                </Button>
              </form>
            </div>

            <div className="w-1/3">
              <h1>Contact Information</h1>
              <div>
                <div className='flex items-center'>
                  <CiLocationOn />
                  <h1>Biglang Awa St., 12th Avenue East Caloocan City</h1>
                </div>
                <div className='flex items-center'>
                  <CiPhone />
                  <h1>+63 917 956 1531</h1>
                </div>
                <div className='flex items-center'>
                  <CiMail  />
                  <h1>pioneer_bscs2021@gmail.com</h1>
                </div>
              </div>
              <div className='flex'>
                <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </FormProvider>
  );
}

export default App;
