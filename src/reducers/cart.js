import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name: "cart",
    initialState: {
      items: []
    },
    reducers:{
        addToCart:(state, action) => {
            console.log(action.payload)
            state.items.push(action.payload)
        },
        removeFromCart: (state, action) => {
          console.log('Removing product with ID:', action.payload);
          state.items = state.items.filter(item => item.product_id !== action.payload);
            // console.log('Found index:', index);
           
            console.log('Updated state:', state.items);
          },
          rehydrateCart: (state, action) => {
            return action.payload;
        }
          
    }
})

export const { addToCart, removeFromCart, rehydrateCart } = cartSlice.actions; 
export default cartSlice.reducer



