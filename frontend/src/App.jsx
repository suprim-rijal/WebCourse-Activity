import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginComponent from "./pages/LoginComponent";
import SignupComponent from "./pages/SignupComponent";
import Profile from "./pages/Profile";

function App() {
  // Step 4: Lazy initializer function.
  // Runs only ONCE when the app first loads.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // Explicitly check that both the object and the token exist
    return user && user.token ? true : false;
  });

  return (
    <BrowserRouter>
      {/* Passing state and setter to Navbar */}
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />

      <Routes>
        {/* ── Protected Routes: only authenticated users ───────── */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />

        {/* Step 3.4: New Protected Route */}
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />

        {/* ── Guest-only Routes: only unauthenticated users ─────── */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginComponent setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupComponent setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
