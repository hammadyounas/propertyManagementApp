import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Button from "../../../../components/ui/molecules/Button";
import Modal from "../../../../components/combined/organisms/ModalUIContainer";

export default function UploadPdfModal({
  isOpen = false,
  onClose = () => {},
  onUpload = () => {},
  loading = false,
  documentTitle = "",
}) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a PDF file");
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setIsDragging(false);
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Modal activeModal={isOpen} onClose={handleClose} title="Upload PDF" centered>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
            {documentTitle || "Upload PDF Document"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Upload a PDF file to attach to this document
          </p>
        </div>

        {/* Drag and Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all
            ${
              isDragging
                ? "border-primary-default bg-primary-default/10"
                : "border-gray-300 dark:border-slate-600 hover:border-primary-default"
            }
            ${selectedFile ? "bg-green-50 dark:bg-green-900/20" : "bg-gray-50 dark:bg-slate-800"}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {selectedFile ? (
            // File Selected View
            <div className="flex flex-col items-center space-y-3">
              <Icon
                icon="vscode-icons:file-type-pdf2"
                className="w-16 h-16"
              />
              <div className="text-center">
                <p className="font-medium text-gray-900 dark:text-slate-100">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
              >
                <Icon icon="heroicons:x-mark" className="w-4 h-4" />
                Remove
              </button>
            </div>
          ) : (
            // Upload View
            <div className="flex flex-col items-center space-y-3">
              <Icon
                icon="heroicons:cloud-arrow-up"
                className="w-16 h-16 text-gray-400 dark:text-slate-500"
              />
              <div className="text-center">
                <p className="text-gray-700 dark:text-slate-300 mb-1">
                  {isDragging ? (
                    <span className="font-semibold text-primary-default">
                      Drop your PDF here
                    </span>
                  ) : (
                    <>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </>
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  PDF files only (Max 10MB)
                </p>
              </div>
              <Button
                text="Browse Files"
                icon="heroicons:folder-open"
                onClick={handleBrowseClick}
                className="btn-outline-primary"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            text="Cancel"
            onClick={handleClose}
            className="btn-outline-secondary"
            disabled={loading}
          />
          <Button
            text={loading ? "Uploading..." : "Upload PDF"}
            icon={loading ? "svg-spinners:ring-resize" : "heroicons:arrow-up-tray"}
            onClick={handleUpload}
            className="btn-primary bg-primary-default"
            disabled={!selectedFile || loading}
          />
        </div>
      </div>
    </Modal>
  );
}

