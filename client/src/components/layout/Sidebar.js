import { useState,useEffect } from "react";
// import atp from "../../assets/"
const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(false)
 
//choose the screen size 
const handleResize = () => {
  if (window.innerWidth < 720) {
    setOpen(false)
  } else {
    setOpen(true)
  }
}

// create an event listener
useEffect(() => {
  window.addEventListener("resize", handleResize)
})

  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex h-screen sticky top-0">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-light-black h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src=" /assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-light-black
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="assets"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/assets/logo.png"
            className={`cursor-pointer duration-500 ${
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
            <li 
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`/assets/${Menu.src}.png`}  alt="type" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      
  
    </div>
  );
};
export default Sidebar;
