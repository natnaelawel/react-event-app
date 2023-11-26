import { GetUserRequest } from "@/lib/api/users";
import { AppDispatch } from "..";
import { UserState } from "../slices/user/userSlice";
import { clearAuth, setAuth } from "../slices/auth/authSlice";

const loginUser = (user: UserState) => async (dispatch: AppDispatch) => {
  dispatch(
    setAuth({
      user: user,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    })
  );
};

const logoutUser = () => async (dispatch: AppDispatch) => {
  dispatch(clearAuth());
};

export const AuthThunks = {
  loginUser,
  logoutUser,
};
