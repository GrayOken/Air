import React from "react";
import Carousel from "../components/Home/Carousel";
import CompanyInsert from "../components/Home/CompanyInsert";
import FeaturedProducts from "../components/Home/FeaturedProducts";

export default function Home() {
   return (
      <>
         <Carousel />
         <CompanyInsert />
         <FeaturedProducts />
      </>
   );
}
