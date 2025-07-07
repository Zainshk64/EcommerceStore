import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Search, ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Contact", path: "/contact" },
    { link: "Sign Up", path: "/signup" },
  ];

const cartCount = useSelector((state) => state.cart.cartItems.length);
  const wishlistCount = useSelector((state) => state.wishlist.wishlist.length);
  // const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setShowIcon(false);
    }
  }, []);

  return (
    <nav className="  px-4 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-neutral-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Exclusive</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navLink.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="hover:border-b border-neutral-400 transition-all pb-1 text-sm font-medium"
            >
              {item.link}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products"
              className=" w-44 lg:w-full pl-10 pr-3 py-2 rounded-md border border-gray-400 placeholder-gray-500 focus:outline-none text-sm"
            />
          </div>
          <div className="hidden md:flex gap-2">
            {showIcon && (
              <>
                <div className="relative">
                  <Link to={'/wishlist'} >
                  <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                  </Link>
                </div>

                <div className="relative ml-4">
                  <Link to={'/cart'} >
                  <ShoppingCart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                  </Link>
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
          {navLink.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="border-b border-neutral-100 pb-3 mt-4 text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item.link}
            </Link>
          ))}

          {/* <div className="relative w-full mt-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-400 placeholder-gray-500 focus:outline-none text-sm"
            />
          </div> */}

          <div className="flex gap-6 mx-auto pt-2">
            <div className="relative">
                  <Link to={'wishlist'} >
                  <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                  </Link>
                </div>

                <div className="relative ml-4">
                  <Link to={'/cart'} >
                  <ShoppingCart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                  </Link>
                </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
