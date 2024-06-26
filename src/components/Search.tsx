import { FaSearch } from "react-icons/fa";
import { SearchProps } from "../types/interfaces";
import FilterRegions from "./FilterRegions";

export default function Search({ searchCountries, setCountries, searchInput, resetInput }: SearchProps) {
return (
    <article className="search-section">
      <section className="input-block">
        <FaSearch className="search-icon"/>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country..."
          value={searchInput}
          onChange={(e) => searchCountries(e.target.value)}
          />
          <button className="delete-icon" onClick={resetInput}>X</button> 
      </section>
      <FilterRegions setCountries={setCountries} />
    </article>
)
}