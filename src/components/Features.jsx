import { MdNavigation, MdOutlineSensors, MdOutlineMonitor, MdEmergency } from "react-icons/md";
import { GiAvoidance } from "react-icons/gi";
import { FaHouseFloodWater } from "react-icons/fa6";

function Features() {

    const features = [
        { name: "Autonomous Navigation", desc: "AI-controlled path following", icon: <MdNavigation size={24} /> },
        { name: "IoT & Sensors", desc: "Track movement and obstacles", icon: <MdOutlineSensors size={24} /> },
        { name: "Obstacle Avoidance", desc: "AI-driven hazard detection", icon: <GiAvoidance size={24} /> },
        { name: "Real-time Monitoring", desc: "Continuous status updates", icon: <MdOutlineMonitor size={24} /> },
        { name: "Environmental Sensing", desc: "Detect water conditions", icon: <FaHouseFloodWater size={24} /> },
        { name: "Emergency Response", desc: "Quick deployment in crises", icon: <MdEmergency size={24} /> },
      ]
    
      return (
        <section id="features" className="py-20 bg-sky-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl text-center font-bold text-blue-800">Features & Technology</h2>
              <p className="text-gray-700 text-center max-w-2xl mx-auto">
                Discover the cutting-edge technologies powering S.U.R.F, our AI-driven miniature boat designed for
                autonomous flood rescue operations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="flex items-center justify-center rounded-full p-4 bg-blue-600 text-white w-16 h-16 mb-4 transition-all duration-300 group-hover:bg-orange-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.name}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
}
export default Features;