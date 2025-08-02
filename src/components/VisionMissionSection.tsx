
import ScrollAnimation from "./ScrollAnimation";
import { Target, Eye } from "lucide-react";

const VisionMissionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Vision & Mission
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          <ScrollAnimation delay={100}>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-600 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-red-600/10 rounded-full mr-4">
                  <Eye className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our aim is to maintain our position as a leading global logistics solutions provider by utilizing advanced systems and the expertise of our skilled logistics professionals.
              </p>
            </div>
          </ScrollAnimation>

          {/* Mission */}
          <ScrollAnimation delay={200}>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-600 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-red-600/10 rounded-full mr-4">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To be customers' first choice for logistics solutions like FCL, LCL, Air Freight, Project Cargo, Warehousing, 3PL, Liquid Transportation, and Liner Agency
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
