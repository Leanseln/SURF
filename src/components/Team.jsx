import RAYMART from "../images/RAYMART.jpg"
import NICO from "../images/NICO.jpg"
import TOSOC from "../images/TOSOC.jpg"
import LLOYD from "../images/LLOYD.jpg"
import BUENAFE from "../images/BUENAFE.jpg"
import MARCUS from "../images/MARCUS.jpg"
import BAUTISTA from "../images/BAUTISTA.jpg"
import GERENTE from "../images/GERENTE.jpg"
import { FaGithubAlt, FaLinkedinIn } from "react-icons/fa"
import { BiLogoGmail } from "react-icons/bi"

function Team() {
  const teamMembers = [
    {
      name: "Raymart Sarmiento",
      role: "Project Manager",
      image: RAYMART,
      github: "https://github.com/RaymartDev",
      linkedin: "https://www.linkedin.com/in/raymart-s-lob/",
      email: "sarmiento.raymart.bscs2021@gmail.com",
    },
    {
      name: "Leansel Nico Ortega",
      role: "Software Developer",
      image: NICO,
      github: "https://github.com/Leanseln",
      linkedin: "https://www.linkedin.com/in/leansel-nico-ortega-745356262/",
      email: "ortega.leanselnico.bscs2021@gmail.com",
    },
    {
      name: "John Lloyd Itliong",
      role: "Software Developer",
      image: LLOYD,
      github: "https://github.com/johnlloyd151",
      linkedin: "https://www.linkedin.com/in/john-lloyd-itliong/",
      email: "itliong.johnlloyd.bscs2021@gmail.com",
    },
    {
      name: "Micholo Joaquin Buenafe",
      role: "Hardware Developer",
      image: BUENAFE,
      github: "https://github.com/MicholoJB",
      linkedin: "",
      email: "buenafe.micholojoaquin.bscs2021@gmail.com",
    },
    {
      name: "Marcus James Tapang",
      role: "Hardware Developer",
      image: MARCUS,
      github: "",
      linkedin: "",
      email: "tapang.marcusjames.bscs2021@gmail.com",
    },
    {
      name: "Marc Jayson Tosoc",
      role: "Quality Assurance Engineer",
      image: TOSOC,
      github: "https://github.com/PangIskul",
      linkedin: "https://www.linkedin.com/in/marc-jayson-tosoc-104234302/",
      email: "tosoc.marcjayson.bscs2019@gmail.com",
    },
    {
      name: "Juliet Bautista",
      role: "UI / UX Designer",
      image: BAUTISTA,
      github: "https://github.com/julsbbb",
      linkedin: "https://www.linkedin.com/in/juliet-bautista-816a23314/",
      email: "bautista.juliet.bscs2021@gmail.com",
    },
    {
      name: "Jay Ann Rose Gerente",
      role: "UI / UX Designer",
      image: GERENTE,
      github: "https://github.com/jayannrose",
      linkedin: "https://www.linkedin.com/in/jay-ann-rose-gerente-4a19aa30b/",
      email: "gerente.jayannrose.bscs2021@gmail.com",
    },
  ]

  return (
    <section id="team" className="py-16 flex items-center bg-sky-100">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
          <h3 className="font-semibold text-center text-blue-600 uppercase tracking-wide text-xs">Who We Are</h3>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-800">
            Meet the Team
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm">
            Our diverse team of experts is dedicated to revolutionizing flood rescue operations with <br /> cutting-edge AI and
            robotics technology.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center space-y-2 group" >
              <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto overflow-hidden rounded-full border-2 border-blue-100 shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-blue-800">{member.name}</h3>
                <p className="text-[10px] sm:text-xs text-gray-600">{member.role}</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <FaGithubAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <FaLinkedinIn className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                )}
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <BiLogoGmail className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team

