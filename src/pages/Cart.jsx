// import { useGetUsersActiveCartQuery } from "../reducers/api";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { removeFromCart } from "../reducers/api";

// export default function Cart() {
//    // const entireState = useSelector(state => state);
//    // console.log(entireState);
//    const me = useSelector(state => state.auth.credentials.user);
//    const {data: activeCart, isLoading} = useGetUsersActiveCartQuery(5);
//    const cart = useSelector(state => state.cart.cart)

    
//       const dispatch = useDispatch();

//     const handleRemoveFromCart = (id) => {
//         dispatch(removeFromCart(id));
//     };
   
//     const total = cart ? cart.reduce((acc, item) => acc + item.price, 0) : 0;

   
//       return (
//          <div>
//              {isLoading ? (
//                  <h1>Loading...</h1>
//              ) : (
//                  <>
//                      <h2>Your Cart</h2>
//                      {activeCart.length === 0 ? (
//                          <p>Your cart is empty</p>
//                      ) : (
//                          <ul>
//                              {activeCart.map(item => (
//                                  <li key={item.id}>
//                                      {item.name} -- ${item.price}
//                                      <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
//                                  </li>
//                              ))}
//                          </ul>
//                      )}
//                      <div>Total: ${total}</div>
//                  </>
//              )}
//          </div>
//      );
//  }

// import { Link, useParams } from 'react-router-dom';
import { useEditCartProductMutation } from "../reducers/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCartByIdQuery } from "../reducers/api";
// import QuantityCounter from "../components/Products/QuantityCounter";

function Cart() {
   //  const [addToCart, { isLoading, isError, data }] = useEditCartProductMutation();
   //  const [itemsCount, setItemsCount] = useState(0);
      // const [activeCart, { isLoading, isError, data}] = useGetCartByIdQuery()
    
   //  useEffect(() => {
   //      if (data && data.addedToCart) {
   //          setItemsCount(data.addedToCart.length);
   //      }
   //  }, [data]);

   //  const handleAddToCart = async () => {
   //      await addToCart();
   //    };
   //    console.log(addToCart)
//     return (
//         <div>
//           {isLoading && <p>Loading...</p>}
//           {isError && <p>Error adding to cart.</p>}
//           <QuantityCounter />
//         </div>
//       );
 }

export default Cart;
