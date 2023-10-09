
import { useSelector } from "react-redux";
import cart from "../reducers/cart";
import { removeFromCart } from '../reducers/cart';
import { useEditSubmitCartMutation } from "../reducers/api";
import { useDispatch } from "react-redux";

function Cart() {
   // const cartItems = useSelector(state => state.cart.items)
   const cartItems = useSelector(state => {
      console.log(state.cart.items);
      return state.cart.items;
  });
  
   const products = useSelector(state => state.data.products)
   // const [submitCart, { isLoading: submitLoading, isError: submitError }] = useEditSubmitCartMutation();
   const {data, isLoading} = useEditSubmitCartMutation();
   const [submitCart] = useEditSubmitCartMutation();
   const dispatch = useDispatch();


   // console.log(products)
   // console.log(me)

   if (isLoading) {
      return <h1>Loading...</h1>;
  }

   const handleRemoveFromCart = (itemId) => {
      console.log("Removing product with ID:", itemId);
      dispatch(removeFromCart(itemId));
   };

 const handleCompleteOrder = async () => {
   try {
      await submitCart(); 
   } catch (error) {
      console.error("Failed to complete order:", error);
   }
};

   const cartProductIds = cartItems.map((item) => {
   const productKeys = products.find(product => product.id === item.product_id);
   const totalPrice = item.quantity * productKeys.price;
   return {
     ...item,
     ...productKeys,
     totalPrice
   };
 });
  
 const Total = cartProductIds.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div>
          {cartProductIds.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul>
                {cartProductIds.map((item) => (
                  <li key={item.id}>
                     {item.name} -- ${item.price} x {item.quantity}
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div>Total: ${Total.toFixed(2)}</div>
              <div className="checkout-button-container">
                  <button className='checkout-button' onClick={handleCompleteOrder}>Complete Your Order</button>
              </div>
            </>
          )}
    </div>
  );
}

export default Cart;





   





