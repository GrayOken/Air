import { useNavigate } from "react-router-dom";
import "./ProductCard.css";


export default function ProductCard({ product }) {
   const navigate = useNavigate();
   
   return (
      <div
         className="product-card"
         onClick={() => navigate(`/products/${product.id}`)}
      >
         <div className="product-card-image-container">
            <img src={product.image_url} className="product-card-image" />
         </div>
         <div className="product-card-info">
            <p className="product-card-name">{product.name}</p>
            <div className="product-card-info-right">
               <p className="product-card-price">{product.price}/can</p>
               <p className="product-card-country">
                  Made in {product.country_of_origin}
               </p>
            </div>
         </div>
      </div>
   );
}
