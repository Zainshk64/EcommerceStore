import React from 'react'
import DynamicBreadcrumbs from '../DynamicBread'
import { productList } from '../../data/data'
import { Eye, Heart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { toggleWishlist } from '../../features/wishlist/wishlistSlice'

const ShopContent = () => {
      const dispatch = useDispatch();
    
      const handleAddCart = (product) => {
        dispatch(addToCart(product));
      };
      const handleWishlist = (product) => {
        dispatch(toggleWishlist(product));
      };
  return (
    <div className='px-4 md:px-16 lg:px-24 xl:px-32' >
        <DynamicBreadcrumbs/>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10' >
                {productList.map((product) => (
                      <div key={product.id}>
                        <div className="rounded-xl transition  bg-white">
                          <div className="relative group overflow-hidden bg-gray-100  w-full  h-60 flex items-center justify-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-contain max-h-32"
                            />
                            <div className="absolute top-2 right-2 flex-col flex gap-2">
                              <div className="p-2 bg-white rounded-full">
                                <Heart
                                  onClick={() => handleWishlist(product)}
                                  className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer"
                                />
                              </div>
                              <div className="p-2 bg-white rounded-full">
                                <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500 cursor-pointer" />

                              </div>
                            </div>
                            <div
                              onClick={() => handleAddCart(product)}
                              className="absolute bottom-0 p-2 translate-y-12 group-hover:translate-y-0 transition-all duration-300 cursor-pointer bg-black w-full text-center text-white"
                            >
                              Add to cart
                            </div>
                          </div>
            
                          <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-800">
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-red-500 font-semibold">
                                ${product.price}
                              </span>
                              {product.oldPrice && (
                                <span className="text-gray-400 line-through text-sm">
                                  ${product.oldPrice}
                                </span>
                              )}
                            </div>
                            <div className="text-yellow-400 text-sm mt-1">
                              ★★★★★ <span className="text-gray-500">(65)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
        </div>
        
        
    </div>
  )
}

export default ShopContent