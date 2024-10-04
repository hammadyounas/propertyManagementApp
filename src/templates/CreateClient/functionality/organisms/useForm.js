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

const useCreateForm = () => {
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone Number is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    address: yup.string().required("Address is required"),
    status: yup.string().required("Client Status is required"),
    client_type: yup.string().required("Client Type is required"),
    communication_channel: yup
      .array()
      .min(1, "At least one communication channel is required")
      .required("Communication Channel is required"),
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

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [clientType, setClientType] = useState("");
  const [salesPersonAssigned, setSalespersonAssigned] = useState([]);
  const [communicationChannels, setCommunicationChannels] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    setValue("assigned_salesperson", salesPersonAssigned);
    setValue("status", status?.value || "");
    setValue("client_type", clientType?.value || "");
    setValue("communication_channel", communicationChannels);
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

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      alert(`Form Submitted`);
      console.log("Form Data: ", data);
      setLoading(false);
      push("/clients");
    }, 1500);
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
