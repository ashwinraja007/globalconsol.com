import { Link } from "react-router-dom";
import ScrollAnimation from "./ScrollAnimation";

type CertificationProps = {
  certificateUrl: string; // Public image path
  isoLogoUrl: string;     // Public image path
};

const Certification: React.FC<CertificationProps> = ({
  certificateUrl,
  isoLogoUrl,
}) => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Recognized for Brand Leadership
              </h2>
              <div className="w-16 h-1 bg-gc-gold mt-3 mb-6" />

              <p className="text-gray-700 leading-relaxed mb-6">
                Awarded at the <strong>Sri Lanka Brand Leadership Awards 2024</strong> by the
                World Marketing & Brand Congress, recognizing our excellence in logistics and brand growth.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="mt-1 mr-3 inline-block h-2.5 w-2.5 rounded-full bg-gc-gold" />
                  Industry recognition for <strong>brand leadership</strong>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 inline-block h-2.5 w-2.5 rounded-full bg-gc-gold" />
                  Awarded on <strong>5th September 2024</strong> at Taj Samudra, Colombo
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-3 inline-block h-2.5 w-2.5 rounded-full bg-gc-gold" />
                  Backed by <strong>ISO-certified</strong> processes
                </li>
              </ul>

              <Link
                to="/about-us/certifications"
                className="inline-flex items-center rounded-md bg-gc-gold px-6 py-3 text-white hover:bg-gc-bronze transition-colors"
              >
                Explore Our Certifications
              </Link>
            </ScrollAnimation>
          </div>

          {/* Right: Image with ISO badge */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative w-full flex justify-end items-start">
              <img
                src="/srilanka.jpg"
                alt="Brand Leadership Award 2024"
                className="max-h-[620px] w-auto object-contain rounded-xl shadow-xl border border-slate-200"
              />

              {/* ISO badge */}
              <div className="absolute -top-4 -right-4">
                <span className="absolute inset-0 rounded-full bg-gc-gold/30 animate-ping" />
                <span className="relative inline-flex h-16 w-16 rounded-full ring-4 ring-white shadow-lg overflow-hidden animate-pulse">
                  <img
                    src="/iso2.gif"
                    alt="ISO Certified"
                    className="h-full w-full object-cover"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certification;
