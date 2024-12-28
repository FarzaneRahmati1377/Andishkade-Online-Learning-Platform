import StarIcon from "@mui/icons-material/Star";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { ICourse } from "../../types/server";
import PriceBadge from "../priceBadge/PriceBadge";
import useToPersianDigits from "../../hooks/useToPersianDigits";

const HorizontalCourseCard = ({
  title,
  image,
  caption,
  studentsCount,
  rating,
  discount,
  price,
}: ICourse) => {
  return (
    <div className="grid h-48 bg-white grid-cols-5 gap-5 border hover:shadow p-3 rounded-lg ">
      <div className="col-span-1 rounded-md">
        <img className=" w-full h-full rounded-md" src={image} alt="" />
      </div>
      <div className="flex flex-col gap-3 col-span-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="flex items-center gap-5">
          <div className="flex gap-1">
            <SchoolOutlinedIcon fontSize="small" className="text-gray-500" />
            <div className="text-sm">
              <span className="font-bold">{useToPersianDigits(studentsCount)} </span>
              <span className="text-gray-500">دانشجو</span>
            </div>
          </div>
          <div className=" flex items-center ">
            <StarIcon className="text-yellow-400" fontSize="small" />
            <span className="text-sm font-bold">{useToPersianDigits(rating)}</span>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-6">{caption}</p>
        <PriceBadge price={price} discount={discount} />
      </div>
    </div>
  );
};

export default HorizontalCourseCard;
