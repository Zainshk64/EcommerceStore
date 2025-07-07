import React from 'react'
import {BrowserRouter ,Routes ,Route}  from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './components/Login'
import LoginPage from './pages/LoginPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DynamicBreadcrumbs from './components/DynamicBread'
import NotFound from './pages/NotFound'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import ProductDetail from './components/ProductDetail'
import ItemDetail from './pages/ItemDetail'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/shop' element={<Shop/>} ></Route>
      <Route path='/about' element={<AboutPage/>} ></Route>
      <Route path='/contact' element={<ContactPage/>} ></Route>


      <Route path='/signup' element={<LoginPage/>} ></Route>
      <Route path='/cart' element={<CartPage/>} ></Route>
      <Route path='/wishlist' element={<WishlistPage/>} ></Route>
      <Route path='/product/:id' element={<ItemDetail/>} ></Route>



      <Route path='/*' element={<NotFound/>} ></Route>

      



    </Routes>
    </BrowserRouter>
    </>

  )
}

export default App