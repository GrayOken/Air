import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../reducers/auth";
import TextInput from "../Inputs/TextInput.jsx";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

/**
 * AuthForm allows a user to either login or register for an account.
 */
function AuthForm() {
   const [login] = useLoginMutation();
   const [register] = useRegisterMutation();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [first_name, setFirst_name] = useState("");
   const [last_name, setLast_name] = useState("");

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
      const credentials = { username, password, first_name, last_name };

      try {
         setLoading(true);
         await authMethod(credentials).unwrap();
         navigate("/account");
      } catch (error) {
         setLoading(false);
         setError(error.data);
      }
   }

   const loginForm = (
      <form onSubmit={attemptAuth} name={authType}>
         <label>
            Username
            <TextInput vl={username} type={"text"} chg={setUsername} />
         </label>
         <label>
            Password
            <TextInput vl={password} type={"password"} chg={setPassword} />
         </label>
         <button type="submit" className="auth-form-submit">
            {authType}
         </button>
      </form>
   );

   const registerForm = (
      <form onSubmit={attemptAuth} name={authType}>
         <label>
            Username
            <TextInput vl={username} type={"text"} chg={setUsername} />
         </label>
         <label>
            Password
            <TextInput vl={password} type={"password"} chg={setPassword} />
         </label>
         <label>
            First Name
            <TextInput vl={first_name} type={"text"} chg={setFirst_name} />
         </label>
         <label>
            Last Name
            <TextInput vl={last_name} type={"text"} chg={setLast_name} />
         </label>
         <button type="submit" className="auth-form-submit">
            {authType}
         </button>
      </form>
   );

   return (
      <div className="auth-container">
         <div className="auth-form-container">
            <h1>{authType}</h1>
            {authType === "Login" ? loginForm : registerForm}
            <div className="auth-form-switch">
               {oppositeAuthCopy}{" "}
               <a
                  onClick={() => {
                     setIsLogin(!isLogin);
                  }}
               >
                  {oppositeAuthType}
               </a>
            </div>
            {loading && <p>Logging in...</p>}
            {error && <p>{error}</p>}
         </div>
      </div>
   );
}

export default AuthForm;
