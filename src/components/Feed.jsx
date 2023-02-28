import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import VideoCard from "./VideoCard"; // Assuming you have a VideoCard component
import Spinner from "./Spinner";

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const db = getFirestore();
      const videosRef = collection(db, "videos");
      const querySnapshot = await getDocs(videosRef);
      const videosList = [];
      querySnapshot.forEach((doc) => {
        videosList.push(doc.data());
      });
      setVideos(videosList);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} videoData={video} />
      ))}
    </div>
  );
};

export default Feed;
