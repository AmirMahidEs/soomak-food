import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  tokenExpiresAt: null,
  refreshTokenExpiresAt: null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const {
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
        user = null,
      } = action.payload;

      state.isAuthenticated = true;
      state.user = user;
      state.token = accessToken;
      state.refreshToken = refreshToken;
      state.tokenExpiresAt = accessTokenExpiresAt;
      state.refreshTokenExpiresAt = refreshTokenExpiresAt;
    },

    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;

export default authSlice.reducer;
