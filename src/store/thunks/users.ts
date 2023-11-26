import { GetUserRequest, usersApi } from "@/lib/api/users";
import { AppDispatch } from "..";
import { getUsers as getUserUsers } from "../slices/user/userSlice";

const getUsers = () => async (dispatch: AppDispatch) => {
  const response = await usersApi.getUsers();
  dispatch(getUserUsers(response));
};

const getUser = (params: GetUserRequest) => async (dispatch: AppDispatch) => {
  const response = await usersApi.getUser(params);
  dispatch(getUserUsers(response));
};

export const UserThunks = {
  getUsers,
  getUser,
};
