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
import { AppRoutes } from "@/constants/appRoutes";
import { extractFileNameFromBase64 } from "../molecules/renderImagePreview";
import { getAllUsersByName } from "../../../../libs/api/users";
import { formSections } from "../../../CreateProperty/functionality/constants/form_data";

const useCreateForm = () => {
  const schema = yup.object({
    title: yup.string().required("Property Title is required"),
    description: yup.string().required("Property Description is required"),
    property_type: yup.string().required("Property Type is required"),
    property_status: yup.string().required("Property Status is required"),
    ownership_status: yup.string().required("Ownership Status is required"),
    no_of_units: yup
      .number()
      .required("Number of Units is required")
      .moreThan(0, "Number of Units must be greater than 0"),
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
    cadastral_number: yup.string().required("Cadastral Number is required"),
    city: yup.string().required("City is required"),
    municipality: yup.string().required("Municipality is required"),
    price: yup
      .number()
      .required("Price is required")
      .moreThan(0, "Price must be greater than 0"),
    unit_size: yup
      .number()
      .required("Unit Size are required")
      .moreThan(0, "There must be at least 1 bedroom"),
    // assigned_to: yup
    //   .array()
    //   .min(1, "At least one salesperson must be selected")
    //   .required("Salesperson is required"),
    // images: yup
    //   .array()
    //   .min(1, "At least one image must be uploaded")
    //   .required("Images are required"),
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
      unit_size: "1",
      no_of_garages: "1",
      no_of_units: "1",
      location_map_url: "",
      // ownerDetailsStatus: ""
    },
  });

  const [contract_type, setContractType] = useState(null);
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
  
  // Add missing state variables for FormSection approach
  const [formData, setFormData] = useState({});
  const [expandedSections, setExpandedSections] = useState(
    formSections.reduce((acc, section, index) => {
      acc[index] = section.defaultExpanded;
      return acc;
    }, {})
  );
  
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
        const propertyData = response?.data;

        //    // Pass only the assigned_to array to getAllUsersByName
        // const salespersonDetails = await getAllUsersByName(propertyData.assigned_to);

        // console.log("salespersonDetails", salespersonDetails);

        const salespersonDetails =
          propertyData?.assigned_to?.map((person) => ({
            label: person.name,
            value: person._id,
          })) || [];

        // Form fields to be set - include all fields from form sections
        const formFields = {
          // Basic Property Information
          title: propertyData?.title,
          description: propertyData?.description,
          property_type: propertyData?.property_type,
          property_status: propertyData?.property_status,
          ownership_status: propertyData?.ownership_status,
          contract_type: propertyData?.contract_type,
          
          // Location & Address
          address: propertyData?.address,
          street_number: propertyData?.street_number,
          street_name: propertyData?.street_name,
          city: propertyData?.city,
          municipality: propertyData?.municipality,
          cadastral_number: propertyData?.cadastral_number,
          location_map_url: propertyData?.location_map_url,
          
          // Building Specifications
          no_of_units: propertyData?.no_of_units,
          unit_size: propertyData?.unit_size,
          year_built: propertyData?.year_built,
          building_type: propertyData?.building_type,
          construction_type: propertyData?.construction_type,
          building_stories: propertyData?.building_stories,
          land_area: propertyData?.land_area,
          
          // Parking & Garages
          no_of_garages: propertyData?.no_of_garages,
          no_of_parking_places: propertyData?.no_of_parking_places,
          parking_surface: propertyData?.parking_surface,
          
          // Utilities & Systems
          responsibility_of_heating: propertyData?.responsibility_of_heating,
          heating_system: propertyData?.heating_system,
          responsible_of_hot_water: propertyData?.responsible_of_hot_water,
          hot_water_system: propertyData?.hot_water_system,
          responsibility_of_appliances: propertyData?.responsibility_of_appliances,
          electrical_panels: propertyData?.electrical_panels,
          plumbing: propertyData?.plumbing,
          washer_dryer_installation: propertyData?.washer_dryer_installation,
          laundry: propertyData?.laundry,
          
          // Building Conditions
          condition_of_roof: propertyData?.condition_of_roof,
          condition_of_kitchens: propertyData?.condition_of_kitchens,
          condition_of_bathrooms: propertyData?.condition_of_bathrooms,
          condition_of_flooring: propertyData?.condition_of_flooring,
          condition_of_balconies: propertyData?.condition_of_balconies,
          condition_of_doors: propertyData?.condition_of_doors,
          condition_of_windows: propertyData?.condition_of_windows,
          siding: propertyData?.siding,
          
          // Building Features
          intercom_system: propertyData?.intercom_system,
          fire_alarm_system: propertyData?.fire_alarm_system,
          janitor_agreement: propertyData?.janitor_agreement,
          
          // Environmental Studies
          environmental_study: propertyData?.environmental_study,
          environmental_study_date: propertyData?.environmental_study_date,
          
          // Recent Capital Expenditures
          recent_capital_expenditures: propertyData?.recent_capital_expenditures,
          
          // Municipal Assessments
          municipal_assessment_land: propertyData?.municipal_assessment_land,
          municipal_assessment_building: propertyData?.municipal_assessment_building,
          total_municipal_evaluation: propertyData?.total_municipal_evaluation,
          
          // Financial Information
          price: propertyData?.price,
          
          // Revenue Breakdown
          revenue: propertyData?.revenue,
          
          // Expenses Breakdown
          expenses: propertyData?.expenses,
          
          // Financial Analysis
          financial_analysis: propertyData?.financial_analysis,
          
          // Financing Information
          financing: propertyData?.financing,
          
          // Cash Flow Analysis
          cash_flow: propertyData?.cash_flow,
          
          // ROI Analysis
          roi_analysis: propertyData?.roi_analysis,
          
          // Media
          images: propertyData?.images || [],
          
                     // Ownership & Management
           assigned_to: salespersonDetails?.map(person => person.value) || [],
          owner_name: propertyData?.owner_name,
          phone_number: propertyData?.phone_number,
          email: propertyData?.email,
          owner_address: propertyData?.owner_address,
          
          // Additional Information
          other_information: propertyData?.other_information,
        };
        console.log("salespersonDetails", salespersonDetails),
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
        setContractType(
          availableFacilities.filter((channel) =>
            propertyData.contract_type?.includes(channel.value)
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

        // Populate formData state for FormSection approach
        setFormData(formFields);
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
    setValue("contract_type", contract_type);
    setValue("images", selectedImages);
    setValue("documents", selectedDocs);
    setValue("property_type", type?.value);
    setValue("property_status", status?.value);
    setValue("ownership_status", ownership?.value || "");
    setValue("ownerStatus", ownerDetailsStatus?.value || "");
    // For assigned_to, we need to extract just the values from the selectedSalespersons array
    const assignedToValues = selectedSalespersons?.map(person => person.value) || [];
    setValue("assigned_to", assignedToValues);
    setValue("client", selectedClient?.value || "");
  }, [
    contract_type,
    selectedImages,
    selectedDocs,
    type,
    status,
    ownership,
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

  const handleSelectContractType = (selectedValues) => {
    setContractType(selectedValues);
  };

  const handleSelectSalesperson = (selectedValues) => {
    setSelectedSalespersons(selectedValues || []);
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

    // Debug: Log the form data
    console.log("Form data from react-hook-form:", data);
    console.log("selectedSalespersons state:", selectedSalespersons);

    try {
      const formData = new FormData();

      // Check if 'type' or other fields have values, otherwise default to empty strings
      formData.append("property_type", type && type.value ? type.value : "");
      // formData.append(
      //   "furnishing_status",
      //   furnishing && furnishing.value ? furnishing.value : ""
      // );
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
      formData.append("cadastral_number", data.cadastral_number || ""); // Ensure no undefined
      formData.append("city", data.city);
      formData.append("municipality", data.municipality);
      formData.append("location_map_url", data.location_map_url);
      formData.append("price", data.price);
      formData.append("unit_size", data.unit_size);
      formData.append("no_of_garages", data.no_of_garages);
      formData.append("no_of_parking_places", data.no_of_parking_places);
      formData.append("owner_name", data.owner_name);
      formData.append("phone_number", data.phone_number);
      formData.append("email", data.email);
      formData.append("owner_address", data.owner_address);
      // formData.append("contract_type", data.contract_type.value);

      // Append amenities and assigned_to arrays
      if (contract_type?.length) {
        const validContractTypes = contract_type
          .filter((amenity) => amenity && amenity.value && amenity.value.trim() !== '');
        
        if (validContractTypes.length > 0) {
          validContractTypes.forEach((amenity) => {
            formData.append("contract_type", amenity.value);
          });
        }
      }
      // Don't append contract_type if it's empty - let the backend handle it

      // Debug: Log selectedSalespersons state
      console.log("selectedSalespersons:", selectedSalespersons);
      console.log("data.assigned_to from form:", data.assigned_to);
      
      // Use the assigned_to value from the form data if available, otherwise use selectedSalespersons
      const assignedToValues = data.assigned_to || selectedSalespersons?.map(person => person.value) || [];
      console.log("assignedToValues to be sent:", assignedToValues);
      
      if (assignedToValues?.length) {
        const validSalespersons = assignedToValues
          .filter((value) => value && value.trim() !== '');
        
        console.log("validSalespersons:", validSalespersons);
        
        if (validSalespersons.length > 0) {
          validSalespersons.forEach((value) => {
            formData.append("assigned_to", value);
          });
        }
      }
      // Don't append assigned_to if it's empty - let the backend handle it

      if (removedImages?.length) {
        removedImages.forEach((img) => {
          formData.append("removeImages", img);
        });
      }
      // Don't append removeImages if it's empty - let the backend handle it

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

      // Debug: Log FormData entries
      console.log("=== FormData Debug ===");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      console.log("=== End FormData Debug ===");

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
        push(AppRoutes.PROPERTIES);
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

  // Add missing functions for FormSection approach
  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleInputChange = (name, value) => {
    // Handle nested object paths (e.g., "revenue.residential.yearly")
    const setNestedValue = (obj, path, value) => {
      const keys = path.split(".");
      let current = obj;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = {};
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return { ...obj };
    };

    // Debug: Log assigned_to changes
    if (name === "assigned_to") {
      console.log("assigned_to changed:", value);
    }

    // Special handling for images field
    if (name === "images") {
      setSelectedImages(value || []);
    }

    setFormData((prev) => setNestedValue(prev, name, value));

    // Also update react-hook-form value
    setValue(name, value);
  };

  const getNestedValue = (obj, path) => {
    // Special handling for images field - return from selectedImages state
    if (path === "images") {
      return selectedImages;
    }
    
    // First try to get value from react-hook-form
    const formValues = getValues();
    const formValue = path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : "";
    }, formValues);
    
    if (formValue !== "") {
      return formValue;
    }
    
    // Fall back to formData state
    const formDataValue = path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : "";
    }, obj);
    
    return formDataValue;
  };

  const getSectionErrors = (section) => {
    return section.fields.filter((field) => {
      const fieldError = errors[field.name];
      return fieldError && (fieldError.message || fieldError);
    }).length;
  };

  return {
    register,
    control,
    propertyTypes,
    propertyStatus,
    ownershipStatus,
    furnishingStatus,
    availableFacilities,
    contract_type,
    handleSelectContractType,
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
    getDataLoading,
    // Add missing variables for FormSection approach
    formData,
    expandedSections,
    toggleSection,
    handleInputChange,
    getNestedValue,
    getSectionErrors
  };
};

export default useCreateForm;
