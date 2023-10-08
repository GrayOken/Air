import "./Footer.css";

export default function Footer() {
   return (
      <div className="footer-container">
         <div className="footer-left">
            <ul>
               <li>1</li>
               <li>2</li>
               <li>3</li>
            </ul>
         </div>
         <div className="footer-mid">
            <ul>
               <li>one</li>
               <li>two</li>
               <li>three</li>
               <li>four</li>
            </ul>
         </div>
         <div className="footer-right">
            <img
               src="../../../assets/footer-qr.png"
               alt=""
               className="footer-qr"
            />
         </div>
      </div>
   );
}
