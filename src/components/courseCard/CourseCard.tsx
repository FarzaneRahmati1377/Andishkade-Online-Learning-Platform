import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { ICourse } from "../../types/server";
import PriceBadge from "../priceBadge/PriceBadge";
import useToPersianDigits from "../../hooks/useToPersianDigits";
const CourseCard = ({
  title,
  image,
  caption,
  studentsCount,
  rating,
  times,
  discount,
  price,
}: ICourse) => {
  return (
    <div className="min-w-[250px] h-[362px] bg-white border rounded-md flex flex-col gap-3 transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-md">
      <div className="relative p-2 rounded-md ">
        <div className="flex justify-around gap-1 items-center rounded p-1 bg-orange-400 absolute top-3 right-2">
          <AccessTimeIcon className="text-white" />
          <span className="text-white text-sm ">{`${useToPersianDigits(times)} ساعت `}</span>
        </div>

        <img src={image} className="rounded-md  w-full h-40  " />
      </div>
      <div className="flex flex-col gap-2 px-3 pb-3  grow">
        <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
        <p className="text-sm leading-6 line-clamp-2 text-gray-500">
          {caption}
        </p>
        <div className="flex justify-between items-center grow">
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
        <PriceBadge price={price} discount={discount} />
        
      </div>
    </div>
  );
};

export default CourseCard;
