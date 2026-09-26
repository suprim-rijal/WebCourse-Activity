import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove token from storage
    localStorage.removeItem("user");

    // 2. Update React state
    setIsAuthenticated(false);

    // 3. Redirect to login
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
