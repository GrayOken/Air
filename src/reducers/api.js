import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {createSlice} from "@reduxjs/toolkit";

// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    tagTypes:['tag'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
    endpoints: (builder) => ({
        
        addProduct: builder.mutation({
            query: (body)=>({
                url: 'api/products',
                method: "POST",
                body: body
            })
        }),
        getProducts: builder.query({
            query: ()=> 'api/products/'
        }),
        getProductById: builder.query({
            query: (id)=> 'api/products/'+id
        }),
        editProduct: builder.mutation({
            query: (body)=>({
                url: 'api/products'+body.id,
                method: "POST",
                body: body
            })
        }),
        deleteProduct: builder.mutation({
            query: (id)=>({
                url: 'api/products/'+id,
                method: "DELETE"
            })
        }),
        addUser: builder.mutation({
            query: (body)=>({
                url: 'api/user'+id,
                method: "POST",
                body: body
            })
        }),
        getUsers :builder.query({
            query: ()=> 'api/user/'
        }),
        getUserById :builder.query({
            query: (id)=> 'api/user/'+id
        }),
        editUser : builder.mutation({
            query: (body)=>({
                url: 'api/user/'+body.id,
                method: "POST",
                body: body
            }) 
        }),
        deleteUser: builder.mutation({
            query: (id)=>({
                url: 'api/user/'+id,
                method: "DELETE"
            })
        }),
        getCartById: builder.query({
            query: (id)=> 'api/cart/'+id
        }),
        updateCart: builder.mutation({
            query: (body)=>({
                url: 'api/cart/'+body.id,
                method: "POST",
                body: body
            })
        }),
        deleteCart: builder.mutation({
            query: (id)=>({
                url: 'api/cart/'+id,
                method: 'DELETE'
            })
        }),
        getUsersCarts: builder.query({
            query: (id)=> 'api/cart/user/'+id
        }),
        getUsersActiveCart: builder.query({
            query: (id)=> `api/cart/user/${id}/active`
        }),
        editCartProduct: builder.mutation({
            query: (body)=>({
                url: `api/cart/${body.cartId}/${body.productId}`,
                method: "POST",
                body: body
            })
        })
    }),
})

const dataSlice = createSlice({
    name:"data",
    initialState:{
        products:[],
        cart: []
    },
    reducers:{
        
            addToCart:(state, action) => {
                console.log(action.payload)
                state.cart.push(action.payload)
            },
            removeFromCart: (state, action) => {
                const index = state.findIndex(item => item.id === action.payload);
                if (index !== -1) {
                  state.cart.splice(index, 1);
                }
            }
    },
    extraReducers: (builder)=>{
       
        builder.addMatcher(storeApi.endpoints.getProducts.matchFulfilled, (state, {payload})=>{
            return{
                ...state,
                products: payload
            }
        })

        builder.addMatcher(storeApi.endpoints.deleteProduct.matchFulfilled, (state, {payload})=>{
            return {
                ...state,
                products: state.products.filter(i=>i.id!==payload.id)
            }

        })

        builder.addMatcher(storeApi.endpoints.addProduct.matchFulfilled, (state, {payload})=>{
            state.products.push(payload);
            return state;
        })

    }
})

export default dataSlice.reducer;

export const { addToCart, removeFromCart } = dataSlice.actions;


export const {useAddProductMutation, useGetProductsQuery, useGetProductByIdQuery, useEditProductMutation, useDeleteProductMutation, useAddUserMutation, useGetUsersQuery, useGetUserByIdQuery, useEditUserMutation, useDeleteUserMutation, useGetCartByIdQuery, useUpdateCartMutation, useDeleteCartMutation, useGetUsersCartsQuery, useGetUsersActiveCartQuery, useEditCartProductMutation} = storeApi
