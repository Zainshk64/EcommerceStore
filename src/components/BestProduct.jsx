import React from "react";
import { ArrowLeft, ArrowRight, Eye, Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { productList } from "../data/data";

const BestProduct = () => {
  const dispatch = useDispatch();

  const handleAddCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleWishlist = (product) => {
    dispatch(toggleWishlist(product));
  };

  const bestProduct = productList.filter((item) => item.cat === "Best");

  return (
    <section className="w-full px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-[10px] h-[20px] bg-red-600 rounded-sm"></div>
        <h2 className="text-red-600 font-medium text-sm">Featured</h2>
      </div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Best Selling Products
        </h2>
        <div className="flex gap-4 self-end md:self-auto">
          <div className="bg-gray-200 swiper-button-prev-custom0 cursor-pointer hover:bg-gray-300 transition-all rounded-full p-2">
            <ArrowLeft />
          </div>
          <div className="bg-gray-200 swiper-button-next-custom0 cursor-pointer hover:bg-gray-300 transition-all rounded-full p-2">
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
          prevEl: ".swiper-button-prev-custom0",
          nextEl: ".swiper-button-next-custom0",
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
                    <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />
                  </div>
                </div>
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
      {/* </div> */}
    </section>
  );
};

export default BestProduct;
