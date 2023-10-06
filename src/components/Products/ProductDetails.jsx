import React from "react";

export default function ProductDetails({ product, showDescription }) {
   return (
      <div className="productDetails" key={product.id}>
         <img src={product.image_url} alt="product images" />
         <div className="productInfo">
            <h1>{product.name}</h1>
            <h3>$ {product.price}</h3>
            <h3>Made in {product.country_of_origin}</h3>
            {showDescription && <p>{product.description}</p>}
         </div>
      </div>
   );
}
