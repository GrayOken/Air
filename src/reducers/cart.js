import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart:(state, action) => {
            console.log(action.payload)
            state.push(action.payload)
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload);
            if (index !== -1) {
              state.splice(index, 1);
            }
          }
          
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions; 
export default cartSlice.reducer



