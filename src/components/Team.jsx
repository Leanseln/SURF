import RAYMART from "../images/RAYMART.jpg"
import NICO from "../images/NICO.jpg"
import TOSOC from "../images/TOSOC.jpg"
import LLOYD from "../images/LLOYD.jpg"
import BUENAFE from "../images/BUENAFE.jpg"
import MARCUS from "../images/MARCUS.jpg"
import BAUTISTA from "../images/BAUTISTA.jpg"
import GERENTE from "../images/GERENTE.jpg"
import { FaGithubAlt  , FaLinkedinIn  } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";


function Team() {
    const teamMembers = [
        { name: "Raymart Sarmiento", 
          role: "Project Manager", 
          image: RAYMART, 
          github: "https://github.com/RaymartDev", 
          linkedin: "https://www.linkedin.com/in/raymart-s-lob/", 
          email: "sarmiento.raymart.bscs2021@gmail.com" 
        },
        { name: "Leansel Nico Ortega", 
          role: "Software Developer", 
          image: NICO, 
          github: "https://github.com/Leanseln", 
          linkedin: "https://www.linkedin.com/in/leansel-nico-ortega-745356262/", 
          email: "ortega.leanselnico.bscs2021@gmail.com" 
        },
        { name: "John Lloyd Itliong",
          role: "Software Developer", 
          image: LLOYD, 
          github: "https://github.com/johnlloyd151", 
          linkedin: "https://www.linkedin.com/in/john-lloyd-itliong/", 
          email: "itliong.johnlloyd.bscs2021@gmail.com" 
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
          github: "",
          linkedin: "https://www.linkedin.com/in/jay-ann-rose-gerente-4a19aa30b/",
          email: "gerente.jayannrose.bscs2021@gmail.com",
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