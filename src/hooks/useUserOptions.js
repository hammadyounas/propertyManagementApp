import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/features/users/userSlice"; // adjust import as needed

export const useUserOptions = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userOptions = users.map((user) => ({
    label: user.name,
    value: user._id,
  }));

  return { userOptions, loading, error };
};
