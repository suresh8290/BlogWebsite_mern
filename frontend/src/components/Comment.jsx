import axios from "axios";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-300 p-4 mb-4">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

        <div>
          <h3 className="font-semibold text-gray-800">
            @{c.author}
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            {c.updatedAt
              ? new Date(c.updatedAt).toLocaleDateString()
              : ""}
          </p>
        </div>

        {user?._id === c?.userId && (
          <button
            onClick={() => deleteComment(c._id)}
            title="Delete Comment"
            className="self-start sm:self-center p-2 rounded-full text-red-600 hover:bg-red-100 transition"
          >
            <MdDelete size={20} />
          </button>
        )}
      </div>

      {/* Comment */}
      <p className="mt-4 text-gray-700 leading-7 break-words whitespace-pre-wrap">
        {c.comment}
      </p>
    </div>
  );
};

export default Comment;