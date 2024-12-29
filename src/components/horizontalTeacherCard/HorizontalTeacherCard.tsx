import { useTeachersContext } from "../../context/TeachersContext";
import { ITeacher } from "../../types/server";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const HorizontalTeacherCard = ({
  image,
  fullName,
  expertise,
  rating,
  caption,
}: ITeacher) => {
  const { isPopularTeacher } = useTeachersContext();
  return (
    <div className=" flex flex-col xl:flex-row items-center cursor-pointer relative gap-3 border  py-5 px-8 rounded-md leading-10 shaddow hover:shadow-md">
      {isPopularTeacher(rating) ? (
        <WorkspacePremiumOutlinedIcon className="text-yellow-400 absolute left-[15px] top-[15px]" />
      ) : null}
      <img src={image} className="w-52 h-52 rounded-full shrink-0" />
      <div className="flex flex-col gap-2">
        <span>{fullName}</span>
        <span className="text-sm ">{expertise}</span>
        <p className="text-sm text-gray-500">{caption}</p>
      </div>
    </div>
  );
};

export default HorizontalTeacherCard;
