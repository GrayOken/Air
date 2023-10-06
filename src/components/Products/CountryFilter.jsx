import { useSelector, useDispatch } from "react-redux";
import { setCountry } from "../../reducers/products";

export default function CountryFilter() {
   const uniqueCountries = useSelector((state) => state.product.allCountries);
   const dispatch = useDispatch();

   function selectHandler(event) {
      dispatch(setCountry(event.target.value));
   }

   return (
      <div>
         <select name="country" id="country" onChange={selectHandler}>
            <option value="">All</option>
            {uniqueCountries.map((e, i) => {
               return (
                  <option key={i} value={e}>
                     {e}
                  </option>
               );
            })}
         </select>
      </div>
   );
}
