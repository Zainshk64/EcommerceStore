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

      {/* Responsive Table */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="font-semibold border-b bg-gray-50">
            <tr className="text-left text-gray-700">
              <th className="py-3 px-4 whitespace-nowrap">Product</th>
              <th className="py-3 px-4 whitespace-nowrap">Name</th>
              <th className="py-3 px-4 whitespace-nowrap">Price</th>
              <th className="py-3 px-4 whitespace-nowrap">Quantity</th>
              <th className="py-3 px-4 whitespace-nowrap">Subtotal</th>
              <th className="py-3 px-4 whitespace-nowrap">Remove</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  Your Cart Is Empty
                </td>
              </tr>
            )}

            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain"
                  />
                </td>
                <td className="py-3 px-4 whitespace-nowrap">{item.name}</td>
                <td className="py-3 px-4">${item.price}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decrementQty(item))}
                      className="border px-2 py-1 text-sm"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQty(item))}
                      className="border px-2 py-1 text-sm"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">${item.price * item.quantity}</td>
                <td className="py-3 px-4 text-red-500 hover:text-red-700">
                  <X
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="w-5 h-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <Link to="/shop">
          <button className="border cursor-pointer px-6 py-2 hover:bg-gray-100">
            View Shop
          </button>
        </Link>
        <button className="border cursor-pointer px-6 py-2 hover:bg-gray-100">
          Update Cart
        </button>
      </div>

      {/* Coupon & Summary */}
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
            className={`w-full mt-4 text-white py-2 rounded ${
              {
                true: "bg-red-500 hover:bg-red-600",
                false: "bg-gray-300 cursor-not-allowed hover:bg-gray-200",
              }[cartItems.length > 0]
            }`}
            disabled={cartItems.length === 0}
          >
            <Link to={"/cart/checkout"}
             >Proceed to checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
