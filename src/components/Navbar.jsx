"use client"

import { useState, useEffect, useRef } from "react"
import Logo from "../images/LOGO.png"
import { IoMenu, IoClose } from "react-icons/io5"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu()
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center md:pl-0 lg:pl-12">
            <img src={Logo || "/placeholder.svg"} alt="Logo" className="w-16 sm:w-20 h-auto " />
          </a>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`text-2xl ${isScrolled ? "text-black" : "text-black"}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
            </button>
          </div>
          <ul
            className={`md:flex md:items-center md:space-x-6 
              ${isOpen ? "flex" : "hidden"} 
              md:relative absolute inset-x-0 top-full flex-col md:flex-row
              bg-white md:bg-transparent shadow-lg md:shadow-none
              p-4 md:p-0 transition-all duration-300 ease-in-out
              max-h-[calc(100vh-80px)] overflow-y-auto md:max-h-full md:overflow-visible
              z-50
            `}
          >
            {["home", "features", "about", "team", "contact"].map((item) => (
              <li key={item} className="py-2 md:py-0 border-b md:border-b-0 border-gray-100 last:border-b-0">
                <a
                  href={`#${item}`}
                  onClick={closeMenu}
                  className={`block md:inline-block text-center md:text-left hover:text-blue-600 text-sm sm:text-base duration-300 ${
                    isScrolled ? "text-black" : "text-black"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMenu}></div>}
    </nav>
  )
}

export default Navbar

