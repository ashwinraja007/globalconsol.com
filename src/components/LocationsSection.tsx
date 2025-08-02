import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type LocationDetails = {
  map: string;
  address: string;
  phone: string;
};

type CountryLocations = {
  [location: string]: LocationDetails;
};

type LocationsData = {
  [country: string]: CountryLocations;
};

const allLocations: LocationsData = {
   India: {
    Chennai: {
      map: "https://www.google.com/maps/d/embed?mid=1xTmhWpagroJz2YqtOTxHBEAZP8Xw_cA&ehbc=2E312F&noprof=1",
      address: "Roma Building, Door No. 10, 3rd Floor, G.S.T. Road, Alandur, Chennai-600 016",
      phone: "044 4689 4646",
    },
    "Chennai Warehouse": {
      map: "https://www.google.com/maps/d/embed?mid=1y9YjgEy16tEWEAjmndzSI_7fRUgA45U&ehbc=2E312F&noprof=1",
      address: "Survey No.209/6A(Part)209/6B(Part), Mannur & Valarpuram Village, Perambakkam Road, Sriperumbudur Taluk, Kanchipuram District-602105",
      phone: "+91 9994355523",
    },
    Delhi: {
      map: "https://www.google.com/maps/d/embed?mid=1prpWPmOJpIfxQg4LmwnRIyNE8pXue20&ehbc=2E312F&noprof=1",
      address: "Plot No. 15, 1st Floor, Block C, Pocket 8, Sector 17, Dwarka, New Delhi 110075",
      phone: "+91 11 41088871",
    },
    Kolkata: {
      map: "https://www.google.com/maps/d/embed?mid=1rM6AXz8EHQ7xg4aldjPH2AJuY5NtapY&ehbc=2E312F&noprof=1",
      address: "Imagine Techpark, Unit No. 10, 19th Floor, Block DN 6, Sector - V, Salt Lake City, Kolkata, West Bengal - 700091",
      phone: "+91 33 4814 9162 / 63",
    },
    Bengaluru: {
      map: "https://www.google.com/maps/d/embed?mid=1VfZTXJHg3ekHgdcyt3lf9cbsEnf11oA&ehbc=2E312F&noprof=1",
      address: "3C-964 IIIrd Cross Street, HRBR Layout 1st Block, Kalyan Nagar Bannaswadi, Bengaluru - 560043",
      phone: "+91 9841676259",
    },
    Cochin: {
      map: "https://www.google.com/maps/d/embed?mid=1wFWiRd2ewEGxxGv2NBKTwJX7eClgjv0&ehbc=2E312F&noprof=1",
      address: "CC 59/801A Elizabeth Memorial Building, Thevara Ferry Jn, Cochin 682013, Kerala",
      phone: "+91 484 4019192 / 93",
    },
    Hyderabad: {
      map: "https://www.google.com/maps/d/embed?mid=1nfVu0PP4O3WJ9ZUqbJjpnKCblkY9rJI&ehbc=2E312F&noprof=1",
      address: "H.No. 1-8-450/1/A-7 Indian Airlines Colony, Opp Police Lines, Begumpet, Hyderabad-500016, Telangana",
      phone: "040-49559704",
    },
    Mumbai: {
      map: "https://www.google.com/maps/d/embed?mid=1ndB2LDzMO0nBfUDdGe2o7-_BpQxQRUQ&ehbc=2E312F&noprof=1",
      address: "Town Center - 2, Office No.607, 6th Floor, Marol, Andheri Kurla Road, Andheri East, Mumbai - 400059",
      phone: "+91 8879756838, 022-35131688 / 35113475 / 35082586",
    },
  },
  Singapore: {
    Singapore: {
      map: "https://www.google.com/maps/d/embed?mid=1dMWuQ-5-EQL2a1gOFRIYFxVLUdfERNw&ehbc=2E312F&noprof=1",
      address: "Blk 511 Kampong Bahru Road, #03-01 Keppel Distripark, Singapore 099447",
      phone: "+65 6224 1338 / +65 6224 1336",
    },
  },
  Malaysia: {
    PortKlang: {
      map: "https://www.google.com/maps/d/embed?mid=1wY9IR1V-C3m6rqDjbDVuARcHIn5DaX0&ehbc=2E312F&noprof=1",
      address: "MTBBT 2, 3A-5, Jalan Batu Nilam 16, The Landmark (Behind AEON Mall), Bandar Bukit Tinggi 2, 41200 Klang, Selangor D.E",
      phone: "+603 - 3319 2778 / 74 / 75",
    },
    PasirGudang: {
      map: "https://www.google.com/maps/d/embed?mid=1Ef2sco0B8ZB3fShOADFD17mX6eEn22g&ehbc=2E312F&noprof=1",
      address: "Unit 20-03A, Level 20 Menara Zurich, 15 Jalan Dato Abdullah Tahir, 80300 Johor Bahru",
      phone: "603-3319 2778 / 74 / 75, 79",
    },
  },
  Thailand: {
    Bangkok: {
      map: "https://www.google.com/maps/d/embed?mid=1-KDMSa2eOSnchrGfGbRCMws3wdHa4tc&ehbc=2E312F&noprof=1",
      address: "109 CCT Building, 3rd Floor, Rm.3, Surawong Road, Suriyawongse, Bangrak, Bangkok 10500",
      phone: "+662-634-3240, +662-634-3942",
    },
  },
  Indonesia: {
    Jakarta: {
      map: "https://www.google.com/maps/d/embed?mid=1wNAxoHYpLj-a8ekPGklU6BpnaBaz0Co&ehbc=2E312F&noprof=1",
      address: "408, Lina Building, JL.HR Rasuna Said kav B7, Jakarta",
      phone: "+62 21 529 20292, 522 4887",
    },
    Surabaya: {
      map: "https://www.google.com/maps/d/embed?mid=1ecTq28A-CHVdwkhZB9M1HpLKe-xPKo0&ehbc=2E312F&noprof=1",
      address: "Japfa Indoland Center, Japfa Tower 1, Lantai 4/401-A, JL Jend, Basuki Rahmat 129-137, Surabaya 60271",
      phone: "+62 21 529 20292, 522 4887",
    },
  },
};

