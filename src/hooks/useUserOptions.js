import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/features/users/userSlice"; // adjust import as needed

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
    const options = (users || []).map((user) => ({
      label: user.name,
      value: user._id,
    }));
    const currentId = currentUser?._id?.toString();
    if (
      currentId &&
      !options.some((option) => option.value?.toString() === currentId)
    ) {
      options.unshift({
        label: currentUser.name,
        value: currentUser._id,
      });
    }
    return options;
  }, [users, currentUser]);

  return { userOptions, loading, error };
};
