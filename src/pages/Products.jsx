import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsQuery } from "../reducers/api";
import ProductCard from "../components/Products/ProductCard";
import FilterMenu from "../components/Products/FilterMenu";
import { setAllCountries } from "../reducers/products";

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
      console.log(priceFilter.value);
      console.log(countryFilter.value);
      console.log(searchFilter.value);
      if (searchFilter.is_active) {
         filteredProducts.filter((product) =>
            product.name
               .toLowerCase()
               .includes(searchFilter.value.toLowerCase())
         );
      }
      console.log(filteredProducts);
      if (countryFilter.is_active) {
         filteredProducts.filter((product) => {
            product.country_of_origin
               .toLowerCase()
               .includes(countryFilter.value.toLowerCase());
         });
      }
      if (priceFilter.is_active) {
         filteredProducts.filter((product) => {
            product.price > priceFilter[0] && product.price < priceFilter[1];
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
      <>
         <FilterMenu />
         <div className="listProd">
            {filterProducts.length === 0 ? (
               <h1>No Products Listed</h1>
            ) : (
               filterProducts.map((e, i) => <ProductCard product={e} key={i} />)
            )}
         </div>
      </>
   );
}
