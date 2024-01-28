import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUser: (state) => {
      console.log("statedata", state);
      // state.user = state;
    },
    login: (state) => {
      state.user = {};
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkUser } = userSlice.actions;

export default userSlice.reducer;
