import { useGetUsersActiveCartQuery } from "../reducers/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../reducers/api";

export default function Cart() {
   const me = useSelector(state => state.auth.credentials.user);
   const {data: activeCart, isLoading} = useGetUsersActiveCartQuery(me.userId);
   // const [removeFromCart] = UseSelector(state => state.cart)
   
   
      // const dispatch = useDispatch();
    
      const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };
   
      const total = data.cart.reduce((acc, item) => acc + item.price, 0);
   
      return (
         <div>
             {isLoading ? (
                 <h1>Loading...</h1>
             ) : (
                 <>
                     <h2>Your Cart</h2>
                     {activeCart.length === 0 ? (
                         <p>Your cart is empty</p>
                     ) : (
                         <ul>
                             {activeCart.map(item => (
                                 <li key={item.id}>
                                     {item.name} -- ${item.price}
                                     <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                 </li>
                             ))}
                         </ul>
                     )}
                     <div>Total: ${total}</div>
                 </>
             )}
         </div>
     );
 }
