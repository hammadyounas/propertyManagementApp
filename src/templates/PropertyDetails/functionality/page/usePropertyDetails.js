import { useEffect, useState } from "react";
import { dummyPropertyDetails, rows, documentDataRows, salesperosonDataRows } from "../constants/data";
import { useRouter } from "next/router";
import { getRequest } from "../../../../libs/utils/request_handler";

const usePropertyDetails = () => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { push, query } = useRouter();

  const getPropertyDetails = async () => {
    try {
      const {id} = query;
      setLoading(true);
      const response = await getRequest(`/properties/${id}`);
      console.log(response);
      setPropertyDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (query.id) { // Ensure `id` is available before calling the function
      getPropertyDetails();
    }
  }, [query.id]); 

  return {
    loading,
    propertyDetails,
    documentDataRows,
    salesperosonDataRows,
    push,
    rows
  };
};

export default usePropertyDetails;
