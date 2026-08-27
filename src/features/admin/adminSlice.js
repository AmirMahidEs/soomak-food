import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    activeTab: "dashboard",
    productFilters: {
      search: "",
      category: "",
      status: "",
    },
    orderFilters: {
      search: "",
      status: "",
    },
  },
  reducers: {
    setAdminTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setProductSearch: (state, action) => {
      state.productFilters.search = action.payload;
    },
    setProductCategoryFilter: (state, action) => {
      state.productFilters.category = action.payload;
    },
    setProductStatusFilter: (state, action) => {
      state.productFilters.status = action.payload;
    },
    setOrderSearch: (state, action) => {
      state.orderFilters.search = action.payload;
    },
    setOrderStatusFilter: (state, action) => {
      state.orderFilters.status = action.payload;
    },
    resetAdminFilters: (state) => {
      state.productFilters = { search: "", category: "", status: "" };
      state.orderFilters = { search: "", status: "" };
    },
  },
});

export const {
  setAdminTab,
  setProductSearch,
  setProductCategoryFilter,
  setProductStatusFilter,
  setOrderSearch,
  setOrderStatusFilter,
  resetAdminFilters,
} = adminSlice.actions;

export const selectAdminTab = (state) => state.admin.activeTab;
export const selectProductFilters = (state) => state.admin.productFilters;
export const selectOrderFilters = (state) => state.admin.orderFilters;

export default adminSlice.reducer;
