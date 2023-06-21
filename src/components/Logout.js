import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        Swal({
          title: "Logout Successful",
          text: "You have been logged out.",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Swal({
          title: "Logout Error",
          text: error.message,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <div className="fixed bottom-0 right-0 m-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
