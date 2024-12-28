import { useState } from "react";
import DeepContainer from "../../components/container/DeepContainer";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useLoginContext } from "../../context/LoginContext";
import { getUser, SignUpUser } from "../../services/api";
import PasswordInput from "../../components/passwordInput/PasswordInput";
import { useNavigate } from "react-router-dom";

const MemberShipPage = () => {
  const { handleLogin } = useLoginContext();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(false);
  const [passwordStrengthLogin, setPasswordStrengthLogin] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessageError, setEmailMessageError] = useState("");
  const [nameMessageError, setNameMessageError] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [loginMessageError, setLoginMessageError] = useState("");
  const navigate = useNavigate();
  const toggleForm = () => setIsLoginForm(!isLoginForm);

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "name" || name === "lastname") {
      setNameMessageError("");
    }
    if (name === "password") {
      ValidatePassword(value);
    }

    if (name == "email") {
      setEmailMessageError("");
    }
    if (name == "email") {
      setLoginMessageError("");
    }
  };
  const isEmailPattern = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      return true;
    }
    return false;
  };

  const ValidatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegex.test(password)) {
      if (isLoginForm) {
        setPasswordStrengthLogin(true);
        setLoginMessageError("");
      } else {
        setPasswordStrength(true);
        setPasswordMessage("رمز عبور قوی است");
      }
    } else {
      if (isLoginForm) {
        setPasswordStrengthLogin(false);
        setLoginMessageError(
          "رمز عبور باید حداقل شامل ۸ کاراکتر، یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد."
        );
      } else {
        setPasswordStrength(false);
        setPasswordMessage(
          "رمز عبور باید حداقل شامل ۸ کاراکتر، یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد."
        );
      }
    }
  };

  const isValidFormData = () => {
    if (isLoginForm) {
      if (!formData.email) {
        setLoginMessageError("لطفاً ایمیل را وارد کنید.");
        return false;
      }
      if (!isEmailPattern(formData.email)) {
        setLoginMessageError("ایمیل وارد شده نامعتبراست!");
        return false;
      }
      if (!formData.password) {
        setLoginMessageError("لطفا رمز عبور را وارد کنید");
        return false;
      }
      if (!passwordStrengthLogin) {
        return false;
      }
    } else {
      if (formData.name.length < 3 || formData.lastname.length < 3) {
        setNameMessageError("نام و نام خانوادگی باید حداقل دارای 3 حرف باشد.");
        return false;
      }
      if (!formData.email) {
        setEmailMessageError("لطفاایمیل را وارد کنید");
        return false;
      }
      if (!isEmailPattern(formData.email)) {
        setEmailMessageError("ایمیل وارد شده نامعتبر است!");
        return false;
      }
      if (!formData.password) {
        setPasswordMessage("لطفا رمز عبور را وارد کنید");
        return false;
      }
      if (!passwordStrength) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidFormData()) {
      try {
        if (isLoginForm) {
          getUser(formData.email)
            .then((result) => {
              if (
                result === undefined ||
                result === null ||
                result.password !== formData.password
              ) {
                console.error("Invalid credentials");
                setLoginMessageError("نام کاربری یا رمز عبور نامعتبر است !");
              } else {
                const token = "fake-jwt-token";
                const userData = {
                  authToken: token,
                  id: result.id,
                  email: result.email,
                  name: result.name,
                  lastname: result.lastname,
                  is_logged_in: true,
                };
                localStorage.setItem("userData", JSON.stringify(userData));

                handleLogin();
                navigate("/my-account");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          getUser(formData.email).then((result) => {
            if (result === undefined || result === null) {
              SignUpUser(formData).then((result) => {
                console.log("ثبت نام انجام شد", result);
                setRegisterMessage("ثبت نام شما با موفقیت انجام شد !");
                setTimeout(() => {
                  setRegisterMessage("");
                  toggleForm();
                }, 3000);
              });
            } else {
              setEmailMessageError("شما قبلا ثبت نام کرده اید!");
            }
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      return;
    }
  };
  return (
    <div className="w-full bg-gray-50 flex  justify-center px-10 py-20  ">
      <DeepContainer>
        <div id="div" className=" border bg-white shadow relative max-w-full lg:w-[1000px]  flex justify-between px-5 py-20 rounded-md">
          <div className="bg-white w-28 h-28  absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center">
            <div className="w-20 h-20  bg-blue-600 rounded-full flex items-center justify-center">
              <PersonAddAltIcon fontSize="large" className="text-white" />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col gap-5 p-5 ">
              {!isLoginForm ? (
                <>
                  <h3>عضویت در سایت</h3>
                  <div className="bg-gray-100 flex justify-center items-center gap-2 h-10">
                    <span className=" text-sm">قبلا ثبت نام کرده اید ؟</span>
                    <a
                      className="text-xs text-blue-600 cursor-pointer"
                      onClick={toggleForm}
                    >
                      وارد شوید
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h3>ورود</h3>
                  <div className="bg-gray-100 flex justify-center items-center gap-2 h-10">
                    <span className=" text-sm">کاربر جدید هستید ؟</span>
                    <a
                      className="text-xs text-blue-600 cursor-pointer"
                      onClick={toggleForm}
                    >
                      ثبت نام کنید
                    </a>
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit} noValidate className=" space-y-4 ">
                {!isLoginForm && (
                  <>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChangeFormData}
                      required
                      placeholder="نام *"
                      className="border w-full h-8 px-3 py-4"
                      minLength={3}
                      maxLength={15}
                    />

                    <input
                      name="lastname"
                      id="lastname"
                      type="text"
                      value={formData.lastname}
                      onChange={handleChangeFormData}
                      required
                      placeholder="نام خانوادگی *"
                      className="border w-full h-8 px-3 py-4"
                      minLength={3}
                      maxLength={15}
                    />
                    {nameMessageError && (
                      <p className="text-sm mt-2 text-red-500">
                        {nameMessageError}
                      </p>
                    )}
                  </>
                )}
                <div className="w-full bg-red-50 relative">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChangeFormData}
                    required
                    placeholder="آدرس ایمیل *"
                    className="border w-full h-8 px-3 py-4"
                  />
                  <EmailOutlinedIcon
                    fontSize="small"
                    className="absolute top-0 bottom-0 my-auto left-2 text-gray-300"
                  />
                </div>
                {!isLoginForm ? (
                  <p className="text-sm mt-2 text-red-500">
                    {emailMessageError}
                  </p>
                ) : null}

                <PasswordInput
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChangeFormData}
                  placeholder="رمز عبور *"
                  className="w-full border h-8 px-3 py-4"
                />
                {!isLoginForm ? (
                  <p
                    className={`text-sm mt-2 ${
                      passwordStrength ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {passwordMessage}
                  </p>
                ) : (
                  <>
                    <p className="text-sm mt-2 text-red-500">
                      {loginMessageError}
                    </p>
                  </>
                )}

                <p className="text-sm">
                  اطلاعات شخصی شما برای پردازش سفارش شما استفاده می شود، و
                  پشتیبانی از تجربه شما در این وبسایت، و برای اهداف دیگری که در
                  سیاست حفظ حریم خصوصی توضیح داده شده است.
                </p>

                <button
                  className="text-sm font-bold relative w-full text-white bg-blue-500 h-10 rounded hover:bg-blue-600"
                  type="submit"
                >
                  {!isLoginForm ? (
                    <>
                      <span>عضویت</span>
                      <PersonAddAltIcon
                        fontSize="small"
                        className="absolute w-full top-0 bottom-0 my-auto right-2 text-white"
                      />
                    </>
                  ) : (
                    <>
                      <span>ورود</span>
                      <PersonAddAltIcon
                        fontSize="small"
                        className="absolute w-full top-0 bottom-0 my-auto right-2 text-white"
                      />
                    </>
                  )}
                </button>
                {!isLoginForm && registerMessage ? (
                  <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                     variant="filled"
                    severity="success"
                    sx={{ fontFamily: "Vazir, sans-serif" }}
                  >
                    {registerMessage}
                  </Alert>
                
                ) : null}
              </form>
            </div>

            <div className=" text-sm flex flex-col gap-3 p-5">
              <h4>سلام کاربر عزیر،</h4>
              <ul className="list-disc list-outside flex flex-col gap-3 px-6">
                <li className="list-item">
                  لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                  استفاده کنید.
                </li>
                <li>لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.</li>
                <li>
                  ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمی کنیم ،
                  درصورت رخداد این مورد، سریعااطلاع دهید.
                </li>
                <li>
                  لطفا به آدرس صفحه توجه داشته باشید، که بر روی دامنه اصلی سایت
                  ما باشد ، در غیر این صورت اکیدا تاکید می شود از وارد کردن
                  اطلاعات ورود خودداری فرمایید.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DeepContainer>
    </div>
  );
};

export default MemberShipPage;
