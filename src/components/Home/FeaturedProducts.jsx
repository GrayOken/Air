import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../reducers/api";
import FeaturedProductCard from "./FeaturedProductCard";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
   const { data: products = [] } = useGetProductsQuery();
   const [displayProducts, setDisplayProducts] = useState([]);

   useEffect(() => {
      let ceiling = products.length - 6;
      function randomMin(max) {
         return Math.floor(Math.random() * max);
      }
      let floor = randomMin(ceiling);
      setDisplayProducts(shuffle(products.slice(floor, floor + 6)));
   }, [products]);

   const featuredDisplay = (
      <>
         {displayProducts.map((e, i) => {
            return <FeaturedProductCard product={e} key={i} />;
         })}
      </>
   );

   return displayProducts.length === 0 ? (
      <p>Something went wrong!</p>
   ) : (
      <div className="display-container">{featuredDisplay}</div>
   );
}

function shuffle(array) {
   let currentIndex = array.length,
      randomIndex;

   // While there remain elements to shuffle.
   while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
         array[randomIndex],
         array[currentIndex],
      ];
   }

   return array;
}
