import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (loading) return;

    setError(false);
    setMessage("");

    if (!username.trim()) {
      setMessage("Please enter your username.");
      return;
    }

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setMessage("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });

      setMessage("✅ Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.log(err);
       console.log("ERROR:", err);
  console.log("MESSAGE:", err.message);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);


      setError(true);

      if (err.response?.status === 409) {
        setMessage("Email is already registered.");
      } else {
        setMessage("Registration failed. Please try again.");
      }
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
          to="/login"
          className="text-gray-700 hover:text-black font-medium"
        >
          Login
        </Link>

      </div>

      {/* Register Card */}

      <div className="flex-1 flex justify-center items-center px-4 py-10">

        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 md:p-8">

          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl mx-auto mb-5">
            🌿
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Join Sumitra Mehandi Artworks
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >

            {/* Username */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Username
              </label>

              <input
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setMessage("");
                  setError(false);
                }}
                type="text"
                placeholder="Enter your username"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              />

            </div>

            {/* Email */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                  setError(false);
                }}
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              />

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>

              <input
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                  setError(false);
                }}
                type="password"
                placeholder="Create a password"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              />

            </div>

            {/* Message */}

            {message && (
              <div
                className={`rounded-xl py-3 text-center font-medium ${
                  error
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* Register Button */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3 font-semibold text-white transition duration-200 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 hover:scale-[1.02] active:scale-95"
              }`}
            >
              {loading ? "Creating Account..." : "📝 Register"}
            </button>

            <div className="text-center pt-2">

              <span className="text-gray-600">
                Already have an account?
              </span>

              <Link
                to="/login"
                className="ml-2 text-amber-700 font-semibold hover:underline"
              >
                Login
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
};

export default Register;