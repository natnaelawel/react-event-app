"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { UserThunks } from "@/store/thunks/users";
import { AuthThunks } from "@/store/thunks/auth";
import { UserState } from "@/store/slices/user/userSlice";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleAuth = useCallback(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      dispatch(AuthThunks.loginUser(JSON.parse(localUser) as UserState));
    } else {
      dispatch(AuthThunks.logoutUser());
    }
  }, [dispatch]);

  useEffect(() => {
    handleAuth();
  }, []);

  return user;
};

export default useAuth;
