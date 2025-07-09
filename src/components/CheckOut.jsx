import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicBreadcrumbs from "./DynamicBread";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const items = cartItems.map((item) => ({
    productId: item.id.toString(), // 🔥 ensure it's a string
    quantity: item.quantity,
    size: item.size || "M", // default if size not selected
  }));

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
    paymentMethod: "cod",
    coupon: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const token = localStorage.getItem("token");

  const handleOrder = async (e) => {
    e.preventDefault();

    const payload = {
      items: items,
      shippingDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        streetAddress: formData.streetAddress,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
      },
      paymentMethod: formData.paymentMethod,
    };
    if (!token) {
      toast.error("Please log in first to place your order.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Order placed successfully");
        dispatch(clearCart());         
        navigate("/");
      } else {
        toast.error(data.message || "Failed to place order");
        console.log(data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-10">
      <DynamicBreadcrumbs />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Billing Form */}
        <form onSubmit={handleOrder} className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            required
            className="w-full border p-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name*"
            className="w-full border p-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="w-full border p-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address*"
            required
            className="w-full border p-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, floor, etc. (optional)"
            className="w-full border p-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Town/City*"
            required
            className="w-full border p-2"
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number*"
            required
            className="w-full border p-2"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            required
            className="w-full border p-2"
            onChange={handleInputChange}
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-sm text-gray-600">
              Save this information for faster check-out next time
            </span>
          </label>
        </form>

        {/* Cart Summary */}
        <div className="bg-white p-6 shadow-md rounded-md">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain"
                />
                <span>{item.name}</span>
              </div>
              <span>${item.price}</span>
            </div>
          ))}

          <div className="border-t pt-4 text-sm">
            <div className="flex justify-between py-1">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg py-2">
              <span>Total:</span>
              <span>${subtotal}</span>
            </div>

            <div className="space-y-2 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  onChange={handleInputChange}
                />
                <span>Bank</span>
                <img
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  className="w-8"
                  alt="visa"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                  className="w-8"
                  alt="master"
                />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  defaultChecked
                  onChange={handleInputChange}
                />
                <span>Cash on delivery</span>
              </label>
            </div>

            <div className="flex mt-4 gap-2">
              <input
                type="text"
                placeholder="Coupon Code"
                className="w-full border px-3 py-2"
                name="coupon"
                value={formData.coupon}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="bg-red-500 text-white px-4 rounded"
              >
                Apply Coupon
              </button>
            </div>

            <button
              type="submit"
              onClick={handleOrder}
              className="w-full mt-4 bg-red-500 cursor-pointer active:scale-105 text-white py-2 rounded hover:bg-red-600"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
