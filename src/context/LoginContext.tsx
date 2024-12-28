import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types/server";
import { getUser } from "../services/api";
import { useNavigate } from "react-router-dom";

interface ILoginContextProvider {
  children: React.ReactNode;
}

interface ILoginContext {
  isLogin: boolean;
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
  handleLogin: () => void;
  handleLogOut: () => void;
  checkLoginStatus: () => void;
}

export const LoginContext = createContext({} as ILoginContext);

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export function LoginProvider({ children }: ILoginContextProvider) {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>({} as IUser);
  const navigate = useNavigate();
  const handleLogin = () => {
    checkLoginStatus();
  };


  const handleLogOut = () => {
    setIsLogin(false);
    localStorage.clear();
    navigate("/member-ship");
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.is_logged_in) {
        setIsLogin(true);
        getUser(userData.email).then((result) => {
          setUserInfo(result);
        });
      }
    }
  };

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        userInfo,
        setUserInfo,
        handleLogin,
        handleLogOut,
        checkLoginStatus,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
