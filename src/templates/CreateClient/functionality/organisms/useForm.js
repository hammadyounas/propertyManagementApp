  import { toast } from "react-toastify";
  import { useForm } from "react-hook-form";
  import { useState, useEffect, useRef } from "react";
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
  import { AppRoutes } from "@/constants/appRoutes";
  import { useSelector } from "react-redux";
  import { includeCurrentUser } from "../../../../libs/utils/includeCurrentUser";

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
    const currentUser = useSelector((state) => state.auth.user);
    const [csvData, setCsvData] = useState(null);
    const { push } = useRouter();
    const [inputType, setInputType] = useState("manual");
    const [uploadProgress, setUploadProgress] = useState({
      current: 0,
      total: 0,
      failed: 0,
      skipped: 0,
    });
    const uploadCancelled = useRef(false);

    const normalizePhoneKey = (phone) => String(phone || "").replace(/\D/g, "");
    const clientDedupeKey = (name, phone) =>
      `${String(name || "").trim().toLowerCase()}|${normalizePhoneKey(phone)}`; 

    const fetchSalesPersons = async () => {
      try {
        const response = await getRequest("users");
        if (response) {
          const salesPersonsData = includeCurrentUser(
            response?.data,
            currentUser
          ).map((salesPerson) => ({
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
      return () => {
        uploadCancelled.current = true;
      };
    }, []);

    useEffect(() => {
      if (!loading) return undefined;
      const onBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
      };
      window.addEventListener("beforeunload", onBeforeUnload);
      return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, [loading]);

    useEffect(() => {
      setValue("assigned_salesperson", salesPersonAssigned);
      setValue("status", status?.value || "");
      setValue("type", clientType?.value || "");
      setValue("preferredCommunicationChannel", communicationChannels);
      fetchSalesPersons();
    }, [salesPersonAssigned, status, clientType, communicationChannels, currentUser]);

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
  
  const downloadSampleCsv = () => {
    const sampleFilePath = AppRoutes.SAMPLE_CLIENT_DATA_CSV;
    const link = document.createElement('a');
    link.href = sampleFilePath;
    link.download = 'sample-client-data.csv';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

          uploadCancelled.current = false;
          const total = csvData.length;
          let failed = 0;
          let skipped = 0;
          setUploadProgress({ current: 0, total, failed: 0, skipped: 0 });

          const seenKeys = new Set();
          try {
            const existing = await getRequest("clients?all=true");
            const existingClients = existing?.data?.clients || existing?.data || [];
            existingClients.forEach((client) => {
              const key = clientDedupeKey(client.name, client.phoneNumber);
              if (key !== "|") seenKeys.add(key);
            });
          } catch (error) {
            // Continue upload; backend still rejects name+phone duplicates
          }

          for (let i = 0; i < csvData.length; i++) {
            if (uploadCancelled.current) {
              setUploadProgress({ current: i, total, failed, skipped });
              toast.error(
                `Upload stopped. ${i} of ${total} rows were processed.`
              );
              setLoading(false);
              return;
            }

            const row = csvData[i];
            const formData = {
              name: row.name || "",
              email: row.email || "",
              phoneNumber: row["phoneNumber"] || "",
              address: row.address || "No address provided",
              type: row.type || "buyer",
              status: row.status || "active",
              preferredCommunicationChannel:
                row.preferredCommunicationChannel?.length
                  ? row.preferredCommunicationChannel
                  : ["email"],
              notes: row.notes || "",
            };

            const duplicateKey = clientDedupeKey(
              formData.name,
              formData.phoneNumber
            );
            if (duplicateKey !== "|" && seenKeys.has(duplicateKey)) {
              skipped += 1;
              setUploadProgress({ current: i + 1, total, failed, skipped });
              continue;
            }

            try {
              await postRequest("clients", formData);
              if (duplicateKey !== "|") seenKeys.add(duplicateKey);
            } catch (error) {
              const message = error?.response?.data?.message || "";
              if (
                message.includes("name and phone") ||
                message.includes("already exists")
              ) {
                skipped += 1;
                if (duplicateKey !== "|") seenKeys.add(duplicateKey);
              } else {
                failed += 1;
              }
            }

            setUploadProgress({ current: i + 1, total, failed, skipped });
          }

          if (uploadCancelled.current) {
            setLoading(false);
            return;
          }

          toast.success("CSV File Uploaded Successfully");
          push(AppRoutes.CLIENTS);
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
            push(AppRoutes.CLIENTS);
          } else {
            toast.error("Client creation failed");
            throw new Error("Client creation failed");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
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
    handleFileUpload,
    csvData,
    handleRemoveCSV,
    getRootProps,
    getInputProps,
    acceptedFiles,
    inputType,
    setInputType,
    downloadSampleCsv,
    uploadProgress,
  };
};

  export default useCreateForm;
