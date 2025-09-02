export const ProgressBar = ({ 
  filledFields, 
  totalFields, 
  progressPercentage 
}) => {
  return (
    <div className="mb-8">
      <p className="text-xl text-gray-900 mb-2">Create Property</p>
      {/* <p className="text-gray-600 mb-4">Fill in the property details below. All fields from your schema are included.</p> */}
      
      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-gray-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        Progress: {filledFields} of {totalFields} fields completed ({progressPercentage}%)
      </p>
    </div>
  );
};