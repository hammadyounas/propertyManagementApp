import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  getRequest,
  patchRequest,
} from "../../../../libs/utils/request_handler";
import { getAllPropertiesByTitle } from "../../../../libs/api/properties";
import { salespersonStatus } from "../constants/formOptions";
import { AppRoutes } from "@/constants/appRoutes";

const useEditSalesTeam = () => {
  const schema = yup.object({
     name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Enter a valid email")
          .required("Email is required"),
        contact_number: yup.string().required("Contact number is required"),
        address: yup.string().required("Address is required"),
        licence_number: yup.string().required("License number is required"),
        licence_type: yup.string().required("License type is required"),
        status: yup
  .mixed()
  .required("Status is required")
  .test("is-valid-status", "Invalid status.", value => {
    return typeof value === "string" || (value?.value && typeof value.value === "string");
  }),

  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm({
      resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [getDataLoading, setGetDataLoading] = useState(false)
  const [status, setStatus] = useState("");
  const [propertiesAssigned, setPropertiesAssigned] = useState([]);
  const [availableProperties, setAvailableProperties] = useState([]);
  const { push } = useRouter();
  const router = useRouter();
  const userId = router.query.id;

  // Fetch available properties
  const fetchAvailableProperties = async () => {
    try {
      const response = await getRequest("properties");
      const filteredResponse = response.data.filter((properties) => !properties.isDeleted);
      setAvailableProperties(filteredResponse);
      console.log("Available Properties:", filteredResponse);
    } catch (error) {
      console.error("Error:", error); 
    }
  };

  useEffect(() => {
    if (!userId) return;
  
    const fetchUserData = async () => {
      try {
        setGetDataLoading(true)
        const response = await getRequest(`user/${userId}`);
        const userData = response?.data;

        // Find the matching option for status
        const statusOption = salespersonStatus.find(
          (status) => status.value === userData?.status
        );
        
        // Set form values
        setValue("name", userData?.name);
        setValue("email", userData?.email);
        setValue("contact_number", userData?.contact_number);
        setValue("address", userData?.address);
        setValue("licence_number", userData?.licence_number);
        setValue("licence_type", userData?.licence_type);
        setValue("notes", userData?.notes);
        setValue("status", statusOption); // Set the ReactSelect-compatible option
        setStatus(statusOption); // Update the local state for ReactSelect
  
        // Set joining date
        setValue("joining_date", userData?.joining_date);
  
        // Fetch and set assigned properties
        // const assignedProperties = await getAllPropertiesByTitle(userData.assigned_properties);
        // setValue("assigned_properties", assignedProperties);
        // setPropertiesAssigned(assignedProperties);
        setGetDataLoading(false)
      } catch (error) {
        setGetDataLoading(false)
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };
  
    fetchUserData();
    // fetchAvailableProperties();
  }, [userId, setValue]);
  

  useEffect(() => {
    setValue("assigned_properties", propertiesAssigned);
    setValue("status", status?.value || "");
  }, [propertiesAssigned, status]);

  // Handlers
  const handleSelectStatus = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  const handleSelectAssignedProperties = (selectedProperties) => {
    setPropertiesAssigned(selectedProperties);
  };

  // Submit Form
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = {
        name: data.name,
        email: data.email,
        contact_number: data.contact_number,
        address: data.address,
        licence_number: data.licence_number,
        licence_type: data.licence_type,
        // assigned_properties: propertiesAssigned.map(
        //   (property) => property.value
        // ),
          status: data.status?.value || data.status,
        joining_date: data.joining_date,
      };

      const response = await patchRequest(`user/${userId}`, formData);
      if (response) {
        toast.success("User updated successfully!");
        push(AppRoutes.BROKER);
      } else {
        throw new Error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error?.response?.data?.message ||  error?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    push,
    status,
    handleSelectStatus,
    propertiesAssigned,
    handleSelectAssignedProperties,
    salespersonStatus,
    availableProperties,
    getDataLoading,
  };
};

export default useEditSalesTeam;
