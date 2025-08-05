import Button from "../../../../components/ui/atoms/Button";


export const FormActions = ({ 
  filledFields, 
  totalFields, 
  onClearForm, 
  onSubmit, 
  loading 
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div className="text-sm text-gray-600">
        {/* <span className="font-medium">{filledFields}</span> of <span className="font-medium">{totalFields}</span> fields completed */}
      </div>
      
      <div className="flex space-x-4">
        <Button
        text={"Clear Form"}
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onClearForm}
          disabled={loading}
        />
        <Button
          text="Submit"
          className="md:!w-36 z-50"
          type="submit"
          loading={loading}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};