import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Heart,
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  ListOrdered,
  Ban,
  Star,
} from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const navLink = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Contact", path: "/contact" },
    { link: "Sign Up", path: "/signup" },
  ];
  const userLinks = [
    { link: "Manage My Account", path: "/myaccount" },
    { link: "My Orders", path: "/" },
    { link: "My Cancellations", path: "/" },
    { link: "My Reviews", path: "/" },
  ];

  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const wishlistCount = useSelector((state) => state.wishlist.wishlist.length);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  // const User = JSON.parse(localStorage.getItem("user"));
  // console.log(User.firstName);

  // const UserData = JSON.parse(localStorage.getItem("user"));
  // console.log(UserData.firstName);

  return (
    <nav className="px-4 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-neutral-300 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Exclusive</h1>

        <div className="hidden md:flex space-x-6">
          {navLink.map(
            (item, index) =>
              (!token || item.path !== "/signup") && (
                <Link
                  to={item.path}
                  key={index}
                  className="hover:border-b border-neutral-400 transition-all pb-1 text-sm font-medium"
                >
                  {item.link}
                </Link>
              )
          )}
        </div>

        <div className="flex items-center gap-5">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products"
              className="w-44 lg:w-full pl-10 pr-3 py-2 rounded-md border border-gray-400 placeholder-gray-500 focus:outline-none text-sm"
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {token && (
              <>
                <div className="relative">
                  <Link to="/wishlist">
                    <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </span>
                  </Link>
                </div>

                <div className="relative ml-4">
                  <Link to="/cart">
                    <ShoppingCart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  </Link>
                </div>

                <div className="block md:flex relative ml-4" ref={dropdownRef}>
                  <User
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 top-10 backdrop-blur-3xl bg-gradient-to-l from-gray-200 to-gray-300 border shadow-lg rounded w-48 z-50 text-sm">
                      <ul className="py-2">
                        <Link
                          to={"/myaccount"}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          <User size={16} /> Manage My Account
                        </Link>
                        <Link
                          to={"/orders"}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          <ListOrdered size={16} /> Orders
                        </Link>
                      
                         <Link
                          to={"/cancelorders"}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          <Ban size={16} /> My Cancellations
                        </Link>
                        
                        
                        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <Star size={16} /> My Reviews
                        </li>
                        <li
                          className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleLogout()}
                        >
                          <LogOut size={16} /> Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden">
          {menuOpen ? (
            <X
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 text-center flex flex-col space-y-4">
          {navLink.map(
            (item, index) =>
              (!token || item.path !== "/signup") && (
                <Link
                  to={item.path}
                  key={index}
                  className="border-b border-neutral-100 pb-3 mt-4 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.link}
                </Link>
              )
          )}

          <div className="flex gap-6 mx-auto pt-2">
            {token && (
              <>
                <div className="relative">
                  <Link to="/wishlist">
                    <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </span>
                  </Link>
                </div>

                <div className="relative ml-4">
                  <Link to="/cart">
                    <ShoppingCart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  </Link>
                </div>

                <div className="relative ml-4" ref={dropdownRef}>
                  <div>
                    <User
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-8 bg-white border shadow-lg rounded w-48 z-50 text-sm">
                      <ul className="py-2">
                        <Link
                          to={"/myaccount"}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          <User size={16} /> Manage My Account
                        </Link>
                        <Link
                          to={"/orders"}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          <ListOrdered size={16} /> Orders
                        </Link>
                        <Link
                          to={"/cancelorders"}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          <Ban size={16} /> My Cancellations
                        </Link>
                        <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                          <Star size={16} /> My Reviews
                        </li>
                        <li
                          className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <LogOut size={16} /> Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
