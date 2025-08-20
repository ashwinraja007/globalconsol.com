import { Link, useLocation } from "react-router-dom";
import ScrollAnimation from "./ScrollAnimation";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

type CertificationProps = {
  certificateUrls?: string[];   // pass two URLs; falls back to two /srilanka.jpg
  isoLogoUrl?: string;
};

const Certification: React.FC<CertificationProps> = ({
  certificateUrls,
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

  // Fallback to two copies of the Sri Lanka certificate
  const certs = (certificateUrls?.length ? certificateUrls : ["/srilanka.jpg", "/srilanka.jpg"]).slice(0, 2);

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-y-0 lg:gap-x-8 xl:gap-x-12 items-start">
          {/* LEFT: Bigger, overlapped certificates */}
          <div className="order-1 lg:col-span-6 xl:col-span-7 flex sm:justify-center lg:justify-start">
            <div className="relative w-full max-w-[780px] mx-auto lg:mx-0">
              {/* Subtle glow backdrop */}
              <div
                aria-hidden
                className="hidden sm:block absolute -inset-10 -z-10 rounded-[40px] bg-gradient-to-tr from-emerald-100/70 via-yellow-50/60 to-transparent blur-3xl"
              />

              <div className="relative flex flex-col items-center sm:block">
                {/* First certificate */}
                <img
                  src={certs[0]}
                  alt="Brand Leadership Award 2024 - Certificate 1"
                  loading="lazy"
                  className="
                    w-[92%] sm:w-[72%]
                    rounded-2xl shadow-2xl ring-1 ring-black/5
                    sm:absolute sm:left-0 sm:top-0 sm:rotate-[-1.5deg]
                  "
                />
                {/* Second certificate */}
                <img
                  src={certs[1]}
                  alt="Brand Leadership Award 2024 - Certificate 2"
                  loading="lazy"
                  className="
                    w-[92%] sm:w-[72%]
                    mt-4 sm:mt-0
                    rounded-2xl shadow-2xl ring-1 ring-black/5
                    sm:absolute sm:right-0 sm:bottom-0 sm:rotate-[1.75deg] sm:translate-x-2 sm:translate-y-2
                  "
                />
                {/* Maintain height when overlapped */}
                <div className="sm:pb-[56%]" />
              </div>
            </div>
          </div>

          {/* RIGHT: Copy + CTA + ISO */}
          <div className="order-2 lg:col-span-6 xl:col-span-5 text-center lg:text-left">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
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
                <li>We are proud to be <strong>ISO 9001</strong> certified by <strong>TÜV NORD CERT GmbH (Germany)</strong>.</li>
              </ul>

              <Link
                to={getNavLink("/about-us")}
                className="inline-flex items-center justify-center rounded-md bg-gc-gold px-6 py-3 text-white hover:bg-gc-bronze transition-colors"
              >
                Explore Our Certifications
              </Link>

              <div className="mt-8 flex justify-center lg:justify-start">
                <img
                  src={isoLogoUrl || "/iso1.jpg"}
                  alt="ISO Certified"
                  className="h-36 w-auto lg:h-40 ring-4 ring-white shadow-lg object-contain"
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
