import { useState } from "react";

const useLogin = (setIsAuthenticated) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return false;
      }

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

  return { login, isLoading, error };
};

export default useLogin;
