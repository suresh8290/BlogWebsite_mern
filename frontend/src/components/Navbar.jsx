import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    if (prompt.trim()) {
      navigate(`/?search=${prompt}`);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-base sm:text-lg md:text-2xl font-extrabold tracking-wide leading-tight">
            Sumitra
            <span className="text-yellow-400"> Mehandi</span>
            <br className="sm:hidden" />
            <span className="text-sm sm:text-lg font-semibold">
              {" "}Artworks
            </span>
          </h1>
        </Link>

        {/* Search */}
        {path === "/" && (
          <div className="hidden sm:flex items-center w-64 md:w-80">
            <input
              type="text"
              placeholder="Search designs..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 rounded-l-full text-black outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-r-full"
            >
              <BsSearch />
            </button>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm lg:text-base font-medium">
          {user ? (
            <Link
              to="/write"
              className="hover:text-yellow-400 transition"
            >
              Write
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-yellow-400 transition"
            >
              Login
            </Link>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={showMenu}
                className="text-xl hover:text-yellow-400"
              >
                <FaBars />
              </button>

              {menu && <Menu />}
            </div>
          ) : (
            <Link
              to="/register"
              className="hover:text-yellow-400 transition"
            >
              Register
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">

          {path === "/" && (
            <button
              onClick={handleSearch}
              className="bg-yellow-400 text-black p-2 rounded-full"
            >
              <BsSearch />
            </button>
          )}

          <div className="relative">
            <button
              onClick={showMenu}
              className="text-xl"
            >
              <FaBars />
            </button>

            {menu && <Menu />}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {path === "/" && (
        <div className="sm:hidden px-4 pb-3">
          <div className="flex">
            <input
              type="text"
              placeholder="Search designs..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 rounded-l-full text-black outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-yellow-400 text-black px-4 rounded-r-full"
            >
              <BsSearch />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;