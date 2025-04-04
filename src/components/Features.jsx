import { FaInfo , FaMapMarkedAlt, FaHome, FaWeight, FaMobileAlt } from "react-icons/fa"
import { MdOutlineSensors } from "react-icons/md";

function Features() {
  const features = [
    {
      name: "Object Detection and Sensors",
      desc: "Detecting stranded victims, debris, floating hazards, and other obstacles in the water to ensure safe navigation and prevent collisions.",
      icon: <MdOutlineSensors className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
    },
    {
      name: "Autonomous Navigation",
      desc: "Navigate flood-affected areas autonomously to deliver emergency supplies to victims.",
      icon: <FaMapMarkedAlt className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
    },
    {
      name: "Real-time Monitoring",
      desc: "Monitor boat location and identify potential victims to assist rescue teams in their operations.",
      icon: <FaMobileAlt className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
    },
    {
      name: "Safe Return",
      desc: "Autonomously return to a designated safe location under conditions such as low battery or strong currents.",
      icon: <FaHome className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
    },
    {
      name: "Supply Management",
      desc: "Verify the availability of emergency supplies on board using a weight sensor.",
      icon: <FaWeight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
    },
    {
      name: "Information Display",
      desc: "Display critical information, including sensors status, boat status and an application interface.",
      icon: <FaInfo  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
    },
  ]

  return (
    <section id="features" className="py-8 md:py-16 flex items-center z-10">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="text-center mb-6 sm:mb-8 space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-800">Features & Technology</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center max-w-3xl mx-auto px-2">
            Discover the cutting-edge technologies powering S.U.R.F, our AI-driven miniature boat designed for
            autonomous flood rescue and supply operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-blue-800">{feature.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features