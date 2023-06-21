import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { signOut } from "../components/firebase";

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut()
      .then(() => {
        console.log("User logged out");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const handleLogoClick = () => {
    if (user) {
      navigate("/list-passenger");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <Link
                to={"/"}
                className="flex-shrink-0 text-2xl font-bold text-indigo-600 cursor-pointer"
                onClick={handleLogoClick}
              >
                Airlines
              </Link>
            </div>
            <div className="md:hidden">
              <button
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={toggleMenu}
              >
                <FaBars className="h-6 w-6" />
              </button>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center">
                {user && (
                  <button
                    onClick={handleLogout}
                    className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:text-indigo-700 transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                )}
                {!user && (
                  <>
                    <Link
                      to="/signin"
                      className="ml-8 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:text-indigo-700 transition duration-150 ease-in-out"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 sm:px-3">
              {user && (
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </button>
              )}
              {!user && (
                <>
                  <Link
                    to="/signin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
