import { useEffect, useState } from "react";
import {
  dummyPropertyDetails,
  rows,
  documentDataRows,
  salesperosonDataRows,
} from "../constants/data";
import { useRouter } from "next/router";
import {
  deleteRequest,
  getRequest,
} from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";
import { AppRoutes } from "@/constants/appRoutes";
import { useSelector } from "react-redux";

const usePropertyDetails = () => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { push, query } = useRouter();
  const { user } = useSelector((state) => state.auth);

  const getPropertyDetails = async () => {
    try {
      const { id } = query;
      setLoading(true);
      const response = await getRequest(`properties/${id}`);
      console.log(response);
      setPropertyDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.id) {
      // Ensure `id` is available before calling the function
      getPropertyDetails();
    }
  }, [query.id]);

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`properties/${id}`);
      toast.success("Property deleted successfully.");
      push(AppRoutes.PROPERTIES);
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting property!"
      );
    }
  };

  return {
    loading,
    propertyDetails,
    documentDataRows,
    salesperosonDataRows,
    push,
    rows,
    handleDelete,
    user
  };
};

export default usePropertyDetails;
