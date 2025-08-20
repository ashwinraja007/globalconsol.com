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
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-y-0 lg:gap-x-6 xl:gap-x-10 items-start">
          {/* LEFT */}
          <div className="order-1 lg:col-span-5 flex sm:justify-center lg:justify-start">
            <div className="relative w-full">
              <img
                src={certificateUrl || "/srilanka.jpg"}
                alt="Brand Leadership Award 2024"
                loading="lazy"
                className="w-full h-auto object-contain rounded-xl shadow-lg border border-slate-200
                           max-w-[420px] md:max-w-[460px] lg:max-w-[480px] xl:max-w-[500px] 
                           mx-auto lg:mx-0"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-2 lg:col-span-7 text-center lg:text-left">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-9">
                Recognized for Brand Leadership
              </h2>
              <div className="w-16 h-1 bg-gc-gold mt-3 mb-6 mx-auto lg:mx-0" />

              <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                Awarded the <strong>Sri Lanka Brand Leadership Awards 2024</strong> by the
                World Marketing &amp; Brand Congress, recognizing our excellence in logistics and brand growth.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                We deliver comprehensive freight forwarding and logistics solutions that combine deep local expertise with an extensive global network, ensuring smooth and reliable operations for diverse industries.
              </p>

              <ul className="list-disc marker:text-gc-gold pl-5 space-y-3 mb-8 max-w-2xl mx-auto lg:mx-0 text-left">
                <li>Industry recognition for <strong>Brand leadership</strong></li>
                <li>Awarded on <strong>5th September 2024</strong> at Taj Samudra, Colombo</li>
                <li>Backed by <strong>ISO-certified</strong> processes</li>
              </ul>

              <Link
                to={getNavLink("/about-us")}
                className="inline-flex items-center justify-center rounded-md bg-gc-gold px-6 py-3 text-white hover:bg-gc-bronze transition-colors"
              >
                Explore Our Certifications
              </Link>

              {/* ISO logo moved below the button and made bigger */}
              <div className="mt-8 flex justify-center lg:justify-start">
                <img
                  src={isoLogoUrl || "/iso1.jpg"}
                  alt="ISO Certified"
                  className="h-30 w-30 sm:h-32 sm:w-32 lg:h-36 lg:w-36  ring-4 ring-white shadow-lg object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certification;
