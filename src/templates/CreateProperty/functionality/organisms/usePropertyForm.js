import { useState } from "react";
import { formSections } from "../constants/form_data";
import { postRequest } from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

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
  const [inputType, setInputType] = useState("manual"); // 'manual' or 'csv'
  const [csvData, setCsvData] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [csvErrors, setCsvErrors] = useState([]);
  const [csvPreview, setCsvPreview] = useState(null);
  const [csvProcessing, setCsvProcessing] = useState(false);

  const router = useRouter();

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleInputTypeChange = (type) => {
    setInputType(type);
    // Clear form data and errors when switching modes
    setFormData({});
    setErrors({});
    setCsvData(null);
    setCsvFile(null);
    setCsvErrors([]);
    setCsvPreview(null);
    setSubmitStatus(null);
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

  // CSV Processing Functions
  const generateCsvTemplate = () => {
    const headers = [];
    
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type !== 'file') { // Exclude file fields from CSV template
          headers.push(field.name);
        }
      });
    });

    const csv = Papa.unparse([headers]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'property_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateCsvHeaders = (headers) => {
    const requiredFields = [];
    const optionalFields = [];
    
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type !== 'file') { // Exclude file fields
          if (field.required) {
            requiredFields.push(field.name);
          } else {
            optionalFields.push(field.name);
          }
        }
      });
    });

    const missingRequired = requiredFields.filter(field => !headers.includes(field));
    const invalidHeaders = headers.filter(header => 
      ![...requiredFields, ...optionalFields].includes(header)
    );

    return {
      isValid: missingRequired.length === 0 && invalidHeaders.length === 0,
      missingRequired,
      invalidHeaders,
      requiredFields,
      optionalFields
    };
  };

  const validateCsvRow = (row, rowIndex) => {
    const rowErrors = [];

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === 'file') return; // Skip file fields

        const value = row[field.name];

        // Check required fields
        if (field.required && (!value || value.trim() === "")) {
          rowErrors.push({
            field: field.name,
            message: `${field.label} is required`,
            row: rowIndex + 1
          });
        }

        // Additional validation for specific field types
        if (value && value.trim() !== "") {
          switch (field.type) {
            case "email":
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                rowErrors.push({
                  field: field.name,
                  message: `Invalid email format`,
                  row: rowIndex + 1
                });
              }
              break;
            case "tel":
              const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
              if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
                rowErrors.push({
                  field: field.name,
                  message: `Invalid phone number format`,
                  row: rowIndex + 1
                });
              }
              break;
            case "number":
              if (isNaN(value) || parseFloat(value) < 0) {
                rowErrors.push({
                  field: field.name,
                  message: `Must be a valid positive number`,
                  row: rowIndex + 1
                });
              }
              break;
          }
        }
      });
    });

    return rowErrors;
  };

  const handleCsvUpload = async (file) => {
    setCsvProcessing(true);
    setCsvFile(file);
    setCsvErrors([]);
    setCsvData(null);
    setCsvPreview(null);

    return new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const { data, errors: parseErrors, meta } = results;

          if (parseErrors.length > 0) {
            setCsvErrors(parseErrors.map(err => ({
              type: 'parse',
              message: `Parse error at row ${err.row}: ${err.message}`
            })));
            setCsvProcessing(false);
            resolve(false);
            return;
          }

          // Validate headers
          const headerValidation = validateCsvHeaders(meta.fields);
          if (!headerValidation.isValid) {
            const headerErrors = [];
            if (headerValidation.missingRequired.length > 0) {
              headerErrors.push({
                type: 'header',
                message: `Missing required columns: ${headerValidation.missingRequired.join(', ')}`
              });
            }
            if (headerValidation.invalidHeaders.length > 0) {
              headerErrors.push({
                type: 'header',
                message: `Invalid columns: ${headerValidation.invalidHeaders.join(', ')}`
              });
            }
            setCsvErrors(headerErrors);
            setCsvProcessing(false);
            resolve(false);
            return;
          }

          // Validate each row
          const allRowErrors = [];
          const validRows = [];

          data.forEach((row, index) => {
            const rowErrors = validateCsvRow(row, index);
            if (rowErrors.length > 0) {
              allRowErrors.push(...rowErrors);
            } else {
              validRows.push(row);
            }
          });

          if (allRowErrors.length > 0) {
            setCsvErrors(allRowErrors);
            setCsvProcessing(false);
            resolve(false);
            return;
          }

          // If all validation passes
          setCsvData(validRows);
          setCsvPreview(validRows.slice(0, 5)); // Show first 5 rows as preview
          setCsvProcessing(false);
          toast.success(`CSV processed successfully! ${validRows.length} properties ready for upload.`);
          resolve(true);
        },
        error: (error) => {
          setCsvErrors([{
            type: 'parse',
            message: `Failed to parse CSV: ${error.message}`
          }]);
          setCsvProcessing(false);
          resolve(false);
        }
      });
    });
  };

  const validateForm = () => {
    if (inputType === "csv") {
      return csvData && csvData.length > 0 && csvErrors.length === 0;
    }

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
        if (inputType === "manual") {
          expandSectionsWithErrors();
        }
        setSubmitStatus("error");
        return {
          success: false,
          message: inputType === "csv" 
            ? "Please upload a valid CSV file with property data."
            : "Please fill in all required fields and fix validation errors.",
          errors: inputType === "csv" ? csvErrors : errors,
        };
      }

      setLoading(true);

      if (inputType === "csv") {
        // Handle CSV bulk upload
        const response = await postRequest("properties/bulk", {
          properties: csvData
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success(`${csvData.length} properties created successfully!`);
        console.log("Bulk properties submitted successfully:", response);
        setSubmitStatus("success");
        router.push("/properties");

        return {
          success: true,
          message: `${csvData.length} properties uploaded successfully!`,
          data: response,
        };
      } else {
        // Handle manual single property creation
        const formDataToSubmit = prepareFormDataForSubmission();

        for (let [key, value] of formDataToSubmit.entries()) {
          console.log(key, value);
        }

        // Submit to backend
        const response = await postRequest("properties", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Property created successfully!");
        console.log("Form submitted successfully:", response);
        setSubmitStatus("success");
        router.push("/properties");

        return {
          success: true,
          message: "Property information submitted successfully!",
          data: response,
        };
      }
    } catch (error) {
      console.error("Error adding property:", error);
      const errorMessage = error?.response?.data?.message ||
        error?.message ||
        (inputType === "csv" ? "Failed to upload properties!" : "Failed to add property!");
      
      toast.error(errorMessage);
      setSubmitStatus("error");
      
      return {
        success: false,
        message: errorMessage,
        error: error,
      };
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({});
    setErrors({});
    setCsvData(null);
    setCsvFile(null);
    setCsvErrors([]);
    setCsvPreview(null);
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
    if (inputType === "csv") {
      return csvData && csvData.length > 0 && submitStatus !== "success";
    }
    return Object.keys(formData).length > 0 && submitStatus !== "success";
  };

  return {
    // State
    formData,
    errors,
    loading,
    expandedSections,
    submitStatus,
    inputType,
    csvData,
    csvFile,
    csvErrors,
    csvPreview,
    csvProcessing,

    // Actions
    handleInputChange,
    handleSubmit,
    clearForm,
    resetForm,
    toggleSection,
    handleInputTypeChange,
    handleCsvUpload,
    generateCsvTemplate,

    // Utilities
    getNestedValue,
    getTotalFields,
    getFilledFields,
    getProgressPercentage,
    getSectionErrors,
    getSectionProgress,
    hasUnsavedChanges,
    validateForm,

    // Data
    formSections,
  };
};