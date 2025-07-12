import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CancelOrder from "./UserCard/CancelOrder";

const tabs = [
  {
    category: "Manage My Account",
    options: ["My Profile", "Address Book", "My Payment Options"],
  },
  {
    category: "My Orders",
    options: ["My Returns", "My Cancellations"],
  },
  {
    category: "My Wishlist",
    options: [],
  },
];

const UserTabs = () => {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUserData({
        firstName: localUser.firstName || "",
        lastName: localUser.lastName || "",
        email: localUser.email || "",
        address: localUser.address || "",
      });
    }
  }, []);

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/auth/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const renderForm = () => {
    if (activeTab === "My Cancellations") {
      return <CancelOrder/>
    }


    if (activeTab === "My Profile") {
      return (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-xl font-semibold text-red-500 mb-4">
            Edit Your Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={userData.firstName}
              onChange={handleInput}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={userData.lastName}
              onChange={handleInput}
              className="p-2 border rounded w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              readOnly
              className="p-2 border rounded w-full bg-gray-100 cursor-not-allowed"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userData.address}
              onChange={handleInput}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="flex justify-end gap-4 pt-3">
            {/* <button
              type="button"
              className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      );
    }

    if (activeTab === "My Wishlist") {
      navigate("/myaccount/wishlist");
      return null;
    }

    return (
      <div className="text-gray-500">
        This section (<span className="font-medium">{activeTab}</span>) is
        under development.
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-10">
      {/* Left Tabs */}
      <div className="w-full md:w-1/4">
        <ul className="space-y-6">
          {tabs.map((group) => (
            <li key={group.category}>
              <h3 className="text-sm font-semibold text-black mb-2">
                {group.category}
              </h3>
              <ul className="space-y-1">
                {group.options.length ? (
                  group.options.map((opt) => (
                    <li
                      key={opt}
                      className={`cursor-pointer pl-2 border-l-2 ${
                        activeTab === opt
                          ? "text-red-500 border-red-500 font-semibold"
                          : "text-gray-500 border-transparent"
                      }`}
                      onClick={() => setActiveTab(opt)}
                    >
                      {opt}
                    </li>
                  ))
                ) : (
                  <li
                    className={`cursor-pointer pl-2 border-l-2 ${
                      activeTab === group.category
                        ? "text-red-500 border-red-500 font-semibold"
                        : "text-gray-500 border-transparent"
                    }`}
                    onClick={() => setActiveTab(group.category)}
                  >
                    {group.category}
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Panel */}
      <div className="w-full md:w-3/4 bg-white shadow-md p-6 rounded">
        {renderForm()}
      </div>
    </div>
  );
};

export default UserTabs;
