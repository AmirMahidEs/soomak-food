import { configureStore } from "@reduxjs/toolkit";

import cartReducer, { CART_STORAGE_KEY } from "../features/cart/cartSlice";
import authReducer, { logout } from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import profileReducer from "../features/profile/profileSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
    checkout: checkoutReducer,
    profile: profileReducer,
    admin: adminReducer,
  },
});

const AUTH_STORAGE_KEY = "auth";

const persistAuth = (auth) => {
  try {
    if (auth?.isAuthenticated && auth.token) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: auth.user,
          token: auth.token,
          refreshToken: auth.refreshToken,
          tokenExpiresAt: auth.tokenExpiresAt,
          refreshTokenExpiresAt: auth.refreshTokenExpiresAt,
        }),
      );
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // Ignore storage failures
  }
};

if (typeof window !== "undefined") {
  persistAuth(store.getState().auth);

  store.subscribe(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(store.getState().cart.items),
      );
    } catch {
      // Ignore storage failures
    }

    persistAuth(store.getState().auth);
  });
}
