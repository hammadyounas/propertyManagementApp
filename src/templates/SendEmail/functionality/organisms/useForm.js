import { toast } from "react-toastify";
import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import {
  getRequest,
  postRequest,
} from "../../../../libs/utils/request_handler";
import { AppRoutes } from "@/constants/appRoutes";

const useCreateForm = () => {
  const schema = yup.object({
    subject: yup.string().required("Subject is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    recipients: yup.array().min(1, "At least one recipient is required"),
    image: yup
      .mixed()
      .test("required", "Image is required", (value) => {
        return (
          value instanceof File || (Array.isArray(value) && value.length > 0)
        );
      })
      .test(
        "fileType",
        "Only PNG, JPG, and JPEG formats are allowed",
        (value) => {
          if (!value) return true; // Skip file type validation if value is empty
          return ["image/png", "image/jpg", "image/jpeg"].includes(value.type);
        }
      ),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCSV, setSelectedCSV] = useState(null);
  const [selectedType, setSelectedType] = useState("clients");
  const [selectionMethod, setSelectionMethod] = useState("manual");
  const [uploadedCsvEmails, setUploadedCsvEmails] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [emailData, setEmailData] = useState({});
  const { push } = useRouter();

  const closeModal = () => {
    setActiveModal(false);
    setEmailData({});
  };

  const fetchBrokers = async () => {
    try {
      const response = await getRequest("users?all=true");
      if (response) {
        const brokersData = response?.data?.map((broker) => ({
          value: broker.email,
          label: broker.email,
        }));
        setBrokers(brokersData);
      }
    } catch (error) {
      console.error("Failed to fetch brokers");
    }
  };

  const fetchClients = async () => {
    try {
      const response = await getRequest(`clients?all=true`);
      if (response) {
        const clientsData = response?.data?.clients.map((client) => ({
          value: client.email,
          label: client.email,
        }));
        setClients(clientsData);
      }
    } catch (error) {
      console.error("Failed to fetch clients");
    }
  };

  useEffect(() => {
    fetchBrokers();
    fetchClients();
  }, []);

  useEffect(() => {
    setValue("recipients", recipients);
  }, [recipients]);

  const handleSelectRecipients = (selectedOptions) => {
    const isSelectAll = selectedOptions.some(
      (option) => option.value === "select_all"
    );
    if (isSelectAll) {
      const fullList =
        selectedType === "clients"
          ? clients
          : selectedType === "brokers"
          ? brokers
          : [...clients, ...brokers];
      setRecipients(fullList);
    } else {
      setRecipients(selectedOptions);
    }
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      setSelectedCSV(file);
      Papa.parse(file, {
        complete: (result) => {
          const emails = result?.data?.map((row) => ({
            label: row[0],
            value: row[0],
          }));
          handleSelectRecipients(emails);
          setUploadedCsvEmails(emails);
        },
        skipEmptyLines: true,
      });
    }
  };

  const handleRemoveCSV = () => {
    setSelectedCSV(null);
    setUploadedCsvEmails([]);
    handleSelectRecipients([]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setValue("image", file); // Update form field value
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null); // Clear selected image
    setValue("image", "");
  };

  const onSubmit = async (data) => {
    setEmailData(data);
    setActiveModal(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = recipients
        ?.map((recipient) => recipient.value)
        .filter((email) => !emailRegex.test(email));

      if (invalidEmails.length > 0) {
        toast.error(`Invalid email(s): ${invalidEmails.join(", ")}`);
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("subject", emailData?.subject);
      formData.append("title", emailData?.title);
      formData.append("description", emailData?.description);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      recipients?.forEach((recipient) => {
        formData.append("recipients", recipient.value);
      });

      const response = await postRequest("email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        closeModal();
        toast.success("Email sent successfully!");
        push(AppRoutes.MARKETING_EMAILS);
      } else {
        toast.error("Email creation failed");
        throw new Error("Email creation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while sending the email."
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
    brokers,
    clients,
    handleSelectRecipients,
    handleImageUpload,
    selectedImage,
    selectedType,
    setSelectedType,
    handleRemoveImage,
    recipients,
    setSelectionMethod,
    selectionMethod,
    handleFileUpload,
    setUploadedCsvEmails,
    uploadedCsvEmails,
    handleRemoveCSV,
    selectedCSV,
    watch,
    activeModal,
    closeModal,
    emailData,
    handleConfirm,
  };
};

export default useCreateForm;
