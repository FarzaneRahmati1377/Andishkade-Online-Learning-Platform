import { useEffect, useState } from "react";
import { ICourse, ITeacher } from "../../types/server";
import { getTeacherByCourseId } from "../../services/api";
import { Rating } from "@mui/material";
import { useTeachersContext } from "../../context/TeachersContext";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

const PopularCourse = ({
  id,
  title,
  image,
  caption,
  target,
  rating,
}: ICourse) => {
  const [teacher, setTeacher] = useState<ITeacher>();
  const { isPopularTeacher } = useTeachersContext();
  useEffect(() => {
    getTeacherByCourseId(id).then((result) => {
      setTeacher(result);
    });
  }, []);
  return (
    <div className="lg:grid grid-cols-6 gap-5  flex flex-col-reverse  bg-white border shadow hover:shadow-md rounded-lg mx-5 p-8 overflow-hidden">
      <div className="flex flex-col gap-5 col-span-4">
        <div className="flex gap-3 ">
          <h3 className=" text-sm md:text-base font-semibold">{title}</h3>
          <Rating name="read-only" value={rating} readOnly size="small" />
        </div>

        <p className="line-clamp-3 text-sm leading-6">{caption}</p>
        <div className="text-sm flex flex-col gap-3">
          <h5 className="font-semibold">اهداف دوره</h5>
          <ul className="list-disc list-inside text-sm px-2">
            {target.map((item) => (
              <li className="mb-2 ">{item}</li>
            ))}
          </ul>
        </div>
        <h5 className="font-semibold">مدرس دوره</h5>
        <div className="flex min-w-[210px] bg-white relative shadow border rounded-lg px-4 py-5 gap-3 md:w-96">
          <img src={teacher?.image} className="rounded-full w-14 h-14" />
          <div className="flex flex-col text-sm gap-3">
            <span>{teacher?.fullName}</span>
            <span>{teacher?.expertise}</span>
          </div>
          <div className="absolute top-2 left-2">
            {isPopularTeacher(rating) ? (
              <WorkspacePremiumOutlinedIcon className="text-yellow-400 absolute left-[5px] top-[5px]" />
            ) : null}
          </div>
        </div>
      </div>
      <div className="col-span-2 rounded-md h-[200px] md:h-full bg-red-50 overflow-hidden ">
        <img
          className=" w-full h-full rounded-md  transition-transform duration-500 ease-in-out transform hover:scale-110"
          src={image}
          alt=""
        />
      </div>
    </div>
  );
};

export default PopularCourse;
