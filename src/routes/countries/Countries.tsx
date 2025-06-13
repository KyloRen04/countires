import { useState, useEffect, useCallback } from "react";
import Search from "../../components/Search";
import AllCountries from "./AllCountries";
import { CountriesInterface } from "../../types/interfaces";
import FilteredCountries from "./FilteredCountries";
import Loader from "../../components/Loader";

export default function Countries() {
  const url = `https://restcountries.com/v3.1/independent`;
  const [countries, setCountries] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(true);
  const [foundFilter, setFoundFilter] = useState(false);
  const [filtered, setFiltered] = useState<CountriesInterface[] | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchCountries = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchCountries();
    }

    return () => {
      mounted = false;
    };
  }, []);
  const searchCountries = (searchValue: string): void => {
    setSearchInput(searchValue);
    if (searchValue) {
      let filter: CountriesInterface[] = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log("Filtered countries:", filter);
      setFiltered(filter);

      if (filter.length === 0) {
        setFoundFilter(false);
      } else {
        setFoundFilter(true);
      }
    } else {
      setFiltered(countries);
      setFoundFilter(false);
    }
  };

  const resetInput = (): void => {
    return setSearchInput("");
  };
  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Search
            searchCountries={searchCountries}
            searchInput={searchInput}
            setCountries={setCountries}
            resetInput={resetInput}
          />
          {searchInput.length > 0 ? (
            <FilteredCountries filtered={filtered} foundFilter={foundFilter} />
          ) : (
            <AllCountries countries={countries} />
          )}
        </>
      )}
    </main>
  );
}
