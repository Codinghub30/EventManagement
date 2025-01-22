import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: sessionStorage.getItem("isAuthenticated") === "true",
    userDetails: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;

      state.userDetails = action.payload;
      sessionStorage.setItem("isAuthenticated", "true");
    },
    logout(state) {
      state.isAuthenticated = false;
      sessionStorage.removeItem("isAuthenticated");
      state.userDetails = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
