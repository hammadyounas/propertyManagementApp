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
  import { useDropzone } from "react-dropzone";
  import Papa from 'papaparse';

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
    const [csvData, setCsvData] = useState(null);
    const { push } = useRouter();
    const [inputType, setInputType] = useState("manual"); 

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
      console.log("Current Input Type:", inputType);
    }, [inputType]);

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


    const handleFileUpload = (file) => {
      if (!file) return;
    
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Raw CSV Parsed Data:", results.data);
    
          if (!results.data || results.data.length === 0) {
            toast.error("Uploaded CSV is empty or invalid.");
            return;
          }
    
          // Ensure CSV has correct keys and valid data
          const formattedData = results.data.map((row, index) => ({
            name: row.name || ``, // Default value if empty
            email: row.email?.trim() || "",
            phoneNumber: row.phoneNumber?.trim() || row["phoneNumber"]?.trim() || "",
            address: row.address || "",
            type: row.type?.trim() || "buyer", // Default to Buyer if empty
            status: row.status?.trim() || "active", // Default to Active if empty
            preferredCommunicationChannel: row.preferredCommunicationChannel
              ? [row.preferredCommunicationChannel.trim()]
              : [], // Ensure it's an array
            notes: row.notes?.trim() || "",
          }));
    
          console.log("Formatted CSV Data Before Submit:", formattedData);
          setCsvData(formattedData);
        },
      });
    };
    
    
    
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      accept: { "text/csv": [".csv"] },
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          handleFileUpload(acceptedFiles[0]); // Pass first file
        }
      },
    });
    

    const handleRemoveCSV = () => {
      setCsvData(null);
    };
    

    const onSubmit = async (data) => {
    
      setLoading(true);
      try {
        if (inputType === "csv") {
          if (!csvData || csvData.length === 0) {
            toast.error("Please upload a valid CSV file.");
            setLoading(false);
            return;
          }
    
          for (const row of csvData) {
            const formData = {
              name: row.name || "",
              email: row.email || "",
              phoneNumber: row["phoneNumber"] || "", // Ensure correct key name
              address: row.address || "No address provided",
              type: row.type || "buyer",
              status: row.status || "active",
              preferredCommunicationChannel:
                row.preferredCommunicationChannel?.length
                  ? row.preferredCommunicationChannel
                  : ["email"],
              notes: row.notes || "",
            };
    
            console.log("Sending data:", formData);
    
            try {
              const response = await postRequest("clients", formData);
              console.log("Response:", response);
            } catch (error) {
              console.error("Error submitting client:", formData.name, error);
            }
          }
    
          toast.success("CSV File Uploaded Successfully");
        } else {
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
    
          console.log("Final Payload:", formData); // Debug before sending
    
          const response = await postRequest("clients", formData);
          if (response) {
            toast.success("Client created successfully!");
            push("/clients");
          } else {
            toast.error("Client creation failed");
            throw new Error("Client creation failed");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message || "An error occurred while creating client.");
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
      handleFileUpload,
      csvData,
      handleRemoveCSV,
      getRootProps,
      getInputProps,
      acceptedFiles,
      inputType,
      setInputType,
    };
  };

  export default useCreateForm;
