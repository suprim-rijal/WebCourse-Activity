import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin(setIsAuthenticated);

  const email = useField("email");
  const password = useField("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login({
      email: email.value,
      password: password.value,
    });

    if (success) {
      toast.success("Logged in");
      navigate("/");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-md py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Log In</h2>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                className="border rounded w-full py-2 px-3"
                required
                {...email}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                className="border rounded w-full py-2 px-3"
                required
                {...password}
              />
            </div>

            {error && <div className="mb-4 text-red-600">{error}</div>}

            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-center mt-4">
              No account yet?{" "}
              <Link
                to="/signup"
                className="text-indigo-500 hover:text-indigo-600"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
