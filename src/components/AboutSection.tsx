import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";
const AboutSection = () => {
  return <section className="bg-milk-texture bg-slate-100 py-[114px]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">About Us</h2>
              <div className="w-16 h-1 bg-kargon-red mb-6"></div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-kargon-red shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-lg">Established in 2008 and headquartered in Singapore</h3>
                    <p className="text-gray-600"> OECL is a premier global logistics and supply chain partner founded by experienced professionals. With over 30 years of service across various industries, the company is known for its passionate and efficient delivery of world-class logistics solutions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-kargon-red shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-lg">Global Expansion Driven by Innovation and Excellence</h3>
                    <p className="text-gray-600">OECL’s growth is driven by a dedicated team, simplified processes, and advanced technology, enabling global office expansion. The company is well-positioned to meet international market demands and has firm plans to expand further across Southeast Asia.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white rounded-md">Know More</Button>
                
              </div>
            </ScrollAnimation>
          </div>
          <div className="order-1 lg:order-2">
            <ScrollAnimation delay={200} className="relative">
              <img alt="Container Port" className="rounded-lg shadow-lg w-full object-cover" style={{
              height: '400px'
            }} src="/lovable-uploads/14af4f37-de1e-4e64-b5d7-b6a53ec592d7.png" />
            
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;
