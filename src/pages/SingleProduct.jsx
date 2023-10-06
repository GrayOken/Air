import React from "react";
import ProductDetails from "../components/Products/ProductDetails";
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
               <ProductDetails product={productId} showDescription={true} />
               <div className="buttonsContainer">
                  <button onClick={() => navigate("/products")}>
                     Back to Products
                  </button>
                  <QuantityCounter />
               </div>
            </div>
         )}
      </div>
   );
}

export default SingleProduct;
