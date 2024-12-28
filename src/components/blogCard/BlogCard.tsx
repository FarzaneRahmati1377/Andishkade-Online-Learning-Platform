import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { IBlog } from "../../types/server";
import { useMemo } from "react";
import { useBlogsContext } from "../../context/BlogsContext";

const BlogCard = ({ image, title, introduction, creationDate }: IBlog) => {
  const { formatPersianDate } = useBlogsContext();

  const persianDate = useMemo(() => {
    return formatPersianDate(creationDate);
  }, [creationDate]);

  return (
    <div className=" flex flex-col items-center rounded-md overflow-hidden ">
      <img
        src={image}
        alt=""
        className="w-full  h-52 rounded-lg rounded-b-none p-0 transition-transform duration-500 ease-in-out transform hover:scale-110"
      />
      <div className="z-10 px-5">
        <div className=" w-full flex flex-col gap-5 mt-[-60px]  bg-white shadow rounded-md border px-2 py-3">
          <div className="flex gap-2">
            <CalendarMonthOutlinedIcon className="text-gray-400" />
            <span className="text-sm text-gray-400">{persianDate}</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
            <p className="grow line-clamp-3 text-sm">{introduction}</p>
          </div>

          <span className=" text-sm text-orange-500">
            ادامه مطلب ...
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
