import CountryFilter from "./CountryFilter";
import PriceFilter from "./PriceFilter";
import Searchbar from "./Searchbar";
import "./FilterMenu.css";

export default function FilterMenu() {
   return (
      <div className="menu-container">
         <div className="menu-display">
            <h1>Filter Products</h1>
            <div className="menu-item">
               <label htmlFor="Searchbar">Search Products</label>
               <Searchbar />
            </div>
            <div className="menu-item">
               <label htmlFor="PriceFilter">Filter by Price</label>
               <PriceFilter />
            </div>
            <div className="menu-item">
               <label htmlFor="CountryFilter">Filter by Country</label>
               <CountryFilter />
            </div>
         </div>
      </div>
   );
}
