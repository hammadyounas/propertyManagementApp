import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/features/users/userSlice"; // adjust import as needed
import { includeCurrentUser } from "@/libs/utils/includeCurrentUser";

export const useUserOptions = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userOptions = useMemo(() => {
    return includeCurrentUser(users, currentUser).map((user) => ({
      label: user.name,
      value: user._id,
    }));
  }, [users, currentUser]);

  return { userOptions, loading, error };
};
