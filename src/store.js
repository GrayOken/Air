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
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeApi.middleware),
});


store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});

export default store;

