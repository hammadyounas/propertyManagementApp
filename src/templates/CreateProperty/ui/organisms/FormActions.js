import Button from "../../../../components/ui/atoms/Button";

export const FormActions = ({ 
  filledFields, 
  totalFields, 
  onClearForm, 
  onSubmit, 
  loading,
  inputType = "manual",
  csvData = null,
  csvErrors = [],
  submitDisabled = false
}) => {
  // Manual form actions
  if (inputType === "manual") {
    return (
      <div className="flex justify-between items-center max-sm:flex-col pt-6 border-t">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{filledFields}</span> of{" "}
          <span className="font-medium">{totalFields}</span> fields completed
        </div>
        
        <div className="flex space-x-4 mt-2">
          <Button
            text="Clear Form"
            type="button"
            className="px-6 py-2 whitespace-nowrap border border-gray-300 rounded-md text-gray-700 hover:border-primary-default hover:bg-transparent hover:text-primary-default focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onClick={onClearForm}
            disabled={loading}
          />
          <Button
            text="Submit"
            className="md:!w-36 z-50 whitespace-nowrap border hover:border-primary-default hover:bg-transparent hover:text-primary-default focus:ring-2 focus:ring-yellow-500"
            type="submit"
            loading={loading}
            onClick={onSubmit}
            disabled={submitDisabled}
          />
        </div>
      </div>
    );
  }

  // CSV upload actions
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div className="text-sm text-gray-600">
        {csvData && csvData.length > 0 ? (
          <span>
            <span className="font-medium text-green-600">{csvData.length}</span>{" "}
            properties ready to upload
          </span>
        ) : (
          <span>Upload a CSV file to continue</span>
        )}
      </div>
      
      <div className="flex space-x-4">
        <Button
          text="Clear"
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-primary-default hover:bg-transparent hover:text-primary-default focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onClick={onClearForm}
          disabled={loading}
        />
        <Button
          text={`Upload ${csvData?.length || 0} Properties`}
          className="md:!w-auto z-50 border hover:border-primary-default hover:bg-transparent hover:text-primary-default focus:ring-2 focus:ring-yellow-500"
          type="submit"
          loading={loading}
          onClick={onSubmit}
          disabled={!csvData || csvData.length === 0 || csvErrors.length > 0 || submitDisabled}
        />
      </div>
    </div>
  );
};