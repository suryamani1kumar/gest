"use client";

import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { store } from "./store";
import { checkAuth } from "./slices/authSlice";
import type { AppDispatch } from "./store";

function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
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
