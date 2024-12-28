import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import CopyrightIcon from '@mui/icons-material/Copyright';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
const Footer = () => {
  return (
    <div className="flex flex-col h-[350px] text-sm  text-gray-50">
      <div className=" flex bg-black bg-opacity-80  items-end grow py-8 px-14">
        <div className="flex flex-col gap-20 lg:flex-row w-full  justify-between">
          <div className=" flex flex-col gap-5">
            <h3>درباره اندیشکده</h3>

            <p className="md:w-96">
              کامل ترین و تخصصی ترین دوره های آموزشی را در اندیشکده برای شما مهیا
              کرده ایم به امید اینکه هرچه زودتر به رویای خود برسید.
            </p>
            <div className="flex gap-1">
              <LocationOnOutlinedIcon className="text-white" />
              <span>مشهد، میدان فلسطین ، خیابان بیستم ، پلاک 100</span>
            </div>
            <div className="flex gap-2">
              <EmailOutlinedIcon className="text-white" />
              <span>farzanerahmati.1377@gmail.com</span>
            </div>
            <div className="flex gap-2">
              <PhoneEnabledIcon fontSize="small" className="text-white" />
              <span>09338239177</span>
            </div>
          </div>
          <div className=" flex flex-col gap-5">
            <h3>فهرست سفارشی</h3>
            <div className="flex gap-10">
              <div className="flex flex-col gap-3">
                <Link to={"/blogs"} className="">
                  <span className="hover:border-b">بلاگ</span>
                </Link>
                <Link to={"/about-us"}>
                  <span className="hover:border-b">درباره ما</span>
                </Link>
              
                <Link to={"/shopping-cart"}>
                  <span className="hover:border-b">سبد خرید</span>
                </Link>
              </div>
              <div className="flex flex-col gap-3">
              <Link to={"/courses"}>
                  <span className="hover:border-b">دور های آموزشی</span>
                </Link>
                <Link to={"/my-account"}>
                  <span className="hover:border-b">حساب کاربری من</span>
                </Link>
                
               
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <span>ما را در شبکه های اجتماعی دنبال کنید !</span>
            <div className="flex text-gray-50 justify-start lg:justify-center  px-5 py-3 rounded-md w-full items-center gap-8">
              <Link to={"#"}>
                <YouTubeIcon />
              </Link>
              <Link to={"#"}>
                <TelegramIcon />
              </Link>
              <Link to={"#"}>
                <InstagramIcon />
              </Link>
              <Link to={"#"}>
                <FacebookIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-16 gap-2 text-sm bg-black bg-opacity-90 justify-start pr-5 flex items-center md:justify-center">
        <span className="text-white shrink-0 "> تمامی حقوق برای اندیشکده محفوظ است</span>
        <div className="flex items-center gap-1"><CopyrightIcon fontSize="small" /> <span className="text-sm">1403</span></div>
      </div>
    </div>
  );
};

export default Footer;
