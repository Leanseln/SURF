import { Compass, Eye, Target } from "lucide-react"

function About() {
    const items = [
      {
        title: "Mission",
        content:
          "To provide an innovative, AI-powered IoT solution for emergency supply delivery during floods by utilizing autonomous boats, ensuring timely and safe assistance to stranded individuals in disaster-prone areas.",
        icon: <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-3" />,
      },
      {
        title: "Vision",
        content:
          "To revolutionize flood disaster response with smart, autonomous technology, reducing human risk and improving the efficiency of emergency supply distribution in vulnerable communities worldwide.",
        icon: <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-3" />,
      },
      {
        title: "Goals",
        content:
          "Develop cutting-edge AI algorithms for autonomous navigation, implement robust IoT systems for real-time monitoring, and create a scalable solution that can be deployed rapidly in various flood-prone regions globally.",
        icon: <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-3" />,
      },
    ]
  
    return (
      <section id="about" className="py-16 flex items-center bg-transparent">
        <div className="container mx-auto px-20">
          <div className="space-y-2 sm:space-y-2 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-800">About</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center max-w-3xl mx-auto">
              Innovative solutions for emergency response during flood disasters.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-full bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                  {item.icon}
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-blue-600">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-700">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default About
  

