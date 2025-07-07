// Banner.jsx
import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import bannerimg from '../assets/banner.jpg'
import applelogo from '../assets/applelogo.png'

const Banner = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const categories = [
    { name: "Woman’s Fashion", sub: ["Dresses", "Hijab", "Shoes"] },
    { name: "Men’s Fashion", sub: ["Shirts", "Jeans", "Shoes"] },
    { name: "Electronics" },
    { name: "Home & Lifestyle" },
    { name: "Medicine" },
    { name: "Sports & Outdoor" },
    { name: "Baby’s & Toys" },
    { name: "Groceries & Pets" },
    { name: "Health & Beauty" },
  ];

  return (
    <div className="w-full  px-4 md:px-16 lg:px-24 xl:px-28 flex flex-col-reverse md:flex-row">
      <aside className="w-full md:w-1/4 sm:pb-6  border-r">
        <ul className="bg-white p-3">
          {categories.map((cat, idx) => (
            <li key={idx} className="group">
              <div
                className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-100 rounded"
                onClick={() => cat.sub && toggleDropdown(cat.name)}
              >
                <span  >{cat.name}</span>
                {cat.sub && (
                  openDropdown === cat.name ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )
                )}
              </div>
              {/* Dropdown */}
              {cat.sub && openDropdown === cat.name && (
                <ul className="pl-4 mt-1 space-y-1">
                  {cat.sub.map((item, subIdx) => (
                    <li key={subIdx} className="text-sm text-gray-600 cursor-pointer p-2 hover:bg-gray-100 rounded">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="w-full sm:p-10  md:w-3/4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          <SwiperSlide>
            <div className="bg-black text-white p-6 md:p-12 flex  md:flex-row items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <img src={applelogo} alt="apple" className="w-5 h-5" />
                  <span className="text-sm">iPhone 14 Series</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Up to 10%<br />off Voucher</h2>
                <button className="mt-4 px-5 py-2 bg-white text-black font-semibold text-sm rounded hover:bg-gray-200 transition">
                  Shop Now →
                </button>
              </div>
              <img
                src={bannerimg}
                alt="iPhone"
                className="w-40 md:w-72 mt-6 md:mt-0 object-contain"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-black text-white p-6 md:p-12 flex  md:flex-row items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <img src={applelogo} alt="apple" className="w-5 h-5" />
                  <span className="text-sm">iPhone 14 Series</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Up to 10%<br />off Voucher</h2>
                <button className="mt-4 px-5 py-2 bg-white text-black font-semibold text-sm rounded hover:bg-gray-200 transition">
                  Shop Now →
                </button>
              </div>
              <img
                src={bannerimg}
                alt="iPhone"
                className="w-40 md:w-72 mt-6 md:mt-0 object-contain"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </main>
    </div>
  );
};

export default Banner;
