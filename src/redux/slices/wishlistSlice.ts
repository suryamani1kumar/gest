import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface WishListItem {
  productId: string;
}

interface WishListState {
  items: WishListItem[];
}

const initialState: WishListState = {
  items: [],
};

export const fetchUserWishlist = createAsyncThunk(
  "wishlist/fetchUserWishlist",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    }

    try {
      const res = await fetch("/api/wishlist/user");
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      return data.data.map((item: any) => ({
        productId: item._id || item,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const syncWishlistAsync = createAsyncThunk(
  "wishlist/syncWishlist",
  async (productIds: string[], { rejectWithValue }) => {
    try {
      const res = await fetch("/api/wishlist/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: productIds }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      localStorage.removeItem("wishlist");

      return data.wishlist.products.map((id: any) => ({
        productId: id,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlistAsync",
  async (item: WishListItem, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) {
      dispatch(wishListSlice.actions.addToWishList(item));
      return null;
    }

    try {
      const res = await fetch("/api/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: item.productId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      // We can just return the added item if success
      return item;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/removeFromWishlistAsync",
  async (productId: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) {
      dispatch(wishListSlice.actions.removeFromWishList(productId));
      return null;
    }

    try {
      const res = await fetch("/api/wishlist/add", {
        // same endpoint toggles it
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      return productId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishList: (state, action: PayloadAction<WishListItem>) => {
      const exists = state.items.some(
        (item) => item.productId === action.payload.productId,
      );

      if (!exists) {
        state.items.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    removeFromWishList: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    clearWishList: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },

    setWishlist: (state, action: PayloadAction<WishListItem[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(syncWishlistAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const exists = state.items.some(
            (item) => item.productId === action.payload!.productId,
          );
          if (!exists) {
            state.items.push(action.payload);
          }
        }
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.productId !== action.payload,
          );
        }
      });
  },
});

export const { addToWishList, removeFromWishList, clearWishList, setWishlist } =
  wishListSlice.actions;

export default wishListSlice.reducer;
