import SelectUI from "../../ui/molecules/SelectUI";

const Select = ({
  label,
  placeholder = "Select Option",
  classLabel = "form-label",
  className = "",
  classGroup = "",
  register,
  name,
  readonly,
  value,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  msgTooltip,
  description,
  onChange,
  options,
  defaultValue,
  size,
}) => {
  return (
    <SelectUI
      label={label}
      placeholder={placeholder}
      classLabel={classLabel}
      className={className}
      classGroup={classGroup}
      register={register}
      name={name}
      readonly={readonly}
      value={value}
      error={error}
      icon={icon}
      disabled={disabled}
      id={id}
      horizontal={horizontal}
      validate={validate}
      msgTooltip={msgTooltip}
      description={description}
      onChange={onChange}
      options={options}
      defaultValue={defaultValue}
      size={size}
    />
  );
};

export default Select;
