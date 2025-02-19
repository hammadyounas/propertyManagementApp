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
  // salesPersons,
} from "../constants/data";
import {
  getRequest,
  postRequest,
} from "../../../../libs/utils/request_handler";

const useCreateForm = () => {
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    address: yup.string().required("Address is required"),
    status: yup.string().required("Client Status is required"),
    type: yup.string().required("Client Type is required"),
    preferredCommunicationChannel: yup
      .array()
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
    defaultValues: {
      type: "buyer",
      status: "active",
    },
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    value: "active",
    label: "Active",
  });
  const [clientType, setClientType] = useState({
    value: "buyer",
    label: "Buyer",
  });
  const [salesPersonAssigned, setSalespersonAssigned] = useState([]);
  const [communicationChannels, setCommunicationChannels] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);
  const { push } = useRouter();

  const fetchSalesPersons = async () => {
    try {
      const response = await getRequest("users");
      if (response) {
        const salesPersonsData = response?.data?.map((salesPerson) => ({
          value: salesPerson._id,
          label: salesPerson.name,
        }));
        setSalesPersons(salesPersonsData);
      }
    } catch (error) {
      console.error("Failed to fetch sales persons.");
    }
  };

  useEffect(() => {
    setValue("assigned_salesperson", salesPersonAssigned);
    setValue("status", status?.value || "");
    setValue("type", clientType?.value || "");
    setValue("preferredCommunicationChannel", communicationChannels);
    fetchSalesPersons();
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
        preferredCommunicationChannel: communicationChannels?.map(
          (channel) => channel.value
        ),
        assignedSalesperson: salesPersonAssigned?.map(
          (salesPerson) => salesPerson.value
        ),
        notes: data.notes,
      };

      const response = await postRequest("clients", formData);
      if (response) {
        toast.success("Client created successfully!");
        push("/clients");
      } else {
        toast.error("Client creation failed");
        throw new Error("Client creation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while creating client."
      );
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
