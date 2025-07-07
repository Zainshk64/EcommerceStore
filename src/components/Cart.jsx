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
      <div className="overflow-auto md:overflow-visible">
        <table className="w-full text-sm">
          <thead className="hidden md:table-header-group font-semibold border-b">
            <tr className="text-left">
              <th className="py-3">Product</th>
              <th className="py-3">Price</th>
              <th className="py-3">Name</th>
              <th className="py-3">Quantity</th>
              <th className="py-3">Subtotal</th>
              <th className="py-3">Remove</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  Your Cart Is Empty
                </td>
              </tr>
            )}

            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="block md:table-row border-b md:border-0 py-4 md:py-0"
              >
                <td className="flex items-center gap-3 py-3 md:table-cell">
                  <img src={item.image} alt={item.name} className="w-14 h-14" />
                </td>
                <td>

                  <span>{item.name}</span>
                </td>

                <td className="py-3 md:table-cell">${item.price}</td>

                <td className="py-3 md:table-cell">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decrementQty(item))}
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
                </td>

                <td className="py-3 md:table-cell">
                  ${item.price * item.quantity}
                </td>

                <td className="py-3 md:table-cell text-red-500 hover:text-red-700">
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
        <div className="gap-4 w-full md:w-1/2 flex flex-col sm:flex-row">
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
            className={`w-full mt-4 text-white py-2 rounded ${{
              true: "bg-red-500 hover:bg-red-600",
              false: "bg-gray-300 cursor-not-allowed hover:bg-gray-200",
            }[cartItems.length > 0]}`}
            disabled={cartItems.length === 0}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
