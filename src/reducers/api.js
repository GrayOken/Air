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
                url: 'api/users'+id,
                method: "POST",
                body: body
            })
        }),
        getUsers :builder.query({
            query: ()=> 'api/users/'
        }),
        getUserById :builder.query({
            query: (id)=> 'api/users/'+id
        }),
        editUser : builder.mutation({
            query: (body)=>({
                url: 'api/users/'+body.id,
                method: "POST",
                body: body
            }) 
        }),
        deleteUser: builder.mutation({
            query: (id)=>({
                url: 'api/users/'+id,
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
    }),
})

const dataSlice = createSlice({
    name:"data",
    initialState:{
        products:[]
    },
    reducers:{},
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

export const {useAddProductMutation, useGetProductsQuery, useGetProductByIdQuery, useEditProductMutation, useDeleteProductMutation, useAddUserMutation, useGetUsersQuery, useGetUserByIdQuery, useEditUserMutation, useDeleteUserMutation, useGetCartByIdQuery, useUpdateCartMutation, useDeleteCartMutation, useGetUsersCartsQuery, useGetUsersActiveCartQuery, useEditCartProductMutation} = storeApi
