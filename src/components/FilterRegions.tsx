import { useState } from "react";
import { CountriesInterface, RegionsInterface } from "../types/interfaces";

const regions: RegionsInterface[] = [
  {
    label: "All",
    name: "all",
  },
  {
    label: "Africa",
    name: "africa",
  },
  {
    label: "Americas",
    name: "americas",
  },
  {
    label: "Asia",
    name: "asia",
  },
  {
    label: "Europe",
    name: "europe",
  },
  {
    label: "Oceania",
    name: "oceania",
  },
];

export default function FilterRegions({ setCountries }: { setCountries: (value: CountriesInterface) => void }) {

  const [isVisible, setVisibility] = useState(false);
  const [activeRegion, setActiveRegion] = useState("");

  const fetchRegion = async (region: string) => {
    try {
      let url = `https://restcountries.com/v3.1/all`;
      if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${region}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setActiveRegion(region === "all" ? "All" : regions.find(item => item.name === region)?.label || "");
      setVisibility(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const toggleDropdown = () => {
    setVisibility(!isVisible);
  };

  return (
    <section className={`select-region ${isVisible ? "active-regions" : ""}`}>
      <summary onClick={toggleDropdown}>
        {activeRegion === "All" || !activeRegion ? "Filter by Region" : activeRegion}
      </summary>
      {isVisible && (
        <div className="region-list">
          {regions.map((region) => (
            <li
              onClick={() => fetchRegion(region.name)}
              value={region.name}
              key={region.label}
            >
              {region.label}
            </li>
          ))}
        </div>
      )}
    </section>
  );
};
