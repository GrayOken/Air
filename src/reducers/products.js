import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"products",
    initialState:{
        allCountries: [],
        searchFilter: {is_active: false, value: ""},
        countryFilter: {is_active: false, value: ""},
        priceFilter: {is_active: false, value: []},

    },
    reducers:{
        setAllCountries(state, action) {
            state.allCountries = action.payload
        },
        setSearch(state, action) {
            state.searchFilter.value = action.payload
            if (action.payload !== "") {
                state.searchFilter.is_active = true
            } else {
                state.searchFilter.is_active = false
            } 
            return state
        },
        setCountry(state, action) {
            state.countryFilter.value = action.payload
            if (action.payload !== "") {
                state.countryFilter.is_active = true
            } else {
                state.countryFilter.is_active = false
            }
            return state
        },
        setPrice(state, action) {
            state.priceFilter.value = action.payload
            if (action.payload.length !== 0) {
                state.priceFilter.is_active = true
            } else {
                state.priceFilter.is_active = false
            }
            return state
        }
    }
})

export const {setSearch, setAllCountries, setCountry, setPrice} = productSlice.actions
export default productSlice.reducer