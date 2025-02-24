import RAYMART from "../images/RAYMART.jpg"
import NICO from "../images/NICO.jpg"
import TOSOC from "../images/TOSOC.jpg"
import LLOYD from "../images/LLOYD.jpg"
import BUENAFE from "../images/BUENAFE.jpg"
import MARCUS from "../images/MARCUS.png"
import BAUTISTA from "../images/BAUTISTA.jpg"
import GERENTE from "../images/GERENTE.jpg"
import { FaGithubAlt  , FaLinkedinIn  } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";


function Team() {
    const teamMembers = [
        { name: "Raymart Sarmiento", 
          role: "Project Manager", 
          image: RAYMART, 
          github: "", 
          linkedin: "", 
          email: "" },
        { name: "Leansel Nico Ortega", 
          role: "Software Developer", 
          image: NICO, 
          github: "", 
          linkedin: "", 
          email: "" },
        { name: "John Lloyd Itliong",
          role: "Software Developer", 
          image: LLOYD, 
          github: "", 
          linkedin: "", 
          email: "" },
        {
          name: "Micholo Joaquin Buenafe",
          role: "Hardware Developer",
          image: BUENAFE,
          github: "",
          linkedin: "",
          email: "",
        },
        {
          name: "Marcus James Tapang",
          role: "Hardware Developer",
          image: MARCUS,
          github: "",
          linkedin: "",
          email: "",
        },
        {
          name: "Marc Jayson Tosoc",
          role: "Quality Assurance Engineer",
          image: TOSOC,
          github: "",
          linkedin: "",
          email: "",
        },
        {
          name: "Juliet Bautista",
          role: "Content Marketing Specialist / Researcher",
          image: BAUTISTA,
          github: "",
          linkedin: "",
          email: "",
        },
        {
          name: "Jay Ann Rose Gerente",
          role: "UI / UX",
          image: GERENTE,
          github: "",
          linkedin: "",
          email: "",
        },
      ]
    
      return (
        <section id="team" className="py-20 bg-sky-100 flex justify-center items-center">
          <div className="container mx-auto px-4">
            <div className="mb-16 space-y-4">
              <h3 className="font-semibold text-center text-blue-600 uppercase tracking-wide">Who We Are</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-800">Meet the Team</h2>
              <p className="text-center text-gray-600 max-w-2xl mx-auto">
                Our diverse team of experts is dedicated to revolutionizing flood rescue operations with cutting-edge AI and
                robotics technology.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center space-y-4 group">
                  <div className="relative w-40 h-40 mx-auto overflow-hidden rounded-full">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-blue-800">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <FaGithubAlt size={20} />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <FaLinkedinIn size={20} />
                    </a>
                    <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                      <BiLogoGmail size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
}

export default Team;