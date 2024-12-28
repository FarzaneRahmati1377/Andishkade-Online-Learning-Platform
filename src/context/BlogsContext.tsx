import { createContext, useContext, useEffect, useState } from "react";
import { IBlog } from "../types/server";
import { getBlogs } from "../services/api";
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import 'dayjs/locale/fa';
import useToPersianDigits from "../hooks/useToPersianDigits";

dayjs.extend(jalaliday);
interface IBlogsContextProvider {
  children: React.ReactNode;
}
interface IBlogsContext {
  blogs: IBlog[];
  formatPersianDate:(dateString:string)=>string
}

const blogsContext = createContext({} as IBlogsContext);

export const useBlogsContext = () => {
  return useContext(blogsContext);
};

export function BlogsProvider({ children }: IBlogsContextProvider) {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    getBlogs().then((result) => {
      setBlogs(result);
    });
  }, []);

  function formatPersianDate(dateString: string) {
    const months = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    const [year, month, day] = dateString.split("/").map(Number);

    if (
      !year ||
      !month ||
      !day ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      throw new Error("تاریخ نامعتبر است");
    }
    const toPersianDigits = (num: number): string => 
      num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

    return `${toPersianDigits(day)} ${months[month - 1]} ${useToPersianDigits(year)}`;
  }


  return (
    <blogsContext.Provider
      value={{
        blogs,
        formatPersianDate
      }}
    >
      {children}
    </blogsContext.Provider>
  );
}
