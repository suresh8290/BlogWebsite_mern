import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();

  const [posts, setPosts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [cat, setCat] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);

    try {
      const res = await axios.get(URL + "/api/posts/" + search);

      setPosts(res.data);
      setFilterData(res.data);

      let cata = res.data.map((item) => item.categories);

      let sets = new Set();

      cata.forEach((category) => {
        category?.forEach((c) => {
          if (c.length > 0) sets.add(c);
        });
      });

      setCat(Array.from(sets));

      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const filterPosts = (category) => {
    const newPosts = posts.filter((post) =>
      post?.categories?.includes(category)
    );
    setFilterData(newPosts);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            Latest Blogs
          </h1>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Discover inspiring articles from Sumitra Mehandi Artworks
          </p>
        </div>

        {/* Categories */}
        {cat.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setFilterData(posts)}
              className="px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
              All
            </button>

            {cat.map((category) => (
              <button
                key={category}
                onClick={() => filterPosts(category)}
                className="px-5 py-2 rounded-full border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        {loader ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader />
          </div>
        ) : noResults ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-600">
              No Blogs Found
            </h2>

            <p className="text-gray-400 mt-2">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterData.map((post) => (
              <div key={post._id}>
                <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                  <HomePosts post={post} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;