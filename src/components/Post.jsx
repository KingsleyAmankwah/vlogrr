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
import { getAuth } from "firebase/auth";

const Post = () => {
  const initialFormState = {
    category: "",
    videoAsset: null,
    title: "",
    description: "",
    location: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const { category, title, location, description } = formState;
  const [loading, setLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const firestoreDb = getFirestore(firebaseApp);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleRemoveVideo = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef).then(() => {
      setVideoAsset(null);
    });
  
  };

  const storage = getStorage(firebaseApp);

  const uploadVideo = (e) => {
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    // Track the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setUploadProgress(progress);
        setLoading(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoAsset(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  const uploadVideoDetails = async (e) => {
    e.preventDefault();

    try {
      //   const { category, videoAsset, title, description, location } = formState;
      if (!category || !videoAsset || !title) {
        toast.error("Please fill all required fields");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      setLoading(true);
      const data = {
        id: `${Date.now()}`,
        title,
        userId: user.uid,
        category,
        location,
        videoUrl: videoAsset,
        description,
      };

      // save video metadata to Firestore
      await setDoc(doc(firestoreDb, "videos", data.id), data);

      setFormState(initialFormState);
      navigate("/");
      toast.success("Video uploaded!!!");
    } catch (error) {
      console.log(error);
      toast.error("Error uploading video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex justify-center items-center w-full min-h-screen p-10"
      onSubmit={uploadVideoDetails}
    >
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
              name="title"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="w-full md:flex justify-between items-center my-4 gap-8">
          <div className="w-full bg-blue-500 flex justify-between items-center my-4 gap-8">
            <select
              className="w-full bg-blue-500 text-white outline-none py-2 px-4 rounded-md"
              value={category}
              name="category"
              onChange={handleInputChange}
            >
              <option disabled defaultValue className="py-2 px-4 rounded-md">
                Select category
              </option>
              {categories &&
                categories.map((data) => (
                  <option
                    key={data.id}
                    className="p-2 text-lg hover:bg-black hover:bg-opacity-25"
                    value={data.name}
                  >
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
                name="location"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-full flex justify-center items-center">
          {!videoAsset ? (
            <>
              {loading ? (
                <div className="flex flex-col items-center">
                  <Spinner />
                  {uploadProgress && (
                    <p className="text-gray-500 font-medium mt-2">
                      Uploading: {uploadProgress.toFixed(0)}%
                    </p>
                  )}
                </div>
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
                    onChange={uploadVideo}
                    accept="video/mp4,video/x-m4v,video/*"
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

        <textarea
          className="w-full h-64 resize-none border border-gray-300 rounded-md p-2 text-lg placeholder-gray-500 outline-none"
          placeholder="Description"
          value={description}
          name="description"
          onChange={handleInputChange}
        ></textarea>

        <button
          className="w-full disabled:bg-blue-200 bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
          // onClick={() => uploadVideoDetails()}
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Post;
