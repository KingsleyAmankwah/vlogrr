import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { getUserInfo } from "../utils/fetchData";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";
import Spinner from "./Spinner";

const VideoCard = ({ videoData }) => {
  const firestoreDb = getFirestore(firebaseApp);

  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoData) {
      setUserId(videoData.userId);
    }
  }, [videoData]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const getUserInfoAsync = async () => {
      try {
        const userInfo = await getUserInfo(firestoreDb, userId);
        setUserInfo(userInfo);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfoAsync();
  }, [firestoreDb, userId]);

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  // if (!videoData) {
  //   return (
  //     <div className="w-full flex justify-center items-center">
  //       <p className="text-red-500 text-sm">Error loading video data.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full">
      <div className="border border-gray-400 rounded-lg shadow-md">
        <Link to={`/video/${videoData?.id}`}>
          <div className="w-full h-full overflow-hidden">
            <video
              className="w-full h-full object-cover object-center"
              src={videoData?.videoUrl}
              alt={videoData?.title}
              controls
              onMouseOver={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
            />
          </div>
        </Link>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-900 text-lg">
              {videoData?.title}
            </p>
            <p className="text-gray-500 text-sm">
              {moment(new Date(parseInt(videoData.id)).toISOString()).fromNow()}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={
                userInfo?.photoURL ||
                `https://ui-avatars.com/api/?name=${userInfo?.email[0]}`
              }
              alt={userInfo?.displayName}
            />
            <p className="text-gray-500 text-sm">{userInfo?.displayName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
