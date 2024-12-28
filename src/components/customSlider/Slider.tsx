import { Navigation, Pagination, Scrollbar, A11y,Autoplay} from "swiper/modules";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import backIcon from "../../assets/svg/chevron-left-circle-svgrepo-com.svg";
import nextIcon from "../../assets/svg/chevron-right-circle-svgrepo-com (2).svg";
import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

SwiperCore.use([Navigation, Pagination]);

interface CustomSwiperProps {
  children: React.ReactNode;
  slidesPerView?:number
  id: string;
  autoplay?: boolean;
  breakpoints?: { [key: number]: { slidesPerView: number } };
  spaceBetween?:number
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({ slidesPerView,spaceBetween,children,id,autoplay,breakpoints}) => {
  const swiperRef = useRef<any | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper && prevRef.current && nextRef.current) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="custom-slider-container relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation,Autoplay, Pagination, Scrollbar, A11y]}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : undefined
        }
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        slidesPerGroup={1}
        speed={1000}
        loop = {true}
        breakpoints={breakpoints}
        className="overflow-hidden  md:max-h-full "
        // pagination={
        //   { clickable: true 
        //   }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        navigation={{
          prevEl:`.custom-prev-${id}`,
          nextEl: `.custom-next-${id}`,
        }}
        onInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation!.prevEl =`.custom-prev-${id}`;
            swiper.params.navigation!.nextEl = `.custom-next-${id}`;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
       
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      <button ref={nextRef}  className={`custom-next-${id}`} style={{position:"absolute",zIndex:1,top:"40%",right:"25px",transform: 'translateY(-50%)' }} onClick={handleNext}>
        <img src={nextIcon} />
      </button>
      <button ref={prevRef}   className={`custom-prev-${id}`} style={{position:"absolute",zIndex:1,top:"40%",left:"25px",transform: 'translateY(-50%)' }} onClick={handlePrev}>
        <img src={backIcon} />
      </button>
      
    </div>
  );
};

export default CustomSwiper;
