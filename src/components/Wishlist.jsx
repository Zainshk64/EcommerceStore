import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Trash2, ShoppingCart } from "lucide-react";
import DynamicBreadcrumbs from "./DynamicBread";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(toggleWishlist(product)); // remove from wishlist
  };

  const handleMoveAllToBag = () => {
    wishlist.forEach((item) => {
      dispatch(addToCart(item));
      dispatch(toggleWishlist(item));
    });
  };

  return (
    <section className=" px-4 md:px-16 lg:px-24 xl:px-32 py-10">
      <DynamicBreadcrumbs/>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Wishlist ({wishlist.length})</h2>
        {wishlist.length > 0 && (
          <button
            onClick={handleMoveAllToBag}
            className="border cursor-pointer border-black px-4 py-2 hover:bg-black hover:text-white transition text-sm"
          >
            Move All To Bag
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="relative border rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="bg-gray-100 h-48 flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-contain max-h-36"
                />
              </div>

              <div className="absolute top-2 right-2">
                <button
                  onClick={() => dispatch(toggleWishlist(item))}
                  className="bg-white p-1.5 rounded-full hover:bg-red-100 transition"
                >
                  <Trash2 className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-600" />
                </button>
              </div>

              {/* Discount Badge (Optional) */}
              {item.oldPrice && (
                <span className="absolute top-2 left-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                  -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                </span>
              )}

              <div className="p-4 text-sm">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-semibold">
                    ${item.price}
                  </span>
                  {item.oldPrice && (
                    <span className="line-through text-gray-400 text-xs">
                      ${item.oldPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 flex cur-p items-center justify-center gap-2 w-full bg-black text-white py-2 text-sm hover:bg-gray-800 transition"
                >
                  <ShoppingCart size={16} />
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
