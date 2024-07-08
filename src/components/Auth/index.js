import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";
import { useDispatch } from "react-redux";
import { loginWithEmailAndPassword, signupWithEmailAndPassword } from "../../actions/auth";

const AuthIndex = ({ type }) => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    return () => {
      setLoader(false)
      setDetails({
        email: "",
        password: ""
      })
    }
  }, [])

  const handleSubmission = (e) => {
    e.preventDefault();
    if (type === "signup") {
      setLoader(true)
      dispatch(signupWithEmailAndPassword(details, data => {
        if(data.error) {
          console.log(data.error)
          alert("some error occurred")
        }
        else {
          console.log("Successfully Signed up!")
          navigate('/')
        }
        setLoader(false)
      }))
    }
    else if(type === "login") {
      setLoader(true)
      dispatch(loginWithEmailAndPassword(details, data => {
        if(data.error) {
          console.log(data.response)
          alert(data?.response?.data?.error?.message || "Some error occurred") 
        }
        else {
          // console.log("Successfully logged in!")
          navigate('/')
        }
        setLoader(false)
      }))
    }
  };


  return (
    <Fragment>
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
    { loader && <Loader/>}
    </Fragment>
  );
};

export default AuthIndex;