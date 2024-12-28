import DeepContainer from "../../components/container/DeepContainer";
import NotFoundSvg from "../../assets/svg/not-found-404.svg"
const NotFoundPage = () => {
  return (
    <>
      <div className="bg-blue-500 h-8"></div>
      <DeepContainer>
        <div className=" flex flex-col justify-center items-center">
          <img src={NotFoundSvg} className="w-60 h-60"/>
          <span>صفحه مورد نظر یافت نشد !</span>
        </div>
      </DeepContainer>
    </>
  );
};

export default NotFoundPage;
