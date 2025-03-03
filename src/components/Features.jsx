import { FaLifeRing, FaBox, FaMapMarkedAlt, FaHome, FaWeight, FaMobileAlt } from "react-icons/fa"

function Features() {
  const features = [
    {
      name: "SOS Signal Detection",
      desc: "Collect SOS signals from victims and identify their locations using sound and light pattern recognition.",
      icon: <FaLifeRing className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Autonomous Navigation",
      desc: "Navigate flood-affected areas autonomously to deliver emergency supplies to victims.",
      icon: <FaMapMarkedAlt className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Real-time Monitoring",
      desc: "Monitor boat location and identify potential victims to assist rescue teams in their operations.",
      icon: <FaMobileAlt className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Safe Return",
      desc: "Autonomously return to a designated safe location under conditions such as low battery or strong currents.",
      icon: <FaHome className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Supply Management",
      desc: "Verify the availability of emergency supplies on board using a weight sensor.",
      icon: <FaWeight className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Information Display",
      desc: "Display critical information, including SOS status and boat location, on an application interface.",
      icon: <FaBox className="w-8 h-8 text-blue-600" />,
    },
  ]

  return (
    <section id="features" className="py-16  flex items-center z-10 ">
      <div className="container mx-auto px-20">
        <div className="text-center mb-6 sm:mb-8 space-y-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-800">Features & Technology</h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center max-w-3xl mx-auto">
            Discover the cutting-edge technologies powering S.U.R.F, our AI-driven miniature boat designed for
            autonomous flood rescue and supply operations.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-blue-800">{feature.name}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features


