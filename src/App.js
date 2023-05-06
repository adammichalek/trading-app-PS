import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Stocks from "./pages/Stocks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Stock from "./pages/Stock";
import UserProfile from "./pages/UserProfile";
import "./App.css";
import { AuthProvider } from "./authentication/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase-config";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthProvider value={{ currentUser }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/stocks/:id" element={<Stock />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
