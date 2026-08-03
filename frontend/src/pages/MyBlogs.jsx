import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    if (!user) return;

    setLoader(true);

    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Blogs
          </h1>

          <p className="text-gray-500 mt-2">
            {posts.length} {posts.length === 1 ? "Blog" : "Blogs"} Published
          </p>

        </div>

        {loader ? (

          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>

        ) : posts.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold text-gray-700">
              No Blogs Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Start sharing your amazing mehandi designs and ideas.
            </p>

            <Link
              to="/write"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Create Your First Blog
            </Link>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {posts.map((post) => (
              <Link key={post._id} to={`/posts/post/${post._id}`}>
                <HomePosts post={post} />
              </Link>
            ))}

          </div>

        )}

      </div>

      <Footer />

    </div>
  );
};

export default MyBlogs;