import { useState } from "react";
import { FaSmileWink } from "react-icons/fa";
// import { HiOutlineUser, HiOutlineCog, HiAdjustments } from "react-icons/hi";
// import { BsBell } from "react-icons/bs";
// import { AiOutlineLogout } from "react-icons/ai";
import { IoCloudUpload, IoLocation } from "react-icons/io5";
import Spinner from "./Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseApp } from "../firebase-config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { categories } from "../data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [category, setCategory] = useState("Select category");
  const [videoAsset, setVideoAsset] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const storage = getStorage(firebaseApp);
  const firestoreDb = getFirestore(firebaseApp);

  const navigate = useNavigate();

  const uploadVideo = async (e) => {
    e.preventDefault();
    try {
      if (!title || !category || !videoAsset) {
        toast.error("Please add all fields");
        return;
      }

      setLoading(true); // Set loading to true here

      const data = {
        id: `${Date.now()}`,
        title: title,
        // userId: userInfo?.uid,
        category: category,
        location: location,
        videoUrl: videoAsset,
        description: description,
      };

      // Upload the video
      await setDoc(doc(firestoreDb, "videos", `${Date.now()}`), data);

      setTitle("");
      setCategory("");
      setLocation("");
      setDescription("");
      setVideoAsset("");
      toast.success("Video uploaded!!!");
    } catch (error) {
      console.log(error);
      toast.error("Error uploading video");
    } finally {
      setLoading(false); // Set loading to false here regardless of whether there was an error or not
    }
  };

  return (
    <form class="flex justify-center items-center w-full min-h-screen p-10">
      <div class="w-4/5 md:w-full h-full border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-2">
        {/* {alert && (
          <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />
        )} */}

        <div class="w-full">
          <div class="relative">
            <div class="absolute left-0 top-0 h-full w-10 flex items-center justify-center">
              {/* <IoLocation /> */}
              <FaSmileWink />
            </div>
            <input
              class="w-full pl-12 pr-4 py-2 text-lg placeholder-gray-500 border border-gray-300 outline-none rounded-md"
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* <input
          class="w-full text-lg placeholder-gray-500 outline-none border-b"
          placeholder="Title"
          required
          type="text"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
        /> */}

        <div class="w-full md:flex justify-between items-center my-4 gap-8">
          <div class="w-full bg-blue-500 flex justify-between items-center my-4 gap-8">
            <select
              class="w-full bg-blue-500 text-white outline-none py-2 px-4 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled selected class="py-2 px-4 rounded-md">
                Select category
              </option>
              {categories &&
                categories.map((data) => (
                  <option
                    key={data.id}
                    class="px-4 py-2 text-lg hover:bg-black hover:bg-opacity-25"
                    onClick={() => setCategory(data.name)}
                    value={data.name}
                  >
                    {data.iconSrc}
                    <span class="ml-4">{data.name}</span>
                  </option>
                ))}
            </select>
          </div>

          {/* <div class="relative">
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
              {category}
            </button>
            <div class="absolute top-full left-0 z-10 w-64 shadow-xl">
              <ul class="bg-white divide-y divide-gray-200">
                {categories &&
                  categories.map((data) => (
                    <li
                      key={data.id}
                      class="px-4 py-2 text-lg hover:bg-black hover:bg-opacity-25"
                      onClick={() => setCategory(data.name)}
                    >
                      {data.iconSrc}
                      <span class="ml-4">{data.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div> */}

          <div class="w-full">
            <div class="relative">
              <div class="absolute left-0 top-0 h-full w-10 flex items-center justify-center">
                <IoLocation />
              </div>
              <input
                class="w-full pl-12 pr-4 py-2 text-lg placeholder-gray-500 border border-gray-300 outline-none rounded-md"
                placeholder="Location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div class="w-full h-64 flex justify-center items-center">
          {!videoAsset ? (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <label
                    for="file-upload"
                    class="cursor-pointer flex items-center"
                  >
                    <span class="mr-2">
                      <IoCloudUpload />
                    </span>
                    <span class="text-gray-500 font-medium">Choose a file</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    class="hidden"
                    onChange={(e) =>
                      setVideoAsset(URL.createObjectURL(e.target.files[0]))
                    }
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
              class="w-full h-full"
            ></video>
          )}
        </div>

        <textarea
          class="w-full h-64 resize-none border border-gray-300 rounded-md p-2 text-lg placeholder-gray-500 outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
          onClick={uploadVideo}
          // type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Post;
