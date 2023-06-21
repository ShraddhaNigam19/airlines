import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const auth = getAuth(app);

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        navigate("/airlines/list-passenger");
        Swal.fire({
          title: "Sign In Successful",
          text: "Welcome back!",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        // Handle sign-in errors
        setError(error.message);
        Swal.fire({
          title: "Sign In Error",
          text: error.message,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <span className="inline-flex items-center left-0 top-0 h-full ml-3 pl-2 border-l border-gray-400">
                  <FaEnvelope className="text-gray-500" />
                </span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="inline-flex items-center left-0 top-0 h-full ml-3 pl-2 border-l border-gray-400">
                  <FaLock className="text-gray-500" />
                </span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignIn}
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-500"
                href="/airlines/resetpassword"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Airlines. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
