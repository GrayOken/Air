import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useLogoutMutation } from "../../reducers/auth";
import "./Nav.css";

export default function Nav() {
   const [logmeout] = useLogoutMutation();
   const navigate = useNavigate();

   var user = useSelector((state) => {
      return state.auth.credentials.user;
   });

   function logoutHandler() {
      logmeout();
      navigate("/");
   }

   const accountLink = (
      <Link to={"/Account"} className="link-item" key={1}>
         Account
      </Link>
   );
   const logout = (
      <div className="link-item" onClick={logoutHandler} key={2}>
         Logout
      </div>
   );
   const signUp = (
      <Link to={"/login"} className="link-item">
         Log in
      </Link>
   );

   return (
      <nav className="Navbar">
         <Link to={"/"}>
            <img
               src={"../../assets/AirLogoSmallNoBack.png"}
               className={"home-btn"}
            />
         </Link>
         <ul className={"link-container"}>
            <Link to={"/"} className="link-item">
               Home
            </Link>
            <Link to={"/Products"} className="link-item">
               Products
            </Link>
            <Link to={"/cart"} className="link-item">
               Cart
            </Link>
            {user.role === "Admin" ? (
               <Link to={"/account/admin"} className="link-item">
                  Admin
               </Link>
            ) : (
               <div></div>
            )}
            {user.user_id !== null ? logout : signUp}
         </ul>
      </nav>
   );
}
