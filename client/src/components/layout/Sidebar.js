import { useState, useEffect } from "react";
// import atp from "../../assets/"
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { TbPlaylist } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { FcLike } from "react-icons/fc";
import { FaHistory } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { SlUserFollowing } from "react-icons/sl"
import applogo from '../../img/applogo.png'
const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const Menus = [
    {
      title: "Home",
      link: "/dashboard",
      component: AiOutlineHome,
    },
    { title: "Search", link: "/search", component: BiSearchAlt2 },
    { title: "Playlist", gap: true, link: "/playlist", component: TbPlaylist },
 
    {
      title: "Liked Songs",
      link: "/likedSong",
      component: FcLike,
    },


    {
      title: "Artists Followed",
      link: "/artistsFollowed",
      component: SlUserFollowing,
    },
    {
      title: "Shared Playlist ",
      gap: true,
      link: "/playlistsShared",
      component: FiShare2,
    },
    {
      title: "History",
      link: "/history",
      component: FaHistory,
    },
  ];

  return (
    <div className="flex h-screen sticky top-0">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-light-black h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-light-black
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="assets"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={applogo}
            className={`cursor-pointer duration-500 w-16 h-12 ${
              open && "rotate-[360deg]"
            }`}
            alt="logo"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            MusixOn
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link}>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center   gap-x-4 
              ${(Menu.gap = "mt-3")} ${index === 0 && "bg-light-white"} `}
              >
                {<Menu.component size={24} color="white" />}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
