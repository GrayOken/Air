import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Nav() {
   var loggedIn = useSelector((state) => {
      return state.auth.credentials.user.userId !== null;
   });

   const accountLink = (
      <Link to={"/Account"} className="link-item">
         Account
      </Link>
   );
   const signUp = <Link to={"/login"} className="link-item">Sign-Up</Link>;

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
            {loggedIn ? accountLink : signUp}
         </ul>
      </nav>
   );
}
