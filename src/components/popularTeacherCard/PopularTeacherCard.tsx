import { ITeacher } from "../../types/server";

const PopularTeacherCard = ({
  image,
  fullName,
  expertise,
  caption,
}: ITeacher) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full h-[200px] rounded-md">
        <img src={image} className="w-full h-full rounded-md" />
      </div>
      <div className="flex justify-between">
        <span className="font-semibold shrink-0 text-sm ">{fullName}</span>
        <span className="font-semibold shrink-0 text-sm line-clamp-1">{expertise}</span>
      </div>
    

      <p className="text-gray-600 line-clamp-6 leading-8 text-sm">{caption}</p>
    </div>
  );
};

export default PopularTeacherCard;
