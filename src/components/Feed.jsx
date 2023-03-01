import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import VideoCard from "./VideoCard"; // Assuming you have a VideoCard component
import Spinner from "./Spinner";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     const db = getFirestore();
  //     const videosRef = collection(db, "videos");
  //     const querySnapshot = await getDocs(videosRef);
  //     const videosList = [];
  //     querySnapshot.forEach((doc) => {
  //       videosList.push(doc.data());
  //     });
  //     setVideos(videosList);
  //     setLoading(false);
  //   };
  //   fetchVideos();
  // }, []);

  useEffect(() => {
    const db = getFirestore();
    const videosRef = collection(db, "videos");

    const unsubscribe = onSnapshot(videosRef, (querySnapshot) => {
      const videosList = [];
      querySnapshot.forEach((doc) => {
        videosList.push({ id: doc.id, ...doc.data() });
      });
      setVideos(videosList);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.length > 0 ? (
        videos.map((video) => <VideoCard key={video.id} videoData={video} />)
      ) : (
        <p>No videos available at this time.</p>
      )}
    </div>
  );
};

export default Feed;
