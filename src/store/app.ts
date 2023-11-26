import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./slices/user/userSlice";
import authReducer from "./slices/auth/authSlice";
import { eventsApi } from "@/services/events";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
});
