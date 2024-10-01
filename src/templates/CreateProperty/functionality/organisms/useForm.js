import { useForm, useFieldArray } from "react-hook-form";
import {
  availableFacilities,
  clients,
  furnishingStatus,
  ownershipStatus,
  propertyStatus,
  propertyTypes,
  salesPerson,
} from "../constants/data";
import { useState } from "react";
const useCreateForm = () => {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      defaultValues: {
        test: [{ firstName: "Bill", lastName: "Luo", phone: "123456" }],
      },
    }
  );

  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (selectedValues) => {
    setAmenities(selectedValues);
  };

  return {
    register,
    control,
    propertyTypes,
    propertyStatus,
    ownershipStatus,
    furnishingStatus,
    availableFacilities,
    amenities,
    handleSelectAmenities,
    salesPerson,
    clients
  };
};

export default useCreateForm;
