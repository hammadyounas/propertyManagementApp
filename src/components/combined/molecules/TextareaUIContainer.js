import TextareaUI from "../../ui/molecules/TextareaUI";

const Textarea = ({
  label,
  placeholder,
  classLabel = "form-label",
  className = "",
  classGroup = "",
  register,
  name,
  readonly,
  dvalue,
  error,
  icon,
  disabled,
  id,
  horizontal,
  validate,
  msgTooltip,
  description,
  cols,
  row = 3,
  onChange,
}) => {
  return (
    <TextareaUI
      label={label}
      placeholder={placeholder}
      classLabel={classLabel}
      className={className}
      classGroup={classGroup}
      register={register}
      name={name}
      readonly={readonly}
      dvalue={dvalue}
      error={error}
      icon={icon}
      disabled={disabled}
      id={id}
      horizontal={horizontal}
      validate={validate}
      msgTooltip={msgTooltip}
      description={description}
      cols={cols}
      row={row}
      onChange={onChange}
    />
  );
};

export default Textarea;
