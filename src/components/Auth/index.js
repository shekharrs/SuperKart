import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AuthIndex = ({ type }) => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    console.log(details);
    if (type === "signup") {
      signupWithEmailAndPassword();
    }
  };

  const signupWithEmailAndPassword = async () => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyBI3NHUCNkCLLLYornYZSIdQnnCLBTCIr4]`,
        {
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container--box">
        <div className="tab-selector">
          <NavLink to={"/login"}>
            <h3>Login</h3>
          </NavLink>
          <NavLink to={"/signup"}>
            <h3>Signup</h3>
          </NavLink>
        </div>
        <form autoComplete={"off"} onSubmit={handleSubmission}>
          <div className="input-wrap">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your Email Id"
              value={details.email}
              onChange={handleInput}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={details.password}
              onChange={handleInput}
            />
          </div>
          <div className="button-wrap">
            <button className="login-btn">
              {type === "login" ? "Login" : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthIndex;