import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Eye, Heart } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { productList } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Todays = () => {
  // 👇 Change this date to update the timer target
  const targetTime = new Date("2025-07-12T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleAddCart = (product) => {
    if (!token) {
      toast.error("Login First!");
    } else {
      dispatch(addToCart(product));
      toast.success(`${product.name} added in Cart`);
    }
  };
  const wishlist = useSelector((state) => state.wishlist.wishlist);
const handleWishlist = (product) => {
  if (!token) {
    toast.error("Login First!");
    return;
  }

  const exists = wishlist.some((item) => item.id === product.id);

  dispatch(toggleWishlist(product));

  if (exists) {
    toast(`${product.name} removed from Favourite`);
  } else {
    toast.success(`${product.name} added to Favourite`);
  }
};
  const bestProduct = productList.filter((item) => item.cat === "Sales");

  return (
    <div className="px-6 py-10 md:px-16 lg:px-24 xl:px-32">
      <div className="flex items-center gap-2">
        <div className="w-[10px] h-[20px] bg-red-600 rounded-sm"></div>
        <h2 className="text-red-600 font-medium text-sm">Today's</h2>
      </div>

      <div className="py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <h1 className="font-medium text-2xl">Flash Sales</h1>
          <div className="flex items-center gap-4 text-center">
            <div>
              <h2 className="text-xl font-bold">{timeLeft.days}</h2>
              <p className="text-xs text-gray-600">Days</p>
            </div>
            <span className="text-red-500 text-xl">:</span>

            <div>
              <h2 className="text-xl font-bold">{timeLeft.hours}</h2>
              <p className="text-xs text-gray-600">Hours</p>
            </div>
            <span className="text-red-500 text-xl">:</span>

            <div>
              <h2 className="text-xl font-bold">{timeLeft.minutes}</h2>
              <p className="text-xs text-gray-600">Minutes</p>
            </div>
            <span className="text-red-500 text-xl">:</span>

            <div>
              <h2 className="text-xl font-bold">{timeLeft.seconds}</h2>
              <p className="text-xs text-gray-600">Seconds</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 self-end md:self-auto">
          <div className="bg-gray-200 swiper-button-prev-custom1 cursor-pointer hover:bg-gray-300 transition-all rounded-full p-2">
            <ArrowLeft />
          </div>
          <div className="bg-gray-200 swiper-button-next-custom1 cursor-pointer hover:bg-gray-300 transition-all rounded-full p-2">
            <ArrowRight />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          prevEl: ".swiper-button-prev-custom1",
          nextEl: ".swiper-button-next-custom1",
        }}
        pagination={{ clickable: true }}
        className="!pb-12"
      >
        {bestProduct.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="rounded-xl transition  bg-white">
              <div className="relative group overflow-hidden bg-gray-100  w-full  h-60 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain max-h-32"
                />
                <div className="absolute top-2 right-2 flex-col flex gap-2">
                  <div className="p-2 bg-white rounded-full">
                    <Heart
                      onClick={() => handleWishlist(product)}
                      className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer"
                    />
                  </div>
                  <div className="p-2 bg-white rounded-full">
                    <Link to={`/product/${product.id}`}>
                      <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />
                    </Link>
                  </div>
                </div>
                {product.oldPrice && (
                  <span className="absolute top-2 left-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    -
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )}
                    %
                  </span>
                )}
                <div
                  onClick={() => handleAddCart(product)}
                  className="absolute bottom-0 p-2 translate-y-12 group-hover:translate-y-0 transition-all duration-300 cursor-pointer bg-black w-full text-center text-white"
                >
                  Add to cart
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-800">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-red-500 font-semibold">
                    ${product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
                <div className="text-yellow-400 text-sm mt-1">
                  ★★★★★ <span className="text-gray-500">(65)</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Todays;
