// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    userLoggedInfo: {},
  },

  reducers: {
    setIsLogged(state, action) {
      state.isLogged = action.payload;
    },
    setUserLoggedInfo(state, action) {
      state.userLoggedInfo = action.payload;
    },
  },
});

export const { setIsLogged, setUserLoggedInfo } = authSlice.actions;

export default authSlice.reducer;
