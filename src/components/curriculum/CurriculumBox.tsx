import ControlPointIcon from "@mui/icons-material/ControlPoint";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ICurriculumInfo } from "../../types/server";
import ToggleBox from "../toggleBox/ToggleBox";
import useToPersianDigits from "../../hooks/useToPersianDigits";

const CurriculumBox = ({ id, title, videos }: ICurriculumInfo) => {
 
  return (
    <ToggleBox
      isOpen={true}
      title={
        <div className="flex w-full text-gray-500 font-medium text-base p-3  gap-2">
          <button
            id={`button-${id}`}
            type="button"
            className=" hidden md:block"
          >
        
              <ControlPointIcon />
         
          </button>
          <span className="grow">{title}</span>
          <span className="hidden md:block">
          <QueueOutlinedIcon />

          </span>
          
          <span>{useToPersianDigits(videos.length)} جلسه</span>
        </div>
      }
    >
      {videos.map((video) => (
        <div className="flex gap-2 px-8 py-3 text-sm border-t  text-gray-500 bg-gray-50 ">
          <div className="flex items-center grow gap-2 ">
            <span className="hidden md:block">
              <PlayCircleOutlinedIcon fontSize="small" />
            </span>
            <span className="">{video.title}</span>
          </div>

          <div className="flex items-center gap-3">
            {video.lock ? (
              <LockOutlinedIcon fontSize="small" />
            ) : (
              <a
                className="text-blue-600"
                target="_blank"
                href={video.vedioURL}
              >
                مشاهده
              </a>
            )}
            <span className="hidden md:block">
              <AccessTimeIcon fontSize="small" />
            </span>
            <span className="text-xs">15:20</span>
          </div>
        </div>
      ))}
    </ToggleBox>
  );
};

export default CurriculumBox;
