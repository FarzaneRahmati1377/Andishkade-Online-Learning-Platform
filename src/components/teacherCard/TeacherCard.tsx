import { useTeachersContext } from "../../context/TeachersContext";
import { ITeacher } from "../../types/server";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const TeacherCard = ({ image, fullName, expertise, rating }: ITeacher) => {
  const {isPopularTeacher} = useTeachersContext();
  return (
    <div className="h-60 flex bg-white flex-col rounded-md items-center gap-2 border p-2 hover:shadow-md">
      <div className="w-full rounded-md h-36 grow relative bg-red-50 overflow-hidden ">
        <img src={image} className="w-full h-full rounded-md transition-transform duration-500 ease-in-out transform hover:scale-110" />
        {isPopularTeacher(rating) ? (
          <WorkspacePremiumOutlinedIcon className="text-yellow-400 absolute left-[5px] top-[5px]" />
        ) : (
          null
        )}
      </div>

      <span className="text-sm font-semibold">{fullName}</span>
      <span className="text-sm">{expertise}</span>
    </div>
  );
};

export default TeacherCard;
