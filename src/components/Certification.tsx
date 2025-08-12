import { Link, useLocation } from "react-router-dom";
import ScrollAnimation from "./ScrollAnimation";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

type CertificationProps = {
  certificateUrl: string;
  isoLogoUrl: string;
};

const Certification: React.FC<CertificationProps> = ({
  certificateUrl,
  isoLogoUrl,
}) => {
  const location = useLocation();
  const detected = getCurrentCountryFromPath(location.pathname);
  const country = detected?.code ? detected : { code: "SG", name: "Singapore" };

  const getNavLink = (basePath: string) => {
    if (!country || country.code === "SG") return basePath;
    const slug = country.name.toLowerCase().replace(/\s+/g, "-");
    return `/${slug}${basePath}`;
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Image LEFT, Content RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Certificate image with ISO badge on top */}
          <div className="order-1 flex justify-center">
            {/* Make container full-width on mobile so image can scale */}
            <div className="relative w-full max-w-[760px] sm:max-w-[820px] lg:max-w-[720px]">
              <img
                src={certificateUrl || "/srilanka.jpg"}
                alt="Brand Leadership Award 2024"
                loading="lazy"
                /* Full-width on mobile; cap size on larger screens; keep aspect ratio */
                className="w-full h-auto object-contain rounded-xl shadow-xl border border-slate-200"
              />

              {/* ISO badge overlay (responsive sizes) */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span className="absolute inset-0 rounded-full bg-gc-gold/30 animate-ping" />
                <span className="relative inline-flex h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full ring-4 ring-white shadow-lg overflow-hidden animate-pulse">
                  <img
                    src={isoLogoUrl || "/iso.jpg"}
                    alt="ISO Certified"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="order-2">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Recognized for Brand Leadership
              </h2>
              <div className="w-16 h-1 bg-gc-gold mt-3 mb-6" />

              <p className="text-gray-700 leading-relaxed mb-6">
                Awarded at the <strong>Sri Lanka Brand Leadership Awards 2024</strong> by the
                World Marketing &amp; Brand Congress, recognizing our excellence in logistics and brand growth.
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
                to={getNavLink("/about-us")}
                className="inline-flex items-center rounded-md bg-gc-gold px-6 py-3 text-white hover:bg-gc-bronze transition-colors"
              >
                Explore Our Certifications
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certification;
