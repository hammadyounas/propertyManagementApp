import { AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

export const Textinput = ({
  type = "text",
  label,
  placeholder = "Add placeholder",
  classLabel = "form-label",
  className = "",
  name,
  readonly,
  value,
  error,
  disabled,
  id,
  validate,
  description,
  hasicon,
  onChange,
  defaultValue,
  required,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`w-full ${error ? "has-error" : ""} ${validate ? "is-valid" : ""}`}>
      {label && (
        <label htmlFor={id} className={`block text-sm font-medium text-gray-700 mb-1 ${classLabel}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? "border-red-500" : ""
          } ${className}`}
          placeholder={placeholder}
          readOnly={readonly}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          required={required}
          {...rest}
        />
        
        {/* Icons */}
        <div className="flex absolute right-3 top-1/2 -translate-y-1/2 space-x-1">
          {hasicon && type === "password" && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={handleTogglePassword}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          )}
          
          {error && (
            <AlertCircle size={16} className="text-red-500" />
          )}
          
          {validate && (
            <CheckCircle size={16} className="text-green-500" />
          )}
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
      
      {validate && (
        <div className="text-green-500 text-sm mt-1">{validate}</div>
      )}
      
      {description && (
        <span className="text-gray-500 text-sm mt-1">{description}</span>
      )}
    </div>
  );
};