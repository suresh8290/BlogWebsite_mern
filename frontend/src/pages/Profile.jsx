import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    if (!user) {
  navigate("/login");
  return;
}
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
  setUpdated(false);
  if (!username.trim()) {
  alert("Username cannot be empty.");
  return;
}

if (!email.trim()) {
  alert("Email cannot be empty.");
  return;
}
 
setLoading(true);
  try {
    const res = await axios.put(
      URL + "/api/users/" + user._id,
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
    setUpdated(true);
  } catch (err) {
    console.log(err);
    setUpdated(false);
  }
  finally{
    setLoading(false);
  }
};

  const handleUserDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(URL + "/api/users/" + user._id, {
      withCredentials: true,
    });

    setUser(null);
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};



  useEffect(() => {
  if (user) {
    fetchProfile();
  }
}, [user]);

  return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">

        <div className="flex flex-col items-center mb-8">

          <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-4xl">
            👤
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account information
          </p>

        </div>

        <div className="space-y-5">

          <div>

            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>

            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              type="text"
            />

          </div>

          <div>

            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>

            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              type="email"
            />

          </div>

          <div>

            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>

            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
              type="password"
            />

          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">

            <button
  disabled={loading}
  onClick={handleUserUpdate}
  className={`flex-1 rounded-xl py-3 font-semibold text-white transition ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-black hover:bg-gray-800"
  }`}
>
  {loading ? "Saving..." : "💾 Save Changes"}
</button>

            <button
              onClick={handleUserDelete}
              className="flex-1 bg-red-600 text-white rounded-xl py-3 font-semibold hover:bg-red-700 transition"
            >
              🗑 Delete Account
            </button>

          </div>

          {updated && (
            <div className="bg-green-100 text-green-700 rounded-xl py-3 text-center font-medium">
              Your profile has been updated successfully.
            </div>
          )}

        </div>

      </div>

    </div>

    <Footer />
  </div>
);
};

export default Profile;