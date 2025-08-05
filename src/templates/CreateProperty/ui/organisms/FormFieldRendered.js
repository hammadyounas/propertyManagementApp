import Select from 'react-select';
import { Textinput } from '../../../../components/ui/atoms/PropertyTextInput';
import { FileUpload } from '../../../../components/ui/molecules/UploadFileUI';
import { useUserOptions } from "../../../../hooks/useUserOptions";

export const FormFieldRenderer = ({
  field,
  value,
  error,
  onChange
}) => {

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
          className={error ? 'react-select-error' : 'text-sm'}
        />
        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
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
          className={error ? 'react-select-error' : 'text-sm capitalize'}
        />
        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}
      </div>
    );
  }

  // Handle file upload using the reusable component
  if (field.type === 'file') {
    return (
      <FileUpload
        key={field.name}
        label={field.label}
        value={value}
        onChange={(files) => onChange(field.name, files)}
        error={error}
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
            error ? 'border-red-500' : ''
          }`}
          placeholder={field.placeholder}
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          required={field.required}
        />
        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}
      </div>
    );
  }

  // Handle all other input types (text, number, email, tel, date, etc.)
  return (
    <div key={field.name} className="mb-4">
      <Textinput
        type={field.type}
        label={`${field.label}${field.required ? ' *' : ''}`}
        placeholder={field.placeholder}
        name={field.name}
        value={value || ''}
        onChange={(e) => onChange(field.name, e.target.value)}
        error={error}
        hasicon={field.type === 'password'}
        required={field.required}
        className='text-sm'
      />
    </div>
  );
};