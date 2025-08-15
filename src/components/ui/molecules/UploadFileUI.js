import { useRef } from 'react';
import { Plus, File } from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';

export const FileUpload = ({
  label,
  value = [],
  onChange,
  error,
  required = false,
  multiple = true,
  accept = "image/*",
  placeholder,
  className = ""
}) => {
  const fileInputRef = useRef(null);
  const isImageField = accept.includes('image');
  const isDocumentField = accept.includes('.pdf') || accept.includes('.doc');

    const validateFileType = (file, type) => {
    const files = ["image/jpeg", "image/png", "image/gif"];
    // const docTypes = [
    //   "application/pdf",
    //   "application/msword",
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // ];

    // if (type === "image") {
    //   return imageTypes.includes(file.type);
    // } else if (type === "doc") {
    //   return docTypes.includes(file.type);
    // }
    return false;
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(multiple ? files : files[0]);
  };

  const handleFileRemove = (indexToRemove) => {
    if (Array.isArray(value)) {
      const newFiles = value.filter((_, index) => index !== indexToRemove);
      onChange(newFiles);
    } else {
      onChange(null);
    }
  };

  const renderFilePreview = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    
    const fileArray = Array.isArray(value) ? value : [value];
    
    return fileArray.map((file, index) => (
      <div key={index} className="w-36 h-28 border border-gray-300 rounded-md mt-4 mr-4 relative overflow-hidden bg-white">
        {isImageField ? (
          <img
            src={file instanceof File || file instanceof Blob ? URL.createObjectURL(file) : file}
            alt={`Preview ${index}`}
            className="w-full h-full object-cover"
            onLoad={() => {
              // Cleanup object URL to prevent memory leaks
              if (file instanceof File || file instanceof Blob) {
                URL.revokeObjectURL(file);
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center bg-gray-50">
            <File size={40} className="text-gray-400" />
            <p className="text-xs text-gray-600 mt-2 px-2 text-center truncate w-full">
              {file instanceof File ? file.name : file.split('/').pop()}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={() => handleFileRemove(index)}
          className="absolute top-2 right-2 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          title="Remove file"
        >
          <Icon icon="charm:cross" />
        </button>
      </div>
    ));
  };

  const getFormatHint = () => {
    if (isImageField) return " (jpg, png, or gif format supported)";
    if (isDocumentField) return " (pdf, doc, or docx format supported)";
    return "";
  };

  const getButtonLabel = () => {
    if (isImageField) return "Images";
    if (isDocumentField) return "Documents";
    return "Files";
  };

  return (
    <div className={`mb-4 w-full ${className}`}>
      <h6 className=''>{label}</h6>
      <h6 className="text-sm font-semibold my-4">
        {label} {required && <span className="text-red-500">*</span>}
        {getFormatHint()}
      </h6>
      
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        required={required}
      />
      
      <div className="mt-4 flex flex-wrap items-start">
        {renderFilePreview()}
        
        <div
          onClick={triggerFileInput}
          className="h-[185px] w-44 flex flex-col justify-center items-center border border-dashed border-gray-300 mt-4 mr-4 p-4 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors rounded-md"
        >
          <Plus size={50} className="text-gray-400" />
          <p className="font-bold mt-2 text-gray-600 text-center">
            {getButtonLabel()}
          </p>
          {placeholder && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              Click to upload
            </p>
          )}
        </div>
      </div>
      
      {placeholder && (
        <p className="text-xs text-gray-500 mt-2">{placeholder}</p>
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};