import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCourses } from "../services/api";
import { ICourse } from "../types/server";
import { toGregorian } from "jalaali-js";

interface ICoursesContextProvider {
  children: React.ReactNode;
}

interface ICoursesContext {
  allCourses: ICourse[];
  setAllCourses: React.Dispatch<React.SetStateAction<ICourse[]>>;
  filteredCourses: ICourse[];
  setFilteredCourses: React.Dispatch<React.SetStateAction<ICourse[]>>;
  calculateDiscountedPrice: (price: number, discount: number) => number;
  getNewCourses: (courses: ICourse[]) => ICourse[];
  getPopularCourses: (courses: ICourse[]) => ICourse[];
  searchBoxQuery:string,
  setSearchBoxQuery:React.Dispatch<React.SetStateAction<string>>,
  searchBoxInputRef:React.RefObject<HTMLInputElement>,
  clearSearchBox:() => void
}

export const CoursesContext = createContext({} as ICoursesContext);

export const useCoursesContext = () => {
  return useContext(CoursesContext);
};

export function CoursesProvider({ children }: ICoursesContextProvider) {
  const [allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
  const [searchBoxQuery,setSearchBoxQuery] = useState("");
  const searchBoxInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCourses().then((result) => {
      setAllCourses(result);
    });
  },[]);

  useEffect(() => {
    getNewCourses(filteredCourses);
    getPopularCourses(filteredCourses);
  }, [allCourses]);

  function getPopularCourses(courses: ICourse[]) {
    const popualrCourses = courses.filter((course) => course.rating > 4);
    return popualrCourses;
  }

  const getNewCourses = (courses: ICourse[]) => {
    const now = new Date();
    let newCourses: ICourse[];
    newCourses = courses.filter((course) => {
      const [year, month, day] = course.creationDate.split("/").map(Number);
      const { gy, gm, gd } = toGregorian(year, month, day);
      const date = new Date(gy, gm - 1, gd);

      const twoMonthsAgo = new Date(now);
      twoMonthsAgo.setMonth(now.getMonth() - 2);

      return date >= twoMonthsAgo && date <= now;
    });

    return newCourses;
  };

  function calculateDiscountedPrice(price: number, discountPercent: number) {
    if (discountPercent > 0) {
      const discount = (price * discountPercent) / 100;
      return price - discount;
    }
    return price;
  }

  function clearSearchBox(){
    if (searchBoxInputRef.current) {
     
      searchBoxInputRef.current.value = "";
      setSearchBoxQuery("");
    }
  };


  return (
    <CoursesContext.Provider
      value={{
        allCourses,
        setAllCourses,
        filteredCourses,
        setFilteredCourses,
        calculateDiscountedPrice,
        getNewCourses,
        getPopularCourses,
        searchBoxQuery,
        setSearchBoxQuery,
        searchBoxInputRef,
        clearSearchBox
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
