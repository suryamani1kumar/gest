import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishListItem {
  productId: string;
}

interface WishListState {
  items: WishListItem[];
}

const initialState: WishListState = {
  items: [],
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishList: (state, action: PayloadAction<WishListItem>) => {
      const exists = state.items.some(
        (item) => item.productId === action.payload.productId
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromWishList: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    clearWishList: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWishList,
  removeFromWishList,
  clearWishList,
} = wishListSlice.actions;

export default wishListSlice.reducer;