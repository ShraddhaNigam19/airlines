import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { auth, sendPasswordResetEmail } from "./firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent successfully!");
        Swal.fire({
          title: "Reset Password",
          text: "Password reset email has been sent!",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log("Error sending password reset email:", error);
        Swal.fire({
          title: "Reset Password Error",
          text: error.message,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
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
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleResetPassword}
            >
              Reset Password
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
  );
};

export default ResetPasswordPage;
