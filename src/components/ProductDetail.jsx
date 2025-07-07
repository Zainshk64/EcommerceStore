import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  addToCart,
} from "../features/cart/cartSlice"; // 👉 adjust the correct import path
import { toggleWishlist } from "../features/wishlist/wishlistSlice"; // 👉 adjust the correct import path
import { Heart, Minus, Plus, Star, Truck, RotateCcw } from "lucide-react";
import { productList } from "../data/data";
import DynamicBreadcrumbs from "./DynamicBread";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 🛒 Pull product info & cart qty from Redux
  const product = productList.find((p) => p.id === Number(id));
  console.log(product);

  const qty = useSelector(
    (state) =>
      state.cart.cartItems.find((i) => i.id === product.id)?.quantity || 1
  );
  const isFav = useSelector((state) =>
    state.wishlist.wishlist.some((i) => i.id === product.id)
  );

  const transforms = ["", "rotate-6", "-rotate-6", "skew-y-6"];
  const [activeIdx, setActiveIdx] = useState(0);

  if (!product) {
    return (
      <div className="py-20 text-center text-lg">
        Product not found.{" "}
        <Link className="underline" to="/">
          Go back
        </Link>
      </div>
    );
  }

  const handleAddCart = (product) => {
    // console.log(product);

    dispatch(addToCart(product));
  };

  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((i) => i.id === product.id)
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:py-16">
      {/* <DynamicBreadcrumbs/> */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* 🖼️ LEFT COLUMN – Images */}
        <div className="flex lg:flex-row flex-col ">
          {/* Thumbnails */}
          <div className="flex p-2  mb-4 rounded-md mr-3 justify-center gap-3 flex-row lg:flex-col lg:mb-0 ">
            {transforms.map((tf, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative sm:h-20 sm:w-20 overflow-hidden cursor-pointer rounded-lg border transition-transform duration-150 hover:scale-105 hover:-translate-x-3 trans focus:outline-none ${
                  activeIdx === idx ? "border-gray-300  " : "border-gray-200 bg-gray-100"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={`h-full w-full object-contain ${tf}`}
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative flex h-70 w-80 mx-auto items-center justify-center overflow-hidden rounded-md bg-gray-100 sm:h-96 lg:h-[480px] lg:w-full">
            <img
              src={product.image}
              alt={product.name}
              className={`object-contain w-[200px] lg:w-full  duration-300 ${transforms[activeIdx]}`}
            />
          </div>
        </div>

        {/* 📃 RIGHT COLUMN – Details */}
        <div className="md:w-full" >
          {/* Title & Reviews */}
          <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i + 0.5 < product.rating ? "fill-yellow-400" : ""
                }`}
              />
            ))}
            <span className="ml-1">({product.rating})</span>
            <span className="mx-2">|</span>
            <span className="text-green-600">In Stock</span>
          </div>

          {/* Price */}
          <p className="mt-4 text-2xl font-semibold tracking-tight">
            ${product.price.toFixed(2)}
            {product.oldPrice && (
              <span className="ml-3 text-base font-normal text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </p>

          {/* Description */}
          <p className="mt-4 max-w-sm text-gray-600">
            {product.desc ||
              "PlayStation 5 Controller skin ‑ high‑quality vinyl with air‑channel adhesive for easy bubble‑free install & mess‑free removal. Pressure sensitive."}
          </p>

          {/* Options – Colours & Size (static demo) */}
          <div className="mt-6  flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="min-w-[72px] font-medium">Colours:</span>
              <div className="flex gap-2">
                {["bg-indigo-500", "bg-red-500", "bg-gray-800"].map((clr) => (
                  <span
                    key={clr}
                    className={`h-4 w-4 rounded-full border-2 border-white shadow ring-1 ring-gray-300 ${clr}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="min-w-[48px] font-medium">Size:</span>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map((s, idx) => (
                  <button
                    key={s}
                    type="button"
                    className={`rounded border px-2 py-1 text-sm font-medium transition ${
                      idx === 2
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity, Wishlist & CTA */}
          <div className="mt-8 flex gap-2 sm:gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center overflow-hidden rounded border sm:mr-4">
              <button
                className="p-2 hover:bg-gray-50"
                onClick={() => {
                  if (cartItem) dispatch(decrementQty(product));
                }}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 text-sm font-medium">{qty}</span>
              <button
                className="p-2 hover:bg-gray-50"
                onClick={() => {
                  if (cartItem) dispatch(incrementQty(product));
                }}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={() => handleAddCart(product)}
              className="inline-flex cursor-pointer sm:flex-1 items-center justify-center gap-2 rounded bg-red-600 px-6 py-3 text-white transition-opacity hover:opacity-90"
            >
              Buy Now
            </button>

            <button
              className={`ml-2 rounded-full p-3 ring-1 cursor-pointer ring-gray-200 hover:bg-gray-50`}
              onClick={() => dispatch(toggleWishlist(product))}
              aria-label="Add to wishlist"
            >
              <Heart
                size={18}
                className={
                  isFav ? "text-red-500 fill-red-500" : "text-gray-600"
                }
                fill={isFav ? "red" : "none"}
              />
            </button>
          </div>

          {/* Logistics info */}
          <div className="mt-10 grid gap-4 w-full sm:grid-cols-2">
            <div className="flex w-77 sm:w-full items-start gap-3 rounded-md border p-4">
              <Truck size={20} className="shrink-0" />
              <div>
                <h3 className="font-medium">Free Delivery</h3>
                <p className="text-sm text-gray-500">
                  Enter your postal code for delivery availability
                </p>
              </div>
            </div>
            <div className="flex w-77 sm:w-full  items-start gap-3 rounded-md border p-4">
              <RotateCcw size={20} className="shrink-0" />
              <div>
                <h3 className="font-medium">Return Delivery</h3>
                <p className="text-sm text-gray-500">Free 30‑day returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
