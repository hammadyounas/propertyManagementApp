import useFile from "../../functional/atoms/useFile";
import FileInputUI from "../../ui/atoms/FileInputUI";

const FileInput = ({
  name,
  label = "Browse",
  onChange,
  placeholder = "Choose a file or drop it here...",
  multiple,
  preview,
  className = "custom-class",
  id,
  selectedFile,
  badge,
  selectedFiles,
  handleFileRemove,
  type,
  disabled,
}) => {
  const { renderPreview } = useFile();
  return (
    <FileInputUI
      name={name}
      label={label}
      onChange={onChange}
      placeholder={placeholder}
      multiple={multiple}
      preview={preview}
      className={className}
      id={id}
      selectedFile={selectedFile}
      badge={badge}
      selectedFiles={selectedFiles}
      renderPreview={renderPreview}
      handleFileRemove={handleFileRemove}
      type={type}
      disabled={disabled}
    />
  );
};

export default FileInput;
