/* eslint-disable react/prop-types */
import { IF } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={post.photo ? IF + post.photo : "/placeholder.jpg"}
          alt={post.title}
          className="w-full h-52 sm:h-56 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2">
          {post.title}
        </h2>

        {/* Author */}
        <p className="text-sm text-amber-700 font-medium mt-2">
          By {post.username}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3 line-clamp-3">
          {post.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5">

          <span className="text-xs text-gray-500">
            {new Date(post.updatedAt).toLocaleDateString()}
          </span>

          <span className="text-sm font-semibold text-amber-700 hover:text-amber-900">
            Read More →
          </span>

        </div>

      </div>
    </div>
  );
};

export default HomePosts;