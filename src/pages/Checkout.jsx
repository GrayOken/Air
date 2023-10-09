import React from "react";
import { useState } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
// import { useGetOrdersByIdQuery } from "../reducers/api";

function Checkout() {
   const [selectedOption, setSelectedOption] = useState("");

   const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
   };

   return (
      <>
         <div className="containers">
            <form className="checkoutForm">
               <div className="shippingInfo">
                  <h1>SHIPPING DETAILS</h1>
                  <div className="namesRow">
                     <label for="first_name">
                        First Name
                        <input
                           type="text"
                           id="first_name"
                           name="first_name"
                           required
                        />
                     </label>
                     <label for="last_name">
                        Last Name
                        <input
                           type="text"
                           id="last_name"
                           name="last_name"
                           required
                        />
                     </label>
                  </div>
                  <div className="emailRow">
                     <label htmlFor="email">
                        Email
                        <input
                           placeholder="you@example.com"
                           type="text"
                           id="email"
                           name="email"
                           required
                        />
                     </label>
                  </div>
                  <div className="addressRow">
                     <label for="address">
                        Address
                        <input
                           placeholder="1234 Main Street"
                           type="text"
                           id="address"
                           name="address"
                           required
                        />
                     </label>
                  </div>
                  <div className="addressTwoRow">
                     <label for="address2">
                        Address 2 (Optional)
                        <input
                           placeholder="Apartment or Suite"
                           type="text"
                           id="address2"
                           name="address2"
                           required
                        />
                     </label>
                  </div>
                  <div className="locationRow">
                     <label for="city">
                        City
                        <input type="text" id="city" name="city" required />
                     </label>

                     <label for="zip">
                        Zip Code
                        <input type="text" id="zip" name="zip" required />
                     </label>
                  </div>
               </div>

               <div className="paymentInfo">
                  <h1>PAYMENT DETAILS</h1>
                  <label for="cardName">
                     Name on Card
                     <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        required
                     />
                  </label>

                  <label for="card">
                     Credit Card Number
                     <input type="text" id="card" name="card" required />
                  </label>

                  <label for="expDate">
                     Expiration Date
                     <input type="text" id="expDate" name="expDate" required />
                  </label>

                  <label for="cvv">
                     CVV
                     <input type="text" id="cvv" name="cvv" required />
                  </label>
               </div>
               <div className="shippingOptions">
                  <h1>SHIPPING OPTIONS</h1>
                  <label>
                     <input
                        type="radio"
                        value="free"
                        checked={selectedOption === "free"}
                        onChange={handleOptionChange}
                     />
                     Free Shipping Delivery in One Week Free
                  </label>

                  <label>
                     <input
                        type="radio"
                        value="usps"
                        checked={selectedOption === "usps"}
                        onChange={handleOptionChange}
                     />
                     USPS Standard Shipping Delivery in 3-5 days $3.99
                  </label>

                  <label>
                     <input
                        type="radio"
                        value="fedex"
                        checked={selectedOption === "fedex"}
                        onChange={handleOptionChange}
                     />
                     Fedex 2-Day Shipping Delivery in 2 days $7.99
                  </label>
               </div>
               <Link to="/cart">
                  <button className="backToCartButton">Back to Cart</button>
               </Link>
            </form>
            <div className="orderDetails">
               <h3>Order Summary</h3>
               <p>Product Quantity Price</p>
               <p>Product Quantity Price</p>
               <p>Product Quantity Price</p>

               <p>Taxes & Fees: Price</p>
               <p>Shipping: Price</p>

               <p>Total:TOTAL</p>
            </div>
         </div>
         <div className="toThankYou">
            <Link to="/thankyou">
               <button>Complete Your Order</button>
            </Link>
         </div>
      </>
   );
}

export default Checkout;
