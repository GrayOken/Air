import { useNavigate } from "react-router-dom";
import {
   useGetActiveCartQuery,
   useDeleteCartProductMutation,
   useSubmitCartMutation,
} from "../reducers/api";
import { useSelector } from "react-redux";
import CartQuantity from "../components/Cart/CartQuantity";

export default function Cart() {
   const { data, isLoading } = useGetActiveCartQuery();
   const [deleteCartProduct] = useDeleteCartProductMutation();
   const [submitCart] = useSubmitCartMutation();
   const navigate = useNavigate();
   const cartProducts = useSelector((state) => state.data.cartProducts);

   const handleCompleteOrder = async () => {
      try {
         await submitCart();
      } catch (error) {
         console.error("Failed to complete order:", error);
      }
   };

   function handleRemoveFromCart(id) {
      deleteCartProduct(id);
   }

   function handleNavigate() {
      navigate("/products");
   }

   const total = cartProducts.reduce(
      (acc, cur) => acc + cur.product.price * cur.quantity,
      0
   );

   return (
      <>
         <button onClick={handleNavigate}>Continue Shopping</button>
         {cartProducts.length === 0 ? (
            <p>Your cart is empty</p>
         ) : (
            <div>
               <ul>
                  {cartProducts.map((item) => (
                     <li key={item.id}>
                        {item.product.name} -- ${item.product.price} x{" "}
                        <CartQuantity cartProduct={item} />
                        <button onClick={() => handleRemoveFromCart(item.id)}>
                           Remove
                        </button>
                     </li>
                  ))}
               </ul>
               <div>Total: ${total.toFixed(2)}</div>
               <div className="checkout-button-container">
                  <button
                     className="checkout-button"
                     onClick={handleCompleteOrder}
                  >
                     Complete Your Order
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
