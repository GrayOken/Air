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

            const credentials = window.sessionStorage.getItem(CREDENTIALS);
            const parsedCredentials = JSON.parse(credentials || "{}");
            const token = parsedCredentials.token;
            if (token) {
                headers.set("Authorization", token);
            }
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
        getActiveCart: builder.query({
            query: ()=> `api/cart/active_cart`
        }),
        deleteCartProduct: builder.mutation({
            query: (id)=>({
                url: "api/cart_product/"+id,
                method: "DELETE"
            })
        }),
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
        addCartProduct: builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: 'api/cart_product/',
                    method:"POST",
                    body
                    
                }
            }
        }),
        editCartProductQuantity: builder.mutation({
            query: (data)=>({
                url: "api/cart_product/"+data.id,
                method: "PUT",
                body: data
            })
        }),
        SubmitCart: builder.mutation({
            query: (data)=>({
                url: "api/cart/submit",
                method: "POST"
            })
        })

    }),
})

const dataSlice = createSlice({
    name:"data",
    initialState:{
        products:[],
        cartProducts:[],
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

        builder.addMatcher(storeApi.endpoints.getActiveCart.matchFulfilled, (state, {payload})=>{
            state.cartProducts = payload.CartProduct
            return state;
        })

        builder.addMatcher(storeApi.endpoints.deleteCartProduct.matchFulfilled, (state, {payload})=>{
            state.cartProducts = state.cartProducts.filter((e)=> e.id !== payload.id)
            return state;
        })

        builder.addMatcher(storeApi.endpoints.addCartProduct.matchFulfilled, (state, {payload})=>{
            state.cartProducts = payload.updatedCartProducts
            return state;
        })

        builder.addMatcher(storeApi.endpoints.editCartProductQuantity.matchFulfilled, (state, {payload})=>{
            let productIndex = state.cartProducts.findIndex((e)=> e.id === payload.id)
            state.cartProducts[productIndex] = {
                ...state.cartProducts[productIndex],
                ...payload
            }
            return state;
        })

        builder.addMatcher(storeApi.endpoints.SubmitCart.matchFulfilled, (state, {payload})=>{
            state.cartProducts = []
            return state;
        })

    }
})

export default dataSlice.reducer;

export const { addToCart, removeFromCart } = dataSlice.actions;


export const {
    useAddProductMutation,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useEditProductMutation,
    useDeleteProductMutation,
    useAddUserMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useEditUserMutation,
    useDeleteUserMutation,
    useGetCartByIdQuery,
    useUpdateCartMutation,
    useDeleteCartMutation,
    useGetUsersCartsQuery,
    useGetActiveCartQuery,
    useDeleteCartProductMutation,
    useAddCartProductMutation,
    useEditSubmitCartMutation,
    useEditCartProductQuantityMutation,
    useSubmitCartMutation
} = storeApi
