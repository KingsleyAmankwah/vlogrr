import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Create from "../components/Create";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Sidenav from "../components/Sidenav";
import Feed from "../components/Feed";
import VideoDetails from "../components/VideoDetails";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <main className="bg-gray-200 w-full h-full ">
        <div className="">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex">
            <Sidenav open={sidebarOpen} />
            <div className="h-full w-full py-3 px-5">
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/post" element={<Post />} />
                <Route path="/create" element={<Create />} />
                <Route path="/video/:id" element={<VideoDetails />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
