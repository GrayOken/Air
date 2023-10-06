import CountryFilter from "./CountryFilter";
import PriceFilter from "./PriceFilter";
import Searchbar from "./Searchbar";

export default function FilterMenu() {
   return (
      <>
         <PriceFilter />
         <CountryFilter />
         <Searchbar />
      </>
   );
}
