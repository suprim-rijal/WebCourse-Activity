import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  // Safely parse the user object. If logged out, it will be null.
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    localStorage.removeItem("user"); // 1. delete the token from storage
    setIsAuthenticated(false); // 2. update React state → re-render
    navigate("/login"); // Optional but good UX: redirect to login
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Shown ONLY when the user is logged in */}
      {isAuthenticated && (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>

          {/* Use optional chaining (?.) just in case user is null during transition */}
          <span>Welcome, {user?.email}</span>

          <button onClick={handleClick}>Log out</button>
        </div>
      )}

      {/* Shown ONLY when the user is NOT logged in */}
      {!isAuthenticated && (
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
