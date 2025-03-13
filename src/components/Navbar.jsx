"use client"

import { useState, useEffect, useRef } from "react"
import Logo from "../images/logogo.png"
import { IoMenu, IoClose } from "react-icons/io5"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const navRef = useRef(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  // Set up intersection observer to detect which section is in view
  useEffect(() => {
    const sections = ["home", "features", "about", "team", "contact"]
    const sectionElements = sections.map((section) => document.getElementById(section))

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionElements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => {
      sectionElements.forEach((element) => {
        if (element) observer.unobserve(element)
      })
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="flex justify-between items-center">
          <a 
            href="/" 
            className="flex items-center group transition-transform duration-300 hover:scale-105"
          >
            <img 
              src={Logo || "/placeholder.svg"} 
              alt="Logo" 
              className="w-10 md:w-12 h-auto" 
            />
          </a>
          
          <div className="md:hidden flex">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? "text-gray-800 hover:bg-gray-100" 
                  : "text-gray-900 hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
          
          <ul
            className={`md:flex md:items-center md:space-x-8 
              ${isOpen ? "flex" : "hidden"} 
              md:relative absolute inset-x-0 top-full flex-col md:flex-row
              bg-white/95 md:bg-transparent shadow-xl md:shadow-none
              p-6 md:p-0 rounded-b-xl md:rounded-none
              max-h-[calc(100vh-80px)] overflow-y-auto md:max-h-full md:overflow-visible
              z-50 backdrop-blur-sm md:backdrop-blur-none
              transition-all duration-300 ease-in-out
            `}
          >
            {["home", "features", "about", "team", "contact"].map((item) => (
              <li key={item} className="py-3 md:py-0 border-b md:border-b-0 border-gray-100 last:border-b-0">
                <a
                  href={`#${item}`}
                  onClick={closeMenu}
                  className={`block md:inline-block text-center md:text-left 
                    text-sm font-medium tracking-wide uppercase
                    transition-all duration-300 relative
                    ${activeSection === item 
                      ? "text-blue-600" 
                      : isScrolled 
                        ? "text-gray-800 hover:text-blue-600" 
                        : "text-gray-900 hover:text-blue-500"
                    }
                  `}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  
                  {/* Active indicator line */}
                  <span
                    className={`absolute -bottom-1 left-0 right-0
                      h-0.5 bg-blue-600
                      transition-all duration-300 ease-in-out
                      ${activeSection === item ? "opacity-100" : "opacity-0"}
                      hidden md:block
                    `}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" 
          onClick={closeMenu}
        />
      )}
    </nav>
  )
}

export default Navbar