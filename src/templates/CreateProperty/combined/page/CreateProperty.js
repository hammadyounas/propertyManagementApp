import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import { X, Upload, Download, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { Icon } from "@iconify/react";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import { ProgressBar } from "../../../../components/ui/atoms/ProgressBar";
import { usePropertyForm } from "../../functionality/organisms/usePropertyForm";
import { FormActions } from "../../ui/organisms/FormActions";
import { FormSection } from "../../ui/organisms/FormSections";
import { AutoSaveStatus } from "../../../../components/ui/molecules/AutoSaveStatus";

const CreatePropertyPage = () => {
  const {
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
  } = usePropertyForm();

  const totalFields = getTotalFields();
  const filledFields = getFilledFields();
  const progressPercentage = getProgressPercentage();

  // CSV Upload handlers
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type === "text/csv" || file.name.endsWith(".csv")) {
          handleCsvUpload(file);
        } else {
          toast.error("Please upload a valid CSV file");
        }
      }
    },
    [handleCsvUpload]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    disabled: loading || csvProcessing,
  });

  const handleRemoveCSV = () => {
    // Clear CSV data and reset
    clearForm();
  };

  // Auto-save handlers
  const handleManualSave = () => {
    saveToStorage();
  };

  const handleToggleAutoSave = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
  };

  const handleRestoreData = () => {
    const savedData = loadFromStorage();
    if (savedData && Object.keys(savedData).length > 0) {
      // This will be handled by the usePropertyForm hook's useEffect
      toast.info('Data restored from auto-save', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };

  const autoSaveStatus = getAutoSaveStatus();
  const hasRestoreData = isLocalStorageAvailable && lastSaved;

  // Render CSV Upload Section
  const renderCsvUploadSection = () => (
    <div className="space-y-6">
      {/* CSV Template Download */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between max-sm:flex-col">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">CSV Template</h4>
              <p className="text-sm text-gray-700">
                Download the template to ensure your CSV has the correct format
              </p>
            </div>
          </div>
          <div className="flex max-sm:mt-2">
          <Button
            text="Download Template"
            onClick={generateCsvTemplate}
            className=" border bg-white hover:bg-primary-default text-yellow-500 border-primary-default hover:!text-white"
            icon={<Download className="h-4 w-4" />}
          />
          </div>
        </div>
      </div>

      {/* CSV Upload Area */}
      <div className="mt-6">
        <label className="block text-sm font-medium my-2">
          Upload CSV<span className="text-red-500">*</span>
        </label>
        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
          {csvData && csvData.length > 0 ? (
            <div className="relative flex items-center flex-col w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {acceptedFiles[0]?.name}
                    </p>
                    <p className="text-sm text-green-600">
                      {csvData.length} properties ready for upload
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  onClick={handleRemoveCSV}
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : csvProcessing ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
              <p className="text-sm text-gray-600">Processing CSV file...</p>
            </div>
          ) : (
            <div {...getRootProps()} className="w-full text-center">
              <input {...getInputProps()} disabled={loading} />
              <span className="text-gray-500 flex items-center justify-center gap-2">
                <Icon icon="material-symbols:upload" className="text-2xl" />
                Upload CSV
              </span>
              <p className="text-xs mt-1 text-gray-400">
                Drag & Drop or Click to Upload
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CSV Errors Display */}
      {csvErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <h4 className="text-sm font-medium text-red-800">CSV Validation Errors</h4>
          </div>
          <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
            {csvErrors.slice(0, 10).map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
            {csvErrors.length > 10 && (
              <li className="text-red-600 font-medium">
                ... and {csvErrors.length - 10} more errors
              </li>
            )}
          </ul>
        </div>
      )}

      {/* CSV Preview */}
      {csvPreview && csvPreview.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <h4 className="text-sm font-medium text-green-800">
              CSV Preview ({csvData?.length} properties)
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border border-green-200">
              <thead>
                <tr className="bg-green-100">
                  {Object.keys(csvPreview[0]).map((key) => (
                    <th key={key} className="px-3 py-2 text-left font-medium text-green-800 border-r border-green-200 last:border-r-0">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvPreview.slice(0, 3).map((row, index) => (
                  <tr key={index} className="border-t border-green-200">
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} className="px-3 py-2 text-green-700 border-r border-green-200 last:border-r-0">
                        {String(value).length > 30 
                          ? `${String(value).substring(0, 30)}...` 
                          : String(value)
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {csvPreview.length > 3 && (
              <p className="text-xs text-green-600 mt-2 text-center">
                Showing first 3 rows of {csvData.length} properties
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className="w-full bg-white" title="Create Property">
      <ToastContainer />

      <div className="space-y-6">
        {/* Auto-save status indicator - only show for manual entry */}
        {inputType === "manual" && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <AutoSaveStatus
              status={autoSaveStatus}
              onManualSave={handleManualSave}
              onToggleAutoSave={handleToggleAutoSave}
              onRestoreData={handleRestoreData}
              hasRestoreData={hasRestoreData}
            />
          </div>
        )}
        {/* Input Type Toggle - Fixed Radio Button Implementation */}
        <div className="bg-gray-100 p-1 rounded-lg w-fit">
          <div className="flex space-x-1">
            {/* Manual Entry Radio */}
            <label className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
              inputType === "manual"
                ? "bg-white text-primary-default shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}>
              <input
                type="radio"
                name="inputType"
                value="manual"
                checked={inputType === "manual"}
                onChange={(e) => handleInputTypeChange(e.target.value)}
                className="sr-only" // Hide the actual radio input
              />
              Manually
            </label>

            {/* CSV Upload Radio */}
            <label className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
              inputType === "csv"
                ? "bg-white text-primary-default shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}>
              <input
                type="radio"
                name="inputType"
                value="csv"
                checked={inputType === "csv"}
                onChange={(e) => handleInputTypeChange(e.target.value)}
                className="sr-only" // Hide the actual radio input
              />
              {/* <Icon icon="material-symbols:upload" className="mr-2 text-lg" /> */}
              CSV Upload
            </label>
          </div>
        </div>

        {/* Progress Bar - Only show for manual entry
        {inputType === "manual" && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Form Progress</span>
              <span className="text-sm text-gray-600">
                {filledFields} of {totalFields} fields completed
              </span>
            </div>
            <ProgressBar progress={progressPercentage} />
          </div>
        )} */}

        {/* Content based on input type */}
        {inputType === "manual" ? (
          // Manual Form Sections
          <div className="space-y-6">
            {formSections.map((section, index) => (
              <FormSection
                key={index}
                section={section}
                index={index}
                isExpanded={expandedSections[index]}
                onToggle={toggleSection}
                errors={errors}
                formData={formData}
                onInputChange={handleInputChange}
                getNestedValue={getNestedValue}
                getSectionErrors={getSectionErrors}
              />
            ))}
          </div>
        ) : (
          // CSV Upload Section
          renderCsvUploadSection()
        )}

        {/* Form Actions */}
        <div className="border-t pt-6">
          {inputType === "manual" ? (
            <FormActions
              filledFields={filledFields}
              totalFields={totalFields}
              onClearForm={clearForm}
              onSubmit={handleSubmit}
              loading={loading}
            />
          ) : (
            // CSV Upload Actions
            <div className="flex justify-between items-center max-sm:flex-col">
              <div className="text-sm text-gray-600 mb-2">
                {csvData ? (
                  <span>
                    <span className="font-medium text-green-600">{csvData.length}</span> properties ready to upload
                  </span>
                ) : (
                  <span>Upload a CSV file to continue</span>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Button
                  text="Clear"
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-primary-default hover:bg-transparent hover:text-primary-default"
                  onClick={clearForm}
                  disabled={loading}
                />
                <Button
                  text={`Upload ${csvData?.length || 0} Properties`}
                  className="md:!w-auto z-50 border hover:border-primary-default hover:bg-transparent hover:text-primary-default focus:ring-2 focus:ring-yellow-500 whitespace-nowrap"
                  type="submit"
                  loading={loading}
                  onClick={handleSubmit}
                  disabled={!csvData || csvData.length === 0 || csvErrors.length > 0}
                />
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-800 font-medium">
                {inputType === 'csv' 
                  ? `Successfully uploaded ${csvData?.length || 0} properties!`
                  : 'Property created successfully!'
                }
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CreatePropertyPage;