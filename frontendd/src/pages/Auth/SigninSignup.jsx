import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from '../landing/Navbr.jsx';

const SignupSignin = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    date_of_birth: "",
    password: "",
  });

  const testUser = {
    email: "milan@gmail.com",
    password: "Pass@123"
  };
  const normalUser = {
    email: "viv@gmail.com",
    password: "Pass@123"
  };

  const fillTestCredentials = () => {
    setLoginData({
      email: testUser.email,
      password: testUser.password
    });
  };
  const fillNormalCredentials = () => {
    setLoginData({
      email: normalUser.email,
      password: normalUser.password
    });
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
      document.cookie = `accessToken=${response.data.accessToken};max-age=${
        7 * 24 * 60 * 60
      };path=/`;
      document.cookie = `role=${response.data.user.role};max-age=${
        7 * 24 * 60 * 60
      };path=/`;
      document.cookie = `userId=${response.data.user._id};max-age=${
        7 * 24 * 60 * 60
      };path=/`;
      document.cookie = `email=${response.data.user.email};max-age=${
        7 * 24 * 60 * 60
      };path=/`;
      console.log("Login successful:", response?.data);
      if (response.data.user.role == "normalUser") {
        navigate("/main");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      alert(`Login failed: ${error.response ? error.response.data.message : "Network error"}`);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/signUp",
        signupData
      );
      console.log("Signup successful:", response.data);
      flip();
    } catch (error) {
      console.error("Signup failed:", error.response ? error.response.data : error.message);
     
    }
  };
  return (
    <div>
      <Navbar />  
      <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 mt-24 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto relative h-auto min-h-[560px]">
          <div className={`relative w-full h-full preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Login Form - Front Side */}
            <div className={`absolute w-full h-full backface-hidden ${isFlipped ? 'invisible' : 'visible'}`}>
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">Welcome Back</h2>
                  <p className="text-sm sm:text-base text-emerald-600">Together we grow our community</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition placeholder-emerald-400 text-emerald-800"
                      value={loginData.email}
                      onChange={handleLoginInputChange}
                    />
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showPasswordLogin ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition placeholder-emerald-400 text-emerald-800"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-600"
                    >
                      {showPasswordLogin ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <button
                      type="button"
                      onClick={fillTestCredentials}
                      className="w-full bg-emerald-100 text-emerald-800 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-emerald-200 transition-all font-medium"
                    >
                      Use Admin Account
                    </button>
                    <button
                      type="button"
                      onClick={fillNormalCredentials}
                      className="w-full bg-emerald-100 text-emerald-800 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-emerald-200 transition-all font-medium"
                    >
                      Use Normal Account
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#003E1F] text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-[#002d17] transition-all font-semibold shadow-md hover:shadow-emerald-200"
                  >
                    Login
                  </button>
                </form>

                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-sm sm:text-base text-[#003E1F]">
                    New volunteer?{' '}
                    <button
                      onClick={() => setIsFlipped(true)}
                      className="text-[#003E1F] hover:text-emerald-900 font-medium underline underline-offset-2"
                    >
                      Join us
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Signup Form - Back Side */}
            <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${isFlipped ? 'visible' : 'invisible'}`}>
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-emerald-100">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">Join Our Community</h2>
                  <p className="text-sm sm:text-base text-emerald-600">Cultivate positive change</p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition placeholder-emerald-400 text-emerald-800"
                        value={signupData.firstName}
                        onChange={handleSignupInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition placeholder-emerald-400 text-emerald-800"
                        value={signupData.lastName}
                        onChange={handleSignupInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition placeholder-emerald-400 text-emerald-800"
                      value={signupData.email}
                      onChange={handleSignupInputChange}
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone_no"
                      placeholder="Phone Number"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition placeholder-emerald-400 text-emerald-800"
                      value={signupData.phone_no}
                      onChange={handleSignupInputChange}
                    />
                  </div>

                  <div>
                    <input
                      type="date"
                      name="date_of_birth"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition text-emerald-800"
                      value={signupData.date_of_birth}
                      onChange={handleSignupInputChange}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type={showPasswordSignup ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition placeholder-emerald-400 text-emerald-800"
                      value={signupData.password}
                      onChange={handleSignupInputChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordSignup(!showPasswordSignup)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-600"
                    >
                      {showPasswordSignup ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#003E1F] text-white py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-[#002d17] transition-all font-semibold shadow-md hover:shadow-emerald-200"
                  >
                    Sign Up
                  </button>
                </form>

                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-sm sm:text-base text-[#003E1F]">
                    Already a member?{' '}
                    <button
                      onClick={() => setIsFlipped(false)}
                      className="text-[#003E1F] hover:text-emerald-900 font-medium underline underline-offset-2"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SignupSignin;