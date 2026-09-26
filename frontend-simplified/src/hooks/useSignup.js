import { useState } from "react";

const useSignup = (setIsAuthenticated) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        return false;
      }

      // data = { email, token }
      localStorage.setItem("user", JSON.stringify(data));
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError("Could not reach the server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
