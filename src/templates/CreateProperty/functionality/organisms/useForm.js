import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  availableFacilities,
  clients,
  furnishingStatus,
  ownershipStatus,
  propertyStatus,
  propertyTypes,
  // salesPerson,
  ownerDetailsStatus,
} from "../constants/data";
import { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { File } from "lucide-react";
import {
  getRequest,
  postRequest,
} from "../../../../libs/utils/request_handler";

const useCreateForm = () => {
  const schema = yup.object({
    title: yup.string().required("Property Title is required"),
    description: yup.string().required("Property Description is required"),
    type: yup.string().required("Property Type is required"),
    status: yup.string().required("Property Status is required"),
    ownership_status: yup.string().required("Ownership Status is required"),
    no_of_units: yup
      .number()
      .required("Number of Units is required")
      .moreThan(0, "Number of Units must be greater than 0"),
    furnishing_status: yup.string().required("Furnishing Status is required"),
    address: yup.string().required("Address is required"),
    owner_name: yup.string().required("Owner Name is required"),
    phone_number: yup.string().required("Phone Number is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email"),
    owner_address: yup.string().required("Owner Address is required"),
    street_number: yup.string().required("Street Number is required"),
    street_name: yup.string().required("Street Name is required"),
    cadstre_number: yup.string().required("Cadstre Number is required"),
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
    assigned_to: yup
      .array()
      .min(1, "At least one salesperson must be selected")
      .required("Salesperson is required"),
    images: yup
      .array()
      .min(1, "At least one image must be uploaded")
      .required("Images are required"),
    location_map_url: yup
      .string()
      .notRequired() // Make it optional
      .test(
        "is-valid-url",
        "Location Map URL must be a valid Google Maps iframe URL",
        (value) =>
          !value ||
          /<iframe\s+src="https:\/\/www\.google\.com\/maps\/embed\?pb=[^"]*"/.test(
            value
          )
      ),

    // .notRequired(),
    // documents: yup
    //   .array()
    //   .min(1, "At least one document must be uploaded")
    //   .required("Documents are required"),
    // assigned_to: yup.string().required("Assignee is required"),
    // client: yup.string().required("Client is required"),
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
      no_of_units: "1",
      location_map_url: "",
      // ownerDetailsStatus: ""
    },
  });

  const [amenities, setAmenities] = useState([]);
  const [selectedSalespersons, setSelectedSalespersons] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [ownership, setOwnership] = useState("");
  const [ownerDetails, setOwnerDetails] = useState(
    ownerDetailsStatus[0] || null
  );
  const [salesPerson, setSalesPerson] = useState([]);

  const [furnishing, setFurnishing] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const imageInputRef = useRef(null);
  const docInputRef = useRef(null);

  const triggerImageFileInput = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const triggerDocFileInput = (docRef) => {
    if (docRef.current) {
      docRef.current.click();
    }
  };

  const fetchSalesPerson = async () => {
    try {
      const response = await getRequest("users");
      const filteredResponse = response.data.filter(
        (salesPerson) => !salesPerson.isDeleted
      );
      console.log(filteredResponse);
      setSalesPerson(filteredResponse);
    } catch (error) {
      console.error("Error:", error); // Log errors
    }
  };

  // Helper function to render file previews
  const renderPreview = (files, type) => {
    return files?.map((file, index) => {
      const fileURL = type == "image" ? URL.createObjectURL(file) : null;
      return (
        <div className="flex flex-col items-center border border-1 border-dashed mt-4 mr-4 p-4">
          {type == "image" ? (
            <img
              src={fileURL}
              alt="Preview"
              className="object-cover w-36 h-28"
            />
          ) : (
            <div className="flex flex-col justify-center items-center w-36 h-28">
              <File size={50} />
              <p className="font-bold mt-2 text-center">
                {" "}
                {file.name.length > 16
                  ? `${file.name.slice(0, 8)}...${file.name.slice(-8)}`
                  : file.name}
              </p>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={() => handleFileRemove(index, type)}
            className=" text-danger-500 mt-4"
          >
            Remove
          </button>
        </div>
      );
    });
  };

  // Sync external state with form values using setValue
  useEffect(() => {
    setValue("amenities", amenities);
    setValue("images", selectedImages);
    setValue("documents", selectedDocs);
    setValue("type", type?.value);
    setValue("status", status?.value);
    setValue("ownership_status", ownership?.value || "");
    setValue("ownerStatus", ownerDetailsStatus?.value || "");
    setValue("furnishing_status", furnishing?.value || "");
    setValue("assigned_to", selectedSalespersons);
    setValue("client", selectedClient?.value || "");
  }, [
    amenities,
    selectedImages,
    selectedDocs,
    type,
    status,
    ownership,
    furnishing,
    selectedSalespersons,
    selectedClient,
    setValue,
    ownerDetails,
  ]);

  useEffect(() => {
    fetchSalesPerson();
  }, []);

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

  const handleSelectSalesperson = (selectedValues) => {
    setSelectedSalespersons(selectedValues);
  };

  const handleSelectType = (e) => {
    setType(e);
  };
  const handleSelectStatus = (e) => {
    setStatus(e);
  };
  const handleSelectOwnersDetailsStatus = (e) => {
    setOwnerDetails(e);
  };
  const handleSelectOwnershipStatus = (e) => {
    setOwnership(e);
  };
  const handleSelectFurnishingStatus = (e) => {
    setFurnishing(e);
  };
  const handleSelectClient = (e) => {
    setSelectedClient(e);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    // toast.success("Property Added successfully!");
    // return push("/properties");

    try {
      // Create a new FormData instance
      const formData = new FormData();

      // Append regular form data (non-file fields)
      formData.append("title", data.title);
      formData.append("furnishing_status", data.furnishing_status);
      formData.append("property_type", data.type);
      formData.append("property_status", data.status);
      formData.append("ownership_status", data.ownership_status);
      formData.append("no_of_units", data.no_of_units);
      formData.append("description", data.description);
      formData.append("address", data.address);
      formData.append("street_number", data.street_number);
      formData.append("street_name", data.street_name);
      formData.append("cadstre_number", data.cadstre_number);
      formData.append("city", data.city);
      formData.append("area", data.area);
      formData.append("neighborhood", data.neighborhood);
      formData.append("location_map_url", data.location_map_url);
      // formData.append("owner_status", data.ownerDetailsStatus);
      formData.append("price", data.price);
      formData.append("size", data.size);
      formData.append("bedrooms", data.bedrooms);
      formData.append("bathrooms", data.bathrooms);
      formData.append("owner_name", data.owner_name);
      formData.append("phone_number", data.phone_number);
      formData.append("email", data.email);
      formData.append("owner_address", data.owner_address);

      // Append arrays (e.g., amenities, assigned salespersons)
      amenities.forEach((amenity) => {
        formData.append("amenities", amenity.value);
      });

      selectedSalespersons.forEach((salesperson) => {
        formData.append("assigned_to", salesperson.value);
      });

      // Append images and documents (files)
      selectedImages.forEach((image) => {
        formData.append("images", image); // Append each file object
        console.log("Image:", image); // Debugging
      });

      selectedDocs.forEach((doc) => {
        formData.append("documents", doc); // Append each file object
      });

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]); // Log all FormData entries
      }

      // Now, you can send the form data with the POST request
      const response = await postRequest("properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the content type is set to multipart/form-data
        },
      });

      console.log("API Response:", response); // Debug API response

      if (response) {
        toast.success("Property Added successfully!");
        // Redirect after successful submission if necessary
        push("/properties");
      } else {
        toast.error("Create Property failed");
        throw new Error("Create Property failed");
      }
    } catch (error) {
      console.error("Error:", error); // Log errors
      toast.error(error.message || "An error occurred while adding property.");
    } finally {
      setLoading(false);
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
    selectedClient,
    handleSelectType,
    handleSelectStatus,
    handleSelectOwnershipStatus,
    handleSelectFurnishingStatus,
    handleSelectOwnersDetailsStatus,
    handleSelectClient,
    imageInputRef,
    docInputRef,
    triggerImageFileInput,
    triggerDocFileInput,
    renderPreview,
    selectedSalespersons,
    handleSelectSalesperson,
    ownerDetailsStatus,
  };
};

export default useCreateForm;
