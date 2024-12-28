import { useCoursesContext } from "../../context/CoursesContext";
import useToPersianDigits from "../../hooks/useToPersianDigits";
interface IPriceBadge {
  price: number;
  discount: number;
}
const PriceBadge = ({ price, discount }: IPriceBadge) => {
  const { calculateDiscountedPrice } = useCoursesContext();
  const finalPrice = calculateDiscountedPrice(price, discount);
  return (
    <>
      {price === 0 ? (
        <div className="flex bg-gray-200 h-9 font-semibold text-gray-600 text-sm p-1 px-3 rounded justify-end items-center">
          رایگان
        </div>
      ) : (
        <div className="flex h-9 bg-orange-100 p-1 px-2 rounded justify-between items-center">
          {discount === 0 ? (
            <span className="text-sm w-full text-end font-semibold">
              {useToPersianDigits(finalPrice)} تومان
            </span>
          ) : (
            <div className="flex w-full items-center">
              <span className="bg-orange-500 text-right text-sm text-white p-1 rounded-md">
                {`${useToPersianDigits(discount)}%`}
              </span>

              <div className="flex items-center font-semibold gap-5 grow justify-end">
                <span className="text-sm line-through ">{useToPersianDigits(price)}</span>
                <span className="text-sm ">{useToPersianDigits(finalPrice)} تومان</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PriceBadge;
