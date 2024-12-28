import { useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const UserPanelSwitchBox = () => {
      const { userInfo, handleLogOut } = useLoginContext();
      const [activeItem, setActiveItem] = useState<string>("dashboard");
    
      const handleItemClick = (item: string) => {
        setActiveItem(item);
      };
    return (
        <div className="w-[250px] lg:w-[300px]  text-sm lg:text-base h-[100vh] md:h-[570px]  shrink-0  flex-col  text-white bg-zinc-800 rounded-l-md md:rounded-l-none md:rounded-r-2xl">
          <div className="flex flex-col  items-center gap-5 px-5 py-10">
            <div className="bg-gray-400 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
              <PersonIcon fontSize="large" />
            </div>
            {
              userInfo && (
                <span>{`سلام ${userInfo.name} ${userInfo.lastname} عزیز !`}</span>
              )
            }
            
          </div>
          <div className="px-8 ">
            <ul className="flex flex-col gap-5">
              <Link to={"/my-account/"}>
                <li
                  className={`flex gap-2 items-center h-10 hover:bg-zinc-700 px-2 rounded ${
                    activeItem === "dashboard" ? "bg-zinc-900" : "bg-zinc-800"
                  } `}
                  onClick={() => handleItemClick("dashboard")}
                >
                  <SpeedIcon className="text-white" />
                  <span>پیشخوان</span>
                </li>
              </Link>
              <Link to={"/my-account/registered-courses"}>
                <li
                  className={`flex gap-2 items-center  h-10  hover:bg-zinc-700 px-2 rounded ${
                    activeItem === "registered-courses"
                      ? "bg-zinc-900"
                      : "bg-zinc-800"
                  }`}
                  onClick={() => handleItemClick("registered-courses")}
                >
                  <SchoolOutlinedIcon className="text-white" />
                  <span>دوره های خریداری شده</span>
                </li>
              </Link>
              <Link to={"/my-account/edit-account"}>
                <li
                  className={`flex gap-2 items-center  h-10 hover:bg-zinc-700  px-2 rounded ${
                    activeItem === "edit-account"
                      ? "bg-zinc-900"
                      : "bg-zinc-800"
                  } `}
                  onClick={() => handleItemClick("edit-account")}
                >
                  <SchoolOutlinedIcon className="text-white" />
                  <span>جزئیات حساب</span>
                </li>
              </Link>

              <li
                className="flex gap-2 items-center cursor-pointer  h-10  hover:bg-zinc-700 px-2 rounded"
                onClick={handleLogOut}
              >
                <LogoutIcon className="text-white" />
                <span>خروج از حساب</span>
              </li>
            </ul>
          </div>
        </div>
    );
}
 
export default UserPanelSwitchBox;