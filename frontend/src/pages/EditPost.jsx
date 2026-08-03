import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {ImCross} from 'react-icons/im'
import axios from "axios"
import { URL } from "../url"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


const EditPost = () => {

    const postId=useParams().id
    const {user}=useContext(UserContext)
    const navigate=useNavigate()
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])

    const fetchPost=async()=>{
      try{
        const res=await axios.get(URL + "/api/posts/"+postId)
        setTitle(res.data.title)
        setDesc(res.data.desc)
        setFile(res.data.photo)
        setCats(res.data.categories)

      }
      catch(err){
        console.log(err)
      }
    }



    const handleUpdate=async (e)=>{
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
      const post={
        title,
        desc,
        username:user.username,
        userId:user._id,
        categories:cats
      }

      if (file && typeof file !== "string") {
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
     
      try{
        const res=await axios.put(URL + "/api/posts/"+postId,post,{withCredentials:true})
        navigate("/posts/post/"+res.data._id)
        // console.log(res.data)

      }
      catch(err){
        console.log(err)
      }
    }

    

    useEffect(()=>{
      fetchPost()
    },[postId])

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
  return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Update Post
        </h1>

        <form className="space-y-6">

          {/* Title */}

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Post Title
            </label>

            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              type="text"
              placeholder="Enter post title"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Image */}

          <div>

            <label className="block font-semibold text-gray-700 mb-2">
              Change Featured Image
            </label>

            <input
              onChange={(e)=>setFile(e.target.files[0])}
              type="file"
              className="w-full border rounded-xl p-3 cursor-pointer"
            />

          </div>

          {/* Category */}

          <div>

            <label className="block font-semibold text-gray-700 mb-2">
              Categories
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                value={cat}
                onChange={(e)=>setCat(e.target.value)}
                placeholder="Add category"
                className="flex-1 border rounded-xl px-4 py-3 outline-none"
              />

              <button
                type="button"
                onClick={addCategory}
                className="bg-black text-white rounded-xl px-6 py-3 hover:bg-gray-800 transition"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-4">

              {cats.map((c,i)=>(
                <div
                  key={i}
                  className="flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-2"
                >

                  <span>{c}</span>

                  <button
                    type="button"
                    onClick={()=>deleteCategory(i)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <ImCross size={12}/>
                  </button>

                </div>
              ))}

            </div>

          </div>

          {/* Description */}

          <div>

            <label className="block font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              value={desc}
              onChange={(e)=>setDesc(e.target.value)}
              rows={8}
              placeholder="Update your blog..."
              className="w-full border rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-amber-400"
            />

          </div>

          <button
            onClick={handleUpdate}
            className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Update Post
          </button>

        </form>

      </div>

    </div>

    <Footer />
  </div>
);
}

export default EditPost