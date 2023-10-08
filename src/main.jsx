import React from "react";
import ReactDOM from "react-dom/client";
import Nav from "./components/Nav/Nav";
import App from "./app";
import Footer from "./components/Footer/Footer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <div className="app-container">
               <Nav />
               <App />
               <Footer />
            </div>
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);
