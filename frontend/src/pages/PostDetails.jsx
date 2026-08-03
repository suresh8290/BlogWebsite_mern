import { useNavigate, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import axios from "axios"
import { URL, IF } from "../url"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../components/Loader"
import { FcManager } from "react-icons/fc";


const PostDetails = () => {
  const postId = useParams().id;
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);

  // Fetch Post
  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Post
  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Comments
  const fetchPostComments = async () => {
    try {
      setLoader(true);

      const res = await axios.get(URL + "/api/comments/post/" + postId);

      setComments(res.data);

      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  // Add Comment
  const postComment = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!comment.trim()) return;

    try {
      await axios.post(
        URL + "/api/comments/create",
        {
          comment,
          author: user.username,
          postId,
          userId: user._id,
        },
        {
          withCredentials: true,
        }
      );

      setComment("");

      fetchPostComments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {loader ? (
        <div className="h-[70vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-5 text-amber-700 font-semibold hover:underline"
          >
            ← Back
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">

            {/* Title */}
            <div className="p-5 md:p-8">

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {post.title}
                </h1>

                {user?._id === post?.userId && (
                  <div className="flex items-center gap-3 text-xl">

                    <button
                      title="Edit Post"
                      onClick={() => navigate("/edit/" + postId)}
                      className="p-2 rounded-full hover:bg-amber-100 hover:text-amber-700 transition duration-200"
                    >
                      <BiEdit />
                    </button>

                    <button
                      title="Delete Post"
                      onClick={handleDeletePost}
                      className="p-2 rounded-full hover:bg-red-100 hover:text-red-700 transition duration-200"
                    >
                      <MdDelete />
                    </button>

                  </div>
                )}
              </div>

              {/* Author & Date */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-3 text-gray-600">

                <div className="flex items-center gap-2 text-sm md:text-base">
                  <FcManager className="text-2xl" />
                  <span>
                    By <span className="font-semibold">{post.username}</span>
                  </span>
                </div>

                <p className="text-sm">
                  {post.updatedAt
                    ? new Date(post.updatedAt).toLocaleDateString()
                    : ""}
                </p>

              </div>

            </div>

            {/* Featured Image */}

            <img
              src={post.photo ? IF + post.photo : "https://placehold.co/1200x600?text=No+Image"}
              alt={post.title}
              className="w-full h-64 sm:h-80 lg:h-[450px] object-cover"
            />

            {/* Description */}

            <div className="px-5 md:px-8 py-8">

              <p className="text-gray-700 leading-8 text-justify text-base md:text-lg whitespace-pre-wrap">
                {post.desc}
              </p>

            </div>

            {/* Categories */}

            <div className="px-5 md:px-8 pb-6">

              <p className="font-semibold text-gray-700 mb-3">
                Categories
              </p>

              <div className="flex flex-wrap gap-2">

                {post.categories?.map((c, i) => (
                  <div
                    key={i}
                    className="bg-amber-100 text-amber-700 rounded-full px-4 py-1 text-sm"
                  >
                    {c}
                  </div>
                ))}

              </div>

            </div>

            {/* Comments */}

            <div className="px-5 md:px-8 pb-6">

              <h2 className="text-xl font-semibold mb-5">
                Comments ({comments.length})
              </h2>

              {comments.length === 0 ? (
                <p className="text-gray-500">
                  No comments yet.
                </p>
              ) : (
                comments.map((c) => (
                  <Comment key={c._id} c={c} post={post} />
                ))
              )}

            </div>

            {/* Add Comment */}

            <div className="px-5 md:px-8 pb-8">

              <div className="flex flex-col md:flex-row gap-3">

                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
                />

                <button
                  onClick={postComment}
                  className="bg-black text-white rounded-xl px-6 py-3 hover:bg-gray-800 active:scale-95 transition"
                >
                  Add Comment
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      <Footer />
    </div>
  );
}

export default PostDetails