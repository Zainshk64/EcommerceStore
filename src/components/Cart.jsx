import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../features/cart/cartSlice";
import { X } from "lucide-react";
import DynamicBreadcrumbs from "./DynamicBread";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      <DynamicBreadcrumbs />
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-5 font-semibold border-b py-3">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
        <span>Remove</span>
      </div>
      <div>{cartItems.length === 0 && <div className="text-center my-5" >Your Cart Is Empty</div>}</div>

      {/* Items */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-2 md:grid-cols-5 items-center gap-4 border-b py-4 text-sm"
        >
          <div className="flex items-center gap-3">
            <img src={item.image} alt={item.name} className="w-14 h-14" />
            <span>{item.name}</span>
          </div>
          <span>${item.price}</span>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decrementQty(item.id))}
              className="border px-2"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => dispatch(incrementQty(item))}
              className="border px-2"
            >
              +
            </button>
          </div>

          <span>${item.price * item.quantity}</span>

          <span className="text-red-500 hover:text-red-700">
            <X
              onClick={() => dispatch(removeFromCart(item.id))}
              className="w-5 cursor-pointer  h-5"
            />
          </span>
        </div>
      ))}

      {/* Bottom Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <Link to={"/shop"}>
          <button className="border cursor-pointer px-6 py-2 hover:bg-gray-100">
            View Shop
          </button>
        </Link>
        <button className="border cursor-pointer px-6 py-2 hover:bg-gray-100">
          Update Cart
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between my-10 gap-8">
        <div className="gap-4 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border px-4 py-2 flex-1"
          />
          <button className="bg-red-500 text-white px-6 py-2 hover:bg-red-600">
            Apply Coupon
          </button>
        </div>

        <div className="border p-4 w-full md:w-1/3 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
          <div className="flex justify-between border-b py-2">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold py-2">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button
            className={`w-full mt-4  text-white py-2  ${
              cartItems.length === 0
                ? "bg-gray-300 cursor-not-allowed hover:bg-gray-200"
                : "bg-red-500 cursor-pointer hover:bg-red-600 "
            } `}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
