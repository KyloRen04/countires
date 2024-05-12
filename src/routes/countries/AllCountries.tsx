import { Link } from "react-router-dom";
import { CountriesInterface } from "../../types/interfaces";

export default function AllCountries(props: { countries: CountriesInterface[] }) {
    const sortedCountries = props.countries.slice().sort((a, b) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return (
        <section className="container-block">
            {sortedCountries.map((country: CountriesInterface) => {
                const { name, population, region, capital, flags } = country;

                if (
                    name &&
                    typeof name === "object" &&
                    typeof name.common === "string" &&
                    population &&
                    region &&
                    capital &&
                    flags &&
                    (flags.svg || flags.png)
                ) {
                    return (
                        <Link
                            key={name.common}
                            to={`/${name.common.toLowerCase().replace(/\s/g, "%20")}`}
                            className="inside-container"
                        >
                            <div>
                                <section className="image-container">
                                    <img
                                        className="image"
                                        src={flags.svg || flags.png}
                                        alt={name.common}
                                    />
                                </section>
                                <section className="info-block">
                                    <h2 className="info-block-h2"> {name.common}</h2>
                                    <section>
                                        <p className="p">
                                            <span className="category">Population:</span>{" "}
                                            {population.toLocaleString()}
                                        </p>
                                        <p className="p">
                                            <span className="category">Region:</span> {region}
                                        </p>
                                        <p className="p">
                                            <span className="category">Capital:</span> {capital}
                                        </p>
                                    </section>
                                </section>
                            </div>
                        </Link>
                    );
                } else {
                    return null;
                }
            })}
        </section>
    );
}
