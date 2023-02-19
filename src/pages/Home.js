import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <main className="bg-gray-200 w-screen h-screen ">
        <div className="">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex">
            <Sidenav open={sidebarOpen} />
            <div className="h-full w-full py-3 px-5"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
