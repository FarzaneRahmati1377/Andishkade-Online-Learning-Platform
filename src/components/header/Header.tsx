import Logo from "../../assets/image/Untitled.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Container from "../container/Container";
import { Link, useNavigate } from "react-router-dom";
import { useLoginContext } from "../../context/LoginContext";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Badge } from "@mui/material";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { useCoursesContext } from "../../context/CoursesContext";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import UserPanelSwitchBox from "../userPanelSwitchBox/UserPanelSwitchBox";
import useToPersianDigits from "../../hooks/useToPersianDigits";

const Header = () => {
  const { isLogin, userInfo, handleLogOut } = useLoginContext();
  const [isVisibleUserPanelBox, setIsVisibleUserPanelBox] = useState(false);
  const [isUserPanelMenuOpen, setIsUserPanelMenuOpen] = useState(false);
  const { shoppingCartItemsLength } = useShoppingCartContext();
  const { setSearchBoxQuery, searchBoxInputRef } = useCoursesContext();
  const navigate = useNavigate();
  const handlleToggleUserPanelBox = () => {
    setIsVisibleUserPanelBox(!isVisibleUserPanelBox);
  };
  const handleKeyDownSearchBox = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      searchBoxInputRef.current &&
      searchBoxInputRef.current.value.trim().length >= 4
    ) {
      setSearchBoxQuery(e.currentTarget.value.trim());
      navigate("/courses");
    }
  };

  const toggleUserPanelMenu = () => {
    setIsUserPanelMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center h-16 bg-white shadow border-b">
      <Container>
        <div className="flex items-center md:px-0 px-3 ">
          <div className="grow flex  items-center gap-5">
            <div className="flex items-center">
              <img src={Logo} className="w-14 h-14 " />
              <h1 className="font-semibold text-blue-600 ">اندیشکده</h1>
            </div>

            <div className="relative sm:visible md:w-2/3 xl:w-[350px] invisible">
              <input
                type="text"
                ref={searchBoxInputRef}
                maxLength={30}
                minLength={4}
                placeholder="چه چیزی میخواهید یاد بگیرید؟"
                onKeyDown={handleKeyDownSearchBox}
                className="w-full border bg-gray-50 border-gray-500  h-11 rounded-full ps-4 pe-10 text-sm "
              />
              <SearchOutlinedIcon className=" absolute my-auto top-0 bottom-0 left-2 text-gray-400" />
            </div>
          </div>

          <div className="flex md:grow  gap-4 items-center justify-end">
            <Link to={"/shopping-cart"}>
              <Badge
                color="primary"
                badgeContent={
                  useToPersianDigits(shoppingCartItemsLength) == "۰"
                    ? null
                    : useToPersianDigits(shoppingCartItemsLength)
                }
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <ShoppingBagOutlinedIcon className="text-gray-500" />
              </Badge>
            </Link>

            {isLogin ? (
              <div
                className="relative min-w-36 border-b rounded-xl p-[3px]"
                onClick={handlleToggleUserPanelBox}
              >
                <div
                  className={`w-full flex gap-3 cursor-pointer  items-center justify-between `}
                >
                  <div className="flex items-center gap-2">
                    <AccountCircleIcon
                      className="text-gray-400"
                      fontSize="large"
                    />

                    <span className="line-clamp-1 text-sm ">{`${userInfo?.name} ${userInfo?.lastname}`}</span>
                  </div>
                  <span
                    className={`text-gray-400 transform transition-transform duration-500 ease-in-out ${
                      isVisibleUserPanelBox ? "-rotate-180" : "rotate-0"
                    }`}
                  >
                    <ExpandMoreRoundedIcon fontSize="small" />
                  </span>
                </div>
                <div
                  className={`absolute bg-white top-16 p-2 z-20  border shadow-sm rounded-md w-full overflow-hidden transition-opacity duration-700 ease-in-out ${
                    isVisibleUserPanelBox ? " opacity-100" : " opacity-0 "
                  }`}
                  style={{
                    height: isVisibleUserPanelBox ? "100px" : "0",
                    transition:
                      "height 0.3s ease-in-out, opacity 0.3s ease-in-out",
                  }}
                >
                  <ul className=" flex flex-col">
                    <Link to={"/my-account"}>
                      <li className=" py-2">
                        <span className="text-sm ">پنل کاربری</span>
                      </li>
                    </Link>

                    <li
                      className=" py-2 cursor-pointer "
                      onClick={handleLogOut}
                    >
                      <div className="flex items-center gap-2">
                        <LogoutIcon
                          fontSize="small"
                          className="text-gray-500"
                        />
                        <span className="text-sm">خروج از حساب</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to={"/member-ship"} className="shrink-0">
                <button className="w-fit border-2 px-3 py-2 rounded-lg border-orange-400 hover:text-white hover:bg-orange-400 shadow-sm text-xs transition-colors  duration-300 ">
                  ورود / ثبت نام
                </button>
              </Link>
            )}

            {isLogin && (
              <>
                <button
                  className="block md:hidden"
                  onClick={toggleUserPanelMenu}
                >
                  <MenuIcon className="text-gray-500 " />
                </button>

                <div
                  className={`fixed md:hidden top-0 right-0 h-fit z-10 shadow-lg transition-all duration-300 ease-in-out 
               ${
                 isUserPanelMenuOpen ? "translate-x-0 " : "translate-x-full"
               } lg:relative lg:translate-x-0 md:w-1/4`}
                >
                  <UserPanelSwitchBox />
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
