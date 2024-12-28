import { IBlog } from "../../types/server";
import { useBlogsContext } from "../../context/BlogsContext";
import { useMemo } from "react";
const PopularBlogCard = ({ image, title, creationDate }: IBlog) => {
  const { formatPersianDate } = useBlogsContext();

  const persianDate = useMemo(() => {
    return formatPersianDate(creationDate);
  }, [creationDate]);
  return (
    <div className="flex gap-3 shadow-sm px-3 py-2 hover:bg-blue-50 rounded-lg">
      <img src={image} className="w-20 h-20 rounded-md" />
      <div className="flex flex-col gap-3 justify-center">
        <h3 className="line-clamp-1 text-sm">{title}</h3>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">{persianDate}</span>
        </div>
      </div>
    </div>
  );
};

export default PopularBlogCard;
