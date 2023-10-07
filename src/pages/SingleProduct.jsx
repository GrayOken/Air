import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../reducers/api";
import QuantityCounter from "../components/Products/QuantityCounter";



function SingleProduct() {
   const { id } = useParams();
   const { data, isLoading } = useGetProductByIdQuery(id);
   const navigate = useNavigate();

   return (
      <div>
         {isLoading ? (
            <h1>Loading...</h1>
         ) : !data ? (
            <h1>Product Not Found</h1>
         ) : (
            <div className="singleProductContainer">
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
