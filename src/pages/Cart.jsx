import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditSubmitCartMutation } from '../reducers/api';
import { removeFromCart } from '../reducers/cart';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.data.products);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

   const [editSubmitCart] = useEditSubmitCartMutation();

  const handleRemoveFromCart = (id) => {
   dispatch(removeFromCart(id));
 };

  const handleCompleteOrder = async () => {
   setIsLoading(true);

   try {
      console.log('Before calling editSubmitCart');
      const result = await editSubmitCart({ cartItems: cartItemsWithDetails });
      console.log('After calling editSubmitCart', result);

     if (result.data) {
       console.log('Order submitted successfully');
       dispatch(clearCart());
     } else {
       console.error('Error submitting order');
     }
   } catch (error) {
     console.error('Error submitting order:', error);
   } finally {
     setIsLoading(false);
   }
 };

  const cartItemsWithDetails = cartItems.map((item) => {
   const productDetails = products.find(product => product.id === item.product_id);
   const totalPrice = item.quantity * productDetails.price;
   return {
     ...item,
     ...productDetails,
     totalPrice
   };
 });
  
 const dynamicTotalPrice = cartItemsWithDetails.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {cartItemsWithDetails.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul>
                {cartItemsWithDetails.map((item) => (
                  <li key={item.id}>
                     {item.name} -- ${item.price} x {item.quantity}
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <div>Total: ${dynamicTotalPrice.toFixed(2)}</div>
              <div className="checkout-button-container">
                  <button className='checkout-button' onClick={handleCompleteOrder}>Complete Your Order</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
