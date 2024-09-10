// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    registerUserStart(state) {
      state.status = "loading";
    },
    registerUserSuccess(state, action) {
      state.status = "succeeded";
      state.user = action.payload;
    },
    registerUserFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { registerUserStart, registerUserSuccess, registerUserFailure } =
  authSlice.actions;

export default authSlice.reducer;
