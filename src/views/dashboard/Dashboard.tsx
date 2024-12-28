import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useEffect, useState } from "react";
import { getNotifications } from "../../services/api";
import { INotifications } from "../../types/server";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useBlogsContext } from "../../context/BlogsContext";
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useCoursesContext } from "../../context/CoursesContext";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import useToPersianDigits from "../../hooks/useToPersianDigits";

const Dashboard = () => {
  const [notifications, setNotifications] = useState<INotifications[]>();
  const { formatPersianDate } = useBlogsContext();
  const { allCourses } =  useCoursesContext();
  const { shoppingCartItemsLength,registeredCoursesLength} = useShoppingCartContext();

  useEffect(() => {
    getNotifications().then((result) => {
      setNotifications(result);
    });
  }, []);
  return (
    <div className="flex flex-col gap-12 w-full items-center justify-center px-3 py-5 md:px-8 ">
      <div className="flex gap-3 w-full">
        <div className="flex flex-col md:flex-row bg-gray-100 w-1/3 items-center gap-3 px-4 py-3 rounded">
          <div className="bg-gray-200 w-12 h-12 rounded-full border-2  flex items-center justify-center">
            <LibraryBooksOutlinedIcon
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm font-semibold">{`${useToPersianDigits(allCourses.length)} دوره`}</span>
            <span className="text-xs">درسایت وجود دارد</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-gray-100 w-1/3 items-center gap-3 px-4 py-3 rounded">
          <div className="bg-gray-200 w-12 h-12 rounded-full border-2  flex items-center justify-center">
            <SchoolOutlinedIcon fontSize="medium" className="text-gray-500" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm font-semibold">{`${useToPersianDigits(registeredCoursesLength)} دوره`}</span>
            <span className="text-xs">ثبت نام کرده اید</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-gray-100 w-1/3 items-center gap-3 px-4 py-3 rounded">
          <div className="bg-gray-200 w-12 h-12 rounded-full border-2  flex items-center justify-center">
            <ShoppingBagOutlinedIcon
              fontSize="medium"
              className="text-gray-500"
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-sm font-semibold">{`${useToPersianDigits(shoppingCartItemsLength)} دوره`}</span>
            <span className="text-xs">در انتظار پرداخت</span>
          </div>
        </div>
      </div>

      <div className=" relative w-full bg-gray-50 rounded-md px-3 md:px-5 py-12  ">
        <div className="absolute bg-gray-50 -top-7 right-5 border w-16 h-16 flex items-center justify-center rounded-xl ">
          <NotificationsNoneOutlinedIcon
            className="text-gray-500"
            fontSize="large"
          />
        </div>

        <span className="text-sm">جدید ترین اطلاعیه ها</span>
        <div className="flex flex-col justify-center h-fit">
          {notifications &&
            notifications.map((notification,index) => (
              <div className="flex h-14  gap-5 items-center justify-between border-b" key={index}>
                <h3 className="text-xs font-semibold">{notification.title}</h3>
                <span className="text-xs shrink-0 hidden sm:block">{` درتاریخ: ${formatPersianDate(
                  notification.creationDate
                )} `}</span>
              </div>
            ))}
        </div>
        
      </div>

      <div className="flex flex-col md:flex-row h-fit justify-between gap-5 w-full">
            <div className="flex gap-5 grow shadow hover:shadow-md -skew-x-6 p-2 cursor-pointer">
              <div className="flex items-center rounded-md  justify-center w-20 bg-blue-400">
                <TelegramIcon  fontSize="large" className="text-white "/>
              </div>
                <div className="flex gap-2 flex-col p-3">
                    <span className="text-sm">در <span className="text-blue-400 text-lg font-bold">تلگرام</span></span>
                    <span className="text-sm">کانال ما را دنبال کنید !</span>
                </div>

            </div>

            <div className="flex gap-5 grow  shadow hover:shadow-md -skew-x-6 p-2 cursor-pointer">
              <div className="flex  items-center w-20 rounded-md  justify-center bg-red-400">
                <InstagramIcon fontSize="large" className="text-white"/>
              </div>
                <div className="flex gap-2 flex-col p-3">
                    <span className="text-sm">در <span className="text-red-400 text-lg font-bold">اینستاگرام</span></span>
                    <span className="text-sm"> ما را دنبال کنید !</span>
                </div>

            </div>

        </div>
    </div>
  );
};

export default Dashboard;
