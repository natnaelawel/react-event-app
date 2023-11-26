import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../user/userSlice";

type AuthState = {
  user: UserState | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;

export const selectToken = (state: { auth: AuthState }) => state.auth.token;

export const { setAuth, clearAuth } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
