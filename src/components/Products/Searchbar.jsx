import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../reducers/products";

export default function Searchbar() {
   const dispatch = useDispatch();
   const searchValue = useSelector((state) => state.product.filter);

   function handleChange(event) {
      dispatch(setSearch(event.target.value));
   }

   return (
      <input
         type="text"
         placeholder="Search products"
         onChange={handleChange}
         //  value={searchValue}
      />
   );
}
