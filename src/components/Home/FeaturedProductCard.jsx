import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./FeaturedProductCard.css";

export default function FeaturedProductCard({ product }) {
   const navigate = useNavigate();
   const [hovered, setHovered] = useState(false);

   return (
      <div
         className="display-card"
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         onClick={() => navigate(`/products/${product.id}`)}
      >
         <div className="display-card-image-container">
            <img src={product.image_url} className="display-card-image" />
            <div
               className="display-card-description"
               style={{ opacity: hovered ? 1 : 0 }}
            >
               <p>{product.description}</p>
            </div>
         </div>
         <div className="display-card-info">
            <p className="display-card-name">{product.name}</p>
            <p className="display-card-price">{product.price}/can</p>
         </div>
      </div>
   );
}
