import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../reducers/cart';
import { useEditCartProductMutation } from '../../reducers/api';
import { useState, useEffect } from "react";


export default function QuantityCounter({product}) {
   // const products = useSelector(state => state.data.products)
   const me = useSelector(state => state.auth.credentials.user);
   // const dispatch = useDispatch();
   const [addToCart, { isLoading, isError, data }] = useEditCartProductMutation();
   const [itemsCount, setItemsCount] = useState(0);

   useEffect(() => {
      if (data && data.addedToCart) {
          setItemsCount(data.addedToCart.length);
          console.log(data)
      }
  }, [data]);

  const handleAddToCart = async (event) => {
   event.preventDefault();
   const selectedQuantity = Number(event.target.cartQuantity.value);
   const productWithQuantity = { product_id: product, quantity: selectedQuantity };
   console.log(product)
   
   await addToCart(productWithQuantity);
};
   return (
      <div id="QuantityCounter">
         <form onSubmit={handleAddToCart}>
            <select name="cartQuantity" id="cartQuantity">
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
               <option value="6">6</option>
               <option value="7">7</option>
               <option value="8">8</option>
               <option value="9">9</option>
               <option value="10">10</option>
               <option value="11">11</option>
               <option value="12">12</option>
            </select>
            <input
               type="submit"
               name="addToCart"
               id="addToCart"
               value="Add to Cart"
            />
         </form>
      </div>
   );
}
