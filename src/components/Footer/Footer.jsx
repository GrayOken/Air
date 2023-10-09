import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
   return (
      <div className="footer-container">
         <div className="footer-left">
            <ul>
               <Link to={"/"} className="footer-nav">
                  <li>HOME</li>
               </Link>
               <Link to={"/products"} className="footer-nav">
                  <li>PRODUCTS</li>
               </Link>
               <Link to={"/cart"} className="footer-nav">
                  <li>CART</li>
               </Link>
            </ul>
         </div>
         
         <div className="footer-right">
            <img
               src="../../../assets/footer-qr.png"
               alt=""
               className="footer-qr"
            />
         </div>
      </div>
   );
}
