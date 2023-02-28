import { useState } from "react";
import { FaSmileWink } from "react-icons/fa";
// import { HiOutlineUser, HiOutlineCog, HiAdjustments } from "react-icons/hi";
// import { BsBell } from "react-icons/bs";
// import { AiOutlineLogout } from "react-icons/ai";
import { IoCloudUpload, IoLocation } from "react-icons/io5";
import Spinner from "./Spinner";
// import {
// getStorage,
// ref,
// uploadBytesResumable,
// getDownloadURL,
// deleteObject,
// } from "firebase/storage";
import { firebaseApp } from "../firebase-config";
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";
import { categories } from "../data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Post = () => {
  const [category, setCategory] = useState("Select category");
  const [videoAsset, setVideoAsset] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // const storage = getStorage(firebaseApp);
  const firestoreDb = getFirestore(firebaseApp);

  const navigate = useNavigate();

  const auth = getAuth();

  const handleRemoveVideo = () => {
    setVideoAsset(null);
  };

  const uploadVideo = async (e) => {
    e.preventDefault();
    try {
      if (!title || !category || !videoAsset) {
        toast.error("Please add all fields");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const data = {
        id: `${Date.now()}`,
        title: title,
        userId: user.uid,
        category: category,
        location: location,
        videoUrl: videoAsset,
        description: description,
        timestamp: serverTimestamp(),
      };

      setLoading(true); // Set loading to true here
      // Upload the video
      await setDoc(doc(firestoreDb, "videos", `${Date.now()}`), data);

      setTitle("");
      setCategory("");
      setLocation("");
      setDescription("");
      setVideoAsset("");
      navigate("/");
      toast.success("Video uploaded!!!");
    } catch (error) {
      console.log(error);
      toast.error("Error uploading video");
      setLoading(false);
    }
  };

  return (
    <form className="flex justify-center items-center w-full min-h-screen p-10">
      <div className="w-4/5 md:w-full h-full border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-2">
        <div className="w-full">
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center">
              <FaSmileWink />
            </div>
            <input
              className="w-full pl-12 pr-4 py-2 text-lg placeholder-gray-500 border border-gray-300 outline-none rounded-md"
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:flex justify-between items-center my-4 gap-8">
          <div className="w-full bg-blue-500 flex justify-between items-center my-4 gap-8">
            <select
              className="w-full bg-blue-500 text-white outline-none py-2 px-4 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled defaultValue className="py-2 px-4 rounded-md">
                Select category
              </option>
              {categories &&
                categories.map((data) => (
                  <option
                    key={data.id}
                    className="p-2 text-lg hover:bg-black hover:bg-opacity-25"
                    onClick={() => setCategory(data.name)}
                    value={data.name}
                  >
                    {/* {data.iconSrc} */}
                    {data.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-full">
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center">
                <IoLocation />
              </div>
              <input
                className="w-full pl-12 pr-4 py-2 text-lg placeholder-gray-500 border border-gray-300 outline-none rounded-md"
                placeholder="Location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-full flex justify-center items-center">
          {!videoAsset ? (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center"
                  >
                    <span className="mr-2">
                      <IoCloudUpload />
                    </span>
                    <span className="text-gray-500 font-medium">
                      Choose a file
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setVideoAsset(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                </>
              )}
            </>
          ) : (
            <div className="relative">
              <video
                src={videoAsset}
                controls
                autoPlay
                loop
                className="w-full h-full"
              ></video>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={handleRemoveVideo}
              >
                X
              </button>
            </div>
          )}
        </div>

        {/* <div className="w-full h-64 flex justify-center items-center">
          {!videoAsset ? (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <label
                    for="file-upload"
                    className="cursor-pointer flex items-center"
                  >
                    <span className="mr-2">
                      <IoCloudUpload />
                    </span>
                    <span className="text-gray-500 font-medium">
                      Choose a file
                    </span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                  
                  />
                </>
              )}
            </>
          ) : (
            <video
              src={videoAsset}
              controls
              autoplay
              loop
              className="w-full h-full"
            ></video>
          )}
        </div> */}

        <textarea
          className="w-full h-64 resize-none border border-gray-300 rounded-md p-2 text-lg placeholder-gray-500 outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button
          className="w-full disabled:bg-blue-200 bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
          onClick={uploadVideo}
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Post;
