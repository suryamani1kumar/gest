import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  profileImage?: string;
  emailVerified?: boolean;
}

interface AuthState {
  customer: Customer | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  customer: null,
  isAuthenticated: false,
  loading: true,
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.authenticated) {
        return rejectWithValue("Not authenticated");
      }

      return data.customer;
    } catch (error) {
      return rejectWithValue("Authentication failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logoutUser: (state) => {
      state.customer = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.customer = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;