import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import {
  getRequest,
  postRequest,
} from "../../../../libs/utils/request_handler";

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
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedType, setSelectedType] = useState("clients");
  const { push } = useRouter();

  const fetchBrokers = async () => {
    try {
      const response = await getRequest("users");
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
      const response = await getRequest("clients");
      if (response) {
        const clientsData = response?.data?.map((client) => ({
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

  const handleSelectRecipients = (selectedValues) => {
    setRecipients(selectedValues);
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("subject", data.subject);
      formData.append("title", data.title);
      formData.append("description", data.description);

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
        toast.success("Email sent successfully!");
        push("/marketing-emails");
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
  };
};

export default useCreateForm;
