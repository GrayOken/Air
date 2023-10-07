import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../reducers/auth";
import TextInput from "../Inputs/TextInput.jsx";

/**
 * AuthForm allows a user to either login or register for an account.
 */
function AuthForm() {
   const [login] = useLoginMutation();
   const [register] = useRegisterMutation();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [first_name, setFirst_name] = useState("");
   const [last_name, setLast_name] = useState("");
   const [role, setRole] = useState("");

   const [isLogin, setIsLogin] = useState(true);
   const authType = isLogin ? "Login" : "Register";
   const oppositeAuthCopy = isLogin
      ? "Don't have an account?"
      : "Already have an account?";
   const oppositeAuthType = isLogin ? "Register" : "Login";

   /**
    * Send credentials to server for authentication
    */
   async function attemptAuth(event) {
      event.preventDefault();
      setError(null);

      const authMethod = isLogin ? login : register;
      const credentials = { username, password };

      try {
         setLoading(true);
         await authMethod(credentials).unwrap();
      } catch (error) {
         setLoading(false);
         setError(error.data);
      }
   }

   return (
      <main>
         <h1>{authType}</h1>
         <form onSubmit={attemptAuth} name={authType}>
            <label>
               Username
               <TextInput vl={username} type={"text"} chg={setUsername} />
            </label>
            <label>
               Password
               <TextInput vl={password} type={"password"} chg={setPassword} />
            </label>
            {/* <label>
               First Name
               <TextInput vl={first_name} type={"text"} chg={setFirst_name} />
            </label>
            <label>
               Last Name
               <TextInput vl={last_name} type={"text"} chg={setLast_name} />
            </label>
            <label>
               Role
               <TextInput vl={role} type={"text"} chg={setRole} />
            </label> */}
            <button type="submit">{authType}</button>
         </form>
         <p>
            {oppositeAuthCopy}{" "}
            <a
               onClick={() => {
                  setIsLogin(!isLogin);
               }}
            >
               {oppositeAuthType}
            </a>
         </p>
         {loading && <p>Logging in...</p>}
         {error && <p>{error}</p>}
      </main>
   );
}

export default AuthForm;
