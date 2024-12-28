import { useEffect, useRef, useState } from "react";
import {  updateUser } from "../../services/api";
import { useLoginContext } from "../../context/LoginContext";
import {  IUser } from "../../types/server";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const EditAccount = () => {
  const { userInfo} = useLoginContext();
  const [updatedUserData, setUpdatedUserData] = useState<IUser>(userInfo);
  const [newPassword, setNewPassword] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const navigate = useNavigate();
  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordErrorMessage("");
    setNewPassword(e.target.value);
  };
  const {checkLoginStatus} = useLoginContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      if (!compareObjects(userInfo, updatedUserData)) {
        buttonRef.current.disabled = false;
        buttonRef.current.classList.remove("bg-gray-400", "cursor-default");
        buttonRef.current.classList.add("hover:bg-blue-600", "cursor-pointer");
      } else {
        buttonRef.current.disabled = true;
        buttonRef.current.classList.add("bg-gray-400", "cursor-default");
        buttonRef.current.classList.remove("hover:bg-blue-600", "cursor-pointer");
      }

      if (newPassword || confirmPassword) {
        buttonRef.current.disabled = false;
        buttonRef.current.classList.remove("bg-gray-400", "cursor-default");
        buttonRef.current.classList.add("hover:bg-blue-600", "cursor-pointer");
      }
    }
  }, [updatedUserData, newPassword]);

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordErrorMessage("");
    setConfirmPassword(e.target.value);
  };

  const handleChangeUpdateUserData = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
    if (name === "name" || name === "lastname") {
      setNameErrorMessage("");
    }
  };

  function compareObjects<T>(obj1: T, obj2: T): boolean {
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  const isValidUpdateUserData = () => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (
      updatedUserData.name.length < 3 ||
      updatedUserData.lastname.length < 3
    ) {
      setNameErrorMessage("نام و نام خانوادگی نمیتواند کمتر از 3 حرف باشد!");
      return false;
    }
    if (newPassword) {
      if (!strongPasswordRegex.test(newPassword)) {
        setNewPasswordErrorMessage(
          "رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف و اعداد باشد."
        );
        return false;
      }

      if (newPassword !== confirmPassword) {
        setConfirmPasswordErrorMessage("رمز عبور و تکرار آن مطابقت ندارند.");
        return false;
      }
    }
    if (confirmPassword && !newPassword) {
      console.log("confirmPassword:", confirmPassword);
      console.log("newPassword:", newPassword);
      setNewPasswordErrorMessage("لطفا ابتدا رمز عبور را وارد کنید!");
      return false;
    }
    return true;
  };

  const handleEditAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidUpdateUserData()) {
      setUpdatedUserData((prevState) => {
        const newUserData = newPassword
          ? { ...prevState, password: newPassword }
          : prevState;
        return newUserData;
      });

      const newUserData = newPassword
        ? { ...updatedUserData, password: newPassword }
        : updatedUserData;
      if (!compareObjects(userInfo, newUserData)) {
        await updateUser(userInfo.id, newUserData);
        setUpdateMessage("ویرایش اطلاعات با موفقیت انجام شد !");
        checkLoginStatus();
        setTimeout(() => {
          navigate("/my-account/");
        }, 3000);
      }
    }
  };
  return (
  
    <form
      onSubmit={handleEditAccount}
      className=" w-ful flex flex-col gap-10 p-5"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-5 w-full ">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="name" className="text-sm text-gray-500">
              نام *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="border shadow h-9 px-2"
              value={updatedUserData?.name}
              onChange={handleChangeUpdateUserData}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="lastname " className="text-sm text-gray-500">
              نام خانوادگی *
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              className="border shadow h-9 px-2"
              value={updatedUserData?.lastname}
              onChange={handleChangeUpdateUserData}
            />
          </div>
        </div>
        {nameErrorMessage && (
          <span className="text-sm mt-2 text-red-500">{nameErrorMessage}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-gray-500">
          آدرس ایمیل 
        </label>
        <input
          id="email"
          type="email"
          className="border shadow h-9 px-2"
          value={userInfo?.email}
        />
      </div>

      <div className="flex flex-col gap-5">
        <span className=" text-gray-500 ">تغییر رمز عبور</span>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-gray-500">
            رمز عبور کنونی
          </label>
          <PasswordInput
            id="password"
            value={userInfo.password}
            className="w-full border shadow h-9 px-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="new-password" className="text-sm text-gray-500">
            رمز عبور جدید(برای عدم تغییر خالی بگذارید)
          </label>
        
          <PasswordInput
            id="newPassword"
            onChange={handleChangeNewPassword}
            className="w-full border shadow h-9 px-2"
          />
          {newPasswordErrorMessage && (
            <span className="text-sm mt-2 text-red-500">
              {newPasswordErrorMessage}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm text-gray-500">
            تکرار رمز عبور جدید
          </label>
          {/* <input
            id="confirmPassword"
            type="password"
            className="border shadow h-9 px-2"
            onChange={handleChangeConfirmPassword}
          /> */}
          <PasswordInput
            id="confirmPassword"
            onChange={handleChangeConfirmPassword}
            className="w-full border shadow h-9 px-2"
          />
          {confirmPasswordErrorMessage && (
            <span className="text-sm mt-2 text-red-500">
              {confirmPasswordErrorMessage}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <button
          type="submit"
          ref={buttonRef}
          className=" text-sm w-fit h-10 rounded py-2 px-4 bg-blue-500  text-white font-bold"
        >
          ذخیره تغییرات
        </button>
        {updateMessage && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {updateMessage}
          </Alert>
        )}
      </div>
    </form>
  );
};

export default EditAccount;