const LocationsSection: React.FC = () => {
  const { pathname } = useLocation();
  const countryFromPath = pathname.split("/")[1]?.toLowerCase();

  const matchedCountry = Object.keys(allLocations).find(
    (country) => country.toLowerCase() === countryFromPath
  ) as keyof LocationsData;

  const defaultCountry: keyof LocationsData = matchedCountry || "Singapore";
  const [selectedCountry, setSelectedCountry] = useState<keyof LocationsData>(defaultCountry);
  const [selectedLocation, setSelectedLocation] = useState<keyof CountryLocations>(
    Object.keys(allLocations[defaultCountry])[0]
  );

  useEffect(() => {
    if (matchedCountry) {
      setSelectedCountry(matchedCountry);
      setSelectedLocation(Object.keys(allLocations[matchedCountry])[0]);
    } else {
      // Ensure Singapore is shown by default
      setSelectedCountry("Singapore");
      setSelectedLocation(Object.keys(allLocations["Singapore"])[0]);
    }
  }, [matchedCountry]);

  const locations = allLocations[selectedCountry];

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Office Locations</h2>
        <div className="text-center text-xl font-semibold py-2 px-4 bg-red-600 text-white rounded inline-block">
          {selectedCountry}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[30%] space-y-3">
          {Object.keys(locations).map((loc) => (
            <button
              key={loc}
              className={`w-full text-left p-3 rounded border transition-all ${
                selectedLocation === loc
                  ? "bg-blue-800 text-white border-blue-800"
                  : "bg-white border-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedLocation(loc as keyof CountryLocations)}
            >
              {loc}
            </button>
          ))}
        </div>

        <div className="w-full md:w-[70%] space-y-4">
          <div className="bg-slate-100 p-4 rounded border shadow">
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="whitespace-pre-line mb-2">
              {locations[selectedLocation].address}
            </p>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p>{locations[selectedLocation].phone}</p>
          </div>

          <div className="relative rounded-lg overflow-hidden h-[400px] shadow-lg">
            <div className="absolute top-0 left-0 w-full text-white text-center py-2 bg-red-600 font-semibold z-10">
             {selectedLocation}
            </div>
            <iframe
              src={locations[selectedLocation].map}
              width="100%"
              height="100%"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={`${selectedLocation} Map`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
