import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  profileImage?: string;
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

// Check authentication
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
  },
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Logout failed");
      }

      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Optional: useful if you need to clear auth manually
    logoutUser: (state) => {
      state.customer = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // Check auth
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
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.customer = null;
        state.isAuthenticated = false;
      })

      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
