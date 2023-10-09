import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../reducers/api";
import AddProduct from "../components/Admin/AddProduct";
import GetUsers from "../components/Admin/GetUsers";

export default function Admin() {
   const credentials = JSON.parse(sessionStorage.getItem("credentials"));
   const userId = credentials.user.user_id;
   const { data: data, isLoading } = useGetUserByIdQuery(userId);

   const [load, setLoad] = useState(true);
   const [active, setActive] = useState(true);

   useEffect(() => {
      setLoad(isLoading);
   }, [data]);

   function handleClick() {
      setActive(!active);
   }

   return load ? (
      <div>Loading...</div>
   ) : data.role !== "Admin" ? (
      <div>Not an Admin</div>
   ) : (
      <div className="admin-container">
         <div className="admin-btns">
            <div
               onClick={handleClick}
               className={`admin-btn left ${active ? "active" : ""}`}
            >
               Add Products
            </div>
            <div
               onClick={handleClick}
               className={`admin-btn right ${active ? "" : "active"}`}
            >
               See users
            </div>
         </div>
         <div className="admin-panel-container">
            <div className="admin-panel">
               {active ? <AddProduct /> : <GetUsers />}
            </div>
         </div>
      </div>
   );
}
