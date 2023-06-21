import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const handleSignUp = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    const { email, password } = event.target.elements;

    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      console.log("Sign up successful");
      console.log(values);
      Swal.fire({
        title: "Sign Up Successful",
        text: "Welcome to Airlines!",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/list-passenger");
    } catch (error) {
      console.error("Sign up error", error);
      Swal.fire({
        title: "Sign Up Error",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSignUp}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <span className="inline-flex items-center left-0 top-0 h-full ml-3 pl-2 border-l border-gray-400">
                  <FaUser className="text-gray-500" />
                </span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                />
              </div>
            </div>
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
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
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
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      pass: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-500"
                href="/signin"
              >
                Sign In
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;{new Date().getFullYear()} Airlines. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
