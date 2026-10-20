import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "auth";

const loadAuth = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (
      saved?.token &&
      saved?.tokenExpiresAt &&
      new Date(saved.tokenExpiresAt).getTime() > Date.now()
    ) {
      return {
        isAuthenticated: true,
        user: saved.user ?? null,
        token: saved.token,
        refreshToken: saved.refreshToken ?? null,
        tokenExpiresAt: saved.tokenExpiresAt,
        refreshTokenExpiresAt: saved.refreshTokenExpiresAt ?? null,
      };
    }
  } catch {
    // Ignore invalid storage data
  }

  return {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    tokenExpiresAt: null,
    refreshTokenExpiresAt: null,
  };
};

const initialState = loadAuth();

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

      state.isAuthenticated = Boolean(accessToken);
      state.user = user;
      state.token = accessToken;
      state.refreshToken = refreshToken ?? null;
      state.tokenExpiresAt = accessTokenExpiresAt ?? null;
      state.refreshTokenExpiresAt = refreshTokenExpiresAt ?? null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.tokenExpiresAt = null;
      state.refreshTokenExpiresAt = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;

export default authSlice.reducer;
