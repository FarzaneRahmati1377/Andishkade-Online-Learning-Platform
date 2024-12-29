import Dashboard from "../../views/dashboard/Dashboard";
import EditAccount from "../../views/editAccount/EditAccount";
import { Route, Routes } from "react-router-dom";
import RegisteredCourses from "../../views/registeredCourses/RegisteredCourses";
import UserPanelSwitchBox from "../../components/userPanelSwitchBox/UserPanelSwitchBox";

const MyAccountPage = () => {
  return (
    <div className="bg-gray-100  ">
      <div className="flex justify-between h-full  gap-5 py-10 lg:w-3/4 mx-2 lg:mx-auto">
        <div className="hidden md:block ">
          <UserPanelSwitchBox />
        </div>

        <div className="flex w-full bg-white h-fit rounded border shadow-sm flex-col grow justify-start items-center gap-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="registered-courses" element={<RegisteredCourses />} />
            <Route path="edit-account" element={<EditAccount />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
