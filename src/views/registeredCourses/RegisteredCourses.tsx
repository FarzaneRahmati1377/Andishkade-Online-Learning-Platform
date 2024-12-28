import HorizontalCourseCard from "../../components/horizontalcourseCard/HorizontalCourseCard";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import CourseCard from "../../components/courseCard/CourseCard";
import useCleanString from "../../hooks/useCleanString";
import { Link } from "react-router-dom";

const RegisteredCourses = () => {
  const { registeredCourses } = useShoppingCartContext();

  return (
    <div className="flex flex-col w-full items-center p-8 gap-8 h-[570px] overflow-auto">
      {registeredCourses && registeredCourses.length !== 0 ? (
        registeredCourses?.map((registeredCourse) => (
          <Link
            to={`/courses/course/${registeredCourse.id}-${useCleanString(
              registeredCourse.title
            )}`}
          >
            <div className="hidden md:block">
              <HorizontalCourseCard {...registeredCourse} />
            </div>
            <div className="md:hidden w-[250px]">
              <CourseCard {...registeredCourse} />
            </div>
          </Link>
        ))
      ) : (
        <div className="flex flex-col gap-5  w-full">
          <span className="text-sm w-full">
            در حال حاضر در هیچ دوره ای ثبت نام نکرده اید !
          </span>
          <Link to={`/courses`}>
            <button className="border border-orange-400 text-orange-400 w-fit hover:bg-orange-400 hover:text-white text-xs transition-colors duration-500  font-semibold py-2 px-2 rounded">
              مشاهده دوره ها
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RegisteredCourses;
