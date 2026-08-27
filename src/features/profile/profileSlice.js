import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    activeTab: "profile",
    info: {
      firstName: "امیر محمدی",
      phone: "0912 123 4567",
      email: "ali.rezai@email.com",
    },
  },
  reducers: {
    setProfileTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateProfile: (state, action) => {
      state.info = {
        ...state.info,
        ...action.payload,
      };
    },
  },
});

export const { setProfileTab, updateProfile } = profileSlice.actions;
export const selectProfileTab = (state) => state.profile.activeTab;
export const selectProfileInfo = (state) => state.profile.info;

export default profileSlice.reducer;
