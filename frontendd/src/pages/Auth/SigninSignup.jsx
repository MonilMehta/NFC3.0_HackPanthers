import React, { useState } from "react";
import "./SigninSignup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

function SignupSignin() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    date_of_birth: "",
    password: "",
  });

  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  const togglePasswordVisibilityLogin = () => {
    setShowPasswordLogin(!showPasswordLogin);
  };

  const togglePasswordVisibilitySignup = () => {
    setShowPasswordSignup(!showPasswordSignup);
  };

  const handleLoginInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/signIn",
        loginData
      );
      document.cookie = `accessToken=${response.data.accessToken};max-age=${7 * 24 * 60 * 60};path=/`;
      document.cookie = `role=${response.data.user.role};max-age=${7 * 24 * 60 * 60};path=/`;
      console.log("Login successful:", response?.data);
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users/signUp", signupData);
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup failed:", error.response.data);
    }
  };

  return (
    <div className="box">
      <div
        className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="box-login">
          <ul>
            <form onSubmit={handleLoginSubmit}>
              <h1>LOGIN</h1>
              <div className="email-login">
                <input
                  className="inpt"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                />
              </div>

              <div className="password-login">
                <input
                  className="inpt"
                  type={showPasswordLogin ? "text" : "password"}
                  name="password"
                  id="password-login"
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                />
                <i
                  id="eye-login"
                  className={`fa ${
                    showPasswordLogin ? "fa-eye" : "fa-eye-slash"
                  }`}
                  onClick={togglePasswordVisibilityLogin}
                  style={{ color: showPasswordLogin ? "cyan" : "white" }}
                ></i>
              </div>
              <button type="submit" className="btn">
                LOGIN
              </button>
            </form>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <a id="anchor1" onClick={flip}>
                  Sign Up
                </a>
              </p>
            </div>
          </ul>
        </div>
        <div className="box-signup">
          <ul>
            <form onSubmit={handleSignupSubmit}>
              <h1>SIGN UP</h1>
              <div className="user-signup">
                <input
                  className="inpt"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={signupData.firstname}
                  onChange={handleSignupInputChange}
                />
                <input
                  className="inpt"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={signupData.lastname}
                  onChange={handleSignupInputChange}
                />
              </div>

              <div className="email-signup">
                <input
                  className="inpt"
                  type="email"
                  name="email"
                  id="email-signup"
                  placeholder="Email"
                  required
                  value={signupData.email}
                  onChange={handleSignupInputChange}
                />
              </div>

              <div className="phone-signup">
                <input
                  className="inpt"
                  type="tel"
                  name="phone_no"
                  id="phone-signup"
                  placeholder="Phone"
                  required
                  value={signupData.phone}
                  onChange={handleSignupInputChange}
                />
              </div>

              <div className="dob-signup">
                <input
                  className="inpt"
                  type="date"
                  name="date_of_birth"
                  id="dob-signup"
                  placeholder="Date of birth"
                  required
                  value={signupData.dob}
                  onChange={handleSignupInputChange}
                />
              </div>

              <div className="password-signup">
                <input
                  className="inpt"
                  type={showPasswordSignup ? "text" : "password"}
                  name="password"
                  id="password-signup"
                  placeholder="Password"
                  required
                  value={signupData.password}
                  onChange={handleSignupInputChange}
                />
                <i
                  id="eye-signup"
                  className={`fa ${
                    showPasswordSignup ? "fa-eye" : "fa-eye-slash"
                  }`}
                  onClick={togglePasswordVisibilitySignup}
                  style={{ color: showPasswordSignup ? "cyan" : "white" }}
                ></i>
              </div>
              <button type="submit" className="btn">
                SIGN UP
              </button>
            </form>
            <div className="register-link">
              <p>
                Already have an account?{" "}
                <a id="anchor2" onClick={flip}>
                  Log In
                </a>
              </p>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SignupSignin;
