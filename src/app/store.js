import { configureStore } from "@reduxjs/toolkit";

import cartReducer, { CART_STORAGE_KEY } from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
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

if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(store.getState().cart.items),
      );
    } catch {
      // Ignore storage failures (private mode, blocked storage, etc.).
    }
  });
}
