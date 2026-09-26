import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";

const inputClass = "border rounded w-full py-2 px-3";
const labelClass = "block text-gray-700 font-bold mb-2";

const SignupPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useSignup(setIsAuthenticated);

  const name = useField("text");
  const email = useField("email");
  const password = useField("password");
  const phoneNumber = useField("tel");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const street = useField("text");
  const city = useField("text");
  const zipCode = useField("text");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup({
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      address: {
        street: street.value,
        city: city.value,
        zipCode: zipCode.value,
      },
    });

    if (success) {
      toast.success("Account created");
      navigate("/");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>

            <div className="mb-4">
              <label htmlFor="name" className={labelClass}>
                Full Name
              </label>
              <input id="name" className={inputClass} required {...name} />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input id="email" className={inputClass} required {...email} />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                className={inputClass}
                required
                {...password}
              />
              <p className="text-sm text-gray-500 mt-1">
                At least 8 characters, with upper & lower case letters, a number
                and a symbol.
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="phone_number" className={labelClass}>
                Phone Number
              </label>
              <input
                id="phone_number"
                className={inputClass}
                required
                {...phoneNumber}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className={labelClass}>
                Gender
              </label>
              <select
                id="gender"
                className={inputClass}
                required
                value={gender.value}
                onChange={gender.onChange}
              >
                <option value="">Select...</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="date_of_birth" className={labelClass}>
                Date of Birth
              </label>
              <input
                id="date_of_birth"
                className={inputClass}
                required
                {...dateOfBirth}
              />
            </div>

            <h3 className="text-2xl mb-5">Address</h3>

            <div className="mb-4">
              <label htmlFor="street" className={labelClass}>
                Street
              </label>
              <input id="street" className={inputClass} required {...street} />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input id="city" className={inputClass} required {...city} />
            </div>

            <div className="mb-4">
              <label htmlFor="zipCode" className={labelClass}>
                Zip Code
              </label>
              <input
                id="zipCode"
                className={inputClass}
                required
                {...zipCode}
              />
            </div>

            {error && <div className="mb-4 text-red-600">{error}</div>}

            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-500 hover:text-indigo-600"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
