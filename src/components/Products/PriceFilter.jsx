import { useDispatch } from "react-redux";
import { setPrice } from "../../reducers/products";

export default function PriceFilter() {
   const dispatch = useDispatch();

   function selectHandler(event) {
      dispatch(setPrice(event.target.value));
   }

   return (
      <div>
         <select name="price" id="price" onChange={selectHandler}>
            <option value={[]}>All</option>
            <option value={[0, 10]}>$10 or less</option>
            <option value={[10, 20]}>$10-$20</option>
            <option value={[20, 30]}>$20-$30</option>
            <option value={[30, 40]}>$30-$40</option>
            <option value={[40, 50]}>$40-$50</option>
            <option value={[50, 60]}>$50-$60</option>
         </select>
      </div>
   );
}
