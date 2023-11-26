"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { UserThunks } from "@/store/thunks/users";

const useUsers = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  const handleGetUsers = useCallback(() => {
    dispatch(UserThunks.getUsers());
  }, [dispatch]);

  useEffect(() => {
    handleGetUsers();
  }, []);

  return users;
};

export default useUsers;
