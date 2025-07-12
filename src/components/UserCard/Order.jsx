import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DynamicBreadcrumbs from "../DynamicBread";
import { X } from "lucide-react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders/active", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const userOrders = data.orders.filter(
        (order) => order.user === user.id
      );
      setOrders(userOrders);
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };
  // Cancel order
  const handleCancel = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/payment/cancel/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Order cancelled");
        fetchOrders();
      } else {
        toast.error(data.message || "Unable to cancel");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="py-10 ">
        <DynamicBreadcrumbs />
        <h2 className="text-2xl mt-10 font-semibold mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg shadow-sm p-5 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      Order ID: <span className="text-gray-600">{order._id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: <span className="capitalize">{order.status}</span>
                    </p>
                  </div>
                  {order.status === "processing" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between border rounded p-3"
                    >
                      <div>
                        <p className="font-semibold text-sm">
                          {item.name} {item.size ? `(Size: ${item.size})` : ""}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm text-gray-700">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Shipping to:</span>{" "}
                    {order.shippingDetails.firstName} {order.shippingDetails.lastName}, {" "}
                    {order.shippingDetails.streetAddress}, {order.shippingDetails.city}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {order.shippingDetails.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {order.shippingDetails.email}
                  </p>
                </div>

                <div className="flex justify-between text-sm font-semibold border-t pt-3">
                  <p>Total:</p>
                  <p>${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
