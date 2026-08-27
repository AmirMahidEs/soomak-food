import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../data/products";


/* =========================================================
   DYNAMIC MAX PRICE
========================================================= */

const getMaxProductPrice = () => {
  if (!products.length) {
    return 0;
  }

  return Math.max(
    ...products.map(
      (product) =>
        Number(product.price) || 0,
    ),
  );
};


const MAX_PRODUCT_PRICE =
  getMaxProductPrice();


/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  category: "همه محصولات",

  maxPrice:
    MAX_PRODUCT_PRICE,

  sort: "default",

  view: "grid",
};


/* =========================================================
   SLICE
========================================================= */

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {

    setCategory: (
      state,
      action,
    ) => {
      state.category =
        action.payload;
    },


    setMaxPrice: (
      state,
      action,
    ) => {
      state.maxPrice =
        Number(
          action.payload,
        );
    },


    setSort: (
      state,
      action,
    ) => {
      state.sort =
        action.payload;
    },


    setView: (
      state,
      action,
    ) => {
      state.view =
        action.payload;
    },


    resetFilters: (
      state,
    ) => {

      state.category =
        "همه محصولات";

      state.maxPrice =
        MAX_PRODUCT_PRICE;

      state.sort =
        "default";
    },

  },
});


/* =========================================================
   ACTIONS
========================================================= */

export const {
  setCategory,
  setMaxPrice,
  setSort,
  setView,
  resetFilters,
} = productsSlice.actions;


/* =========================================================
   SELECTORS
========================================================= */

export const selectProductCategory = (
  state,
) =>
  state.products.category;


export const selectProductMaxPrice = (
  state,
) =>
  state.products.maxPrice;


export const selectProductSort = (
  state,
) =>
  state.products.sort;


export const selectProductView = (
  state,
) =>
  state.products.view;


/* =========================================================
   REDUCER
========================================================= */

export default productsSlice.reducer;