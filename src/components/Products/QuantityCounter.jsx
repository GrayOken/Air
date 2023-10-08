
export default function QuantityCounter({product}) {
   // const [addItemToCart] = UseSelector(state => state.cart)
   // function handleSubmit(event) {
   //    event.preventDefault();
   // }
   const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      console.log(product)
   }
   return (
      <div>
         <form action="">
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
             onClick={handleAddToCart}
               type="submit"
               name="addToCart"
               id="addToCart"
               value="Add to Cart"
            />
         </form>
      </div>
   );
}
