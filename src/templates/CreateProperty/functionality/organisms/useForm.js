import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  availableFacilities,
  clients,
  furnishingStatus,
  ownershipStatus,
  propertyStatus,
  propertyTypes,
  salesPerson,
} from "../constants/data";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

const useCreateForm = () => {
  const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    type: yup.string().required("Type is required"),
    status: yup.string().required("Status is required"),
    ownership_status: yup.string().required("Ownership status is required"),
    furnishing_status: yup.string().required("Furnishing status is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    area: yup.string().required("Area is required"),
    neighborhood: yup.string().required("Neighborhood is required"),
    price: yup
      .number()
      .required("Price is required")
      .moreThan(0, "Price must be greater than 0"),
    size: yup
      .number()
      .required("Size is required")
      .moreThan(0, "Size must be greater than 0"),
    bedrooms: yup
      .number()
      .required("Bedrooms are required")
      .moreThan(0, "There must be at least 1 bedroom"),
    bathrooms: yup
      .number()
      .required("Bathrooms are required")
      .moreThan(0, "There must be at least 1 bathroom"),
    // amenities: yup
    //   .array()
    //   .min(1, "At least one amenity must be selected")
    //   .required("Amenities are required"),
    images: yup
      .array()
      .min(1, "At least one image must be uploaded")
      .required("Images are required"),
    // documents: yup
    //   .array()
    //   .min(1, "At least one document must be uploaded")
    //   .required("Documents are required"),
    assigned_to: yup.string().required("Assignee is required"),
    client: yup.string().required("Client is required"),
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
      assigned_to: "",
      client: "",
      price: "1000000",
      size: "100",
      bedrooms: "1",
      bathrooms: "1",
    },
  });

  const [amenities, setAmenities] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [ownership, setOwnership] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [selectedSalesperson, setSelectedSalesperson] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  // Sync external state with form values using setValue
  useEffect(() => {
    setValue("amenities", amenities);
    setValue("images", selectedImages);
    setValue("documents", selectedDocs);
    setValue("type", type?.value);
    setValue("status", status?.value);
    setValue("ownership_status", ownership?.value || "");
    setValue("furnishing_status", furnishing?.value || "");
    setValue("assigned_to", selectedSalesperson?.value || "");
    setValue("client", selectedClient?.value || "");
  }, [
    amenities,
    selectedImages,
    selectedDocs,
    type,
    status,
    ownership,
    furnishing,
    selectedSalesperson,
    selectedClient,
    setValue,
  ]);

  // Helper function to validate file types
  const validateFileType = (file, type) => {
    const imageTypes = ["image/jpeg", "image/png", "image/gif"];
    const docTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (type === "image") {
      return imageTypes.includes(file.type);
    } else if (type === "doc") {
      return docTypes.includes(file.type);
    }
    return false;
  };

  // Function to handle image selection
  const handleImagesChange = (e) => {
    const files = e.target.files;
    if (files.length == 0) return;
    const validImages = Array.from(files).filter((file) =>
      validateFileType(file, "image")
    );

    if (validImages.length !== files.length) {
      return toast.error(
        "Some files are not valid images. Please upload JPG, PNG, or GIF files."
      );
    }

    setSelectedImages((prevImages) => [...prevImages, ...validImages]);
    e.target.value = null;
  };

  // Function to handle document selection (PDF and DOC/DOCX only)
  const handleDocsChange = (e) => {
    const files = e.target.files;
    if (files.length == 0) return;
    const validDocs = Array.from(files).filter((file) =>
      validateFileType(file, "doc")
    );

    if (validDocs.length !== files.length) {
      return toast.error(
        "Some files are not valid documents. Please upload PDF, DOC, or DOCX files."
      );
    }

    setSelectedDocs((prevDocs) => [...prevDocs, ...validDocs]);
    e.target.value = null;
  };

  const handleFileRemove = (indexToRemove, type) => {
    if (type == "image") {
      setSelectedImages((prevFiles) =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
    } else if (type == "doc") {
      setSelectedDocs((prevFiles) =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleSelectAmenities = (selectedValues) => {
    setAmenities(selectedValues);
  };

  const handleSelectType = (e) => {
    setType(e);
  };
  const handleSelectStatus = (e) => {
    setStatus(e);
  };
  const handleSelectOwnershipStatus = (e) => {
    setOwnership(e);
  };
  const handleSelectFurnishingStatus = (e) => {
    setFurnishing(e);
  };
  const handleSelectSalesperson = (e) => {
    setSelectedSalesperson(e);
  };
  const handleSelectClient = (e) => {
    setSelectedClient(e);
  };

  const onSubmit = (data) => {
    setLoading(true);
    {
      setTimeout(() => {
        alert(`Form Submitted`);
        console.log("Form Data: ", data);
        setLoading(false);
        push("/properties");
      }, 1500);
    }
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
    clients,
    selectedImages,
    selectedDocs,
    handleImagesChange,
    handleDocsChange,
    handleFileRemove,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    setValue,
    loading,
    push,
    type,
    status,
    ownership,
    furnishing,
    selectedSalesperson,
    selectedClient,
    handleSelectType,
    handleSelectStatus,
    handleSelectOwnershipStatus,
    handleSelectFurnishingStatus,
    handleSelectSalesperson,
    handleSelectClient,
  };
};

export default useCreateForm;
