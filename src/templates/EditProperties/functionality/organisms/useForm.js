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
  ownerDetailsStatus
} from "../constants/data";
import { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { File } from "lucide-react";
import { getRequest,  putRequest } from "../../../../libs/utils/request_handler";
import { extractFileNameFromBase64 } from "../molecules/renderImagePreview";

const useCreateForm = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
  } = useForm();

  const [amenities, setAmenities] = useState([]);
  const [selectedSalespersons, setSelectedSalespersons] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [ownership, setOwnership] = useState("");
  const [ownerDetails, setOwnerDetails] = useState('');

  const [furnishing, setFurnishing] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Helper function to render file previews
  const renderPreview = (files, type) => {
    return files?.map((file, index) => {
      let fileURL = null;
      let fileName = "";
      if (type === "image" && typeof file === "string") {
        if (file.startsWith("data:image")) {
          // If it's a Base64 image string, use it directly
          fileURL = file;
          fileName = extractFileNameFromBase64(file, index);
        } else {
          // If not Base64, optionally handle it as an error or skip
          console.warn("Invalid Base64 string for an image.");
        }
      }
      //  = type == "image" ? URL.createObjectURL(file) : null;
      return (
        <div className="flex flex-col items-center border border-1 border-dashed mt-4 mr-4 p-4">
          {type == "image" && fileURL ? (
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
            className=" text-danger-500 mt-4"
          >
            Remove
          </button>
        </div>
      );
    });
  };

  const fetchPropertyData = async () => {
    try {
      const response = await getRequest(`properties/${propertyId}`);
      
      if (response.data) {
        const propertyData = response.data;
  
        // Form fields to be set
        const formFields = {
          title: propertyData.title,
          furnishing_status: propertyData.furnishing_status,
          property_type: propertyData.property_type,
          property_status: propertyData.property_status,
          ownership_status: propertyData.ownership_status,
          no_of_units: propertyData.no_of_units,
          description: propertyData.description,
          address: propertyData.address,
          street_number: propertyData.street_number,
          street_name: propertyData.street_name,
          cadastre_number: propertyData.cadastre_number,
          city: propertyData.city,
          area: propertyData.area,
          neighborhood: propertyData.neighborhood,
          location_map_url: propertyData.location_map_url,
          owner_status: propertyData.owner_status,
          price: propertyData.price,
          size: propertyData.size,
          bedrooms: propertyData.bedrooms,
          bathrooms: propertyData.bathrooms,
          owner_name: propertyData.owner_name,
          phone_number: propertyData.phone_number,
          email: propertyData.email,
          owner_address: propertyData.owner_address,
        };
  
        // Set values using the corresponding state setters
        setType(propertyTypes.find((item) => item.value === propertyData.property_type) || '');
        setStatus(propertyStatus.find((item) => item.value === propertyData.property_status) || '');
        setOwnership(ownershipStatus.find((item) => item.value === propertyData.ownership_status) || '');
        setFurnishing(furnishingStatus.find((item) => item.value === propertyData.furnishing_status) || '');
        setSelectedSalespersons(propertyData.assigned_to || []);
        setAmenities(amenities);  // Assuming amenities is being set from a predefined list
        setOwnerDetails(ownerDetailsStatus.find((item) => item.value === propertyData.owner_status) || {});
  
        // Set form values in a loop
        Object.entries(formFields).forEach(([key, value]) => setValue(key, value || ""));
        
        // Set additional states for images and documents
        setSelectedImages(propertyData.images || []);
        setSelectedDocs(propertyData.documents || []);
      }
    } catch (error) {
      // Handle error here, e.g., show a toast error message
      // toast.error("Failed to fetch property data.");
    }
  };  

  useEffect(() => {
    fetchPropertyData();

  }, [propertyId, setValue])

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
  useEffect(() => {
    console.log("Selected Images", selectedImages); // Logs when selectedImages state changes
  }, [selectedImages]);
  
  useEffect(() => {
    console.log("Selected Docs", selectedDocs); // Logs when selectedDocs state changes
  }, [selectedDocs]);
  

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
    // try {
    //   const response = await getRequest('user')
    //   response.data(setSelectedSalespersons);
    // } catch (error) {
    //   console.error("Error:", error); // Log errors
    // }
    setSelectedSalespersons(selectedValues);
  };

  const handleSelectType = (e) => {
    setType(e);
  };
  const handleSelectStatus = (e) => {
    setStatus(e);
  };
  const handleSelectOwnersDetailsStatus = (e) => {
    setOwnerDetails(e.value);
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
      const formData = {
        ...data,
        selectedImages: selectedImages.map((image) => ({
          file: image.file, // Accessing `file` property of image object
        })),
        selectedDocs: selectedDocs.map((doc) => ({
          file: doc.file, // Accessing `file` property of doc object
        })),
        property_type: data.type,
        furnishing_status: furnishing?.value,
        property_status: status?.value,
        owner_status: ownerDetails,
        amenities: amenities ? amenities.filter((amenity) => amenity && amenity.value).map((amenity) => amenity.value) : [],
        assigned_to: selectedSalespersons ? selectedSalespersons.filter((salesperson) => salesperson && salesperson.value).map((salesperson) => salesperson.value) : []
      };
      
      const response = await putRequest(`properties/${propertyId}`, formData);
  
      if (response) {
        console.log("Response:", response);
        toast.success("Property updated successfully!");
      } else {
        throw new Error("Failed to update property");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update property.");
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
