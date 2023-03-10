import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";

// import { firestore } from "../firebase-config";
import { firebaseApp } from "../firebase-config";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { getUserInfo } from "../utils/fetchData";

const VideoDetails = () => {
  const firestoreDb = getFirestore(firebaseApp);
  const { id } = useParams();

  const [videoData, setVideoData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getVideoData = async () => {
      const videoRef = doc(firestoreDb, "videos", id);
      let videoDoc = null;
      try {
        videoDoc = await getDoc(videoRef);
        if (videoDoc.exists()) {
          setVideoData(videoDoc.data());
          const data = await getUserInfo(firestoreDb, videoDoc.data().userId);
          setUserInfo(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getVideoData();
  }, [firestoreDb, id]);

  return (
    <div className="w-full flex flex-col lg:flex-row">
      {videoData ? (
        <div className="lg:w-2/3 lg:pr-4 w-full h-80 ">
          <video
            className="w-full object-cover object-center"
            src={videoData?.videoUrl}
            alt={videoData?.title}
            controls
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}
          />
        </div>
      ) : (
        <div className="text-center">Video not available</div>
      )}
      <div className="lg:w-1/3 mt-4 lg:mt-0">
        {videoData && (
          <div className="p-4">
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-900 text-lg">
                {videoData?.title}
              </p>
              <p className="text-gray-500 text-sm">
                {moment(
                  new Date(parseInt(videoData.id)).toISOString()
                ).fromNow()}
              </p>
            </div>
            <p className="text-gray-500 text-sm">{videoData?.location}</p>
            <p className="text-gray-500 text-sm">{videoData?.description}</p>
            <div className="flex items-center mt-4">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={
                  userInfo?.photoURL ||
                  `https://ui-avatars.com/api/?name=${userInfo?.email[0]}`
                }
                alt={userInfo?.name}
              />
              <p className="text-gray-500 text-sm">{userInfo?.displayName}</p>
            </div>
            <a
              href={videoData?.videoUrl}
              download
              className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
