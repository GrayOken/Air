import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {createSlice} from "@reduxjs/toolkit";

const CREDENTIALS='credentials'
// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
    tagTypes:['tag'],
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        prepareHeaders: (headers, { getState }) => {
            console.log("prepareHeaders is running");

            const credentials = window.sessionStorage.getItem(CREDENTIALS);
            const parsedCredentials = JSON.parse(credentials || "{}");
            const token = parsedCredentials.token;
            console.log("token from reducer", token);
            if (token) {
                headers.set("Authorization", token);
            }
            console.log("token from session storage:", token);
            return headers;
        },
}),
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
        // getUsersActiveCart: builder.query({
        //     query: (id)=> `api/cart/user/${id}/active`
        // }),
        // editCartProduct: builder.mutation({
        //     query: (body)=>({
        //         url: `api/cart/${body.cartId}/${body.productId}`,
        //         method: "POST",
        //         body: body
        //     })
        // })
        editSubmitCart : builder.mutation({
            query(data){
                console.log('Data received by editSubmitCart query:', data);
                const {id, ...body}=data;
                return {
                    url: 'api/cart/submit',
                    method:"PUT",
                    body: data.cartItems
                }
            }
        }),
        editCartProduct : builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/cart_product/',
                    method:"POST",
                    body
                    
                }
            }
        }),
    }),
})

const dataSlice = createSlice({
    name:"data",
    initialState:{
        products:[],
    },
    reducers:{
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


export const {useAddProductMutation, useGetProductsQuery, useGetProductByIdQuery, useEditProductMutation, useDeleteProductMutation, useAddUserMutation, useGetUsersQuery, useGetUserByIdQuery, useEditUserMutation, useDeleteUserMutation, useGetCartByIdQuery, useUpdateCartMutation, useDeleteCartMutation, useGetUsersCartsQuery, useGetUsersActiveCartQuery, useEditCartProductMutation, useEditSubmitCartMutation} = storeApi
