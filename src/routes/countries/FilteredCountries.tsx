import { Link } from "react-router-dom";
import { CountriesInterface } from "../../types/interfaces";

export default function FilteredCountries({ filtered, foundFilter }: { filtered: CountriesInterface[] | null, foundFilter: boolean }) {
  return (
    <section className="container-block">
      {foundFilter && filtered ? (
        filtered.map((country: CountriesInterface) => {
          const { name, population, region, capital, flags } = country;

          // Check if country object and its essential properties exist
          if (
            country &&
            typeof name === "object" &&
            name.common &&
            population &&
            region &&
            capital &&
            flags
          ) {
            return (
              <Link
                key={name.common}
                to={`/${name.common.toLowerCase().replace(/\s/g, "%20")}`}
                className="inside-container"
              >
                <div>
                  <section>
                    <section className="image-container">
                      <img className="image" src={flags.png} alt={name.common} />
                    </section>
                    <section className="info-block">
                      <h2 className="info-block-h2">{name.common}</h2>
                      <p className="p">
                        <span className="category">Population:</span>{" "}
                        {population.toLocaleString()}
                      </p>
                      <p className="p">
                        <span className="category">Region:</span> {region}
                      </p>
                      <p className="p">
                        <span className="category">Capital:</span> {capital.join(', ')}
                      </p>
                    </section>
                  </section>
                </div>
              </Link>
            );
          } else {
            return null; // Skip rendering if essential properties are missing
          }
        })
      ) : (
        <p>No countries found...</p>
      )}
    </section>
  );
}
