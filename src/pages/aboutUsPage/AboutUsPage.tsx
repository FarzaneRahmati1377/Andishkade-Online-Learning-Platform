import teamMeetingSvg from "../../assets/svg/team-meeting-1-33.svg";
import companySvg from "../../assets/svg/city-2-69.svg";
const AboutUsPage = () => {
  return (
    <div className=" bg-white">
      <div className="bg-blue-500">
        <h3 className="font-semibold text-white py-3 px-5"> ما کی هستیم ؟</h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between  p-5 ">
        <div className="flex flex-col gap-8  justify-center w-full p-5">
          <h3 className="text-lg font-semibold">آینده‌ی روشن با یادگیری امروز!</h3>
          <p>
            موسسه ما با ارائه دوره‌های آموزشی تخصصی، از مبتدی تا حرفه‌ای، همراه
            شماست تا با کسب مهارت‌های نوین، مسیر موفقیت‌تان را هموار کنید.
            یادگیری با کیفیت، پشتیبانی گام‌به‌گام و دسترسی به اساتید مجرب، همه
            در یک پلتفرم گرد هم آمده‌اند تا شما به اهدافتان نزدیک‌تر شوید!
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-5">
          <img  src={companySvg} className="w-[200px]"/>
            <p >
              موسسه ما فعالیت خود را از سال ۱۳۹۵ با هدف ارائه آموزش‌های کاربردی
              و تخصصی آغاز کرد. از ابتدا، ماموریت ما فراهم کردن بستری برای
              یادگیری مهارت‌های روز دنیا بود تا افراد در هر سطحی از دانش بتوانند
              مسیر شغلی خود را بهبود بخشند. با تمرکز بر حوزه‌هایی چون
              برنامه‌نویسی، طراحی وب، هوش مصنوعی، بازاریابی دیجیتال و مدیریت
              کسب‌وکار، دوره‌های آموزشی ما طیف گسترده‌ای از موضوعات را پوشش
              می‌دهند. در این سال‌ها، با کمک اساتید مجرب و متخصص، هزاران دانشجو
              از سراسر کشور توانسته‌اند به مهارت‌هایی دست یابند که در بازار کار
              امروز بسیار پرتقاضا هستند و در موفقیت‌شان نقش مؤثری داشته‌اند.
            </p>
            
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-start h-fit">
          <img src={teamMeetingSvg}  />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
