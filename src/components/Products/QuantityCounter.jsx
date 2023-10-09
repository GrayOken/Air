import { useDispatch, useSelector } from "react-redux";
import { useAddCartProductMutation } from "../../reducers/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function QuantityCounter({ product }) {
   const [addToCartMutation, { isLoading, isError, data }] =
      useAddCartProductMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleAddToCart = async (event) => {
      event.preventDefault();
      const selectedQuantity = Number(event.target.cartQuantity.value);
      const productWithQuantity = {
         product_id: product,
         quantity: selectedQuantity,
      };
      console.log(productWithQuantity);
      await addToCartMutation(productWithQuantity);
      navigate("/cart");
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
