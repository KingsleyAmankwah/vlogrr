import { FiBox, FiMusic } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiCameraMovie } from "react-icons/bi";
import { FaRegLaughBeam } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";
import { AiOutlineAppstoreAdd, AiOutlineHistory } from "react-icons/ai";

export const Navs = [
  {
    name: "Games",
    icon: <FiBox />,
    link: "games",
  },

  {
    name: "Movies",
    icon: <BiCameraMovie />,
    link: "movies",
  },
  {
    name: "Anime",
    icon: <FaRegLaughBeam />,
    link: "anime",
  },
  {
    name: "Funny",
    icon: <GiLaurelCrown />,
    link: "funny",
  },
  {
    name: "Music",
    icon: <FiMusic />,
    link: "music",
  },

  {
    name: "Stories",
    icon: <AiOutlineHistory />,
    link: "stories",
  },
];
function Sidenav({ open }) {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      }  md:block bg-white px-4 h-[90vh] w-64 flex items-center justify-between`}
    >
      <div className="w-[85%] mx-auto h-full flex flex-col justify-between items-center pt-20">
        <div className=" w-full h-[50vh] flex flex-col gap-2">
          {/* Navigations */}
          {Navs.map((nav, index) => {
            return (
              <Link to={`/${nav.link}`} key={index}>
                <div
                  className={`flex gap-4 items-center cursor-pointer py-2 px-5 w-full rounded-full transition-all duration-75 ease-in-out text-lg`}
                >
                  {nav.icon}
                  <p className="">{nav.name}</p>
                </div>
              </Link>
            );
          })}
          <Link
            to={`/create`}
            className={`flex gap-4 items-center cursor-pointer bg-gray-900 text-white rounded-3xl  py-2 px-5 w-full transition-all duration-75 ease-in-out`}
          >
            <AiOutlineAppstoreAdd />
            <p>Create</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
