import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../store";
import { checkAuth } from "./authSlice";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) {
      // Return local storage cart
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }

    try {
      const res = await fetch("/api/cart/user");
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to fetch");
      return data.data.map((item: any) => ({
        productId: item.product._id || item.product,
        quantity: item.quantity,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const syncCartAsync = createAsyncThunk(
  "cart/syncCart",
  async (items: CartItem[], { rejectWithValue }) => {
    try {
      const res = await fetch("/api/cart/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      // Clear localStorage once synced successfully
      localStorage.removeItem("cart");

      return data.cart.items.map((item: any) => ({
        productId: item.product._id || item.product,
        quantity: item.quantity,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (item: CartItem, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) {
      dispatch(cartSlice.actions.addToCart(item));
      return null;
    }

    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      return data.cart.items.map((i: any) => ({
        productId: i.product._id || i.product,
        quantity: i.quantity,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (productId: string, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) {
      dispatch(cartSlice.actions.removeFromCart(productId));
      return null;
    }

    try {
      const res = await fetch(`/api/cart?productId=${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      return data.cart.items.map((i: any) => ({
        productId: i.product._id || i.product,
        quantity: i.quantity,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantityAsync",
  async (
    payload: { productId: string; quantity: number },
    { getState, dispatch, rejectWithValue },
  ) => {
    const state = getState() as RootState;
    if (!state.auth.isAuthenticated) {
      dispatch(cartSlice.actions.updateQuantity(payload));
      return null;
    }

    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      return data.cart.items.map((i: any) => ({
        productId: i.product._id || i.product,
        quantity: i.quantity,
      }));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.productId !== action.payload.productId,
        );
      } else {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },

    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(syncCartAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload;
        }
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload;
        }
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload;
        }
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        // Handled in a thunk or effect rather than here directly to allow dispatching sync.
        // Wait, reducers cannot dispatch actions. It's better to dispatch `syncCartAsync`
        // from the component that calls `checkAuth` or from a middleware.
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
