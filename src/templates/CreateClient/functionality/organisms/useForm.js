import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import {
  clientStatus,
  clientTypes,
  preferredCommunicationChannels,
  salesPersons,
} from "../constants/data";
import { postRequest } from "../../../../libs/utils/request_handler";

const useCreateForm = () => {
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    address: yup.string().required("Address is required"),
    status: yup.string().required("Client Status is required"),
    type: yup.string().required("Client Type is required"),
    preferredCommunicationChannel: yup.array().required("Communication Channel is required"),
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
    // mode: "all",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [clientType, setClientType] = useState("");
  const [salesPersonAssigned, setSalespersonAssigned] = useState([]);
  const [communicationChannels, setCommunicationChannels] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    setValue("assigned_salesperson", salesPersonAssigned);
    setValue("status", status?.value || "");
    setValue("type", clientType?.value || "");
    setValue("preferredCommunicationChannel", communicationChannels);
  }, [salesPersonAssigned, status, clientType, communicationChannels]);

  const handleSelectStatus = (e) => {
    setStatus(e);
  };

  const handleSelectClientType = (e) => {
    setClientType(e);
  };

  const handleSelectAssignedSalesperson = (selectedValues) => {
    setSalespersonAssigned(selectedValues);
  };

  const handleSelectCommunicationChannel = (selectedValues) => {
    setCommunicationChannels(selectedValues);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Prepare data for the API
      const formData = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        type: clientType?.value || "",
        status: status?.value || "",
        preferredCommunicationChannel: communicationChannels.map(
          (channel) => channel.value
        ),
        assignedSalesperson: salesPersonAssigned.map((salesPerson) => salesPerson.value),
        notes: data.notes,
      };
  
      // API call to register the user
      const response = await postRequest("clients", formData);
      console.log("API Response:", response); // Debug API response
  
      if (response) {
        toast.success("Client registered successfully!");
        push("/clients"); // Redirect after successful registration
      } else {
        toast.error("Registration failed");
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error); // Log errors
      toast.error(error.message || "An error occurred while registering.");
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
    getValues,
    setValue,
    loading,
    push,
    status,
    handleSelectStatus,
    clientType,
    handleSelectClientType,
    salesPersonAssigned,
    handleSelectAssignedSalesperson,
    communicationChannels,
    handleSelectCommunicationChannel,
    clientStatus,
    clientTypes,
    preferredCommunicationChannels,
    salesPersons,
  };
};

export default useCreateForm;
