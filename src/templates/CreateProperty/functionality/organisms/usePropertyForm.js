import { useState, useEffect } from "react";
import { formSections } from "../constants/form_data";
import { postRequest } from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { csvHeaderMap } from "../constants/data";
import { useAutoSave } from "../../../../hooks/useAutoSave";

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
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, message: '' });
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();

  // Auto-save functionality
  const {
    lastSaved,
    isSaving,
    hasUnsavedChanges: autoSaveHasUnsavedChanges,
    autoSaveEnabled,
    saveToStorage,
    loadFromStorage,
    clearAutoSave,
    setAutoSaveEnabled,
    getAutoSaveStatus,
    isLocalStorageAvailable
  } = useAutoSave(formData, inputType);

  // Initialize auto-save and restore data on component mount
  useEffect(() => {
    if (!isInitialized && inputType === 'manual') {
      const savedData = loadFromStorage();
      if (savedData && Object.keys(savedData).length > 0) {
        setFormData(savedData);
        toast.info('Restored previous form data', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
      setIsInitialized(true);
    }
  }, [isInitialized, inputType, loadFromStorage]);

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
    const requiredHeaders = [];
    const optionalHeaders = [];

    console.log('📋 Generating CSV template...');
    console.log('📊 Available CSV headers:', Object.keys(csvHeaderMap));

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === "file") return; // Exclude file fields

        // Only include fields that have CSV header mappings
        const hasHeaderMapping = Object.values(csvHeaderMap).includes(field.name);
        if (hasHeaderMapping) {
          // Find the CSV header for this field
          const headerLabel = Object.keys(csvHeaderMap).find(
            (key) => csvHeaderMap[key] === field.name
          );
          if (headerLabel) {
            if (field.required) {
              requiredHeaders.push(headerLabel);
            } else {
              optionalHeaders.push(headerLabel);
            }
          }
        } else {
          console.warn(`⚠️  Field "${field.name}" has no CSV header mapping`);
        }
      });
    });

    // Sort headers: required first, then optional
    headers.push(...requiredHeaders.sort());
    headers.push(...optionalHeaders.sort());

    console.log('📋 Required headers:', requiredHeaders);
    console.log('📋 Optional headers:', optionalHeaders);
    console.log('📋 All headers:', headers);

    const csv = Papa.unparse([headers]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "property_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateCsvHeaders = (headers) => {
    const requiredFields = [];
    const optionalFields = [];

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === "file") return; // Exclude file fields

        // Only include fields that have CSV header mappings
        const hasHeaderMapping = Object.values(csvHeaderMap).includes(field.name);
        if (!hasHeaderMapping) return;

        // Find the CSV header name for this field
        const csvHeaderName = Object.keys(csvHeaderMap).find(
          (key) => csvHeaderMap[key] === field.name
        );

        if (csvHeaderName) {
          if (field.required) {
            requiredFields.push(csvHeaderName); // Use CSV header name
          } else {
            optionalFields.push(csvHeaderName); // Use CSV header name
          }
        }
      });
    });

    const missingRequired = requiredFields.filter(
      (field) => !headers.includes(field)
    );

    return {
      isValid: missingRequired.length === 0, // Only check for missing required fields
      missingRequired,
      invalidHeaders: [], // Always empty - we allow unknown columns
      requiredFields,
      optionalFields,
    };
  };

  const validateCsvRow = (row, rowIndex) => {
    const rowErrors = [];
    const warnings = [];
    
    // Get all form fields for validation
    const allFields = [];
    formSections.forEach(section => {
      allFields.push(...section.fields);
    });
    
    allFields.forEach(field => {
      if (field.type === 'file') return; // Skip file fields
      
      // Find the CSV header that maps to this field
      const headerLabel = Object.keys(csvHeaderMap).find(
        key => csvHeaderMap[key] === field.name
      );
      
      // If no header mapping exists, skip validation for this field
      if (!headerLabel) {
        if (field.required) {
          warnings.push({
            field: field.name,
            message: `Required field ${field.name} has no CSV header mapping`,
            type: 'warning'
          });
        }
        return;
      }
      
      // Read value from CSV row using the header label
      const rawValue = row[headerLabel];
      const value = typeof rawValue === 'string' ? rawValue.trim() : rawValue;
      
      // Check required fields
      if (field.required) {
        if (value === undefined || value === null || value === '') {
          rowErrors.push({
            field: field.name,
            header: headerLabel,
            message: `${headerLabel} is required but empty or missing`,
            row: rowIndex + 1,
            severity: 'error'
          });
        }
      }
      
      // Additional validation for specific field types (only if value exists)
      if (value && value.toString().trim() !== '') {
        switch (field.type) {
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              rowErrors.push({
                field: field.name,
                header: headerLabel,
                message: `Invalid email format in ${headerLabel}: "${value}"`,
                row: rowIndex + 1,
                severity: 'error'
              });
            }
            break;
          case 'number':
            if (isNaN(value)) {
              rowErrors.push({
                field: field.name,
                header: headerLabel,
                message: `${headerLabel} must be a valid number, got: "${value}"`,
                row: rowIndex + 1,
                severity: 'error'
              });
            }
            break;
          case 'tel':
            // Basic phone validation - adjust regex as needed
            const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
              rowErrors.push({
                field: field.name,
                header: headerLabel,
                message: `Invalid phone number format in ${headerLabel}: "${value}"`,
                row: rowIndex + 1,
                severity: 'error'
              });
            }
            break;
          case 'url':
            try {
              new URL(value);
            } catch {
              rowErrors.push({
                field: field.name,
                header: headerLabel,
                message: `Invalid URL format in ${headerLabel}: "${value}"`,
                row: rowIndex + 1,
                severity: 'error'
              });
            }
            break;
        }
      }
    });
    
    if (warnings.length > 0) {
      console.warn(`Row ${rowIndex + 1} warnings:`, warnings);
    }
    
    return rowErrors;
  };

  // FIXED: Enhanced transformation function with proper type checking
  const transformCsvDataForSubmission = (csvRows) => {
    console.log('🚀 Starting CSV transformation...');
    console.log('📊 CSV Headers available:', Object.keys(csvHeaderMap));
    console.log('📋 CSV Header mapping:', csvHeaderMap);
    
    const transformedData = csvRows.map((row, rowIndex) => {
      const transformedRow = {};
      
      console.log(`🔄 Processing row ${rowIndex + 1}:`, row);
      console.log(`📋 Available headers in row:`, Object.keys(row));
      
      // Transform CSV row data back to form field names
      Object.keys(csvHeaderMap).forEach((csvHeader) => {
        const fieldName = csvHeaderMap[csvHeader];
        const value = row[csvHeader];
        
        console.log(`  📝 Mapping "${csvHeader}" -> "${fieldName}" = "${value}" (type: ${typeof value})`);
        
        // Skip undefined, null, or empty string values
        if (value === undefined || value === null || value === '') {
          console.log(`    ⏭️  Skipping empty value for "${fieldName}"`);
          return;
        }
        
        // Clean the value based on expected type
        let cleanValue = value;
        
        // Handle string values
        if (typeof value === 'string') {
          cleanValue = value.trim();
          
          // Skip if still empty after trimming
          if (cleanValue === '') {
            console.log(`    ⏭️  Skipping empty trimmed value for "${fieldName}"`);
            return;
          }
          
          // Try to convert numeric strings to numbers
          if (!isNaN(cleanValue) && cleanValue !== '') {
            const numValue = parseFloat(cleanValue);
            if (!isNaN(numValue)) {
              cleanValue = numValue;
              console.log(`    🔢 Converted to number: ${cleanValue}`);
            }
          }
        }
        
        // FIXED: Handle boolean strings with proper type checking
        if (typeof cleanValue === 'string') {
          const lowerValue = cleanValue.toLowerCase();
          if (lowerValue === 'true') {
            cleanValue = true;
            console.log(`    ✅ Converted to boolean: ${cleanValue}`);
          } else if (lowerValue === 'false') {
            cleanValue = false;
            console.log(`    ❌ Converted to boolean: ${cleanValue}`);
          }
        }
        
        // Handle nested field names (e.g., "revenue.residential.yearly")
        if (fieldName.includes('.')) {
          const keys = fieldName.split('.');
          let current = transformedRow;
          
          for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key]) {
              current[key] = {};
            }
            current = current[key];
          }
          
          current[keys[keys.length - 1]] = cleanValue;
          console.log(`    📁 Set nested field "${fieldName}" = ${cleanValue}`);
        } else {
          transformedRow[fieldName] = cleanValue;
          console.log(`    📄 Set field "${fieldName}" = ${cleanValue}`);
        }
      });
      
      console.log(`✅ Transformed row ${rowIndex + 1}:`, transformedRow);
      console.log(`📋 Final keys in transformed row:`, Object.keys(transformedRow));
      
      return transformedRow;
    });
    
    console.log('✅ Final transformed data:', transformedData);
    console.log('📊 Summary of transformed data:', {
      totalRows: transformedData.length,
      firstRowKeys: transformedData[0] ? Object.keys(transformedData[0]) : [],
      firstRowValues: transformedData[0] ? Object.values(transformedData[0]) : []
    });
    
    return transformedData;
  };

  const handleCsvUpload = async (file) => {
    setCsvProcessing(true);
    setCsvFile(file);
    setCsvErrors([]);
    setCsvData(null);
    setCsvPreview(null);
    
    console.log('📤 Starting CSV upload process...');
    console.log('📁 File details:', {
      name: file.name,
      size: file.size,
      type: file.type
    });
    
              return new Promise((resolve) => {
                Papa.parse(file, {
           header: true,
           skipEmptyLines: true,
           dynamicTyping: false, // Keep as strings initially for better control
           transformHeader: (header) => {
             // Clean headers by trimming whitespace
             return header.trim();
           },
           // Make parsing more lenient to handle missing fields
           error: (error) => {
             console.warn('⚠️ Papa Parse warning (continuing):', error.message);
           },
           // Use more lenient parsing options
           fastMode: false,
           // Add these options to handle missing fields gracefully
           transform: (value, field) => {
             // Return empty string for undefined/null values to maintain column count
             return value === undefined || value === null ? '' : value;
           },
           complete: (results) => {
                     console.log('📊 Papa Parse Results:', results);
           
           const { data, errors: parseErrors, meta } = results;
           
           // Handle missing fields by padding rows to match header count
           if (meta.fields && data.length > 0) {
             const expectedFieldCount = meta.fields.length;
             console.log(`📊 Expected field count: ${expectedFieldCount}`);
             
             data.forEach((row, rowIndex) => {
               const actualFieldCount = Object.keys(row).length;
               console.log(`📊 Row ${rowIndex + 1} has ${actualFieldCount} fields`);
               
               // Pad missing fields with empty strings
               meta.fields.forEach(field => {
                 if (!(field in row)) {
                   row[field] = '';
                   console.log(`📝 Added missing field "${field}" to row ${rowIndex + 1}`);
                 }
               });
             });
           }
          
                     // Filter out "Too few fields" errors for optional fields
           const criticalErrors = parseErrors.filter(err => {
             // Allow "Too few fields" errors to pass through - they're handled by padding
             if (err.message.includes('Too few fields')) {
               console.warn(`⚠️  Row ${err.row + 1}: ${err.message} - will be handled by padding`);
               return false; // Don't treat this as a critical error
             }
             return true; // Keep other errors as critical
           });
           
           if (criticalErrors.length > 0) {
             console.error('❌ Critical parse errors:', criticalErrors);
             setCsvErrors(
               criticalErrors.map((err) => ({
                 type: 'parse',
                 message: `Parse error at row ${err.row + 1}: ${err.message}`,
                 severity: 'error'
               }))
             );
             setCsvProcessing(false);
             resolve(false);
             return;
           }
          
          console.log('📋 CSV Headers found:', meta.fields);
          console.log('📝 Sample data (first 3 rows):', data.slice(0, 3));
          
          // Detailed data inspection
          if (data.length > 0) {
            console.group('🔍 Detailed CSV Data Inspection');
            const firstRow = data[0];
            console.log('📄 First row raw data:', firstRow);
            
            // Check which required fields have values
            const headerValidation = validateCsvHeaders(meta.fields);
            const requiredFieldStatus = {};
            headerValidation.requiredFields.forEach(reqField => {
              const value = firstRow[reqField];
              requiredFieldStatus[reqField] = {
                value: value,
                hasValue: value !== undefined && value !== null && value !== '',
                type: typeof value
              };
            });
            console.log('📋 Required fields status:', requiredFieldStatus);
            
            // Find empty/missing required fields
            const emptyRequiredFields = headerValidation.requiredFields.filter(field => {
              const value = firstRow[field];
              return value === undefined || value === null || value === '';
            });
            
            if (emptyRequiredFields.length > 0) {
              console.warn('⚠️  Empty required fields found:', emptyRequiredFields);
            }
            
            console.groupEnd();
          }
          
          // Validate headers
          const headerValidation = validateCsvHeaders(meta.fields);
          console.log('🔍 Header validation:', headerValidation);
          
          if (!headerValidation.isValid) {
            const headerErrors = [];
            if (headerValidation.missingRequired.length > 0) {
              headerErrors.push({
                type: 'header',
                message: `Missing required columns: ${headerValidation.missingRequired.join(', ')}`,
                severity: 'error',
                details: {
                  missing: headerValidation.missingRequired,
                  available: meta.fields,
                  required: headerValidation.requiredFields
                },
                help: `Please ensure your CSV file includes all required columns. You can download a template or sample file to see the correct format.`
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
          
          console.log(`🔄 Validating ${data.length} rows...`);
          
          data.forEach((row, index) => {
            const rowErrors = validateCsvRow(row, index);
            if (rowErrors.length > 0) {
              console.error(`❌ Row ${index + 1} errors:`, rowErrors);
              allRowErrors.push(...rowErrors);
            } else {
              validRows.push(row);
            }
          });
          
          if (allRowErrors.length > 0) {
            console.error('❌ Total validation errors:', allRowErrors.length);
            setCsvErrors(allRowErrors);
            setCsvProcessing(false);
            resolve(false);
            return;
          }
          
          // Transform CSV data for submission
          console.log('🔄 Transforming data for submission...');
          const transformedData = transformCsvDataForSubmission(validRows);
          
          // Final validation of transformed data
          console.log('🔍 Final validation of transformed data...');
          const transformedErrors = [];
          
          transformedData.forEach((item, index) => {
            console.log(`🔍 Validating transformed item ${index + 1}:`, item);
            
            // Check required fields in transformed data
            formSections.forEach(section => {
              section.fields.forEach(field => {
                if (field.required && field.type !== 'file') {
                  const value = getNestedValue(item, field.name);
                  console.log(`  📋 Checking required field "${field.name}":`, value);
                  
                  if (!value || (typeof value === 'string' && value.trim() === '')) {
                    console.error(`    ❌ Missing required field "${field.name}" in row ${index + 1}`);
                    transformedErrors.push({
                      type: 'transformation',
                      message: `Row ${index + 1}: Required field '${field.name}' is missing or empty after transformation`,
                      field: field.name,
                      row: index + 1,
                      severity: 'error'
                    });
                  } else {
                    console.log(`    ✅ Required field "${field.name}" is present:`, value);
                  }
                }
              });
            });
          });
          
          if (transformedErrors.length > 0) {
            console.error('❌ Transformation validation errors:', transformedErrors);
            const enhancedErrors = transformedErrors.map(error => ({
              ...error,
              help: `The field "${error.field}" is required but was not found in your CSV data. Please ensure this field is included in your CSV file with a valid value.`
            }));
            setCsvErrors(enhancedErrors);
            setCsvProcessing(false);
            resolve(false);
            return;
          }
          
          // If all validation passes
          setCsvData(transformedData);
          setCsvPreview(validRows.slice(0, 5)); // Show first 5 rows as preview
          setCsvProcessing(false);
          
          console.log('✅ CSV processing completed successfully!');
          console.log(`📊 Summary: ${validRows.length} properties ready for upload`);
          
          toast.success(
            `CSV processed successfully! ${validRows.length} properties ready for upload.`
          );
          resolve(true);
        },
        error: (error) => {
          console.error('❌ Papa Parse error:', error);
          setCsvErrors([
            {
              type: 'parse',
              message: `Failed to parse CSV: ${error.message}`,
              severity: 'error'
            },
          ]);
          setCsvProcessing(false);
          resolve(false);
        },
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
              const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
              if (!phoneRegex.test(value)) {
                newErrors[field.name] = `Please enter a valid phone number`;
              }
              break;
            case "number":
              if (isNaN(value) || parseFloat(value) < 0) {
                newErrors[field.name] = `Please enter a valid positive number`;
              }
              break;
            case "url":
              try {
                new URL(value);
              } catch {
                newErrors[field.name] = `Please enter a valid URL`;
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
                // Append each file with the same key (no index)
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
      setSubmitStatus(null);
      
      if (!validateForm()) {
        if (inputType === 'manual') {
          expandSectionsWithErrors();
        }
        setSubmitStatus('error');
        return {
          success: false,
          message: inputType === 'csv' 
            ? 'Please upload a valid CSV file with property data.' 
            : 'Please fill in all required fields and fix validation errors.',
          errors: inputType === 'csv' ? csvErrors : errors,
        };
      }
      
      setLoading(true);
      
      if (inputType === 'csv') {
        console.log('🚀 Submitting CSV data...');
        console.log('📊 Payload preview:', {
          propertiesCount: csvData.length,
          firstProperty: csvData[0],
          sampleFields: Object.keys(csvData[0] || {})
        });
        
        // Final payload validation
        const payloadValidation = csvData.every((property, index) => {
          const missingFields = [];
          
          console.log(`🔍 Final payload validation for property ${index + 1}:`, property);
          
          // Check each required field
          formSections.forEach(section => {
            section.fields.forEach(field => {
              if (field.required && field.type !== 'file') {
                const value = getNestedValue(property, field.name);
                console.log(`  📋 Checking required field "${field.name}":`, value);
                
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                  console.error(`    ❌ Missing required field "${field.name}"`);
                  missingFields.push(field.name);
                } else {
                  console.log(`    ✅ Required field "${field.name}" is present:`, value);
                }
              }
            });
          });
          
          if (missingFields.length > 0) {
            console.error(`❌ Property ${index + 1} missing fields:`, missingFields);
            return false;
          }
          
          console.log(`✅ Property ${index + 1} validation passed`);
          return true;
        });
        
        if (!payloadValidation) {
          throw new Error('Final payload validation failed. Check console for details.');
        }
        
        // Log the exact payload being sent
        const payload = {
          properties: csvData,
        };
        
        console.log('📤 Sending payload to backend:', JSON.stringify(payload, null, 2));
        console.log('📊 Payload structure:', {
          hasProperties: !!payload.properties,
          propertiesCount: payload.properties?.length,
          firstPropertyKeys: payload.properties?.[0] ? Object.keys(payload.properties[0]) : [],
          firstPropertyValues: payload.properties?.[0] ? Object.values(payload.properties[0]) : []
        });
        
        // Send properties one by one (individual submissions)
        console.log('🔄 Sending properties one by one...');
        const results = [];
        let successCount = 0;
        let failureCount = 0;
        const errors = [];
        
        // Initialize progress
        setUploadProgress({ current: 0, total: csvData.length, message: 'Starting upload...' });
        
        for (let i = 0; i < csvData.length; i++) {
          try {
            // Update progress
            setUploadProgress({ 
              current: i + 1, 
              total: csvData.length, 
              message: `Uploading property ${i + 1} of ${csvData.length}...` 
            });
            
            console.log(`📤 Sending property ${i + 1}/${csvData.length}:`, csvData[i]);
            
            const propertyResponse = await postRequest(
              'properties',
              csvData[i], // Send individual property
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            
            results.push(propertyResponse);
            successCount++;
            console.log(`✅ Property ${i + 1} sent successfully`);
            
          } catch (error) {
            console.error(`❌ Failed to send property ${i + 1}:`, error.message);
            failureCount++;
            errors.push({
              propertyIndex: i + 1,
              propertyData: csvData[i],
              error: error.message,
              response: error?.response?.data
            });
            
            // Continue with next property instead of stopping
            console.log(`⚠️  Continuing with next property...`);
          }
        }
        
                 // Clear progress
         setUploadProgress({ current: 0, total: 0, message: '' });
         
         const response = { 
           success: true, 
           data: results,
           summary: {
             total: csvData.length,
             success: successCount,
             failed: failureCount,
             errors: errors
           }
         };
        
        // Show appropriate message based on results
        if (failureCount === 0) {
          toast.success(`${successCount} properties created successfully!`);
        } else if (successCount === 0) {
          throw new Error(`Failed to create any properties. ${failureCount} properties failed.`);
        } else {
          toast.warning(`${successCount} properties created, ${failureCount} failed. Check console for details.`);
        }
        
        console.log('✅ Individual properties submitted successfully:', response);
        setSubmitStatus('success');
        clearAutoSave(); // Clear auto-save data after successful submission
        router.push('/properties');
        
        return {
          success: true,
          message: `Properties uploaded successfully! ${response.summary.success} created, ${response.summary.failed} failed.`,
          data: response,
        };
      } else {
        // Handle manual single property creation
        const formDataToSubmit = prepareFormDataForSubmission();
        
        const response = await postRequest('properties', formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        toast.success('Property created successfully!');
        console.log('✅ Form submitted successfully:', response);
        setSubmitStatus('success');
        clearAutoSave(); // Clear auto-save data after successful submission
        router.push('/properties');
        
        return {
          success: true,
          message: 'Property information submitted successfully!',
          data: response,
        };
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status
      });
      
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          (inputType === 'csv' 
                            ? 'Failed to upload properties!' 
                            : 'Failed to add property!');
      
      toast.error(errorMessage);
      setSubmitStatus('error');
      
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
    clearAutoSave(); // Clear auto-save data when form is cleared
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

  // Get CSV validation summary
  const getCsvValidationSummary = () => {
    if (!csvFile) return null;

    return {
      fileName: csvFile.name,
      fileSize: (csvFile.size / 1024).toFixed(2) + " KB",
      totalRows: csvData ? csvData.length : 0,
      errorCount: csvErrors.length,
      hasErrors: csvErrors.length > 0,
      isProcessing: csvProcessing,
    };
  };

  // Get required CSV headers for validation
  const getRequiredCsvHeaders = () => {
    const requiredHeaders = [];
    
    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required && field.type !== "file") {
          const headerLabel = Object.keys(csvHeaderMap).find(
            (key) => csvHeaderMap[key] === field.name
          );
          if (headerLabel) {
            requiredHeaders.push(headerLabel);
          }
        }
      });
    });
    
    return requiredHeaders.sort();
  };

  // Get all available CSV headers
  const getAllCsvHeaders = () => {
    return Object.keys(csvHeaderMap).sort();
  };

     // Download sample CSV with example data
   const downloadSampleCsv = () => {
     // Use the comprehensive sample data from the fixed CSV file
     const sampleData = [
       {
         "Property Title": "Downtown Luxury Apartments",
         "Property Type": "residential",
         "Property Status": "available",
         "Ownership Status": "freehold",
         "Number of Units": "24",
         "Description": "Premium residential complex with modern amenities in the heart of downtown",
         "Address": "1234 Main Street",
         "Street Number": "1234",
         "Street Name": "Main Street",
         "Cadastral Number": "ABC123456",
         "City": "Montreal",
         "Municipality": "Quebec",
         "Price": "2500000",
         "Unit Size": "1200",
         "Owner Name": "John Smith",
         "Phone Number": "+1-514-555-0123",
         "Email": "john.smith@email.com",
         "Owner Address": "456 Owner Street Montreal QC",
         "Contract Type": "sale",
         "Location Map URL": "https://maps.google.com/1234-main-street",
         "Year Built": "2018",
         "Building Type": "apartment",
         "Construction Type": "concrete",
         "Building Stories": "12",
         "Land Area": "5000",
         "Number of Garages": "2",
         "Number of Parking Places": "15",
         "Parking Surface": "paved",
         "Responsibility of Heating": "tenant",
         "Heating System": "forced air",
         "Responsible of Hot Water": "tenant",
         "Hot Water System": "electric",
         "Responsibility of Appliances": "tenant",
         "Electrical Panels": "200 amp",
         "Plumbing": "copper",
         "Washer/Dryer Installation": "included",
         "Laundry": "included",
         "Condition of Roof": "excellent",
         "Condition of Kitchens": "excellent",
         "Condition of Bathrooms": "excellent",
         "Condition of Flooring": "excellent",
         "Condition of Balconies": "excellent",
         "Condition of Doors": "excellent",
         "Condition of Windows": "excellent",
         "Siding": "vinyl",
         "Intercom System": "yes",
         "Fire Alarm System": "yes",
         "Janitor Agreement": "yes",
         "Environmental Study": "yes",
         "Environmental Study Date": "2023-01-15",
         "Rooftop Year": "2020",
         "Furnace/Hot Water Tank Year": "2019",
         "Other Expenditures": "Roof replacement and HVAC upgrade",
         "Municipal Assessment Land": "150000",
         "Municipal Assessment Building": "800000",
         "Total Municipal Evaluation": "950000",
         "Residential Yearly": "480000",
         "Residential Percentage GR": "80",
         "Residential Monthly Per Unit": "1667",
         "Commercial Yearly": "120000",
         "Commercial Percentage GR": "20",
         "Commercial Monthly Per Unit": "500",
         "Parking Yearly": "24000",
         "Parking Percentage GR": "4",
         "Parking Monthly Per Unit": "100",
         "Laundry Yearly": "12000",
         "Laundry Percentage GR": "2",
         "Laundry Monthly Per Unit": "50",
         "Storage Yearly": "6000",
         "Storage Percentage GR": "1",
         "Storage Monthly Per Unit": "25",
         "Total Gross Income": "636000",
         "Gross Income Per Unit": "26500",
         "Vacancy/Bad Debt Assessment": "31800",
         "Vacancy/Bad Debt Percentage GR": "5",
         "Vacancy/Bad Debt Cost Per Unit": "1590",
         "Administration Assessment": "24000",
         "Administration Percentage GR": "4",
         "Administration Cost Per Unit": "1000",
         "Municipal Taxes Assessment": "36000",
         "Municipal Taxes Percentage GR": "6",
         "Municipal Taxes Cost Per Unit": "3000",
         "School Taxes Assessment": "48000",
         "School Taxes Percentage GR": "8",
         "School Taxes Cost Per Unit": "4000",
         "Insurance Assessment": "24000",
         "Insurance Percentage GR": "4",
         "Insurance Cost Per Unit": "2000",
         "Electricity Assessment": "18000",
         "Electricity Percentage GR": "3",
         "Electricity Cost Per Unit": "1500",
         "Heating Assessment": "12000",
         "Heating Percentage GR": "2",
         "Heating Cost Per Unit": "1000",
         "Snow Removal Assessment": "24000",
         "Snow Removal Percentage GR": "4",
         "Snow Removal Cost Per Unit": "2000",
         "Elevator Assessment": "36000",
         "Elevator Percentage GR": "6",
         "Elevator Cost Per Unit": "3000",
         "Equipment Rental Assessment": "24000",
         "Equipment Rental Percentage GR": "4",
         "Equipment Rental Cost Per Unit": "2000",
         "Maintenance Reserve Assessment": "18000",
         "Maintenance Reserve Percentage GR": "3",
         "Maintenance Reserve Cost Per Unit": "1500",
         "Wages/Janitor Assessment": "24000",
         "Wages/Janitor Percentage GR": "4",
         "Wages/Janitor Cost Per Unit": "2000",
         "Furniture Reserve Assessment": "18000",
         "Furniture Reserve Percentage GR": "3",
         "Furniture Reserve Cost Per Unit": "1500",
         "Total Expenses": "318000",
         "Total Expenses Per Unit": "13250",
         "Net Income": "318000",
         "Net Income Per Unit": "13250",
         "Cap Rate": "5.2",
         "Gross Income Multiplier": "7.9",
         "Suggested Market Price": "2500000",
         "Price Per Unit": "104167",
         "CMHC Loan Option Institution": "Royal Bank",
         "CMHC Loan Option Rate": "4.5",
         "CMHC Loan Option Amortization": "25",
         "CMHC Loan Option Term": "5",
         "CMHC Loan Option Amount": "1750000",
         "CMHC Loan Option Down Payment": "750000",
         "Current Mortgage Institution": "TD Bank",
         "Current Mortgage Rate": "5.2",
         "Current Mortgage Amortization": "25",
         "Current Mortgage Term": "5",
         "Current Mortgage Loan Amount": "2000000",
         "Current Mortgage Down Payment": "500000",
         "Net Income - Current Mortgage": "318000",
         "Net Income - CMHC Loan Option": "318000",
         "Annual Mortgage Cost - Current Mortgage": "104000",
         "Annual Mortgage Cost - CMHC Loan Option": "78750",
         "Net Cash After Mortgage - Current Mortgage": "214000",
         "Net Cash After Mortgage - CMHC Loan Option": "239250",
         "Cash on Cash Return - Current Mortgage": "8.6",
         "Cash on Cash Return - CMHC Loan Option": "9.6",
         "Cash Plus Principal - Current Mortgage": "318000",
         "Cash Plus Principal - CMHC Loan Option": "318000",
         "IRR with Market Appreciation - Current Mortgage": "12.7",
         "IRR with Market Appreciation - CMHC Loan Option": "12.7",
         "Broker": "6751c0fbacb35ae00dd7d485",
         "Other Information": "Prime location with excellent rental potential"
       }
     ];

    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sample_property_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
     uploadProgress,

    // Actions
    handleInputChange,
    handleSubmit,
    clearForm,
    resetForm,
    toggleSection,
    handleInputTypeChange,
    handleCsvUpload,
    generateCsvTemplate,
    downloadSampleCsv,

    // Utilities
    getNestedValue,
    getTotalFields,
    getFilledFields,
    getProgressPercentage,
    getSectionErrors,
    getSectionProgress,
    hasUnsavedChanges,
    validateForm,
    getCsvValidationSummary,
    getRequiredCsvHeaders,
    getAllCsvHeaders,

    // Auto-save functionality
    lastSaved,
    isSaving,
    hasUnsavedChanges: autoSaveHasUnsavedChanges,
    autoSaveEnabled,
    saveToStorage,
    loadFromStorage,
    clearAutoSave,
    setAutoSaveEnabled,
    getAutoSaveStatus,
    isLocalStorageAvailable,

    // Data
    formSections,
  };
};