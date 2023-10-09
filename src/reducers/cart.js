import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name: "cart",
    initialState: {
      cart: []
    },
    reducers:{
        // addToCart:(state, action) => {
        //     console.log(action.payload)
        //     state.cart.push(action.payload)
        // },
        removeFromCart: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload);
            if (index !== -1) {
              state.cart.splice(index, 1);
            }
          }
          
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions; 
export default cartSlice.reducer



