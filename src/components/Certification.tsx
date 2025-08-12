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
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Stack on mobile, side-by-side on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">
          
          {/* LEFT: Image (no awkward left gap on desktop) */}
          <div className="order-1 flex sm:justify-center lg:justify-start">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px]">
              <img
                src={certificateUrl || "/srilanka.jpg"}
                alt="Brand Leadership Award 2024"
                loading="lazy"
                className="w-full h-auto object-contain rounded-xl shadow-lg border border-slate-200"
              />
              {/* ISO badge overlay */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span className="absolute inset-0 rounded-full bg-gc-gold/30 animate-ping" />
                <span className="relative inline-flex h-16 w-16 sm:h-18 sm:w-18 lg:h-20 lg:w-20 rounded-full ring-4 ring-white shadow-lg overflow-hidden animate-pulse">
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

          {/* RIGHT: Text */}
          <div className="order-2 text-center lg:text-left">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Recognized for Brand Leadership
              </h2>
              <div className="w-16 h-1 bg-gc-gold mt-3 mb-6 mx-auto lg:mx-0" />

              <p className="text-gray-700 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                Awarded at the <strong>Sri Lanka Brand Leadership Awards 2024</strong> by the
                World Marketing &amp; Brand Congress, recognizing our excellence in logistics and brand growth.
              </p>

              {/* Mobile-friendly bullet list with colored markers */}
              <ul className="list-disc marker:text-gc-gold pl-5 space-y-3 mb-8 max-w-xl mx-auto lg:mx-0 text-left">
                <li>
                  Industry recognition for <strong>Brand leadership</strong>
                </li>
                <li>
                  Awarded on <strong>5th September 2024</strong> at Taj Samudra, Colombo
                </li>
                <li>
                  Backed by <strong>ISO‑certified</strong> processes
                </li>
              </ul>

              <Link
                to={getNavLink("/about-us")}
                className="inline-flex items-center justify-center rounded-md bg-gc-gold px-6 py-3 text-white hover:bg-gc-bronze transition-colors"
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
