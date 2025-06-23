import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
const { fetchUserById, clearSelectedUser } = require("../../../../store/features/users/userSlice");

export default function useSalesTeamDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = router.query.id; // ✅ move this back to top-level

  const { selectedUser: salesteamData } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(clearSelectedUser()); // ✅ clear previous on mount
  }, []);

  useEffect(() => {
    if (!router.isReady) return;

    if (userId) {
      dispatch(fetchUserById(userId));

      return () => {
        dispatch(clearSelectedUser()); // ✅ clean on unmount
      };
    }
  }, [router.isReady, userId, dispatch]);

  const handleEdit = () => {
    router.push(`/broker/edit/${userId}`);
  };

  return { salesteamData, handleEdit };
}
