import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ItemDetail from "./pages/ItemDetail";
import { Toaster } from "react-hot-toast";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import CancelPage from "./pages/CancelPage";

// 🔁 ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/myaccount" element={<AccountPage/>} />
        <Route path="/product/:id" element={<ItemDetail />} />
        <Route path="/cart/checkout" element={<CheckoutPage/>} />
        <Route path="/myaccount/wishlist" element={<WishlistPage />} />


        <Route path="/orders" element={<OrderPage />} />
        <Route path="/cancelorders" element={<CancelPage />} />




        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
    <Toaster />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
