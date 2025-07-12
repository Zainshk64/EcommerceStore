import React, { useEffect, useState } from "react";
import DynamicBreadcrumbs from "../DynamicBread";
import toast from "react-hot-toast";

const CancelOrder = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCancelledOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/orders/cancelled", {
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
      toast.error("Failed to fetch cancelled orders");
    }
  };

  useEffect(() => {
    fetchCancelledOrders();
  }, []);

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="py-10">
        <h2 className="text-xl mt-5 font-semibold mb-6">Cancelled Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No cancelled orders found.</p>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-md p-5 shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold text-red-500">Order ID:</p>
                    <p>{order._id}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                      Cancelled
                    </span>
                  </div>
                </div>

                 <div className="grid my-3 sm:grid-cols-2 gap-4">
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

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Total: </span>${order.totalAmount}
                  </p>
                  <p>
                    <span className="font-medium">Payment: </span>
                    {order.paymentMethod.toUpperCase()}
                  </p>
                  <p>
                    <span className="font-medium">Cancelled At: </span>
                    {new Date(order.cancelledAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelOrder;
