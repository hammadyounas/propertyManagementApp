import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { postRequest } from "../../../../libs/utils/request_handler";

const useCreateForm = () => {
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    contact_number: yup.string().required("Contact Number is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    address: yup.string().required("Address is required"),
    status: yup.string().required("Status is required"),
    propertiesAssigned: yup
    .array()
    .min(1, "At least one property must be selected"),
    // .required("Assigned Properties are required"),
    licence_number: yup.string().required("Licence Number is required"),
    licence_type: yup.string().required("Licence Type is required"),
    licence_type: yup.string().required("Licence Type is required"),
    joining_date: yup.string().required("Joining Date is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirm_password: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const salespersonStatus = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "in active",
      label: "In Active",
    },
  ];

  const availableProperties = [
    {
      value: "property 1",
      label: "Property 1",
    },
    {
      value: "property 2",
      label: "Property 2",
    },
    {
      value: "property 3",
      label: "Property 3",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [propertiesAssigned, setPropertiesAssigned] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    setValue("assigned_properties", propertiesAssigned);
    setValue("status", status?.value || "");
  }, [propertiesAssigned, status]);

  const handleSelectStatus = (e) => {
    setStatus(e);
  };

  const handleSelectAssignedProperties = (selectedValues) => {
    setPropertiesAssigned(selectedValues);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Prepare data for the API
      const formData = {
        name: data.name,
        email: data.email,
        contact_number: data.contact_number,
        address: data.address,
        licence_number: data.licence_number,
        licence_type: data.licence_type,
        assigned_properties: propertiesAssigned.map((property) => property.value), // Send only the property values
        status: data.status,
        joining_date: data.joining_date,
        password: data.password,
        confirm_password: data.confirm_password,
      };
  
      // API call to register the user
      const response = postRequest('register', formData)
      console.log(response.code >= 200 && response.data.status <= 300);
      if (response) {
        toast.success("User registered successfully!");
        console.log(response.data); // Log the API response if needed
        push("/sales-team"); // Redirect after successful registration
      } else {
        toast.error("Registration failed");
        throw new Error("Registration failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "An error occurred while registering.");
    } finally {
      setLoading(false); // Ensure loading state is turned off regardless of success or error
    }
  };
  
  

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    setValue,
    loading,
    push,
    status,
    handleSelectStatus,
    propertiesAssigned,
    handleSelectAssignedProperties,
    salespersonStatus,
    availableProperties,
  };
};

export default useCreateForm;
