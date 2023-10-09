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
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
              state.items.splice(index, 1);
            }
          }
          
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions; 
export default cartSlice.reducer



