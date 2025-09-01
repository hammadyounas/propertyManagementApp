import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { fetchProperties } from "../../../../store/features/properties/propertiesSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  selectACMCreateSuccess,
  selectACMError,
  selectACMLoading,
} from "../../../../store/features/acm/acmSelectors";
import {
  createACM,
  clearACMCreateStatus,
} from "../../../../store/features/acm/acmSlice";
import { generateACMPDF } from "../../../../libs/utils/acm_template";

const useCreateACM = () => {
  const schema = yup.object({
    base_property: yup
      .string()
      .required("Base Property is required")
      .test(
        "not-in-compare-property",
        "Base Property cannot be one of the compare properties",
        function (value) {
          const { compare_property } = this.parent;
          if (!value || !Array.isArray(compare_property)) return true;
          return !compare_property.includes(value);
        }
      ),
    compare_property: yup
      .array()
      .min(3, "At least three compare properties are required")
      .of(yup.string().required("Compare Property is required"))
      .required("Compare Properties are required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [selectedBaseProperty, setSelectedBaseProperty] = useState(null);
  const [selectedCompareProperties, setSelectedCompareProperties] = useState([]);
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.properties);
  const loading = useSelector(selectACMLoading);
  const error = useSelector(selectACMError);
  const createSuccess = useSelector(selectACMCreateSuccess);

  useEffect(() => {
    dispatch(fetchProperties({ all: true }));
  }, []);

  const propertyOptions = properties.map((property) => ({
    value: property._id,
    label: property.title,
  }));

  const handleSelectBaseProperty = (selectedOption) => {
    setSelectedBaseProperty(selectedOption);
    setValue("base_property", selectedOption?.value || "");
    
    // Clear compare properties if the selected base property is in the compare list
    if (selectedCompareProperties.some(prop => prop.value === selectedOption?.value)) {
      setSelectedCompareProperties([]);
      setValue("compare_property", []);
    }
  };

  const handleSelectCompareProperties = (selectedOptions) => {
    setSelectedCompareProperties(selectedOptions);
    const values = selectedOptions?.map((opt) => opt.value) || [];
    setValue("compare_property", values);
  };

  // Filter out base property from compare properties options
  const filteredCompareProperties = propertyOptions.filter(
    (property) => property.value !== selectedBaseProperty?.value
  );

  useEffect(() => {
    if (createSuccess) {
      // Don't redirect immediately - let the onSubmit handle PDF generation
      // toast.success("Form Submitted Successfully");
      // dispatch(clearACMCreateStatus());
      // push("/acms");
    }

    if (error) {
      toast.error(error);
      dispatch(clearACMCreateStatus());
    }
  }, [createSuccess, error, dispatch]);

  const onSubmit = async (data) => {
    try {
      // First, save the ACM data to the database
      const result = await dispatch(createACM(data));
      
      if (result.type === 'acm/createACM/fulfilled') {
        // Get the saved ACM data with populated properties
        const savedACM = result.payload;
        
        // Prepare data for PDF generation
        const pdfData = {
          ...savedACM,
          base_property: properties.find(p => p._id === data.base_property),
          compare_property: data.compare_property.map(id => 
            properties.find(p => p._id === id)
          ).filter(Boolean),
          created_by: { name: "Current User" } // You can get this from auth state
        };
        
        // Generate and download the PDF report
        setTimeout(async () => {
          try {
            await generateACMPDF(pdfData);
            toast.success("ACM saved and PDF report generated successfully!");
            
            // Clear status and redirect after PDF generation
            dispatch(clearACMCreateStatus());
            setTimeout(() => {
              push("/acms");
            }, 1000);
          } catch (error) {
            console.error("PDF generation error:", error);
            toast.error("ACM saved but PDF generation failed. Please try again.");
            dispatch(clearACMCreateStatus());
            setTimeout(() => {
              push("/acms");
            }, 2000);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error in ACM submission:", error);
      toast.error("Failed to save ACM or generate report");
    }
  };
  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const formData = {
  //       ...data,
  //     };

  //     const response = await postRequest("acm", formData);
  //     if (response) {
  //       toast.success("Form submitted successfully");
  //       push("/acms");
  //     } else {
  //       toast.error("Invoice creation failed");
  //       throw new Error("Invoices creation failed");
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error?.response?.data?.message ||
  //         error.message ||
  //         "An error occurred while creating invoice."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    setValue,
    loading,
    properties: propertyOptions,
    filteredCompareProperties,
    selectedBaseProperty,
    handleSelectBaseProperty,
    selectedCompareProperties,
    handleSelectCompareProperties,
    push,
  };
};

export default useCreateACM;
