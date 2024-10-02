import React from "react";

const FileInputUI = ({
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
  renderPreview,
  handleFileRemove,
  type,
  disabled,
}) => {
  return (
    <div>
      <div className="filegroup">
        <label>
          <input
            disabled={disabled}
            type="file"
            onChange={onChange}
            className="bg-red-400 w-full hidden"
            name={name}
            id={id}
            multiple={multiple}
            placeholder={placeholder}
          />
          <div
            className={`w-full h-[40px] file-control flex items-center ${className}`}
          >
            {!multiple && (
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedFile ? (
                  <span
                    className={
                      badge ? "badge-title" : "text-slate-900 dark:text-white"
                    }
                  >
                    {selectedFile.name}
                  </span>
                ) : (
                  <span className="text-slate-400">{placeholder}</span>
                )}
              </span>
            )}

            {multiple && (
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedFiles.length > 0 ? (
                  <span
                    className={
                      badge ? "badge-title" : "text-slate-900 dark:text-white"
                    }
                  >
                    {selectedFiles.length} files selected
                  </span>
                ) : (
                  <span className="text-slate-400">{placeholder}</span>
                )}
              </span>
            )}

            <span className="file-name flex-none cursor-pointer border-l px-4 border-slate-200 dark:border-slate-700 h-full inline-flex items-center bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-base rounded-tr rounded-br font-normal">
              {label}
            </span>
          </div>
        </label>

        {/* Single file preview */}
        {!multiple && preview && selectedFile && (
          <div className="relative w-[200px] h-[200px] mx-auto mt-6">
            <button
              type="button"
              className="absolute -top-1 right-2  text-red-500  px-2 font-bold"
              onClick={() => handleFileRemove(0, type)} // Remove single file
            >
              <span>X</span>
            </button>
            {renderPreview(selectedFile)}
          </div>
        )}

        {/* Multiple files preview */}
        {multiple && preview && selectedFiles.length > 0 && (
          <div className="flex flex-wrap x-2 rtl:space-x-reverse">
            {selectedFiles.map((file, index) => (
              <div
                className="relative mx-2 xl:w-1/5 md:w-1/3 w-[40%] rounded mt-6 border p-2 border-slate-200"
                key={index}
              >
                <button
                  type="button"
                  className="absolute -top-1 right-2  text-red-500  px-2 font-bold"
                  onClick={() => handleFileRemove(index, type)} // Remove selected file
                >
                  <span>X</span>
                </button>
                {renderPreview(file)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInputUI;
