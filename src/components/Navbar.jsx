import { useState, useEffect } from "react"
import Logo from "../images/LOGO.png"
import { IoMenu, IoClose } from "react-icons/io5"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" width={96} height={24} />
            <span className={`text-3xl font-bold hidden sm:block ${isScrolled ? "text-black" : "text-black"}`}>
              S.U.R.F
            </span>
          </a>
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`text-3xl ${isScrolled ? "text-black" : "text-black"}`}>
              {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
            </button>
          </div>
          <ul
            className={`md:flex md:items-center md:space-x-8 ${isOpen ? "block" : "hidden"} md:block absolute md:static bg-white md:bg-transparent right-0 left-0 top-full md:top-auto p-4 md:p-0 transition-all duration-500 ease-in-out`}
          >
            {["home","features", "about", "team", "contact"].map((item) => (
              <li key={item} className="py-2 md:py-0">
                <a
                  href={`#${item}`}
                  className={`hover:text-blue-600 lg:text-lg md:text-sm duration-500 ${isScrolled ? "text-black" : "text-black"}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;