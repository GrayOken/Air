import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useGetProductsQuery } from "./reducers/api";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import AuthForm from "./components/auth/AuthForm";
import Account from "./pages/Account.jsx";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
   const products = useGetProductsQuery();

   const [load, setLoad] = useState(true);

   useEffect(() => {
      setLoad(products.isLoading);
   }, [products]);

   const loadedRouter = (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
         </Routes>
      </>
   );

   return load ? <h1>Loading</h1> : loadedRouter;
}

export default App;
