import { IF } from "../url";

const ProfilePosts = ({ p }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

      {/* Image */}

      <img
        src={p.photo ? IF + p.photo : "https://placehold.co/600x400?text=No+Image"}
        alt={p.title}
        className="w-full h-52 object-cover"
      />

      {/* Content */}

      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
          {p.title}
        </h2>

        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 mt-3 gap-1">

          <span className="font-medium text-amber-700">
            @{p.username}
          </span>

          <span>
            {new Date(p.updatedAt).toLocaleDateString()}
          </span>

        </div>

        <p className="text-gray-600 mt-4 leading-7">
          {p.desc.length > 150
            ? p.desc.slice(0, 150) + "... Read more"
            : p.desc}
        </p>

      </div>

    </div>
  );
};

export default ProfilePosts;