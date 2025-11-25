import React, { useState } from "react";
import Icon from "@/components/ui/atoms/Icon";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";

const InputField = ({
  type,
  label,
  placeholder = "Add placeholder",
  classLabel = "form-label",
  className = "",
  name,
  readonly,
  value,
  error,
  icon,
  disabled,
  id,
  isMask,
  options,
  onChange,
  defaultValue,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`fromGroup pt-[10px] w-[100%] ${error ? "has-error" : ""}`}>
      {label && (
        <label htmlFor={id} className={`block capitalize ${classLabel}`}>
          {label}
        </label>
      )}

      <div className="relative">
        {!isMask ? (
          <input
            type={type === "password" && open ? "text" : type}
            name={name}
            id={id}
            className={`form-control py-2 ${className}`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            {...rest}
          />
        ) : (
          <Cleave
            name={name}
            id={id}
            options={options}
            className={`form-control py-2 ${className}`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}

        <div className="flex text-xl absolute right-5 top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
          {type === "password" && (
            <span className="cursor-pointer" onClick={() => setOpen(!open)}>
              <Icon
                icon={open ? "heroicons-outline:eye" : "heroicons-outline:eye-off"}
              />
            </span>

          )}
        </div>

        {error && <p className="text-danger-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
