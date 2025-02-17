import { Compass, Eye, Target } from 'lucide-react';

function About() {
  const items = [
    {
        title: "Mission",
        content:
            "To provide an innovative, AI-powered IoT solution for emergency supply delivery during floods by utilizing autonomous boats, ensuring timely and safe assistance to stranded individuals in disaster-prone areas.",
        icon: <Compass className="w-12 h-12 text-blue-600 mb-4" />
    },
    {
        title: "Vision",
        content:
            "To revolutionize flood disaster response with smart, autonomous technology, reducing human risk and improving the efficiency of emergency supply distribution in vulnerable communities worldwide.",
        icon: <Eye className="w-12 h-12 text-blue-600 mb-4" />
    },
    {
        title: "Goals",
        content:
            "Develop cutting-edge AI algorithms for autonomous navigation, implement robust IoT systems for real-time monitoring, and create a scalable solution that can be deployed rapidly in various flood-prone regions globally.",
        icon: <Target className="w-12 h-12 text-blue-600 mb-4" />
    },
]

return(
    <section id="about" className="bg-sky-50 flex justify-center items-center py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-12">About</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="h-full bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                            {item.icon}
                            <h3 className="text-2xl font-bold mb-4 text-blue-600">{item.title}</h3>
                            <p className="text-gray-700">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
}

export default About;