import CoursesBannerSvg from "../../assets/svg/banner-coursespage.svg";
import CourseCard from "../../components/courseCard/CourseCard";
import DeepContainer from "../../components/container/DeepContainer";
import SortIcon from "@mui/icons-material/Sort";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  getCourses,
  getCoursesByCategoryId,
  getCoursesBySubCategoryId,
} from "../../services/api";
import { useCategoriesContext } from "../../context/CategoryContext";
import { useCoursesContext } from "../../context/CoursesContext";
import { Pagination } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { ICategory, ICourse } from "../../types/server";
import ToggleBox from "../../components/toggleBox/ToggleBox";
import useCleanString from "../../hooks/useCleanString";
import useToPersianDigits from "../../hooks/useToPersianDigits";

const CoursesPage = () => {
  const {
    allCourses,
    setAllCourses,
    filteredCourses,
    setFilteredCourses,
    searchBoxQuery,
    clearSearchBox,
    searchBoxInputRef,
  } = useCoursesContext();
  const { en_title } = useParams<{ en_title: string }>();
  const [selectedPriceRangeFilter, setSelectedPriceRangeFilter] =
    useState("all-courses");
  const [searchParams, setSearchParams] = useSearchParams();
  const priceRanges = [
    { id: "free-courses", min: 0, max: 0 },
    { id: "200To400", min: 200000, max: 400000 },
    { id: "400To600", min: 400000, max: 600000 },
    { id: "600To800", min: 600000, max: 800000 },
    { id: "above800", min: 800000, max: Infinity },
  ];

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // handleSortingFilterChange("default");

    const fetchAndSetFilteredCourses = async () => {
      const filteredCoursesByPrice = await filterCoursesByPrice(
        selectedPriceRangeFilter
      );
      setFilteredCourses(filteredCoursesByPrice);
    };

    fetchAndSetFilteredCourses();
  }, [selectedPriceRangeFilter]);

  useEffect(() => {
    setSelectedPriceRangeFilter("all-courses");
    setPage(1);

    getCustomCourses(en_title as string);
  }, [en_title, searchBoxQuery]);

  useEffect(() => {
    if (en_title && en_title !== undefined && searchBoxInputRef) {
      clearSearchBox();
    }
  }, [en_title]);

  useEffect(() => {
    const fetchAndSetFilteredCourses = async () => {
      const sortedCourses = await handleSortingFilter();
      setFilteredCourses(sortedCourses);
    };

    fetchAndSetFilteredCourses();
  }, [searchParams]);

  const { categories, subCategories } = useCategoriesContext();
  const { getNewCourses, getPopularCourses, calculateDiscountedPrice } =
    useCoursesContext();
  const sorting = searchParams.get("sorting");
  const isFirstRender = useRef(true);
  const handleSortingFilterChange = (filter: string) => {
    setSearchParams({ sorting: filter });
  };
  const [visibleSubCategories, setVisibleSubCategories] = useState(true);
  const [focusedSubCategory, setFocusedSubCategory] = useState<string | null>(
    null
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(filteredCourses?.length / itemsPerPage);
  const displayedCourses = filteredCourses?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const handleChangePageNumber = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handlePriceRangeChangeFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPriceRangeFilter(event.target.value);
  };
  const handleSortingFilter = async (): Promise<ICourse[]> => {
    let filteredCourses: ICourse[];

    filteredCourses = await filterCoursesByPrice(selectedPriceRangeFilter);

    if (sorting === "default") {
      return filteredCourses;
    } else if (sorting === "new") {
      return getNewCourses(filteredCourses);
    } else if (sorting === "popular") {
      return getPopularCourses(filteredCourses);
    } else if (sorting === "top-rated") {
      return filteredCourses.filter((course) => course.rating == 5);
    }
    return filteredCourses;
  };
  const findCoursesBysearchBoxQuery = (query: string, courses: ICourse[]) => {
    const wordsToRemove = ["دوره", "جامع", "آموزش"];
    const regex = new RegExp(wordsToRemove.join("|"), "g");
    let cleanQuery = query.replace(regex, "").trim();
    if (!cleanQuery) return [];
    const similarityThreshold = 0.7;
    const calculateSimilarity = (a: string, b: string) => {
      const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase());
      return 1 - distance / Math.max(a.length, b.length);
    };

    const levenshteinDistance = (a: string, b: string): number => {
      const dp: number[][] = Array(a.length + 1)
        .fill(null)
        .map(() => Array(b.length + 1).fill(0));

      for (let i = 0; i <= a.length; i++) dp[i][0] = i;
      for (let j = 0; j <= b.length; j++) dp[0][j] = j;

      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
        }
      }
      return dp[a.length][b.length];
    };

    return courses
      .map((course) => ({
        ...course,
        similarity: calculateSimilarity(course.title, cleanQuery),
      }))
      .filter(
        (course) =>
          course.similarity >= similarityThreshold ||
          course.title.toLowerCase().includes(cleanQuery.toLowerCase())
      )
      .sort((a, b) => b.similarity - a.similarity);
  };
  async function getCustomCourses(en_title: string): Promise<ICourse[]> {
    if (searchBoxQuery.trim() !== "") {
      const filteredCourses = findCoursesBysearchBoxQuery(
        searchBoxQuery,
        allCourses
      );

      setFilteredCourses(filteredCourses);
      return filteredCourses;
    }

    if (!allCourses || allCourses.length === 0) {
      const result = await getCourses();
      setAllCourses(result);
      setFilteredCourses(result);
      return result;
    }

    if (en_title) {
      for (const category of categories) {
        if (category.enTitle === en_title) {
          const result = await getCoursesByCategoryId(category.id);
          setFilteredCourses(result);
          return result || [];
        }
      }

      for (const subCategory of subCategories) {
        if (subCategory.enTitle === en_title) {
          const result = await getCoursesBySubCategoryId(subCategory.id);
          setFilteredCourses(result);
          return result || [];
        }
      }
      return filteredCourses;
    }
    setFilteredCourses(allCourses);

    return allCourses || [];
  }
  const toggleSubCategoryFilter = () => {
    setVisibleSubCategories(!visibleSubCategories);
  };

  const getCategoryByCategoryId = (categoryId: number) => {
    return categories.find((category) => category.id == categoryId);
  };

  const filterCoursesByPrice = async (
    priceRangeId: string
  ): Promise<ICourse[]> => {
    const courses = await getCustomCourses(en_title as string);
    const range = priceRanges.find((range) => range.id === priceRangeId);

    if (range) {
      return courses.filter(
        (course) =>
          calculateDiscountedPrice(course.price, course.discount) >=
            range.min &&
          calculateDiscountedPrice(course.price, course.discount) <= range.max
      );
    }

    return courses;
  };
  const renderCategory = (category: ICategory) => (
    <>
      <div
        id={`${category?.id}`}
        className="flex  h-[50px] w-full items-center justify-between text-sm py-2 px-4"
        onClick={() => toggleSubCategoryFilter()}
      >
        <Link
          to={`/courses/${category.enTitle}`}
          onClick={() => setFocusedSubCategory(category.enTitle)}
        >
          <span>{category?.title}</span>
        </Link>
        <span
          className={`text-gray-400 transform transition-transform duration-500 ease-in-out ${
            visibleSubCategories ? "-rotate-180" : "rotate-0"
          }`}
        >
          <ExpandMoreRoundedIcon fontSize="small" className="text-gray-400" />
        </span>
      </div>

      {visibleSubCategories && (
        <div className="flex  flex-col space-y-4 px-5 pt-3 pb-5 ">
          {subCategories
            .filter((subCategory) => subCategory.categoryId == category?.id)
            .map((subCategory) => (
              <Link
                key={subCategory.id}
                to={`/courses/${subCategory.enTitle}`}
                className={`underline ${
                  focusedSubCategory === subCategory.enTitle
                    ? "text-blue-500 font-bold"
                    : "text-gray-800"
                }`}
                onClick={() => setFocusedSubCategory(subCategory.enTitle)}
                onFocus={() => setFocusedSubCategory(subCategory.enTitle)}
              >
                <div className="inline-flex gap-2 items-center">
                  <span className="text-xs shrink-0 ">{subCategory.title}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </>
  );

  return (
    <div>
      <img src={CoursesBannerSvg} className="w-full" />

      <DeepContainer>
        <div className="flex w-full items-stretch  justify-between gap-5 py-10 ">
          <div className="min-w-[250px] hidden lg:flex  h-fit flex-col gap-5  ">
            <div className="bg-red-50 rounded">
              <span className="bg-orange-400 block rounded text-center py-2  text-white">
                فیلترها
              </span>
            </div>
            <ToggleBox title={<span className="font-normal text-base">دسته بندی</span>}>
              <div className="bg-white">
                {en_title ? (
                  categories
                    .filter((category) => category.enTitle === en_title)
                    .concat(
                      subCategories
                        .filter(
                          (subCategory) => subCategory.enTitle === en_title
                        )
                        .map((subCategory) =>
                          getCategoryByCategoryId(subCategory.categoryId)
                        )
                        .filter(
                          (category): category is ICategory =>
                            category !== undefined
                        )
                    )
                    .map((category) => renderCategory(category))
                ) : (
                  <div className="flex flex-col space-y-3  px-5 pt-2 pb-5">
                    {categories.map((category) => (
                      <Link to={`/courses/${category.enTitle}`}>
                        <div key={category.id}>
                          <span className="text-sm shrink-0 ">
                            {category.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </ToggleBox>

            <ToggleBox title={<span className="font-normal text-base">قیمت دوره ها</span>}>
              <div className=" bg-white flex flex-col space-y-5 px-5 pt-3 pb-5">
                <label className="inline-flex gap-2 items-center cursor-pointer">
                  <input
                    type="radio"
                    name="redio-group-button-filters"
                    className="form-radio text-blue-600"
                    value="all-courses"
                    checked={selectedPriceRangeFilter === "all-courses"}
                    onChange={handlePriceRangeChangeFilter}
                  />
                  <span className="text-sm shrink-0">پیشفرض</span>
                </label>
                <label className="inline-flex gap-2 items-center cursor-pointer">
                  <input
                    type="radio"
                    name="redio-group-button-filters"
                    className="form-radio text-blue-600"
                    value="200To400"
                    checked={selectedPriceRangeFilter === "200To400"}
                    onChange={handlePriceRangeChangeFilter}
                  />
                  <span className="text-sm shrink-0">
                    {`${useToPersianDigits(200000)} تا  ${useToPersianDigits(
                      400000
                    )} تومان`}
                  </span>
                </label>
                <label className="inline-flex gap-2 items-center cursor-pointer">
                  <input
                    type="radio"
                    name="redio-group-button-filters"
                    className="form-radio text-blue-600"
                    value="400To600"
                    checked={selectedPriceRangeFilter === "400To600"}
                    onChange={handlePriceRangeChangeFilter}
                  />
                  <span className="text-sm shrink-0">
                    {`${useToPersianDigits(400000)} تا  ${useToPersianDigits(
                      600000
                    )} تومان`}
                  </span>
                </label>
                <label className="inline-flex gap-2 items-center cursor-pointer">
                  <input
                    type="radio"
                    name="redio-group-button-filters"
                    className="form-radio text-blue-600"
                    value="600To800"
                    checked={selectedPriceRangeFilter === "600To800"}
                    onChange={handlePriceRangeChangeFilter}
                  />
                  <span className="text-sm shrink-0">
                    {`${useToPersianDigits(600000)} تا  ${useToPersianDigits(
                      800000
                    )} تومان`}
                  </span>
                </label>
                <label className="inline-flex gap-2 items-center cursor-pointer">
                  <input
                    type="radio"
                    name="redio-group-button-filters"
                    className="form-radio text-blue-600"
                    value="above800"
                    checked={selectedPriceRangeFilter === "above800"}
                    onChange={handlePriceRangeChangeFilter}
                  />
                  <span className="text-sm shrink-0">
                    {`${useToPersianDigits(800000)} تومان به بالا`}
                  </span>
                </label>
                <label className="inline-flex gap-2 items-center cursor-pointer">
                  <input
                    type="radio"
                    name="redio-group-button-filters"
                    className="form-radio text-blue-600"
                    value="free-courses"
                    checked={selectedPriceRangeFilter === "free-courses"}
                    onChange={handlePriceRangeChangeFilter}
                  />
                  <span className="text-sm shrink-0">دوره های رایگان</span>
                </label>
              </div>
            </ToggleBox>
          </div>

          <div className="flex flex-col grow justify-start items-center gap-8">
            <div className="flex justify-between w-full text-sm items-center">
              <div className="flex w-full text-xs justify-center sm:justify-start sm:text-sm shrink-0 gap-3 sm:gap-5 px-1 md:px-0 ">
                <div className="flex gap-1">
                  <SortIcon />
                  <span className=" shrink-0 ">مرتب سازی :</span>
                </div>
                <span
                  onClick={() => handleSortingFilterChange("default")}
                  className={`shrink-0 cursor-pointer ${
                    sorting === "default" && "text-blue-500"
                  }`}
                >
                  پیشفرض
                </span>
                <span
                  onClick={() => handleSortingFilterChange("new")}
                  className={`shrink-0 cursor-pointer ${
                    sorting === "new" && "text-blue-500"
                  }`}
                >
                  جدیدترین ها
                </span>

                <span
                  onClick={() => handleSortingFilterChange("popular")}
                  className={`shrink-0 cursor-pointer ${
                    sorting === "popular" && "text-blue-500 "
                  }`}
                >
                  محبوب ترین ها
                </span>

                <span
                  onClick={() => handleSortingFilterChange("top-rated")}
                  className={`shrink-0 cursor-pointer ${
                    sorting === "top-rated" && "text-blue-500 "
                  }`}
                >
                  بالاترین امتیاز
                </span>
              </div>

              <span className="font-semibold shrink-0  hidden sm:inline ">
                {useToPersianDigits(filteredCourses.length)} دوره
              </span>
            </div>

            {displayedCourses.length > 0 ? (
              <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 ">
                {displayedCourses?.map((course) => (
                  <Link
                    to={`/courses/course/${course.id}-${useCleanString(
                      course.title
                    )}`}
                    key={course.id}
                  >
                    <div className="w-[250px]">
                      <CourseCard {...course} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className=" w-full px-5 grow">
                <span>دوره ی مورد نظر یافت نشد !</span>
              </div>
            )}

            {pageCount !== 1 ? (
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChangePageNumber}
                color="primary"
                variant="outlined"
                shape="rounded"
                style={{ direction: "ltr" }}
              />
            ) : null}
          </div>
        </div>
      </DeepContainer>
    </div>
  );
};

export default CoursesPage;
