import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SingleCountryInterface } from '../../types/interfaces';
import Loader from '../../components/Loader';

export default function Country() {
  const [country, setCountry] = useState<SingleCountryInterface | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams<{ name: string }>();

  const fetchCountryData = useCallback(async (countryName: string) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();
      const countryData = data[0];

      const extractedCountryData: SingleCountryInterface = {
        name: countryData.name.common,
        nativeName: countryData.name.official,
        population: countryData.population.toLocaleString(),
        region: countryData.region,
        subregion: countryData.subregion,
        capital: countryData.capital[0],
        flags: {
          svg: countryData.flags.svg,
          png: countryData.flags.png,
          alt: ''
        },
        topLevelDomain: countryData.tld[0],
        currencies: countryData.currencies ? Object.values(countryData.currencies) : [],
        languages: countryData.languages ? Object.values(countryData.languages) : [],
        borders: countryData.borders
      };

      setCountry(extractedCountryData);

      const borderNamesPromises = (countryData.borders || []).map((border: string) =>
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then(response => response.json())
          .then(data => {
            const borderCountryName = data[0]?.name?.common;
            return borderCountryName || "";
          })
      );
      
      const borderNames = await Promise.all(borderNamesPromises);
      setBorderCountries(borderNames);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
    if (name) {
      fetchCountryData(name);
    }
  }, [fetchCountryData, name]);

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Link to="/" className="back-link">
            <span>&larr;</span> Back
          </Link>
          {country && (
            <section key={name} className="country-block">
              <img src={country.flags.svg} alt={name} />
              <section className="country-block-info">
                <h2>{country.name}</h2>
                <section className="details-block">
                  <ul className="details-block-one">
                    <li>
                      <span>Native Name:</span> {country.nativeName}
                    </li>
                    <li>
                      <span>Population:</span> {country.population}
                    </li>
                    <li>
                      <span>Region:</span> {country.region}
                    </li>
                    <li>
                      <span>Sub Region:</span> {country.subregion}
                    </li>
                    <li>
                      <span>Capital:</span> {country.capital}
                    </li>
                  </ul>
                  <ul className="details-block-two">
                    <li>
                      <span>Top Level Domain:</span> {country.topLevelDomain}
                    </li>
                    <li>
                      <span>Currencies:</span> {country.currencies?.map(curr => `${curr.name} (${curr.symbol})`).join(', ') || 'Unknown'}
                    </li>
                    <li>
                      <span>Languages:</span> {country.languages?.join(', ') || 'Unknown'}
                    </li>
                  </ul>
                </section>
                <section className="border-countries">
                  <p className="border-countries-title">Border Countries:</p>
                  {borderCountries.length ? (
                    borderCountries.map((borderCountry, index) => (
                      <Link
                        key={index}
                        className="border-country"
                        to={`/${borderCountry.toLowerCase().replace(/\s/g, "%20")}`}
                      >
                        {borderCountry}
                      </Link>
                    ))
                  ) : (
                    <p>No Borders</p>
                  )}
                </section>
              </section>
            </section>
          )}
        </>
      )}
    </main>
  );
}
