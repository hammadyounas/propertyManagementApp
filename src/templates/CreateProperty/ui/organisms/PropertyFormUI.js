
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { CustomSelect } from "../../../../components/ui/molecules/customSelect";
import { formSections } from "../../functionality/constants/form_data";
import { Textinput } from '../../../../components/ui/atoms/PropertyTextInput';
import Card from '../../../../components/combined/molecules/CardUIContainer';
import Button from '../../../../components/ui/atoms/Button';

const PropertyForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [expandedSections, setExpandedSections] = useState(
    formSections.reduce((acc, section, index) => {
      acc[index] = section.defaultExpanded;
      return acc;
    }, {})
  );

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleInputChange = (name, value) => {
    // Handle nested object paths (e.g., "revenue.residential.yearly")
    const setNestedValue = (obj, path, value) => {
      const keys = path.split('.');
      let current = obj;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {};
        }
        current = current[key];
      }
      
      current[keys[keys.length - 1]] = value;
      return { ...obj };
    };

    setFormData(prev => setNestedValue(prev, name, value));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : '';
    }, obj);
  };

  const validateForm = () => {
    const newErrors = {};
    
    formSections.forEach(section => {
      section.fields.forEach(field => {
        const value = getNestedValue(formData, field.name);
        if (field.required && (!value || value.toString().trim() === '')) {
          newErrors[field.name] = `${field.label} is required`;
        }
      });
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form Data:', JSON.stringify(formData, null, 2));
      alert('Form submitted successfully! Check console for complete data structure.');
    } else {
      alert('Please fill in all required fields.');
      // Expand sections with errors
      const sectionsWithErrors = new Set();
      Object.keys(errors).forEach(fieldName => {
        formSections.forEach((section, index) => {
          if (section.fields.some(field => field.name === fieldName)) {
            sectionsWithErrors.add(index);
          }
        });
      });
      
      setExpandedSections(prev => {
        const updated = { ...prev };
        sectionsWithErrors.forEach(index => {
          updated[index] = true;
        });
        return updated;
      });
    }
  };

  const renderField = (field) => {
    const error = errors[field.name];
    const value = getNestedValue(formData, field.name);
    
    if (field.type === 'select') {
      return (
        <div key={field.name} className="mb-4">
          <CustomSelect
            label={field.label}
            options={field.options}
            placeholder={field.placeholder}
            value={value}
            onChange={(val) => handleInputChange(field.name, val)}
            error={error}
            required={field.required}
            name={field.name}
          />
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              error ? 'border-red-500' : ''
            }`}
            placeholder={field.placeholder}
            rows={3}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          />
          {error && (
            <div className="text-red-500 text-sm mt-1">{error}</div>
          )}
        </div>
      );
    }

    return (
      <div key={field.name} className="mb-4">
        <Textinput
          type={field.type}
          label={`${field.label}${field.required ? ' *' : ''}`}
          placeholder={field.placeholder}
          name={field.name}
          value={value}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          error={error}
          hasicon={field.type === 'password'}
          required={field.required}
        />
      </div>
    );
  };

  const clearForm = () => {
    setFormData({});
    setErrors({});
  };

  const getTotalFields = () => {
    return formSections.reduce((total, section) => total + section.fields.length, 0);
  };

  const getFilledFields = () => {
    let filled = 0;
    formSections.forEach(section => {
      section.fields.forEach(field => {
        const value = getNestedValue(formData, field.name);
        if (value && value.toString().trim() !== '') {
          filled++;
        }
      });
    });
    return filled;
  };

  const progressPercentage = Math.round((getFilledFields() / getTotalFields()) * 100);

  return (
    <Card className="w-full bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Property Information Form</h1>
        <p className="text-gray-600 mb-4">Fill in the property details below. All fields from your schema are included.</p>
        
        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Progress: {getFilledFields()} of {getTotalFields()} fields completed ({progressPercentage}%)
        </p>
      </div>

      <div className="space-y-6">
        {formSections.map((section, index) => {
          const sectionErrors = section.fields.filter(field => errors[field.name]).length;
          
          return (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection(index)}
                className={`w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  expandedSections[index] ? 'bg-gray-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                  {sectionErrors > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {sectionErrors} error{sectionErrors > 1 ? 's' : ''}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    ({section.fields.length} field{section.fields.length > 1 ? 's' : ''})
                  </span>
                </div>
                {expandedSections[index] ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {expandedSections[index] && (
                <div className="px-6 py-4 bg-white border-t">
                  {section.layout === "table" ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="border-t-2 border-yellow-400 mb-4"></div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left font-bold text-black text-sm py-2 px-4 w-1/4"></th>
                              <th className="text-center font-bold text-black text-sm py-2 px-4 w-1/4">CMHC Loan</th>
                              <th className="text-center font-bold text-black text-sm py-2 px-4 w-1/4">Conventional Loan</th>
                              <th className="text-center font-bold text-black text-sm py-2 px-4 w-1/4">Assumption</th>
                            </tr>
                          </thead>
                                                     <tbody>
                             {(() => {
                               // Dynamically determine the number of rows based on the section
                               const maxRow = Math.max(...section.fields.map(field => field.row));
                               const rowNumbers = Array.from({length: maxRow}, (_, i) => i + 1);
                               
                               return rowNumbers.map(rowNum => {
                                 const rowFields = section.fields.filter(field => field.row === rowNum);
                                 const labelField = rowFields[0]; // Get the first field to extract the label
                              
                              return (
                                <tr key={rowNum} className="border-b border-gray-200">
                                  <td className="py-3 px-4 font-bold text-black text-sm">
                                    {labelField?.label}
                                  </td>
                                  <td className="py-3 px-4">
                                    {rowFields.filter(field => field.column === 2).map(field => (
                                      <div key={field.name} className="w-full">
                                        <input
                                          type={field.type}
                                          placeholder={field.placeholder}
                                          value={getNestedValue(formData, field.name) || ''}
                                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                            errors[field.name] ? 'border-red-500' : ''
                                          }`}
                                          required={field.required}
                                        />
                                        {errors[field.name] && (
                                          <div className="text-red-500 text-xs mt-1">{errors[field.name]}</div>
                                        )}
                                      </div>
                                    ))}
                                  </td>
                                  <td className="py-3 px-4">
                                    {rowFields.filter(field => field.column === 3).map(field => (
                                      <div key={field.name} className="w-full">
                                        <input
                                          type={field.type}
                                          placeholder={field.placeholder}
                                          value={getNestedValue(formData, field.name) || ''}
                                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                            errors[field.name] ? 'border-red-500' : ''
                                          }`}
                                          required={field.required}
                                        />
                                        {errors[field.name] && (
                                          <div className="text-red-500 text-xs mt-1">{errors[field.name]}</div>
                                        )}
                                      </div>
                                    ))}
                                  </td>
                                  <td className="py-3 px-4">
                                    {rowFields.filter(field => field.column === 4).map(field => (
                                      <div key={field.name} className="w-full">
                                        <input
                                          type={field.type}
                                          placeholder={field.placeholder}
                                          value={getNestedValue(formData, field.name) || ''}
                                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                            errors[field.name] ? 'border-red-500' : ''
                                          }`}
                                          required={field.required}
                                        />
                                        {errors[field.name] && (
                                          <div className="text-red-500 text-xs mt-1">{errors[field.name]}</div>
                                        )}
                                      </div>
                                    ))}
                                  </td>
                                </tr>
                              );
                            });
                          })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                      {section.fields.map(renderField)}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{getFilledFields()}</span> of <span className="font-medium">{getTotalFields()}</span> fields completed
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={clearForm}
            >
              Clear Form
            </button>
           <Button
                text={"Submit"}
                className={"md:!w-36 z-50"}
                type="submit"
                // loading={loading}
              />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyForm;
