import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "somak-food-cart";

const initialItems = [
  {
    id: "zereshk-polo-morgh",
    title: "زرشک پلو با مرغ",
    price: 260000,
    image: null,
    quantity: 1,
  },
  {
    id: "ghorme-sabzi",
    title: "قورمه سبزی",
    price: 280000,
    image: null,
    quantity: 1,
  },
];

function loadCart() {
  if (typeof window === "undefined") return initialItems;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialItems;

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialItems;
  } catch {
    return initialItems;
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += product.quantity ?? 1;
        return;
      }

      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image ?? null,
        quantity: product.quantity ?? 1,
      });
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((x) => x.id === action.payload);
      if (!item) return;

      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter((x) => x.id !== action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartShipping = (state) =>
  state.cart.items.length > 0 ? 30000 : 0;
export const selectCartTotal = (state) =>
  selectCartSubtotal(state) + selectCartShipping(state);

export const CART_STORAGE_KEY = STORAGE_KEY;
export default cartSlice.reducer;
