import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HorizontalCourseCard from "../../components/horizontalcourseCard/HorizontalCourseCard";
import { useCoursesContext } from "../../context/CoursesContext";
import emptyShoppingCartSvg from "../../assets/svg/empty-shoppingcart.svg";
import { PulseLoader } from "react-spinners";
import CoursesCard from "../../components/courseCard/CourseCard";
import useCleanString from "../../hooks/useCleanString";
import { Link } from "react-router-dom";
import useToPersianDigits from "../../hooks/useToPersianDigits";

const ShoppingCartPage = () => {
  const { shoppingCartItems, deleteShoppingCartItem } =
    useShoppingCartContext();
  const { calculateDiscountedPrice } = useCoursesContext();
  const [lodingDeleteShoppingCartItem, setLodingDeleteShoppingCartItem] =
    useState<{ [key: number]: boolean }>({});

  const handleDeleteShoppingCartItemBtn = (id: string) => {
    setLodingDeleteShoppingCartItem((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      deleteShoppingCartItem(id);
      setLodingDeleteShoppingCartItem((prev) => ({ ...prev, [id]: false }));
    }, 1000);
  };
  const handlePaymentGatewayBtn = () => {
    // conected to payment-gateway
  };

  const totalPrice = shoppingCartItems.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      calculateDiscountedPrice(currentItem.price, currentItem.discount)
    );
  }, 0);

  return (
    <div className="bg-gray-50 h-full ">
      <div className="flex flex-col  gap-5 p-5 h-full items-center justify-center lg:w-3/4 mx-auto lg:flex-row lg:items-start  ">
        <div className="flex grow flex-col h-full gap-3">
          <div className="bg-blue-100 w-full p-3 gap-1 flex flex-col text-blue-800  rounded">
            <div className="flex gap-1 items-center">
              <InfoOutlinedIcon />
              <span className="font-bold mb-1">توجه</span>
            </div>
            <span className="text-sm px-3">
              درگاه پرداخت فعال نیست، درحال حاضر فقط می توانید در دوره های
              رایگان ثبت نام کنید!{" "}
            </span>
            <span className="text-sm px-3 ">از صبوری شما سپاس گزاریم !</span>
          </div>

          <div className="flex flex-col  bg-white w-full rounded gap-5 shadow-sm border p-5   ">
            <span className="font-semibold">سبد خرید شما</span>
            <div className="flex flex-col h-[600px] overflow-auto gap-5 ">
              {shoppingCartItems.length !== 0 ? (
                shoppingCartItems.map((shoppingCartItem) => (
                  <div className="flex gap-3 justify-center items-center">
                    <button
                      onClick={() =>
                        handleDeleteShoppingCartItemBtn(shoppingCartItem.id)
                      }
                    >
                      {lodingDeleteShoppingCartItem[+shoppingCartItem.id] ? (
                        <PulseLoader
                          color="red"
                          size={8}
                          className="opacity-80"
                          loading={true}
                        />
                      ) : (
                        <DeleteOutlineIcon className="text-red-600" />
                      )}
                    </button>
                    <Link
                      to={`/courses/course/${
                        shoppingCartItem.id
                      }-${useCleanString(shoppingCartItem.title)}`}
                      key={shoppingCartItem.id}
                    >
                      <div className="hidden md:block">
                        <HorizontalCourseCard {...shoppingCartItem} />
                      </div>
                      <div className="md:hidden w-[250px]">
                        <CoursesCard {...shoppingCartItem} />
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center ">
                  <img src={emptyShoppingCartSvg} className="w-80 h-80" />
                  <span className="font-semibold">سبد خرید شما خالی است !</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-5 w-full flex-col justify-between bg-white border lg:w-[280px] shrink-0 h-48 p-5 rounded">
          <span>جمع کل سبد خرید</span>
          <div className="flex border-b text-sm py-2 items-center justify-between">
            <span>مجموع</span>
            <span>{`${useToPersianDigits(totalPrice)} تومان`}</span>
          </div>
          <button
            className="bg-orange-400 py-2 text-sm  text-white rounded "
            onClick={handlePaymentGatewayBtn}
          >
            تکمیل ثبت نام
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
