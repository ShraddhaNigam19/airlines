import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate("/list-passenger");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-100">
      <section className="bg-indigo-600 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8">
              Explore the World with Airlines
            </h1>
            <p className="text-xl lg:text-2xl text-white">
              Book your flights, discover new destinations, and experience
              exceptional service with our partner airlines.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-block mt-8 px-6 py-3 text-lg font-medium bg-white text-indigo-600 rounded-md hover:bg-indigo-500 hover:text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Why Choose Airlines?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">
                  Wide Range of Destinations
                </h3>
                <p>
                  Explore a vast selection of destinations across the globe,
                  from bustling cities to serene beach getaways.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">
                  Top-Notch Service
                </h3>
                <p>
                  Enjoy exceptional service and comfort onboard our partner
                  airlines, ensuring a pleasant and memorable travel experience.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">
                  Easy Booking Process
                </h3>
                <p>
                  Our user-friendly booking system allows you to quickly search,
                  select, and book flights with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-indigo-600 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-white text-sm">
            &copy;{new Date().getFullYear()} Airlines. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
