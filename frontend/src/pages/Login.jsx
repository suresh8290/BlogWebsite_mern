import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
   if (loading) return;
  if (!email.trim()) {
    alert("Please enter your email.");
    return;
  }

  if (!password.trim()) {
    alert("Please enter your password.");
    return;
  }

  setLoading(true);
  setError(false);

  try {
    const res = await axios.post(
      URL + "/api/auth/login",
      { email, password },
      { withCredentials: true }
    );

    setUser(res.data);
    navigate("/");
  } catch (err) {
    setError(true);
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="min-h-screen bg-gray-50 flex flex-col">

    {/* Header */}
    <div className="flex items-center justify-between px-5 md:px-20 py-5 bg-white shadow-sm">

      <h1 className="text-xl md:text-2xl font-extrabold text-amber-700">
        <Link to="/">Sumitra Mehandi Artworks</Link>
      </h1>

      <Link
        to="/register"
        className="text-gray-700 hover:text-black font-medium"
      >
        Register
      </Link>

    </div>

    {/* Login Card */}

    <div className="flex-1 flex justify-center items-center px-4 py-10">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 md:p-8">

        {/* Avatar */}

        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl mx-auto mb-5">
          🌿
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to continue
        </p>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >

          {/* Email */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Email
            </label>

            <input
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-amber-400"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 font-semibold text-gray-700">
              Password
            </label>

            <input
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-xl px-4 py-3 outline-none transition focus:ring-2 focus:ring-amber-400"
            />

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold text-white transition duration-200 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 hover:scale-[1.02] active:scale-95"
            }`}
          >
            {loading ? "Logging in..." : "🔐 Login"}
          </button>

          {/* Error */}

          {error && (
            <div className="bg-red-100 text-red-700 rounded-xl py-3 text-center">
              Email or password is incorrect.
              <br />
              Please try again.
            </div>
          )}

          {/* Register */}

          <div className="text-center pt-2">

            <span className="text-gray-600">
              Don't have an account?
            </span>

            <Link
              to="/register"
              className="ml-2 text-amber-700 font-semibold hover:underline"
            >
              Register
            </Link>

          </div>

        </form>

      </div>

    </div>

    <div className="mt-10">
      <Footer />
    </div>

  </div>
);
}

export default Login