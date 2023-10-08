import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../reducers/api";
import QuantityCounter from "../components/Products/QuantityCounter";

function SingleProduct() {
   const { id } = useParams();
   const { data: productId, isLoading } = useGetProductByIdQuery(id);
   const navigate = useNavigate();

   return (
      <div>
         {isLoading ? (
            <h1>Loading...</h1>
         ) : !productId ? (
            <h1>Product Not Found</h1>
         ) : (
            <div className="singleProductContainer">
               <div className="buttonsContainer">
                  <button onClick={() => navigate("/products")}>
                     Back to Products
                  </button>
                  <QuantityCounter product={productId} />
               </div>
            </div>
         )}
      </div>
   );
}

export default SingleProduct;
