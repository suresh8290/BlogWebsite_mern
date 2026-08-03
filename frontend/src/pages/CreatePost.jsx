import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const CreatePost = () => {
   
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(UserContext)
    const [cat,setCat]=useState("a")
    const [cats,setCats]=useState([])

    const navigate=useNavigate()

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i,1)
       setCats(updatedCats)
    }

    const addCategory = () => {
  if (!cat.trim()) return;

  if (cats.includes(cat)) return;

  setCats([...cats, cat]);

  setCat("");
};

    const handleCreate=async (e)=>{
        e.preventDefault()
        if (!user) {
  navigate("/login");
  return;
}
         if (!title.trim()) {
  alert("Please enter a title.");
  return;
}

if (!desc.trim()) {
  alert("Please enter a description.");
  return;
}

if (cats.length === 0) {
  alert("Please select at least one category.");
  return;
}
        const post={
          title,
          desc,
          username:user.username,
          userId:user._id,
          categories:cats
        }

        if(file){
          const data=new FormData()
          const filename=Date.now()+file.name
          data.append("img",filename)
          data.append("file",file)
          post.photo=filename
          // console.log(data)
          //img upload
          try{
            const imgUpload=await axios.post(URL + "/api/upload",data)
            // console.log(imgUpload.data)
          }
          catch(err){
            console.log(err)
          }
        }
        //post upload
        // console.log(post)
        try{
          const res=await axios.post(URL + "/api/posts/create",post,{withCredentials:true})
          navigate("/posts/post/"+res.data._id)
          // console.log(res.data)

        }
        catch(err){
          console.log(err)
        }
    }



  return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create New Post
        </h1>

        <form className="space-y-6">

          {/* Title */}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Post Title
            </label>

            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter post title"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Image */}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Featured Image
            </label>

            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="w-full border rounded-xl p-3 cursor-pointer"
            />
          </div>

          {/* Categories */}

          <div>

            <label className="block text-gray-700 font-semibold mb-2">
              Categories
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="flex-1 border rounded-xl px-4 py-3 outline-none"
              >
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Big Data">Big Data</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Business Management">
                  Business Management
                </option>
                <option value="Cloud Computing">
                  Cloud Computing
                </option>
                <option value="Database">Database</option>
                <option value="Cyber Security">
                  Cyber Security
                </option>
                <option value="DevOps">DevOps</option>
                <option value="Web Development">
                  Web Development
                </option>
                <option value="Mobile Development">
                  Mobile Development
                </option>
                <option value="Operating System">
                  Operating System
                </option>
                <option value="Enterprise">
                  Enterprise
                </option>
              </select>

              <button
                type="button"
                onClick={addCategory}
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-4">

              {cats.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-2"
                >
                  <span>{c}</span>

                  <button
                    type="button"
                    onClick={() => deleteCategory(i)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <ImCross size={12} />
                  </button>
                </div>
              ))}

            </div>

          </div>

          {/* Description */}

          <div>

            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>

            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={8}
              placeholder="Write your blog here..."
              className="w-full border rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-amber-400"
            />

          </div>

          {/* Button */}

          <button
            onClick={handleCreate}
            className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Publish Post
          </button>

        </form>

      </div>

    </div>

    <Footer />
  </div>
);
}

export default CreatePost