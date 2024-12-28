import { useEffect, useState } from "react";
import Banner from "../../assets/svg/BannerCoursesDetailsPage.svg";
import DeepContainer from "../../components/container/DeepContainer";
import CurriculumBox from "../../components/curriculum/CurriculumBox";
import {
  ICourse,
  ICurriculumInfo,
  IGeneralQuestions,
  ITeacher,
  IVideo,
} from "../../types/server";
import video from "../../assets/videos/video.mp4";
import {
  client,
  getCourse,
  getCurriculum,
  getGeneralQuestions,
  getShoppingCartItem,
  getTeacherByCourseId,
} from "../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import QuestionBox from "../../components/questionBox/QuestionBox";
import { useCoursesContext } from "../../context/CoursesContext";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { PulseLoader } from "react-spinners";
import HorizontalTeacherCard from "../../components/horizontalTeacherCard/HorizontalTeacherCard";
import useToPersianDigits from "../../hooks/useToPersianDigits";
import { useLoginContext } from "../../context/LoginContext";
import { Alert } from "@mui/material";

const CourseDetailsPage = () => {
  const { courseInfo } = useParams();
  const id = courseInfo?.split("-")[0];
  const navigate = useNavigate();
  const [course, setCourse] = useState<ICourse>();
  const [teacher, setTeacher] = useState<ITeacher>();
  const [curriculumInfo, setCurriculumInfo] = useState<ICurriculumInfo[]>([]);
  const [generalQuestions, setGeneralQuestions] = useState<IGeneralQuestions[]>(
    []
  );
  const [showAlert, setShowAlert] = useState(false);

  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const { addCourseIdToShoppingCart } = useShoppingCartContext();
  const { shoppingCartItemsId, registeredCoursesId, addRegisteredCourseId } =
    useShoppingCartContext();
  const isInShoppingCart = shoppingCartItemsId.some((item) => item.id === id);
  const isInRegisteredCourses = registeredCoursesId.some(
    (item) => item.id === id
  );
  const [shouldFetchCurriculum, setShouldFetchCurriculum] = useState(false);
  const [loadingButtonText, setLoadingButtonText] = useState(false);
  const { isLogin } = useLoginContext();

  useEffect(() => {
    getCourse(id as string).then((result) => {
      setCourse(result);
    });

    getTeacherByCourseId(id as string).then((result) => {
      setTeacher(result);
    });

    getGeneralQuestions().then((result) => {
      setGeneralQuestions(result);
    });
  }, []);

  useEffect(() => {
    getCurriculum(id as string).then((result) => {
      setCurriculumInfo(result.curriculumInfo);
    });
  }, [shouldFetchCurriculum]);

  useEffect(() => {
    if (isInShoppingCart) {
      setButtonText("مشاهده در سبد خرید");
      setButtonColor("bg-blue-400 hover:bg-blue-500");
    } else if (isInRegisteredCourses) {
      setButtonText("ثبت نام کرده‌اید");
      setButtonColor("bg-green-400");
    } else {
      setButtonText("افزودن به سبد خرید");
      setButtonColor("bg-orange-400 hover:bg-orange-500  ");
    }
  }, [isInShoppingCart, isInRegisteredCourses]);

  useEffect(() => {
    if (course?.price === 0 && !isInRegisteredCourses) {
      setButtonText("ثبت نام رایگان");
      setButtonColor("bg-orange-400 hover:bg-orange-500 ");
    }
  }, [course]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const { calculateDiscountedPrice } = useCoursesContext();
  const finalPrice = calculateDiscountedPrice(
    course?.price ?? 0,
    course?.discount ?? 0
  );

  const handleAddCourseToShoppingCart = (id: string) => {
    getShoppingCartItem(id).then((result) => {
      if (result.length !== 0) {
        console.error("آیتم در سبد خرید وجود دارد!");
        return;
      }

      if (course) {
        addCourseIdToShoppingCart(course.id);
        setButtonText("مشاهده در سبد خرید");
        setButtonColor("bg-blue-500");
        console.log(`دوره ی آموزشی ${course.title} به سبد خرید اضافه شد!`);
      }
    });
  };

  const ManageShoppingCartBtn = () => {
    switch (buttonText) {
      case "افزودن به سبد خرید":
        setLoadingButtonText(true);
        setTimeout(() => {
          handleAddCourseToShoppingCart(id as string);
          setLoadingButtonText(false);
        }, 1000);

        break;

      case "مشاهده در سبد خرید":
        navigate("/shopping-cart");
        setLoadingButtonText(false);

        break;

      case "ثبت نام رایگان":
        if (isLogin) {
          setLoadingButtonText(true);
          setTimeout(() => {
            addRegisteredCourseId(id as string);
            openAllLocks(
              id as string,
              curriculumInfo as ICurriculumInfo[],
              false
            );
            setButtonText("ثبت نام کرده اید");
            setButtonColor("bg-green-500 ");
            setLoadingButtonText(false);
          }, 1000);
        } else {
          console.log("لاگین نیست");
          setShowAlert(true);
        }

        break;
    }
  };

  const openAllLocks = async (
    id: string,
    curriculumInfo: ICurriculumInfo[],
    newLockValue: boolean
  ) => {
    try {
      const courseId = +id;
      const updatedCurriculumInfo = curriculumInfo.map(
        (chapter: ICurriculumInfo) => ({
          ...chapter,
          videos: chapter.videos.map((video: IVideo) => ({
            ...video,
            lock: newLockValue,
          })),
        })
      );
      if (updatedCurriculumInfo.length !== 0) {
        await client.put(`/curriculum/${courseId}`, {
          id,
          courseId,
          curriculumInfo: updatedCurriculumInfo,
        });
        setShouldFetchCurriculum((prev) => !prev);
        console.log("Locks updated successfully!");
      }
    } catch (error) {
      console.error("Error updating locks:", error);
    }
  };

  const handleScroll = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="flex bg-white flex-col gap-3">
      <div className="relative">
        <img src={Banner} alt="" className="w-full h-full" />
        <div className="flex flex-col gap-2 lg:gap-5  justify-center items-center absolute  lg:right-56 lg:translate-x-0 lg:left-auto left-1/2 -translate-x-1/2 top-0 bottom-0 text-xs lg:text-base ">
          <h3 className="font-semibold  text-gray-100 ">{course?.title}</h3>
          <div className="flex gap-5 items-center">
            <img
              src={teacher?.image}
              className="w-10 h-10 lg:w-16 lg:h-16 rounded-full"
            />
            <div className="flex flex-col gap-2">
              <span className="text-gray-100">{teacher?.fullName}</span>
              <div className="flex items-center gap-2">
                <StarIcon className="text-yellow-400" fontSize="small" />
                {teacher?.rating && (
                  <span className="text-yellow-400">
                    {useToPersianDigits(teacher?.rating)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeepContainer>
        <div className="flex flex-col gap-5 lg:flex-row justify-between p-5 lg:p-0 ">
          <div className="flex flex-col gap-8  ">
            <ul className="flex justify-around border-b p-2 font-semibold text-sm">
              <li>
                <button onClick={() => handleScroll("caption")}>
                  شرح دوره
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll("curriculum")}>
                  برنامه درسی
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll("teacher")}>
                  درباره استاد
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll("questions")}>
                  سوالات متداول
                </button>
              </li>
            </ul>

            <section id="caption" className="flex flex-col gap-3">
              <h3 className="font-semibold text-sm lg:text-base">شرح دوره</h3>
              <p className="border py-5 px-8 rounded-md leading-10 shaddow text-sm lg:text-base lg:leading-10 ">
                {course?.caption}
              </p>
            </section>
            <section id="curriculum" className="flex flex-col gap-3">
              <h3 className="font-semibold text-sm lg:text-base">برنامه درسی</h3>
              <div className="flex flex-col gap-1 ">
                {curriculumInfo?.map((curriculumInfo) => (
                  <CurriculumBox key={curriculumInfo.id} {...curriculumInfo} />
                ))}
              </div>
            </section>
            <section id="teacher">
              {teacher && (
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold text-sm lg:text-base">
                    درباره استاد
                  </h3>
                  <Link to={`/teachers/teacher/${teacher?.id}`}>
                    <HorizontalTeacherCard {...teacher} />
                  </Link>
                </div>
              )}
            </section>
            <section id="questions" className="flex flex-col gap-3">
              <h3 className="font-semibold text-sm lg:text-base">سوالات متداول</h3>
              <div className="flex flex-col gap-3">
                {generalQuestions.map((generalQuestion) => (
                  <QuestionBox key={generalQuestion.id} {...generalQuestion} />
                ))}
              </div>
            </section>
          </div>
          <div className="flex gap-5 flex-col">
            <div className="flex flex-col w-full  h-fit lg:min-w-[300px]  justify-between border shadow p-4 rounded-md">
              <div className="flex w-full flex-col gap-5">
                <div className="relative w-full  border rounded object-cover">
                  <video
                    className="w-full h-full rounded "
                    controls
                    poster={course?.image}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
                <div className="flex flex-col gap-5 px-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">مشخصات دوره</h3>
                    {course?.discount && course.discount > 0 ? (
                      <span className="text-pink-500 text-center font-semibold text-sm">
                        {`% ${useToPersianDigits(course?.discount)} تخفیف ویژه`}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-2 items-center ">
                      <AttachMoneyIcon
                        fontSize="small"
                        className="text-gray-400"
                      />
                      <span>قیمت دوره</span>
                    </div>
                    {course?.price && course?.price !== 0 ? (
                      <div>
                        {course?.discount && course?.discount > 0 ? (
                          <span className="line-through">
                            {useToPersianDigits(course?.price)} تومان
                          </span>
                        ) : (
                          <span className="font-bold text-blue-400">
                            {useToPersianDigits(course?.price)} تومان
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="font-bold text-blue-400">رایگان</span>
                    )}
                  </div>
                  {course?.discount && course.discount > 0 ? (
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex gap-2 items-center">
                        <MoneyOffIcon
                          fontSize="small"
                          className="text-gray-400"
                        />
                        <span>قیمت نهایی دوره :</span>
                      </div>
                      <span className="font-semibold text-blue-400">
                        {useToPersianDigits(finalPrice)} تومان{" "}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-2 items-center">
                      <AccessTimeIcon
                        fontSize="small"
                        className="text-gray-400"
                      />
                      <span>مدت زمان :</span>
                    </div>
                    {course?.times && (
                      <span>{useToPersianDigits(course?.times)} ساعت</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-2 items-center">
                      <QueueOutlinedIcon
                        fontSize="small"
                        className="text-gray-400"
                      />
                      <span>تعداد فصل ها :</span>
                    </div>
                    <span>{useToPersianDigits(curriculumInfo?.length)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-2 items-center">
                      <WorkspacePremiumIcon
                        fontSize="small"
                        className="text-gray-400"
                      />
                      <span>مدرک :</span>
                    </div>
                    <span> {course?.degree}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={ManageShoppingCartBtn}
                className={` py-2 text-white mt-3 transition-colors duration-300 rounded ${buttonColor} `}
              >
                {loadingButtonText ? (
                  <PulseLoader
                    color="white"
                    size={8}
                    className="opacity-80"
                    loading={true}
                  />
                ) : (
                  buttonText
                )}
              </button>
            </div>
            {showAlert && (
              <Alert
                icon={false}
                variant="filled"
                sx={{ fontFamily: "Vazir, sans-serif" }}
                severity="info"
              >
                برای ثبت نام در دورها ابتدا باید وارد شوید !
              </Alert>
            )}
          </div>
        </div>
      </DeepContainer>
    </div>
  );
};

export default CourseDetailsPage;
