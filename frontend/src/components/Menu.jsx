import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

import {
  FiUser,
  FiEdit,
  FiBookOpen,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
} from "react-icons/fi";

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });

      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute top-14 right-3 md:right-10 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">

      {!user && (
        <>
          <Link
            to="/login"
            className="flex items-center gap-3 px-5 py-4 hover:bg-amber-50 transition"
          >
            <FiLogIn className="text-lg text-amber-700" />
            <span>Login</span>
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-3 px-5 py-4 hover:bg-amber-50 transition"
          >
            <FiUserPlus className="text-lg text-amber-700" />
            <span>Register</span>
          </Link>
        </>
      )}

      {user && (
        <>
          <Link
            to={`/profile/${user._id}`}
            className="flex items-center gap-3 px-5 py-4 hover:bg-amber-50 transition"
          >
            <FiUser className="text-lg text-amber-700" />
            <span>Profile</span>
          </Link>

          <Link
            to="/write"
            className="flex items-center gap-3 px-5 py-4 hover:bg-amber-50 transition"
          >
            <FiEdit className="text-lg text-amber-700" />
            <span>Write Blog</span>
          </Link>

          <Link
            to={`/myblogs/${user._id}`}
            className="flex items-center gap-3 px-5 py-4 hover:bg-amber-50 transition"
          >
            <FiBookOpen className="text-lg text-amber-700" />
            <span>My Blogs</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-4 text-left text-red-600 hover:bg-red-50 transition"
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  );
};

export default Menu;