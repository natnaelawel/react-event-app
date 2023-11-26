import { combineReducers } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendar/calendarSlice";
import usersReducer from "./slices/user/userSlice";
import authReducer from "./slices/auth/authSlice";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  users: usersReducer,
  auth: authReducer,
});
