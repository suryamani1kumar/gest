"use client";

import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { store } from "./store";
import { checkAuth } from "./slices/authSlice";
import type { AppDispatch } from "./store";

import { syncCartAsync, fetchUserCart } from "./slices/cartSlice";
import { syncWishlistAsync, fetchUserWishlist } from "./slices/wishlistSlice";

function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth()).then((result) => {
      if (checkAuth.fulfilled.match(result)) {
        // Logged in
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            const items = JSON.parse(savedCart);
            if (Array.isArray(items) && items.length > 0) {
              dispatch(syncCartAsync(items)).then(() => {
                dispatch(fetchUserCart());
              });
            } else {
              dispatch(fetchUserCart());
            }
          } catch (e) {
            dispatch(fetchUserCart());
          }
        } else {
          dispatch(fetchUserCart());
        }

        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          try {
            const items = JSON.parse(savedWishlist);
            if (Array.isArray(items) && items.length > 0) {
              const productIds = items.map((i: any) => i.productId);
              dispatch(syncWishlistAsync(productIds)).then(() => {
                dispatch(fetchUserWishlist());
              });
            } else {
              dispatch(fetchUserWishlist());
            }
          } catch (e) {
            dispatch(fetchUserWishlist());
          }
        } else {
          dispatch(fetchUserWishlist());
        }
      } else {
        // Guest user, load from local storage
        dispatch(fetchUserCart());
        dispatch(fetchUserWishlist());
      }
    });
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}
