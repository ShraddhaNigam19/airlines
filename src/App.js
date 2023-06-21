import "./index.css";
import LandingPage from "./components/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import ListPassenger from "./components/ListPassenger";
import Logout from "./components/Logout";
import Header from "./components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./components/firebase";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  // Check if user is authenticated on app load
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <div className="App">
      <Router>
        <Header user={user} />
        <Routes>
          <Route exact path="/airlines" element={<LandingPage />} />
          <Route path="/airlines/signin" element={<SignInPage />} />
          <Route path="/airlines/signup" element={<SignUpPage />} />
          <Route
            path="/airlines/resetpassword"
            element={<ResetPasswordPage />}
          />
          <Route path="/airlines/list-passenger" element={<ListPassenger />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
