import { createSlice } from "@reduxjs/toolkit";

const initailState = {
  token: "",
  userId: "",
  name: "",
  isAuth: false,
};

const auth = createSlice({
  name: "auth",
  initialState: initailState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.isAuth = true;
    },
    revokeAuth(state) {
      state.token = "";
      state.userId = "";
      state.name = "";
      state.isAuth = false;
    },
  },
});

export const authActions = auth.actions;

export default auth.reducer;
