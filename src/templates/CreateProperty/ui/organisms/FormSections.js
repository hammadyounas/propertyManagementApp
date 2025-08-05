import { ChevronDown, ChevronRight } from 'lucide-react';
import { FormFieldRenderer } from './FormFieldRendered';

export const FormSection = ({ 
  section, 
  index, 
  isExpanded, 
  onToggle, 
  errors, 
  formData, 
  onInputChange, 
  getNestedValue,
  getSectionErrors 
}) => {
  const sectionErrors = getSectionErrors(section);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        type="button"
        onClick={() => onToggle(index)}
        className={`w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-gray-200 ${
          isExpanded ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
          {sectionErrors > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {sectionErrors} error{sectionErrors > 1 ? 's' : ''}
            </span>
          )}
          <span className="text-sm text-gray-500">
            ({section.fields.length} field{section.fields.length > 1 ? 's' : ''})
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-6 py-4 bg-white border-t">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {section.fields.map(field => (
              <FormFieldRenderer
                key={field.name}
                field={field}
                value={getNestedValue(formData, field.name)}
                error={errors[field.name]}
                onChange={onInputChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};