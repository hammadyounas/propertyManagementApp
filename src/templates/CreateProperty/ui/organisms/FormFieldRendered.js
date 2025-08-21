import Select from 'react-select';
import { Textinput } from '../../../../components/ui/atoms/PropertyTextInput';
import { FileUpload } from '../../../../components/ui/molecules/UploadFileUI';
import { useUserOptions } from "../../../../hooks/useUserOptions";

export const FormFieldRenderer = ({
  field,
  value,
  error,
  onChange,
  isTableField = false
}) => {
  // Extract error message from react-hook-form error object
  const errorMessage = error?.message || error;

  const { userOptions, loading } = useUserOptions();

  // Handle regular select dropdown
  if (field.type === 'select') {
    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <Select
          options={field.options}
          placeholder={field.placeholder}
          value={field.options?.find(option => option.value === value) || null}
          onChange={(selectedOption) => onChange(field.name, selectedOption?.value || '')}
          isClearable
          isSearchable
          classNamePrefix="react-select"
          className={errorMessage ? 'react-select-error' : 'text-sm'}
        />
        {errorMessage && (
          <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
        )}
      </div>
    );
  }

  // Handle multi-select dropdown
  if (field.type === 'multiselect') {
  const selectedValues = Array.isArray(value)
    ? userOptions.filter(option => value.includes(option.value))
    : [];

    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <Select
          options={userOptions}
          placeholder={field.placeholder}
          value={selectedValues}
          onChange={(selectedOptions) => {
            const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
            onChange(field.name, values);
          }}
          isMulti
          isClearable
          isSearchable
          // classNamePrefix="react-select"
          className={errorMessage ? 'react-select-error' : 'text-sm capitalize'}
        />
        {errorMessage && (
          <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
        )}
      </div>
    );
  }

  // Handle file upload using the reusable component
  if (field.type === 'file') {
    return (
      <FileUpload
        key={field.name}
        name={field.name}
        label={field.label}
        value={value}
        onChange={(files) => onChange(field.name, files)}
        error={errorMessage}
        required={field.required}
        multiple={field.multiple}
        accept={field.accept}
        placeholder={field.placeholder}
      />
    );
  }

  // Handle textarea
  if (field.type === 'textarea') {
    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          className={`w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none ${
            errorMessage ? 'border-red-500' : ''
          }`}
          placeholder={field.placeholder}
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          required={field.required}
        />
        {errorMessage && (
          <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
        )}
      </div>
    );
  }

  // Handle all other input types (text, number, email, tel, date, etc.)
  if (isTableField) {
    return (
      <div key={field.name} className="w-full">
        <input
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
            errorMessage ? 'border-red-500' : ''
          }`}
          required={field.required}
        />
        {errorMessage && (
          <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
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
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        error={errorMessage}
        hasicon={field.type === 'password'}
        required={field.required}
        className='text-sm'
      />
    </div>
  );
};