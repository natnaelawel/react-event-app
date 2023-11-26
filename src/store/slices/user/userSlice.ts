import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UsersState {
  users: UserState[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers(state: UsersState, action: PayloadAction<UserState[]>) {
      state.users = action.payload;
    },
  },
});

export const { getUsers } = usersSlice.actions;

export const selectUsers = (state: { users: UserState[] }) => state.users;

const usersReducer = usersSlice.reducer;

export default usersReducer;
