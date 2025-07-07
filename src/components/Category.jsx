import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Computer,
  Gamepad2Icon,
  Headphones,
  Phone,
  Watch,
} from "lucide-react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Category = () => {
  const category = [
    { icon: <Phone />, name: "Phones" },
    { icon: <Computer />, name: "Computer" },
    { icon: <Watch />, name: "Smart Watches" },
    { icon: <Camera />, name: "Camera" },
    { icon: <Headphones />, name: "HeadPhones" },
    { icon: <Gamepad2Icon />, name: "Gaming" },
  ];
  return (
    <div className="px-6 py-10 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center gap-2">
        <div className="w-[10px] h-[20px] bg-red-600 rounded-sm"></div>
        <h2 className="text-red-600 font-medium text-sm">Category</h2>
      </div>

      <div className="py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <h1 className="font-medium text-2xl">Browse By Category</h1>
        <div className="flex gap-4 self-end md:self-auto">
          <div className="bg-gray-200 swiper-button-prev-custom cursor-pointer hover:bg-gray-300 transition-all rounded-full p-2">
            <ArrowLeft />
          </div>
          <div className="bg-gray-200 swiper-button-next-custom cursor-pointer hover:bg-gray-300 transition-all rounded-full p-2">
            <ArrowRight />
          </div>
        </div>
      </div>

      {/* <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-6 gap-5"> */}
        <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{ clickable: true }}
        className="!pb-12"
      >

        {category.map((item, index) => (
          <SwiperSlide key={item.id}>


          <div
            key={index}
            className="px-5 hover:bg-red-600 hover:text-white hover:-translate-y-3 trans py-6 border border-neutral-400 "
          >
            <div className="flex flex-col  items-center justify-center">
              <p className="mb-2">{item.icon}</p>
              <p>{item.name}</p>
            </div>
          </div>
          </SwiperSlide>

        ))}
      </Swiper>

      {/* </div> */}
    </div>
  );
};

export default Category;
