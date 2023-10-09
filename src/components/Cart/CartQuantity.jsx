import { useEditCartProductQuantityMutation } from "../../reducers/api";

export default function CartQuantity({ cartProduct }) {
   const [editQuantity] = useEditCartProductQuantityMutation();

   const updateQuantity = async (event) => {
      if (event.target.value === "") return;
      const selectedQuantity = Number(event.target.value);
      const productWithQuantity = {
         id: cartProduct.id,
         quantity: selectedQuantity,
      };
      console.log(productWithQuantity);
      await editQuantity(productWithQuantity);
   };

   return (
      <div id="QuantityCounter">
         <input
            type="number"
            onChange={updateQuantity}
            defaultValue={cartProduct.quantity}
         />
      </div>
   );
}
