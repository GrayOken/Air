import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../reducers/cart";
import { useEditCartProductMutation } from "../reducers/api";

export default function Cart() {
   const dispatch = useDispatch();
   const cart = useSelector(state => state.cart);

   const handleRemoveFromCart = (itemId) => {
      dispatch(removeFromCart(itemId));
   }

   const total = cart.reduce((acc, item) => acc + item.price, 0);
   
   return (
      <div>
         <h2>Your Cart</h2>
         {cart.length === 0 ? (
            <p>Your cart is empty</p>
         ) : (
            <ul>
               {cart.map(item => (
                  <li key={item.id}>
                     {item.name} -- ${item.price}
                     <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </li>
               ))}
            </ul>
         )}
         <div>
        Total: ${total}
      </div>
      </div>
   );
}
