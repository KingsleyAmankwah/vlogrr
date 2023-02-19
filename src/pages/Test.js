import { useState } from "react";
import { HiOutlineUser, HiOutlineCog, HiAdjustments } from "react-icons/hi";
import { BsBell } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

const Sidebar = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const toggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <div className="fixed top-0 left-0 h-full bg-gray-800 text-gray-100">
      <ul className="flex flex-col p-4 space-y-4">
        <li>
          <button
            className="flex items-center p-2 rounded hover:bg-gray-700"
            onClick={toggleTooltip}
          >
            <HiOutlineUser className="mr-2" />
            Profile
          </button>
          {/* {isTooltipOpen && (
            <div className="tooltip absolute top-0 right-0 p-2 bg-gray-900 text-white rounded-md">
              Edit Profile
            </div>
          )} */}
        </li>
        <li>
          <button className="flex items-center p-2 rounded hover:bg-gray-700">
            <BsBell className="mr-2" />
            Notifications
          </button>
        </li>
        <li>
          <button className="flex items-center p-2 rounded hover:bg-gray-700">
            <HiOutlineCog className="mr-2" />
            Settings
          </button>
        </li>
        <li>
          <button className="flex items-center p-2 rounded hover:bg-gray-700">
            <HiAdjustments className="mr-2" />
            Help
          </button>
        </li>
        <li>
          <button className="flex items-center p-2 rounded hover:bg-gray-700">
            <AiOutlineLogout className="mr-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
