import "./CompanyInsert.css";
import { faker } from "@faker-js/faker";

export default function CompanyInsert() {
   return (
      <div className="insert-container">
         <div className="insert-img-container">
            <img
               className="insert-img"
               src={faker.image.urlLoremFlickr({ category: "city" })}
               alt=""
            />
         </div>
         <div className="insert-blurb">
            <p>Breathe free</p>
            <p className="insert-title">Air.</p>
            <p className="insert-para">
               Introducing Air. your source for pure canned air. In a world
               where pollution and urban living have compromised the air we
               breathe, Air captures pristine air from remote locations, sealing
               it in cans. Whether combating city smog, seeking tranquility, or
               wanting a breath of nature, Air offers a revitalizing experience
               with scents from the Himalayas to the Amazon. Embrace wellness
               with Air and breathe easy, anywhere.
            </p>
         </div>
      </div>
   );
}
