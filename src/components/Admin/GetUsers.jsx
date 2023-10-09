import "./GetUsers.css";
import { useGetUsersQuery } from "../../reducers/api";

export default function GetUsers() {
   const { data: users = [], isLoading, isError } = useGetUsersQuery();
   if (!isLoading) {
      console.log(users);
   }
   console.log(users);
   return (
      <div className="users-container">
         {isLoading ? (
            <div>Loading users...</div>
         ) : isError ? (
            <div>Error Loading users...</div>
         ) : !users ? (
            <div>No users found</div>
         ) : (
            users.map((user) => {
               return (
                  <div className="user-card" key={user.id}>
                     <div className="user-card-row">
                        <div>Username</div>
                        <div>{user.username}</div>
                     </div>
                     <div className="user-card-row">
                        <div>First name</div>
                        <div>{user.first_name}</div>
                     </div>
                     <div className="user-card-row">
                        <div>Last name</div>
                        <div>{user.last_name}</div>
                     </div>
                  </div>
               );
            })
         )}
      </div>
   );
}
