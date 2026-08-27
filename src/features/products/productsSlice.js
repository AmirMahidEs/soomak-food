import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    category: "همه محصولات",
    view: "grid",
    maxPrice: 500000,
    sort: "default",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = Number(action.payload);
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    resetFilters: (state) => {
      state.category = "همه محصولات";
      state.view = "grid";
      state.maxPrice = 500000;
      state.sort = "default";
    },
  },
});

export const {
  setCategory,
  setView,
  setMaxPrice,
  setSort,
  resetFilters,
} = productsSlice.actions;

export const selectProductCategory = (state) => state.products.category;
export const selectProductView = (state) => state.products.view;
export const selectProductMaxPrice = (state) => state.products.maxPrice;
export const selectProductSort = (state) => state.products.sort;

export default productsSlice.reducer;
