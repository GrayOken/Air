import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsQuery } from "../reducers/api";
import ProductCard from "../components/Products/ProductCard";
import FilterMenu from "../components/Products/FilterMenu";
import { setAllCountries } from "../reducers/products";
import "../app.css";

export default function Products() {
   const [filterProducts, setFilterProducts] = useState([]);
   const dispatch = useDispatch();
   const { data: products } = useGetProductsQuery();
   const searchFilter = useSelector((state) => state.product.searchFilter);
   const countryFilter = useSelector((state) => state.product.countryFilter);
   const priceFilter = useSelector((state) => state.product.priceFilter);

   useEffect(() => {
      handleFilter();
      dispatch(setAllCountries(uniqueCountries(products)));
   }, [searchFilter, countryFilter, priceFilter, products]);

   function handleFilter() {
      let filteredProducts = products;
      if (searchFilter.is_active) {
         filteredProducts = filteredProducts.filter((product) =>
            product.name
               .toLowerCase()
               .includes(searchFilter.value.toLowerCase())
         );
      }
      if (countryFilter.is_active) {
         filteredProducts = filteredProducts.filter((product) => {
            return product.country_of_origin === countryFilter.value;
         });
      }
      if (priceFilter.is_active) {
         filteredProducts = filteredProducts.filter((product) => {
            return (
               product.price >= Number(priceFilter.value[0]) &&
               product.price <= Number(priceFilter.value[1])
            );
         });
      }
      setFilterProducts(filteredProducts);
   }

   function uniqueCountries(arr) {
      let uniqueValues = arr
         .map((e) => e.country_of_origin)
         .filter(
            (value, index, current_value) =>
               current_value.indexOf(value) === index
         );
      return uniqueValues;
   }

   return (
      <div className="products-container">
         <FilterMenu />
         <div className="products-list">
            {filterProducts.length === 0 ? (
               <h1>No Products Listed</h1>
            ) : (
               filterProducts.map((e, i) => <ProductCard product={e} key={i} />)
            )}
         </div>
      </div>
   );
}
