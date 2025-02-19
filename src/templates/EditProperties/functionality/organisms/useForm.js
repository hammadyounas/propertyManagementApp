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
import { useRouter } from "next/router";
import { File } from "lucide-react";
import {
  getRequest,
  patchRequest,
} from "../../../../libs/utils/request_handler";
import { extractFileNameFromBase64 } from "../molecules/renderImagePreview";
import { getAllUsersByName } from "../../../../libs/api/users";

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
    // assigned_to: yup
    //   .array()
    //   .min(1, "At least one salesperson must be selected")
    //   .required("Salesperson is required"),
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
  const [salesPerson, setSalesPerson] = useState([]);
  const [ownerDetails, setOwnerDetails] = useState("");

  const [furnishing, setFurnishing] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getDataLoading, setGetDataLoading] = useState(false)
  const { push } = useRouter();
  const router = useRouter();
  const propertyId = router.query.id;

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
      setSalesPerson(filteredResponse);
    } catch (error) {
      console.error("Error:", error); // Log errors
    }
  };

  // Helper function to render file previews
  const renderPreview = (files, type) => {
    return files?.map((file, index) => {
      let fileURL = null;
      let fileName = "";

      if (type === "image") {
        if (typeof file === "string") {
          fileURL = file;
          fileName = extractFileNameFromBase64(file, index);
        } else if (file && file.name && file.type && file.size) {
          // Perform a loose check for file-like object properties
          fileURL = URL.createObjectURL(file); // Create a temporary URL for preview
          fileName = file.name; // Use file's name
        }
      }

      return (
        <div
          key={index}
          className="flex flex-col items-center border border-1 border-dashed mt-4 mr-4 p-4"
        >
          {type === "image" && fileURL ? (
            <img
              src={fileURL}
              alt="Preview"
              className="object-cover w-36 h-28"
            />
          ) : (
            <div className="flex flex-col justify-center items-center w-36 h-28">
              <File size={50} />
              <p className="font-bold mt-2 text-center">
                {fileName?.length > 16
                  ? `${fileName.slice(0, 8)}...${fileName.slice(-8)}`
                  : fileName}
              </p>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={() => handleFileRemove(index, type)}
            className="text-danger-500 mt-4"
          >
            Remove
          </button>
        </div>
      );
    });
  };

  const fetchPropertyData = async () => {
    try {
      setGetDataLoading(true)
      const response = await getRequest(`properties/${propertyId}`);

      if (response) {
        const propertyData = response.data;

        //    // Pass only the assigned_to array to getAllUsersByName
        // const salespersonDetails = await getAllUsersByName(propertyData.assigned_to);

        // console.log("salespersonDetails", salespersonDetails);

        const salespersonDetails =
          propertyData?.assigned_to?.map((person) => ({
            label: person.name,
            value: person._id,
          })) || [];

        // Form fields to be set
        const formFields = {
          title: propertyData?.title,
          furnishing_status: propertyData?.furnishing_status,
          property_type: propertyData?.property_type,
          property_status: propertyData?.property_status,
          ownership_status: propertyData?.ownership_status,
          no_of_units: propertyData?.no_of_units,
          description: propertyData?.description,
          address: propertyData?.address,
          street_number: propertyData?.street_number,
          street_name: propertyData?.street_name,
          cadstre_number: propertyData?.cadstre_number,
          city: propertyData?.city,
          area: propertyData?.area,
          neighborhood: propertyData?.neighborhood,
          location_map_url: propertyData?.location_map_url,
          owner_status: propertyData?.owner_status,
          price: propertyData?.price,
          size: propertyData?.size,
          bedrooms: propertyData?.bedrooms,
          bathrooms: propertyData?.bathrooms,
          owner_name: propertyData?.owner_name,
          phone_number: propertyData?.phone_number,
          email: propertyData?.email,
          owner_address: propertyData?.owner_address,
          assigned_to: salespersonDetails, // Set names instead of IDs
          images: propertyData?.images || [],
        };

        // Set values using the corresponding state setters
        setType(
          propertyTypes.find(
            (item) => item.value === propertyData.property_type
          ) || ""
        );
        setStatus(
          propertyStatus.find(
            (item) => item.value === propertyData.property_status
          ) || ""
        );
        setOwnership(
          ownershipStatus.find(
            (item) => item.value === propertyData.ownership_status
          ) || ""
        );
        setFurnishing(
          furnishingStatus.find(
            (item) => item.value === propertyData.furnishing_status
          ) || ""
        );
        setSelectedSalespersons(salespersonDetails); // Correctly formatted for ReactSelect
        setAmenities(
          availableFacilities.filter((channel) =>
            propertyData.amenities.includes(channel.value)
          )
        ); // Assuming amenities is being set from a predefined list
        setOwnerDetails(
          ownerDetailsStatus.find(
            (item) => item.value === propertyData.owner_status
          ) || null
        );

        // Set form values in a loop
        Object.entries(formFields).forEach(([key, value]) =>
          setValue(key, value || "")
        );

        // Set additional states for images and documents
        setSelectedImages(propertyData.images || []);
        setSelectedDocs(propertyData.documents || []);
      }
      setGetDataLoading(false)
    } catch (error) {
      setGetDataLoading(false)
      console.error("Failed to fetch property data:", error);
    }
  };

  useEffect(() => {
    fetchSalesPerson();
    fetchPropertyData();
  }, [propertyId, setValue]);

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

  // Log the selected images and docs whenever they change
  useEffect(() => {}, [selectedImages, selectedDocs]);

  const handleFileRemove = (indexToRemove, type) => {
    if (type == "image") {
      const removedImage = selectedImages[indexToRemove];
      setRemovedImages((prevFiles) => [...prevFiles, removedImage]);
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
    setSelectedSalespersons(selectedValues) || [];
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

    try {
      const formData = new FormData();

      // Check if 'type' or other fields have values, otherwise default to empty strings
      formData.append("property_type", type && type.value ? type.value : "");
      formData.append(
        "furnishing_status",
        furnishing && furnishing.value ? furnishing.value : ""
      );
      formData.append(
        "property_status",
        status && status.value ? status.value : ""
      );
      formData.append(
        "owner_status",
        ownerDetails && ownerDetails.value ? ownerDetails.value : ""
      );

      // Append other text fields
      formData.append("title", data.title);
      formData.append("ownership_status", data.ownership_status);
      formData.append("no_of_units", data.no_of_units);
      formData.append("description", data.description);
      formData.append("address", data.address);
      formData.append("street_number", data.street_number);
      formData.append("street_name", data.street_name);
      formData.append("cadstre_number", data.cadstre_number || ""); // Ensure no undefined
      formData.append("city", data.city);
      formData.append("area", data.area);
      formData.append("neighborhood", data.neighborhood);
      formData.append("location_map_url", data.location_map_url);
      formData.append("price", data.price);
      formData.append("size", data.size);
      formData.append("bedrooms", data.bedrooms);
      formData.append("bathrooms", data.bathrooms);
      formData.append("owner_name", data.owner_name);
      formData.append("phone_number", data.phone_number);
      formData.append("email", data.email);
      formData.append("owner_address", data.owner_address);

      // Append amenities and assigned_to arrays
      if (amenities?.length) {
        amenities
          .filter((amenity) => amenity && amenity.value)
          .forEach((amenity) => {
            formData.append("amenities", amenity.value);
          });
      }
      else {
        formData.append("amenities", []);
      }

      if (selectedSalespersons?.length) {
        selectedSalespersons
          .filter((salesperson) => salesperson && salesperson.value)
          .forEach((salesperson) => {
            formData.append("assigned_to", salesperson.value);
          });
      }
      else {
         formData.append("assigned_to", []);
      }

      if (removedImages?.length) {
        removedImages.forEach((img) => {
          formData.append("removeImages", img);
        });
      }
      else {
        formData.append("removeImages", []);
      }

      // Append selected images
      selectedImages?.forEach((image) => {
        formData.append("images", image);
        console.log("Image:", image);
      });

      // Append selected documents
      selectedDocs?.forEach((doc) => {
        formData.append("documents", doc);
        console.log("Doc:", doc);
      });

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]); // Log all FormData entries
      }

      // Make PUT request with FormData
      const response = await patchRequest(
        `properties/${propertyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );

      if (response) {
        console.log("Response:", response);
        toast.success("Property updated successfully!");
        push("/properties");
      } else {
        throw new Error("Failed to update property");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update property."
      );
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
    ownerDetails,
    getDataLoading
  };
};

export default useCreateForm;
