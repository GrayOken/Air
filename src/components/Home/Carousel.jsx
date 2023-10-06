import React, { useState, useEffect } from "react";
import "./Carousel.css";

export default function Carousel() {
   const [currentIndex, setCurrentIndex] = useState(0);
   const images = [
      "../../assets/airlogo.png",
      "../../assets/carousel1.png",
      "../../assets/carousel2.png",
   ];

   function scrollFunction() {
      if (currentIndex === images.length - 1) {
         return setCurrentIndex(0);
      }
      return setCurrentIndex(currentIndex + 1);
   }

   useEffect(() => {
      const interval = setInterval(() => {
         scrollFunction();
      }, 10000);
      return () => clearInterval(interval);
   });

   return (
      <div className="carousel-container">
         {images.map((image, i) => {
            return (
               <img
                  className="carousel-item"
                  src={image}
                  style={{ transform: `translate(-${currentIndex * 100}%)` }}
                  key={i}
               />
            );
         })}
      </div>
   );
}
