import { useEffect, useState } from "react";
import { dummyPropertyDetails } from "../constants/data";
import { useRouter } from "next/router";

const usePropertyDetails = () => {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPropertyDetails(dummyPropertyDetails);
      setLoading(false);
    }, 1000);
  }, []);

  return {
    loading,
    propertyDetails,
    push,
  };
};

export default usePropertyDetails;
