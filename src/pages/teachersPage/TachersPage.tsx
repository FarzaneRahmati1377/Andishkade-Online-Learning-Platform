import { useState } from "react";
import TeachersBannerSvg from "../../assets/svg/banner-teacherspage.svg";
import DeepContainer from "../../components/container/DeepContainer";
import TeacherCard from "../../components/teacherCard/TeacherCard";
import { useTeachersContext } from "../../context/TeachersContext";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import useCleanString from "../../hooks/useCleanString";
const TeachersPage = () => {
  const { teachers } = useTeachersContext();
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(teachers.length / itemsPerPage);
  const displayedTeachers = teachers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const handleChangePageNumber = (
    _: React.ChangeEvent<unknown>, 
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="flex flex-col bg-gray-50 gap-5 pb-10 ">
      <img src={TeachersBannerSvg} className="w-full" />
      <DeepContainer>
        <div className="flex  justify-center">
          <div className="w-3/4 flex flex-col items-center gap-20">
            <div className="w-full flex flex-col gap-10 items-center">
              <h3 className=" font-bold w-full">اساتید مجموعه</h3>

              <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {displayedTeachers.map((teacher) => (
                  <Link
                    to={`/teachers/teacher/${teacher.id}-${useCleanString(
                      teacher.fullName
                    )}`}
                    key={teacher.id}
                  >
                    <div className="w-[200px]">
                      <TeacherCard {...teacher} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {pageCount !== 1 ? (
              <Pagination
                count={pageCount}
                page={page}
                onChange={(event, value) => handleChangePageNumber(event,value)}
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

export default TeachersPage;
