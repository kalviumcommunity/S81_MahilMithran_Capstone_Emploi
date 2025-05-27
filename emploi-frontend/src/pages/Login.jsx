import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Minimal Navbar for Login Page
const NavbarMinimal = () => (
  <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
    <div className="text-xl font-bold text-blue-600">EMPLOI</div>
    <Link
      to="/register"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Sign Up
    </Link>
  </nav>
);

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // TODO: Replace with your actual login API call
      console.log("Logging in with:", formData);

      // Simulate success (replace this with actual login check)
      const isLoginSuccessful = true;

      if (isLoginSuccessful) {
        navigate("/home"); // Redirect to homepage
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarMinimal />

      <div className="flex justify-center items-center py-10">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login to Your Account</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded"
            >
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            New to EMPLOI?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
