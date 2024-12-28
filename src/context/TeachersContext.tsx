import { createContext, useContext, useEffect, useState } from "react";
import { ITeacher } from "../types/server";
import { getTeachers } from "../services/api";

interface ITeacherContextProvider {
  children: React.ReactNode;
}

interface ITeachersContext {
  teachers: ITeacher[];
  isPopularTeacher: (teacherRating:number) => boolean
}

export const TeachersContext = createContext({} as ITeachersContext);

export const useTeachersContext = () => {
  return useContext(TeachersContext);
};

export function TeachersProvider({ children }: ITeacherContextProvider) {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);


  useEffect(() => {
    getTeachers().then((result) => {
      setTeachers(result);
    });
  }, []);


 
  const isPopularTeacher = (teacherRating:number) => {
    if(teacherRating >= 4){
      return true;
    }
    return false;
  }

  return (
    <TeachersContext.Provider value={{ teachers,isPopularTeacher}}>
      {children}
    </TeachersContext.Provider>
  );
}
