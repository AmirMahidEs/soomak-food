import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    currentStep: 1,
    paymentMethod: "online",
    shippingInfo: {
      name: "",
      phone: "",
      address: "",
    },
  },
  reducers: {
    setCheckoutStep: (state, action) => {
      state.currentStep = Math.min(Math.max(Number(action.payload), 1), 3);
    },
    nextCheckoutStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, 3);
    },
    previousCheckoutStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 1);
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    updateShippingInfo: (state, action) => {
      state.shippingInfo = {
        ...state.shippingInfo,
        ...action.payload,
      };
    },
    resetCheckout: (state) => {
      state.currentStep = 1;
      state.paymentMethod = "online";
      state.shippingInfo = { name: "", phone: "", address: "" };
    },
  },
});

export const {
  setCheckoutStep,
  nextCheckoutStep,
  previousCheckoutStep,
  setPaymentMethod,
  updateShippingInfo,
  resetCheckout,
} = checkoutSlice.actions;

export const selectCheckoutStep = (state) => state.checkout.currentStep;
export const selectPaymentMethod = (state) => state.checkout.paymentMethod;
export const selectShippingInfo = (state) => state.checkout.shippingInfo;

export default checkoutSlice.reducer;
