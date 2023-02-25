import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { getUserInfo } from "../utils/fetchData";
import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";

const avatar =
  "https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=164360626";

const VideoCard = ({ videoData }) => {
  const firestoreDb = getFirestore(firebaseApp);

  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (videoData) setUserId(videoData.userId);
    if (userId)
      getUserInfo(firestoreDb, userId).then((videoData) => {
        setUserInfo(videoData);
      });
  }, [firestoreDb, userId, videoData]);

  return (
    <div className="w-full">
      <div className="border border-gray-400 rounded-lg shadow-md">
        <Link to={`/video/${videoData?.id}`}>
          <video
            className="w-full object-cover object-center"
            src={videoData.videoUrl}
            alt={videoData.title}
            controls
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}
          />
        </Link>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-900 text-lg">
              {videoData?.title}
            </p>
            <p className="text-gray-500 text-sm">
              {moment(videoData?.uploadedAt).fromNow()}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
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
