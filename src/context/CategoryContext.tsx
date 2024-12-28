import { createContext, useContext, useEffect, useState } from "react";
import {
  getCategories,
  getCourses,
  getSubCategories,
  getSubCategory,
} from "../services/api";
import { ICategory, ICourse, ISubCategory } from "../types/server";

interface ICategoriesContextProvider {
  children: React.ReactNode;
}

interface ICategoriesContext {
  categories: ICategory[];
  subCategories: ISubCategory[];
  popularSubCategories: ISubCategory[];
  setSubCategories: React.Dispatch<React.SetStateAction<ISubCategory[]>>;
}

export const categoriesContext = createContext({} as ICategoriesContext);

export const useCategoriesContext = () => {
  return useContext(categoriesContext);
};

export function CategoriesProvider({ children }: ICategoriesContextProvider) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [popularSubCategories, setpopularSubCategories] = useState<
    ISubCategory[]
  >([]);

  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });

    getSubCategories().then((result) => {
      setSubCategories(result);
    });

    getCourses().then((result) => {
      setCourses(result);
    });
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      getPopularSubCategories();
    }
  }, [courses]);

  async function getPopularSubCategories() {
    const popualrCourses = courses.filter((course) => course.rating > 4);
    const popularSubCategoriesPromises = popualrCourses.map((popualrCourse) =>
      getSubCategory(popualrCourse.subCategoryId)
    );

    const popularSubCategories = await Promise.all(
      popularSubCategoriesPromises
    );
    const filteredPopularSubCategories: ISubCategory[] =
      popularSubCategories.filter(
        (popularSubCategory, index, self) =>
          index === self.findIndex((o) => o.id === popularSubCategory.id)
      );
    setpopularSubCategories(filteredPopularSubCategories);
  }
  return (
    <categoriesContext.Provider
      value={{
        categories,
        subCategories,
        setSubCategories,
        popularSubCategories,
      }}
    >
      {children}
    </categoriesContext.Provider>
  );
}
