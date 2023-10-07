import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../reducers/api";
import QuantityCounter from "../components/Products/QuantityCounter";

function SingleProduct() {
   const { id } = useParams();
   const { data, isLoading } = useGetProductByIdQuery(id);
   const navigate = useNavigate();

   return (
      <>
         {isLoading ? (
            <h1>Loading...</h1>
         ) : !data ? (
            <h1>Product Not Found</h1>
         ) : (
            <div className="single-product-container">
               <div className="single-product-image-container">
                  <button onClick={() => navigate("/products")}>
                     Back to Products
                  </button>
                  <img
                     src={`/public${data.image_url}`}
                     alt={`An image of ${data.name}`}
                  />
               </div>
               <div className="single-product-menu-container">
                  <div className="single-product-menu">
                     <div className="single-product-name">{data.name}</div>
                     <div className="single-product-description">
                        {data.description}
                     </div>
                     <div className="single-product-menu-chip">
                        <QuantityCounter />
                        <div>
                           <div className="single-product-price">
                              {data.price + " per can"}
                           </div>
                           <div className="single-product-country">
                              {"Made in " + data.country_of_origin}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default SingleProduct;
