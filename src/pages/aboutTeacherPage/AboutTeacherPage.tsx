import { useEffect, useState } from "react";
import AboutTeacherBanner from "../../assets/svg/banner-about-teacher.svg";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { getPopularTeachers, getTeacher } from "../../services/api";
import { ICourse, ITeacher } from "../../types/server";
import { Link, useParams } from "react-router-dom";
import { useCoursesContext } from "../../context/CoursesContext";
import DeepContainer from "../../components/container/DeepContainer";
import StarIcon from "@mui/icons-material/Star";
import Slider from "../../components/customSlider/Slider";
import HorizontalCourseCard from "../../components/horizontalcourseCard/HorizontalCourseCard";
import PopularTeacherCard from "../../components/popularTeacherCard/PopularTeacherCard";
import CourseCard from "../../components/courseCard/CourseCard";
import useCleanString from "../../hooks/useCleanString";
import useToPersianDigits from "../../hooks/useToPersianDigits";
const AboutTeacherPage = () => {
  const [teacher, setTeacher] = useState<ITeacher>();
  const { teacherInfo } = useParams();
  const id = teacherInfo?.split("-")[0];
  const { allCourses } = useCoursesContext();
  const [teahcerCourses, setTeacherCourses] = useState<ICourse[]>();
  const [popularTeachers, setPopularTeachers] = useState<ITeacher[]>();
  useEffect(() => {
    getTeacher(id as string).then((result) => {
      setTeacher(result[0]);
    });
    getCoursesByTeacherId(id as string);
    getPopularTeachers().then((result) => {
      setPopularTeachers(result);
    });
  }, [id]);

  function getCoursesByTeacherId(id: string | number) {
    const teahcerCourses = allCourses.filter(
      (course) => course.teacherId == id
    );
    setTeacherCourses(teahcerCourses);
  }

  return (
    <>
      <section className="bg-white">
        <div className="flex flex-col  gap-5">
          <img src={AboutTeacherBanner} className="w-full" />

          <div className="flex  flex-col gap-8 items-center border-b pb-[80px]">
            <h3 className=" text-center font-semibold">
              هرآنچه در باره استاد باید بدانید
            </h3>

            <DeepContainer>
              <div className="flex flex-col lg:flex-row px-5 lg:px-0 gap-5 items-center ">
                <img
                  src={teacher?.image}
                  alt=""
                  className="w-52 h-52 rounded-full shrink-0"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex gap-8 justify-between">
                    <span className="">{teacher?.fullName}</span>
                    {teacher?.rating && teacher?.rating >= 3.8 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">
                          استاد برتر
                        </span>
                        <WorkspacePremiumOutlinedIcon className="text-yellow-400" />
                      </div>
                    ) : null}
                  </div>

                  <span className="text-sm ">{teacher?.expertise}</span>
                  <div className=" flex items-center gap-1 ">
                    <StarIcon className="text-yellow-400" fontSize="small" />
                    {teacher?.rating && (
                      <span className="text-sm ">
                        {useToPersianDigits(teacher.rating)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">درباره استاد</span>
                    <p className="text-sm text-gray-500 leading-6 px-5">
                      {teacher?.caption}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </DeepContainer>
          </div>

          <DeepContainer>
            <div className="flex flex-col gap-5 p-5 lg:px-0">
              <h3 className="font-semibold">دوره ها</h3>
              <div className="flex justify-center gap-5">
                <div className="flex flex-col gap-5 ">
                  {teahcerCourses?.map((course) => (
                    <Link to={`/courses/course/${course.id}`} key={course.id}>
                      <div className="hidden lg:block">
                        <HorizontalCourseCard {...course} />
                      </div>
                      <div className="lg:hidden w-[250px]">
                        <CourseCard {...course} />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="w-[300px] h-[530px] hidden sm:flex  bg-white rounded-md flex-col gap-5 shadow-sm border p-5">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-sm">
                      آشنایی با اساتید برتر
                    </h3>
                    <WorkspacePremiumOutlinedIcon className="text-yellow-400" />
                  </div>

                  <Slider slidesPerView={1} id="teacher-slider" autoplay={true}>
                    {popularTeachers?.map((popularTeacher) => (
                      <Link
                        to={`/teachers/teacher/${
                          popularTeacher.id
                        }-${useCleanString(popularTeacher.fullName)}`}
                        key={popularTeacher.id}
                      >
                        <PopularTeacherCard {...popularTeacher} />
                      </Link>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </DeepContainer>
        </div>
      </section>
    </>
  );
};

export default AboutTeacherPage;
