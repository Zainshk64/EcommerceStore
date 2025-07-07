// src/features/wishlist/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const item = action.payload;
      const exists = state.wishlist.find((i) => i.id === item.id);
      if (exists) {
        state.wishlist = state.wishlist.filter((i) => i.id !== item.id);
      } else {
        state.wishlist.push(item);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
