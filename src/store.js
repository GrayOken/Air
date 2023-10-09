// import { configureStore, createReducer } from "@reduxjs/toolkit";
// import { storeApi } from "./reducers/api";
// import authReducer from './reducers/auth';
// import dataReducer from './reducers/api';
// import productsReducer from './reducers/products';
// import cartReducer from './reducers/cart'



// const store = configureStore({
//     reducer: {
//         [storeApi.reducerPath]: storeApi.reducer,
//         auth: authReducer,
//         data:dataReducer,
//         product:productsReducer,
//         cart:cartReducer


//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(storeApi.middleware),
// });

// export default store;
import cartReducer, { rehydrateCart } from './reducers/cart';
import { configureStore, createReducer } from "@reduxjs/toolkit";
import { storeApi } from "./reducers/api";
import authReducer from './reducers/auth';
import dataReducer from './reducers/api';
import productsReducer from './reducers/products';

const store = configureStore({
    reducer: {
        [storeApi.reducerPath]: storeApi.reducer,
        auth: authReducer,
        data: dataReducer,
        product: productsReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeApi.middleware),
});


store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});

const savedCart = localStorage.getItem('cart');
if (savedCart) {
    store.dispatch(rehydrateCart(JSON.parse(savedCart)));

}

export default store;

