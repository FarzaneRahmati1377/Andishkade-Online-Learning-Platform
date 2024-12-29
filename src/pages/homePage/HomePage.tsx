import HomePageBanner from "../../assets/svg/banner-homepage.svg";
import RoadMapFrontEndBanner from "../../assets/image/roadfrontend.png";
import NewCoursesBanner from "../../assets/svg/new-courses-banner.svg";
import Slider from "../../components/customSlider/Slider";
import CategoryCard from "../../components/categoryCard/CategoryCard";
import PopularCourse from "../../components/popularCourse/PopularCourse";
import CourseCard from "../../components/courseCard/CourseCard";
import TeacherSvg from "../../assets/svg/teacherSvg.svg";
import QuallitySvg from "../../assets/svg/quallity.svg";
import CoursesSvg from "../../assets/svg/coursesSvg.svg";
import WhyUsCard from "../../components/whyUsCard/WhyUsCard";
import TeacherCard from "../../components/teacherCard/TeacherCard";
import { useCategoriesContext } from "../../context/CategoryContext";
import { useCoursesContext } from "../../context/CoursesContext";
import { useTeachersContext } from "../../context/TeachersContext";
import { Link } from "react-router-dom";
import { useBlogsContext } from "../../context/BlogsContext";
import { useEffect, useState } from "react";
import { ICourse } from "../../types/server";
import BlogCard from "../../components/blogCard/BlogCard";
import useCleanString from "../../hooks/useCleanString";

const HomePage = () => {
  const { popularSubCategories } = useCategoriesContext();
  const { teachers } = useTeachersContext();
  const { allCourses, getNewCourses, getPopularCourses } = useCoursesContext();
  const { blogs } = useBlogsContext();
  const [newCourses, setNewCourses] = useState<ICourse[]>([]);
  const [popularCourses, setPopularCourses] = useState<ICourse[]>([]);
  useEffect(() => {
    setNewCourses(getNewCourses(allCourses));
    setPopularCourses(getPopularCourses(allCourses));
  }, [allCourses]);

  return (
    <div className="flex flex-col pb-20 text-gray-500">
      <Slider
        slidesPerView={1}
        id="Banner-slider"
        autoplay={true}
        spaceBetween={0}
      >
        <img src={HomePageBanner} className="w-full" />
        <Link to={"/courses/web-design"}>
          <img src={RoadMapFrontEndBanner} className="w-full cursor-pointer" />
        </Link>

        <Link to={"/courses/?sorting=new"}>
          <img src={NewCoursesBanner} className="w-full cursor-pointer" />
        </Link>
      </Slider>

      <section className="border-b pt-5 pb-12 ">
        <div className="flex gap-5 flex-col w-3/4 m-auto">
          <h3 className=" font-semibold  md:text-lg text-base">دسته های پرمخاطب</h3>
          <Slider
            id="popular-category-slider"
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {popularSubCategories?.map((popularCategory) => (
              <Link to={`/courses/${popularCategory.enTitle}`} key={popularCategory.id}>
                <CategoryCard {...popularCategory}  />
              </Link>
            ))}
          </Slider>
        </div>
      </section>

      <section className="border-b pb-12 pt-10">
        <div className=" flex gap-5 flex-col md:w-3/4 px-2 md:px-0 mx-auto ">
          <div className="flex justify-between items-center px-5 md:px-0">
            <h3 className="font-semibold md:text-lg text-base">دوره های برگزیده</h3>
            <Link to={"/courses/?sorting=popular"}>
              <span className=" text-sm text-blue-400 cursor-pointer">
                مشاهده همه
              </span>
            </Link>
          </div>

          <Slider slidesPerView={1} id="popular-courses-slider">
            {popularCourses?.map((popularCourse) => (
              <Link
                to={`courses/course/${popularCourse.id}-${useCleanString(
                  popularCourse.title
                )}`}
                key={popularCourse.id}
              >
                <PopularCourse {...popularCourse}  />
              </Link>
            ))}
          </Slider>
        </div>
      </section>
      <section className="border-b py-10 ">
        <div className="flex flex-col bg-white rounded-lg px-6 py-8  shadow gap-5 w-3/4 m-auto ">
          <div className="flex justify-between items-center w-full">
            <h3 className="font-semibold md:text-lg text-base ">دوره های جدید</h3>
            <Link to={"/courses/?sorting=new"}>
              <span className=" text-sm text-blue-400 cursor-pointer">
                مشاهده همه
              </span>
            </Link>
          </div>

          <Slider
            id="new-courses-slider"
            breakpoints={{
              720: {
                slidesPerView: 2,
              },
              1050: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={20}
          >
            {newCourses?.map((newCourse) => (
              <Link
                to={`courses/course/${newCourse.id}-${useCleanString(
                  newCourse.title
                )}`}
                key={newCourse.id}
              >
                <CourseCard {...newCourse} />
              </Link>
            ))}
          </Slider>
        </div>
      </section>

      <section className="py-14 border-b">
        <div
          id="div"
          className="flex flex-col lg:flex-row text-center w-3/4 m-auto gap-5 "
        >
          <div className="flex flex-col gap-5 w-full">
            <h3 className="font-semibold text-base md:text-lg">چرا آکادمی ارزش ؟</h3>
            <p className="line-clamp-4 md:leading-8 text-sm md:text-base">
              آکادمی ارزش راهی به سوی پیشرفت می باشد.دوره های ما شامل کلاس های
              آنلاین از سطوح مبتدی تا پسشرفته می باشد.
            </p>
          </div>

          <WhyUsCard
            icon={TeacherSvg}
            title="اساتید برجسته"
            subTitle="بهره گیری از استاتید با تجربه کشور"
          />
          <WhyUsCard
            icon={QuallitySvg}
            title="کیفیت محتوا"
            subTitle="محصولات آموزشی باکیفیت منحصربه فرد"
          />
          <WhyUsCard
            icon={CoursesSvg}
            title="تمرکز در برگزاری دوره های مفید"
            subTitle="پرورش متخصص"
          />
        </div>
      </section>

      <section className="pt-8 pb-10 border-b">
        <div className="flex flex-col gap-5 w-3/4 m-auto">
          <div className="flex">
            <h3 className="font-semibold text-lg grow">اساتید مجموعه</h3>
            <Link to={"/teachers"}>
              <span className=" text-sm text-blue-400 cursor-pointer">
                مشاهده همه
              </span>
            </Link>
          </div>
          <Slider
            id="teachers-slider"
            breakpoints={{
              720: {
                slidesPerView: 2,
              },
              1050: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={20}
          >
            {teachers?.map((teacher) => (
              <Link
                to={`/teachers/teacher/${teacher.id}-${useCleanString(
                  teacher.fullName
                )}`}
                key={teacher.id}
              >
                <TeacherCard {...teacher} />
              </Link>
            ))}
          </Slider>
        </div>
      </section>
      <section className="pt-8">
        <div className="flex flex-col bg-white rounded-lg px-6 py-8  shadow w-3/4 m-auto gap-5">
          <div className="flex">
            <h3 className="font-semibold text-lg grow">اخبار و مقالات</h3>
            <Link to={"/blogs"}>
              <span className=" text-sm text-blue-400 cursor-pointer">
                مشاهده همه
              </span>
            </Link>
          </div>
          <Slider
            id="blog-slider"
            breakpoints={{
              900: {
                slidesPerView: 2,
              },
              1400: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={30}
          >
            {blogs?.map((blog) => (
              <Link to={`/blogs/${blog.id}-${useCleanString(blog.title)}`} key={blog.id}>
                <BlogCard {...blog} />
              </Link>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
