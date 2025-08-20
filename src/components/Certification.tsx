import { Link, useLocation } from "react-router-dom";
import ScrollAnimation from "./ScrollAnimation";
import { getCurrentCountryFromPath } from "@/services/countryDetection";

type CertificationProps = {
  certificateUrls?: string[]; // e.g. ["/srilanka.jpg", "/srilanka.jpg"]
  isoLogoUrl?: string;        // e.g. "/iso1.jpg"
};

const Certification: React.FC<CertificationProps> = ({
  certificateUrls = ["/srilanka.jpg", "/Certificatesr.jpg"],
  isoLogoUrl = "/iso1.jpg",
}) => {
  const location = useLocation();
  const detected = getCurrentCountryFromPath(location.pathname);
  const country = detected?.code ? detected : { code: "SG", name: "Singapore" };

  const getNavLink = (basePath: string) => {
    if (!country || country.code === "SG") return basePath;
    const slug = country.name.toLowerCase().replace(/\s+/g, "-");
    return `/${slug}${basePath}`;
  };

  const certs = certificateUrls.slice(0, 2);

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <ScrollAnimation>
          {/* Title */}
          <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900">
            Recognized for Brand Leadership
          </h2>
          <div className="w-16 h-1 bg-gc-gold mt-3 mx-auto" />

          {/* Certificates (centered, big) */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
            {certs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Brand Leadership Award 2024 - Certificate ${i + 1}`}
                loading="lazy"
                className="
                  w-full max-w-[300px] md:max-w-[400px]
                  rounded-2xl shadow-2xl ring-1 ring-black/5
                  object-contain bg-white
                "
              />
            ))}
          </div>

          {/* Text box (full width, centered) */}
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow">
            <p className="text-gray-700 leading-relaxed mb-4">
              Awarded the <strong>Sri Lanka Brand Leadership Awards 2024</strong> by the
              World Marketing &amp; Brand Congress, recognizing our excellence in logistics and brand growth.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We deliver comprehensive freight forwarding and logistics solutions that combine deep local expertise with an extensive global network, ensuring smooth and reliable operations for diverse industries.
            </p>
            <ul className="list-disc marker:text-gc-gold pl-5 space-y-2 text-gray-800 text-left">
              <li>Industry recognition for <strong>Brand leadership</strong></li>
              <li>Awarded on <strong>5th September 2024</strong> at Taj Samudra, Colombo</li>
              <li>
                We are proud to be <strong>ISO 9001</strong> certified by{" "}
                <strong>TÜV NORD CERT GmbH (Germany)</strong>.
              </li>
            </ul>
             
            {/* Logo (centered) */}
          <div className="mt-8 flex justify-center">
            <img
              src={isoLogoUrl}
              alt="ISO Certified"
              className="h-35 w-auto sm:h-44 object-contain ring-4 ring-white shadow-lg"
              loading="lazy"
            />
          </div>

            <div className="mt-6 flex justify-center">
              <Link
                to={getNavLink("/about-us")}
                className="inline-flex items-center justify-center rounded-md bg-gc-gold px-6 py-3 text-white hover:bg-gc-bronze transition-colors"
              >
                Explore Our Certifications
              </Link>
            </div>
          </div>

          
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Certification;
