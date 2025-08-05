import { useState } from "react";
import { formSections } from "../constants/form_data";
import { postRequest } from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const usePropertyForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [expandedSections, setExpandedSections] = useState(
    formSections.reduce((acc, section, index) => {
      acc[index] = section.defaultExpanded;
      return acc;
    }, {})
  );

  const router = useRouter();

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

    setFormData((prev) => setNestedValue(prev, name, value));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : "";
    }, obj);
  };

  const validateForm = () => {
    const newErrors = {};

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        const value = getNestedValue(formData, field.name);

        // Check required fields
        if (field.required) {
          if (!value || (typeof value === "string" && value.trim() === "")) {
            newErrors[field.name] = `${field.label} is required`;
          } else if (Array.isArray(value) && value.length === 0) {
            newErrors[field.name] = `${field.label} is required`;
          } else if (field.type === "file" && (!value || value.length === 0)) {
            newErrors[field.name] = `${field.label} is required`;
          }
        }

        // Additional validation for specific field types
        if (value && typeof value === "string" && value.trim() !== "") {
          switch (field.type) {
            case "email":
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                newErrors[field.name] = `Please enter a valid email address`;
              }
              break;
            case "tel":
              // Basic phone number validation (adjust regex as needed)
              const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
              if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
                newErrors[field.name] = `Please enter a valid phone number`;
              }
              break;
            case "number":
              if (isNaN(value) || value < 0) {
                newErrors[field.name] = `Please enter a valid positive number`;
              }
              break;
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const expandSectionsWithErrors = () => {
    const sectionsWithErrors = new Set();
    Object.keys(errors).forEach((fieldName) => {
      formSections.forEach((section, index) => {
        if (section.fields.some((field) => field.name === fieldName)) {
          sectionsWithErrors.add(index);
        }
      });
    });

    setExpandedSections((prev) => {
      const updated = { ...prev };
      sectionsWithErrors.forEach((index) => {
        updated[index] = true;
      });
      return updated;
    });
  };

  // Enhanced data preparation for submission
  const prepareFormDataForSubmission = () => {
    const formDataToSubmit = new FormData();

    // Helper function to append nested data to FormData
    const appendFormData = (data, parentKey = "") => {
      Object.keys(data).forEach((key) => {
        const value = data[key];
        const formKey = parentKey ? `${parentKey}.${key}` : key;

        if (value !== null && value !== undefined && value !== "") {
          if (value instanceof File) {
            // Handle single file
            formDataToSubmit.append(formKey, value);
          } else if (Array.isArray(value)) {
            if (value.length > 0) {
              if (value[0] instanceof File) {
                // ✅ Append each file with the same key (no index)
                value.forEach((file) => {
                  formDataToSubmit.append(formKey, file);
                });
              } else {
                // Handle arrays of non-files (e.g., multiselect)
                value.forEach((item, index) => {
                  formDataToSubmit.append(`${formKey}[${index}]`, item);
                });
              }
            }
          } else if (
            typeof value === "object" &&
            value.constructor === Object
          ) {
            appendFormData(value, formKey);
          } else {
            formDataToSubmit.append(formKey, value.toString());
          }
        }
      });
    };

    appendFormData(formData);
    return formDataToSubmit;
  };

  const handleSubmit = async () => {
    try {
      // Reset submit status
      setSubmitStatus(null);

      // Validate form
      if (!validateForm()) {
        expandSectionsWithErrors();
        setSubmitStatus("error");
        return {
          success: false,
          message:
            "Please fill in all required fields and fix validation errors.",
          errors: errors,
        };
      }

      setLoading(true);

      // Prepare form data
      const formDataToSubmit = prepareFormDataForSubmission();

      // Log form data for debugging (optional)
      console.log("Submitting form data:");
      for (let [key, value] of formDataToSubmit.entries()) {
        console.log(key, value);
      }

      // Submit to backend
      const response = await postRequest("properties", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form submitted successfully:", response);
      setSubmitStatus("success");
      toast.success("Property created successfully!");
      router.push("/properties"); // Redirect to properties list

      return {
        success: true,
        message: "Property information submitted successfully!",
        data: response,
      };
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to add property!"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({});
    setErrors({});
    setSubmitStatus(null);
  };

  const resetForm = () => {
    clearForm();
    // Reset expanded sections to default
    setExpandedSections(
      formSections.reduce((acc, section, index) => {
        acc[index] = section.defaultExpanded;
        return acc;
      }, {})
    );
  };

  // Progress tracking utilities
  const getTotalFields = () => {
    return formSections.reduce(
      (total, section) => total + section.fields.length,
      0
    );
  };

  const getFilledFields = () => {
    let filled = 0;
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        const value = getNestedValue(formData, field.name);
        if (value && value.toString().trim() !== "") {
          filled++;
        }
      });
    });
    return filled;
  };

  const getProgressPercentage = () => {
    const total = getTotalFields();
    const filled = getFilledFields();
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };

  const getSectionErrors = (section) => {
    return section.fields.filter((field) => errors[field.name]).length;
  };

  const getSectionProgress = (section) => {
    const totalFields = section.fields.length;
    const filledFields = section.fields.filter((field) => {
      const value = getNestedValue(formData, field.name);
      return value && value.toString().trim() !== "";
    }).length;

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  // Check if form has unsaved changes
  const hasUnsavedChanges = () => {
    return Object.keys(formData).length > 0 && submitStatus !== "success";
  };

  return {
    // State
    formData,
    errors,
    loading,
    expandedSections,
    submitStatus,

    // Actions
    handleInputChange,
    handleSubmit,
    clearForm,
    resetForm,
    toggleSection,

    // Utilities
    getNestedValue,
    getTotalFields,
    getFilledFields,
    getProgressPercentage,
    getSectionErrors,
    getSectionProgress,
    hasUnsavedChanges,

    // Data
    formSections,
  };
};
